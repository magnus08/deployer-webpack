import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectList from './ProjectList';

class App extends React.Component {
    state = {
        projects: [],
    };
    render() {
        return (
            <div className='App'>What?
                <ProjectList/>
            </div>
        )
    };
}

export default App;
