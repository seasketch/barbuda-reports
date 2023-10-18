import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ResultsCard, Skeleton } from "@seasketch/geoprocessing/client-ui";
// Import the results type definition from your functions to type-check your
// component render functions
import { AreaResults } from "../functions/area";
import Translator from "../components/TranslatorAsync";

const Number = new Intl.NumberFormat("en", { style: "decimal" });

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
            <Trans i18nKey="SizeCard sketch size message">
              This sketch is{" "}
              <b>{{ area: Number.format(Math.round(data.area * 1e-6)) }}</b>{" "}
              square kilometers
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
