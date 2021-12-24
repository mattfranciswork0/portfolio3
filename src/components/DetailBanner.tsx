import { render } from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import history from "../browserHistory";
import { updateHeaderBackIconToBlack } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import useOnScreen from "../useOnScreen";
interface DetailBannerProps {
    title: string;
    imgSrc: any;
    desc: string;
    updateHeaderBackIconToBlack(setColorToBlack: boolean): void;
}
const DetailBanner: React.FC<DetailBannerProps> = (props) => {
    useEffect(() => {
        return () => {
            //Umounting - change header back button to white, the default color
            props.updateHeaderBackIconToBlack(false);
        };
    }, []);

    const ref = useRef<any>();
    const isVisible = useOnScreen(ref);
    useEffect(() => {
        if (isVisible) props.updateHeaderBackIconToBlack(false);
        else props.updateHeaderBackIconToBlack(true);
    }, [props, isVisible]);
    return (
        <div className="detail-banner" ref={ref}>
            <img src={props.imgSrc} alt="" />

            <div className="detail-banner__title">
                <h1 className="detail-banner__title-content">{props.title}</h1>
                <div className="red-blocks ">
                    <div className="red-blocks--first-block"></div>
                    <div className="red-blocks--second-block"></div>
                </div>

                <p className="detail-banner__desc">{props.desc}</p>
            </div>
            <div className="scrolldown-detail">
                <h1>Scroll Down</h1>
                <div className="scrolldown-detail--block"></div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        // changeHeaderBackIconToBlack: state.changeHeaderBackIconToBlack,
    };
};
export default connect(mapStateToProps, {
    updateHeaderBackIconToBlack,
})(DetailBanner);
