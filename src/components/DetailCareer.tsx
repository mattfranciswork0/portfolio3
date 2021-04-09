import { render } from "react-dom";
import React, { useState } from "react";
import DetailBanner from "./DetailBanner";

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

const DetailCareer: React.FC<{}> = () => {
    return (
        <div className="detailCareerContainer">
            <DetailBanner
                title="Career Experiences"
                imgSrc="https://images.unsplash.com/photo-1542315192-1f61a1792f33?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            />
            <div className="careerContentWrap">
                {careerProgress.map((career, index) => {
                    return (
                        <React.Fragment>
                            <h1 className="careerGridTitle">
                                {career.company}
                            </h1>
                            <div className="detailCareerGrid">
                                <div className="careerColWrap">
                                    <h1 className="careerGridTitle">Date</h1>
                                    <p className="careerDate">{career.date}</p>
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
                                                    <li>{accomplishment}</li>
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
        </div>
    );
};

export default DetailCareer;
