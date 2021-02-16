import Fab from '@material-ui/core/Fab';
import PhotoCameraTwoToneIcon from '@material-ui/icons/PhotoCameraTwoTone';
import { Plugins, CameraResultType } from '@capacitor/core';
import {MyImage } from '../../stores/my-profile-pic'


const {Camera} = Plugins

type closeFunction  = () => void

interface picProp{
    buttonLabel:string
    closeModal?:closeFunction
}

export let myImage = new MyImage()

export const TakePicture=({buttonLabel, closeModal}:picProp)=>
{

    async function takePhoto()
    {
        try
        {
            if(closeModal !=undefined) closeModal();
            
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.DataUrl
            });
            
            myImage.setImage(image.dataUrl!)
        
        }
        catch(err)
        {
            console.log(err)
        }
        
    }
    return(
        <>
            <Fab 
                variant="extended"
                onClick={takePhoto}
                >
                <PhotoCameraTwoToneIcon />
                {buttonLabel}
            </Fab>
        </>
    )
}