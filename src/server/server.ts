import { createServer } from 'miragejs';
import { API } from '../constants/api-endpoints';

export function makeServer()
{
    return createServer({
        //You can play with this number to increase and decrease delay
        //in responss time (for error and loading state testing)
        timing: 1000 ,
        routes()
        {
            this.get(API.coacheeList, () =>
            {
                return(
                [
                    {id: "201", name: "Frank Evans"},
                    {id: "202", name: "Trott Smith"},
                    {id: "203", name: "Reily Davis"}
                ]);
            })

            this.get(API.getCoacheesByCoach, () => 
            {
                return (
                    [
                        { coacheeID: '1', firstName: "Mock", lastName: "Person1", userID:'555' },
                        { coacheeID: '2', firstName: "Mock", lastName: "Person2", userID:'666' },
                        { coacheeID: '3', firstName: "Mock", lastName: "Person3", userID:'777' }
                    ]
                );
            });

            this.get(API.getMeetingTypes, () => {
                return (
                    [
                        { meetingTypeID: '1', description: "One on One" },
                        { meetingTypeID: '2', description: "Field" },
                        { meetingTypeID: '3', description: "Meeting / Training" },
                        { meetingTypeID: '4', description: "Triad" }
                    ]
                    );
                });

            this.post(API.createTouchpoint, (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                attrs.meetingID = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                return attrs;
            });

            ///Add your mirage js calls here



        }
    })
}