import { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import styles from './AuthHeader.module.css'

const AuthHeader = () =>{

    return (<div className={styles['auth-header']}>
        <div className={styles['auth-container']}>
            <button className={styles['btn']} onClick={()=>{<Redirect to="/home"></Redirect>}}>Signup</button>
            <button className={styles['btn']}>Login</button>
        </div>
        
    </div>);
}

export default AuthHeader;