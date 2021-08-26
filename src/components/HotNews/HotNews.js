import {useState, useEffect, useCallback, useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../UI/LoadingSpinner'
import ApiAuthContext from '../../store/api-auth-context'
import styles from './HotNews.module.css'

const HotNews = (props) =>{
    const [article, setArticle] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const apiCtx = useContext(ApiAuthContext);
    let token = `Bearer ${apiCtx.apiToken}`;
    
    const fetchArticleHandler = useCallback(async ()=>{
        
        setIsLoading(true);
        setError(null);
        try{
            let response;
            if (props.section===undefined){
                response = await axios.get('http://localhost:3002/api/pList/28/allArticles?limit=1',{
                    headers: { 
                        Authorization: token
                    }
                });
            }
            else if(props.section==="world"){
                response = await axios.get('http://localhost:3002/api/pList/29/allArticles?limit=1',{
                    headers: { 
                        Authorization: token
                    }
                })
            }
            else if(props.section==="politics"){
                response = await axios.get('http://localhost:3002/api/pList/30/allArticles?limit=1',{
                    headers: { 
                        Authorization: token
                    }
                })
            }
            else if(props.section==="technology"){
                response = await axios.get('http://localhost:3002/api/pList/32/allArticles?limit=1',{
                    headers: { 
                        Authorization: token
                    }
                })
            }
            else if(props.section==="business"){
                response = await axios.get('http://localhost:3002/api/pList/31/allArticles?limit=1',{
                    headers: { 
                        Authorization: token
                    }
                })
            }
            else if(props.section==="health"){
                response = await axios.get('http://localhost:3002/api/pList/33/allArticles?limit=1',{
                    headers: { 
                        Authorization: token
                    }
                })
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