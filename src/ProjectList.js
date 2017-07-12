import React from 'react';
import Project from './Project';
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

  return (
    <div>
      {props.initializing?
        (
          <h1>Loading...</h1>
        )
        :
        (
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
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  const props = {
    projects: state.projects.projects,
    initializing: state.projects.initializing
  }
  console.log("*** ", props);
  return props;
};

export default connect(
  mapStateToProps,
  (dispatch) => ({})
)(ProjectList);
