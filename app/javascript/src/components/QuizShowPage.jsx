import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";

import NavBar from "./NavBar";

function QuizShowPage(props) {
  return (
    <div>
      <NavBar />
      <div className="flex justify-between pt-10 pr-40">
        <Typography style="h2" className="pl-56">
          {props.location.param}
        </Typography>

        <Button
          label="Add new quiz"
          icon={Plus}
          style="secondary"
          iconPosition="left"
        />
      </div>
      <div className="flex justify-center items-center ">
        <h2 className="mt-40">There are no questions in this quiz.</h2>
      </div>
    </div>
  );
}

export default QuizShowPage;
