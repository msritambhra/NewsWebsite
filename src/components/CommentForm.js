import { useRef } from "react";
import styles from './CommentForm.module.css'

const CommentForm = (props) =>{
    const commentTextRef = useRef();
    const commentUsername = useRef();

    const submitHandler = (event)=>{
        event.preventDefault();
        const newComment = {
            "comment_text": commentTextRef.current.value,
            "createdAt": Date().toLocaleString(),
            "article_id": props.article_id,
            "username": commentUsername.current.value
        }
        
        props.addComment(newComment);

        commentTextRef.current.value = '';
        commentUsername.current.value = '';
    }

    return (
        <form className={styles["comment-form"]} onSubmit={submitHandler}>
          <div className={styles['comment-fields']}>
            <input placeholder="Name" required ref={commentUsername}></input><br />
            <textarea placeholder="Comment" rows="4" required ref={commentTextRef}></textarea>
          </div>
          <div className="comment-form-actions">
            <button className={styles['comment-submit-button']} type="submit">Post Comment</button>
          </div>
        </form>
      );
}

export default CommentForm;