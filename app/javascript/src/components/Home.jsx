import React, { useState, useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";

import NavBar from "./NavBar";

import quizzesApi from "../apis/quizzes";
import Table from "../components/Table/Table";

function Home() {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async () => {
    setLoading(true);
    const response = await quizzesApi.index();
    const quizData = await response.data;
    setQuiz(quizData.quiz);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-64">
        <PageLoader text="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <div className="flex justify-between pt-10 pr-40">
        {quiz.length != 0 && (
          <Typography style="h2" className="pl-56">
            List of quizzes
          </Typography>
        )}
        <Button
          label="Add new quiz"
          className="ml-56"
          onClick={() => (window.location.href = "/quiz/new")}
          icon={Plus}
          style="secondary"
          iconPosition="left"
        />
      </div>

      {quiz.length != 0 ? (
        <div className="pt-10 pr-40 pl-56 ">
          <Table data={quiz} fetchQuiz={fetchQuiz}></Table>
        </div>
      ) : (
        <div className="flex justify-center items-center ">
          <h2 className="mt-40">You have not created any quiz.</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
