import React,{useState} from 'react';
import './App.css';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Paper,Switch} from "@material-ui/core";
import {Route, BrowserRouter as Router, Link} from 'react-router-dom';
import Home from './pages/home';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function App() {
  const [darkMode,setDarkMode]=useState(false);
  const darkTheme= createMuiTheme({
    palette:{
     type: "dark",
    },
  });
  const lightTheme =createMuiTheme({});
  
  return (
    <ThemeProvider theme={darkMode? darkTheme : lightTheme}>
      {/* paper allows for the changing in the theme, so wrap file componets and pages in a paper componet  */}
      <Paper style={{height:'100vh'}}>
        {/* paper handles all of the background and forground that will be used through out the app, app bar is the banner for the top so toggel switch wasnt placed in a odd space  */}
        <AppBar position='static'>
          <Toolbar>
          <Typography variant="h6">
            SCCI Company App
          </Typography>          
          <div className='darkSwitch'>
            <label >Dark Mode</label>
          <Switch  className='darkSwitch' checked ={darkMode} onChange={()=>setDarkMode(!darkMode)}/>  
          </div>                     
          </Toolbar>
        </AppBar>
         {/*bellow is the linking componet to home page REMOVE IF WORKING ON THE LOGIN  */}
        <Home/>   
      </Paper>
  </ThemeProvider>
  )};

export default App;