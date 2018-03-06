import React from 'react';
import SwimLane from '../SwimLane';
import StoryCard from  '../StoryCard';
import TimeLine from '../TimeLine';
import './style.css';



class StoryMap extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        swimLanes: [
          { id:1,title: "Epics", jql: `project=Frontend AND issuetype=Epic`,issues:[] }
         ,{ id:2,title: "Epics22", jql: `project=Frontend AND issuetype=Epic`,issues:[] }
        ]
      };
      for(let s of this.state.swimLanes)
        this.FetchIssues(s);
    }
    FetchIssues(swimLane) {
      let url = `https://cors-anywhere.herokuapp.com/https://pinguintest.atlassian.net/rest/api/2/search?jql=${swimLane.jql} ORDER BY duedate`;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic c2FsZWhpMTg2QGdtYWlsLmNvbTprYWhyaXpzYW5n`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(json =>
          this.setState({
          swimLanes:this.state.swimLanes.map(s=>s.id!==swimLane.id? 
                s: Object.assign({},s,{
            issues: json.issues
              .map(m => {
                console.log(m.fields.subtasks.length);
                return {
                  //extFields:m.fields,
                  labels: m.fields.labels.join(", "),
                  decription: m.fields.description,
                  summary: m.fields.summary,
                  url: m.self,
                  id: m.id,
                  title: m.key,
                  key: m.key,
                  dueDate: new Date(m.fields.duedate),
                  startDate: new Date(m.fields.duedate).addWorkDays(
                    -(m.fields.aggregatetimeestimate / 28800)
                  ),
                  estimateDays: m.fields.aggregatetimeestimate / 28800
                };
              })
              .sort((x, y) => x.startDate > y.startDate)
            }))
          })
        )
        .catch(err => alert(err.message));
    }
  
    render() {
      let startSlot =(this.state.swimLanes.map(s=> 
          s.issues.length > 0? s.issues.map(x => x.startDate).reduce((res, cur, idx, arr) =>cur < res ? cur : res):null)
            .reduce((res, cur, idx, arr) => cur < res ? cur : res)||new Date()).addDays(-5);
      let endSlot =(this.state.swimLanes.map(
        s=> s.issues.length > 0? s.issues.map(x => x.dueDate).reduce((res, cur, idx, arr) =>cur > res ? cur : res):null)
        .reduce((res, cur, idx, arr) =>cur > res ? cur : res)||new Date()).addDays(5);
      
      var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      let slotCount = Math.round(Math.abs((startSlot.getTime() - endSlot.getTime()) / oneDay));
  
      
      
      
      return (
        <div className="story-map">
          {
            this.state.swimLanes.map(
              s=>{ let i = 10;
                  return <SwimLane Title={s.title} key={"swimLane_"+s.id} StartDate={startSlot} slots={slotCount}>
                    {
                      s.issues.map(c=><StoryCard {...c} from={c.startDate} to={c.dueDate} order={++i} />)
                    }
                  </SwimLane>
                 }
              )
           }
          <div className="time-line-holder" >
            
            <TimeLine StartDate={startSlot} slots={slotCount} />
          </div>
        </div>
      );
    }
  }
  
  export default StoryMap;