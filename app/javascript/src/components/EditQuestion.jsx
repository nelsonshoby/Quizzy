import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import QuestionForm from "./QuestionForm";

import questionApi from "../apis/question";
import { TOASTR_OPTIONS } from "../constants";

function EditQuestion() {
  const [optionId, setOptionId] = useState([]);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOption] = useState(2);
  const [deletedOptions, setDeletedOptions] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const { id } = useParams();
  const [answer, setAnswer] = useState(null);
  const [optionsObject, setOptionsObject] = useState([]);
  const fetchQuizDetails = async () => {
    try {
      const response = await questionApi.show(id);
      setTitle(response.data.question.description);
      setQuestion(response.data.question.quiz);
      setQuizId(response.data.question.quiz_id);
      setOption(response.data.question.options.length);
      const ans = response.data.question.options.reduce((acc, element) => {
        return element.result ? element.content : acc;
      }, "");
      const optionObj = response.data.question.options.map(ele => ele.content);

      setOptionsObject(optionObj);

      const optionid = response.data.question.options.map(ele => ele.id);

      setOptionId(optionid);

      setAnswer({ label: `option ${optionObj.indexOf(ans)}`, value: ans });
    } catch (error) {
      Logger.error(error);
    }
  };

  const arraySize = optionsObject.length;
  const setSize = new Set(optionsObject).size;

  const handleSubmit = async event => {
    event.preventDefault();
    setQuestion(question.trim());
    if (arraySize != setSize) {
      toast.error("Options cant be same", TOASTR_OPTIONS);
    } else if (question.length != 0 && answer.length != 0) {
      const output = optionsObject.map((ele, index) => ({
        id: optionId[index],
        content: ele,
        result: ele === answer.value,
      }));

      const final = output.concat(deletedOptions);

      try {
        await questionApi.update(
          {
            question: {
              description: question,
              options_attributes: final,
            },
          },
          id
        );

        window.location.href = `/quizShowpage/${quizId}/show`;
      } catch (error) {
        Logger.error(error);
      }
    } else {
      toast.error("Question name can't be empty", TOASTR_OPTIONS);
    }
  };

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
    const deletedData = data.splice(index, 1);

    const deletedId = optionId.splice(index, 1);
    setOptionsObject([...data]);
    setOption(prev => prev - 1);
    if (deletedId[0]) {
      setDeletedOptions(prev =>
        prev.concat({
          id: deletedId[0],
          content: deletedData[0],
          result: false,
          _destroy: "1",
        })
      );
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div>
      <QuestionForm
        handleSubmit={handleSubmit}
        title={title}
        question={question}
        setQuestion={setQuestion}
        options={options}
        handleChange={handleChange}
        handleDelete={handleDelete}
        setOption={setOption}
        answer={answer}
        setAnswer={setAnswer}
        optionsObject={optionsObject}
      />
    </div>
  );
}

export default EditQuestion;
