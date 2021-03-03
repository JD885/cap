import 'date-fns';
import React, { useContext, useState, useEffect} from 'react';
import { Typography, Button, InputLabel, MenuItem, FormControl, Select, Snackbar, CircularProgress, TextField } from '@material-ui/core';
import { ListItem, ListItemText } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { GlobalContext,handleTab } from '../../../../stores/global-store';
import { useQuery, useMutation } from 'react-query';
import { useHistory } from "react-router";
import { getCoacheeInfo } from "../../../../api/api";
import { coacheeInfo } from '../../../../models/coacheeInfo';
import { ModuleDetails } from '../../../../models/moduleDetails';
import { getModuleDetails, updateABSModule, getSelectedABSModule } from '../../../../api/api';
import {AbsSkeleton} from '../../../../components/skeleton-loader/abs-module-skeleton';
import { CoacheeProfileSkeleton } from '../../../../components/skeleton-loader/coachee-profile-skeleton';
import { translate } from "../../../../constants/translate";
import profilePlaceholderImg from '../../../../img/profile-placeholder.png';

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
      button: {
        textTransform: "none",
        margin: "auto",
        width:"150px"
      },
      skeleton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'    
      }
  }),
);

//Alert wrapper function
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  
  
export const UpdateAbs = withRouter(({ match,location,history}) => {
  const classes = useStyles();
  let newDate = new Date();
  const translations = translate.use().updateAbs;
  const translation = translate.use().coacheePage;
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date(newDate));
  const [assignedDate, setAssignedDate] = useState<Date | undefined>(new Date(newDate));
  const [completeDate, setCompleteDate] = useState<Date | undefined>(new Date(newDate));
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
   // React Query useQueries
   const moduleDetails = useQuery<ModuleDetails[], Error, ModuleDetails[]>(['moduleDetails',match.params.id,match.params.moduleid], () => getModuleDetails(match.params.id,match.params.moduleid));

   //get coacheeList data using using the coachee id
  const coacheeInfoQuery = useQuery<coacheeInfo[],Error,coacheeInfo[]>("coacheeInfo",()=> getCoacheeInfo((match.params.id)?.toString()!));

   const globalStore = React.useContext(GlobalContext);

   //back button
   const back=(e)=>{
       e.preventDefault();
    const tab: handleTab= {
        tab:1
      };
    globalStore.changeTab(tab);
    history.push(`/app/coachee/${match.params.id}`);
   }

   //save button, not in use right now
   const save=(e)=>{
       e.preventDefault();
    const tab: handleTab= {
        tab:1
      };
    globalStore.changeTab(tab);
    history.push(`/app/coachee/${match.params.id}`);
    //window.location.href=(`/app/coachee/${match.params.id}`); 
   }

   const listItemStyle = {
    height: '5vh',
    display:"flex",
    alignItems:'center'
  };

  

  //css for list items
  const completedModule={ color:"green", margin:"40%", weight:"bold"};
  const pastDueModule={color:"red",margin:"40%",weight:"bold"};
  const regularModule={color:"black",margin:"40%",weight:"bold"};
  const assignedModule={color:"blue",margin:"40%",weight:"bold"};
  let today=new Date();

  
  //validation, new date must later than current date
  const handleValidation = () => {
    let formIsValid = true;
    let errors: string[] = [];
    if (dueDate === undefined || isNaN(dueDate.getTime()) || dueDate.getTime()<today.getTime() || dueDate===null) {
      formIsValid = false;
      errors.push(translations.dateError);
    }
    return { formIsValid, errors };
  };
  const absMutation = useMutation(updateABSModule, {
    onError: (error: Error) => {
      setAlertSeverity('error');
      setAlertMessage(`Error: ${error.message}`);
      setOpen(true);
    },
    onSuccess: (data) => {
      setAlertSeverity('success');
      setAlertMessage(`ABS module ${match.params.moduleid} ${translations.assignTo} coachee${match.params.id}`);
      setOpen(true);
    }
  });
  const absUpdateMutation = useMutation(updateABSModule, {
    onError: (error: Error) => {
      setAlertSeverity('error');
      setAlertMessage(`Error: ${error.message}`);
      setOpen(true);
    },
    onSuccess: (data) => {
      setAlertSeverity('success');
      setAlertMessage(`ABS module ${match.params.moduleid}  ${translations.updateSuccess}`);
      setOpen(true);
    }
  });
  const absCompleteMutation = useMutation(updateABSModule, {
    onError: (error: Error) => {
      setAlertSeverity('error');
      setAlertMessage(`Error: ${error.message}`);
      setOpen(true);
    },
    onSuccess: (data) => {
      setAlertSeverity('success');
      setAlertMessage(`ABS module ${match.params.moduleid} ${translations.completeSuccess} coachee ${match.params.id} `);
      setOpen(true);
    }
  });  
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  console.log(moduleDetails)


  //when loading state, return skeleton
  if(moduleDetails.isLoading || coacheeInfoQuery.isLoading){
    return(
      <div>
          <div className={classes.skeleton}>
              <CoacheeProfileSkeleton/> 
          </div>
          <AbsSkeleton/>
          </div>
        
    )
  }

   if(moduleDetails.data && coacheeInfoQuery.data){
        //condition: completed module
       if(moduleDetails.data[0].completedDate!=null && moduleDetails.data[0].assignedDate!=null && moduleDetails.data[0].dueDate!=null){
        let completeDate=new Date(moduleDetails.data[0].completedDate);
          let assignedDate=new Date(moduleDetails.data[0].assignedDate);
          let dueDate=new Date(moduleDetails.data[0].dueDate);
        
       
        return (
          <div>
              <div className="container flex-items vertical" key={coacheeInfoQuery.data[0].coacheeId}>
            <img src={profilePlaceholderImg} alt="Coachee profile"></img>
            <div>
              <h2>{coacheeInfoQuery.data[0].name}</h2>
              <div className="flex-items">
                <p>{coacheeInfoQuery.data[0].email}</p>
                <p>{coacheeInfoQuery.data[0].cellNumber}</p>
              </div>
              <div className='border-line'></div>
              <div className="flex-items">
                <div>
                  <h4>{translation.team}</h4>
                  <p>{coacheeInfoQuery.data[0].teamNumber}</p>
              </div>
              <div>
                <h4>{translation.office}</h4>
                <p>{coacheeInfoQuery.data[0].officeNumber}</p>
              </div>
              <div>
                <h4>{translation.building}</h4>
                <p>{coacheeInfoQuery.data[0].building}</p>
              </div>
              <div>
                <h4>{translation.workLocation}</h4>
                <p>{coacheeInfoQuery.data[0].workLocation}</p>
              </div>
              </div>
            </div>
              <Button className={classes.button} color="primary" variant="contained">{translation.editCoachee}</Button>
            </div>
            <form className={classes.root}>
          <Typography className={classes.title} variant='h5' align='center'>{translations.viewTitle}</Typography>
          <br/>
            <ListItem style={listItemStyle} key="1">
                    <ListItemText style={assignedModule} primary={translations.assign+ " " +assignedDate?.toLocaleDateString()}></ListItemText>  
                    </ListItem>
                <ListItem style={listItemStyle} key="2">                   
                 <ListItemText style={pastDueModule} primary={translations.due+" " +dueDate?.toLocaleDateString()}></ListItemText>  
                 </ListItem>
                <ListItem style={listItemStyle} key="3">
                  <ListItemText style={completedModule} primary={translations.complete+" " +completeDate.toLocaleDateString()}></ListItemText>  
                </ListItem>
                <br/>

                <FormControl className={classes.formControl}>
                  <Button onClick={back} color='primary' variant='contained'>{translations.returnButton}</Button>
                </FormControl>
                </form>
                
          </div>
        );

       }
       //condition: assigned module
       if(moduleDetails.data[0].completedDate==null && moduleDetails.data[0].assignedDate!=null && moduleDetails.data[0].dueDate!=null){
        let assignedDate=new Date(moduleDetails.data[0].assignedDate);
        let oldDueDate=new Date(moduleDetails.data[0].dueDate);
        const updateDueDate = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          let { formIsValid, errors } = handleValidation();
          if (formIsValid) {
            absUpdateMutation.mutate({
              coacheeID: match.params.id,
              absModule: [{
                ID:match.params.moduleid,
                absmoduleName:moduleDetails.data[0].moduleName,
                assignedDate:assignedDate,
                dueDate:dueDate,
                completedDate:undefined} ]
            });
          }
          else { //Invalid form
            setAlertSeverity('warning');
            setAlertMessage(`Error: ${errors.map((err) => (' ' + err))}`);
            setOpen(true);
          }
        };
        const markComplete = () => {
            absCompleteMutation.mutate({
              coacheeID: match.params.id,
              absModule: [{
                ID:match.params.moduleid,
                absmoduleName:moduleDetails.data[0].moduleName,
                assignedDate:assignedDate,
                dueDate:dueDate,
                completedDate:today} ]
            });
        };
        const assignModule = (newDueDate: Date | null) => {
          setDueDate(newDueDate!);
        };
        const noChange = (newDueDate: Date | null) => {
          console.log('no change');
        };
       
         return(
          <div>
          <div className="container flex-items vertical" key={coacheeInfoQuery.data[0].coacheeId}>
            <img src={profilePlaceholderImg} alt="Coachee profile"></img>
            <div>
              <h2>{coacheeInfoQuery.data[0].name}</h2>
              <div className="flex-items">
                <p>{coacheeInfoQuery.data[0].email}</p>
                <p>{coacheeInfoQuery.data[0].cellNumber}</p>
              </div>
              <div className='border-line'></div>
              <div className="flex-items">
                <div>
                  <h4>{translation.team}</h4>
                  <p>{coacheeInfoQuery.data[0].teamNumber}</p>
              </div>
              <div>
                <h4>{translation.office}</h4>
                <p>{coacheeInfoQuery.data[0].officeNumber}</p>
              </div>
              <div>
                <h4>{translation.building}</h4>
                <p>{coacheeInfoQuery.data[0].building}</p>
              </div>
              <div>
                <h4>{translation.workLocation}</h4>
                <p>{coacheeInfoQuery.data[0].workLocation}</p>
              </div>
              </div>
            </div>
              <Button className={classes.button} color="primary" variant="contained">{translation.editCoachee}</Button>
            </div>
                <form className={classes.root} onSubmit={updateDueDate}>
          <Typography className={classes.title} variant='h5' align='center'>{translations.updateTitle}</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <FormControl className={classes.formControl}>
                    <KeyboardDatePicker
                    disabled
                      margin="normal"
                      id="date-picker-dialog"
                      label={translations.originalDate}
                      format="MM/dd/yyyy"
                      value={oldDueDate}
                      onChange={noChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </FormControl>
                  </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <FormControl className={classes.formControl}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label={translations.selectDate}
                      format="MM/dd/yyyy"
                      value={dueDate}
                      onChange={assignModule}
                      required
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </FormControl>
                  </MuiPickersUtilsProvider>
                <FormControl className={classes.formControl}>
                  <Button color="primary" variant='contained' type='submit'>{translations.updateButton}</Button>
                  <br/>
                  <Button onClick={markComplete} color="secondary" variant='contained' >{translations.completeButton}</Button>
                  <br/>
                  <Button onClick={save}>{translations.returnButton}</Button>
                </FormControl>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
        </form>
      </div>
         )

       }
       //condition: unassigned module
       if(moduleDetails.data[0].assignedDate==undefined && moduleDetails.data[0].completedDate==undefined && moduleDetails.data[0].dueDate==undefined){
        const assignModuleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          let { formIsValid, errors } = handleValidation();
          if (formIsValid) {
            absMutation.mutate({
              coacheeID: match.params.id,
              absModule: [{
                ID:match.params.moduleid,
                absmoduleName:moduleDetails.data[0].moduleName,
                assignedDate:assignedDate,
                dueDate:dueDate,
                completedDate:undefined} ]
            });
          }
          else { //Invalid form
            setAlertSeverity('warning');
            setAlertMessage(`Error: ${errors.map((err) => (' ' + err))}`);
            setOpen(true);
          }
        };
        const assignModule = (date: Date | null) => {
          setDueDate(date!);
          setAssignedDate(today);
        };
        return(  
          <div>
          <div className="container flex-items vertical" key={coacheeInfoQuery.data[0].coacheeId}>
            <img src={profilePlaceholderImg} alt="Coachee profile"></img>
            <div>
              <h2>{coacheeInfoQuery.data[0].name}</h2>
              <div className="flex-items">
                <p>{coacheeInfoQuery.data[0].email}</p>
                <p>{coacheeInfoQuery.data[0].cellNumber}</p>
              </div>
              <div className='border-line'></div>
              <div className="flex-items">
                <div>
                  <h4>{translation.team}</h4>
                  <p>{coacheeInfoQuery.data[0].teamNumber}</p>
              </div>
              <div>
                <h4>{translation.office}</h4>
                <p>{coacheeInfoQuery.data[0].officeNumber}</p>
              </div>
              <div>
                <h4>{translation.building}</h4>
                <p>{coacheeInfoQuery.data[0].building}</p>
              </div>
              <div>
                <h4>{translation.workLocation}</h4>
                <p>{coacheeInfoQuery.data[0].workLocation}</p>
              </div>
              </div>
            </div>
              <Button className={classes.button} color="primary" variant="contained">{translation.editCoachee}</Button>
            </div>
        <form className={classes.root} onSubmit={assignModuleSubmission}>
          <Typography className={classes.title} variant='h5' align='center'>{translations.newTitle}</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <FormControl className={classes.formControl}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label={translations.selectDueDate}
                      format="MM/dd/yyyy"
                      value={dueDate}
                      required
                      onChange={assignModule}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </FormControl>
                  </MuiPickersUtilsProvider>
                <FormControl className={classes.formControl}>
                  <Button color="primary" variant='contained' type='submit'>{translations.assignButton}</Button><Button onClick={save}>{translations.returnButton}</Button>
                </FormControl>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
        </form>
        </div>

        )
       
       }
   }
   //condition: error state, no data to return
    return (
      <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', background: '#bbbbbb' }}>
          <p>ABS Module {match.params.moduleid}</p>
          <p style={{marginLeft: '40px'}}>Coachee ID: {String(match.params.id)}</p>
        </div>
        <p>{translations.noData}</p>
        <button onClick={back}>{translations.returnButton}</button>
      </div>
    )
   }
  
)
