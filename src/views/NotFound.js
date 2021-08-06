import { NavLink } from "react-router-dom";
import styles from './NotFound.module.css'

const NotFound = () =>{
    return (
        
        <div className={styles["not-found-container"]}>
            <div>
                <h1 style={{margin:'0.2rem'}}>404</h1>
                <h2 className={styles["not-found-heading"]}>Uh Oh! Page Not Found.</h2>
            </div>
            <div>
                <p>The page you are looking for cannot be found! Please navigate to the home page.</p>
                <div className={styles['not-found-home-button']}>
                    <NavLink to="/">
                        <button type="button"><span>Go to Home</span></button>
                    </NavLink>
                </div>
            </div>
        </div>
     
    )
}

export default NotFound;