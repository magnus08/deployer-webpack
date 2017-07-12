

import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import './semantic-ui/semantic.min.css';
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import App from './App'

const reducer = combineReducers({
  projects
});

function projects(state = [], action) {
  console.log("action: ", action);
  if (action.type === 'READ_PROJECTS') {
    console.log("ProjectReducer: READ_PROJECTS");
    return [
      {
        "autoDeploy": false,
        "id": 1,
        "path": "",
        "rebuilding": false,
        "redeploying": false,
        "title": "leweb"
      },
      {
        "autoDeploy": false,
        "id": 2,
        "path": "",
        "rebuilding": false,
        "redeploying": false,
        "title": "boweb"
      },
      {
        "autoDeploy": false,
        "id": 3,
        "path": "",
        "rebuilding": false,
        "redeploying": false,
        "title": "cpweb"
      }
    ];
  } else if (action.type === 'TOGGLE_PROJECT_AUTODEPLOY') {
    return updateProp(state, action.id, 'autoDeploy', (project) => !project.autoDeploy);
  } else if (action.type === 'TRIGGER_PROJECT_REBUILD') {
    return updateProp(state, action.id, 'rebuilding', (project) => true);
  } else if (action.type === 'PROJECT_REBUILD_DONE') {
    return updateProp(state, action.id, 'rebuilding', (project) => false);
  } else if (action.type === 'TRIGGER_PROJECT_REDEPLOY') {
    return updateProp(state, action.id, 'redeploying', (project) => true);
  } else if (action.type === 'PROJECT_DEPLOY_DONE') {
    return updateProp(state, action.id, 'redeploying', (project) => false);
  } else {
    return state;
  }
}

function updateProp(xs, id, prop, updateFn, idProp = 'id') {
    return xs.map((x) => {
      if(id === x[idProp]) {
        return {
          ...x,
          [prop]: updateFn(x)
        }
      } else {
        return x;
      }
    });
}

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
  // registerServiceWorker();
