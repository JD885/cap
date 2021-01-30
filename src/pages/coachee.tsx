import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { ListItem, ListItemText } from '@material-ui/core';

export const Coachee = withRouter(({ history, match }) => {

  //TEMPORARY STYLING
  const listItemStyle = {
    height: '15vh'
  };
  const listItemTextStyle = { display: "flex", justifyContent: 'center' };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', background: '#bbbbbb' }}>
        <p>Coachee Profile Form and Edit Button </p>
      </div>
      <div style={{ display: 'flex' }}>
        <ListItem style={listItemStyle} button component={Link} to="/app/abs" >
          <ListItemText style={listItemTextStyle} primary="ABS Module" />
        </ListItem>
        <ListItem style={listItemStyle} button component={Link} to="/app/touchpoint" >
          <ListItemText style={listItemTextStyle} primary="Touchpoint" />
        </ListItem>
        <ListItem style={listItemStyle} button component={Link} to="/app/survey" >
          <ListItemText style={listItemTextStyle} primary="Survey" />
        </ListItem>
      </div>
      <Link to="/app/coacheeSelector" >&lt;&lt; Go Back  &lt;&lt;</Link>
    </>
  );
});
