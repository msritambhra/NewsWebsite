import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useInput from '../../../hooks/use-input';
import AuthContext from '../../../store/auth-context';
import styles from './AuthForm.module.css';


const isNotEmpty = (value) => value.trim() !== '';
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const isValidEmail = (value) => value.trim() !== '' && emailPattern.test(value);

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isValidEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);


  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
        return;
    }

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANU2Bacfb6T8xK44VMI5m0s7aaIHur6BA';
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(() => {
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace('/admin/home');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const emailClasses = emailHasError ? `${styles['form-control']} ${styles['invalid']}` : `${styles['form-control']}`
  const passwordClasses = passwordHasError ? `${styles['form-control']} ${styles['invalid']}` : `${styles['form-control']}`

  return (
    <section className={styles.auth}>
      <h1>Admin Authentication</h1>
      <form onSubmit={submitHandler}>
        <div className={emailClasses}>
          <label htmlFor='email'>Email:</label>
          <input 
            type='email' 
            id='email'
            required
            ref={emailInputRef}
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
        />
        {emailHasError && <p className={styles["error-text"]}>Please enter a valid email.</p>}
        </div>
        <div className={passwordClasses}>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && <p className={styles["error-text"]}>Please enter a valid password.</p>}
        </div>
        <div className={styles.actions}>
          {!isLoading && (
            <button disabled={!formIsValid} className={styles['submit-button']} type="submit">Login</button>
          )}
          {isLoading && <p>Logging In...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
