import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon, Tooltip } from '@material-ui/core';
import { getCoacheeList } from "../../../api/api";
import { coacheeList } from '../../../models/coacheeList';
import { GlobalContext } from '../../../stores/global-store';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { useQuery} from 'react-query';
import {CoacheeSelectorSkeleton} from '../../../components/skeleton-loader/coachee-selector-skeleton';
import {translate} from "../../../constants/translate";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//fix this
function dateDiff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  return (second-first)/(1000*60*60*24);
}

export function CoacheeSelector() {
  //translations
  const translation = translate.use().coacheeSelector;

  //TEMPORARY STYLING
  const listItemStyle = {
    height: '15vh',
    display: "flex",
    justifyContent: 'center'
  };

  const globalStore = React.useContext(GlobalContext);//access global store  
  let currentDate = new Date();//get the date
  let coacheeList;

  //get coacheeList data using the coach id (userID)
  const coacheeListQuery = useQuery<coacheeList[],Error,coacheeList[]>("coacheeList",()=> getCoacheeList((globalStore._userID)?.toString()!));  

  //when coacheeListQuery is succesful
  if (coacheeListQuery.isSuccess) {
    coacheeList = coacheeListQuery.data;
    //add appropriate colours and tooltips to each coachee  
    //loop for every coachee in the list
    let length = coacheeList.length - 1;
    let i;
    for (i=0; i <= length; i++) {
      //get survey and ABS due dates
      let surveyDate = new Date(coacheeList[i].surveyDueDate);
      let absDate = new Date(coacheeList[i].absDueDate);
      let surveyDateDiff = dateDiff(currentDate, surveyDate);
      let absDateDiff = dateDiff(currentDate, absDate);
      let surveyColour;
      let absColour;
      //assign colour and tooltip to coachee depending on due dates
      if (surveyDateDiff < 0) {//survey logic
        surveyColour = "red";
        coacheeList[i].tooltip = "Survey past due!";
      }
      else if (surveyDateDiff < 14) {
        surveyColour = "orange";
        coacheeList[i].tooltip = "Survey due in " + Math.floor(surveyDateDiff) + " days.";
      }
      else {
        surveyColour = "green";
        coacheeList[i].tooltip = "";
      }
      if (absDateDiff < 0) {//abs logic
        absColour = "red";
        coacheeList[i].tooltip += " ABS past due!";
      }
      else if (absDateDiff < 14) {
        absColour = "orange";
        coacheeList[i].tooltip += " ABS due in " + Math.floor(absDateDiff) + " days.";
      }
      else {
        absColour = "green";
      }
      //colour
      if (surveyColour === "green" && absColour === "green") {
        coacheeList[i].tooltip = "Nothing due in the next two weeks.";
        coacheeList[i].colour = "green";
      }
      if (surveyColour === "red" || absColour === "red") {
        coacheeList[i].colour = "red";
      }
      else if (surveyColour === "orange" || absColour === "orange") {
        coacheeList[i].colour = "orange";
      }
    }//end loop
  }//end if (coacheeListQuery.isSuccess)
  
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>{translation.title}</h1>
      {(coacheeListQuery.isLoading && <div style={{ paddingLeft: "50px", paddingRight: "50px"}}><CoacheeSelectorSkeleton/></div>)}
      {coacheeListQuery.isSuccess && 
      <div>
        <br/><br/>
        {coacheeList.map((coachee:coacheeList)=>
        {
          return(
            <ListItem style={listItemStyle} button component={Link} key={coachee.coacheeId} to={`/app/coachee/${coachee.coacheeId}`}>
              <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Tooltip title={<span style={{ fontSize: '1rem' }}>{coachee.tooltip}</span>}>
                  <ListItemIcon>
                    <WatchLaterIcon style={{ color: coachee.colour }}/>
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary={coachee.name}></ListItemText>
              </div>            
            </ListItem>
          )
       
        })}
      </div>}
      <Fab variant="extended" 
        className="addNewButton"
        size='medium' 
        
        color='primary'
        component={Link} to={'/app/addNewCoachee'}>
              <AddIcon/>
            New Coachee 
       </Fab>
    </div>
  );
}