import React from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  ObjectiveStatus,
  ResultsCard,
  KeySection,
} from "@seasketch/geoprocessing/client-ui";
import { MinWidthResult } from "../functions/minWidth";
// Import the results type definition from your functions to type-check your
// component render functions
import { AreaResults } from "../functions/area";
import Translator from "./TranslatorAsync";
import minWidthExample from "../assets/min_width_example.png";

const Number = new Intl.NumberFormat("en", { style: "decimal" });

/**
 * SizeCard component
 */
export const MinWidthCard = () => {
  const { t } = useTranslation();
  const minWidthDescription = t(
    "The minimum width of a zone significantly impacts its potential conservation value. The recommended smallest diameter is between 2 and 3 miles."
  );
  return (
    <>
      <ResultsCard
        title={t("Minimum Width", "Minimum Width")}
        functionName="minWidth"
      >
        {(data: MinWidthResult[]) => (
          <>
            {data.length > 1 ? (
              <p>
                {minWidthDescription}
                <img
                  src={minWidthExample}
                  alt="Minimum Width Image"
                  style={{ display: "block", marginLeft: "80px" }}
                />

                <p>
                  The zones within this collection have the following minimum
                  widths:
                </p>
                {data.map((result, index) => (
                  <div key={index}>
                    <ObjectiveStatus
                      key={index}
                      status={
                        result.value >= 3218 && result.value <= 4827
                          ? "yes"
                          : "no"
                      }
                      msg={
                        <span>
                          {result.sketchName}:{" "}
                          <b>{(result.value * 6.2137e-4).toFixed(2)}mi</b>
                        </span>
                      }
                    />
                  </div>
                ))}
              </p>
            ) : (
              <p>
                {minWidthDescription}
                <img
                  src={minWidthExample}
                  alt="Minimum Width Image"
                  style={{ display: "block", marginLeft: "80px" }}
                />
                <p>
                  <ObjectiveStatus
                    key={data[0].sketchId}
                    status={
                      data[0].value >= 3218 && data[0].value <= 4827
                        ? "yes"
                        : "no"
                    }
                    msg={
                      <span>
                        This zone's minimum width is:{" "}
                        <b>{(data[0].value * 6.2137e-4).toFixed(2)}mi</b>
                      </span>
                    }
                  />
                </p>
              </p>
            )}
          </>
        )}
      </ResultsCard>
    </>
  );
};
