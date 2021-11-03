import React, { useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";

import authApi from "apis/auth";

import { setAuthHeaders } from "../apis/axios";
import { setToLocalStorage } from "../helpers/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  loading;

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        userName: response.data.first_name,
      });
      setAuthHeaders();
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="border-b-2">
        <Header title="Quizzy" className="ml-10" />
      </div>
      <div className="flex items-center justify-center mt-20">
        <div className="w-full max-w-md m-8">
          <h2
            className="mt-6 text-3xl font-extrabold leading-9
            text-center text-bb-gray-700"
          >
            Log In
          </h2>
          <div className=" text-center">
            <form onSubmit={handleSubmit}>
              <Input
                value={email}
                label="Email"
                placeholder="Enter Email"
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                value={password}
                label="Password"
                placeholder="Enter Password"
                className="py-4"
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                className="mt-4"
                label="Submit"
                onClick={function noRefCheck() {}}
                style="primary"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
