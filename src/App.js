import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import logo from './logo.svg';
import './App.css';
import ProjectList from './ProjectList';

const reducer = combineReducers({
  projects: projectReducer
});

function projectReducer(state = [], action) {
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
    console.log("ProjectReducer: TOGGLE_PROJECT_AUTODEPLOY", action);
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
  } else {
    return state;
  }
}

const store = createStore(reducer);
window.store = store; // TODO: How do i make store accessible globally?

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    return (
      <div className='App'>
        <img src={logo} className="App-logo" alt="logo" />
        <ProjectList/>
      </div>
    )
  };
}

export default App;
