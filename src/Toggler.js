import React from 'react';
import PropTypes from 'prop-types';
class Toggler extends React.Component {
  static propTypes = {
    onClass: PropTypes.string,
    offClass: PropTypes.string
  };
  render() {
    return (
      <a onClick={this.handleToggleAutodeploy}>
        <i className= { this.props.autoDeploy?this.props.onClass:this.props.offClass } />
      </a>
    );
  }
}

export default Toggler;
