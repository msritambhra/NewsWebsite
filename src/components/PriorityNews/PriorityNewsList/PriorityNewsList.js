import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import styles from './PriorityNewsList.module.css'
import PriorityListItem from '../PriorityListItem/PriorityListItem'


const PriorityNewsList = (props) =>{

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(null);

    
    const fetchArticlesHandler = useCallback(async()=>{
        // setIsLoading(true);
        setError(null);
        try{
            let response;

            if (props.section===undefined){
                response = await axios.get('http://localhost:3002/api/pList/34/allArticles?limit=-1');
            }
            else if(props.section==="world"){
                response = await axios.get('http://localhost:3002/api/pList/35/allArticles?limit=-1')
                //30
            }
            else if(props.section==="politics"){
                response = await axios.get('http://localhost:3002/api/pList/36/allArticles?limit=-1')
            }
            else if(props.section==="technology"){
                response = await axios.get('http://localhost:3002/api/pList/37/allArticles?limit=-1')
            }
            else if(props.section==="business"){
                response = await axios.get('http://localhost:3002/api/pList/38/allArticles?limit=-1')
            }
            else if(props.section==="health"){
                response = await axios.get('http://localhost:3002/api/pList/39/allArticles?limit=-1')
            }
            else{
                throw new Error('Section not defined!')
            }

            if(response.data.length<1){
                throw new Error('No Data Found!')
            }
            await setArticles(()=>response.data);
        }catch(error){
            setError(error.message);
        }

        // setIsLoading(false);
        
    }, [props.section]);

    useEffect(()=>{
        fetchArticlesHandler();
    }, [fetchArticlesHandler]);
    
    if (error){
        return <p>{error}</p>
    }
    
    return <div className={styles.priority_list}>
        {articles.map((data,index)=>{
            return <PriorityListItem key={index} article={data}></PriorityListItem>
        })}
    </div>
    
}

export default PriorityNewsList;