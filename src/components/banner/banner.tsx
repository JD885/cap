import {Switch as UISwitch, AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import React from "react";
import { Route, Switch, Link as RouterLink } from 'react-router-dom';
import { Navbar } from "./nav-bar";
import { translate } from '../../constants/translate'
import { DarkSwitch } from "../settings/dark-switch";


export const Banner = () =>
{
    return(
        <AppBar position="static">
            <Toolbar>
                <Navbar />
                <Link component={RouterLink} to='/app'>
                    <Typography variant="h6" style={{ color: 'white' }} >Sacred Cow</Typography>
                </Link>
                {/* <DarkSwitch/> */}
            </Toolbar>
        </AppBar>
    )
}