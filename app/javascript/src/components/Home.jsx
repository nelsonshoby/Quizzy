import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import NavBar from "./NavBar";

function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex justify-end pt-10 pr-20">
        <Button
          label="Add new quiz"
          onClick={function noRefCheck() {}}
          icon={Plus}
          style="secondary"
          iconPosition="left"
        />
      </div>
    </div>
  );
}

export default Home;
