import React from 'react';
import Toggler from './Toggler';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Project extends React.Component {

  render() {
    return (
      <tr>
        <td className='center aligned'>
          <Toggler
            on={this.props.autoDeploy}
            onClass="toggle on icon"
            offClass="toggle off icon"
            onClick={() => this.props.actionAutoDeploy(this.props.id)}
          />
        </td>
        <td className='left aligned'>
          <p>
            {this.props.title}
          </p>
        </td>
        <td className='center aligned'>
          <a onClick={() => this.props.actionRedeploy(this.props.id)}>
            <i className= { this.props.redeploying?'hourglass half icon':'refresh icon' } />
          </a>
        </td>
        <td className='center aligned'>
          <a onClick={() => this.props.actionRebuild(this.props.id)}>
            <i className= { this.props.rebuilding?'hourglass half icon':'recycle icon' } />
          </a>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  const projects = state.projects;

  return {
    projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  // TODO: I have no clue why i need to use bindActionCreators here, it should just work with thunks
  return bindActionCreators({
    actionAutoDeploy: (id) => (
      {
        type: 'TOGGLE_PROJECT_AUTODEPLOY',
        id: id
      }
    ),
    actionRedeploy: (id) => (dispatch) => {
      dispatch({
        type: 'TRIGGER_PROJECT_REDEPLOY',
        id: id
      });
      return setTimeout(() => dispatch(
        {
          type: 'PROJECT_DEPLOY_DONE',
          id: id
        }), 2000)
      },
      actionRebuild: (id) => (dispatch) => {
        dispatch({
          type: 'TRIGGER_PROJECT_REBUILD',
          id: id
        });
        return setTimeout(() => dispatch(
          {
            type: 'PROJECT_REBUILD_DONE',
            id: id
          }), 4000)
        }
      }, dispatch)
    }

    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(Project);
