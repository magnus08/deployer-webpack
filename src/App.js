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
    // TODO: This is most likely the wrong way of changing state
    console.log("ProjectReducer: TOGGLE_PROJECT_AUTODEPLOY", action);
    const id = action.id;
    const index = state.findIndex(
      (p) => p.id === action.id
    );
    if(index == -1) {
      console.log("Cant find index for id ", id);
      return state;
    }
    const project = state[index];
    const newProject = {
      ...project,
      autoDeploy: !project.autoDeploy
    }

    return [
      ...state.slice(0, index),
      newProject,
      ...state.slice(
        index + 1, state.length
      ),
    ]
  } else if (action.type === 'TRIGGER_PROJECT_REBUILD') {
    // TODO: This is most likely the wrong way of changing state
    console.log("ProjectReducer: TRIGGER_PROJECT_REBUILD", action);
    const id = action.id;
    const index = state.findIndex(
      (p) => p.id === action.id
    );
    if(index == -1) {
      console.log("Cant find index for id ", id);
      return state;
    }
    const project = state[index];
    const newProject = {
      ...project,
      rebuilding: true
    }

    return [
      ...state.slice(0, index),
      newProject,
      ...state.slice(
        index + 1, state.length
      ),
    ]
  } else if (action.type === 'TRIGGER_PROJECT_REDEPLOY') {
    // TODO: This is most likely the wrong way of changing state
    console.log("ProjectReducer: TRIGGER_PROJECT_REDEPLOY", action);
    const id = action.id;
    const index = state.findIndex(
      (p) => p.id === action.id
    );
    if(index == -1) {
      console.log("Cant find index for id ", id);
      return state;
    }
    const project = state[index];
    const newProject = {
      ...project,
      redeploying: true
    }

    return [
      ...state.slice(0, index),
      newProject,
      ...state.slice(
        index + 1, state.length
      ),
    ]
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
