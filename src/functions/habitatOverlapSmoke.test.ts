/**
 * @jest-environment node
 * @group smoke
 */
import { habitatOverlap } from "./habitatOverlap";
import {
  getExamplePolygonSketchAll,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

describe("Basic smoke tests", () => {
  test("handler function is present", () => {
    expect(typeof habitatOverlap).toBe("function");
  });
  test("habitatOverlapSmoke - tests run against all examples", async () => {
    const examples = await getExamplePolygonSketchAll();
    for (const example of examples) {
      const result = await habitatOverlap(example);
      expect(result).toBeTruthy();
      writeResultOutput(result, "habitatOverlap", example.properties.name);
    }
  }, 120000);
});
