import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { GraphHeader, StyledGraph, ChartContainer } from "./StackCharts";
import Button from "@/components/atoms/Button";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import Dropdown from "../Dropdown";

function StackCharts({
  graphData,
  tooltipBg,
  title,
  amount,
  sm,
  graphLineColor,
  timeFrame,
}) {
  const dropdown = [
    { label: "Daily", value: "daily" },
    { label: "Yearly", value: "yearly" },
    { label: "Monthly", value: "monthly" },
  ];
  const [selected, setSelected] = useState("monthly");
  const monthly = [
    {
      name: "Users",
      data: [148, 133, 124, 110, 95, 82, 76, 89, 105, 120, 135, 142],
      stack: "Europe",
      color: "rgba(64, 143, 140, 1)",
    },
    {
      name: "Investments",
      data: [102, 98, 65, 78, 85, 92, 105, 112, 98, 86, 75, 68],
      stack: "Europe",
      color: "rgba(78, 97, 153, 1)",
    },
  ];
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
      align: "left",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      // gridLineWidth: 1,
      // gridLineColor: "lightgray",
    },
    yAxis: {
      visible: false,
    },
    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          this.key +
          "</b><br/>" +
          this.series.name +
          ": " +
          this.y +
          "<br/>" +
          "Total: " +
          this.point.stackTotal
        );
      },
    },
    plotOptions: {
      column: {
        borderRadiusTopLeft: "13",
        borderRadiusTopRight: "13",
        borderRadiusBottomLeft: "13",
        borderRadiusBottomRight: "13",
        stacking: "normal",
        pointPadding: 0,
        groupPadding: 0.2,
        pointWidth: 38,
        borderRadius: 13,
        dataLabels: {
          style: {
            fontFamily: "'Outfit', sans-serif",
            fontSize: "12px",
            fontWeight: "400",
            color: "rgba(49, 49, 49, 1)",
          },
        },
      },
    },
    series: selected === "monthly" ? monthly : monthly,

    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  };
  const handleOnChange = (e) => {
    setSelected(e.value);
  };

  return (
    <StyledGraph sm={sm}>
      <GraphHeader bg={tooltipBg} sm={sm}>
        <div className="head">
          <div className="title">
            <strong>{title}</strong>
            <div className="legendWrapper">
              <div>
                <GoDotFill color="#408F8C" />
                <span>Users</span>
              </div>
              <div>
                <GoDotFill color="#4E6199" />
                <span>Investments</span>
              </div>
            </div>
          </div>
          <strong>{amount}</strong>
          <div className="dropdown">
            <Dropdown
              option={dropdown}
              title="Monthly"
              onChange={handleOnChange}
            >
              Monthly
              <IoMdArrowDropdown size={20} />
            </Dropdown>
          </div>
        </div>
      </GraphHeader>
      <ChartContainer sm={sm}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </ChartContainer>
    </StyledGraph>
  );
}

export default StackCharts;
