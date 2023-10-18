import React from "react";
import { SizeCard } from "./SizeCard";
import { SketchAttributesCard } from "@seasketch/geoprocessing/client-ui";
import { MinWidthCard } from "./MinWidthCard";
import { FishingValueCard } from "./FishingValueCard";

export const ViabilityPage = () => {
  return (
    <>
      <SizeCard />
      <MinWidthCard />
      <FishingValueCard />
      {/* <SketchAttributesCard autoHide /> */}
    </>
  );
};
