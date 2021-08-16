import styles from './App.module.css'
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Section from './views/Section';
import Article from './views/Article';
import NotFound from './views/NotFound';
import LogoHeader from './components/LogoHeader';
import AuthHeader from './components/AuthHeader';


const App = () => {
    return(
      <div>
        <header className={styles.header}>
          <AuthHeader></AuthHeader>
          <NavBar></NavBar>
        </header>
        <div className={styles.content}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home"></Redirect>
            </Route>
            <Route path="/home">
              {/* <Home></Home> */}
              <Section></Section>
            </Route>
            <Route exact path="/section/:section_name">
              <Section></Section>
            </Route>
            <Route exact path="/article/:article_id">
              <Article></Article>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </div>
    </div>
    );
}

export default App;