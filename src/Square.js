
import React from 'react';
import './App.css';

function Square(props){
  return(
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;