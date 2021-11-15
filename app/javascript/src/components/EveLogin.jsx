import React from "react";

import { Header } from "@bigbinary/neetoui/v2/layouts";
import { useParams } from "react-router";

function EveLogin() {
  const { slug } = useParams(slug);
  return (
    <div>
      <div className="border-b-2">
        <Header title="Quizzy" className="ml-10" />
      </div>
      <div>{slug}</div>
    </div>
  );
}

export default EveLogin;
