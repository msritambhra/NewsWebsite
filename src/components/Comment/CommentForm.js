import { useRef } from "react";
import useInput from '../../hooks/use-input';
import styles from './CommentForm.module.css'

const isNotEmpty = (value) => value.trim() !== '';

const CommentForm = (props) =>{
    const commentTextRef = useRef();
    const commentUsername = useRef();

    const {
      value: nameValue,
      isValid: nameIsValid,
      hasError: nameHasError,
      valueChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: resetName,
    } = useInput(isNotEmpty);

    const {
      value: commentTextValue,
      isValid: commentTextIsValid,
      hasError: commentTextHasError,
      valueChangeHandler: commentTextChangeHandler,
      inputBlurHandler: commentTextBlurHandler,
      reset: resetCommentText,
    } = useInput(isNotEmpty);

    let formIsValid = false;
    if (nameIsValid && commentTextIsValid) {
      formIsValid = true;
    }

    const submitHandler = (event)=>{
        event.preventDefault();

        if (!formIsValid) {
          return;
        }

        const newComment = {
            "comment_text": commentTextValue,
            // commentTextRef.current.value,
            "createdAt": Date().toLocaleString(),
            "article_id": props.article_id,
            "username": nameValue
            // commentUsername.current.value
        }
        
        props.addComment(newComment);

        // commentTextRef.current.value = '';
        // commentUsername.current.value = '';
        resetName();
        resetCommentText();
    }

    const nameClasses = nameHasError ? `${styles['form-control']} ${styles['invalid']}` : `${styles['form-control']}`
    const commentTextClasses = commentTextHasError ? `${styles['form-control']} ${styles['invalid']}` : `${styles['form-control']}`

    return (
        <form className={styles["comment-form"]} onSubmit={submitHandler}>
          <div className={styles['comment-fields']}>
            <div className={nameClasses}>
              <input 
                placeholder="Name" 
                required 
                // ref={commentUsername}
                value={nameValue}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
              />
              {nameHasError && <p className={styles["error-text"]}>Please enter a display name.</p>}
            </div>
            
            <div className={commentTextClasses}>
              <textarea 
                placeholder="Comment" 
                rows="4" 
                required 
                // ref={commentTextRef}
                value={commentTextValue}
                onChange={commentTextChangeHandler}
                onBlur={commentTextBlurHandler}
              />
              {commentTextHasError && <p className={styles["error-text"]}>Please enter a comment.</p>}
            </div>
          </div>
          <div className="comment-form-actions">
            <button disabled={!formIsValid} className={styles['comment-submit-button']} type="submit">Post Comment</button>
          </div>
        </form>
      );
}

export default CommentForm;