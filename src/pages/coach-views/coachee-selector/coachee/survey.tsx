
 import Card from '@material-ui/core/Card'
 import DialogContent from '@material-ui/core/DialogContent'
 import MenuItem from '@material-ui/core/MenuItem'
 import Select from '@material-ui/core/Select'
 import Snackbar from '@material-ui/core/Snackbar'
 import theme from '@material-ui/core/'

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SurveyResult } from "../../../../models/surveyresult";
import { Survey } from "../../../../models/survey";
import { translate } from "../../../../constants/translate";
import { useMutation, useQuery } from "react-query";
import {
  getSurveysbyCoachee,
  createSurveyRecord,
  getAllSurveyTypes,
} from "../../../../api/api";
import MuiAlert from "@material-ui/lab/Alert";
import { SurveySkeleton } from "../../../../components/skeleton-loader/survey-skeleton";

interface passedID {
  id: number;
}
//Alert wrapper function
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export function DisplaySurveys(prop?: passedID) {
  const selectedCoachee = prop?.id;
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const translations = translate.use().survey;
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  //react queries
  const surveyResults = useQuery<SurveyResult[], Error>("survey", () =>
    getSurveysbyCoachee(selectedCoachee!)
  );
  const fetchedData = surveyResults.data;

  //Snackbar & Alert handler
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
    }
    setOpenSnackBar(false);
  };

  //EDIT SURVEY DIALOG
  function EditSurveyDialog(props: SurveyResult) {
    const [openEdit, setOpenEdit] = React.useState(false);

    const [avgScore, setAvgScore] = useState(props.averageScore);
    const [assnDate, setAssnDate] = useState(props.assnDate);
    const [dueDate, setDueDate] = useState(props.dueDate);
    const [surveyComplDate, setSurveyComplDate] = useState(
      props.surveyComplDate
    );
    const surveyName = props.surveyName;
    const selectedCoachee = props.coacheeID;
    const surveyNumber = props.surveyNumber;

    const handleClickOpen = () => {
      setOpenEdit(true);
    };

    const handleClose = () => {
      setOpenEdit(false);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        avgScore !== "" &&
        assnDate !== "" &&
        dueDate !== "" &&
        surveyComplDate !== ""
      ) {
        const newSurvey = {
          selectedCoachee,
          surveyNumber,
          surveyName,
          avgScore,
          assnDate,
          dueDate,
          surveyComplDate,
        };
        console.log(newSurvey);
        setAlertSeverity("success");
        setAlertMessage("Survey Information Updated");
        setOpenEdit(false);
        setOpenSnackBar(true);
      } else {
        setAlertSeverity("warning");
        setAlertMessage("Please enter valid information");
        setOpenEdit(true);
        setOpenSnackBar(true);
      }
    };
    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog
          open={openEdit}
          // onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Information for {props.surveyName}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="averageScore"
              name="averageScore"
              label="Avg Score"
              type="number"
              fullWidth
              value={avgScore}
              onChange={(e) => setAvgScore(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="assnDate"
              name="assnDate"
              label="Assigned Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={assnDate}
              onChange={(e) => {
                setAssnDate(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="dueDate"
              name="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="surveyComplDate"
              name="surveyComplDate"
              label="Compl Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={surveyComplDate}
              onChange={(e) => {
                setSurveyComplDate(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {translations.cancel}
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {translations.update}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  //NEW SURVEY DIALOG
  function NewSurveyDialog() {
    const [openNewSurveyRecord, setOpenNewSurveyRecord] = React.useState(false);
    const [survey, setSurvey] = useState({
      coacheeID: "",
      surveyNumber: "",
      surveyName: "",
      averageScore: "",
      assnDate: "",
      dueDate: "",
      surveyComplDate: "",
    });
    const surveys = useQuery<Survey[], Error, Survey[]>(
      "surveys",
      getAllSurveyTypes
    );

    // const surveyMutation = useMutation(createSurveyRecord, {
    //   onError: (error: Error) => {

    //   },
    //   onSuccess: (data) => {
    //     setAlertSeverity('success');
    //     setAlertMessage(`Touchpoint ${data.id} created`);
    //     setOpen(true);
    //   }
    // });

    // const createNewRecord = () => {
    //   surveyMutation.mutate({
    //     id:Number.parseInt(survey.id),
    //   averageScore: Number.parseInt(survey.averageScore),
    //   surveyName: survey.surveyName,
    //   assnDate: survey.assnDate,
    //   surveyComplDate: survey.surveyComplDate,
    //   dueDate: survey.dueDate,
    //   })
    // };

    const handleClickOpen = () => {
      setOpenNewSurveyRecord(true);
    };

    const handleClose = () => {
      setOpenNewSurveyRecord(false);
    };

    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setSurvey({ ...survey, [name]: value, surveyName: name });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (
        survey.surveyNumber !== "" &&
        survey.averageScore !== "" &&
        survey.assnDate !== "" &&
        survey.dueDate !== ""
      ) {
        const newSurvey = { ...survey, coacheeID: selectedCoachee };
        console.log(newSurvey);
        setAlertSeverity("success");
        setAlertMessage("Created New Survey Record");
        setOpenNewSurveyRecord(false);
        setOpenSnackBar(true);
      } else {
        setAlertSeverity("warning");
        setAlertMessage("Please enter valid information");
        setOpenNewSurveyRecord(false);
        setOpenSnackBar(true);
      }
    };
    return (
      <div>
        <Button color="primary" variant='contained' onClick={handleClickOpen}>
          New Record
        </Button>
        <Dialog
          open={openNewSurveyRecord}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Survey Record</DialogTitle>
          <DialogContent>
            <Select
              id="surveyNumber"
              name="surveyNumber"
              fullWidth={true}
              defaultValue={-1}
              onChange={handleChange}
              required
            >
              <MenuItem value={-1} key={-1}>
                Select...
              </MenuItem>
              {surveys.data?.map((st: Survey) => {
                return (
                  <MenuItem value={st.surveyNumber}>{st.surveyName}</MenuItem>
                );
              })}
            </Select>
            <TextField
              autoFocus
              margin="dense"
              id="averageScore"
              name="averageScore"
              label="Avg Score"
              type="number"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="assnDate"
              name="assnDate"
              label="Assigned Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="dueDate"
              name="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="surveyComplDate"
              name="surveyComplDate"
              label="Compl Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {translations.cancel}
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {translations.create}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  //Return to display list of surveys
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        {translations.results}
      </h1>
      {surveyResults.isLoading ? (
        <SurveySkeleton />
      ) : (
        surveyResults.data?.map((s: SurveyResult) => {
          const { surveyNumber, surveyName, averageScore, assnDate } = s;
          return (
            <Card
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <div>
                <h3>{surveyName}</h3>
                <p>
                  {translations.avgScore}: <b>{averageScore}</b>
                </p>
                <p>
                  {translations.assnDate}: <b>{assnDate}</b>
                </p>
              </div>
              <EditSurveyDialog
                coacheeID={String(selectedCoachee)}
                surveyNumber={s.surveyNumber}
                averageScore={s.averageScore}
                surveyName={s.surveyName}
                assnDate={s.assnDate}
                dueDate={s.dueDate}
                surveyComplDate={s.surveyComplDate}
              />
            </Card>
          );
        })
      )}
      <NewSurveyDialog />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
