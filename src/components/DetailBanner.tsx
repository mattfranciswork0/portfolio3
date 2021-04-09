import { render } from "react-dom";
import React, { useState } from "react";

const DetailBanner: React.FC<{}> = () => {
    return (
        <div className="detailBanner">
            <img
                src={
                    "https://images.unsplash.com/photo-1542315192-1f61a1792f33?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                }
                alt=""
            />
            <h1 className="detailTitle">About Me</h1>
        </div>
    );
};

export default DetailBanner;
