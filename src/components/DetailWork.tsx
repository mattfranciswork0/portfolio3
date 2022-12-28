import React, { useState, useEffect } from "react";
import BlurredUpImage from "./BlurredUpImage";
import DetailBack from "./DetailBack";
import useWindowDimensions from "../windowDimensions";
import { FiExternalLink } from "react-icons/fi";
import DetailBanner from "./DetailBanner";
import collageHabanero from "../img/collage_habanero.jpg";
import collageLightspeed from "../img/collage_lightspeed.jpg";
import lowResSteamLg from "../img/lowRes/low_res_steam_lg.jpg";
import { SLIDE_WORK_DESC } from "./Carousel";
import Loading from "./Loading";
import collage_work_mix from "../img/collage_work_mix.jpg";

const discoData = [
    {
        title: `Lightspeed - One stop shop for retail, hospitality and golf merchants around the world`,
        description: `Contributed to the development of a point of sale system in X-Series team that impacts over 130,000+ enterprises including Sony, Nordstrom, and Hudson Bay.`,
        lowResLg: lowResSteamLg,
        imgLg: collageLightspeed,
        demo: "https://www.lightspeedhq.com/pc/watch-demo/?_bt=632731126750&_bk=lightspeeed&_bm=e&_bn=g&_bg=64178037736&gclid=CjwKCAiA76-dBhByEiwAA0_s9U3cKnyeiZF4oG5s9rUb9SblfVy2XFGRuxPGqgi2bctIyslJ4djSyhoCa1YQAvD_BwE",
    },
    {
        title: `Habanero Consulting Group - Humanizing the world of work through consulting and crafting digital workplace solutions`,
        description: `Enhanced client relationships by developing a holiday-themed web application with GO team for 50+ enterprise clients including Petro Canada, Herschel Supply Co, GTAA.`,
        stack: `React, React Testing Library, Jest, React-Spring, Typescript, SCSS, BEM, Lighthouse, axe, Azure DevOps`,
        lowResLg: lowResSteamLg,
        imgLg: collageHabanero,
        demo: "https://www.habaneroconsulting.com/",
    },
];

const DetailWork: React.FC<{}> = () => {
    const [loadedImages, setLoadedImages] = useState(0);
    useEffect(() => {
        document.body.style.overflowY = "visible";
    }, []);
    const { width } = useWindowDimensions();
    const renderDisco = (): JSX.Element | JSX.Element[] => {
        return discoData.map((disco, index) => {
            return (
                <div
                    key={index}
                    className={`detail-projects__projects-project`}
                >
                    <div className="detail-projects__projects-project-image-and-overview">
                        <a
                            href={disco.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div
                                className={`detail-projects__projects-project-image-and-overview-project-image`}
                            >
                                <BlurredUpImage
                                    lowRes={disco.lowResLg}
                                    highRes={disco.imgLg}
                                />
                            </div>
                        </a>
                        <div className="detail-projects__projects-project-image-and-overview-overview">
                            <h2 className="projectTitle">{disco.title}</h2>
                            <h2 className="projectStack">{disco.stack}</h2>
                            <p className={"showProjectDesc"}>
                                {disco.description}
                            </p>
                            <a
                                href={disco.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FiExternalLink className="show-gitrhub-and-external--icon" />
                            </a>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <Loading imagesToLoad={1} loadedImages={loadedImages} />
            <div className="detail-projects">
                <div
                    onLoad={() => {
                        setLoadedImages(loadedImages + 1);
                    }}
                >
                    <DetailBanner
                        title="Past Work"
                        imgSrc={collage_work_mix}
                        desc={SLIDE_WORK_DESC}
                    />
                </div>
                <div className="detail-projects__projects">{renderDisco()}</div>
                <DetailBack />
            </div>
        </React.Fragment>
    );
};

export default DetailWork;
