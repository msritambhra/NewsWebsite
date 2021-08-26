import { useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () =>{
    const newsletterInput = useRef();

    const submitHandler = (event) =>{
        event.preventDefault();
        newsletterInput.current.value='';
    }
    return <footer>
        <div className={styles['newsletter-container']}>
            <h1>Subscribe to our newsletter</h1>
            <p>Stay up to date with latest news</p>
            <form className={styles['newsletter-form']} onSubmit={submitHandler}>
                
                    <input 
                        type="text" id="email" name="email" 
                        placeholder="Your email address"
                        ref={newsletterInput}
                        />
                
                    <button type="submit" className={styles['newsletter-submit-btn']}>SUBSCRIBE</button>
                
            </form>
        </div>
        <div className={styles['footer-categories']}>
            <ul className={styles['nav-menu']}>
                <li className={styles['nav-item']}>
                    <Link className={styles['nav-links']} to="/home">Home</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link className={styles['nav-links']} to="/section/world">World</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link className={styles['nav-links']} to="/section/politics">Politics</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link className={styles['nav-links']} to="/section/technology">Technology</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link className={styles['nav-links']} to="/section/business">Business</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link className={styles['nav-links']} to="/section/health">Health</Link>
                </li>
            </ul>
        </div>
        
    </footer>
}

export default Footer;