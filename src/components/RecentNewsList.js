import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import styles from './RecentNewsList.module.css'

const RecentNewsList = (props) =>{

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    
    const fetchArticlesHandler = useCallback(async()=>{
        setIsLoading(true);
        setError(false);
        try{
            let response;
            if(props.section===undefined){
                response = await axios.get('http://localhost:3001/article-summaries?priority=0&_sort=publishedAt&_limit=3');
            }
            else{
                response = await axios.get(`http://localhost:3001/article-summaries?category_name=${props.section}&priority=0&_sort=publishedAt&_limit=3`);
            }

            if(response.data.length<1){
                throw new Error('No Data Found!')
            }

            await setArticles(()=>response.data);
        }catch(error){
            setError(error.message);
            console.log(error.message);
        }

        setIsLoading(false);
        
    }, [props.section]);
    console.log(articles);
    console.log('Recent')
    useEffect(()=>{
        fetchArticlesHandler();
    }, [fetchArticlesHandler]);


    return <>
        {
        articles.map((data,index)=>{
            return <div className={styles.recent} key={data.id}>{data.id}</div>
        })}
        </>
}

export default RecentNewsList;