import { useState, useEffect, useCallback, useRef } from 'react';
import useInput from '../../../hooks/use-input';
import axios from 'axios';
import styles from './CreateArticle.module.css'

const isNotEmpty = (value) => value.trim() !== '';

const sortByKey= (array, key) => {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

const DeleteArticlePriority = () =>{
    const [pLists, setPLists] = useState([]);
    const [articles, setArticles] = useState([]);

    const [error, setError] = useState(false);

    useEffect(()=>{
    
        setError(false);
        axios.get('http://localhost:3002/api/pList/allPList')
        .then(response => {
            setPLists(()=>(sortByKey(response.data,'name')));
        })
        .catch(error => {
            setPLists([]);
            setError(error.message);
        });
        
    }, []);
    
    const [isLoading, setIsLoading] = useState(false);

    const {
        value: pListValue,
        isValid: pListIsValid,
        hasError: pListHasError,
        valueChangeHandler: pListChangeHandler,
        inputBlurHandler: pListBlurHandler,
        reset: resetpList,
    } = useInput(isNotEmpty);

    const {
        value: articleValue,
        isValid: articleIsValid,
        hasError: articleHasError,
        valueChangeHandler: articleChangeHandler,
        inputBlurHandler:articleBlurHandler,
        reset: resetArticle,
    } = useInput(isNotEmpty);

    const pListRef = useRef();
    const articleRef = useRef();

    const getFilteredArticles = () => {
        if (pListValue!=''){
            axios.get(`http://localhost:3002/api/pList/${pListValue}/allArticles?limit=-1`)
            .then(response => {
                setArticles(()=>(sortByKey(response.data,'title')));
            })
            .catch(error => {
                setArticles([]);
                setError(error.message);
            });
        }
        else{
            setArticles([]);
        }
    }

    let formIsValid = false;
    if (pListIsValid && articleIsValid && !error) {
      formIsValid = true;
    }

    const resetHandler = () =>{
        pListRef.current.value='';
        articleRef.current.value='';
        resetpList();
        resetArticle();
        setError(false);
    }

    const deleteArticleFromPList = (articleValue, pListValue) =>{

        axios.delete(`http://localhost:3002/api/pList/delete/${pListValue+"_"+articleValue}`)
        .then(()=>{
            setIsLoading(false);
            resetHandler();
        }).catch((error)=>{
            setIsLoading(false);
            setError(error.message);
        });
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        
        if (!formIsValid) {
          return;
        }

        setIsLoading(true);
        
        deleteArticleFromPList(articleValue, pListValue); 
        
    }

    return <div className={styles.container}>
        <div className={styles.header}>
            <h1>Delete Article From Priority List</h1>
        </div> 
        <form onSubmit={submitHandler} className={styles.form}>
           
            <div className={styles['form-control']}>
                <select name="pList" id="pList" 
                    defaultValue={pListValue}
                    ref={pListRef}
                    onChange={getFilteredArticles}
                    onInput={pListChangeHandler}
                    onBlur={pListBlurHandler}
                >
                    <option value="">Select Priority list...</option>
                    {pLists.map(function(pList, index){ 
                            return (<option key={index} value={pList.plistId}>{pList.name}</option>)
                        }
                    )}
                </select>
                {pListHasError && <p className={styles["error-text"]}>Please select a valid priority list.</p>}
            </div>

            <div className={styles['form-control']}>
                <select name="article" id="article" 
                    defaultValue={articleValue}
                    ref={articleRef}
                    onChange={articleChangeHandler}
                    onBlur={articleBlurHandler}
                >
                    <option value="">Select Article to add...</option>
                    {articles.map(function(article, index){ 
                            return (<option key={index} value={article.articleId}>{article.title}</option>)
                        }
                    )}
                </select>
                {articleHasError && <p className={styles["error-text"]}>Please select a valid Article.</p>}
            </div>

   
            <div>
                <button className={styles['reset-button']} onClick={resetHandler} type="reset">Reset</button>
                {!isLoading &&
                    (<button  disabled={!formIsValid} className={styles['submit-button']} type="submit">Delete</button>)
                }
                {isLoading &&  <p>Submitting Data...</p>}
            </div>
            {error && <div className={styles["error-text"]}>
                <p>Request to Server Failed. Please try to reload the page.</p>
                <p>Error Mesaage: {error}</p>
            </div>}
        </form>
    </div>
    }

export default DeleteArticlePriority;