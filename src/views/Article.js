import {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import CommentBox from '../components/CommentBox'
import PriorityNewsList from '../components/PriorityNewsList'
import styles from './Article.module.css'

const Article = () =>{
    const params = useParams();
    
    const [article, setArticle] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
   
    const content = '';
    
    const fetchArticleHandler = useCallback(async()=>{
        setIsLoading(true);
        setError(false);
        let response;
        try{
            response = await axios.get(`http://localhost:3001/article-summaries/${params.article_id}`);
            /* Handle 404 Response */
            if(response.data.length<1){
                throw new Error('No Data Found!')
            }

            await setArticle(()=>response.data);
            
        }catch(error){
            setError(error.message);
            console.log(error.message);
        }

        setIsLoading(false);
        
    }, [params.article_id]);

    useEffect(()=>{
        fetchArticleHandler();
    }, [fetchArticleHandler]);
    
    return (<div className={styles['main-sidebar']}>
        <main className={`${styles.main} ${styles.col}`}>
            <section className={styles.article}>
                <article>
                    <div className={styles.article__category}>{article.category_name}</div>
                    <h1 className={styles.aticle__title}><span>{article.title}</span></h1>
                    <div className={styles.sub_header}>
                        <div className={styles.article__date}>{article.publishedAt}</div>
                        {/* Add -Share on social Media -Star*/}
                    </div>
                    <div className={styles.article__image}>
                        <img src={article.image} alt={article.title}></img>
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
            <PriorityNewsList section={article.category_name}></PriorityNewsList>
        </aside>

    </div>);
}

export default Article;