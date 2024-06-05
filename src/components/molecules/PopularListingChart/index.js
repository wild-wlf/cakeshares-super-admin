import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { GraphHeader, StyledGraph } from './Graph.styles';
import { GoDotFill } from 'react-icons/go';

function PopularListingChart({
  graphData,
  graphData2,
  graphData3,
  tooltipBg,
  title,
  amount,
  graphLineColor,
  sm,
  timeFrame,
}) {
  const options = {
    chart: {
      type: 'spline',
    },
    plotOptions: {
      series: {
        animation: {
          duration: 1000,
        },
        marker: {
          enabled: false,
        },
        lineWidth: 2,
      },
    },
    series: [
      {
        name: '',
        data: graphData,
        yAxis: 0,
        color: '#408F8C',
      },
      {
        name: '',
        data: graphData2,
        yAxis: 0,
        color: '#4E6199',
      },
      {
        name: '',
        data: graphData3,
        yAxis: 0,
        color: 'rgba(65, 148, 0, 1)',
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            // Your responsive chart options here
          },
        },
      ],
    },
  };

  return (
    <StyledGraph sm={sm}>
      <GraphHeader bg={tooltipBg} sm={sm}>
        <div className="Head">
          <strong>{title}</strong>
          <div className="legendWrapper">
            <div>
              <GoDotFill color="#408F8C" />
              <span>House Bonds</span>
            </div>
            <div>
              <GoDotFill color="#4E6199" />
              <span>Banking Products</span>
            </div>
            <div>
              <GoDotFill color="#419400" />
              <span>Ventures</span>
            </div>
          </div>
        </div>
      </GraphHeader>
      {graphData ? (
        <>
          <HighchartsReact highcharts={Highcharts} options={options} />

          {timeFrame === 'steps' ? (
            <div className="label">
              <span>Step 1</span>
              <span>Step 30</span>
            </div>
          ) : timeFrame === 'day' ? (
            <div className="label">
              <span>12:01 - 03:01</span>
              <span>03:01 - 06:01</span>
              <span>06:01 - 09:01</span>
              <span>09:01 - 12:01</span>
            </div>
          ) : timeFrame === 'week' ? (
            <div className="label">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          ) : timeFrame === 'month' ? (
            <div className="label">
              <span>Week 01</span>
              <span>Week 02</span>
              <span>Week 03</span>
              <span>Week 04</span>
            </div>
          ) : (
            timeFrame === 'year' && (
              <div className="label">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nev</span>
                <span>Dec</span>
              </div>
            )
          )}
        </>
      ) : (
        <div className="no-data">
          <span>No Data</span>
        </div>
      )}
    </StyledGraph>
  );
}

export default PopularListingChart;
