import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import '../../font-awesome-icons/style.css'

const NavBar = () =>{
    const [toggle, setToggle] = useState(false);

    const navToggleHandler = () => setToggle(!toggle);

    return (<nav className={styles.navbar}>
        
        <div className={styles['nav-container']}>
        
            <div className={styles['nav-logo']}>
            <h1><NavLink exact to="/">Daily Chronicles</NavLink></h1>
            </div>
            <ul className={toggle ? `${styles['nav-menu']} ${styles['active']}`:styles['nav-menu']}>
                <li className={styles['nav-item']}>
                    <NavLink activeClassName={styles.active} className={styles['nav-links']} to="/home" onClick={navToggleHandler}>Home</NavLink>
                </li>
                <li className={styles['nav-item']}>
                    <NavLink activeClassName={styles.active} className={styles['nav-links']} to="/section/world" onClick={navToggleHandler}>World</NavLink>
                </li>
                <li className={styles['nav-item']}>
                    <NavLink activeClassName={styles.active} className={styles['nav-links']} to="/section/politics" onClick={navToggleHandler}>Politics</NavLink>
                </li>
                <li className={styles['nav-item']}>
                    <NavLink activeClassName={styles.active} className={styles['nav-links']} to="/section/technology" onClick={navToggleHandler}>Technology</NavLink>
                </li>
                <li className={styles['nav-item']}>
                    <NavLink activeClassName={styles.active} className={styles['nav-links']} to="/section/business" onClick={navToggleHandler}>Business</NavLink>
                </li>
                <li className={styles['nav-item']}>
                    <NavLink activeClassName={styles.active} className={styles['nav-links']} to="/section/health" onClick={navToggleHandler}>Health</NavLink>
                </li>
            </ul>
            <div className={styles["nav-icon"]} onClick={navToggleHandler}>
                {/* <i className={toggle ? "fas fa-times":  "fas fa-bars"}></i> */}
                <i className={toggle ? "icon-times":  "icon-bars"}></i>
            </div>
        </div>
        
    </nav>);
}

export default NavBar;