import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    
      <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="username" />
      <TextField id='standard-basic' label='password'/>
      <Button variant="contained" color="primary">
        Login
      </Button>
    </form>
  );
}
