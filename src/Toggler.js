import React from 'react';
const Toggler = function (props) {
  return (
    <a onClick={props.onClick}>
      <i className= {props.on?props.onClass:props.offClass} />
    </a>
  );
};

export default Toggler;
