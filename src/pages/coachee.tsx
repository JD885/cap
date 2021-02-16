import React, {useState}from 'react';
import { Link, withRouter } from "react-router-dom";
import { ListItem, ListItemText } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {TabPanel} from '../components/tab-panel'
import {ScheduleTouchpoint} from './scheduleTouchpoint'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}


export const Coachee = withRouter(({ history, match }) => {


  //TEMPORARY STYLING
  const listItemStyle = {
    height: '15vh'
  };
  const listItemTextStyle = { display: "flex", justifyContent: 'center' };

  const [tabIndex, setTab] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', background: '#bbbbbb' }}>
        <p>Coachee Profile Form and Edit Button</p>
        <p style={{marginLeft: '40px'}}>Coachee ID: {String(match.params.id)}</p>
      </div>

      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Touchpoint" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />

      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <ScheduleTouchpoint coacheeID={String(match.params.id)}/>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        Item Three
      </TabPanel>
    </>
  );
});
