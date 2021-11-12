import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { Link, useParams } from "react-router-dom";

import NavBar from "./NavBar";

import quizzesApi from "../apis/quizzes";

function QuizShowPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      setTitle(response.data.quiz.name);
    } catch (error) {
      Logger.error(error);
    }
  };
  useEffect(() => {
    fetchQuizDetails();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="flex justify-between pt-10 pr-40">
        <Typography style="h2" className="pl-56">
          {title}
        </Typography>

        <Link
          to={{
            pathname: `/questionForm/${id}`,
          }}
        >
          <Button
            label="Add new quiz"
            icon={Plus}
            style="secondary"
            iconPosition="left"
          />
        </Link>
      </div>
      <div className="flex justify-center items-center ">
        <h2 className="mt-40">There are no questions in this quiz.</h2>
      </div>
    </div>
  );
}

export default QuizShowPage;
