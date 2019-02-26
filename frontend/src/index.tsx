import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './assets/stylesheets/css/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
      <App/>
  </Router>
,
  document.getElementById('root')as HTMLElement
);


registerServiceWorker();
