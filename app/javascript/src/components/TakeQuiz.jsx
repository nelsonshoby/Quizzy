import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";
// import { Radio } from "@bigbinary/neetoui/v2";

function TakeQuiz({ questionData }) {
  return (
    <div>
      <div className="m-16">
        <Typography style="h1" className="mb-8">
          {questionData.quiz.name}
        </Typography>
        {questionData.quiz.questions.map((ele, index) => (
          <>
            <span>Question {index}</span>
            <span className="ml-32">{ele.description}</span>
          </>
        ))}
      </div>
    </div>
  );
}

export default TakeQuiz;
