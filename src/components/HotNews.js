import {useState, useEffect, useCallback} from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios'
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
            // Case: Home Page
            if(props.section===undefined){
                response = await axios.get('http://localhost:3001/article-summaries?priority=1&_sort=publishedAt&_limit=1')
            }
            // Case: Section Page 
            else{
                response = await axios.get(`http://localhost:3001/article-summaries?category_name=${props.section}&priority=1&_sort=publishedAt&_limit=1`)
            }
            // No data in response
            if(response.data.length<1){
                throw new Error('No Data Found!')
            }
            setArticle(response.data[0]);
        }catch(error){
            setError(error.message);
            console.log(error.message);
        }
        setIsLoading(false);
    }, [props.section]);

    useEffect(()=>{
        fetchArticleHandler();
    }, [fetchArticleHandler])

    return ( <div className={styles.container}>
                   
                    <img src={article.image} alt={article.title}/>                
                    <h2 className={styles["card-title"]}>{article.title}</h2>
                    <p className={styles["card-desc"]}>{article.description}</p>
  
    </div>)
    // styles={{ backgroundImage:`url(${article.image})`,heihgt: "100%",width:"100%" }}
}

export default HotNews;