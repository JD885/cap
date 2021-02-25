import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import { TriadNotes } from "../../models/triad"
import { useMutation } from 'react-query';
import { postTriadNotes } from "../../api/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from "@material-ui/core";
import { translate } from "../../constants/translate";


interface TriadSnackProp
{
    open:boolean,
    triadNotes?:TriadNotes | null
}

export const TriadSnackBar=({open, triadNotes}:TriadSnackProp)=>
{
    const t = translate.use().Triad

    // const triad = useMutation(postTriadNotes)
    
    // if(open && triadNotes != null)
    // {
    //     triad.mutate(triadNotes)
    // }
    
    // let sev:string = "warning"

    // if(triad.isError) sev="error";
    // if(triad.isSuccess) sev="success"



    return(
        <Snackbar open={open} autoHideDuration={4000}>
            {/* 
            // @ts-ignore*/}
            <Alert severity="success" >
                {/* {triad.isLoading && <CircularProgress/>}
                {triad.isError && 
                    <Typography>{"Error"}</Typography>
                }
                {triad.isSuccess && 
                    <Typography>{t.triadSaved}</Typography>
                } */}
                Sent
            </Alert>
        </Snackbar>
    )
    
}