import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '../../components/tab-panel'
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import {Abs} from './abs/abs';

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 1600,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  panels:{
      width: '80vw',
      height:'1600px',
  }
}));

export const Dashboard = withRouter(({ history, match }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(match.params.id);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    history.replace('/app/dashboard/' + newValue);
  };

  return (
    <>
      <Typography variant='h5' align='center' color='primary'>Dashboard</Typography>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Create / Update Company" {...a11yProps(0)} value='company' />
          <Tab label="Create Coach Login" {...a11yProps(1)} value='coach' />
          <Tab label="Create New CAP" {...a11yProps(2)} value='cap' />
          <Tab label="Quality Tracker" {...a11yProps(3)} value='qualityTracker' />
          <Tab label="Data to CSV" {...a11yProps(4)} value='data' />
          <Tab label="Data Visualization" {...a11yProps(5)} value='dataVisualization' />
          <Tab label="Goals for Coachee" {...a11yProps(6)} value='coacheeGoals' />
          <Tab label="Create / Update ABS Module" {...a11yProps(7)} value='absCRUD' />
        </Tabs>
        <TabPanel value={value} index={'company'}>
          Implement Create/Update Company
      </TabPanel>
        <TabPanel value={value} index={'coach'}>
          Implement Create Coach Login
      </TabPanel>
        <TabPanel value={value} index={'cap'}>
          Implement Create New CAP
      </TabPanel>
        <TabPanel value={value} index={'qualityTracker'}>
          Implement Quality Tracker
        </TabPanel>
        <TabPanel value={value} index={'data'}>
          Implement Data to CSV
        </TabPanel>
        <TabPanel value={value} index={'dataVisualization'}>
          Implement Data Visualization
        </TabPanel>
        <TabPanel value={value} index={'coacheeGoals'}>
          Implement Goals for Coachee
        </TabPanel>
        <TabPanel value={value} index={'absCRUD'} >
          <div className={classes.panels}>
          <Abs />
          </div>   
        </TabPanel>
      </div>
    </>
  );
});