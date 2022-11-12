import React from "react";

export const AlertField = ({children}) => {
  return (
    <span className="text-secondary" style={{ fontSize: "13px" }}>
      {children}
    </span>
  );
};
