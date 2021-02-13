import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';
import { API } from "../constants/api-endpoints";
import { getAllCoachees } from "../api/api";
import { coacheeModel } from '../models/coacheeModel';
import { GlobalContext } from '../stores/global-store';

export function CoacheeSelector() {
  const [coachees, setCoachees] = useState([])
  const store = React.useContext(GlobalContext);

  useEffect(()=>{
    (async function myAsync(){
      let allCoachees = await (await getAllCoachees(store._userID!)).json()
      setCoachees(allCoachees)
      console.log(allCoachees)
    })();
  }, [])

  //TEMPORARY STYLING
  const listItemStyle = {
    height: '15vh'
  };
  const listItemTextStyle = { display: "flex", justifyContent: 'center' };

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>Coachee Selector Implementation</h1>
      <Link to="/app/coachee" >Go to Coachee page</Link>
      <br /><br />
      <Link to="/app" >&lt;&lt; Go Back  &lt;&lt;</Link>
      {coachees.map((coachee:coacheeModel)=>
      {
        return(
          <ListItem style={listItemStyle} button component={Link} key={coachee.id} to={`/app/coachee/${coachee.id}`}>
            <ListItemText style={listItemTextStyle} primary={coachee.name}></ListItemText>
          </ListItem>
        )
      })}
    </div>
  );
}
