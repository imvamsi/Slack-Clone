import React from "react";
import { Progress } from "semantic-ui-react";
const Progressbar = ({ uploadStatus, percentUploaded }) =>
  uploadStatus === "uploading" && (
    <Progress
      className="progressbar"
      percent={percentUploaded}
      progress
      indicating
      size="medium"
      inverted
    />
  );

export default Progressbar;
