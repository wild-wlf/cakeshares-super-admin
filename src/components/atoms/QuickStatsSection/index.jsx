import React from 'react';
import { QuickStatsSectionWrapper } from './QuickStatsSection.style';
import { BsThreeDots } from 'react-icons/bs';
import { MdSupervisorAccount } from 'react-icons/md';
import InvestmentIcon from '../../../../public/assets/investment-icon.svg';
import Image from 'next/image';
import StackCharts from '@/components/molecules/StackedChart';
import { convertToCurrencyFormat, formatNumber } from '@/helpers/common';

const QuickStatsSection = ({ cardsData }) => {
  const userData = [
    72, 128, 106, 43, 159, 78, 112, 107, 120, 134, 59, 63, 148, 93, 159, 124, 127, 102, 66, 181, 96, 112, 127, 142, 97,
    71, 185, 100, 155, 130,
  ];
  const investmentData = [
    72, 128, 106, 43, 159, 78, 112, 107, 120, 134, 59, 63, 148, 93, 159, 124, 127, 102, 66, 181, 96, 112, 127, 142, 97,
    71, 185, 100, 155, 130,
  ];
  return (
    <QuickStatsSectionWrapper>
      <div className="column-wrapper">
        <div className="container">
          <div className="value-wrapper">
            <span className="heading">
              <MdSupervisorAccount className="icon" />
              Total Users
            </span>
            {/* <BsThreeDots size={20} /> */}
          </div>
          <div className="value-wrapper">
            <strong>{cardsData?.userCount || 0}</strong>
            <div>
              <span className="green-text">0%</span>
              <span className="desc">From the last week</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="value-wrapper">
            <span className="heading">
              <Image src={InvestmentIcon} alt="InvestmentIcon" className="icon" />
              Total Investments
            </span>
            {/* <BsThreeDots size={20} /> */}
          </div>
          <div className="value-wrapper">
            <strong>{convertToCurrencyFormat(cardsData?.investmentCount)}</strong>
            <div>
              <span className="green-text">0%</span>
              <span className="desc">From the last week</span>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <StackCharts title={'Quick Stats'} />
      </div>
    </QuickStatsSectionWrapper>
  );
};

export default QuickStatsSection;
