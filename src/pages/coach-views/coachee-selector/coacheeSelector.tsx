import React, { useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon, Tooltip, TextField, responsiveFontSizes } from '@material-ui/core';
import { getCoacheeList } from "../../../api/api";
import { coacheeList } from '../../../models/coacheeList';
import { GlobalContext } from '../../../stores/global-store';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { useQuery} from 'react-query';
import {CoacheeSelectorSkeleton} from '../../../components/skeleton-loader/coachee-selector-skeleton';
import {translate} from "../../../constants/translate";
import Fuse from 'fuse.js';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';

//fix this
function dateDiff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  return (second-first)/(1000*60*60*24);
}

//all styling should be done here
const useStyles = makeStyles(() => ({
  search: {
    width:"400px",
    fontSize: "1rem"
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px"
  },
  listItemStyle: {
    height: "15vh",
    display: "flex",
    justifyContent: "center"
  }
}));

export function CoacheeSelector() {
  //translations
  const translation = translate.use().coacheeSelector;

  //get styles from above
  const classes = useStyles();

  //for search
  const [search, setSearch] = useState("");

  const globalStore = React.useContext(GlobalContext);//access global store  
  let currentDate = new Date();//get the date
  let coacheeList:coacheeList[] = [];
  let coacheeListDisplay:coacheeList[] = [];
  let noResults:boolean = false;

  //get coacheeList data using the coach id (userID)
  const coacheeListQuery = useQuery<coacheeList[],Error,coacheeList[]>("coacheeList",()=> getCoacheeList((globalStore._userID)?.toString()!));  

  //when coacheeListQuery is succesful
  if (coacheeListQuery.isSuccess) {
    coacheeList = coacheeListQuery.data;
    //add appropriate colours and tooltips to each coachee  
    //loop for every coachee in the list
    let length = coacheeList.length - 1;
    let i:number;
    let listOfNames:string[] = [];//create string list for list of coachee names
    for (i=0; i <= length; i++) {
      //get list of coachee names for search
      listOfNames.push((coacheeList[i].name).toString());
      //get survey and ABS due dates
      let surveyDate = new Date(coacheeList[i].surveyDueDate);
      let absDate = new Date(coacheeList[i].absDueDate);
      let surveyDateDiff = dateDiff(currentDate, surveyDate);
      let absDateDiff = dateDiff(currentDate, absDate);
      let surveyColour:string;
      let absColour:string;
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
    //sort coachees by due date icon colour
    coacheeList.sort((a, b) => (a.colour < b.colour) ? 1 : -1)

    //filter coachees by search
    const options = {
      findAllMatches: true,
      useExtendedSearch: true,
      isCaseSensitive: false,
      minMatchCharLength: 1,
      shouldSort: false,
    };
    //bug: searching "mark" returns maria before mark (not really a bug maria is due sooner)
    let fuse = new Fuse(listOfNames, options);
    let result = fuse.search(search);
    let resultLength = result.length - 1;
    let j:number;
    
    //iterate through coachee names and compare to search results
    if (search !== "") {//if something is in the search box
      if (resultLength >= 0) {//if there is one or more results
        for (i=0; i <= length; i++) {
          for (j=0; j <= resultLength; j++) {
            if (coacheeList[i].name == result[j].item) {
              coacheeListDisplay.push(coacheeList[i]);
            }
          }
        }
      }
      else {//there are no results - show error message
        noResults = true;
      }
    }
    else {//the search box is empty - display the full list
      coacheeListDisplay = coacheeList;
    }
    //sort coachees by due date icon colour
    length = coacheeListDisplay.length - 1;
    for (i=0; i <= length; i++) {
      
    }
  }//end if (coacheeListQuery.isSuccess)
  
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>{translation.title}</h1>
      <Box className={classes.searchBox}>
      <TextField
        className={classes.search}
        variant="outlined"
        multiline
        value={search}
        onChange={(event)=>{setSearch(event.target.value)}}
        label={translation.search}
      />
      </Box>      
      {(coacheeListQuery.isLoading && <div style={{ paddingLeft: "50px", paddingRight: "50px"}}><CoacheeSelectorSkeleton/></div>)}
      {coacheeListQuery.isSuccess && noResults == false && 
      <div>
        {coacheeListDisplay.map((coachee:coacheeList)=>
        {
          return(
            <ListItem className={classes.listItemStyle} button component={Link} key={coachee.coacheeId} to={`/app/coachee/${coachee.coacheeId}`}>
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
      {noResults == true &&
      <div style={{marginLeft: "50px"}}>
        <p>{translation.noResultsFor} "{search}"</p>
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