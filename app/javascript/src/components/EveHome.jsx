import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { isNil } from "ramda";
import { useHistory, useParams } from "react-router";

import quizzesApi from "../apis/quizzes";

function EveHome() {
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const { slug } = useParams(slug);
  const [validSlug, setSlug] = useState();

  const fetchData = async () => {
    setLoading(true);
    const response = await quizzesApi.showSlugHeader(slug);
    setSlug(response.data.quiz.id);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-64">
        <PageLoader text="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <div className="border-b-2">
        <Header title="Quizzy" className="ml-10" />
      </div>
      <div>
        {isNil(validSlug) ? (
          <div className="flex justify-center items-center ">
            <Typography style="h2" className="mt-64">
              Quiz does not exist!
            </Typography>
          </div>
        ) : (
          history.push(`/public/${slug}/attempts/new`)
        )}
      </div>
    </div>
  );
}

export default EveHome;
