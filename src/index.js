import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './semantic-ui/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
