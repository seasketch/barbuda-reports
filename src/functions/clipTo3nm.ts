import {
  PreprocessingHandler,
  Feature,
  Sketch,
  isPolygonFeature,
  ValidationError,
  clipToPolygonFeatures,
  DatasourceClipOperation,
} from "@seasketch/geoprocessing";
import project from "../../project";
import { genClipLoader } from "@seasketch/geoprocessing/dataproviders";

interface ExtraParams {
  /** Array of EEZ's to clip to  */
  eezs?: string[];
}

/**
 * Preprocessor takes a Polygon feature/sketch and returns the portion that
 * is in the ocean (not on land).  Optionally accepts array of eez IDs to further
 * filter feature/sketch to.
 */
export async function clipTo3nm(
  feature: Feature | Sketch,
  extraParams: ExtraParams = {}
): Promise<Feature> {
  if (!isPolygonFeature(feature)) {
    throw new ValidationError("Input must be a polygon");
  }

  /**
   * intersection with the 3nm jurisdiction including lagoons
   */
  const intersect3nm: DatasourceClipOperation = {
    datasourceId: "3nm-jurisdiction",
    operation: "intersection",
  };

  // Create a function that will perform the clip operations in order
  const clipLoader = genClipLoader(project, [intersect3nm]);

  // Wrap clip function into preprocessing function with additional clip options
  return clipToPolygonFeatures(feature, clipLoader, {
    maxSize: 500000 * 1000 ** 2, // Default 500,000 KM
    enforceMaxSize: false,
    ensurePolygon: true,
  });
}

export default new PreprocessingHandler(clipTo3nm, {
  title: "clipTo3nm",
  description: "Clips feature or sketch to 3nm jurisdiction, removing land",
  timeout: 40,
  requiresProperties: [],
  memory: 4096,
});
