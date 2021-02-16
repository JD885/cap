import React, { useState,useEffect} from 'react';
import { ThemeProvider, createMuiTheme,  } from '@material-ui/core/styles';
import { Route, Switch, Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, Paper, Toolbar, Typography } from "@material-ui/core";
import { GlobalContext, GlobalProvider } from './stores/global-store';
import './App.css';

import { Login } from './pages/login/login';
import { Layout } from './pages/coach-views/coachee-selector/coachee/layout';
import { Coachee } from './pages/coach-views/coachee-selector/coachee/coachee';
import { Dashboard } from './pages/admin/dashboard';
import { QualityTracker } from './pages/admin/qualityTracker';
import { CoacheeSelector } from './pages/coach-views/coachee-selector/coacheeSelector';
import { Touchpoint } from './pages/coach-views/coachee-selector/coachee/touchpoint';
import { ABS } from './pages/coach-views/coachee-selector/coachee/abs';
import { Survey } from './pages/coach-views/coachee-selector/coachee/survey';
import { Meeting } from './pages/coach-views/coachee-selector/coachee/meeting';
import { Field } from './pages/coach-views/coachee-selector/coachee/field';
import { MeetingTraining } from './pages/coach-views/coachee-selector/coachee/meetingTraining';
import { Triad } from './pages/coach-views/coachee-selector/coachee/triad';
import { ScheduleTouchpoint } from './pages/coach-views/triad-no-coachee/scheduleTouchpoint';
import {translate} from "./constants/translate";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { Banner } from './components/banner/banner';
import { SplashScreen } from './pages/login/splash-screen';
import { observer, Observer } from 'mobx-react-lite';
import { Dark } from './stores/dark-mode'
import { ImageModal } from './components/settings/image-modal';

const queryClient = new QueryClient();

export let dark = new Dark();



const App=observer(()=> 
{

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const lightTheme = createMuiTheme({});
  
  let [loading,setStatus]=useState(true);
  
  useEffect(()=>{
    demoAsyncCall().then(()=>setStatus(loading=false));
  }, [])

  
    

  function demoAsyncCall() {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 250));
  }

  if(loading) return <SplashScreen/>

  return (
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ThemeProvider theme={dark.isDark ? darkTheme : lightTheme}>
      {/* paper allows for the changing in the theme, so wrap file componets and pages in a paper componet  */}
      <Paper style={{ height: "100%", minHeight:"100vh" }}>
        {/* paper handles all of the background and forground that will be used through out the app, app bar is the banner for the top so toggel switch wasnt placed in a odd space  */}
        <GlobalProvider>
          <Banner/>
          <Switch>
            {/* These are placeholders and can be freely removed/edited during development */}
            <Route exact path='/' component={Layout}/>
            {/* <Route exact path='/app' component={Layout} /> */}
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
            <Route path='/app/scheduleTouchpoint' component={ScheduleTouchpoint} />
            <Route path='/' render={() => (<div>404 NOT FOUND</div>)}></Route>
          </Switch>
        </GlobalProvider>
      </Paper>
    </ThemeProvider>
    </QueryClientProvider>
  );
})
  

export default App;

