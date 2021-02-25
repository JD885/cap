import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import { CapTimeline } from './time-line'
import { translate } from '../../constants/translate';
import DateFnsUtils from '@date-io/date-fns';
import { capItem } from '../../models/cap-items';
import { List, ListItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';

export const InactiveCapCard = (props:capItem) =>
{
    const {capItemID, capCategoryDescription, capCategoryNumber, capItemCode, currentScore, capItemDescription, touchpointID} = props

    return(
        <Accordion square={false} style={{backgroundColor:"#e0e0e0"}}>
                <AccordionSummary  expandIcon={<ExpandMoreIcon/> }>
                        <List>
                            <ListItem>
                                <Typography variant="h5">{capCategoryNumber}{capItemCode}</Typography>
                            </ListItem>
                            <ListItem>
                                {capCategoryDescription}
                            </ListItem>
                        </List>
                </AccordionSummary>
                <AccordionDetails className="capDetails">
                    <List>
                        <ListItem>
                            <Typography>{capItemDescription}</Typography>
                        </ListItem>
                        <ListItem>
                            <CapTimeline capItemID={capItemID}/>
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
    )
}