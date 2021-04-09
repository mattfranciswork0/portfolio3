import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import DetailCareer from "./DetailCareer";

const Routes: React.FC<{}> = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/career" exact component={DetailCareer} />
        </Switch>
    );
};

export default Routes;
