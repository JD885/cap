import { DateType } from "@date-io/type";


export interface ABS {
  ID:string,
  absmoduleName:string,
  assignedDate?:Date,
  dueDate?:Date,
  completedDate?:Date
}

export interface ABSModules {
    coacheeID: string,
    absModule: Array<ABS>
}