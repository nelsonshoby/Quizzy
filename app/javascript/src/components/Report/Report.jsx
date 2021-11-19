import React, { useEffect, useState } from "react";

import { Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { flatten } from "ramda";

import ReportTable from "./ReportTable";

import attemptApi from "../../apis/attempt";
import NavBar from "../NavBar";

function Report() {
  const [reportData, setReportData] = useState([]);
  const fetchAttempt = async () => {
    try {
      const response = await attemptApi.index();
      const data = flatten(response.data.attempt.quiz.map(ele => ele.report));
      setReportData(data);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchAttempt();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="m-16">
        <Header actionBlock={<Button label="Download" />} title="Reports" />

        <ReportTable data={reportData} />
      </div>
    </div>
  );
}

export default Report;
