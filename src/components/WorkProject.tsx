import { render } from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import DetailBanner from "./DetailBanner";
import DetailBack from "./DetailBack";

import { SLIDE_ABOUT_ME_DESC } from "./Carousel";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import Loading from "./Loading";
import habanerHome from "../img/habanero-home.jpg";
import habaneroRecipe from "../img/habanero-recipe.jpg";
interface DetailAboutMeProps {
    // changeHeaderBackIconToBlack: any;
    updateHeaderBackIconToBlack(setColorToBlack: boolean): void;
}
const DetailAboutMe: React.FC<DetailAboutMeProps> = (props) => {
    const [loadedImages, setLoadedImages] = useState(0);
    useEffect(() => {
        document.body.style.overflowY = "visible";
    }, []);

    return (
        <React.Fragment>
            <Loading imagesToLoad={1} loadedImages={loadedImages} />

            <div className="detailAboutMeContainer">
                <div
                    onLoad={() => {
                        setLoadedImages(loadedImages + 1);
                    }}
                >
                    <DetailBanner
                        title="Habanero"
                        imgSrc={habanerHome}
                        desc={SLIDE_ABOUT_ME_DESC}
                    />
                </div>
                <div className="aboutMeWrap">
                    <div className="myStoryWrap">
                        <div className="myStoryInnerWrap">
                            <div className="myStoryBlock"></div>
                            <h1>Development</h1>
                        </div>
                    </div>
                    <div className="aboutMeImageAndDescWrap">
                        <h1>Matthew Francis</h1>
                        <p>
                            Born and raised Jakarta, Indonesia in 2000. Moved to
                            Ontario, Canada at 2011. Aspiring to be a web
                            developer.
                        </p>
                    </div>
                </div>
                <div className="workPictures">
                    <img src={habanerHome} alt="" />
                    <img src={habaneroRecipe} alt="" />
                </div>
                <DetailBack />
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        // changeHeaderBackIconToBlack: state.changeHeaderBackIconToBlack,
    };
};

export default connect(mapStateToProps, {})(DetailAboutMe);
