import axios from "axios";
import { useContext } from "react"
import ApiAuthContext from "./api-auth-context"

const ApiLogin = () =>{
    const apiCtx = useContext(ApiAuthContext);
    
    if(!apiCtx.apiIsLoggedIn){
        let url = 'http://localhost:3002/authenticate';
        
        axios.post(url, {
            userName: 'user1',
            password: 'pwd1'
        })
        .then((data) => {
            const expirationTime = new Date(
            new Date().getTime() + 36000 * 1000
            );
            apiCtx.apiLogin(data.data, expirationTime.toISOString());
        });
            
    }
    return <></>
}

export default ApiLogin;