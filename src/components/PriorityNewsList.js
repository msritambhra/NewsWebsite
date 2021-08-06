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
        setError(false);
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

            await setArticles(()=>response.data);
        }catch(error){
            setError(error.message);
            console.log(error.message);
        }

        setIsLoading(false);
        
    }, [props.section]);

    console.log(articles);
    useEffect(()=>{
        fetchArticlesHandler();
    }, [fetchArticlesHandler])

    return <div className={styles.priority_list}>
        {/* <div className={styles['heading-container']}>
            <div className={styles.blink}>
                <i className="fas fa-circle"></i>
            </div>
            Top News
        </div> */}
        {articles.map((data,index)=>{
            return <PriorityListItem key={data.id} article={data}></PriorityListItem>
        })}
    </div>
    
}

export default PriorityNewsList;