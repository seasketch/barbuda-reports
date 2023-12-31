import React from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Collapse,
  ObjectiveStatus,
  ResultsCard,
} from "@seasketch/geoprocessing/client-ui";
import { MinWidthResult } from "../functions/minWidth";
// Import the results type definition from your functions to type-check your
// component render functions
import minWidthExample from "../assets/min_width_example.png";

const Number = new Intl.NumberFormat("en", { style: "decimal" });

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
        {(data: MinWidthResult[]) => {
          return (
            <>
              {data.length > 1 ? (
                <div>
                  <p>{minWidthDescription}</p>
                  <img
                    src={minWidthExample}
                    alt="Minimum Width Image"
                    style={{ display: "block", marginLeft: "80px" }}
                  />
                  <br />
                  <br />
                  The zones within this plan have the following minimum widths:
                  {data.map((result, index) => (
                    <div key={index}>
                      <ObjectiveStatus
                        key={index}
                        status={result.value >= 3218 ? "yes" : "no"}
                        msg={
                          <span>
                            {result.sketchName}:{" "}
                            <b>{(result.value * 6.2137e-4).toFixed(2)}mi</b>
                          </span>
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p>{minWidthDescription}</p>
                  <img
                    src={minWidthExample}
                    alt="Minimum Width Image"
                    style={{ display: "block", marginLeft: "80px" }}
                  />
                  <br />
                  <ObjectiveStatus
                    key={data[0].sketchId}
                    status={data[0].value >= 3218 ? "yes" : "no"}
                    msg={
                      <span>
                        This zone's minimum width is:{" "}
                        <b>{(data[0].value * 6.2137e-4).toFixed(2)}mi</b>
                      </span>
                    }
                  />
                </div>
              )}
              <Collapse title={t("Learn more")}>
                <Trans i18nKey="Minimum Width Card - learn more">
                  <div>
                    Minimum width is approximated by finding the minimum width
                    of the smallest bounding rectangle of each sketch as
                    visualized in the image above.
                  </div>
                </Trans>
              </Collapse>
            </>
          );
        }}
      </ResultsCard>
    </>
  );
};
