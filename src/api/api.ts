import {API} from "../constants/api-endpoints"
import ky from 'ky'

export async function getAllCoachees(id:number):Promise<Response>
{
    return await ky.get(API.coacheeList+"?"+id)
}