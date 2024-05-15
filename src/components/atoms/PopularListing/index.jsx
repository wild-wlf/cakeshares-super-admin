import React from "react";
import { PopularListingWrapper } from "./PopularListing.style";
import Graph from "@/components/molecules/Charts";
import PopularListingChart from "@/components/molecules/PopularListingChart";

const PopularListing = () => {
  const ary1 = [
    80, 70, 90, 80, 100, 110, 240, 230, 240, 220, 330, 300, 250, 260, 280, 220,
    150,
  ];
  const ary2 = [
    120, 140, 170, 180, 120, 110, 140, 210, 140, 270, 170, 190, 220, 370, 220,
    30, 30,
  ];
  const ary3 = [
    320, 340, 350, 280, 320, 205, 295, 310, 90, 290, 350, 310, 190, 250, 320,
    350, 380,
  ];
  return (
    <PopularListingWrapper>
      <PopularListingChart
        title="Popular Listings"
        graphData={ary1}
        graphData2={ary2}
        graphData3={ary3}
      />
    </PopularListingWrapper>
  );
};

export default PopularListing;
