/*
Author: Joseph Tanner
Date: Febuary 5, 2021
Purpose: This page with components are for the creation of a new coachee to the system for a coach. Until APi is set up it is still very much in alpha testing but will be easly convertable to full procces once api is set up with service workers.
TODO: write associated service worker, 

*/
import {useQuery} from 'react-query';
import React,{useState,useEffect} from 'react';
import {useForm} from 'react-hook-form';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'; 
import {
  companyfields,
  fieldValue,
  departmentFields, 
  managerFields,
  supervisorField,
  vpField} from '../../../models/newCoacheeModel';
import {GlobalProvider} from '../../../stores/global-store';
import { 
  getAllCompanies, 
  getDepartmentById, 
  getManagersById,
  getSupervisorList, 
  getVpList} from '../../../api/api';
  import {useHistory}from'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import {translate}from '../../../constants/translate';
import CircularProgress from '@material-ui/core/CircularProgress';

const AddNewCoachee =()=>{ 
const { register,handleSubmit,errors}=useForm<fieldValue>({});
let history= useHistory();
const [state, setState]= useState(false);
const [deptState,setDeptState]= useState(false)
const [companyState,setCompanyState]=useState(false)
const [open, setOpen] = useState(false);
const translations = translate.use().AddNewCoachee;
// onload fetches companyList
 let myobj=useQuery<companyfields[],Error,companyfields[]>('company',()=> getAllCompanies()); 
 let companyData;
 if(myobj.isSuccess){ 
  companyData=myobj.data
 }
 let id;
 let dpId;
 let deptobj =useQuery<departmentFields[],Error,departmentFields[]>('depart',()=>getDepartmentById(id),{enabled:state});
let managerobj=useQuery<managerFields[],Error,managerFields[]>('manager',()=>getManagersById(dpId),{enabled:deptState});
let superobj=useQuery<supervisorField[],Error,supervisorField[]>('super',()=> getSupervisorList(),{enabled:deptState});
let vpobj=useQuery<vpField[],Error,vpField[]>('vp',()=> getVpList(),{enabled:companyState});
// below get managers,Sups, and VP
const GetManagers = (e)=>{   
    if(e.target.value === 0){
      setDeptState(false)     
    }
    else{
      setDeptState(true)
      setCompanyState(true);
      dpId=e.target.value;
    }
         
}; 
// below function is tied to company select
const GetDepartment=(e)=>{ 
     if(e=== 0){
       setState(false)
      
     }
     else{
       
      id=e.target.value
      setState(true);
     }
    }
 const handleClose=(event?: React.SyntheticEvent, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
 };
const onSubmit=(data)=>{
  setOpen(true);
  console.log(data);
  setTimeout(() => {
    history.push('/app/coacheeSelector')
  }, 3000);
};
     return (           
      <form className='addCoachee-form' onSubmit={handleSubmit(onSubmit)}>
        <List>
          <h1>{translations.Title}</h1>
          <ListItem>
          <div className='form-control'>
          <label>{translations.firstName}</label><br/>        
          <input style={{fontSize:'18px'}}
            type='text'
            name='firstName'
            ref={register({
              required:'A name is required.',
            })}/>
            {errors.firstName && <Alert severity='warning'>{translations.firstNameError}</Alert>}
        </div><br/>
          </ListItem>
          <ListItem>
          <div className='form-control'>
          <label>{translations.lastName}</label><br/>
          <input type='text'style={{fontSize:'18px'}} name='lastName' ref={register({
            required:'A last name is required'
            })}/>
            {errors.lastName && <Alert severity='warning'> {translations.lastNameError}</Alert>}
        </div><br/>
          </ListItem>
          <ListItem>
          <div className='form-control'>
          <label>{translations.cellphone}</label><br/>
          <input type='number'style={{fontSize:'18px'}} name='cellphone'
            ref={register({
              required:'cellphone is required.',
              minLength:{
                value:10,
                message:'A cellphone is required to be on file and needs area code',
              }
            })}
          />
          {errors.cellphone && <Alert severity='warning'>{translations.cellphoneError} with area code</Alert>}
        </div> <br/>
          </ListItem>
          <ListItem>
          <div className='form-control'>
            <label>{translations.email}</label><br/>
            <input 
            style={{fontSize:'18px'}}
            type='email'
            name='email'
            ref={register({
              required: 'Email is required.',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid.'
              }
            })}          
            />
            {errors.email && <Alert severity='warning'>{translations.emailERROR}</Alert>}
        </div><br/>
          </ListItem>
          <ListItem>
          <div className='form-control'>
          <label>{translations.officeNumber}</label><br/>
          <input
          style={{fontSize:'18px'}}
          type='number'
          name='officeNumber'
          ref={register({
            required:'office number is required.',
            minLength:{
              value:10,
              message:'A phone number is required to be on file and needs area code',
            }
          })}
          />
          {errors.officeNumber && <Alert severity='warning'>{translations.officeNumberError}</Alert>}
        </div><br/>
          </ListItem>
          <ListItem>
            <div className='form-control'>
            <label>{translations.building}</label><br/>
            <input
            style={{fontSize:'18px'}}
            type='text'
            name='building'
            ref={register({
              required:'building address is required.'                  
            })}
            />
            {errors.building && <Alert severity='warning'>{translations.buildingError}</Alert>}
          </div><br/>
          </ListItem>
          <ListItem>
            <div className='form-control'>
            <label>{translations.workloaction}</label><br/>
            <input
            style={{fontSize:'18px'}}
            type="text"
            name='workLocation'
            ref={register({
              required:'Work location is required.'
            })}
            />
            {errors.workLocation&& <Alert severity='warning'>{translations.workloactionError}</Alert>}
          </div><br/>
          </ListItem>
          <ListItem>
            <div className='form-control'>
            <label>{translations.survey}</label><br></br>
            <input name='surveyCompleted' type='checkbox' ref={register}/>
          </div><br/>
        </ListItem>
          <ListItem>
        <div className='form-control'>
          <label>{translations.CAP}</label><br/>
          <select name='capCompleted' ref={register}>
            <option value='0'>Select a CAP </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select> 
        </div><br></br>
        </ListItem>
          <ListItem>
          {myobj.isLoading && <CircularProgress/>}
          {myobj.isSuccess &&
          <div className='form-control'style={{width: '200px'}}>
          <label>{translations.company}</label><br/>
           <select name='Company'                   
           ref={register({
           })}          
           onChange={(e)=> GetDepartment(e)}        
            >
               <option value='0'>Select a company</option>
              {errors.Company && <Alert severity='warning'>A building address is required</Alert>}
             {companyData.map((company:companyfields)=>(
               <option key={company.id} value={company.value}>{company.name}</option>
             ))};
          </select>
          {errors.Company && <Alert severity='warning'> A company must associated with a coachee</Alert>}
        </div> }
          </ListItem>
          <ListItem>
          {deptobj.isLoading && <CircularProgress/>}
          {deptobj.isSuccess &&
         <div className='form-control'>
          <label>{translations.department}</label><br></br>
          <select ref={register} name='department' onChange={(e)=>GetManagers(e)}> 
            {deptobj.data.map((depart:departmentFields)=>(
               <option key={depart.id} value={depart.id}>{depart.name}</option>
                ))};
          </select>
        </div>}
          </ListItem>
          <ListItem>
          {managerobj.isLoading && <CircularProgress/>}
          {managerobj.isSuccess&& 
        <div className='form-control'>
          <label>{translations.manager}</label><br></br>
          <select ref={register} name='manager'>
            {managerobj.data.map((manager:managerFields)=>(
              <option key={manager.id} value={manager.id}>{manager.name}</option>
            ))}
          </select>
          
        </div>}<br/>
          </ListItem>
          <ListItem>
          {superobj.isLoading && <CircularProgress/>}
          {superobj.isSuccess &&
        <div className='form-control'>
          <label>{translations.supervisor}</label><br/>
          <select ref={register} name='supervisor'>
            {superobj.data.map((sup:supervisorField)=>(
              <option key={sup.id} value={sup.value}>{sup.name}</option>
            ))}
          </select>
          {errors.supervisor && <Alert severity='warning'>A supervior is required</Alert>}
        </div>}
        <br></br>
          </ListItem>
          <ListItem>
          {vpobj.isLoading && <CircularProgress/>}
          {vpobj.isSuccess &&
        <div className='form-control'>
          <label>V{translations.vp}</label><br/>
          <select ref={register} name='Vp'>
            {vpobj.data.map((vp:vpField)=>(
              <option key={vp.id}value={vp.value}>{vp.name}</option>
            ))}
            {errors.vp && <Alert severity='warning'>A email required</Alert>}
          </select>
        </div>}<br/>  
          </ListItem>
          <ListItem>
          <div className='form-control'>
        <Button variant="contained" color="primary" type='submit'>
        {translations.submit}
        </Button>
        </div><br></br>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
        {translations.snackMessage}
        </Alert>
      </Snackbar>
          </ListItem>
        </List>          
        </form>  
     )
}
export default AddNewCoachee