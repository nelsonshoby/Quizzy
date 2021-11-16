import React, { useEffect, useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import Logger from "js-logger";
import { isNil } from "ramda";
import { useParams } from "react-router";

import TakeQuiz from "./TakeQuiz";

import quizzesApi from "../apis/quizzes";
import usersApi from "../apis/user";

function EveRegistration() {
  const { slug } = useParams(slug);
  const [title, setTitle] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [questionData, setQuestionData] = useState();

  const fetchData = async () => {
    const response = await quizzesApi.showSlug(slug);
    setQuestionData(response.data);
    setTitle(response.data.quiz.name);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await usersApi.create({
        user: {
          email,
          first_name: firstName,
          last_name: lastName,
          password: "welcome",
          password_confirmation: "welcome",
        },
      });
      setId(response.data.user);
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div>
      <div className="border-b-2">
        <Header title="Quizzy" className="ml-10" />
      </div>
      {isNil(id) ? (
        <div className="flex items-center justify-center mt-20">
          <div className="w-full max-w-md m-8">
            <Typography style="h1" className="mb-8">
              Welcome to {title}
            </Typography>

            <div className=" text-center">
              <form onSubmit={handleSubmit}>
                <Input
                  label="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                  className="mt-4"
                />
                <Input
                  label="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                  className="mt-4"
                />
                <Input
                  label="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="mt-4"
                />
                <Button
                  label="Next"
                  type="submit"
                  style="secondary"
                  className="mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      ) : (
        <TakeQuiz questionData={questionData} />
      )}
    </div>
  );
}

export default EveRegistration;
