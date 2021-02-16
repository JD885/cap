import Skeleton from '@material-ui/lab/Skeleton';

export const TouchpointSkeleton = () =>
{
    return(
        <div>
            <br/>
            <Skeleton variant="text" width={500} />
            <br></br>
            <br></br>
            <Skeleton variant="text" />
            <br></br>
            <br></br>
            <Skeleton variant="text" />
            <br></br>
            <br></br>
            <Skeleton variant="text" />
            <br></br>
            <br></br>
            <Skeleton variant="rect" height={118}/>
        </div>
    )
}