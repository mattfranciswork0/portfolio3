import { render } from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import DetailBanner from "./DetailBanner";
import DetailBack from "./DetailBack";
import me1 from "../img/me1.jpg";
import me2 from "../img/me2.jpg";
import { SLIDE_ABOUT_ME_DESC } from "./Carousel";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import Loading from "./Loading";
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

            <div className="detail-about-me">
                <div
                    onLoad={() => {
                        setLoadedImages(loadedImages + 1);
                    }}
                >
                    <DetailBanner
                        title="About Me"
                        imgSrc={me1}
                        desc={SLIDE_ABOUT_ME_DESC}
                    />
                </div>
                <div className="detail-about-me__content">
                    <div className="detail-about-me__content-my-story">
                        <div className="detail-about-me__content-my-story-content">
                            <div className="detail-about-me__content-my-story-content--block"></div>
                            <h1>my Story</h1>
                        </div>
                    </div>
                    <div className="detail-about-me__image-and-desc">
                        <h1>Matthew Francis</h1>
                        <p>
                            Born and raised Jakarta, Indonesia in 2000. Moved to
                            Ontario, Canada at 2011. Aspiring to be a web
                            developer.
                        </p>
                        <img src={me2} alt="" />
                    </div>
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
