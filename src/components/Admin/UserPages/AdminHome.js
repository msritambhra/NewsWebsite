import { Link } from "react-router-dom"
import styles from './AdminHome.module.css'

const AdminHome = () =>{
    return (
        <div className={styles['features-container']}>
            <h1 className={styles['welcome-header']}>Welcome</h1>
            <div className={styles['feature-links']}>
                <ul>
                    <Link to="/admin/create-article"><li>Create Article <i className="fas fa-chevron-right"></i></li></Link>
                    <Link to="/admin/create-plist"><li>Create Priority List <i className="fas fa-chevron-right"></i></li></Link>
                    <Link to="/admin/add-priority-article"><li>Add Article to Priority List <i className="fas fa-chevron-right"></i></li></Link>
                    <Link to="/admin/delete-priority-article"><li>Delete Article from Priority List <i className="fas fa-chevron-right"></i></li></Link>
                </ul>
            </div>
        </div>
    )
}

export default AdminHome;