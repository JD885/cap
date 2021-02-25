import SpeedDial, { SpeedDialProps } from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import React, { useState } from 'react';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import CreateIcon from '@material-ui/icons/Create';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

type genericVoidFunction = () => void

interface TriadOptionsFab
{
    allCaps:genericVoidFunction,
    previousCaps:genericVoidFunction,
    showInactiveCap:boolean,
    createNew: genericVoidFunction,
    numOfActiveCap:number

}

export const TriadOptionsFab = ({allCaps, showInactiveCap, previousCaps, numOfActiveCap, createNew}:TriadOptionsFab) =>
{

    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const [snackBarOpen, toggleSnackBar] = useState(false)
    
    const useStyles = makeStyles(() =>
    createStyles({
        root: {
        height: 380,
        transform: 'translateZ(0px)',
        flexGrow: 1,
        },
        speedDial: {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        },
    }),
    );

    const previousCapTitle = showInactiveCap ? "Hide Previous" : "Show Previous"

    const classes = useStyles();

    function handleNew()
    {
        if(numOfActiveCap < 3)
        {
            //open dialog to show cap
        }
        else
        {
            //show snack bar
            toggleSnackBar(true)
        }
    }

    
    return(
        <React.Fragment>
            <SpeedDial
                className={classes.speedDial}
                ariaLabel="Triad Options"
                onClick={()=>{setOpen(!open)}}
                icon={<SpeedDialIcon />}
                open={open}
                direction="up"
                
            >
                <SpeedDialAction 
                    key="AllCaps"
                    icon={<AllInboxIcon/>}
                    tooltipTitle="All Caps"
                    tooltipOpen
                    onClick={allCaps}/>
    
                <SpeedDialAction 
                    key="previousCaps"
                    icon={<FastRewindIcon/>}
                    tooltipTitle={previousCapTitle}
                    tooltipOpen
                    onClick={previousCaps}/>
    
                <SpeedDialAction 
                    key="NewCaps"
                    icon={<CreateIcon/>}
                    tooltipTitle="New Cap"
                    tooltipOpen
                    onClick={createNew}/>
            </SpeedDial>

            <Snackbar open={snackBarOpen} autoHideDuration={4000} onClose={()=>toggleSnackBar(false)}>
                <Alert severity="error">
                    Cannot have more then 3 active cap items!
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}