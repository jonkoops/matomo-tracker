import React from "react";
import MatomoContext from "./MatomoContext";

const MatomoProvider = ({ children, value }: any) => {
  const Context = MatomoContext;

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default MatomoProvider;
