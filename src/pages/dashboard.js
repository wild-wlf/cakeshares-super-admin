import AdminTopBar from "@/components/common/AdminTopBar/AdminTopBar";
import React from "react";
import handIcon from "../_assets/handIcon.png";
import QuickStatsSection from "@/components/atoms/QuickStatsSection";
import PopularListing from "@/components/atoms/PopularListing";

const dashboard = () => {
  return (
    <>
      <div>
        <AdminTopBar
          title={"Welcome Mickhel James!"}
          suffix={handIcon}
          tagLine={"Let's explore what's new with your product today!"}
        />

        <QuickStatsSection />
        <PopularListing />
      </div>
    </>
  );
};

export default dashboard;
