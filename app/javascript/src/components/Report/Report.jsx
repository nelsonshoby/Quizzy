import React, { useEffect, useState } from "react";

import { Button } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { flatten } from "ramda";

import ReportTable from "./ReportTable";

import attemptApi from "../../apis/attempt";
import usersApi from "../../apis/user";
import NavBar from "../NavBar";

function Report() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [jobId, setJobId] = useState();
  const fetchAttempt = async () => {
    try {
      const response = await attemptApi.index();
      const data = flatten(response.data.attempt.quiz.map(ele => ele.report));
      setReportData(data);
    } catch (error) {
      logger.error(error);
    }
  };

  const handelDownload = async () => {
    try {
      setLoading(true);
      const response = await usersApi.report_export();
      const job_id = response.data.jid;
      setJobId(job_id);
      const interval = setInterval(async () => {
        const job_status = await usersApi.report_export_status(job_id);
        if (job_status.data.status === "complete") {
          setLoading(false);
          clearInterval(interval);
        }
      }, 1000);
      setPageLoader(true);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchAttempt();
  }, []);

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="flex justify-center items-cente mt-64">
          <PageLoader text="Your report is being prepared for downloading" />
        </div>
      </div>
    );
  }

  const download = () => {
    if (!loading) {
      window.location.href = `/export_download/${jobId}`;
      setPageLoader(false);
    }
  };

  if (pageLoader) {
    return (
      <div>
        <NavBar />
        <div className="flex justify-center items-center mt-64">
          <div className="flex-col">
            <Typography style="h3">Report is now ready to download</Typography>
            <div className="flex justify-center items-center">
              <Button
                label="Download"
                style="secondary"
                className="mt-4"
                onClick={() => download()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="mx-24 mt-8">
        <Header
          actionBlock={
            <Button
              label="Download"
              style="secondary"
              onClick={() => handelDownload()}
            />
          }
          title="Reports"
        />

        <ReportTable data={reportData} />
      </div>
    </div>
  );
}

export default Report;
