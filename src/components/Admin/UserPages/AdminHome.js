import { Link } from "react-router-dom"
import styles from './AdminHome.module.css'

const AdminHome = () =>{
    return (
        <div className={styles['features-container']}>
            <h1 className={styles['welcome-header']}>Welcome</h1>
            <div className={styles['feature-links']}>
                <ul>
                    <Link to="/admin/create-article"><li>Create Article <i className="fas fa-chevron-right"></i></li></Link>
                    <Link to="/admin/create-article"><li>Create Priority List <i className="fas fa-chevron-right"></i></li></Link>
                    <Link to="/admin/create-article"><li>Add Article to a Priority List <i className="fas fa-chevron-right"></i></li></Link>
                </ul>
            </div>
        </div>
    )
}

export default AdminHome;