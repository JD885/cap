import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect, useState } from 'react';
import { CapTimeline } from './time-line'
import Fab from '@material-ui/core/Fab';
import { Box, Grid, List, ListItem, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar'
import CheckIcon from '@material-ui/icons/Check';
import { translate } from '../../constants/translate';
import { UpdateCapDialog } from './update-cap-dialog';
import Slider from '@material-ui/core/Slider';
import { SLIDER_MARKS } from '../../constants/base';
import { capItem, coacheeCapItem } from '../../models/cap-items';
import DateFnsUtils from '@date-io/date-fns';
import Chip from '@material-ui/core/Chip';
import { useForm } from "react-hook-form";
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import React from 'react';
import { GlobalContext } from '../../stores/global-store';
import { useMutation, useQueryClient } from 'react-query';
import { postTriadNotes, postGraduateCap } from '../../api/api';
import Alert from '@material-ui/lab/Alert';


enum triadNoteTypes{
    goal="goals",
    observations="observations",
    opportunities="opportunities",
    commitments="commitments"
}

export const CapCard=(props:capItem)=>
{
    const store = React.useContext(GlobalContext);
    const {capItemID, capCategoryDescription, capCategoryNumber, capItemCode, currentScore, capItemDescription, touchpointID, coacheeID} = props
    const [score, setScore] = useState(0);
    const [potentialScore, setPotentialScore] = useState(-1)
    const[isOpen, setOpen] = useState(false)
    const[snackOpen, setSnackOpen] = useState(false)
    const [selectedDate, setDate] = useState<Date|null>(new Date())
    const t = translate.use().Triad
    const [alertMessage, setAlertMessage] = useState("")
    const [sev, setSev] = useState("error")
    const queryClient = useQueryClient()
    const { register, watch, setValue } = useForm();

    const triadMutation=useMutation(postTriadNotes,
    {   
        onError: () =>
        {
        
        },
        onSuccess:(newTriad) =>
        {
            console.log(newTriad)
            setValue(`${triadNoteTypes.goal}${capItemCode}`, "")
            setValue(`${triadNoteTypes.observations}${capItemCode}`, "")
            setValue(`${triadNoteTypes.opportunities}${capItemCode}`, "")
            setValue(`${triadNoteTypes.commitments}${capItemCode}`, "")
            setSev("success")
            setSnackOpen(true)
            setAlertMessage(t.triadSaved);
            
        }
    })

    const graduateMutation=useMutation(postGraduateCap,
    {
        onSuccess:async (graduatedCap)=>
        {
            console.log(graduatedCap)
            setSnackOpen(true)
            setAlertMessage(t.capGraduated)
            await queryClient.refetchQueries(['triad', coacheeID],  { active: true, exact: true }).then(()=>
                {
                    console.log('refetched')
                }
            )
            
        }
    })

    useEffect(()=>
    {
        setScore(currentScore)
    }, [])

    function handleRatingChange(theScore:number)
    {
        setScore(theScore)
        setPotentialScore(theScore)
    }

    function submitNewTriadScore()
    {

        const goals = watch(`${triadNoteTypes.goal}${capItemCode}`).trim()
        const observation = watch(`${triadNoteTypes.observations}${capItemCode}`).trim()
        const opportunities = watch(`${triadNoteTypes.opportunities}${capItemCode}`).trim()
        const commitments = watch(`${triadNoteTypes.commitments}${capItemCode}`).trim()

        triadMutation.mutate({
            touchpointID:touchpointID,
            date: selectedDate!,
            userID:store._userID!.toString(),
            capItemID:capItemID,
            coacheeID:coacheeID,
            capItemScore:score,
            goal: goals,
            observations: observation,
            opportunities: opportunities,
            commitments:commitments
        })
    }

    function graduateCap()
    {

        graduateMutation.mutate(
        {
            active:false,
            capItemID:capItemID,
            coacheeID:coacheeID,
            currentScore:score
        })
    
    }

    return(
        <>
            <Accordion expanded={isOpen} square={false} >
                <AccordionSummary  expandIcon={<ExpandMoreIcon onClick={()=>{setOpen(!isOpen)}}/> }>
                        <List style={{width:"100%"}} >
                            <ListItem>
                                <Box style={{width:"100%"}} display="flex" justifyContent="space-between">
                                    <Typography variant="h5">{capCategoryNumber}{capItemCode}:</Typography>
                                    <Chip color="secondary" label={<Typography variant="h4" >{score}</Typography>}/>
                                </Box>
                            </ListItem>
                            <ListItem>
                                {capCategoryDescription}
                            </ListItem>
                            <ListItem>
                                <Slider
                                        value={score}
                                        name={capItemID}
                                        //@ts-ignore
                                        onChangeCommitted={(e, val)=>{handleRatingChange(val)}}
                                        //@ts-ignore
                                        onChange={(e, val)=>{setScore(val)}}
                                        valueLabelDisplay="auto"
                                        step={0.5}
                                        marks={SLIDER_MARKS}
                                        min={0}
                                        max={5}
                                    />
                                </ListItem>
                        </List>
                </AccordionSummary>
                <AccordionDetails className="capDetails">
                    <List>
                        <ListItem style={{justifyContent:"center"}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                value={selectedDate}
                                onChange={(newDate)=>{setDate(newDate)}}>
                            </KeyboardDatePicker>
                        </MuiPickersUtilsProvider>
                        </ListItem>
                        <ListItem>
                            <Typography>{capItemDescription}</Typography>
                        </ListItem>
                        <ListItem>
                            {t.goals}
                        </ListItem>
                        <ListItem>
                            <textarea 
                                rows={4}
                                name={`${triadNoteTypes.goal}${capItemCode}`}
                                ref={register}/>
                        </ListItem>
                        <ListItem>
                            {t.observations}
                        </ListItem>
                        <ListItem>
                            <textarea 
                                rows={4}
                                name={`${triadNoteTypes.observations}${capItemCode}`}
                                ref={register}/>
                        </ListItem>
                        <ListItem>
                            {t.opportunities}
                        </ListItem>
                        <ListItem>
                            <textarea 
                                rows={4}
                                name={`${triadNoteTypes.opportunities}${capItemCode}`}
                                ref={register}
                                />
                        </ListItem>
                        <ListItem>
                            {t.commitments}
                        </ListItem>
                        <ListItem>
                            <textarea 
                                rows={4}
                                name={`${triadNoteTypes.commitments}${capItemCode}`}
                                ref={register}/>
                        </ListItem>
                        <ListItem>
                            <Fab onClick={submitNewTriadScore} style={{marginRight:10}} color="primary" variant="extended" >
                                <CheckIcon/>
                            </Fab>
                            <Fab color="primary" variant="extended" onClick={graduateCap} >
                                Graduate
                            </Fab>
                        </ListItem>


                        {/* TO DO: Create a better timeline */}
                        <ListItem>
                            <CapTimeline capItemID={capItemID}/>
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
                {/* 
                 //@ts-ignore*/}
                <Alert onClose={() => setSnackOpen(false)} severity={sev}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )
    
}