import { useState, useEffect } from 'react';
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

const CreateArticle = () =>{
    const [categoryList, setCategoryList] = useState([]);
    const [authorList, setAuthorList] = useState([]);

    const [error, setError] = useState(false);


    useEffect(()=>{
    
        setError(false);
        axios.get('http://localhost:3002/api/category/allCategory')
        .then(response => {
            setCategoryList(()=>(sortByKey(response.data,'categoryName')));
        })
        .catch(error => {
            setError(error.message);
        })

        axios.get('http://localhost:3002/api/author/allAuthors')
        .then(response => {
            setAuthorList(()=>(sortByKey(response.data,'authorName')));
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
        value: authorValue,
        isValid: authorIsValid,
        hasError: authorHasError,
        valueChangeHandler: authorChangeHandler,
        inputBlurHandler: authorBlurHandler,
        reset: resetAuthor,
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
    if (contentIsValid && imageIsValid && summaryIsValid && titleIsValid && categoryIsValid && authorIsValid) {
      formIsValid = true;
    }

    const [isLoading, setIsLoading] = useState(false);

    const addArticle = (newArticle) =>{
        axios.post('http://localhost:3002/api/article/createArticle', newArticle).then((response)=>{
            setIsLoading(false);
            resetHandler();
        }).catch((error)=>{
            alert(error.message);
            setIsLoading(false);
        });
    }

    const resetHandler = () =>{
        resetTitle();
        resetSummary();
        resetImage();
        resetContent();
        resetCategory();
        resetAuthor();
        setError(false);
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
            "categoryId": categoryValue,
            "authorId": authorValue,
            "imageUrl" : imageValue,
            "content": contentValue 
        }
        
        addArticle(newArticle);
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
                <select name="category_id" id="category_id" 
                    defaultValue={categoryValue}
                    onChange = {categoryChangeHandler}
                    onChange={categoryChangeHandler}
                    onBlur={categoryBlurHandler}
                >
                    <option value="">Select category...</option>
                    {categoryList.map(function(categoryData, index){ 
                                return (<option key={index} value={categoryData.categoryId}>{categoryData.categoryName}</option>)
                                }
                    )}
                </select>
                {categoryHasError && <p className={styles["error-text"]}>Please select a valid cateogry.</p>}
            </div>
            <div className={styles['form-control']}>
                <select name="author_id" id="author_id" 
                    defaultValue={authorValue}
                    onChange = {authorChangeHandler}
                    onChange={authorChangeHandler}
                    onBlur={authorBlurHandler}
                >
                    <option value="">Select author...</option>
                    {authorList.map(function(authorData, index){ 
                                return (<option key={index} value={authorData.authorId}>{authorData.authorName}</option>)
                                }
                    )}
                </select>
                {categoryHasError && <p className={styles["error-text"]}>Please select a valid cateogry.</p>}
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
            {error && <p className={styles["error-text"]}>Failed to fetch Data. Please try to reload the page.</p>}
        </form>
    </div>
}

export default CreateArticle;