import React, { useState, useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";

import NavBar from "./NavBar";
import QuizForm from "./QuizForm";

import quizzesApi from "../apis/quizzes";
import Table from "../components/Table/Table";

function Home() {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(true);
  const fetchquiz = async () => {
    const response = await quizzesApi.index();
    const temp = await response.data;
    setData(temp.quiz);
  };

  useEffect(() => {
    fetchquiz();
  }, [clicked]);

  return (
    <div>
      <NavBar />
      {clicked ? (
        <>
          <div className="flex justify-between pt-10 pr-20">
            {data.length != 0 ? (
              <Typography style="h2" className="pl-32">
                List of quizzes
              </Typography>
            ) : (
              ""
            )}
            <Button
              label="Add new quiz"
              onClick={() => setClicked(prev => !prev)}
              icon={Plus}
              style="secondary"
              iconPosition="left"
            />
          </div>
          {data.length != 0 ? (
            <div className="pt-10 pr-20 pl-32">
              <Table data={data}></Table>
            </div>
          ) : (
            <div className="flex justify-center items-center ">
              <h2 className="mt-40">You have not created any quiz.</h2>
            </div>
          )}
        </>
      ) : (
        <QuizForm setClicked={setClicked}></QuizForm>
      )}
    </div>
  );
}

export default Home;
