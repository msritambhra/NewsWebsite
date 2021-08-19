import HotNews from '../components/HotNews/HotNews'
import styles from './Home.module.css'

const Home= () =>{
    return (
        <div className={styles['main-sidebar']}>
            <main className={`${styles.main} ${styles.col}`}>
                <div className={styles['hot-news']}>
                    <HotNews></HotNews>
                </div>
                <div className={styles['recent-container']}>
                    <div className={styles.recent}>Recent1</div> {/*these will be replaced by Recent News Components*/}
                    <div className={styles.recent}>Recent2</div>
                    <div className={styles.recent}>Recent3</div>
                    <div className={styles.recent}>Recent4</div>
                    <div className={styles.recent}>Recent5</div>
                </div>
            </main>
            <aside className={`${styles.sidebar} ${styles.col}`}>Aside</aside> {/*This will be replaced by PriorityNews container*/}
        </div>
    )
};

export default Home;