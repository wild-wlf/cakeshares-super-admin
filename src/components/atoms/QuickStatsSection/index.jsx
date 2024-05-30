import React from 'react';
import { QuickStatsSectionWrapper } from './QuickStatsSection.style';
import { BsThreeDots } from 'react-icons/bs';
import { MdSupervisorAccount } from 'react-icons/md';
import InvestmentIcon from '../../../../public/assets/investment-icon.svg';
import Image from 'next/image';
import StackCharts from '@/components/molecules/StackedChart';
import { formatNumber } from '@/helpers/common';

const QuickStatsSection = ({ cardsData }) => {
  return (
    <QuickStatsSectionWrapper>
      <div className="column-wrapper">
        <div className="container">
          <div className="value-wrapper">
            <span className="heading">
              <MdSupervisorAccount className="icon" />
              Total User
            </span>
            {/* <BsThreeDots size={20} /> */}
          </div>
          <div className="value-wrapper">
            <strong>{formatNumber(cardsData?.userCount) || 0}</strong>
            <div>
              <span className="green-text">+28%</span>
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
            <strong>{formatNumber(cardsData?.investmentCount) || 0}</strong>
            <div>
              <span className="green-text">+15%</span>
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
