import React from "react";
import { MatomoInstance } from "./types";

const MatomoContext = React.createContext<MatomoInstance>({});

export default MatomoContext;
