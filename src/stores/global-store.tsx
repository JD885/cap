import React from 'react';
import { useLocalStore, useObserver} from 'mobx-react-lite'

//This global store can be used by all components. 

//This also means if you have an observable watching this global store, and make any change to the global
//store, it will cause the component with the observable to re-render. So be careful as ALL component have
//access to this global store, meaning any component can change the global store causing unneccesary re-renders

interface globalStorage 
{
    _username?:string;
    _email?:string;
    _userID?:number
    changeUser?:any;

}

export interface globalUser
{
    username:string;
    email:string;
    userID:number
}


export const GlobalContext = React.createContext<globalStorage>({})

export function GlobalProvider({children})
{
    const globalStore= useLocalStore(() =>(
        {
            _username:"",
            _email:"",
            _userID:NaN,
            changeUser: ({username, email, userID}:globalUser) =>
            {
                globalStore._username=username;
                globalStore._email = email;
                globalStore._userID= userID
            },
        }
    ))

    return(
        <GlobalContext.Provider value={globalStore}>{children}</GlobalContext.Provider>
    )
}
