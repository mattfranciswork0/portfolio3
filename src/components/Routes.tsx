import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import DetailCareer from "./DetailCareer";
import DetailProjects from "./DetailProjects";

const Routes: React.FC<{}> = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/career" exact component={DetailCareer} />
            <Route path="/projects" exact component={DetailProjects} />
        </Switch>
    );
};

export default Routes;
