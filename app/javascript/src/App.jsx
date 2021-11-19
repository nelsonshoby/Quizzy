import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import Login from "components/Login";

import CreateQuestion from "./components/CreateQuestion";
import EditQuestion from "./components/EditQuestion";
import EveHome from "./components/EveHome";
import EveRegistration from "./components/EveRegistration";
import Home from "./components/Home";
import QuizForm from "./components/QuizForm";
import QuizShowPage from "./components/QuizShowPage";
import Report from "./components/Report/Report";
import Result from "./components/Result";
import { getFromLocalStorage } from "./helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  loading;
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/about" render={() => <div>About</div>} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/quizShowpage/:id/show" component={QuizShowPage} />
        <Route exact path="/CreateQuestion/:id" component={CreateQuestion} />
        <Route exact path="/EditQuestion/:id" component={EditQuestion} />
        <Route exact path="/public/:slug" component={EveHome} />
        <Route exact path="/quiz/new" component={QuizForm} />
        <Route exact path="/quiz/report" component={Report} />
        <Route
          exact
          path="/public/:slug/:attemptId/result"
          component={Result}
        />
        <Route
          exact
          path="/public/:slug/attempts/new"
          component={EveRegistration}
        />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Home}
        />
      </Switch>
    </Router>
  );
};

export default App;
