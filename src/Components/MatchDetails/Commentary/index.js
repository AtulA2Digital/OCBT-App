import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { postAPIHandler } from "../../../Api";
import "./style.css";

const Commentary = ({ status }) => {
  const { matchId } = useParams();
  const [liveInfo, setLiveInfo] = useState(null);
  // console.log("liveInfo - ", liveInfo);
  const [commentaries, setCommentaries] = useState({});
  // console.log("commentaries - ", commentaries);
  // console.log("Match Status - ", status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    GetLiveMatchInfo(matchId);

    setTimeout(() => {
      GetCommentary(matchId);
    }, 1000);

    const interval = setInterval(() => {
      GetLiveMatchInfo(matchId);
      GetCommentary(matchId);
    }, 5000);

    return () => clearInterval(interval);
  }, [matchId]);

  const GetCommentary = async (val) => {
    const formData = new FormData();
    formData.append("match_id", val);
    const response = await postAPIHandler("commentary", formData);
    setCommentaries(response.data);
    setLoading(false);
  };
  // Match Live Info--------------
  const GetLiveMatchInfo = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("liveMatch", formData);
    // console.log("response-->", response);
    setLiveInfo(response.data);
  };

  if (loading)
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#002D4B" }} />
      </Box>
    );
    
  const renderCommentaryByOver = (overData, overName, inning) => {
    const incrementedOverName = parseInt(overName, 10) + 1;
    return (
      <div className="mb-4">
        {/* Over Name---------------- */}
        <div className="bg-gradient-to-r from-[#002D4B] to-[#000] rounded-lg py-2 px-4 d-flex justify-between mb-2 flex-wrap ">
          <h4 className="mb-0 mobile-50">
            <span>{incrementedOverName} Over</span>
            {overData.length > 0 && !overData[0].data.overs ? (
              <>
                <span className="font-[400] text-[14px] d-block">
                  {" "}
                  Runs Scored: {overData[0].data.runs}
                </span>
              </>
            ) : (
              <span className="font-[400] text-[14px] d-block">Last Over</span>
            )}
          </h4>
          {/* Team Score---- */}
          <div className="mobile-50">
            {overData.length > 0 && !overData[0].data.overs && (
              <>
                <span className="font-[400] text-[14px] d-block">
                  {" "}
                  Score after {overData[0].data.over} overs
                </span>
                <span className="font-[600] text-[14px] d-block">
                  {overData[0].data.team} {overData[0].data.team_score}-
                  {overData[0].data.team_wicket}
                </span>
              </>
            )}
          </div>
          {/* Player Score---- */}
          <div className="mobile-50">
            {overData.length > 0 && !overData[0].data.overs && (
              <>
                <span className="font-[400] text-[14px] d-block">
                  {overData[0].data.batsman_1_name}{" "}
                  {overData[0].data.batsman_1_runs} (
                  {overData[0].data.batsman_1_balls})
                </span>
                <span className="font-[400] text-[14px] d-block">
                  {overData[0].data.batsman_2_name}{" "}
                  {overData[0].data.batsman_2_runs} (
                  {overData[0].data.batsman_2_balls})
                </span>
              </>
            )}
          </div>
          {/* Bowler Score---- */}
          <div className="mobile-50">
            {overData.length > 0 && !overData[0].data.overs && (
              <>
                <span className="font-[400] text-[14px] d-block">
                  {overData[0].data.bolwer_name}
                </span>
                <span className="font-[400] text-[14px] d-block">
                  {overData[0].data.bolwer_overs}-
                  {overData[0].data.bolwer_maidens}-
                  {overData[0].data.bolwer_runs}-
                  {overData[0].data.bolwer_wickets}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Over By Over--------------- */}
        {(overData[0].data.overs ? overData : overData.slice(1)).map(
          (comment, index) => {
            return (
              <div
                key={index}
                className="border-b-[1px] border-[#002D4B2b] mb-2 flex gap-4 text-[#002D4B] "
              >
                <span>
                  <strong className="text-[#002D4B]">
                    {comment.data.overs}
                  </strong>
                </span>
                <p className="font-[400]">
                  {comment.data.title}, {/* Run */}{" "}
                  {comment.data.runs === "0" ? (
                    <span className="">no run, </span>
                  ) : comment.data.runs === "4" ? (
                    <span className="font-[600]">FOUR, </span>
                  ) : comment.data.runs === "6" ? (
                    <span className="font-[600]">SIX, </span>
                  ) : (
                    <span className="">{comment.data.runs} runs, </span>
                  )}
                  <span className="font-[600]">
                    {comment.data.wides > "0" ? "WIDE, " : ""}
                    {comment.data.wicket > "0" ? "WICKET, " : ""}
                    {comment.data.noballs > "0" ? "NO BALL, " : ""}
                    {comment.data.legbyes > "0" ? "Leg Byes, " : ""}
                    {comment.data.byes > "0" ? "Byes, " : ""}
                  </span>
                  {/* <span>{comment.data.description.length > 0 ? ", " : ""}</span> */}
                  <span className="">{comment.data.description}</span>
                </p>
              </div>
            );
          }
        )}
      </div>
    );
  };

  const firstInning = commentaries["1 Inning"]
    ? Object.entries(commentaries["1 Inning"]).map(
      ([overName, overDetails], ind) => (
        <div key={ind}>
          {renderCommentaryByOver(overDetails, overName, "1 Inning")}
        </div>
      )
    )
    : null;
  const secondInning = commentaries["2 Inning"]
    ? Object.entries(commentaries["2 Inning"]).map(
      ([overName, overDetails], ind) => {
        return (
          <div key={ind}>
            {renderCommentaryByOver(overDetails, overName, "2 Inning")}
          </div>
        );
      }
    )
    : null;
  const thirdInning = commentaries["3 Inning"]
    ? Object.entries(commentaries["3 Inning"]).map(
      ([overName, overDetails], ind) => {
        return (
          <div key={ind}>
            {renderCommentaryByOver(overDetails, overName, "3 Inning")}
          </div>
        );
      }
    )
    : null;
  const fourthInning = commentaries["4 Inning"]
    ? Object.entries(commentaries["4 Inning"]).map(
      ([overName, overDetails], ind) => {
        return (
          <div key={ind}>
            {renderCommentaryByOver(overDetails, overName, "4 Inning")}
          </div>
        );
      }
    )
    : null;
  const hasFirstInning = firstInning && firstInning.length > 0;
  const hasSecondInning = secondInning && secondInning.length > 0;
  const hasThirdInning = thirdInning && secondInning.length > 0;
  const hasFourthInning = fourthInning && secondInning.length > 0;
  // console.log("secondInning - ", secondInning);
  return (
    <>
      {commentaries.length !== 0 ? (
        <div className="py-6 mx-md-4 mx-2">
          <p className="text-[#002D4B] text-[38px] font-semibold pb-4 text-center">
            <span className="bottom-line bottom-line-big">Commentary</span>
          </p>
          
          {/* Commentary---------------- */}
          <div className="d-flex justify-between flex-wrap">
            {hasFourthInning && (
              <div className={` ${hasFourthInning ? "xl:w-[48%] w-full" : ""}`}>
                <h3 className="text-md-start text-center uppercase mb-4 text-[#002D4B]">
                  4rth Inning
                </h3>
                {fourthInning}
              </div>
            )}
            {hasThirdInning && (
              <div className={` ${hasThirdInning ? "xl:w-[48%] w-full" : ""}`}>
                <h3 className="text-md-start text-center uppercase mb-4 text-[#002D4B]">
                  3rd Inning
                </h3>
                {thirdInning}
              </div>
            )}
            {hasSecondInning && (
              <div className={` ${hasSecondInning ? "xl:w-[48%] w-full" : ""}`}>
                <h3 className="text-md-start text-center uppercase mb-4 text-[#002D4B]">
                  2nd Inning
                </h3>
                {secondInning}
              </div>
            )}
            {hasFirstInning && (
              <div
                className={`test ${hasFirstInning ? "xl:w-[48%] w-full" : ""}`}
              >
                <h3 className="text-md-start text-center uppercase mb-4 text-[#002D4B]">
                  1st Inning
                </h3>
                {firstInning}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-white py-4 my-10 bg-[#242424] w-50 mx-auto rounded-lg">
          No Data Found
        </div>
      )}
    </>
  );
};

export default Commentary;
