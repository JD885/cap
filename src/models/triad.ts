export interface TriadNotes
{
    touchpointID:string,
    touchpointTypeID?:string;
    date: Date,
    userID?:string,
    capItemID:string,
    coacheeID:string,
    capItemScore:number,
    goal: string,
    observations: string,
    opportunities: string,
    commitments:string
}