import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link, withRouter } from "react-router-dom";
import {translate} from "../constants/translate"

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
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const QualityTracker = withRouter(({ history, match }) => {
  const classes = useStyles();
  const translations = translate.use().qualityTracker;
  const [value, setValue] = React.useState(match.params.id);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    history.replace('/app/qualityTracker/' + newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Typography variant='h5' align='center' color='primary' >Quality Tracker</Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable auto tabs example"
        >
          <Tab label={translations.recent} {...a11yProps(0)} value='recentTouchpoints' />
          <Tab label={translations.personal} {...a11yProps(1)} value='notes' />
          <Tab label="Chart" {...a11yProps(2)} value='chart' />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={'recentTouchpoints'}>
        Touchpoints in past 2 weeks Implementation
      </TabPanel>
      <TabPanel value={value} index={'notes'}>
        Personal Notes Implementation
      </TabPanel>
      <TabPanel value={value} index={'chart'}>
        Chart Implementation
      </TabPanel>
    </div>
  );
});