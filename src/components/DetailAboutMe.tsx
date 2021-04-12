import { render } from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import DetailBanner from "./DetailBanner";
import DetailBack from "./DetailBack";
import me1 from "../img/me1.jpg";
import me2 from "../img/me2.jpg";
import { SLIDE_ABOUT_ME_DESC } from "./SlideLanding";
import useOnScreen from "../useOnScreen";
import { updateHeaderBackIconToBlack } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
interface DetailAboutMeProps {
    // changeHeaderBackIconToBlack: any;
    updateHeaderBackIconToBlack(setColorToBlack: boolean): void;
}
const DetailAboutMe: React.FC<DetailAboutMeProps> = (props) => {
    useEffect(() => {
        document.body.style.overflowY = "visible";
        return () => {
            //Umounting - change header back button to white, the default color
            props.updateHeaderBackIconToBlack(false);
        };
    }, []);
    const ref = useRef<any>();
    const isVisible = useOnScreen(ref);
    useEffect(() => {
        if (isVisible) props.updateHeaderBackIconToBlack(true);
        else props.updateHeaderBackIconToBlack(false);
    }, [props, isVisible]);
    return (
        <div className="detailAboutMeContainer">
            <DetailBanner
                title="About Me"
                imgSrc={me1}
                desc={SLIDE_ABOUT_ME_DESC}
            />
            <div className="aboutMeWrap">
                <div className="myStoryWrap">
                    <div>{isVisible && `Yep, I'm on screen`}</div>
                    <div className="myStoryInnerWrap">
                        <div className="myStoryBlock"></div>
                        <h1>my Story</h1>
                    </div>
                </div>
                <div className="aboutMeImageAndDescWrap">
                    <h1>Matthew Francis</h1>
                    <p>
                        1992年、沖縄県生まれ。大学を卒業後、県内の制作会社でDTPオペレーターとして就職後、大手紳士服量販店を中心に十数社のコーポレートサイトの運用業務を担当しました。
                        2017年より、個人でもWebデザイナーとしての活動を開始し、写真撮影・デザイン・コーディングまでワンストップで対応しています。
                    </p>
                    <img ref={ref} src={me2} alt="" />
                </div>
            </div>
            <DetailBack />
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
})(DetailAboutMe);
