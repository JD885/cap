import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles,} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';
import { Link, withRouter } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToAppTwoTone';
import TuneIcon from '@material-ui/icons/TuneTwoTone';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import TrendingUpIcon from '@material-ui/icons/TrendingUpTwoTone';
import Divider from '@material-ui/core/Divider';
import PermContactCalendarTwoToneIcon from '@material-ui/icons/PermContactCalendarTwoTone';
import { SettingModal } from '../../pages/settings/modal';

const drawerWidth = 240;
const useStyles = makeStyles(theme => (
{
    root: 
    {
        display: 'flex',
    },
    drawer: 
    {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: 
    {
        width: drawerWidth
    },
    pic:
    {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '120px',
        margin:"auto"
    }
}));

export function Navbar() {
    const classes = useStyles();
    const [navOpen, ToggleNav] = React.useState(false);

    //This boolean will be stored in the global store
    //For now I am just setting it to true so it can be seen in the view
    const isAdmin=true;

    
    function handleDrawerToggle() {
        ToggleNav(!navOpen)
    }
    const drawer = (
    <div>
    <List>
        
        <ListItem onClick={handleDrawerToggle} className={classes.pic} button component={Link} to="">
            <img src="/img/SCC-logo-sm.png" alt="Logo" />
        </ListItem>

        <ListItem onClick={handleDrawerToggle} button component={Link} to="/app/coacheeSelector">
            <ListItemIcon><SupervisedUserCircleIcon/></ListItemIcon>
            <ListItemText primary="My Coachees" />
        </ListItem>

        <ListItem onClick={handleDrawerToggle} button component={Link} to="/app/scheduleTouchpoint">
            <ListItemIcon><PermContactCalendarTwoToneIcon/></ListItemIcon>
            <ListItemText primary="New Touchpoint" />
        </ListItem>

        {isAdmin && 
            <ListItem onClick={handleDrawerToggle} button component={Link} to="/app/dashboard">
                <ListItemIcon><TrendingUpIcon/></ListItemIcon>
                <ListItemText primary="Admin" />
            </ListItem>
        }

        <Divider/>

        <SettingModal close={handleDrawerToggle} />

        <ListItem onClick={handleDrawerToggle} button component={Link} to="">
            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>

        

    </List>
    </div>
);
return (
    <div className={classes.root}>

        <Button onClick={handleDrawerToggle}>
            <MenuIcon style={{ color: 'white' }} />
        </Button>
    
        
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={'left'}
                    open={navOpen}
                    onClose={handleDrawerToggle}
                    classes={{paper: classes.drawerPaper,}}
                    ModalProps={{keepMounted: true}} // Better open performance on mobile.
                >
                    {drawer}
                </Drawer>
            </Hidden>
        
    </div>
);
}