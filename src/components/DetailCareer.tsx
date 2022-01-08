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
        company: `My Startup`,
        date: `Aug 2021 – Present`,
        position: `Founder and Full-Stack Software Developer`,
        accomplishments: [
            `Collaborated with partner for ideas, design and engineering to create a platform for people to collaborate. Built with GitHub Actions, Next.js, React-Spring, Typescript, HTML, SCSS, BEM. CSS, JS, Express.js, PostgreSQL., Figma, Lighthouse, axe.`,
            `Collaborated with mentors in accelerator to challenge decisions, address market research and pivot on ideas.`,
            `Collaborated with Ontario’s Co-operative Association to comprehend and apply co-operative principles. `,
        ],
    },

    {
        company: `Habanero`,
        date: `Sep 2021 – Jan 2022`,
        position: `Frontend Software Developer`,
        accomplishments: [
            `Collaborated with design, operations and engineering team to develop a web application for over a dozen of clients with Azure DevOps, React, React-Spring, Typescript, HTML, SCSS, BEM, CSS, JS, Figma, Lighthouse, axe.`,
            `Created customized Halloween animations for over a dozen of subscription clients.`,
            `Involved in agile methodology that included biweekly scrum, backlog refinement, check-ins, QA, and retrospective.`,
            `Used Git and Azure DevOps to conduct code reviews, raised pull requests, pushed code, and operate a CI/CD pipeline, `,
        ],
    },

    {
        company: `Badal`,
        date: `May 2021 – Sep 2021`,
        position: `Full-Stack Software Developer`,
        accomplishments: [
            `Collaborated with design, operations and engineering team to develop a Shopify application that automates sales for Shopify stores with over hundreds of products and users with GitLab, React, Redux, Typescript, PostgreSQL, GraphQL, Express.js, Docker, HTML, SCSS, BEM, CSS, JS., Lighthouse, axe. `,
            `Involved in agile methodology that included biweekly sprints, backlog refinement and daily standups.`,
            `Used Git and Gitlab to conduct code reviews, raised pull requests, pushed code, and operate a CI/CD pipeline.`,
        ],
    },
    {
        company: `Wilfrid Laurier University's Comp Sci Club`,
        date: `Sep 2020 - May 2021 `,
        position: `Lead Software Developer`,
        accomplishments: [
            `Led 15 team members in designing and engineering a web application for the club with React, HTML, SCSS, CSS, JS, Figma. `,
            `Held weekly meetings to explain technology stack and version control with Git; used agile methodology that included biweekly sprints and backlog refinement; used Git and GitHub Actions to conduct code reviews, raised pull requests, pushed code, and operate a CI/CD pipeline.`,
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
            <div className="detail-career">
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
                <div className="detail-career__content">
                    {careerProgress.map((career, index) => {
                        return (
                            <React.Fragment>
                                <h1 className="detail-career__content-grid-col-title">
                                    {career.company}
                                </h1>
                                <div className="detail-career__content-grid">
                                    <div className="detail-career__content-grid-col">
                                        <h1 className="detail-career__content-grid-col-title">
                                            Date
                                        </h1>
                                        <p className="detail-career__content-grid-col-date">
                                            {career.date}
                                        </p>
                                    </div>
                                    <div className="detail-career__content-grid-col">
                                        <h1 className="detail-career__content-grid-col-title">
                                            Position
                                        </h1>
                                        <p>{career.position}</p>
                                    </div>
                                    <div className="detail-career__content-grid-col detail-career__content-grid-col--acomplishment">
                                        <h1 className="detail-career__content-grid-col-title ">
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
