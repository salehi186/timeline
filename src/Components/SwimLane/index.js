import React from 'react';
import './style.css';


export default function SwimLane(props) {
    let tDate = props.StartDate || new Date(1970, 1, 1);
    return (
      <div
        className="swim-lane"
        style={{
          display: "grid",
          gridTemplateRows: "100%",
          gridTemplateColumns: [...Array(props.slots).keys()]
            .map(
              i =>
                `[S${tDate
                  .addDays(i)
                  .toLocaleDateString()
                  .replace(/\//g, "_")}] 1fr`
            )
            .join(" ")
        }}
        ><div className="swim-lane-title">
        <span>
        {props.Title||""} 
        </span>
        </div>
        {props.children}
      </div>
    );
  }
  