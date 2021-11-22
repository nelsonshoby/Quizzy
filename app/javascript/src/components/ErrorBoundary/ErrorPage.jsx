import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import NavBar from "../NavBar";

function ErrorPage() {
  return (
    <div>
      <NavBar />
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
        <Typography style="h4" className="font-bold text-2xl">
          You have landed somwhere unknown.
        </Typography>
      </div>
    </div>
  );
}

export default ErrorPage;
