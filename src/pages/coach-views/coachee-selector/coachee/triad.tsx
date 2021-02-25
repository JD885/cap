import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CapCard } from '../../../../components/triad-and-cap/cap-card';
import { capItem } from '../../../../models/cap-items';
import { useQuery } from 'react-query'
import { getCapScore } from '../../../../api/api';
import { CapSkeleton } from '../../../../components/skeleton-loader/cap-item-skeleton';
import { AllCapItems } from '../../../../components/triad-and-cap/all-cap-items';
import { Divider, Fab } from '@material-ui/core';
import { InactiveCapCard } from '../../../../components/triad-and-cap/inactive-cap-card';
import { TriadOptionsFab } from '../../../../components/triad-and-cap/triad-options';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

//Pull all Coachee Cap Item
  //Sort all cap item by active and inactive
  //List all active items
    //Show current score
    //Get all Triad notes by capItemID AS TriadNotes[]
    //Put triad notes into timeline
  //Hide all inactive items


const useStyles = makeStyles((theme: Theme) =>
  createStyles(
  {
    root: 
    {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    skeleton:
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    }
  })
)

interface triadProp
{
  coacheeID:string;
}

export function Triad({coacheeID}:triadProp) {

  const classes = useStyles();

  const { isLoading, isError, data, error } = useQuery<capItem[], Error, capItem[]>(['triad', coacheeID], () => getCapScore(coacheeID))

  const [showInactive, setIsShowing] = useState(false);

  const [openDialog, toggleDialog] = useState(false);

  const[isNewCap, toggleIsNewCap] = useState(false);

  function closeDialog()
  {
    toggleDialog(false);
  }

  function showCapsReadOnly()
  {
    toggleIsNewCap(false)
    toggleDialog(true)
  }

  function createNewCap()
  {
    toggleIsNewCap(true)
    toggleDialog(true)
  }

  if(isLoading)
  {
    return(
      <div className={classes.skeleton}>
        <Divider/>
        <CapSkeleton/>
      </div>
      
    )
  }
  else if(isError)
  {
    return(<p>{error}</p>)
  }
  else
  {

    const activeCap = data!.filter(cap => cap.active);
    const inactiveCap = data!.filter(cap =>!cap.active)
    
    function AllInactive()
    {
      return (
        <>
          {inactiveCap.map(capItem=>{
            return <InactiveCapCard {...capItem} key={capItem.capItemID} />
          })}
        </>
      )
    }

    return(
      <div>
        {activeCap!.map(capItem =>{
          return <CapCard {...capItem} key={capItem.capItemID} />
        })} 

        {showInactive && <AllInactive/>}

        <TriadOptionsFab 
          allCaps={showCapsReadOnly}
          previousCaps={()=>{setIsShowing(!showInactive)}}
          showInactiveCap={showInactive}
          numOfActiveCap={activeCap.length}
          createNew={createNewCap}/>

        {/* Shows all cap items */}
        <AllCapItems isAssigningCap={isNewCap} coacheeID={coacheeID} open={openDialog} setClosed={closeDialog}/>  
      </div>
    )
  }
}