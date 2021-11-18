import React from "react";

import { Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import Logger from "js-logger";
import { resetAuthTokens } from "src/apis/axios";

import authApi from "apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserName");
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/login";
    } catch (error) {
      Logger.error(error);
    }
  };
  return (
    <>
      <Header
        className=" border-b-2"
        actionBlock={
          <div className="flex">
            <Button
              className="ml-4"
              label="Report"
              style="text"
              onClick={() => (window.location.href = "/quiz/report")}
            />
            <Button className="ml-4" label={userName} style="text" />
            <Button
              className="ml-4 mr-8"
              label="LogOut"
              onClick={handleLogout}
              style="text"
            />
          </div>
        }
        title={<div className="ml-4">Quizzy</div>}
      />
    </>
  );
};

export default NavBar;
