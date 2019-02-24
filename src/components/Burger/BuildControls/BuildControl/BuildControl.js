import React from 'react';
import './BuildControl.scss'

const buildControl = (props) => (
  <div className = 'BuildControl'>
    <div className='Label'>{props.label}</div>
    <button
      className='Remove'
      onClick={props.removed}
      disabled={props.disabled} > Remove </button>
    <button
      className='Add'
      onClick={props.added}     > Add    </button>
  </div>

);

export default buildControl;
