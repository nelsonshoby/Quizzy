import React, { useEffect, useState } from "react";

import { Button } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";
import { Radio } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useParams } from "react-router";

import attemptApi from "../../apis/attempt";
import quizzesApi from "../../apis/quizzes";

function TakeQuiz({ userId, id }) {
  const [answer, setAnswer] = useState({});
  const [quizData, setQuizData] = useState("");
  const { slug } = useParams(slug);
  Logger.warn("slug is", slug);

  const fetchData = async () => {
    const response = await quizzesApi.showSlug(slug);
    setQuizData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = e => {
    const result = {
      ...answer,
      [e.target.name]: e.target.value,
    };
    setAnswer(result);
  };

  const handleSubmit = async () => {
    Logger.warn("selectedAnswer", selectedAnswer);

    const selectedAnswer = Object.keys(answer).map(key => ({
      question_id: key,
      option_id: answer[key],
    }));

    const response = await attemptApi.update(
      {
        attempt: {
          quiz_id: quizData.quiz.id,
          user_id: userId,
          submitted: true,
          attempt_answers_attributes: selectedAnswer,
        },
      },
      id
    );
    const attemptId = response.data.attempt;
    window.location.href = `/public/${slug}/${attemptId}/result`;
  };

  return (
    <div>
      <div className="m-16  border-gray-100 border-8 shadow-lg p-2 rounded-md">
        <Typography style="h1" className="mb-8 ml-2">
          {quizData?.quiz?.name}
        </Typography>

        {quizData?.quiz?.questions.map((question, index) => (
          <>
            <div key={index} className="flex mt-8 bg-gray-100 rounded-md p-2">
              <Typography style="h3" className="ml-2">
                Question {index + 1}
              </Typography>
              <Typography style="h4" className="ml-48">
                {question?.description}
              </Typography>
            </div>
            <div className="ml-64 ">
              <Radio stacked="false" className="space-y-4 mt-4 ml-16">
                {question.options.map((option, index) => (
                  <div key={index}>
                    <Radio.Item
                      className="mt-6"
                      label={option.content}
                      name={question.id}
                      value={option.id}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </Radio>
            </div>
          </>
        ))}

        <div className="flex w-full items-center justify-center mb-2">
          <Button
            className=""
            type="submit"
            label="Submit"
            onClick={handleSubmit}
            style="secondary"
          />
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz;
