import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useEffect, useState } from 'react';
import { Button, DialogActions, DialogContent } from '@material-ui/core';

//Update Cap in this function

type genFunction = () => void;

interface IProp
{
    doOpen:boolean;
    close:genFunction;
    newScore:number;
    changeScore:genFunction
}
//need to make an api call POST new score

export const UpdateCapDialog = ({doOpen, close, newScore, changeScore}:IProp) =>
{

    return (
        <Dialog open={doOpen}>
            <DialogContent>
                Score new cap item to: {newScore}
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Close</Button>
                <Button onClick={changeScore}>Accept</Button>
            </DialogActions>
        </Dialog>
    )
}