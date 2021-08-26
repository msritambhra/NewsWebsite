import { useState, useContext } from 'react';
import axios from 'axios';
import ApiAuthContext from '../../../store/api-auth-context';
import useInput from '../../../hooks/use-input';
import styles from '../CreateArticle/CreateArticle.module.css'

// const isNotEmpty = (value) => value.trim() !== '';
// const isSingleWord = (value) => (value.trim() !== '') && (value.trim().split(' ').length <= 1);
const is255Words = (value) => ((value.trim() !== '') && (value.trim().length <= 255));

const CreatePList = () =>{
    
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const apiCtx = useContext(ApiAuthContext);
    let token = `Bearer ${apiCtx.apiToken}`;

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput(is255Words);

    const {
        value: descriptionValue,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler:descriptionBlurHandler,
        reset: resetDescription,
    } = useInput(is255Words);


    let formIsValid = false;
    if (nameIsValid && descriptionIsValid) {
      formIsValid = true;
    }

    const resetHandler = () =>{
        resetName();
        resetDescription();
    }

    const addPList = (nameValue, descriptionValue) =>{
        axios.post('http://localhost:3002/api/pList/createPList', {
            'name': nameValue.trim().toLowerCase(),
            'description': descriptionValue
        } ,{
            headers: { 
                Authorization: token
            }
        }).then((response)=>{
            setIsLoading(false);
            setSuccess(true);
            resetHandler();
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
        
        addPList(nameValue, descriptionValue);
        
        
    }

    return <div className={styles.container}>
        <div className={styles.header}>
            <h1>Create Priority List</h1>
        </div> 
        {success && <p className={styles['success-text']}>Priority List Created!</p>}
        <form onInput={()=>setSuccess(false)} onSubmit={submitHandler} className={styles.form}>
            
            <div className={styles['form-control']}>
                <input 
                    name="name"
                    id="name" 
                    placeholder="Name*"
                    required 
                    value={nameValue}
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                />
                {nameHasError && <p className={styles["error-text"]}>Please enter a valid name. It should be under 255 characters.</p>}
            </div>

            <div className={styles['form-control']}>
                <textarea 
                    name="description"
                    id="description" 
                    placeholder="Description (upto 255 words)*" 
                    rows="2"
                    required 
                    value={descriptionValue}
                    onChange={descriptionChangeHandler}
                    onBlur={descriptionBlurHandler}
                />
                {descriptionHasError && <p className={styles["error-text"]}>Please enter a valid description. It should be under 255 characters.</p>}
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

export default CreatePList;