import React, { useContext, useState, useEffect} from 'react';
import { Typography, Button, InputLabel, MenuItem, FormControl, Select, Snackbar, CircularProgress, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { GlobalContext } from '../../../stores/global-store';
import { useQuery, useMutation } from 'react-query';
import { translate } from "../../../constants/translate";
import {TouchpointSkeleton} from '../../../components/skeleton-loader/schedule-touchpoint-skeleton';
import { getAllABSModules } from "../../../api/api";
import { ABSModuleOnly } from '../../../models/absModuleOnly';
import {createModule} from '../../../api/api';
import { nanoid } from 'nanoid';


//Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    title: {
      paddingTop: 15,
    },
    formControl: {
      width: '90%',
      [theme.breakpoints.up('sm')]: {
        width: 540,
      },
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

//Alert wrapper function
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export const AbsCreate= () =>{
  const translations = translate.use().absCreate;
    const [open, setOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [moduleName, setModuleName] = useState("");
  const classes = useStyles();

  //Validation Handler, module name cannot be empty
  const handleValidation = () => {
    let formIsValid = true;
    let errors: string[] = [];
    if (moduleName=='' )
    {
      formIsValid = false;
      errors.push(translations.error);
    }
    return { formIsValid, errors };
  };

  //Snackbar & Alert handler
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //React Query useMutation
  const absMutation = useMutation(createModule, {
    onError: (error: Error) => {
      setAlertSeverity('error');
      setAlertMessage(`Error: ${error.message}`);
      setOpen(true);
    },
    onSuccess: (data) => {
      setAlertSeverity('success');
      setAlertMessage(`Module  ${data.absmoduleName} ${translations.success}`);
      setOpen(true);
      setModuleName('');
    }
  });

  //Form Submission handler
  const createNewModule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { formIsValid, errors } = handleValidation();
    if (formIsValid) {
      absMutation.mutate({
        ID:nanoid(),
        absmoduleName:moduleName
      });
    }
    else { //Invalid form
      setAlertSeverity('warning');
      setAlertMessage(`Error: ${errors.map((err) => (' ' + err))}`);
      setOpen(true);
    }
  };

  
    return(
        <>
      <form className={classes.root} onSubmit={createNewModule}>
        <Typography className={classes.title} variant='h5' align='center'>{translations.title}</Typography>
              <FormControl className={classes.formControl}>
                <TextField
                  variant="outlined"
                  multiline
                  value={moduleName}
                  onChange={(event)=>{setModuleName(event.target.value)}}
                  label={translations.placeholder}
                  />
              </FormControl> 

              <FormControl className={classes.formControl}>
                <Button color="primary" variant='contained' type='submit'>{translations.button}</Button>
              </FormControl>
              {absMutation.isLoading ? <CircularProgress/> : null}
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
    )
}