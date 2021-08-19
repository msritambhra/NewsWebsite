import styles from './Comment.module.css'

const Comment = (props) =>{
    return(
        // <div className={styles.comment}>
        //   {/* <p className={styles["comment-user"]}>{props.user}</p>
        //   <p className={styles["comment-text"]}>{props.comment_text}</p> */}
        //   <p><b>{props.user}</b>: {props.comment_text}</p>
        //   {/* <div className="comment-footer">
        //     <a href="#" className="comment-footer-delete" onClick={this._deleteComment}>Delete Comment</a>
        //   </div> */}
        // </div>
        <div class={styles["dialogbox"]}>
          <div class={styles["body"]}>
            <span class={`${styles['tip']} ${styles['tip-left']}`}></span>
            <div class={styles["message"]}>
              <span><b>{props.user}</b>: {props.comment_text}</span>
            </div>
          </div>
        </div>
      );
}

export default Comment;