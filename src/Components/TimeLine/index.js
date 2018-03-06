import React from 'react';
import  '../../Helpers/Date';
import './style.css';

export default function TimeLine(props) {
    let tDate = props.StartDate || new Date(1970, 1, 1);
  
    return (
      <div
        className="time-line"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${props.slots},1fr)`
          //[...Array(props.slots)].map(p=>"1fr").join(" ")
        }}
      >
        {[...Array(props.slots).keys()].map(i => {
          let cDate = tDate.addDays(i);
          return (
            <span key={"TimeSlot"+ cDate.toLocaleDateString()}
              //className="date-holder"
              value={cDate.toLocaleDateString()}
              title={cDate.toDateString()}
              className={[6, 0].indexOf(cDate.getDay()) > -1 ? "weekends" : ""}
            />
          );
        })}
      </div>
    );
  }
  