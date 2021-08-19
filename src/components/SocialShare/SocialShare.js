import styles from './SocialShare.module.css'


const SocialShare = (props) =>{
    const url = encodeURIComponent(props.url);
    const title = encodeURIComponent(props.title);

    const twitterURL =  "https://twitter.com/share?url=" + url + "&text=" + title;
    const facebookURL = "https://www.facebook.com/sharer.php?u=" + url;
    const linkedinURL = "https://www.linkedin.com/cws/share?url=" + "https%3A%2F%2Ftwitter.com";
    const whatsappURL = "https://api.whatsapp.com/send?text=" + title + " " + url

    return <div className={styles['social-share-container']}>
        <a href={twitterURL} className={styles.twitter} target="_blank">
            <i className="fab fa-twitter-square"></i>
        </a>
        <a href={facebookURL} className={styles.facebook} target="_blank">
            <i className="fab fa-facebook-square"></i>
        </a>
        <a href={linkedinURL} className={styles.linkedin} target="_blank"> {/* Setup meta tags */}
            <i className="fab fa-linkedin"></i>
        </a>
        <a href={whatsappURL} className={styles.whatsapp} target="_blank">
            <i className="fab fa-whatsapp-square"></i>
        </a>
        {/* <a className={styles.copy} onClick={() => {navigator.clipboard.writeText(props.url);}}>
            <i className="fas fa-link"></i>
            <span className={styles.tooltip}></span>
        </a> */}
    </div>
}

export default SocialShare;

/* share URLs

Whatsapp: https://api.whatsapp.com/send?text=[post-title] [post-url]
Facebook: https://www.facebook.com/sharer.php?u=[post-url]
Twitter: https://twitter.com/share?url=[post-url]&text=[post-title]&via=[via]&hashtags=[hashtags]
Linkedin: https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]

*/
