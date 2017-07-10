import React from 'react';
import Project from './Project';
import Client from './Client';
import {connect} from 'react-redux'

const ProjectList = (props) => {

  const projectComponents = props.projects.map((project) => (
    <Project
      key={'project-' + project.id}
      id={project.id}
      title={project.title}
      path={project.path}
      autoDeploy={project.autoDeploy}
      redeploying={project.redeploying}
      rebuilding={project.rebuilding}
    />
  ));

  const componentDidMount = () => {
    console.log("ComponentDidMount!!!");
    // dispatch({ type: "READ_PROJECTS" })
  }


  return (
    <div className='ui one column relaxed grid'>
      <div className="column">
        <table className="ui blue right aligned table">
          <thead>
            <tr>
              <th className="center aligned">Auto</th>
              <th className="left aligned">Project</th>
              <th className="center aligned">Redeploy</th>
              <th className="center aligned">Maven</th>
            </tr>
          </thead>
          <tbody>
            {projectComponents}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const projects = state.projects;

  return {
    projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
