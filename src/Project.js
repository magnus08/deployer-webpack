import React from 'react';
import Toggler from './Toggler';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Project = (props) => {
  return (
    <tr>
      <td className='center aligned'>
        <Toggler
          on={props.autoDeploy}
          onClass="toggle on icon"
          offClass="toggle off icon"
          onClick={() => props.actionAutoDeploy(props.id)}
        />
      </td>
      <td className='left aligned'>
        <p>
          {props.title}
        </p>
      </td>
      <td className='center aligned'>
        <Toggler
          on={props.redeploying}
          onClass="hourglass half icon"
          offClass="refresh icon"
          onClick={() => props.actionRedeploy(props.id)}
        />
      </td>
      <td className='center aligned'>
        <Toggler
          on={props.rebuilding}
          onClass="hourglass half icon"
          offClass="recycle icon"
          onClick={() => props.actionRebuild(props.id)}
        />
      </td>
    </tr>
  );
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
