import React, { useContext, useState, useEffect} from 'react';
import { Typography, Button, InputLabel, MenuItem, FormControl, Select, Snackbar, CircularProgress, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { GlobalContext,handleTab } from '../../../stores/global-store';
import { useQuery, useMutation } from 'react-query';
import { ABSModuleOnly } from '../../../models/absModuleOnly';
import { getSelectedABSModule, updateSelectedModule, deleteModule } from '../../../api/api';
import { translate } from "../../../constants/translate";
import {AbsSkeleton} from '../../../components/skeleton-loader/abs-module-skeleton';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    withRouter,
    Redirect
  } from "react-router-dom";

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
  };


export const AbsUpdate = withRouter(({ match,location,history }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [moduleName, setModuleName] = useState("");
    const globalStore = React.useContext(GlobalContext);
    const translations = translate.use().absUpdate;


    //handle snack bar close
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    

      //back button
    const back=(e)=>{
        e.preventDefault();
     const tab: handleTab= {
         tab:2
       };
     globalStore.changeTab(tab);
     history.push(`/app/dashboard/absCRUD`);
    };

    const absMutation = useMutation(updateSelectedModule, {
        onError: (error: Error) => {
          setAlertSeverity('error');
          setAlertMessage(`Error: ${error.message}`);
          setOpen(true);
        },
        onSuccess: (data) => {
          setAlertSeverity('success');
          setAlertMessage(translations.nameSuccess);
          setOpen(true);
          setModuleName('');
     }
       });

      //React Query deleteMutation
      const deleteMutation = useMutation(deleteModule, {
        onError: (error: Error) => {
          setAlertSeverity('error');
          setAlertMessage(`Error: ${error.message}`);
          setOpen(true);
    },
        onSuccess: (data) => {
          setAlertSeverity('success');
          setAlertMessage(translations.deleteSuccess);
          setOpen(true);
          setModuleName('');
     }
   });

   const handleDelete = () => {
    if(window.confirm(translations.deletePopup)){
      deleteMutation.mutate(match.params.id);
     }else{
       console.log('nothing happened');
     }
 };

 

 //validation: new module name cannot be empty
 const handleValidation = () => {
    let formIsValid = true;
    let errors: string[] = [];
    if (moduleName =='') {
      formIsValid = false;
      errors.push(translations.nameError);
    }
    return { formIsValid, errors };
  };


  //function: update module
  const updateModule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { formIsValid, errors } = handleValidation();
    if (formIsValid) {
     absMutation.mutate(
          {
              ID: match.params.id,
              absmoduleName: moduleName
      });
    }
    else { //Invalid form
      setAlertSeverity('warning');
      setAlertMessage(`Error: ${errors.map((err) => (' ' + err))}`);
      setOpen(true);
    }
  };

  //react query, get selected module data
 
    let selectedModule = useQuery<ABSModuleOnly[], Error, ABSModuleOnly[]>(['selectedModule',match.params.id], () => getSelectedABSModule(match.params.id));


    //condition: loading state, return skeleton
    if(selectedModule.isLoading){
        return(
          <div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', background: '#bbbbbb' }}>
                  <p>ABS Module ID: {match.params.id}</p>
                </div>
                <AbsSkeleton/>
              </div>
            
        )
      };

      //condition: data is fetched, show input form to update name
      if(selectedModule.data){
          let currentName=selectedModule.data[0].absmoduleName;
          return(
            <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', background: '#bbbbbb' }}>
            <p>ABS Module ID: {match.params.id}</p>
          </div>
          <form className={classes.root} onSubmit={updateModule}>
          <Typography className={classes.title} variant='h5' align='center'>{translations.title}</Typography>

          <FormControl className={classes.formControl}>
                <TextField
                  variant="outlined"
                  multiline
                  disabled
                  value={currentName}
                  onChange={(event)=>{console.log('no change')}}
                  label={translations.previousName}
                  />
              </FormControl> 
              <FormControl className={classes.formControl}>
                <TextField
                  variant="outlined"
                  multiline
                  value={moduleName}
                  onChange={(event)=>{setModuleName(event.target.value)}}
                  label={translations.newName}
                  />
              </FormControl> 
              <FormControl className={classes.formControl}>
                <Button color="primary" variant='contained' type='submit'>{translations.updateButton}</Button>
                <br/>
                <Button onClick={handleDelete} color="secondary" variant='contained' >{translations.deleteButton}</Button>
                <br/>
                <Button onClick={back}>{translations.return}</Button>
              </FormControl>
          {absMutation.isLoading ? <CircularProgress/> : null}
          {deleteMutation.isLoading ? <CircularProgress/> : null}
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
          </form>
          </div>
          )
       

      };

      //condition: error state, no data to show
      return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', background: '#bbbbbb' }}>
            <p>ABS Module ID: {match.params.id}</p>
          </div>
          <h4 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{translations.noData}</h4>
          <button onClick={back}>{translations.return}</button>
        </div>
      )


});