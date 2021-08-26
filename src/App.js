import styles from './App.module.css'

import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';

import NavBar from './components/NavBar/NavBar';
import Section from './Pages/Section/Section';
import Article from './Pages/Article/Article';
import NotFound from './Pages/NotFound/NotFound';
import LogoHeader from './components/LogoHeader/LogoHeader';
import AdminNav from './components/AdminNav/AdminNav';
import Footer from './components/Footer/Footer';
import AuthForm from './components/AdminAuthForm/AuthForm';
import AuthContext from './store/auth-context';
import ApiAuthContext from './store/api-auth-context';
import AdminHome from './Pages/Admin/AdminHome/AdminHome';
import CreateArticle from './Pages/Admin/CreateArticle/CreateArticle'
import AddArticlePriority from './Pages/Admin/AddArticlePriority/AddArticlePriority'
import CreatePList from './Pages/Admin/CreatePList/CreatePList';
import DeleteArticlePriority from './Pages/Admin/DeleteArticlePriority/DeleteArticlePriority';
import ApiLogin from './store/api-login';

const App = () => {
    const authCtx = useContext(AuthContext);
    const apiCtx = useContext(ApiAuthContext);
    
    return(<div>
    {!apiCtx.apiIsLoggedIn && <ApiLogin/>}
    <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <header className={styles.header}>
                <NavBar></NavBar>
              </header>
              <div className={styles.content}>
                <Redirect to="/home"></Redirect>
              </div>
            </Route>
            <Route path="/home">
              <header className={styles.header}>
                  <NavBar></NavBar>
              </header>
              <div className={styles.content}>
                <Section></Section>
              </div>
            </Route>
            <Route exact path="/section/:section_name">
              <header className={styles.header}>
                  <NavBar></NavBar>
              </header>
              <div className={styles.content}>
                <Section></Section>
              </div>
            </Route>
            <Route exact path="/article/:article_id/:article_title">
              <header className={styles.header}>
                  <NavBar></NavBar>
              </header>
              <div className={styles.content}>
                <Article></Article>
              </div>
            </Route>
            <Route exact path="/admin">
              <header className={styles.header}>
                <AdminNav></AdminNav>
              </header>
              <div className={styles.content}>
                {!authCtx.isLoggedIn && <Redirect to="/admin/auth"></Redirect>}
                {authCtx.isLoggedIn && <Redirect to="/admin/home"></Redirect>}
              </div>
            </Route>
            <Route path='/admin/auth'>
              <header className={styles.header}>
                <AdminNav></AdminNav>
              </header>
              <div className={styles.content}>
                {!authCtx.isLoggedIn && <AuthForm></AuthForm>}
                {authCtx.isLoggedIn && <Redirect to="/admin/home"></Redirect>}
              </div>
            </Route>
             
            <Route path='/admin/home'>
              <header className={styles.header}>
                <AdminNav></AdminNav>
              </header>
              <div className={styles.content}>
                {authCtx.isLoggedIn && <AdminHome></AdminHome>}
                {!authCtx.isLoggedIn && <Redirect to='/admin/auth' />}
              </div>
            </Route>
            <Route path='/admin/create-article'>
              <header className={styles.header}>
                <AdminNav></AdminNav>
              </header>
              <div className={styles.content}>
                {authCtx.isLoggedIn && <CreateArticle></CreateArticle>}
                {!authCtx.isLoggedIn && <Redirect to='/admin/auth' />}
              </div>
            </Route>
            <Route path='/admin/add-priority-article'>
              <header className={styles.header}>
                <AdminNav></AdminNav>
              </header>
              <div className={styles.content}>
                {authCtx.isLoggedIn && <AddArticlePriority></AddArticlePriority>}
                {!authCtx.isLoggedIn && <Redirect to='/admin/auth' />}
              </div>
            </Route>
            <Route path='/admin/delete-priority-article'>
              <header className={styles.header}>
                <AdminNav></AdminNav>
              </header>
              <div className={styles.content}>
                {authCtx.isLoggedIn && <DeleteArticlePriority></DeleteArticlePriority>}
                {!authCtx.isLoggedIn && <Redirect to='/admin/auth' />}
              </div>
            </Route>
            <Route path='/admin/create-plist'>
              <header className={styles.header}>
                <AdminNav></AdminNav>
              </header>
              <div className={styles.content}>
                {authCtx.isLoggedIn && <CreatePList></CreatePList>}
                {!authCtx.isLoggedIn && <Redirect to='/admin/auth' />}
              </div>
            </Route>
            <Route path="*">
              <header className={styles.header}>
                <LogoHeader></LogoHeader>
              </header>
              <div className={styles.content}>
                <NotFound></NotFound>
              </div>
            </Route>
          </Switch>
          <Footer/>
          </BrowserRouter>
         
    </div>
    );
}

export default App;