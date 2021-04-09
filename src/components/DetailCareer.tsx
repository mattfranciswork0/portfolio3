import { render } from "react-dom";
import React, { useState } from "react";
import DetailBanner from "./DetailBanner";

const careerProgress = [
    {
        title: "2018 - Enrolled In University",

        desc: [
            `Enrolled for BSc Computer Science at Wilfrid Laurier's University, Canada.`,
        ],
    },
    {
        title: `2020 - Web Dev Lead For School's Comp Sci Club`,

        desc: [
            `Leading a group of individuals new to web development in creating a 'mock-site' for the club.`,
            `Held meetings to explain web development concepts and keep team on-track.`,
            `By constantly putting myself in the other person's "shoes";  I'm able to create good interpersonal relationships and
             communicate clearly.`,
        ],
    },
];

const DetailCareer: React.FC<{}> = () => {
    return (
        <div className="detailCareerContainer">
            <DetailBanner />
            <div className="careerContentWrap">
                <h1 className="careerGridTitle">Company</h1>
                <div className="detailCareerGrid">
                    <div className="careerColWrap">
                        <h1 className="careerGridTitle">Date</h1>
                        <p className="careerDate">Sep 2020</p>
                    </div>
                    <div className="careerColWrap">
                        <h1 className="careerGridTitle">Position</h1>
                        <p> Hello World</p>
                    </div>
                    <div className="careerColWrap accomplishmentColWrap">
                        <h1 className="careerGridTitle ">Accomplishments</h1>
                        <ul>
                            <li>
                                Leading a group of individuals new to web
                                development in creating a 'mock-site' for the
                                club.
                            </li>
                            <li>
                                Leading a group of individuals new to web
                                development in creating a 'mock-site' for the
                                club.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCareer;
