import React from 'react'
import styles from './PriorityListItem.module.css'
import {Link} from 'react-router-dom'

const PriorityListItem = (props) =>{
    
    const articleInfo = props.article
    const articleDateComponents = new Date(articleInfo.createdAt).toDateString().split(' ');
    const DateString = articleDateComponents[0] + ', ' + articleDateComponents[1] + ' ' 
    + articleDateComponents[2] + ', ' + articleDateComponents[3]

    return (<Link to={{pathname: `/article/${articleInfo.articleId}/${articleInfo.title}`}}>
    <div className={styles['priority-card']}>
        
        <div className={`${styles["item-col-2"]}`}>
            <h2 className={styles["article__title"]}>{articleInfo.title}</h2>
    
            <div>
                <h3 className={styles["article__category"]}>{articleInfo.categoryName}</h3>
                <p className={styles["article__date"]}>{DateString}</p>
            </div> 
        </div>
        <div className={`${styles["item-col-1"]}`}>
            <img src={articleInfo.imageUrl} alt={articleInfo.title}></img>
        </div>
    </div>
    </Link>);
}

export default PriorityListItem;