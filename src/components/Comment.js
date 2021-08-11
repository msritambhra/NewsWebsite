import styles from './Comment.module.css'

const Comment = (props) =>{
    return(
        <div className={styles.comment}>
          <p className={styles["comment-user"]}>{props.user}</p>
          <p className={styles["comment-text"]}>{props.comment_text}</p>
          {/* <div className="comment-footer">
            <a href="#" className="comment-footer-delete" onClick={this._deleteComment}>Delete Comment</a>
          </div> */}
        </div>
      );
}

export default Comment;