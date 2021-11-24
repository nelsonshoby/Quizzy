import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
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
  const [dataLoading, setDataLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [jobId, setJobId] = useState();
  const fetchAttempt = async () => {
    try {
      setDataLoading(true);
      const response = await attemptApi.index();
      const data = flatten(response.data.attempt.quiz.map(ele => ele.report));
      setReportData(data);
      setDataLoading(false);
    } catch (error) {
      logger.error(error);
      setDataLoading(false);
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

  if (dataLoading) {
    return (
      <div className="flex justify-center items-center mt-64">
        <PageLoader text="Loading..." />
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="flex justify-center items-center mt-64">
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
        <div className="flex justify-center items-center mt-64 border-gray-100 border-8 mx-64 shadow-xl pb-2 pt-2 ">
          <div className="flex-col">
            <Typography style="h3">Report is now ready to download</Typography>
            <div className="flex justify-center items-center ">
              <Button
                label="Download Report"
                icon={Download}
                style="secondary"
                iconPosition="left"
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
      {reportData.length != 0 ? (
        <div className="mx-24 mt-8">
          <Header
            actionBlock={
              <Button
                label="Download"
                icon={Download}
                style="secondary"
                iconPosition="left"
                onClick={() => handelDownload()}
              />
            }
            title="Reports"
          />

          <ReportTable data={reportData} />
        </div>
      ) : (
        <div className="flex justify-center items-center mt-64">
          <Typography style="h3">No reports available</Typography>
        </div>
      )}
    </div>
  );
}

export default Report;
