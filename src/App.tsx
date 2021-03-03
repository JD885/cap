import React, { useState,useEffect} from 'react';
import { ThemeProvider, createMuiTheme,  } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { Paper } from "@material-ui/core";
import { GlobalProvider } from './stores/global-store';
import './App.css';
import { Layout } from './pages/coach-views/coachee-selector/coachee/layout';
import { Coachee } from './pages/coach-views/coachee-selector/coachee/coachee';
import { Dashboard } from './pages/admin/dashboard';
import {AbsUpdate} from './pages/admin/abs/absUpdate';
import { QualityTracker } from './pages/admin/qualityTracker';
import { CoacheeSelector } from './pages/coach-views/coachee-selector/coacheeSelector';
import { Touchpoint } from './pages/coach-views/coachee-selector/coachee/touchpoint';
import { ABS } from './pages/coach-views/coachee-selector/coachee/abs';
import { DisplaySurveys } from './pages/coach-views/coachee-selector/coachee/survey';
import { Meeting } from './pages/coach-views/coachee-selector/coachee/meeting';
import { Field } from './pages/coach-views/coachee-selector/coachee/field';
import { MeetingTraining } from './pages/coach-views/coachee-selector/coachee/meetingTraining';
import { Triad } from './pages/coach-views/coachee-selector/coachee/triad';
import { ScheduleTouchpoint } from './pages/coach-views/triad-no-coachee/scheduleTouchpoint';
import {UpdateAbs} from './pages/coach-views/coachee-selector/coachee/updateAbs';
import {translate} from "./constants/translate";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { Banner } from './components/banner/banner';
import { SplashScreen } from './pages/login/splash-screen';
import { observer } from 'mobx-react-lite';
import { Dark } from './stores/dark-mode';
import AddNewCoachee from './pages/coach-views/newCoachee/add-new-coachee';

import { ImageModal } from './components/settings/image-modal';
import { fromUnixTime } from 'date-fns/esm';

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
      {/* {/* paper allows for the changing in the theme */}
      <Paper style={{ height: "100%", minHeight:"100vh" }}>
        {/* paper handles all of the background and forground that will be used through out the app, app bar is the banner for the top so toggel switch wasnt placed in a odd space  */}
        <GlobalProvider>
          <Banner/>
          <Switch>
            {/* These are placeholders and can be freely removed/edited during development */}
            <Route exact path='/' component={Layout}/>
            {/* <Route exact path='/app' component={Layout} /> */}
            <Route exact path='/app/coachee/:id?' component={Coachee} />
            <Route exact path='/app/dashboard/:id?' component={Dashboard} />
            <Route exact path='/app/dashboard/absCRUD/:id?' component={AbsUpdate} />
            <Route path='/app/qualityTracker/:id?' component={QualityTracker} />
            <Route path='/app/coacheeSelector' component={CoacheeSelector} />
            <Route path='/app/abs' component={ABS} />
            <Route path='/app/touchpoint' component={Touchpoint} />
            <Route path='/app/survey' component={DisplaySurveys} />
            <Route path='/app/meeting' component={Meeting} />
            <Route path='/app/field' component={Field} />
            <Route path='/app/meetingTraining' component={MeetingTraining} />
            <Route path='/app/triad' component={Triad} />
            <Route exact path='/app/coachee/:id?/:moduleid?' component={UpdateAbs} />
            <Route path='/app/scheduleTouchpoint' component={ScheduleTouchpoint} />
            <Route path='/app/addNewCoachee' component={AddNewCoachee}/>
            <Route path='/' render={() => (<div>404 NOT FOUND</div>)}></Route>
          </Switch>
        </GlobalProvider>
      </Paper>
    </ThemeProvider>
    </QueryClientProvider>
  );
})
  

export default App;

