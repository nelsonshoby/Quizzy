import React, { useState } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";

import ModalComponent from "./ModalComponent";

import questionApi from "../apis/question";

function QuestionsList({ questionData, fetchQuizDetails }) {
  const [showModal, setShowModal] = useState(false);
  const handleDelete = async id => {
    try {
      await questionApi.destroy(id);
      fetchQuizDetails();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleUpdate = id => {
    window.location.href = `/EditQuestion/${id}`;
  };
  return (
    <div className="pt-10 pr-40 pl-56">
      {questionData.map((question, index) => (
        <div key={index} className="flex-col mt-8 border-b-2 pb-8">
          <div className="flex justify-between">
            <div className="flex  w-2/5">
              <Typography style="h3" className="pt-2 pb-2">
                Question {index + 1}
              </Typography>
              <Typography style="h4" className="pt-2 pb-2 ml-48">
                <div className="pl-6">{question.description}</div>
              </Typography>
            </div>

            <div className="flex">
              <Button
                className="pt-2"
                label="Edit"
                style="secondary"
                onClick={() => handleUpdate(question.id)}
              />
              <Button
                className="pt-2 ml-8"
                label="Delete"
                style="danger"
                onClick={() => setShowModal(question.id)}
              />
              <ModalComponent
                showModal={showModal}
                setShowModal={setShowModal}
                handleDelete={handleDelete}
              />
            </div>
          </div>
          <div>
            {question.options.map((option, index) => (
              <div key={index} className="flex w-4/5 ">
                <Typography style="h4" className="pt-2 pb-2">
                  Option {index + 1}
                </Typography>
                <Typography style="h4" className="pt-2 ml-64 pb-2">
                  <div className="flex">
                    <div>{option.content}</div>
                    {option.result && (
                      <div className="text-green-400 pl-2 flex">
                        <Check size={20} />
                        Correct
                      </div>
                    )}
                  </div>
                </Typography>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionsList;
