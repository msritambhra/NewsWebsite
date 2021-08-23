import { useState, useEffect, useCallback } from 'react';
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
        axios.get('http://localhost:3001/pList')
        .then(response => {
            setPLists(()=>(sortByKey(response.data,'name')));
            //Addition Feature: Filter the articles based on PList selected
            axios.get('http://localhost:3001/article-summaries')
            .then(response => {
                setArticles(()=>(sortByKey(response.data,'title')));
            })
            .catch(error => {
                setError(error.message);
            });
        })
        .catch(error => {
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


    let formIsValid = false;
    if (pListIsValid && articleIsValid && !error) {
      formIsValid = true;
    }

    const resetHandler = () =>{
        resetpList();
        resetArticle();
    }

    const deleteArticleFromPList = (articleValue, pListValue) =>{
        // axios.post('http://localhost:3001/pList_articles', {
        //     'pListId': pListValue,
        //     'articleId': articleValue
        // } ).then((response)=>{
        //     setIsLoading(false);
        //     resetHandler();
        // }).catch((error)=>{
        //     alert(error.message);
        // });
        axios.get('http://localhost:3001/pList_articles',{
            params : {pListId: pListValue,
            articleId: articleValue}
        }).then((response)=>{
            if (response.data.length===0){
                alert('Selected Article does not belong to the selected Priority List.')
                setIsLoading(false);
                return;
            }
            axios.delete('http://localhost:3001/pList_articles/' + response.data[0].id).then(()=>{
                setIsLoading(false);
            }).catch((error)=>{
                alert(error.message);
                setIsLoading(false);
            });
            setIsLoading(false);
        }).catch((error)=>{
            alert(error.message);
            setIsLoading(false);
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
                    onChange = {pListChangeHandler}
                    onChange={pListChangeHandler}
                    onBlur={pListBlurHandler}
                >
                    <option value="">Select Priority list...</option>
                    {pLists.map(function(pList, index){ 
                            return (<option key={index} value={pList.id}>{pList.name}</option>)
                        }
                    )}
                </select>
                {pListHasError && <p className={styles["error-text"]}>Please select a valid priority list.</p>}
            </div>

            <div className={styles['form-control']}>
                <select name="article" id="article" 
                    defaultValue={articleValue}
                    onChange = {articleChangeHandler}
                    onChange={articleChangeHandler}
                    onBlur={articleBlurHandler}
                >
                    <option value="">Select Article to add...</option>
                    {articles.map(function(article, index){ 
                            return (<option key={index} value={article.id}>{article.title}</option>)
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
            {error && <p className={styles["error-text"]}>Failed to fetch Data. Please try to reload the page.</p>}
        </form>
    </div>
    }

export default DeleteArticlePriority;