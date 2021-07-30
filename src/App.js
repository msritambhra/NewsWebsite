import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header1';
import Home from './components/Views/Home';

const World = () => (
  <div>
    <h2>World</h2>
  </div>
);

const Politics = () => (
  <div>
    <h2>Politics</h2>
  </div>
);

const Technology = () => (
  <div>
    <h2>Technology</h2>
  </div>
);

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/:page' component={Header} />
        <Route exact path='/' component={Header} />

        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/world' component={World} />
        <Route exact path='/politics' component={Politics} />
        <Route exact path='/technology' component={Technology} />
      </Router>
    </div>
  );
}

export default App;

