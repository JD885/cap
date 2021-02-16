import React, {useState}from 'react';
import { Link, withRouter } from "react-router-dom";
import { ListItem, ListItemText } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export const TabPanel = (props: TabPanelProps) =>
{
    const { children, value, index, ...other } = props;

    return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (
        <Box p={3}>
            <Typography>{children}</Typography>
        </Box>
        )}
    </div>
    );
}