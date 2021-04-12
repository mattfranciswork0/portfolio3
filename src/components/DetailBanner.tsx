import { render } from "react-dom";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import history from "../browserHistory";
interface DetailBannerProps {
    title: string;
    imgSrc: any;
    desc: string;
}
const DetailBanner: React.FC<DetailBannerProps> = (props) => {
    return (
        <div className="detailBanner">
            <img src={props.imgSrc} alt="" />

            <BiArrowBack
                onClick={() => history.goBack()}
                className="backButton"
            />

            <div className="detailTitleWrap">
                <h1 className="detailTitle">{props.title}</h1>
                <div className="redBlocksWrap ">
                    <div className="redBlock firstRedBlock"></div>
                    <div className="redBlock secondRedBlock"></div>
                </div>

                <p className="detailDesc">{props.desc}</p>
            </div>
            <div className="scrollDownWrap">
                <h1>Scroll Down</h1>
                <div className="scrollDownBlock"></div>
            </div>
        </div>
    );
};

export default DetailBanner;
