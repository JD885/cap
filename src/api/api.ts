import {API} from "../constants/api-endpoints"
import ky from 'ky'
import { Coachee } from '../models/coachee';
import { MeetingType } from '../models/meetingType';
import { Touchpoint } from '../models/touchpoint' 
import { SurveyResult } from "../models/surveyresult";
import {Survey} from "../models/survey"

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