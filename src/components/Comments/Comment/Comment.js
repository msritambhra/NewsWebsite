import styles from './Comment.module.css'

const Comment = (props) =>{
    return(
        <div className={styles["dialogbox"]}>
          <div className={styles["body"]}>
            <span className={`${styles['tip']} ${styles['tip-left']}`}></span>
            <div className={styles["message"]}>
              <span><b>{props.user}</b>: {props.comment_text}</span>
            </div>
          </div>
        </div>
      );
}

export default Comment;