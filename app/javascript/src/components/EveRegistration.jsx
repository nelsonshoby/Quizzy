import React, { useEffect, useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import Logger from "js-logger";
import { isNil } from "ramda";
import { useParams } from "react-router";

import TakeQuiz from "./Quiz/TakeQuiz";

import attemptApi from "../apis/attempt";
import quizzesApi from "../apis/quizzes";
import usersApi from "../apis/user";

function EveRegistration() {
  const { slug } = useParams(slug);
  const [title, setTitle] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [quizData, setQuizData] = useState("");
  const [quizId, setQuizId] = useState();
  const [attempt, setAttempt] = useState();

  const fetchData = async () => {
    const response = await quizzesApi.showSlug(slug);

    setQuizData(response.data);
    setQuizId(response.data.quiz.id);
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

      const attemptData = await attemptApi.create({
        attempt: {
          quiz_id: quizId,
          user_id: response.data.user,
        },
      });

      setAttempt(attemptData.data.attempt_id);
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div>
      <div className="border-b-2">
        <Header title="Quizzy" className="ml-10" />
      </div>
      {isNil(id) || isNil(attempt) ? (
        <div className="mx-64">
          <div className="flex items-center justify-center mt-20 border-gray-100 border-8 mx-64 shadow-xl">
            <div className="w-full max-w-md m-8">
              <Typography style="h1" className="mb-8">
                Welcome to {title}
              </Typography>

              <div className=" text-center">
                <form onSubmit={handleSubmit}>
                  <Input
                    label="First Name"
                    value={firstName}
                    required="required"
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Enter First Name"
                    className="mt-4"
                  />
                  <Input
                    label="Last Name"
                    value={lastName}
                    required="required"
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Enter Last Name"
                    className="mt-4"
                  />
                  <Input
                    label="Email"
                    value={email}
                    required="required"
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
        </div>
      ) : (
        <TakeQuiz quizData={quizData} userId={id} id={attempt} />
      )}
    </div>
  );
}

export default EveRegistration;
