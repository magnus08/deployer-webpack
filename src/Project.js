import React from 'react';
import Toggler from './Toggler';
class Project extends React.Component {

  actionTriggerRedeploy = () => {
    return {
      type: 'TRIGGER_PROJECT_REDEPLOY',
      id: this.props.id
    }
  }

  actionDeployDone = () => {
    return {
      type: 'PROJECT_DEPLOY_DONE',
      id: this.props.id
    }
  }

  actionRedeploy = () => (dispatch) => {
    dispatch(this.actionTriggerRedeploy());
    setTimeout(() => dispatch(this.actionDeployDone()), 2000)
  }

  actionTriggerRebuild = () => {
    return {
      type: 'TRIGGER_PROJECT_REBUILD',
      id: this.props.id
    }
  }

  actionRebuildDone = () => {
    return {
      type: 'PROJECT_REBUILD_DONE',
      id: this.props.id
    }
  }

  actionRebuild = () => (dispatch) => {
    dispatch(this.actionTriggerRebuild());
    setTimeout(() => dispatch(this.actionRebuildDone()), 5000)
  }


  render() {
    return (
      <tr>
        <td className='center aligned'>
          <Toggler
            on={this.props.autoDeploy}
            onClass="toggle on icon"
            offClass="toggle off icon"
            onClick={() => (
              window.store.dispatch({
                type: 'TOGGLE_PROJECT_AUTODEPLOY',
                id: this.props.id,
              })
            )}
          />
        </td>
        <td className='left aligned'>
          <p>
            {this.props.title}
          </p>
        </td>
        <td className='center aligned'>
          <a onClick={() => (
            window.store.dispatch(this.actionRedeploy())
          )}>
          <i className= { this.props.redeploying?'hourglass half icon':'refresh icon' } />
        </a>
      </td>
      <td className='center aligned'>
        <a onClick={() => (
          window.store.dispatch(this.actionRebuild())
        )}>
        <i className= { this.props.rebuilding?'hourglass half icon':'recycle icon' } />
      </a>
    </td>
  </tr>
);
}
}

export default Project;
