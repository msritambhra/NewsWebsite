import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import styles from './PriorityNewsList.module.css'
import PriorityListItem from './PriorityListItem';


const PriorityNewsList = (props) =>{

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    
    const fetchArticlesHandler = useCallback(async()=>{
        setIsLoading(true);
        setError(null);
        try{
            let response;
            if(props.section===undefined){
                response = await axios.get('http://localhost:3001/article-summaries?priority=1&_sort=publishedAt&_limit=10');
            }
            else{
                response = await axios.get(`http://localhost:3001/article-summaries?category_name=${props.section}&priority=1&_sort=publishedAt&_limit=10`);
            }

            if(response.data.length<1){
                throw new Error('No Data Found!')
            }

            // response.data.splice(0,1);
            await setArticles(()=>response.data);
        }catch(error){
            setError(error.message);
            console.log(error.message);
        }

        setIsLoading(false);
        
    }, [props.section]);

    useEffect(()=>{
        fetchArticlesHandler();
    }, [fetchArticlesHandler]);
    
    if (error){
        return <p>{error}</p>
    }

    return <div className={styles.priority_list}>
        {articles.map((data,index)=>{
            return <PriorityListItem key={data.id} article={data}></PriorityListItem>
        })}
    </div>
    
}

export default PriorityNewsList;