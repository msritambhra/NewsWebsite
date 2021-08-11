import styles from './RecentNewsItem.module.css'

const RecentNewsItem = (props) =>{
    return <div className={styles.recent}>
        {props.article.title}
    </div>
}

export default RecentNewsItem;