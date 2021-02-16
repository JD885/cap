import React from 'react';
import { useLocalStore} from 'mobx-react-lite'

//This global store can be used by all components. 

//This also means if you have an observable watching this global store, and make any change to the global
//store, it will cause the component with the observable to re-render. So be careful as ALL component have
//access to this global store, meaning any component can change the global store causing unneccesary re-renders

interface globalStorage 
{
    _username?:string;
    _email?:string;
    _userID?:number
    darkMode:boolean
    changeUser?:any
    toggleDark?:any

}

export interface globalUser
{
    username:string;
    email:string;
    userID:number
}


export const GlobalContext = React.createContext<globalStorage>({darkMode:false})

export function GlobalProvider({children})
{
    const globalStore= useLocalStore(() =>(
        {
            _username:"",
            _email:"",
            _userID:NaN,
            darkMode:false,
            changeUser: ({username, email, userID}:globalUser) =>
            {
                globalStore._username=username;
                globalStore._email = email;
                globalStore._userID= userID
            },
            toggleDark: () =>
            {
                globalStore.darkMode=!globalStore.darkMode
            }
        }
    ))
    
    return(
        <GlobalContext.Provider value={globalStore}>{children}</GlobalContext.Provider>
    )
}
