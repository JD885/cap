import { grey } from '@material-ui/core/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography, Button, InputLabel, MenuItem, FormControl, Select, Snackbar, CircularProgress, TextField } from '@material-ui/core';

export const AbsSkeleton = () =>
{
    return(
        <div>
            <br/>
            <Skeleton variant="rect" height={118} animation="wave"/>
            <br></br>
            <Skeleton variant="rect" height={118} animation="wave"/>
            <br></br>
            <Skeleton variant="rect" height={118} animation="wave"/>
            <br></br>
            <Skeleton variant="rect" height={118} animation="wave"/>
            <br></br>
            <Skeleton variant="rect" height={118} animation="wave"/>
            <br></br>
            <Skeleton variant="rect" height={118} animation="wave"/>
            <br></br>
            <Skeleton variant="rect" height={118} animation="wave"/>  
            <br></br>
            <Skeleton variant="rect" height={118} animation="wave"/>
        </div>
    )
}