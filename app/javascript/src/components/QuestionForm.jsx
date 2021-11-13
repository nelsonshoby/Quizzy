import React from "react";

import { Plus, Delete } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { Select } from "@bigbinary/neetoui/v2";

import NavBar from "./NavBar";

function QuestionForm({
  handleSubmit,
  title,
  question,
  setQuestion,
  options,
  handleChange,
  handleDelete,
  setOption,
  answer,
  setAnswer,
  optionsObject,
}) {
  return (
    <div>
      <NavBar />
      <div className=" ml-24 ">
        <form onSubmit={handleSubmit}>
          <div className="flex-col items-center justify-center mt-20 w-full max-w-md m-8 ml-24 ">
            <Typography style="h2" className="pt-8">
              {title}
            </Typography>
            <Input
              label="Question"
              value={question}
              required="required"
              className="mt-2"
              placeholder="Enter question"
              onChange={e => setQuestion(e.target.value)}
            />
            {[...Array(options)].map((ele, index) => (
              <div key={index} className="flex justify-between">
                <Input
                  className="mt-2"
                  required="required"
                  label={`option ${index + 1}`}
                  placeholder={`option ${index + 1}`}
                  value={optionsObject[index]}
                  onChange={e => handleChange(e, index)}
                />
                {index > 1 && (
                  <Button
                    className="mt-6 ml-1 "
                    icon={Delete}
                    onClick={e => handleDelete(e, index)}
                    style="secondary"
                  />
                )}
              </div>
            ))}
            {options < 4 && (
              <Button
                className="mt-2"
                label="Add"
                icon={Plus}
                onClick={() => {
                  setOption(prev => prev + 1);
                }}
                style="secondary"
              />
            )}
            <Select
              required
              label="Select"
              value={answer}
              isSearchable={false}
              className="mt-2"
              onChange={e => {
                setAnswer(e);
              }}
              options={optionsObject.map((ans, index) => ({
                label: `option ${index + 1}`,
                value: ans,
              }))}
              placeholder="Select an Answer"
            />
            <Button
              label="Submit"
              type="submit"
              style="secondary"
              className="mt-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuestionForm;
