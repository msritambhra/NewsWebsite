import { useState, useEffect, useCallback } from 'react';
import useInput from '../../../hooks/use-input';
import axios from 'axios';
import styles from './CreateArticle.module.css'

const isNotEmpty = (value) => value.trim() !== '';

const CreateArticle = () =>{
    const [categoryList, setCategoryList] = useState([]);

    const [error, setError] = useState(false);


    useEffect(()=>{
    
        setError(false);
        axios.get('http://localhost:3001/categories')
        .then(response => {
            setCategoryList(()=>response.data);
        })
        .catch(error => {
            setError(error.message);
        })
        
    }, []);

    
    // const [categoryValue, setCategoryValue] = useState('');

    // const categoryChangeHandler = (event) =>{
    //     setCategoryValue(event.target.value)
    // }
    
    const {
        value: titleValue,
        isValid: titleIsValid,
        hasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitle,
    } = useInput(isNotEmpty);

    const {
        value: summaryValue,
        isValid: summaryIsValid,
        hasError: summaryHasError,
        valueChangeHandler: summaryChangeHandler,
        inputBlurHandler: summaryBlurHandler,
        reset: resetSummary,
    } = useInput(isNotEmpty);

    const {
        value: categoryValue,
        isValid: categoryIsValid,
        hasError: categoryHasError,
        valueChangeHandler: categoryChangeHandler,
        inputBlurHandler: categoryBlurHandler,
        reset: resetCategory,
    } = useInput(isNotEmpty);

    const {
        value: imageValue,
        isValid: imageIsValid,
        hasError: imageHasError,
        valueChangeHandler: imageChangeHandler,
        inputBlurHandler: imageBlurHandler,
        reset: resetImage,
    } = useInput(isNotEmpty);

    const {
        value: contentValue,
        isValid: contentIsValid,
        hasError: contentHasError,
        valueChangeHandler: contentChangeHandler,
        inputBlurHandler: contentBlurHandler,
        reset: resetContent,
    } = useInput(isNotEmpty);

    let formIsValid = false;
    if (contentIsValid && imageIsValid && summaryIsValid && titleIsValid && categoryIsValid) {
      formIsValid = true;
    }

    const [isLoading, setIsLoading] = useState(false);

    const addArticle = (newArticle) =>{
        axios.post('http://localhost:3001/article-summaries', newArticle).then((response)=>{
            setIsLoading(false);
        }).catch((error)=>{
            alert(error.message)
        });
    }

    const resetHandler = () =>{
        resetTitle();
        resetSummary();
        resetImage();
        resetContent();
        resetCategory();
    }
    const submitHandler = (event)=>{
        event.preventDefault();
        
        if (!formIsValid) {
          return;
        }

        setIsLoading(true);

        const newArticle = {
            "title": titleValue,
            "description": summaryValue,
            "cateogry_name": categoryValue,
            "publishedAt": Date().toLocaleString(),
            "image" : imageValue,
            "content": contentValue 
        }
        
        addArticle(newArticle);

        resetHandler();
    }
    
    return <div className={styles.container}>
        <div className={styles.header}>
            <h1>Create Article</h1>
        </div> 
        <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles['form-control']}>
                <input 
                    name="title"
                    id="title" 
                    placeholder="Title"
                    required 
                    value={titleValue}
                    onChange={titleChangeHandler}
                    onBlur={titleBlurHandler}
                />
                {titleHasError && <p className={styles["error-text"]}>Please enter a valid title.</p>}
            </div>
            <div className={styles['form-control']}>
                <textarea 
                    name="summary"
                    id="summary" 
                    placeholder="Summary (max 50 words)" 
                    rows="2"
                    required 
                    value={summaryValue}
                    onChange={summaryChangeHandler}
                    onBlur={summaryBlurHandler}
                />
                {summaryHasError && <p className={styles["error-text"]}>Please enter a valid summary.</p>}
            </div>
            <div className={styles['form-control']}>
                {/* <label for="category_name">Category: </label> */}
                <select name="category_name" id="category_name" 
                    defaultValue={categoryValue}
                    onChange = {categoryChangeHandler}
                    onChange={categoryChangeHandler}
                    onBlur={categoryBlurHandler}
                >
                    <option value="">Select category...</option>
                    {categoryList.map(function(categoryData, index){ 
                                return (<option key={index} value={categoryData.category_name}>{categoryData.category_name}</option>)
                                }
                    )}
                    {/* <option value="world">World</option>
                    <option value="politics">Politics</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="health">Health</option> */}
                </select>
                {categoryHasError && <p className={styles["error-text"]}>Please select a valid cateogry.</p>}
                {error && <p className={styles["error-text"]}>Failed to fetch Category List. Please try to reload the page.</p>}
            </div>
            <div className={styles['form-control']}>
                <input 
                    id="image"
                    name="image"
                    type="url"
                    placeholder="Image URL"
                    required 
                    value={imageValue}
                    onChange={imageChangeHandler}
                    onBlur={imageBlurHandler}
                />
                {imageHasError && <p className={styles["error-text"]}>Please enter a valid image URL.</p>}
            </div>
            <div className={styles['form-control']}>
                <textarea 
                    name="content"
                    id="content" 
                    placeholder="Content (HTML Markup format)" 
                    rows="20"
                    required
                    value={contentValue}
                    onChange={contentChangeHandler}
                    onBlur={contentBlurHandler}
                />
                {contentHasError && <p className={styles["error-text"]}>Please enter valid content.</p>}
            </div>
            <div>
                <button className={styles['reset-button']} onClick={resetHandler} type="reset">Reset</button>
                {!isLoading &&
                    (<button  disabled={!formIsValid} className={styles['submit-button']} type="submit">Create</button>)
                }
                {isLoading &&  <p>Submitting Data...</p>}
            </div>
        </form>
    </div>
}

export default CreateArticle;