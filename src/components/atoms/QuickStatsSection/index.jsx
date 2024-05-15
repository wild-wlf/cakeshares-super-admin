import React from "react";
import { QuickStatsSectionWrapper } from "./QuickStatsSection.style";
import { BsThreeDots } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import InvestmentIcon from "../../../_assets/investment-icon.svg";
import Image from "next/image";
import StackCharts from "@/components/molecules/StackedChart";

const QuickStatsSection = () => {
  return (
    <QuickStatsSectionWrapper>
      <div className="column-wrapper">
        <div className="container">
          <div className="value-wrapper">
            <span className="heading">
              <MdSupervisorAccount className="icon" />
              Total User
            </span>
            <BsThreeDots size={20} />
          </div>
          <div className="value-wrapper">
            <h1>1,503K</h1>
            <div>
              <span className="green-text">+28%</span>
              <span className="desc">From the last week</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="value-wrapper">
            <span className="heading">
              <Image
                src={InvestmentIcon}
                alt="InvestmentIcon"
                className="icon"
              />
              Total Investments
            </span>
            <BsThreeDots size={20} />
          </div>
          <div className="value-wrapper">
            <h1>35,000</h1>
            <div>
              <span className="green-text">+15%</span>
              <span className="desc">From the last week</span>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <StackCharts title={"Quick Stats"} />
      </div>
    </QuickStatsSectionWrapper>
  );
};

export default QuickStatsSection;
