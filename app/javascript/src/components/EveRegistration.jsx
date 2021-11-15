import React, { useEffect, useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { useParams } from "react-router";

import quizzesApi from "../apis/quizzes";

function EveRegistration() {
  const { slug } = useParams(slug);
  const [title, setTitle] = useState();
  const fetchData = async () => {
    const response = await quizzesApi.showSlug(slug);
    setTitle(response.data.quiz.name);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="border-b-2">
        <Header title="Quizzy" className="ml-10" />
      </div>
      <div className="flex items-center justify-center mt-20">
        <div className="w-full max-w-md m-8">
          <Typography style="h1" className="mb-8">
            Welcome to {title}
          </Typography>

          <div className=" text-center">
            <form>
              <Input
                label="First Name"
                placeholder="Enter First Name"
                className="mt-4"
              />
              <Input
                label="Last Name"
                placeholder="Enter Last Name"
                className="mt-4"
              />
              <Input label="Email" placeholder="Enter Email" className="mt-4" />
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
  );
}

export default EveRegistration;
