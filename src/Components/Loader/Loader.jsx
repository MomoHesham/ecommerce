import React from "react";
import { MutatingDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="position-fixed top-0 start-0 end-0 bottom-0 bg-opacity-25 bg-black d-flex justify-content-center align-items-center">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
