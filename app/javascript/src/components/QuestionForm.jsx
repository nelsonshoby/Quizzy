import React, { useEffect, useState } from "react";

import { Plus, Delete } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { Select } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import NavBar from "./NavBar";

import quizzesApi from "../apis/quizzes";

function QuestionForm() {
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

  const [options, setOption] = useState([]);
  const appendInput = val => {
    setOption([
      ...options,
      { label: "Option" + " " + val, placeholder: "Option" + " " + val },
    ]);
  };

  const handleRemove = index => {
    const values = [...options];
    values.splice(index, 1);
    setOption(values);
  };

  return (
    <div>
      <NavBar />
      <form>
        <div className="flex-col items-center justify-center mt-20 w-full max-w-md m-8 ml-24">
          <Typography style="h2" className="pt-8">
            {title}
          </Typography>
          <Input
            label="Question"
            className="pt-5"
            placeholder="Enter question"
            required="required"
          />
          <Input
            label="Option 1"
            className="pt-8"
            placeholder="Option 1"
            required="required"
          />
          <Input
            label="Option 2"
            className="pt-8"
            placeholder="Option 2"
            required="required"
          />
          {options.map((option, index) => (
            <div key={index}>
              <Input
                label={option.label}
                className="pt-8"
                placeholder={option.placeholder}
                required="required"
              />
              <Button
                label="Delete"
                icon={Delete}
                style="secondary"
                iconPosition="left"
                onClick={() => handleRemove(index)}
              />
              {Object.keys(options).length == 1 && (
                <Button
                  className="pt-8 ml-2"
                  label="Add"
                  icon={Plus}
                  style="secondary"
                  iconPosition="left"
                  onClick={() => appendInput(String(4))}
                />
              )}
            </div>
          ))}

          {Object.keys(options).length == 0 && (
            <Button
              className="pt-8"
              label="Add option"
              icon={Plus}
              style="secondary"
              iconPosition="left"
              onClick={() => appendInput(String(3))}
            />
          )}

          <div className="p-4 mb-2">
            <Select
              required="required"
              className="pt-8"
              defaultValue={{
                label: "Value One",
                value: "value3",
              }}
              isClearable
              isSearchable
              label="Correct Answer"
              name="ValueList"
              options={[
                {
                  label: "Value One",
                  value: "value1",
                },
                {
                  label: "Value Two",
                  value: "value2",
                },
                {
                  label: "Value Three",
                  value: "value3",
                },
                {
                  label: "Value Four",
                  value: "value4",
                },
              ]}
              placeholder="Select an Option"
            />
          </div>
          <Button
            label="Submit"
            type="submit"
            style="secondary"
            className="pt-8"
          />
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;
