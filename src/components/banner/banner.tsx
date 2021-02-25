import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Navbar } from "./nav-bar";


export const Banner = () =>
{
    return(
        <AppBar position="static">
            <Toolbar>
                <Navbar />
                <Link component={RouterLink} to='/'>
                    <Typography variant="h6" style={{ color: 'white' }} >Sacred Cow</Typography>
                </Link>
                {/* <DarkSwitch/> */}
            </Toolbar>
        </AppBar>
    )
}