import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectList from './ProjectList';
import {connect} from 'react-redux'


class App extends Component {
  componentDidMount() {
    this.props.fetchProjects(); // TODO: Should we really intialize here?
  }
  render() {
    return (
      <div className='App'>
        <img src={logo} className="App-logo" alt="logo" />
        <ProjectList/>
      </div>
    )
  };
}

const fetchProjects = () => {
  const projects = [
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

  return (dispatch) => {
    dispatch({
      type: 'READING_PROJECTS'
    });
    setTimeout(() => dispatch({
      type: 'READ_PROJECTS',
      projects
    }), 2000);
    // return fetch(url).then((response) => {
    //     dispatch({
    //          type: 'AAA',
    //          payload: {
    //              response.json()
    //          }
    //     });
    // });
  }
};

const mapStateToProps = (state, ownProps) => (
  state // TODO: Just passing on state here, does not seem correct
);

export default connect(
  mapStateToProps,
  {
    fetchProjects: fetchProjects
  }
)(App);
