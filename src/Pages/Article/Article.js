import {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import CommentBox from '../../components/Comments/CommentBox/CommentBox'
import PriorityNewsList from '../../components/PriorityNews/PriorityNewsList/PriorityNewsList'
import SocialShare from '../../components/SocialShare/SocialShare'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import styles from './Article.module.css'


const Article = () =>{
    const params = useParams();
    
    const [article, setArticle] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(null);

    const fetchArticleHandler = useCallback(async()=>{
        setIsLoading(true);
        setError(false);
        let response;
        try{
            response = await axios.get(`http://localhost:3002/api/article/${params.article_id}`);
                // `http://localhost:3002/api/article/${params.article_id}`);
                // `http://localhost:3001/article-summaries/${params.article_id}`);
            /* Handle 404 Response */
            if(response.data.length<1){
                throw new Error('No Data Found!')
            }

            await setArticle(()=>response.data);
            
        }catch(error){
            setError(error.message);
        }

        setIsLoading(false);
        
    }, [params.article_id]);
    
    const articleDateComponents = new Date(article.createdAt).toDateString().split(' ');
    let DateString = articleDateComponents[0] + ', ' + articleDateComponents[1] + ' ' 
            + articleDateComponents[2] + ', ' + articleDateComponents[3];

    useEffect(()=>{
       
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;

        document.body.appendChild(script);
    
        
        fetchArticleHandler();
    }, [fetchArticleHandler]);

    if(isLoading){
        return <div className={styles["loading"]}>
            <LoadingSpinner></LoadingSpinner>
        </div>
    }
    
    if(error){
        return <p>{error}</p>
    }
    return (<div className={styles['main-sidebar']}>
        <main className={`${styles.main} ${styles.col}`}>
            <section className={styles.article}>
                <article>
                    <div className={styles.article__category}>{article.categoryName}</div>
                    <h1 className={styles.aticle__title}><span>{article.title}</span></h1>
                    <div className={styles.sub_header}>
                        <div className={styles.article__date}>{DateString}</div>
                        <div className={styles.social_share}>
                            <SocialShare title={article.title} url={window.location.href} image={article.imageUrl}></SocialShare>
                        </div>
                    </div>
                    <div className={styles.article__image}>
                        <img src={article.imageUrl} alt={article.title}></img>
                    </div>
                    <div className={styles.article__content} dangerouslySetInnerHTML={{ __html: article.content }}></div>
                </article>
            </section>
            <section className={styles['comment-container']}>
                <CommentBox></CommentBox>
            </section> {/*Comment Section*/}
        </main>
        <aside className={`${styles.sidebar} ${styles.col}`}>
            <div className={styles['heading-container']}>
                <span>Recommended Articles</span>
            </div>
            <PriorityNewsList section={article.categoryName}></PriorityNewsList>
        </aside>

    </div>);
}

export default Article;