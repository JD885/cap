import React from 'react';
import { Container } from '@material-ui/core';
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
        <Container>
            <Box>
                {children}
            </Box>
        </Container>
        )}
    </div>
    );
}