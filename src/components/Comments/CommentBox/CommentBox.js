import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";
import Comment from "../Comment/Comment";
import styles from './CommentBox.module.css'

const CommentBox = () =>{
    
    const params = useParams();
    
    const [comments, setComments] = useState([]);
    // {const [isAddingComment, setIsAddingComment] = useState(false);}
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(false);

    const fetchComments = useCallback(async()=>{
        setError(false);
        try{
            axios.get(`http://localhost:3001/comments?article_id=${params.article_id}`).then((response)=>{
                setComments(()=>response.data);
            }).catch((err)=>{
                alert(err.message)
                throw new Error(err.message)
            });

        }catch(error){
            setError(error.message);
        }
        
    }, [params.article_id]);


    useEffect(()=>{
        fetchComments();
    }, [fetchComments]);


    let commentsContent;
    let buttonText = 'Show Comments';
    if(isVisible){
        buttonText='Hide Comments';
        commentsContent = <div className="comment-list">
            {comments.map((data,index)=>{
                return (<Comment key={data.id} comment_text={data.comment_text} user={data.username}></Comment>);
            })}
        </div>
    }

    const addComment = (newComment) =>{

        axios.post('http://localhost:3001/comments', newComment).then((response)=>{
            fetchComments();
        }).catch((error)=>{
            setError(error.message);
        });
    }

    const isVisibleHandler = () =>{
        setIsVisible(!isVisible);
    }
    
    const getCommentCountContent = (commentsCount) =>{
        if (commentsCount === 0) {
            return 'No comments yet';
        } else if (commentsCount === 1) {
            return "1 comment";
        } else {
            return `${commentsCount} comments`;
        }
    }

    
    return <div className={styles["comment-box"]}>
        <h2>Join the Discussion!</h2>
        {error && <p>{error.message}</p>}
        <CommentForm addComment={addComment} article_id={params.article_id}/>
        <button className={styles["comment-view-button"]} onClick={isVisibleHandler}>{buttonText}</button>
        <h3>Comments</h3>
        <h4 className="comment-count">
        {getCommentCountContent(comments.length)}
        </h4>
        {commentsContent}
  </div>  
}


export default CommentBox;