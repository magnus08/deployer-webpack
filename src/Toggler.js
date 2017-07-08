import React from 'react';
import PropTypes from 'prop-types';
class Toggler extends React.Component {
  state = {
    on: false
  };

  toggle = (evt) => {
    this.setState({
      on: !this.state.on
    })

  }

  static propTypes = {
    onClass: PropTypes.string,
    offClass: PropTypes.string
  };

  render() {
    return (
      <a onClick={this.toggle}>
        <i className= { this.state.on?this.props.onClass:this.props.offClass } />
      </a>
    );
  }
}

export default Toggler;
