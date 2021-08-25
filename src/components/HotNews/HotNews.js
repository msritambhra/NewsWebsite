import {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../../UI/LoadingSpinner'
import styles from './HotNews.module.css'

const HotNews = (props) =>{
    const [article, setArticle] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    
    const fetchArticleHandler = useCallback(async ()=>{
        setIsLoading(true);
        setError(null);
        try{
            let response;
            if (props.section===undefined){
                response = await axios.get('http://localhost:3002/api/pList/44/allArticles?limit=1');
            }
            else if(props.section==="world"){
                response = await axios.get('http://localhost:3002/api/pList/45/allArticles?limit=1')
            }
            else if(props.section==="politics"){
                response = await axios.get('http://localhost:3002/api/pList/46/allArticles?limit=1')
            }
            else if(props.section==="technology"){
                response = await axios.get('http://localhost:3002/api/pList/47/allArticles?limit=1')
            }
            else if(props.section==="business"){
                response = await axios.get('http://localhost:3002/api/pList/49/allArticles?limit=1')
            }
            else if(props.section==="health"){
                response = await axios.get('http://localhost:3002/api/pList/48/allArticles?limit=1')
            }
            else{
                throw new Error('Section not defined!')
            }
            if(response.data.length<1){
                throw new Error('No Data Found!')
            }
            setArticle(response.data[0]);
        }catch(error){
            setIsLoading(false);
            setError(error.message);
        }
        setIsLoading(false);
    }, [props.section]);

    useEffect(()=>{
        fetchArticleHandler();
    }, [fetchArticleHandler])

    if(isLoading){
        return <div className={styles["loading"]}>
            <LoadingSpinner></LoadingSpinner>
        </div>
    }
    
    if (error){
        return <p>{error}</p>
    }

    return ( 
    <Link to={{pathname: `/article/${article.articleId}/${article.title}`}}>
        <div className={styles.container}>
                    <img src={article.imageUrl} alt={article.title}/>                
                    <h2 className={styles["card-title"]}>{article.title}</h2>
                    <p className={styles["card-desc"]}>{article.description}</p>
        </div>
    </Link>
    )
}

export default HotNews;