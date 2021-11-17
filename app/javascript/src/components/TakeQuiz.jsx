import React, { useState } from "react";

import { Button } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";
import { Radio } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import attemptApi from "../apis/attempt";

function TakeQuiz({ quizData, userId, id }) {
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [updatedAttemptData, setAttemptedData] = useState();
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedAnswer(prev => [
      ...prev,
      { question_id: Number(name), option_id: Number(value) },
    ]);
  };

  const handleSubmit = async () => {
    Logger.warn("selectedAnswer", selectedAnswer);

    const attemptData = await attemptApi.update(
      {
        attempt: {
          quiz_id: quizData.user,
          user_id: userId,
          submitted: true,
          attempt_answers_attributes: selectedAnswer,
        },
      },
      id
    );
    setAttemptedData(attemptData.data.attempt);
    Logger.warn("updatedAttemptData", updatedAttemptData);
  };

  return (
    <div>
      <div className="m-16  border-gray-100 border-8 shadow-sm">
        <Typography style="h1" className="mb-8 ml-2">
          {quizData.quiz.name}
        </Typography>

        {quizData.quiz.questions.map((question, index) => (
          <>
            <div key={index} className="flex mt-8 bg-gray-100">
              <Typography style="h3" className="ml-2">
                Question {index}
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
