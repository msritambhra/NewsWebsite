import styles from './SocialShare.module.css'
import '../../font-awesome-icons/style.css'

const SocialShare = (props) =>{
    const url = encodeURIComponent(props.url);
    const title = encodeURIComponent(props.title);

    const twitterURL =  `https://twitter.com/share?url=${url}&text=${title}`;
    const facebookURL = `https://www.facebook.com/sharer.php?u=${url}`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${title}  ${url}`

    return <div className={styles['social-share-container']}>
        <a href={twitterURL} className={styles.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter-square icon-twitter-square"></i>
        </a>
        <a href={facebookURL} className={styles.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-square icon-facebook-square"></i>
        </a>
        {/* <a href={linkedinURL} className={styles.linkedin} target="_blank" rel="noopener noreferrer"> 
            <i className="fab fa-linkedin icon-linkedin-square"></i>
        </a> */}
        <a href={whatsappURL} className={styles.whatsapp} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp-square icon-whatsapp"></i>
        </a>
    </div>
}

export default SocialShare;