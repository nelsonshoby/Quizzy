import React, { useState } from "react";

import { Button } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";
import { Radio } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

function TakeQuiz({ quizData }) {
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedAnswer({ ...selectedAnswer, [name]: value });
  };

  const handleSubmit = () => {
    Logger.warn("selectedAnswer", selectedAnswer);
  };

  return (
    <div>
      <div className="m-16">
        <Typography style="h1" className="mb-8">
          {quizData.quiz.name}
        </Typography>

        {quizData.quiz.questions.map((question, index) => (
          <>
            <div key={index} className="flex mt-8">
              <Typography style="h3">Question {index}</Typography>
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
                      value={option.content}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </Radio>
            </div>
          </>
        ))}

        <div>
          <Button
            className="mt-6"
            type="submit"
            label="Button"
            onClick={handleSubmit}
            style="secondary"
          />
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz;
