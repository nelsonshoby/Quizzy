import React, { useEffect, useState } from "react";

import { isNil } from "ramda";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import questionApi from "../../apis/question";
import quizzesApi from "../../apis/quizzes";
import { TOASTR_OPTIONS } from "../../constants";
import QuestionForm from "../QuestionForm";

function CreateQuestion() {
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
      logger.error(error);
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

  const arraySize = optionsObject.length;
  const setSize = new Set(optionsObject).size;

  const handleSubmit = async event => {
    event.preventDefault();
    setQuestion(question.trim());
    if (arraySize != setSize) {
      toast.error("Options cant be same", TOASTR_OPTIONS);
    } else if (isNil(answer)) {
      toast.error("Select an answer", TOASTR_OPTIONS);
    } else if (question.length != 0 && answer.length != 0) {
      const output = optionsObject.map(ele => ({
        content: ele,
        result: ele === answer.value,
      }));

      try {
        await questionApi.create({
          question: {
            description: question,
            quiz_id: id,
            options_attributes: output,
          },
        });

        window.location.href = `/quizShowpage/${id}/show`;
      } catch (error) {
        logger.error(error);
      }
    } else {
      toast.error("Question name can't be empty", TOASTR_OPTIONS);
    }
  };
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

export default CreateQuestion;
