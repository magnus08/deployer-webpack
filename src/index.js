

import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import './semantic-ui/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import App from './App'

const reducer = combineReducers({
  projects: projectReducer
});

function projectReducer(state = [], action) {
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
    console.log("ProjectReducer: TOGGLE_PROJECT_AUTODEPLOY", action);
    const id = action.id;
    return state.map((project) => {
      if(id === project.id) {
        return {
          ...project,
          autoDeploy: !project.autoDeploy
        }
      } else {
        return project;
      }
    })
  } else if (action.type === 'TRIGGER_PROJECT_REBUILD') {
    console.log("ProjectReducer: TRIGGER_PROJECT_REBUILD", action);
    const id = action.id;
    return state.map((project) => {
      if(id === project.id) {
        return {
          ...project,
          rebuilding: true
        }
      } else {
        return project;
      }
    })
  } else if (action.type === 'PROJECT_REBUILD_DONE') {
    console.log("ProjectReducer: PROJECT_REBUILD", action);
    const id = action.id;
    return state.map((project) => {
      if(id === project.id) {
        return {
          ...project,
          rebuilding: false
        }
      } else {
        return project;
      }
    })
  } else if (action.type === 'TRIGGER_PROJECT_REDEPLOY') {
    // TODO: This is most likely the wrong way of changing state
    console.log("ProjectReducer: TRIGGER_PROJECT_REDEPLOY", action);
    const id = action.id;
    return state.map((project) => {
      if(id === project.id) {
        return {
          ...project,
          redeploying: true
        }
      } else {
        return project;
      }
    })
  } else if (action.type === 'PROJECT_DEPLOY_DONE') {
    // TODO: This is most likely the wrong way of changing state
    console.log("ProjectReducer: PROJECT_DEPLOY_DONE", action);
    const id = action.id;
    return state.map((project) => {
      if(id === project.id) {
        return {
          ...project,
          redeploying: false
        }
      } else {
        return project;
      }
    })
  } else {
    return state;
  }
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
