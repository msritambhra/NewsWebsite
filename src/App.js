import styles from './App.module.css'
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Section from './views/Section';

const App = () => {
    return(
      <div>
        <header className={styles.header}>
          <NavBar></NavBar>
        </header>
        <div className={styles.content}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home"></Redirect>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route exact path="/section/:section_name">
              <Section></Section>
            </Route>
            <Route exact path="/article/:article_id">
              <div>Article</div>
            </Route>
          </Switch>
        </div>
    </div>
    );
}

export default App;