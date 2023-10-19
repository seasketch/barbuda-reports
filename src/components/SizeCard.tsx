import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ResultsCard } from "@seasketch/geoprocessing/client-ui";
// Import the results type definition from your functions to type-check your
// component render functions
import { AreaResults } from "../functions/area";
import Translator from "../components/TranslatorAsync";

const Number = new Intl.NumberFormat("en", { style: "decimal" });
const areaToMiles = (area: number) =>
  Number.format(Math.round(area * 3.86102e-7));

/**
 * SizeCard component
 */
export const SizeCard = () => {
  const { t } = useTranslation();
  return (
    <>
      <ResultsCard
        title={t("SizeCard title", "Zone Size")}
        functionName="calculateArea"
      >
        {(data: AreaResults) => (
          <p>
            <Trans i18nKey="Size message miles">
              This sketch is <b>{{ area: areaToMiles(data.area) }}</b> square
              miles
            </Trans>{" "}
            —{" "}
            <b>
              {((data.area * 1e-6) / 458).toLocaleString("en", {
                style: "percent",
                minimumFractionDigits: 1,
              })}
            </b>{" "}
            of Barbuda's 3nm jurisdiction{" "}
          </p>
        )}
      </ResultsCard>
    </>
  );
};

/**
 * SizeCard as a top-level report client
 */
export const SizeCardReportClient = () => {
  return (
    <Translator>
      <SizeCard />
    </Translator>
  );
};
