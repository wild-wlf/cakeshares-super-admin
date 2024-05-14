import React from "react";
import { CardWrapper } from "./card.style";
import Image from "next/image";
import Heart from "../../../_assets/heart.svg";
import ProgressBar from "@ramonak/react-progress-bar";

const index = ({ Cardimage }) => {
  return (
    <CardWrapper>
      <div className="card">
        <div className="image-div">
          <Image src={Cardimage} alt="card-image" />
          <div className="tagWrapper">
            <div className="tag">Properties</div>
            <div className="icon-div">
              <Image src={Heart} alt="Heart" className="heart" />
            </div>
          </div>
        </div>
        <div className="decription">
          <div className="title-div">
            <span>Egypt Gov. Property</span>
            <span>30%</span>
          </div>
          <div className="progress">
            <ProgressBar
              completed={30}
              bgColor="#408F8C"
              height="5px"
              borderRadius="60px"
              isLabelVisible={false}
              labelColor="#D9D9D9"
            />
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default index;
