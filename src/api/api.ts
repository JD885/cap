import { TriadNotes } from './../models/triad';
import { capItem, capCategory, coacheeCapItem } from './../models/cap-items';
import {API} from "../constants/api-endpoints"
import ky from 'ky'
import { Coachee } from '../models/coachee';
import { MeetingType } from '../models/meetingType';
import { Touchpoint } from '../models/touchpoint' 
import { coacheeList } from '../models/coacheeList';
import { coacheeInfo } from '../models/coacheeInfo';
import { SurveyResult } from "../models/surveyresult";
import {Survey} from "../models/survey"
import { companyfields, departmentFields, managerFields, supervisorField, vpField } from "../models/newCoacheeModel";


export async function getAllCoachees(id:number):Promise<Response>
{
    return await ky.get(API.coacheeList+"?"+id)
}

export async function getCoacheesByCoach(id:number):Promise<Coachee[]>
{
  return await ky.get(API.getCoacheesByCoach+"?"+id).json()
}

export async function getMeetingTypes():Promise<MeetingType[]>
{
  return await ky.get(API.getMeetingTypes).json()
}

export async function createTouchpoint(touchpoint:Touchpoint):Promise<Touchpoint>
{
  return await ky.post(API.createTouchpoint, {json:touchpoint}).json()
}

export async function getCapScore(coacheeID:string):Promise<capItem[]>
{
  return await ky.get(`${API.getCapByID}?${coacheeID}`).json()
}

export async function getTriadDetails(capItemID:string):Promise<TriadNotes[]>
{
  return await ky.get(`${API.getTriadNotes}?${capItemID}`).json()
}

export async function getAllCap():Promise<capCategory[]>
{
  return await ky.get(`${API.getAllCaps}`).json();
}

export async function postTriadNotes(notes:TriadNotes):Promise<TriadNotes>
{
  return ky.post(API.postTriad, {json:notes}).json()
}

export async function postGraduateCap(notes: coacheeCapItem):Promise<coacheeCapItem>
{
  return ky.post(API.postGradCap, {json:notes}).json()
}
  //Coachee Selector & Coachee Profile
export async function getCoacheeList(id:string):Promise<coacheeList[]>
{
    return await ky.get(API.coacheeList+"?"+id).json()
}

export async function getCoacheeInfo(id:string):Promise<coacheeInfo[]>
{
    return await ky.get(API.coacheeInfo+"?"+id).json()
}
  
//Survey Calls
export async function getSurveysbyCoachee(id:number):Promise<SurveyResult[]>
{
  return await ky.get(API.getSurveysByCoachee+"?"+id).json()
}

export async function createSurveyRecord(surveyresult:SurveyResult):Promise<SurveyResult>
{
  return await ky.post(API.createTouchpoint, {json:surveyresult}).json()
}

export async function getAllSurveyTypes():Promise<Survey[]>
{
  return await ky.get(API.getAllSurveyTypes).json()
}
  
export async function getAllCompanies():Promise<companyfields[]>{
  return await ky.get(API.companyList).json()
}


export async function getDepartmentById(id:number):Promise<departmentFields[]>{
  return await ky.get(API.departmentList+"?"+id).json()
}

export async function getManagersById(id:number):Promise<managerFields[]>
{
  return await ky.get(API.managerList+"?"+id).json()
}

export async function getSupervisorList():Promise<supervisorField[]>{
  return await ky.get(API.supervisorList).json()
}

export async function getVpList():Promise<vpField[]>{
  return await ky.get(API.vpList).json()
}