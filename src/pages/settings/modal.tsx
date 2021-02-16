import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemIcon } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/TuneTwoTone';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { Link, withRouter } from "react-router-dom";
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import { SettingsPage } from './settings';
import Grow from '@material-ui/core/Grow';

type closeFunction  = () => void

interface prop{
    close:closeFunction ///function for handling closing the modal
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,) 
{
    return <Grow ref={ref} {...props}/>
    //return <Slide direction="up" ref={ref} {...props} />;
});

export const SettingModal = ({close}:prop) =>
{
    const [open, toggleOpen] = useState(false);

    function handleClick()
    {
        close();
        toggleOpen(true);
    }

    return(
        <>
            <ListItem onClick={handleClick} button>
                <ListItemIcon><TuneIcon/></ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>

            <Dialog fullScreen open={open} onClose={() => {toggleOpen(false)}} TransitionComponent={Transition}>
                <SettingsPage close={() => toggleOpen(false)} />
            </Dialog>
        </>
            

        
    )
}