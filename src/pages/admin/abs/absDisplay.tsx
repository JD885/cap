import { Link, withRouter } from "react-router-dom";
import {TabPanel} from '../../../components/tab-panel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { API } from "../../../constants/api-endpoints";
import { getAllABSModules } from "../../../api/api";
import { ABSModuleOnly } from '../../../models/absModuleOnly';
import { useQuery } from 'react-query';
import {AbsSkeleton} from '../../../components/skeleton-loader/abs-module-skeleton';
import { translate } from "../../../constants/translate";

export const AbsDisplay = () =>{


  //react query to get all modules
    let allModules = useQuery<ABSModuleOnly[], Error, ABSModuleOnly[]>('allModules', () => getAllABSModules());
    const translations = translate.use().absDisplay;
    const listItems = () => {
        const {isLoading, isError, data, error} = allModules;
        let listItems: Array<JSX.Element> = [];
        
        //loading state, show loading skeleton
        if(isLoading){
          return(
              <AbsSkeleton/>
          )
        }
        else if (data && data.length) {
          //css styles
          const listItemStyle = {
            height: '15vh',
            display:"flex",
            alignItems:'center'
          };
          const regularModule={color:"black",margin:"40%"};

          //map the data
          data.forEach(module => {
                const elem = (
                  <ListItem style={listItemStyle}>
                      <ListItemText style={regularModule} primary={translations.title+" "+module.absmoduleName} secondary={translations.subtitle+" "+module.ID}></ListItemText>           
                  </ListItem>
                )
                listItems.push(elem);
          }
          
          )
          return listItems;
        }
          
    
}

    return (
        <div>
          {listItems()}
        </div>
      );
}