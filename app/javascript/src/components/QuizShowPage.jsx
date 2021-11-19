import React, { useEffect, useState } from "react";

import { Check, Copy, Plus } from "@bigbinary/neeto-icons";
import { Tooltip, Typography } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { isNil } from "ramda";
import { Link, useParams } from "react-router-dom";

import NavBar from "./NavBar";
import QuestionsList from "./QuestionsList";

import quizzesApi from "../apis/quizzes";

function QuizShowPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [questionData, setQuestionData] = useState([]);
  const [slug, setSlug] = useState("");
  const [switchIcon, setSwitchIcon] = useState(true);

  const createSlug = async () => {
    try {
      const response = await quizzesApi.setSlug(id);
      setSlug(response.data.quiz);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      setSlug(response.data.quiz.slug);
      setQuestionData(response.data.quiz.questions);
      setTitle(response.data.quiz.name);
    } catch (error) {
      logger.error(error);
    }
  };

  const copyToClipBoard = async slug => {
    try {
      let url = `${window.location.origin}/public/${slug}`;
      await navigator.clipboard.writeText(url);
    } catch (err) {
      alert("Error while copying");
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
        <div className="flex">
          <Link
            to={{
              pathname: `/CreateQuestion/${id}`,
            }}
          >
            <Button
              label="Add new question"
              icon={Plus}
              style="secondary"
              iconPosition="left"
            />
          </Link>
          {questionData.length !== 0 && isNil(slug) && (
            <Button
              label="Publish"
              className="ml-2"
              style="secondary"
              onClick={createSlug}
            />
          )}
        </div>
      </div>
      <div className="pt-10 pr-40 pl-56 flex">
        {slug && (
          <div className="flex">
            <Typography style="h5">
              Published, your public link is –
              <Link
                to={{
                  pathname: `/public/${slug}`,
                }}
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                {window.location.origin + "/public/" + slug}
              </Link>
            </Typography>
            <Tooltip placement={"bottom"} content={"Copy"}>
              <div>
                {switchIcon ? (
                  <Copy
                    size={15}
                    className="mt-1"
                    onClick={() => {
                      copyToClipBoard(slug);
                      setSwitchIcon(prev => !prev);
                    }}
                  />
                ) : (
                  <Check size={18} className="text-green-400" />
                )}
              </div>
            </Tooltip>
          </div>
        )}
      </div>

      {questionData.length !== 0 ? (
        <QuestionsList
          questionData={questionData}
          fetchQuizDetails={fetchQuizDetails}
        />
      ) : (
        <div className="flex justify-center items-center ">
          <h2 className="mt-40">There are no questions in this quiz.</h2>
        </div>
      )}
    </div>
  );
}

export default QuizShowPage;
