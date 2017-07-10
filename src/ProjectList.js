import React from 'react';
import Project from './Project';
import Client from './Client';

class ProjectList extends React.Component {
  componentDidMount() {
    window.store.subscribe(() => this.forceUpdate());
    window.store.dispatch({
      type: 'READ_PROJECTS'
    })

  };

  loadProjectsFromServer = () => { // TODO: This will be rewritten, not used atm
    Client.getProjects((serverProjects) => (
      this.setState({ projects: serverProjects })
    ))
  }

  render() {
    const state = window.store.getState();

    const projects = state.projects.sort((a, b) => (
      a.id - b.id
    ));
    const projectComponents = projects.map((project) => (
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
}

export default ProjectList;
