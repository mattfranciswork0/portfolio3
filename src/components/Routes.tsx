import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import DetailWork from "./DetailWork";
import DetailProjects from "./DetailProjects";
import DetailAboutMe from "./DetailAboutMe";
import WorkProject from "./WorkProject";
import Header from "./Header";
const Routes: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/work" exact component={DetailWork} />
                <Route path="/habanero" exact component={WorkProject} />
                <Route path="/projects" exact component={DetailProjects} />
                <Route path="/me" exact component={DetailAboutMe} />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;
