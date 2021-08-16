import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

const LogoHeader = () =>{

    return (<div className={styles.navbar}>
        <div className={styles['nav-container']}>
            <div>
                <h1><NavLink exact to="/">Daily Chronicles</NavLink></h1>
            </div>
        </div>
    </div>);
}

export default LogoHeader;