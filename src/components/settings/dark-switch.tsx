import {Switch } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";
import {dark} from '../../App'

export const DarkSwitch=observer(()=>
{

    return (
        <div>
                <Switch
                className="darkSwitch"
                checked={dark.isDark}
                onChange={() => dark.toggle()}
                />
        </div>
    );
})