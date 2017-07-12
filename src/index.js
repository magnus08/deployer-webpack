

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

function projects(state = {projects: [], initializing: false}, action) {
  console.log("action: ", action);
  if (action.type === 'READ_PROJECTS') {
    console.log("ProjectReducer: READ_PROJECTS", action);
    return {
      ...state,
      initializing: false,
      projects: action.projects
    };
  } else if (action.type === 'READING_PROJECTS') {
    return {
      ...state,
      initializing: true
    };
  } else if (action.type === 'TOGGLE_PROJECT_AUTODEPLOY') {
    return {
      ...state,
      projects: updateProp(state.projects, action.id, 'autoDeploy', (project) => !project.autoDeploy)
    };
  } else if (action.type === 'TRIGGER_PROJECT_REBUILD') {
    return {
      ...state,
      projects: updateProp(state.projects, action.id, 'rebuilding', (project) => true)
    }
  } else if (action.type === 'PROJECT_REBUILD_DONE') {
    return {
      ...state,
      projects: updateProp(state.projects, action.id, 'rebuilding', (project) => false)
    }
  } else if (action.type === 'TRIGGER_PROJECT_REDEPLOY') {
    return {
      ...state,
      projects: updateProp(state.projects, action.id, 'redeploying', (project) => true)
    }
  } else if (action.type === 'PROJECT_DEPLOY_DONE') {
    return {
      ...state,
      projects: updateProp(state.projects, action.id, 'redeploying', (project) => false)
    }
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
