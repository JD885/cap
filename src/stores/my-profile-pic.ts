import {makeAutoObservable} from 'mobx'

export class MyImage{
    imageAsString = "";
    imageExists=false

    constructor()
    {
        makeAutoObservable(this)
    }

    setImage(url:string)
    {
        this.imageAsString = url;
        this.imageExists=true;
    }
}