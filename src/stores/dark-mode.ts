import {makeAutoObservable} from 'mobx'

export class Dark{
    isDark=false;

    constructor(){
        makeAutoObservable(this)
    }

    toggle()
    {
        this.isDark = !this.isDark
    }
}