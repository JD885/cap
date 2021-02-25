import Dialog from '@material-ui/core/Dialog';
import { TriadNotes } from '../../models/triad';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { translate } from '../../constants/translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogTitle from '@material-ui/core/DialogTitle';

interface meetingProps
{
    open:boolean
    triad:TriadNotes | null
    close:any
}

export const MeetingNotes = ({open, triad, close}:meetingProps) =>
{
    const t = translate.use().Triad

    if(!triad)
    {
        return <></>
    }
    else
    {
        return(
            <Dialog open={open} onClose={close}>
                <DialogTitle>{t.meetingNotesTitle} {triad.date}</DialogTitle>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} >
                        {t.goals}
                    </AccordionSummary>
                    <AccordionDetails>
                        {triad!.goal}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        {t.observations}
                    </AccordionSummary>
                    <AccordionDetails>
                        {triad!.observations}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        {t.opportunities}
                    </AccordionSummary>
                    <AccordionDetails>
                        {triad!.opportunities}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        {t.commitments}
                    </AccordionSummary>
                    <AccordionDetails>
                        {triad!.commitments}
                    </AccordionDetails>
                </Accordion>
            </Dialog>
        )
    }
    
    
}