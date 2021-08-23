import { Link } from 'react-router-dom';
import styles from './RecentNewsItem.module.css'

const RecentNewsItem = (props) =>{
    const articleInfo = props.article;

    return <div className={styles.recent}>
        <div className={`${styles["item-col-1"]}`}>
            <img src={articleInfo.imageUrl} alt={articleInfo.title}></img>
        </div>
        <div className={`${styles["item-col-2"]}`}>
            <h2 className={styles["article__title"]}>{articleInfo.title}</h2>
            <p className={styles["article__category"]}>{articleInfo.categoryName}</p>
            <Link to={{pathname: `/article/${articleInfo.articleId}`}}>
                <button className={styles['read-more-button']}>
                    Read More
                    <span className={styles['read-more-icon']}><i className="fas fa-chevron-right"></i></span>
                </button>
            </Link>
        </div>
    </div>
}

export default RecentNewsItem;