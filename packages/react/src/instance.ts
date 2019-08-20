import MatomoTracker from "@datapunt/matomo-tracker-js";
import { InstanceParams } from "./types";

function createInstance(params: InstanceParams) {
  return new MatomoTracker(params);
}

export default createInstance;
