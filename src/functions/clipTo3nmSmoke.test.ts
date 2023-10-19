/**
 * @jest-environment node
 * @group smoke
 */
import handler, { clipTo3nm } from "./clipTo3nm";
import { polygonPreprocessorSmokeTest } from "@seasketch/geoprocessing/scripts/testing";

polygonPreprocessorSmokeTest(clipTo3nm, handler.options.title, {
  timeout: 20000,
  debug: true,
});
