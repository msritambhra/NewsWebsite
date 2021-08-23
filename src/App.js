import styles from './App.module.css'
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { useContext } from 'react';
import Section from './views/Section';
import Article from './views/Article';
import NotFound from './views/NotFound';
import Admin from './views/Admin';
import LogoHeader from './components/NavBar/LogoHeader';
import AuthHeader from './components/AuthHeader';
import AdminNav from './components/Admin/Layout/AdminNav';
import AuthForm from './components/Admin/Auth/AuthForm';
import AuthContext from './store/auth-context';
import AdminHome from './components/Admin/UserPages/AdminHome';
import CreateArticle from './components/Admin/UserPages/CreateArticle'
import AddArticlePriority from './components/Admin/UserPages/AddArticlePriority'
import CreatePList from './components/Admin/UserPages/CreatePList';
import DeleteArticlePriority from './components/Admin/UserPages/DeleteArticlePriority';

const App = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn)
    // return(
    //   <div>
    //     <header className={styles.header}>
    //       <NavBar></NavBar>
    //     </header>
    //     <div className={styles.content}>
    //       <Switch>
    //         <Route exact path="/">
    //           <Redirect to="/home"></Redirect>
    //         </Route>
    //         <Route path="/home">
    //           {/* <Home></Home> */}
    //           <Section></Section>
    //         </Route>
    //         <Route exact path="/section/:section_name">
    //           <Section></Section>
    //         </Route>
    //         <Route exact path="/article/:article_id">
    //           <Article></Article>
    //         </Route>
    //         <Route exact path="/admin">
    //           <Admin></Admin>
    //         </Route>
    //         <Route path="*">
    //           <NotFound></NotFound>
    //         </Route>
    //       </Switch>
    //     </div>
    // </div>
    return(<div>
        
        
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
                {/* <Home></Home> */}
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
            <Route exact path="/article/:article_id">
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
    </div>
    );
}

export default App;