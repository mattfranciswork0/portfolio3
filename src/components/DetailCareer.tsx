import { render } from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import DetailBanner from "./DetailBanner";
import DetailBack from "./DetailBack";
import { SLIDE_CAREER_DESC } from "./Carousel";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import career from "../img/career.jpg";
import Loading from "./Loading";
const careerProgress = [
    {
        company: `Wilfrid Laurier University's Comp Sci Club`,
        date: `Sep 2020 - Present`,
        position: `Web Dev Lead`,
        accomplishments: [
            `Leading a group of individuals new to web development in creating a 'mock-site' for the club.`,
            `Held meetings to explain web development concepts and keep team on-track.`,
            `By constantly putting myself in the other person's "shoes";  I'm able to create good interpersonal relationships and
             communicate clearly.`,
        ],
    },
];

interface DetailCareerProps {
    updateHeaderBackIconToBlack(setColorToBlack: boolean): void;
}

const DetailCareer: React.FC<DetailCareerProps> = (props) => {
    const [loadedImages, setLoadedImages] = useState(0);
    useEffect(() => {
        document.body.style.overflowY = "visible";
    }, []);

    return (
        <React.Fragment>
            <Loading imagesToLoad={1} loadedImages={loadedImages} />
            <div className="detailCareerContainer">
                <div
                    onLoad={() => {
                        setLoadedImages(loadedImages + 1);
                    }}
                >
                    <DetailBanner
                        title="Career Experiences"
                        imgSrc={career}
                        desc={SLIDE_CAREER_DESC}
                    />
                </div>
                <div className="careerContentWrap">
                    {careerProgress.map((career, index) => {
                        return (
                            <React.Fragment>
                                <h1 className="careerGridTitle">
                                    {career.company}
                                </h1>
                                <div className="detailCareerGrid">
                                    <div className="careerColWrap">
                                        <h1 className="careerGridTitle">
                                            Date
                                        </h1>
                                        <p className="careerDate">
                                            {career.date}
                                        </p>
                                    </div>
                                    <div className="careerColWrap">
                                        <h1 className="careerGridTitle">
                                            Position
                                        </h1>
                                        <p>{career.position}</p>
                                    </div>
                                    <div className="careerColWrap accomplishmentColWrap">
                                        <h1 className="careerGridTitle ">
                                            Accomplishments
                                        </h1>
                                        <ul>
                                            {career.accomplishments.map(
                                                (accomplishment, index) => {
                                                    return (
                                                        <li>
                                                            {accomplishment}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>

                <DetailBack />
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        changeHeaderBackIconToBlack: state.changeHeaderBackIconToBlack,
    };
};

export default connect(mapStateToProps, {})(DetailCareer);
