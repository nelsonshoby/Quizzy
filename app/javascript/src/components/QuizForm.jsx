import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2";
import { toast } from "react-toastify";

import quizzesApi from "apis/quizzes";

import { TOASTR_OPTIONS } from "../constants";

function QuizForm({ setClicked }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async event => {
    event.preventDefault();
    setName(name.trim());
    if (name.length != 0) {
      try {
        await quizzesApi.create({ quiz: { name } });
        setLoading(false);
        setClicked(true);
      } catch (error) {
        setLoading(false);
      }
    } else {
      toast.error("Quiz name can't be empty", TOASTR_OPTIONS);
    }
  };
  loading;

  return (
    <div className="flex items-center justify-center mt-40">
      <div className="text-center w-full max-w-md m-8">
        <form onSubmit={handleSubmit}>
          <Typography style="h2">Add new quiz</Typography>
          <Input
            value={name}
            label="Quiz name"
            size="large "
            onChange={e => setName(e.target.value)}
          />
          <Button
            type="submit"
            className="mt-6"
            label="Submit"
            style="secondary"
          />
        </form>
      </div>
    </div>
  );
}

export default QuizForm;
