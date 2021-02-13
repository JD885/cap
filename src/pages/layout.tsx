import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ListItem, ListItemText } from '@material-ui/core';
import auth from '../auth/auth';
import {translate} from "../constants/translate";

export const Layout = withRouter(({ history }) => {

  const translation = translate.use().layoutPage;
  const listItemStyle = {
    height: '25vh'
  };
  const listItemTextStyle = { display: "flex", justifyContent: 'center' };
  const buttonStyle = { padding: '2rem' };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '24px' }}>
        <h1 >{translation.mainMenu}</h1>
        <Button style={buttonStyle} onClick={() => {
          auth.logout(() => {
            history.push('/');
          });
        }}>Logout</Button>
      </div>
      <ListItem style={listItemStyle} button component={Link} to="/app/scheduleTouchpoint" >
        <ListItemText style={listItemTextStyle} primary={translation.schedule} />
      </ListItem>
      <ListItem style={listItemStyle} button component={Link} to="/app/coacheeSelector" >
        <ListItemText style={listItemTextStyle} primary="Coachee Selector" />
      </ListItem>
      <ListItem style={listItemStyle} button component={Link} to="/app/dashboard/company" >
        <ListItemText style={listItemTextStyle} primary="Admin Dashboard" />
      </ListItem>
    </div >
  );
});
