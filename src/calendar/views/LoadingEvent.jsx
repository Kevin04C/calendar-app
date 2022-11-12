import React from "react";

export const LoadingEvent = () => {
  return (
    <div class="d-flex justify-content-center mt-5">
      <div class="spinner-border" role="status" style={{width: '3rem', height: '3rem'}}>
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
