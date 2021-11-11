import React, { useEffect, useState } from "react";

import { Plus, Delete } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { Select } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import NavBar from "./NavBar";

import questionApi from "../apis/question";
import quizzesApi from "../apis/quizzes";
import { TOASTR_OPTIONS } from "../constants";

function QuestionForm() {
  const [options, setOption] = useState(2);
  const [optionsObject, setOptionsObject] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

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

  const handleChange = (e, index) => {
    const data = optionsObject;
    if (data?.[index] === answer?.value && answer != null) {
      setAnswer({ label: e.target.value, value: e.target.value });
    }
    data[index] = e.target.value;
    setOptionsObject([...data]);
  };

  const handleDelete = (e, index) => {
    const data = optionsObject;
    if (data[index] === answer?.value) {
      setAnswer(null);
    }
    data.splice(index, 1);
    setOptionsObject([...data]);
    setOption(prev => prev - 1);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setQuestion(question.trim());
    if (question.length != 0) {
      try {
        await questionApi.create({
          question: { description: question, quiz_id: id },
        });
      } catch (error) {
        Logger.error(error);
      }
    } else {
      toast.error("Question name can't be empty", TOASTR_OPTIONS);
    }

    // const arrayLength = optionsObject.length

    // const setLength  = new Set(optionsObject).size
  };

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
