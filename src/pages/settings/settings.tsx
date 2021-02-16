import { AccordionDetails, AppBar, Divider, Toolbar, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {translate} from '../../constants/translate'
import { ChangeLanguageMenu } from '../../components/settings/language-select';
import { DarkSwitch } from '../../components/settings/dark-switch';
import { TakePicture } from '../../components/settings/profile-pic';


type closeFunction  = () => void

interface prop{
    close:closeFunction ///function for handling closing the modal
}


export const SettingsPage = ({close}:prop) =>
{
    const t=translate.use().setting
    return(
        <>
            <AppBar position="static">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" style={{ color: 'white' }} >Settings</Typography>
                    <CloseIcon onClick={close}/>
                </Toolbar>
            </AppBar>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    {t.darkMode}
                </AccordionSummary>
                <AccordionDetails>
                    <DarkSwitch/>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    {t.language}
                    <Divider/>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider/>
                    <ChangeLanguageMenu/>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    {t.profilePic}
                    <Divider/>
                </AccordionSummary>
                <AccordionDetails>
                    <TakePicture buttonLabel="Take Photo" closeModal={close}/>
                </AccordionDetails>
            </Accordion>
        </>
    )
}