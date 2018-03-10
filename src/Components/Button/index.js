import React from 'react';
import './style.css';

export  function Button(props){
    return     <button className="btn" onClick={props.Click} ><i className={`fa fa-${props.Icon}`}></i> {props.Text||""}</button>
  
  }
  
  //function RadioButtonSet(props){ }
  
