import React from 'react';
import Project from './Project';
import Client from './Client';

class ProjectList extends React.Component {
    state = {
        projects: [],
    };

    componentDidMount() {
        this.loadProjectsFromServer();
        // this.setState({ projects: Seed.projects });
    };

    loadProjectsFromServer = () => {
        Client.getProjects((serverProjects) => (
            this.setState({ projects: serverProjects })
        ))
    }

    handleProjectToggleAutodeploy = (projectId) => {
        const nextProjects = this.state.projects.map((project) => {
            if (project.id === projectId) {
                return Object.assign({}, project, {
                    autoDeploy: !project.autoDeploy,
                });
            } else {
                return project;
            }
        });
        this.setState({
            projects: nextProjects,
        });

        console.log(projectId + ' was toggled, new state = ', nextProjects);
    };

    updateRedeploy = (projectId, value)  => {
        console.log("Update redeploy ", projectId, value);
        const nextProjects = this.state.projects.map((project) => {
            if (project.id === projectId) {
                return Object.assign({}, project, {
                    redeploying: value,
                });
            } else {
                return project;
            }
        });
        this.setState({
            projects: nextProjects,
        });
    }

    updateRebuild = (projectId, value)  => {
        console.log("Update rebuild ", projectId, value);
        const nextProjects = this.state.projects.map((project) => {
            if (project.id === projectId) {
                return Object.assign({}, project, {
                    rebuilding: value,
                });
            } else {
                return project;
            }
        });
        this.setState({
            projects: nextProjects,
        });
    }

    handleProjectRedeploy = (projectId) => {
        this.updateRedeploy(projectId, true);
        Client.redeploy(projectId)
        .then(
            () => this.updateRedeploy(projectId, false)
        );
    }

    handleProjectRebuild = (projectId) => {
        this.updateRebuild(projectId, true);
        Client.rebuild(projectId)
        .then(
            () => this.updateRebuild(projectId, false)
        );
    }

    render() {
        const projects = this.state.projects.sort((a, b) => (
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
                onToggleAutoDeploy={this.handleProjectToggleAutodeploy}
                onRedeploy={this.handleProjectRedeploy}
                onRebuild={this.handleProjectRebuild}
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
