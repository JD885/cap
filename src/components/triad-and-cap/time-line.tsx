import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import {useQuery} from 'react-query'
import { TriadNotes } from '../../models/triad';
import { getTriadDetails } from '../../api/api';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useState } from 'react'
import { MeetingNotes } from './meeting-notes';

interface capProps
{
    capItemID:string
}

///This should be recreated to be more user friendly
//Currently user cannot tell that they can click on the dates to see
//the meeting notes

export const CapTimeline = ({capItemID}:capProps) =>
{

    const { isLoading, isError, data, error } = useQuery<TriadNotes[], Error, TriadNotes[]>(['triad', capItemID], () => getTriadDetails(capItemID))
    const [open, toggleOpen] = useState(false)
    const [openTriad, setOpenTriad] = useState<TriadNotes | null>(null)


    function openModal(triad:TriadNotes)
    {
        setOpenTriad(triad);
        toggleOpen(true)
    }

    function handleClose()
    {
        toggleOpen(!open)
    }

    if(isLoading)
    {
    
        return <Skeleton variant="rect" width={100} height={200} />
    }
    else
    {

        return(
            <React.Fragment>
                <Timeline align="alternate">
                
                    {data!.map((triad, index) =>
                    {
                        
                        if(index%2 === 0)
                        {
                            return(
                                <TimelineItem key={triad.touchpointID}>
                                    <TimelineOppositeContent>
                                        <Chip label={triad.capItemScore} />
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography color="textSecondary" onClick={()=>openModal(triad)}>{triad.date}</Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            )
                            
                        }
                        else
                        {
                            return(
                                <TimelineItem key={triad.touchpointID}>
                                    <TimelineContent>
                                        <Typography color="textSecondary" onClick={()=>openModal(triad)}>{triad.date}</Typography>
                                    </TimelineContent>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineOppositeContent>
                                        <Chip label={triad.capItemScore} />
                                    </TimelineOppositeContent>
                                </TimelineItem>
                            )
                            
                        }
                    })}
                </Timeline>
                
                <MeetingNotes open={open} triad={openTriad} close={handleClose}/>
                
            </React.Fragment>
        )
    }

    
    
}