import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import {
  Paper,
  Switch as UISwitch,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { GlobalProvider } from "./stores/global-store";
import "./App.css";

import { Login } from './pages/login';
import { Layout } from './pages/layout';
import { ProtectedRoute } from './auth/protected';
import { Coachee } from './pages/coachee';
import { Dashboard } from './pages/dashboard';
import { QualityTracker } from './pages/qualityTracker';
import { CoacheeSelector } from './pages/coacheeSelector';
import { Touchpoint } from './pages/touchpoint';
import { ABS } from './pages/abs';
import { Survey } from './pages/survey';
import { Meeting } from './pages/meeting';
import { Field } from './pages/field';
import { MeetingTraining } from './pages/meetingTraining';
import { Triad } from './pages/triad';
import {translate} from "./constants/translate";

function ChangeLanguageButton({
  language,
  label,
}: {
  language: "fr" | "en";
  label: string;
}) {
  const onClick = () => {
    translate.setOptions({
      language,
      fallback: "en",
    });
  };
  return <button onClick={onClick}>{label}</button>;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const lightTheme = createMuiTheme({});

  const translations = translate.use().appBar;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {/* paper allows for the changing in the theme, so wrap file componets and pages in a paper componet  */}
      <Paper style={{ height: "100vh" }}>
        {/* paper handles all of the background and forground that will be used through out the app, app bar is the banner for the top so toggel switch wasnt placed in a odd space  */}
        <GlobalProvider>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">SCCI Company App</Typography>
              <div className="darkSwitch">
                <label>{translations.darkMode}</label>
                <UISwitch
                  className="darkSwitch"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </div>
            </Toolbar>
            <div>

            <ChangeLanguageButton language={"fr"} label={"Français"} />
            <ChangeLanguageButton language={"en"} label={"English"} />
            </div>
          </AppBar>
          <Switch>
            {/* These are placeholders and can be freely removed/edited during development */}
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/app' component={Layout} />
            <Route path='/app/coachee/:id?' component={Coachee} />
            <Route path='/app/dashboard/:id?' component={Dashboard} />
            <Route path='/app/qualityTracker/:id?' component={QualityTracker} />
            <Route path='/app/coacheeSelector' component={CoacheeSelector} />
            <Route path='/app/abs' component={ABS} />
            <Route path='/app/touchpoint' component={Touchpoint} />
            <Route path='/app/survey' component={Survey} />
            <Route path='/app/meeting' component={Meeting} />
            <Route path='/app/field' component={Field} />
            <Route path='/app/meetingTraining' component={MeetingTraining} />
            <Route path='/app/triad' component={Triad} />
            <Route path='/' render={() => (<div>404 NOT FOUND</div>)}></Route>
          </Switch>
        </GlobalProvider>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
