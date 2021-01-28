import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {GlobalContext, globalUser } from '../stores/global-store'
import {useForm, Controller} from "react-hook-form"



//   date: january 26 2021
//  **** THIS IS A TEST DUMMY PAGE FEEL FREE TO REMOVE ********

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

//Interface for "react-hook-forms"
interface ILoginInput{
  username:string;
  password:string;
}

export default function BasicTextFields() {

  //this gives access to the global store
  const globalStore = React.useContext(GlobalContext)

  const {control, handleSubmit} = useForm<ILoginInput>();
  
  const classes = useStyles();

  function submitForm(data:ILoginInput)
  {

    const newUser:globalUser = {
      username:data.username,
      userID:912315,//This is a placeholder number for testing
      email:data.username + " email"
    }

    //this function changes the value in the global store
    globalStore.changeUser(newUser)

    //this function retrieves just the userID
    console.log(globalStore._username)
  }

  return (
    
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(submitForm) }>
      
      {/* Controller for react hook form: https://react-hook-form.com/get-started#IntegratingwithUIlibraries */}
      <Controller
        name="username"
        control={control}
        render = {({onChange, value}) => <TextField onChange={onChange} value={value} label='username' />} />

      <Controller
              name="password"
              control={control}
              render = {({onChange, value}) => <TextField onChange={onChange} value={value} id='standard-basic' label='password' />} />

      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
  );
}
