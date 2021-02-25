export interface companyfields{
    id:number,
    name:string,
    value:number, 
     
  }
  export interface managerFields{
    id:number,
    name:string,
    value:number,
    
    
  }
  export interface departmentFields{
      id:number,
      name:string,
      value:number,
      
  }
  export interface supervisorField{
    id:number,
    name:string,
    value:number,
  }
  export interface vpField{
    id:number,
    name:string,
    value:number,
  }
  export interface fieldValue{
    firstName:string,
    lastName:string,
    cellphone:number,
    email:string,
    officeNumber:number,
    teamNumber:number,
    building:string,
    workLocation:string,
    surveyCompleted:boolean,
    capCompleted:number,
    Company:number,
    department:string,
    supervisor:string,
    vp:string,
  }