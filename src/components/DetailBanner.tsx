import { render } from "react-dom";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import history from "../browserHistory";

const DetailBanner: React.FC<{}> = () => {
    return (
        <div className="detailBanner">
            <img
                src={
                    "https://images.unsplash.com/photo-1542315192-1f61a1792f33?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                }
                alt=""
            />

            <BiArrowBack
                onClick={() => history.goBack()}
                className="backButton"
            />

            <h1 className="detailTitle">Career Experiences</h1>
            <div className="scrollDownWrap">
                <h1>Scroll Down</h1>
                <div className="scrollDownBlock"></div>
            </div>
        </div>
    );
};

export default DetailBanner;
