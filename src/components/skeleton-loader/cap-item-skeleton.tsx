import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

export const CapSkeleton = () =>
{
    return (
        <React.Fragment>
            <Skeleton variant="rect" width={500} height={118} />
            <br/>
            <Skeleton variant="rect" width={500} height={118} />
            <br/>
            <Skeleton variant="rect" width={500} height={118} />
            <br/>
        </React.Fragment>
    )
}