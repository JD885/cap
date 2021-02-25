import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import { translate } from '../../constants/translate';
import React, { useState } from 'react'
import {useQuery} from 'react-query'
import { capCategory, coacheeCapItem, newCapItem } from '../../models/cap-items'
import { getAllCap } from '../../api/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Accordion, AccordionDetails, AccordionSummary, Divider, List, ListItem, TextField, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useForm} from "react-hook-form";
import Button from '@material-ui/core/Button';
import {nanoid} from 'nanoid'

//do a get query here
type closeFunction = () => void

interface CapInfoProps
{
    open:boolean,
    setClosed:closeFunction
    coacheeID:string,
    isAssigningCap:boolean
}

export const AllCapItems = ({open, setClosed, coacheeID, isAssigningCap}:CapInfoProps) =>
{
    const { isLoading, data} = useQuery<capCategory[], Error, capCategory[]>('AllCapItems', ()=>getAllCap())

    const t=translate.use().Triad;
    let capLetter;

    const { register, watch, setValue } = useForm();

    function createNewCapItem(categoryID:string, letter:string)
    {
        const newCapItem:newCapItem=
        {
            capItemID: nanoid(),
            capCategoryID:categoryID,
            capItemCode:letter,
            capItemDescription:watch(categoryID),
            coacheeID:coacheeID
        }

        //Make post request here!
        console.log({newCapItem})
        setValue(categoryID, "")

        //After post, invalidate getAll Posts
    }

    function assignNewCap(categoryID, capItemID?:string, isNewCap?:boolean, letter?:string)
    {
        if(isNewCap && !letter) throw new Error("Must include a letter-symbol for a new cap item")
        
        if(!capItemID) capItemID=nanoid()

        if(isNewCap)
        {
            const newCapItem:newCapItem=
            {
                capItemID: capItemID,
                capCategoryID:categoryID,
                capItemCode:letter!,
                capItemDescription:watch(categoryID),
                coacheeID:coacheeID
            }
            //When server set up:
                //send cap to db
                //invalidate all caps query
                //optimisticalyy start assigning cap
        }
            
        const newCoacheeCap:coacheeCapItem=
        {
            coacheeID:coacheeID,
            capItemID:capItemID,
            active:true,
            currentScore:0
        }
        //When server set up
                //post newCoacheeCap
                //invalidate getAllCap()

            //If successful:
            
            
        

        setClosed()
        
    }
    

    function CapList()
    {
        return(
            <div>
                {data!.map((cap, index) =>
                {
                    return(
                        <Accordion 
                            key={cap.capCategoryID}
                            aria-controls={cap.capCategoryID + "aria"}
                            >
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography variant="h5">
                                    {cap.capCategoryNumber}. &#160;{/*Space*/}
                                    {cap.capCategoryDescription}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {cap.capItems.map(capItem =>
                                    {
                                        capLetter=capItem.capItemCode
                                        return(
                                            <React.Fragment>
                                                <ListItem key={capItem.capItemID}>
                                                    <Typography variant="body1">
                                                        {capItem.capItemCode}. &#160;{/*Space*/}
                                                        {capItem.capItemDescription}
                                                    </Typography>
                                                    {isAssigningCap && <Button onClick={()=>{assignNewCap(cap.capCategoryID, capItem.capItemID)}}>Assign</Button>}
                                                </ListItem>
                                                <Divider/>
                                            </React.Fragment>
                                        )
                                    })}
                                    <ListItem>
                                        <Typography style={{marginRight:4, alignItems:"start"}}>{capLetter=String.fromCharCode(capLetter.charCodeAt(0) + 1)}.</Typography>
                                        <textarea rows={4} className="newCapInput" name={cap.capCategoryID} ref={register}/>
                                        {!isAssigningCap && <Button onClick={() => {createNewCapItem(cap.capCategoryID, capLetter)}}>Create</Button>}
                                        {isAssigningCap && <Button  onClick={() => {assignNewCap(cap.capCategoryID, undefined, true, capLetter)}}>Create and Assign</Button>}

                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    )
                    
                })}
            </div>
        )
    }

    return(
        <React.Fragment>
            <Dialog open={open} onClose={setClosed}>
                {isLoading && <CircularProgress/> }
                {!isLoading && <CapList/>}
            </Dialog> 
        </React.Fragment>
    )
    
}