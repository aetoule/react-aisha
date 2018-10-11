import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import OneTask from './Components/OneTask/OneTask';

export default (
    <Switch>
        <Route component={Home} exact path="/" />
        <Route component={OneTask} exact path="/task/:id" />
    </Switch>
)