import React from 'react'
import styles from './PriorityListItem.module.css'
import {Link} from 'react-router-dom'

const PriorityListItem = (props) =>{
    
    const articleInfo = props.article

    return (<Link to={{pathname: `/article/${articleInfo.id}`}}>
    <div className={styles['priority-card']}>
        <div className={`${styles["item-col-1"]}`}>
            <img src={articleInfo.image} alt={articleInfo.title}></img>
        </div>
        <div className={`${styles["item-col-2"]}`}>
            <h2 className={styles["article__title"]}>{articleInfo.title}</h2>
            <div>
            <h3 className={styles["article__category"]}>{articleInfo.category_name}</h3>
            <p className={styles["article__date"]}>{articleInfo.publishedAt}</p>
            </div> 
        </div>
    </div>
    </Link>);
}

export default PriorityListItem;