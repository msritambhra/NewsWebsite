import {useState, useEffect, useCallback, useContext} from 'react'
import axios from 'axios'
import RecentNewsItem from './RecentNewsItem';
import ApiAuthContext from '../../store/api-auth-context';

const RecentNewsList = (props) =>{

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(null);

    const apiCtx = useContext(ApiAuthContext);
    let token = `Bearer ${apiCtx.apiToken}`;
    
    const fetchArticlesHandler = useCallback(async()=>{
        // setIsLoading(true);
        
        setError(false);
        try{
            let response;
            if(props.section===undefined){
                response = await axios.get('http://localhost:3002/api/article/allArticles?limit=3',{
                    headers: { 
                        Authorization: token
                    }
                });
            }
            else{
                response = await axios.get(`http://localhost:3002/api/category/allArticles/${props.section}?limit=3`,{
                    headers: { 
                        Authorization: token
                    }
                });
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

    if(error){
        return <p>{error}</p>
    }
    return <>
        {
        articles.map((data,index)=>{
            return <RecentNewsItem key={index} article={data}></RecentNewsItem>
        })}
        </>
}

export default RecentNewsList;