import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link, withRouter } from "react-router-dom";


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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
    height: 340,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const Dashboard = withRouter(({ history, match }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('company');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    history.push('/app/dashboard/' + newValue);
  };

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>Dashboard</h1>
      <div className={classes.root}>

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={match.params.id}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Create/Update Company" {...a11yProps(0)} value='company' />
          <Tab label="Create Coach Login" {...a11yProps(1)} value='coach' />
          <Tab label="Create New CAP" {...a11yProps(2)} value='cap' />
          <Tab label="Quality Tracker" {...a11yProps(3)} value='qualityTracker' />
          <Tab label="Data to CSV" {...a11yProps(4)} value='data' />
          <Tab label="Data Visualization" {...a11yProps(5)} value='dataVisualization' />
          <Tab label="Goals for Coachee" {...a11yProps(6)} value='coacheeGoals' />
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
      </div>
      <Link to="/app" >&lt;&lt; Go Back  &lt;&lt;</Link>
    </>
  );
});