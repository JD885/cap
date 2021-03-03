import { Link, withRouter } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { API } from "../../../constants/api-endpoints";
import { getAllABSModules } from "../../../api/api";
import { ABSModuleOnly } from '../../../models/absModuleOnly';
import { useQuery } from 'react-query';
import {AbsSkeleton} from '../../../components/skeleton-loader/abs-module-skeleton';
import { translate } from "../../../constants/translate";

export const ABSCRUD = () =>{


  //react query to get all modules
    let allModules = useQuery<ABSModuleOnly[], Error, ABSModuleOnly[]>('allModules', () => getAllABSModules());
    const translations = translate.use().absCRUD;
    const listItems = () => {
        const {isLoading, isError, data, error} = allModules;
        let listItems: Array<JSX.Element> = [];
        //condition: loading state, return loading skeleton
        if(isLoading){
          return(
              <AbsSkeleton/>
          )
        }
        else if (data && data.length) {
          //css style
          const listItemStyle = {
            height: '15vh',
            display:"flex",
            alignItems:'center'
          };
          const regularModule={color:"black",margin:"40%"};

          //map the data to list
          data.forEach(module => {
                const elem = (
                  <ListItem style={listItemStyle} button component={Link} key={module.ID} to={`/app/dashboard/absCRUD/${module.ID}`}>
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