import Skeleton from '@material-ui/lab/Skeleton';

export const CoacheeSelectorSkeleton = () =>
{
    return(
        <div>
            <br></br>
            <br></br>
            <Skeleton variant="rect" height={80}/>
            <br></br>
            <br></br>
            <Skeleton variant="rect" height={80}/>
            <br></br>
            <br></br>
            <Skeleton variant="rect" height={80}/>
            <br></br>
            <br></br>
            <Skeleton variant="rect" height={80}/>
        </div>
    )
}