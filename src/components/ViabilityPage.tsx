import React from "react";
import { SizeCard } from "./SizeCard";
import { SketchAttributesCard } from "@seasketch/geoprocessing/client-ui";
import { MinWidthCard } from "./MinWidthCard";

export const ViabilityPage = () => {
  return (
    <>
      <SizeCard />
      <MinWidthCard />
      <SketchAttributesCard autoHide />
    </>
  );
};
