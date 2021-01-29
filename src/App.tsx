import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { Paper, Switch as UISwitch, AppBar, Toolbar, Typography } from "@material-ui/core";
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { GlobalProvider } from './stores/global-store';
import './App.css';

import { Login } from './pages/login';
import { Layout } from './pages/layout';
import { ProtectedRoute } from './auth/protected';
import { Coachee } from './pages/coachee';
import { Dashboard } from './pages/dashboard';
import { QualityTracker } from './pages/qualityTracker';
import { CoacheeSelector } from './pages/coacheeSelector';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const lightTheme = createMuiTheme({});

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {/* paper allows for the changing in the theme, so wrap file componets and pages in a paper componet  */}
      <Paper style={{ height: '100vh' }}>
        {/* paper handles all of the background and forground that will be used through out the app, app bar is the banner for the top so toggel switch wasnt placed in a odd space  */}
        <GlobalProvider>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant="h6">
                SCCI Company App
          </Typography>
              <div className='darkSwitch'>
                <label >Dark Mode</label>
                <UISwitch className='darkSwitch' checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              </div>
            </Toolbar>
          </AppBar>
          <Switch>
            {/* These are placeholders and can be freely removed/edited during development */}
            <Route exact path='/' component={Login}></Route>
            <ProtectedRoute exact path='/app' component={Layout} />
            <ProtectedRoute path='/app/coachee/:id' component={Coachee} />
            <ProtectedRoute path='/app/dashboard/:id' component={Dashboard} />
            <ProtectedRoute path='/app/qualityTracker/:id' component={QualityTracker} />
            <ProtectedRoute path='/app/coacheeSelector' component={CoacheeSelector} />
            <Route path='/' render={() => (<div>404 NOT FOUND</div>)}></Route>
          </Switch>
        </GlobalProvider>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
