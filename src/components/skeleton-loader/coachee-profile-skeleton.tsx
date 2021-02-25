import Skeleton from '@material-ui/lab/Skeleton';

export const CoacheeProfileSkeleton = () =>
{
    return(
        <div>
            <br></br>
            <br></br>
            <Skeleton variant="circle" width={400} height={400}/>
            <br></br>
            <Skeleton variant="rect" width={320} height={40}/>
            <br></br>
            <Skeleton variant="rect" width={320} height={40}/>
            <br></br>
            <br></br>
            <Skeleton variant="rect" width={640} height={40}/>
            <br></br>
            <br></br>
            <Skeleton variant="rect" width={180} height={40}/>
        </div>
    )
}