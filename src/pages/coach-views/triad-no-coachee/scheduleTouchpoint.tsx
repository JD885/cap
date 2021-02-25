import 'date-fns';
import React, { useContext, useState } from 'react';
import { Typography, Button, InputLabel, MenuItem, FormControl, Select, Snackbar, CircularProgress, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { getCoacheesByCoach, getMeetingTypes, createTouchpoint } from '../../../api/api';
import { Coachee } from '../../../models/coachee';
import { MeetingType } from '../../../models/meetingType';
import { GlobalContext } from '../../../stores/global-store';
import { useQuery, useMutation } from 'react-query';
import { translate } from "../../../constants/translate";
import {TouchpointSkeleton} from '../../../components/skeleton-loader/schedule-touchpoint-skeleton'



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

interface coacheeProp
{
  coacheeID:string;
}

//Schedule Touchpoint component
export function ScheduleTouchpoint(prop?:coacheeProp) {
  
  let coacheeSelected= (!prop?.coacheeID) ? false : true
  const store = useContext(GlobalContext);
  const classes = useStyles();
  const translations = translate.use().scheduleTouchpoint;
  let newDate = (new Date()).setHours(12, 0, 0);
  const [type, setType] = useState(0);
  const [coachee, setCoachee] = useState("-1");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(newDate));
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [notes, setNotes] = useState("");


  // React Query useQueries
  const coachees = useQuery<Coachee[], Error, Coachee[]>('coachees', () => getCoacheesByCoach(store._userID!));
  const types = useQuery<MeetingType[], Error, MeetingType[]>('types', getMeetingTypes);

  //Form Change Handlers
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleCoacheeChange = (event) => {
    setCoachee(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  //Validation Handler
  const handleValidation = () => {
    let formIsValid = true;
    let errors: string[] = [];
    if (!coacheeSelected && (coachee === "-1" || !coachee) )
    {
      formIsValid = false;
      errors.push(translations.coacheeError);
    }

    if (type === 0) {
      formIsValid = false;
      errors.push(translations.typeError);
    }
    if (selectedDate === null || isNaN(selectedDate.getTime())) {
      formIsValid = false;
      errors.push(translations.dateError);
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
  const meetingMutation = useMutation(createTouchpoint, {
    onError: (error: Error) => {
      setAlertSeverity('error');
      setAlertMessage(`Error: ${error.message}`);
      setOpen(true);
    },
    onSuccess: (data) => {
      setAlertSeverity('success');
      setAlertMessage(`Touchpoint ${data.meetingID} created`);
      setOpen(true);
      if(!coacheeSelected)setCoachee("-1");
      setType(0);
      setSelectedDate(new Date(newDate));
      setNotes("");
    }
  });

  //Form Submission handler
  const saveTouchpoint = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { formIsValid, errors } = handleValidation();
    if (formIsValid) {
      meetingMutation.mutate({
        meetingTypeID: type,
        meetingDate: selectedDate!,
        coacheeID: coachee,
        userID: store._userID!,
        notes:notes
      });
    }
    else { //Invalid form
      setAlertSeverity('warning');
      setAlertMessage(`Error: ${errors.map((err) => (' ' + err))}`);
      setOpen(true);
    }
  };

  return (
    <React.Fragment>
      <form className={classes.root} onSubmit={saveTouchpoint}>
        <Typography className={classes.title} variant='h5' align='center'>{translations.title}</Typography>
        {(types.isLoading || coachees.isLoading)
          ? <TouchpointSkeleton/>
          : (types.isError || coachees.isError)
            ? <p>An error occurred: {coachees.isError && coachees.error.message} {types.isError && types.error.message}</p> : <>
              {!coacheeSelected && <FormControl className={classes.formControl}>
                <InputLabel id="coachee-label">{translations.coachee}</InputLabel>
                <Select
                  labelId="coachee-label"
                  id="coachee-selector"
                  value={coachee}
                  onChange={handleCoacheeChange}
                >
                  <MenuItem value={"-1"} key='-1'>{translations.none}</MenuItem>;
                  {coachees.data!.map((coachee: Coachee) => {
                    return <MenuItem value={coachee.coacheeID} key={coachee.coacheeID}>{coachee.firstName} {coachee.lastName}</MenuItem>;
                  })}
                </Select>
              </FormControl>}
              <FormControl className={classes.formControl}>
                <InputLabel id="type-label">{translations.type}</InputLabel>
                <Select
                  labelId="type-label"
                  id="type-selector"
                  value={type}
                  onChange={handleTypeChange}
                >
                  <MenuItem value={parseInt('0')} key='0'>{translations.none}</MenuItem>;
                  {types.data!.map((meetingType: MeetingType) => {
                    return <MenuItem value={meetingType.meetingTypeID} key={meetingType.meetingTypeID}>{meetingType.description}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <FormControl className={classes.formControl}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label={translations.date}
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label={translations.time}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </FormControl>
              </MuiPickersUtilsProvider>
              <FormControl className={classes.formControl}>
                <TextField
                  variant="outlined"
                  multiline
                  value={notes}
                  onChange={(event)=>{setNotes(event.target.value)}}
                  label={translations.notes}
                  />
              </FormControl> 

              <FormControl className={classes.formControl}>
                <Button color="primary" variant='contained' type='submit'>{translations.button}</Button>
              </FormControl>
              {meetingMutation.isLoading ? <CircularProgress/> : null}
            </>}
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
