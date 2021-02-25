import { createServer } from 'miragejs';
import { API } from '../constants/api-endpoints';
import {formatDistance, subDays} from 'date-fns'

export function makeServer()
{
    let isActive=true;
    return createServer({
        //You can play with this number to increase and decrease delay
        //in responss time (for error and loading state testing)
        timing: 1000,
        routes()
        {

            

            this.get(API.coacheeList, () =>
            {
            return(
                [
                {id: "201", name: "Maria Garcia", surveyDueDate: "2021-02-21", absDueDate: "2021-02-29"},
                {id: "202", name: "Trott Smith", surveyDueDate: "2021-03-20", absDueDate: "2021-03-03"},
                {id: "203", name: "Reily Davis", surveyDueDate: "2021-02-26", absDueDate: "2021-02-24"},
                {id: "204", name: "Frank Evans", surveyDueDate: "2021-03-20", absDueDate: "2021-03-20"}
                ])
            })

            this.get(API.coacheeInfo, () =>
            {
            return(
                [
                {id: 201,
                name: "Maria Garcia",
                email: "marcia@gmail.com",
                cellNumber: "804-827-2708",
                teamNumber: 1,
                officeNumber: "908-442-0706",
                building: "Building A",
                workLocation: "1068  Eden Street",
                surveyDueDate: "2021-02-21",
                absDueDate: "2021-02-29"}
                ])
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

            this.get(API.getCapByID, () =>
            {
                return(
                    [
                        {
                            coacheeID:"ak19ga",
                            capItemID:"1v8aj9",
                            active:true,
                            currentScore:3.5,
                            capCategoryNumber:4,
                            capItemCode:"a",
                            capCategoryDescription:"Response well to feedback",
                            capItemDescription:"Can listen to feedback and determine how to implement without feeling offended",
                            touchpointID:"1n89en"
                        },
                        {
                            coacheeID:"79agga",
                            capItemID:"090dfvj9",
                            active:isActive,
                            currentScore:2,
                            capCategoryNumber:7,
                            capItemCode:"c",
                            capCategoryDescription:"Technically Competent",
                            capItemDescription:"Can implement and teach technical concepts with ease",
                            touchpointID:"29n99en"
                        },
                        {
                            coacheeID:"0n0agb",
                            capItemID:'89n8a32r',
                            active:true,
                            currentScore:3,
                            capCategoryNumber:9,
                            capItemCode:"c",
                            capCategoryDescription:"Can Facilitate group discussion",
                            capItemDescription:"Can lead a group discussion with ease",
                            touchpointID:"19999en"
                        },
                        {
                            coacheeID:"569naobb",
                            capItemID:'8957ba2r',
                            active:false,
                            currentScore:4.5,
                            capCategoryNumber:16,
                            capItemCode:"b",
                            capCategoryDescription:"Takes Effecive Meeting notes",
                            capItemDescription:"Creates meeting notes that are easy to read",
                            touchpointID:"ahui89en"
                        }
                        
                    ]
                )
            })

            this.get(API.getTriadNotes, () =>
            {
                return(
                    [
                        {
                            touchpointID:"nv13",
                            date: formatDistance(subDays(new Date(), 25), new Date()),
                            coacheeID:"201",
                            capItemScore:2,
                            goal: "set goals, and writes someting longer so we can see how this looks in the wireframe",
                            observations: "The Observations, and writes someting longer so we can see how this looks in the wireframe",
                            opportunities: "The Opportunites, and writes someting longer so we can see how this looks in the wireframe",
                            commitments:"theCommitment, and writes someting longer so we can see how this looks in the wireframe"
                        },
                        {
                            touchpointID:"a18nv",
                            date: formatDistance(subDays(new Date(), 20), new Date()),
                            coacheeID:"201",
                            capItemScore:2.5,
                            goal: "set goals, and writes someting longer so we can see how this looks in the wireframe",
                            observations: "The Observations, and writes someting longer so we can see how this looks in the wireframe",
                            opportunities: "The Opportunites, and writes someting longer so we can see how this looks in the wireframe",
                            commitments:"theCommitment, and writes someting longer so we can see how this looks in the wireframe"
                        },
                        {
                            touchpointID:"a38nv",
                            date: formatDistance(subDays(new Date(), 10), new Date()),
                            coacheeID:"201",
                            capItemScore:3,
                            goal: "set goals, and writes someting longer so we can see how this looks in the wireframe",
                            observations: "The Observations, and writes someting longer so we can see how this looks in the wireframe",
                            opportunities: "The Opportunites, and writes someting longer so we can see how this looks in the wireframe",
                            commitments:"theCommitment, and writes someting longer so we can see how this looks in the wireframe"
                        },
                    ]
                )
            })

            this.get(API.getAllCaps, () =>
            {
                return(
                    [
                        {
                            capCategoryID:"asd14a",
                            capCategoryNumber:1,
                            capCategoryDescription:"Lorem ipsum dolor sit amet",
                            companyID:'1n89na',
                            capItems:
                            [
                                {
                                    capItemID:'as891a0',
                                    capItemCode:'a',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                },
                                {
                                    capItemID:'8bbu12',
                                    capItemCode:'b',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                },
                                {
                                    capItemID:'1431a0',
                                    capItemCode:'c',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                }
                            ]
                        },
                        {
                            capCategoryID:"10a89n8a",
                            capCategoryNumber:2,
                            capCategoryDescription:"Lorem ipsum dolor sit amet",
                            companyID:'1n89na',
                            capItems:
                            [
                                {
                                    capItemID:'as891a0',
                                    capItemCode:'a',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                },
                                {
                                    capItemID:'10000312',
                                    capItemCode:'b',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                },
                            ]
                        },
                        {
                            capCategoryID:"189qqeqa",
                            capCategoryNumber:3,
                            capCategoryDescription:"Lorem ipsum dolor sit amet",
                            companyID:'1n89na',
                            capItems:
                            [
                                {
                                    capItemID:'hyw1a0',
                                    capItemCode:'a',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                },
                                {
                                    capItemID:'ya8bbu12',
                                    capItemCode:'b',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                },
                                {
                                    capItemID:'qwe31a0',
                                    capItemCode:'c',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                },
                                {
                                    capItemID:'0h23m',
                                    capItemCode:'d',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                }
                            ]
                        },
                        {
                            capCategoryID:"130a4a",
                            capCategoryNumber:4,
                            capCategoryDescription:"Lorem ipsum dolor sit amet",
                            companyID:'1n89na',
                            capItems:
                            [
                                {
                                    capItemID:'8nbaa0',
                                    capItemCode:'a',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                },
                                {
                                    capItemID:'03fbu12',
                                    capItemCode:'b',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                },
                                {
                                    capItemID:'a1qa8a0',
                                    capItemCode:'c',
                                    capItemDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                }
                            ]
                        }
                    ]
                )
            })

            this.post(API.postTriad, (schema, req) =>
            {
                let attrs = JSON.parse(req.requestBody);
                return attrs;
            })

            this.post(API.postGradCap, (schema, req)=>
            {
                isActive=false
                const res = JSON.parse(req.requestBody)
                return res
            })


            this.get(API.getSurveysByCoachee, () =>{
                return [
                      {
                        surveyNumber: 1,
                        averageScore: 2,
                        surveyName: "Survey 1",
                        assnDate: "2021-01-21",
                        surveyComplDate: "",
                        dueDate: "2021-03-24",
                      },
                      {
                        surveyNumber: 2,
                        averageScore: 3,
                        surveyName: "Survey 2",
                        assnDate: "2021-01-21",
                        surveyComplDate: "",
                        dueDate: "2021-03-24",
                      },
                      {
                        surveyNumber: 3,
                        averageScore: 4,
                        surveyName: "Survey 3",
                        assnDate: "2021-01-21",
                        surveyComplDate: "",
                        dueDate: "2021-03-24",
                      }
                ]
                
            });

            this.get(API.getAllSurveyTypes, () => 
            {
                return (
                    [
                        { surveyNumber: '1', surveyName: "Survey Type 1"},
                        { surveyNumber: '2', surveyName: "Survey Type 2" },
                        { surveyNumber: '3', surveyName: "Survey Type 3"}
                    ]
                );
            });

            this.post(API.createSurveyRecord, (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                attrs.surveyId = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                return attrs;
            });
            ///Add your mirage js calls here
            this.get(API.companyList,()=>{
                return(
                  [
                    
                    {id:1, name:'Baker Hughes', value:1},
                    {id:2,name:'Trinidad',value:2},
                    {id:3,name:'QSI',value:3},
                    {id:4,name:'DynoMax Drilling',value:4}
                  ])
              });
              this.get(API.departmentList,()=>{
                return(
                  [
                    
                    {id:1,name:'Motors', value:1},
                    {id:2,name:'truTrak', value:2},
        
                  ]
                )
              });
        
              this.get(API.managerList,()=>{
                return(
                  [
                    {id:1,name:'Farren',value:1,position:'manager'},
                    {id:2,name:'Mario',value:2,position:'manager'},          
                  ]
                )
              });
              this.get(API.supervisorList,()=>{
                return(
                  [
                    {id:1,name:'Rusty R',value:1},
                    {id:2,name:'Dwayne K',value:2},
                    {id:3,name:'Colt peirce',value:3},
                ]
                )
              });
              this.get(API.vpList,()=>{
                return(
                  [
                    {id:1,name:'Joe Biden',value:1}
                  ]
                )
              });


        }
    })
}