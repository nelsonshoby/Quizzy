import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { Radio } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { mergeAll } from "ramda";
import { useParams } from "react-router";

import attemptApi from "../apis/attempt";
import quizzesApi from "../apis/quizzes";

function Result() {
  const { slug } = useParams(slug);
  const { attemptId } = useParams(attemptId);
  const [quizData, setQuizData] = useState();
  const [attemptData, setAttemptData] = useState([]);
  const [correctData, setCorrectData] = useState([]);

  const fetchData = async () => {
    const response = await quizzesApi.showSlug(slug);
    setQuizData(response.data);
  };

  const data = mergeAll(
    correctData.map(ele => ({ [ele.id]: ele.options[0].id }))
  );
  const correctOptionId = correctData.map(ele => ele.options[0].id);
  const selectedOptionId = attemptData.map(ele => ele.option_id);
  const filteredArray = correctOptionId.filter(value =>
    selectedOptionId.includes(value)
  );
  const numberOfAttemptedQuestions = correctOptionId.length;
  const numberOfCorrectAnswer = filteredArray.length;

  const fetchAttemptData = async () => {
    const attemptdata = await attemptApi.show(attemptId);
    setCorrectData(attemptdata.data.quiz.questions);
    setAttemptData(attemptdata.data.attempt.answers);
    if (
      !(
        attemptdata.data.attempt.answers[0].user ===
        localStorage.getItem("email")
      )
    ) {
      window.location.href = `/public/${slug}/attempts/new`;
    }
  };

  useEffect(() => {
    fetchData();
    fetchAttemptData();
  }, []);

  if (!quizData) {
    return (
      <div className="py-10 mt-64 ml-64">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="border-b-2">
        <Header title="Quizzy" className="ml-10" />
      </div>

      <div className="m-16  border-gray-100 border-8  pb-4 shadow-lg p-2 rounded-md">
        <Typography style="h1" className="mb-8 ml-2">
          {quizData.quiz.name}
        </Typography>
        <Typography style="h4" className="mt-2 ml-2">
          Thank you for taking the quiz, here are your results. You have
          submitted {numberOfCorrectAnswer} correct and{" "}
          {numberOfAttemptedQuestions - numberOfCorrectAnswer} incorrect
          answers.
        </Typography>

        {quizData.quiz.questions.map((question, index) => (
          <>
            <div key={index} className="flex mt-8 bg-gray-100 p-2 rounded-md">
              <Typography style="h3" className="ml-2">
                Question {index + 1}
              </Typography>
              <Typography style="h4" className="ml-48">
                {question.description}
              </Typography>
            </div>
            <div className="ml-64 ">
              <Radio stacked="false" className="space-y-4 mt-4 ml-16">
                {question.options.map((option, index) => (
                  <div key={index}>
                    <Radio.Item
                      className="mt-6"
                      label={
                        <>
                          {option.content}
                          {data[question.id] == option.id && (
                            <div className="ml-2 text-green-400">
                              Correct answer
                            </div>
                          )}
                        </>
                      }
                      name={question.id}
                      value={option.id}
                      disabled="true"
                      checked={attemptData
                        .map(ele => ele.option_id)
                        .includes(option.id)}
                    />
                  </div>
                ))}
              </Radio>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Result;
