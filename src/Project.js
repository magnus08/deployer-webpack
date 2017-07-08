import React from 'react';
import Toggler from './Toggler';
class Project extends React.Component {
    handleToggleAutodeploy = () => (
        this.props.onToggleAutoDeploy(this.props.id)
    );
    handleRedeploy = () => (
        this.props.onRedeploy(this.props.id)
    );
    handleRebuild = () => (
        this.props.onRebuild(this.props.id)
    );

    render() {
        return (
            <tr>
              <td className='center aligned'>
                  <Toggler onClass="toggle on icon" offClass="toggle off icon"/>
              </td>
                <td className='center aligned'>
                    <a onClick={this.handleToggleAutodeploy}>
                        <i className= { this.props.autoDeploy?'toggle on icon':'toggle off icon' } />
                    </a>
                </td>
                <td className='left aligned'>
                    <p>
                        {this.props.title}
                    </p>
                </td>
                <td className='center aligned'>
                    <a onClick={this.handleRedeploy}>
                        <i className= { this.props.redeploying?'hourglass half icon':'refresh icon' } />
                    </a>
                </td>
                <td className='center aligned'>
                    <a onClick={this.handleRebuild}>
                        <i className= { this.props.rebuilding?'hourglass half icon':'recycle icon' } />
                    </a>
                </td>
            </tr>
        );
    }
}

export default Project;
