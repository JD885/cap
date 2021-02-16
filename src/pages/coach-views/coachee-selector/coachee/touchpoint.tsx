import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

export function Touchpoint() {
  const listItemStyle = {
    height: '15vh'
  };
  const listItemTextStyle = { display: "flex", justifyContent: 'center' };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '24px' }}>
        <h1 >Touchpoints Page</h1>
      </div>
      <ListItem style={listItemStyle} button component={Link} to="/app/qualityTracker/recentTouchpoints" >
        <ListItemText style={listItemTextStyle} primary="Quality Tracker / Notes" />
      </ListItem>
      <hr />
      <ListItem style={listItemStyle} button component={Link} to="/app/meeting" >
        <ListItemText style={listItemTextStyle} primary="Meeting One on One" />
      </ListItem>
      <ListItem style={listItemStyle} button component={Link} to="/app/field" >
        <ListItemText style={listItemTextStyle} primary="Field Meeting" />
      </ListItem>
      <ListItem style={listItemStyle} button component={Link} to="/app/meetingTraining" >
        <ListItemText style={listItemTextStyle} primary="Meeting / Training" />
      </ListItem>
      <ListItem style={listItemStyle} button component={Link} to="/app/triad" >
        <ListItemText style={listItemTextStyle} primary="Triad" />
      </ListItem>
    </div >
  );
}
