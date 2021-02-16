import Dialog from '@material-ui/core/Dialog';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import {myImage} from './profile-pic'
import Fab from '@material-ui/core/Fab';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const ImageModal = observer(()=>
{

    function handleClose()
    {
        myImage.imageExists = false;
    }

    return(
        <>
            <Dialog open={myImage.imageExists} onClose={handleClose}>
                <img className="profileImg" src={myImage.imageAsString} />

                <div className="flexContainer">
                    <Fab color="secondary" onClick={handleClose}><DeleteForeverIcon/></Fab>
                    <Fab color="primary"><DoneOutlineIcon/></Fab>
                </div>
            </Dialog>
        </>
    )
})