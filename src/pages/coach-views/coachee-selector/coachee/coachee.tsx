import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { Tooltip } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '../../../../components/tab-panel'
import { ScheduleTouchpoint } from '../../triad-no-coachee/scheduleTouchpoint'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import profilePlaceholderImg from '../../../../img/profile-placeholder.png';
import { getCoacheeInfo } from "../../../../api/api";
import { coacheeInfo } from '../../../../models/coacheeInfo';
import { useQuery} from 'react-query';
import { CoacheeProfileSkeleton } from '../../../../components/skeleton-loader/coachee-profile-skeleton';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { translate } from "../../../../constants/translate";
import {DisplaySurveys} from './survey'
import { Triad } from './triad';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

//all styling should be moved from index.css to here
const useStyles = makeStyles(() => ({
  button: {
    textTransform: "none",
    margin: "auto",
    width:"150px"
  },
  skeleton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'    
  }
}));

function dateDiff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  return (second-first)/(1000*60*60*24);
}

export const Coachee = withRouter(({ history, match }) => {
  //translations
  const translation = translate.use().coacheePage;

  //get styles from above
  const classes = useStyles();

  let currentDate = new Date();
  let coacheeInfo;

  //get coacheeList data using using the coachee id
  const coacheeInfoQuery = useQuery<coacheeInfo[],Error,coacheeInfo[]>("coacheeInfo",()=> getCoacheeInfo((match.params.id)?.toString()!));
  
  //when coacheeInfoQuery is succesful
  if (coacheeInfoQuery.isSuccess) {
    coacheeInfo = coacheeInfoQuery.data;
    //get survey and ABS due dates
    let surveyDate = new Date(coacheeInfo[0].surveyDueDate);
    let absDate = new Date(coacheeInfo[0].absDueDate);
    let surveyTimeLeft = dateDiff(currentDate, surveyDate);
    let absTimeLeft = dateDiff(currentDate, absDate);
    //assign colour and tooltip to coachee depending on due dates
    //survey logic
    if (surveyTimeLeft < 0) {
      coacheeInfo.surveyColour = "red";
      coacheeInfo.surveyTooltip = translation.survey + " " + translation.pastDue + "!";
    }
    else if (surveyTimeLeft < 14) {
      coacheeInfo.surveyColour = "orange";
      coacheeInfo.surveyTooltip = translation.survey + " " + translation.dueIn + " " + Math.floor(surveyTimeLeft) + " days.";
    }
    else {
      coacheeInfo.surveyColour = "green";
      coacheeInfo.surveyTooltip = translation.nothingDue;
    }
    //abs logic
    if (absTimeLeft < 0) {
      coacheeInfo.absColour = "red";
      coacheeInfo.absTooltip = translation.abs + " " + translation.pastDue + "!";
    }
    else if (absTimeLeft < 14) {
      coacheeInfo.absColour = "orange";
      coacheeInfo.absTooltip = translation.abs + " " + translation.dueIn + " " + Math.floor(absTimeLeft) + " days.";
    }
    else {
      coacheeInfo.absColour = "green";
      coacheeInfo.absTooltip = translation.nothingDue;
    }
  }

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
      {/* Coachee Profile Info */}
      {(coacheeInfoQuery.isLoading && <div className={classes.skeleton}><CoacheeProfileSkeleton/></div>)}
      {coacheeInfoQuery.isSuccess && 
      <div>
        <br/><br/>
        {coacheeInfo.map((coachee:coacheeInfo)=>
        {
          return(
            <div className="container flex-items vertical" key={coachee.coacheeId}>
            <img src={profilePlaceholderImg} alt="Coachee profile"></img>
            <div>
              <h2>{coachee.name}</h2>
              <div className="flex-items">
                <p>{coachee.email}</p>
                <p>{coachee.cellNumber}</p>
              </div>
              <div className='border-line'></div>
              <div className="flex-items">
                <div>
                  <h4>{translation.team}</h4>
                  <p>{coachee.teamNumber}</p>
              </div>
              <div>
                <h4>{translation.office}</h4>
                <p>{coachee.officeNumber}</p>
              </div>
              <div>
                <h4>{translation.building}</h4>
                <p>{coachee.building}</p>
              </div>
              <div>
                <h4>{translation.workLocation}</h4>
                <p>{coachee.workLocation}</p>
              </div>
              </div>
            </div>
              <Button className={classes.button} color="primary" variant="contained">{translation.editCoachee}</Button>
            </div>
          )
        })}
      </div>}      
      
      {coacheeInfoQuery.isSuccess && 
      <div>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label={translation.touchpoints} {...a11yProps(0)}/>
          <Tooltip title={<span style={{ fontSize: '1rem' }}>{coacheeInfo.absTooltip}</span>}>
            <Tab label={translation.abss} icon={<WatchLaterIcon style={{ color: coacheeInfo.absColour }}/>} {...a11yProps(1)}/>
          </Tooltip>
          <Tooltip title={<span style={{ fontSize: '1rem' }}>{coacheeInfo.surveyTooltip}</span>}>
            <Tab label={translation.surveys} icon={<WatchLaterIcon style={{ color: coacheeInfo.surveyColour }}/>} {...a11yProps(2)}/>
          </Tooltip>
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <ScheduleTouchpoint coacheeID={String(match.params.id)}/>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          ABS Module
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <DisplaySurveys id={match.params.id}/>
        </TabPanel>  
      </div>}
    </>
  );
});
