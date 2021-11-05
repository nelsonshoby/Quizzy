import React, { useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import NavBar from "./NavBar";
import QuizForm from "./QuizForm";

function Home() {
  const [clicked, setClicked] = useState(true);
  return (
    <div>
      <NavBar />
      {clicked ? (
        <>
          <div className="flex justify-end pt-10 pr-20">
            <Button
              label="Add new quiz"
              onClick={() => setClicked(prev => !prev)}
              icon={Plus}
              style="secondary"
              iconPosition="left"
            />
          </div>
          <div className="flex justify-center items-center ">
            <h2 className="mt-40">You have not created any quiz.</h2>
          </div>
        </>
      ) : (
        <QuizForm setClicked={setClicked}></QuizForm>
      )}
    </div>
  );
}

export default Home;
