import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const ApiAuthContext = React.createContext({
    apiToken: '',
    apiIsLoggedIn: false,
    apiLogin: (apiToken) => {},
    apiLogout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    
    const remainingDuration = adjExpirationTime - currentTime;
  
    return remainingDuration;
};

const retrieveStoredToken = () => {
    const localToken = localStorage.getItem('apiToken');
    const localExpirationDate = localStorage.getItem('apiExpirationTime');
  
    const remainingTime = calculateRemainingTime(localExpirationDate);
    if (remainingTime <= 36000) {
      localStorage.removeItem('apiToken');
      localStorage.removeItem('apiExpirationTime');
      return null;
    }
    return {
        apiToken: localToken,
        apiDuration: remainingTime,
    }
};
    
  

export const ApiAuthContextProvider = (props) => {

    const localTokenData = retrieveStoredToken();
    
    let initToken;
    if (localTokenData) {
        initToken = localTokenData.apiToken;
    }

    const [apiToken, setApiToken] = useState(initToken);
    
    const apiIsLoggedIn = !!apiToken;
    
    const loginHandler = (apiToken, apiExpirationTime) => {
        setApiToken(apiToken);
        localStorage.setItem('apiToken', apiToken);
        localStorage.setItem('apiExpirationTime', apiExpirationTime);
    
        const remainingTime = calculateRemainingTime(apiExpirationTime);
    
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    const logoutHandler = useCallback(() => {
        setApiToken(null);
        localStorage.removeItem('apiToken');
        localStorage.removeItem('apiExpirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    
    useEffect(() => {
        if (localTokenData) {
          console.log(localTokenData.apiDuration);
          logoutTimer = setTimeout(logoutHandler, localTokenData.apiDuration);
        }
        
    }, [localTokenData, logoutHandler]);

    const apiContextValue = {
        apiToken: apiToken,
        apiIsLoggedIn: apiIsLoggedIn,
        apiLogin: loginHandler,
        apiLogout: logoutHandler
    };
    
    return <ApiAuthContext.Provider value={apiContextValue}>
        {props.children}
    </ApiAuthContext.Provider>
}

export default ApiAuthContext;

