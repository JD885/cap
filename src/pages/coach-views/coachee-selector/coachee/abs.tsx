import { Link, withRouter } from "react-router-dom";
import {TabPanel} from '../../../../components/tab-panel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { ListItem, ListItemText,ListItemIcon } from '@material-ui/core';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import DoneIcon from '@material-ui/icons/Done';
import { API } from "../../../../constants/api-endpoints";
import { getABSModules } from "../../../../api/api";
import { ABSModules } from '../../../../models/absModules';
import { GlobalContext } from '../../../../stores/global-store';
import { useQuery } from 'react-query';
import {AbsSkeleton} from '../../../../components/skeleton-loader/abs-module-skeleton';
import { translate } from "../../../../constants/translate";
import Fab from '@material-ui/core/Fab';

export interface CoacheeProp
{
  coacheeID:string;
}

export const ABS = (props: CoacheeProp) =>{
  

  //using react query to get all abs modules
  let modules = useQuery<ABSModules[], Error, ABSModules[]>('modules', () => getABSModules(props.coacheeID));
  const translations = translate.use().coacheeAbs;


  function dateDiff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    return (second-first)/(1000*60*60*24);
  }
  

  const listItems = () => {
    const {isLoading, isError, data, error} = modules;
    let listItems: Array<JSX.Element> = [];

    //loading state, return skeleton
    if(isLoading){
      return(
          <AbsSkeleton/>
      )
    }

    //style for list items
    else if (data && data.length) {
      const listItemStyle = {
        height: '15vh',
        //display:"flex",
        alignItems:'center'
      };
      const completedModule={ color:"green", margin:"0%"};
      const pastDueModule={color:"red", margin:"0%"};
      const regularModule={color:"black","margin-left":"45%"};
      const greenModule={color:"green",margin:"0%"};
      const orangeModule={color:"orange",margin:"0%"};
      const complete={color:"green","margin-left":"40%"};
      const pastDue={color:"red","margin-left":"40%"};
      const green={color:"green","margin-left":"40%"};
      const orange={color:"orange","margin-left":"40%"};

      
      //map the data

      data.forEach(coachee => {
        coachee.absModule.forEach(abs => {
          let elem;
          let today=new Date();


          //condition: the module is complete

          if(abs.completedDate!=null){
            let completeDate=new Date(abs.completedDate);
            elem = (
              <ListItem style={listItemStyle} button component={Link} key={abs.ID} to={`/app/coachee/${coachee.coacheeID}/${abs.ID}`}>
                <ListItemIcon style={complete}>
                    <DoneIcon style={{ color: "green" }}/>
                  </ListItemIcon>
                  <ListItemText style={completedModule} primary={abs.absmoduleName} secondary={translations.complete+ " "+ completeDate.toLocaleDateString()}>    
                    </ListItemText>           
              </ListItem>
            )
          }
          else{
            //condition:module is assigned but not complete yet, due within 14 days
            if(abs.assignedDate!=null && abs.dueDate!=null){
              let dueDate=new Date(abs.dueDate);
              if(dateDiff(today,dueDate)<14){
                elem = (
                  <ListItem style={listItemStyle} button component={Link} key={abs.ID} to={`/app/coachee/${coachee.coacheeID}/${abs.ID}`}>
                    <ListItemIcon style={orange}>
                      <WatchLaterIcon style={{ color: "orange" }}/>
                    </ListItemIcon>
                      <ListItemText style={orangeModule} primary={abs.absmoduleName} secondary={translations.due+" "+ dueDate.toLocaleDateString()}></ListItemText>  
                  </ListItem>
                );
              }else{
                //condition:module is assigned but not complete yet, due more than 14 days
 
                elem = (
                  <ListItem style={listItemStyle} button component={Link} key={abs.ID} to={`/app/coachee/${coachee.coacheeID}/${abs.ID}`}>
                    <ListItemIcon style={green}>
                      <WatchLaterIcon style={{ color: "green" }}/>
                    </ListItemIcon>
                      <ListItemText style={greenModule} primary={abs.absmoduleName} secondary={translations.due+" "+ dueDate.toLocaleDateString()}></ListItemText>  
                  </ListItem>
                )

              };
              
              //condition: module is past due
              if(dueDate.getTime()<today.getTime()){
                elem = (
                  <ListItem style={listItemStyle} button component={Link} key={abs.ID} to={`/app/coachee/${coachee.coacheeID}/${abs.ID}`}>
                    <ListItemIcon style={pastDue}>
                    <WatchLaterIcon style={{ color: "red" }}/>
                  </ListItemIcon>
                      <ListItemText style={pastDueModule} primary={abs.absmoduleName} secondary={translations.pastDue+" "+dueDate.toLocaleDateString()}></ListItemText>  
                  </ListItem>
                )
              }
            }
            else{
              //condition: module is not assigned yet
              elem = (
                <ListItem style={listItemStyle} button component={Link} key={abs.ID} to={`/app/coachee/${coachee.coacheeID}/${abs.ID}`}>
                    <ListItemText style={regularModule} primary={abs.absmoduleName} secondary={translations.unassign}></ListItemText>  
                </ListItem>
              )
            } 
          }
          listItems.push(elem);
        })
      }); 
    }
    return listItems;
  }
 
 

    return (
      <div>
        {listItems()}
      </div>
    );
}




