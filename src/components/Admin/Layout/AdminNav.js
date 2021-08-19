import { NavLink } from 'react-router-dom'
import { useState, useContext } from 'react';
import styles from './AdminNav.module.css'
import AuthContext from '../../../store/auth-context';

const AdminNav = () =>{
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const [toggle, setToggle] = useState(false);

    const navToggleHandler = () => setToggle(!toggle);

    const logoutHandler = () =>{
        authCtx.logout();
    }

    return (<div className={styles.navbar}>
        <div className={styles['nav-container']}>
            <div className={styles['nav-logo']}>
                <h1><NavLink exact to="/">Daily Chronicles</NavLink></h1>
            </div>
            <nav>
                <ul className={toggle ? `${styles['nav-menu']} ${styles['active']}`:styles['nav-menu']}>
                    {!isLoggedIn  && (<li className={styles['nav-item']}>
                        <NavLink activeClassName={styles.active} className={styles['nav-links']} to="/admin/auth" onClick={navToggleHandler}>Login</NavLink>
                    </li>)}
                    {isLoggedIn && (<li className={styles['nav-item']}>
                        <NavLink activeClassName={styles.active} className={styles['nav-links']} to="/admin/home" onClick={navToggleHandler}>Home</NavLink>
                    </li>)}
                    {isLoggedIn && (<li className={styles['nav-btn']}>
                        <button className={styles['logout-btn']} onClick={logoutHandler}>Logout</button>
                    </li>)}
                </ul>
                <div className={styles["nav-icon"]} onClick={navToggleHandler}>
                    <i className={toggle ? "fas fa-times":  "fas fa-bars"}></i>
                </div>
            </nav>
        </div>
    </div>);
}

export default AdminNav;