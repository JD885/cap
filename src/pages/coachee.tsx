import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withRouter } from "react-router-dom";

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

export const Coachee = withRouter(({ history, match }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('touchpoint');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    history.push('/app/coachee/' + newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <h1 style={{ display: "flex", justifyContent: 'center' }}>Coachee</h1>
        <Tabs
          value={match.params.id}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Touchpoints" {...a11yProps(0)} value='touchpoint' />
          <Tab label="ABS Modules" {...a11yProps(1)} value='abs' />
          <Tab label="Survey" {...a11yProps(2)} value='survey' />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={'touchpoint'}>
        Touchpoints Implementation
      </TabPanel>
      <TabPanel value={value} index={'abs'}>
        ABS Modules Implementation
      </TabPanel>
      <TabPanel value={value} index={'survey'}>
        Survey Implementation
      </TabPanel>

    </div>
  );
});
