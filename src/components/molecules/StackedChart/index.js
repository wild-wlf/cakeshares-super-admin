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
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];
  const [selected, setSelected] = useState("monthly");
  const yearlyCategories = [
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
  ];
  const monthlyCategories = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];
  const weeklyCategories = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const monthly = [
    {
      name: "Users",
      data: [
        148, 133, 124, 110, 95, 82, 76, 89, 105, 120, 135, 142, 131, 127, 114,
        100, 151, 86, 179, 93, 107, 119, 137, 145, 138, 128, 116, 103, 98, 88,
      ],
      stack: "Europe",
      color: "rgba(64, 143, 140, 1)",
    },
    {
      name: "Investments",
      data: [
        72, 128, 106, 43, 159, 78, 112, 107, 120, 134, 59, 63, 148, 93, 159,
        124, 127, 102, 66, 181, 96, 112, 127, 142, 97, 71, 185, 100, 155, 130,
      ],
      stack: "Europe",
      color: "rgba(78, 97, 153, 1)",
    },
  ];
  const yearly = [
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
  const weekly = [
    {
      name: "Users",
      data: [102, 128, 106, 143, 89, 78, 92],
      stack: "Europe",
      color: "rgba(64, 143, 140, 1)",
    },
    {
      name: "Investments",
      data: [83, 138, 81, 97, 112, 86, 140],
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
      categories:
        selected === "monthly"
          ? monthlyCategories
          : selected === "yearly"
          ? yearlyCategories
          : weeklyCategories,
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
        pointWidth: selected === "monthly" ? 24 : 38,
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
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 768,
          },
          chartOptions: {
            plotOptions: {
              column: {
                pointWidth: selected === "monthly" ? 18 : 38,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 680,
          },
          chartOptions: {
            plotOptions: {
              column: {
                pointWidth: selected === "monthly" ? 14 : 38,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 576,
          },
          chartOptions: {
            plotOptions: {
              column: {
                pointWidth: selected === "monthly" ? 10 : 28,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 440,
          },
          chartOptions: {
            plotOptions: {
              column: {
                pointWidth: selected === "monthly" ? 8 : 18,
              },
            },
          },
        },
      ],
    },
    series:
      selected === "monthly"
        ? monthly
        : selected === "yearly"
        ? yearly
        : weekly,

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
              <IoMdArrowDropdown size={16} />
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
