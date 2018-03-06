import React from 'react';
import './style.css';
import {Button} from '../Button';


export default function StoryCard(props) {
    return (
      <div
        className="story-card"
        style={{
          gridArea: `1 / S${props.from
            .toLocaleDateString()
            .replace(/\//g, "_")} / 1 / S${props.to
            .toLocaleDateString()
            .replace(/\//g, "_")}`,
          zIndex: props.order,
          marginTop: props.order - 10 + "em" //Todo: It create stack of cards which has overlap . (this property will inject to this component by the swim-lane in feauter)
          //gridRow:props.order
        }}
      >
        <input type="checkbox" className="card-switch" />

        <div className="card-toolbar title-bar">
            <Button Text="" Icon="sync card-switch-label" />
            <Button Text="" Icon="info-circle"/>
            <Button Text="" Icon="code-branch"/>
            <Button Text="" Icon="address-card"/>
            {props.title +props.estimateDays +"- days)"}
            
        </div>
       
        <div className="front">
  
           <div className="card-head">
             <img className="user-image" alt="user" src={props.userImage|| "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Qe42BK70LjD5j2UUe5LKExgoaYgOx7qMU00n5H810iLP1Q-D"} />
             <hr/>
             Assigned to: {props.assigned||"---"}
             <hr/>
             
             dueDate: <br/>{props.dueDate.toLocaleDateString()}
          <hr/>
            
            startDate: <br/>{props.startDate.toLocaleDateString()}
          </div>
          
        <div className="card-body">
            summary: <br/>{props.summary}
          <br/>
          <br/>
            labels: <br/>{props.labels}
          </div>
          
          
        </div>
        <div className="back">
          <span className="header">Decription:</span>
          <p>{props.decription}</p>
        </div>
      </div>
    );
  }
  