import React, { Component } from 'react';
import thunkMiddleware from 'redux-thunk';
import logo from './logo.svg';
import './App.css';
import ProjectList from './ProjectList';
import {connect} from 'react-redux'


class App extends React.Component {
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
    return (dispatch) => {
        return dispatch({
          type: 'READ_PROJECTS'
        });
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
