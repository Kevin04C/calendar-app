import React from "react";

export const LoadingAuth = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <div className="spinner-border" role="status" style={{width: '3.5rem', height: '3.5rem'}}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
