import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { postAPIHandler } from "../../../Api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const MatchInfo = ({ status }) => {
  // Match Info Api Variable
  const { matchId, team_a_id, team_b_id, seriesId } = useParams();
  const [matchInfo, setMatchInfo] = useState(null);
  // console.log("matchInfo - ", matchInfo);
  const [playing11, setPlaying11] = useState(null);
  const [MOTS, setMOTS] = useState();
  // console.log("MOTS - ", MOTS);
  const [loading, setLoading] = useState(false);

  // console.log("status - ", status);
  // Match Info API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      GetMatchDetails(matchId);
      GetPlaying11(matchId);
      GetMOTS();
    }, 1000);
  }, [matchId]);

  const totalMatches = matchInfo && matchInfo.data.head_to_head.matches.length;
  // console.log("totalMatches - ", totalMatches);
  const winCountA = matchInfo && matchInfo.data.head_to_head.team_a_win_count;
  const winCountB = matchInfo && matchInfo.data.head_to_head.team_b_win_count;

  function formatProgress(value) {
    // Check if the number has a fractional part
    if (value % 1 !== 0) {
      return parseFloat(value.toFixed(2)); // Show 2 decimal places, then convert back to number
    } else {
      return value; // Show as a whole number
    }
  }

  let progress1 = (winCountA * 100) / totalMatches;
  progress1 = formatProgress(progress1);
  let progress2 = (winCountB * 100) / totalMatches;
  progress2 = formatProgress(progress2);
  // console.log("progress - ", progress1 + ", " + progress2);

  const GetMatchDetails = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("matchInfo", formData);
    // console.log("response-->", response);
    setMatchInfo(response);
    setLoading(false);
  };

  const GetPlaying11 = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("playingXiByMatchId", formData);
    // console.log("GetPlaying11 response-->", response);
    setPlaying11(response.data);
    setLoading(false);
  };

  const GetMOTS = async () => {
    const formData = new FormData();
    formData.append("series_id", seriesId);

    const response = await postAPIHandler("manOfTheSeries", formData);
    // console.log("GetMOTS response-->", response.data, response.data.length);

    setMOTS(response.data);
  };

  const Playing11Data = (team) => {
    // console.log("Playing11Data called");
    return (
      <div className="playing-11-wrapper mt-2 xl:w-[48%] w-[100%] lg:mb-0 mb-4">
        <div className="flex items-center justify-center gap-3 team-details">
          <img
            src={team.flag}
            alt="team img"
            className="rounded-full w-[50px] h-[50px] object-cover shadow-xl shadow-[#000]"
          />
          <p className="team-name text-[24px] font-bold text-[#f56363] mb-0 md:block hidden">
            {team.name}
          </p>
          <p className="team-name text-[24px] font-bold text-[#f56363] mb-0 md:hidden block">
            {team.short_name}
          </p>
        </div>
        <div className="players-data mt-5 flex justify-between flex-wrap gap-y-5">
          {team.player.map((data, ind) => {
            return (
              <div
                className="player-details text-center xl:w-[33%] md:w-[24%] w-[49%]"
                key={ind}
              >
                <img
                  src={data.image}
                  alt="player"
                  className="rounded-full w-[80px] h-[80px] object-cover mx-auto object-top border-1 border-[#0000004f]"
                />
                <h5 className="team-name mt-2 mb-0 font-500">{data.name}</h5>
                <p className="text-[14px] text-[#ffffffa8]">{data.play_role}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Progress Bar According Devices-------------------
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  };

  const size = useWindowSize();
  // console.log("display size - ", size);
  const isMobile = size.width < 768;
  const progress1Width = isMobile
    ? `${progress1 === 0 || progress2 === 0
      ? progress1 + "%"
      : progress1 > progress2
        ? "60%"
        : "40%"
    }`
    : `${progress1}%`;
  const progress2Width = isMobile
    ? `${progress1 === 0 || progress2 === 0
      ? progress2 + "%"
      : progress2 > progress1
        ? "60%"
        : "40%"
    }`
    : `${progress2}%`;
  return (
    <>
      {matchInfo ? (
        <div className="py-8">
          {/* Playing 11 */}
          {status !== "UPCOMING" &&
            playing11 !== null &&
            playing11.length === undefined && (
              <div className="md:mb-10 mb-6 pt-5 lg:pb-5 pb-0 mx-md-4 mx-2 px-3 gap-10 bg-[#002D4B] rounded-[18px]">
                <div className="space-y-4 ">
                  <p className="text-white text-[28px] font-semibold pb-4 text-center">
                    <span className="bottom-line">Match Playing XI</span>
                  </p>
                  <div className="team-wrapper d-flex justify-between flex-wrap">
                    {Playing11Data(playing11 && playing11.team_a)}
                    {Playing11Data(playing11 && playing11.team_b)}
                  </div>
                </div>
              </div>
            )}

          {/* Team Comparison */}
          <div className="mx-md-4 mx-2 py-5 md:px-[30px] px-[20px] bg-[#002D4B] rounded-[18px] md:mb-10 mb-6">
            <div>
              <p className="text-white text-[28px] font-semibold pb-2 text-center">
                <span className="bottom-line">Team Comparison</span>
              </p>
              <p className="text-sm text-[#ffffffa8] text-center pb-4">
                (Last 10 Matches)
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 mb-5">
              <div className="flex md:items-center items-start md:flex-row flex-col gap-3 w-[50%]">
                <img alt=""
                  className="w-[50px] h-[50px] rounded-full shadow-xl shadow-[#000]"
                  src={matchInfo.data.team_a_img}
                />
                <div className="">
                  <p className="text-[24px] font-bold text-[#f56363] mb-2 lg:block hidden">
                    {matchInfo.data.team_a}
                  </p>
                  <p className="text-[24px] font-bold text-[#f56363] mb-2 lg:hidden block">
                    {matchInfo.data.team_a_short}
                  </p>
                  <p className="-mt-1 flex items-center gap-1 text-[#ffffffa8] text-sm font-medium mb-0">
                    vs All Teams
                  </p>
                </div>
              </div>
              <div className="flex md:items-center items-end md:flex-row flex-col justify-end gap-3 w-[50%]">
                <img alt=""
                  className="w-[50px] h-[50px] rounded-full md:hidden block shadow-xl shadow-[#000]"
                  src={matchInfo.data.team_b_img}
                />
                <div className="flex flex-col ">
                  <p className="text-[24px] font-bold text-[#f56363] mb-2 lg:block hidden">
                    {matchInfo.data.team_b}
                  </p>
                  <p className="text-[24px] font-bold text-[#f56363] mb-2 lg:hidden block text-right">
                    {matchInfo.data.team_b_short}
                  </p>
                  <p className="-mt-1 flex items-center gap-1 text-[#ffffffa8] text-sm font-medium mb-0">
                    vs All Teams
                  </p>
                </div>
                <img alt=""
                  className="w-[50px] h-[50px] rounded-full md:block hidden shadow-xl shadow-[#000]"
                  src={matchInfo.data.team_b_img}
                />
              </div>
            </div>

            <div className="flex justify-between items-center bg-gradient-to-r from-[#000] via-[#23252500] to-[#000] px-[6%] py-3 rounded-[6px] my-4">
              <div className="text-[#fff] text-[20px] font-medium">
                {matchInfo.data.team_comparison.team_a_win}
              </div>
              <div>
                <p className="text-[#f56363] text-[16px] font-[600] mb-0">Win</p>
              </div>
              <div className="text-[#fff] text-[20px] font-medium">
                {matchInfo.data.team_comparison.team_b_win}
              </div>
            </div>
            <div className="flex justify-between items-center bg-gradient-to-r from-[#000] via-[#23252500] to-[#000] px-[6%] py-3 rounded-[6px] my-4">
              <div className="text-[#fff] text-[20px] font-medium">
                {matchInfo.data.team_comparison.team_a_avg_score}
              </div>
              <div>
                <p className="text-[#f56363] text-[16px] font-[600] mb-0">
                  Avg Score
                </p>
              </div>
              <div className="text-[#fff] text-[20px] font-medium">
                {" "}
                {matchInfo.data.team_comparison.team_b_avg_score}
              </div>
            </div>
            <div className="flex justify-between items-center bg-gradient-to-r from-[#000] via-[#23252500] to-[#000] px-[6%] py-3 rounded-[6px] my-4">
              <div className="text-[#fff] text-[20px] font-medium">
                {matchInfo.data.team_comparison.team_a_high_score}
              </div>
              <div>
                <p className="text-[#f56363] text-[16px] font-[600] mb-0">
                  Highest Score
                </p>
              </div>
              <div className="text-[#fff] text-[20px] font-medium">
                {matchInfo.data.team_comparison.team_b_high_score}
              </div>
            </div>
            <div className="flex justify-between items-center bg-gradient-to-r from-[#000] via-[#23252500] to-[#000] px-[6%] py-3 rounded-[6px] my-4">
              <div className="text-[#fff] text-[20px] font-medium">
                {matchInfo.data.team_comparison.team_a_low_score}
              </div>
              <div>
                <p className="text-[#f56363] text-[16px] font-[600] mb-0">
                  Lowest Score
                </p>
              </div>
              <div className="text-[#fff] text-[20px] font-medium">
                {matchInfo.data.team_comparison.team_b_low_score}
              </div>
            </div>
          </div>

          {/* Head To Head */}
          <div className="mx-md-4 mx-2 rounded-[18px] md:mb-10 mb-6 py-5 md:px-[30px] px-[20px] bg-[#002D4B]">
            <div>
              <p className="text-white text-[28px] font-semibold pb-2 text-center">
                <span className="bottom-line">Head to Head</span>
              </p>
              <p className="text-sm text-[#ffffffa8] text-center pb-4">
                (Since Sept 2023)
              </p>
            </div>
            <div className="flex justify-between ">
              <div className="flex md:items-center items-start gap-3 md:flex-row flex-col">
                <img alt=""
                  className="w-[50px] h-[50px] rounded-full shadow-xl shadow-[#000]"
                  src={matchInfo.data.team_a_img}
                />
                <p className="text-[24px] font-bold text-[#f56363] mb-0 lg:block hidden">
                  {matchInfo.data.team_a}
                </p>
                <p className="text-[24px] font-bold text-[#f56363] mb-0 lg:hidden block">
                  {matchInfo.data.team_a_short}
                </p>
              </div>
              <div className="rounded-full bg-[#f56363] flex items-center justify-center w-[40px] h-[40px] text-white font-bold">
                Vs
              </div>
              <div className="flex md:items-center items-end gap-3 md:flex-row flex-col">
                <img alt=""
                  className="w-[50px] h-[50px] rounded-full md:hidden block shadow-xl shadow-[#000]"
                  src={matchInfo.data.team_b_img}
                />
                <p className="text-[24px] font-bold text-[#f56363] mb-0 lg:block hidden">
                  {matchInfo.data.team_b}
                </p>
                <p className="text-[24px] font-bold text-[#f56363] mb-0 lg:hidden block">
                  {matchInfo.data.team_b_short}
                </p>
                <img alt=""
                  className="w-[50px] h-[50px] rounded-full md:block hidden shadow-xl shadow-[#000]"
                  src={matchInfo.data.team_b_img}
                />
              </div>
            </div>
            {/* Progress Bar */}
            <div
              // className="flex items-center"
              style={{
                width: "100%",
                // height: "12px",
                backgroundColor: "#f5636333",
                borderRadius: "10px",
                overflow: "hidden",
                margin: "40px 10px 0 10px",
                minHeight: "20px",
              }}
            >
              {totalMatches === 0 ? (
                <div
                  className="text-center text-[14px]"
                  style={{
                    paddingTop: "1px",
                    paddingBottom: "3px",
                  }}
                >
                  No Data Available
                </div>
              ) : (
                <>
                  <div
                    style={{
                      height: "100%",
                      transition: "width 0.3s ease",
                      width: progress1Width,
                      backgroundColor: "#706d6d",
                    }}
                    className="float-start"
                  >
                    <span
                      className={`text-[14px] font-[800] ps-2 text-white ${progress1 > 0 ? "block" : "hidden"
                        }`}
                    >
                      {progress1}% {matchInfo.data.team_a_short}
                    </span>
                  </div>
                  <div
                    style={{
                      height: "100%",
                      transition: "width 0.3s ease",
                      // width: `${progress2}%`,
                      width: progress2Width,
                      backgroundColor: "#fff",
                    }}
                    className={`float-end`}
                  >
                    <span
                      className={`text-[14px] font-[800] text-black text-end pe-2 ${progress2 > 0 ? "block" : "hidden"
                        } `}
                    >
                      {progress2}% {matchInfo.data.team_b_short}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className=" text-white my-4 flex justify-between md:px-5">
              <div>
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    background: "#706d6d",
                    display: "inline-block",
                  }}
                  className="me-2"
                ></span>{" "}
                {matchInfo.data.team_a_short}
              </div>
              WINNING %
              <div>
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    background: "#fff",
                    display: "inline-block",
                  }}
                  className="me-2"
                ></span>{" "}
                {matchInfo.data.team_b_short}
              </div>
            </div>
            {/* Win-Loss & Matches */}
            <div className="flex justify-between flex-wrap ">
              {/* Win-Loss--------- */}
              <div className="lg:w-[49%] w-[100%] bg-[#000] mx-auto rounded-[12px] md:px-6 px-[10px] py-4 xl:mb-0 md:mb-[20px]">
                <p className="text-[#ffffffa8] text-center py-2">Win - Loss</p>
                <div className="flex justify-between">
                  {/* section 1 */}
                  <div className="flex gap-4 md:flex-row flex-col flex-wrap w-[49%] justify-center">
                    <p className="text-md-center text-start mb-0 w-100">
                      {matchInfo.data.team_a_short}
                    </p>
                    <div className="flex gap-3">
                      <div className="z-40 border border-[#353535] rounded-full w-[24px] h-[24px] bg-[#3AB949] text-sm text-white flex justify-center items-center">
                        W
                      </div>
                      <div className="-ml-6 rounded-full w-[51px] h-[20px] m-auto bg-[#3AB949] text-sm text-white flex justify-end items-center ">
                        <span className="pr-3">{winCountA}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="z-40 border border-[#353535] rounded-full w-[24px] h-[24px] bg-[#f56363] text-sm text-white flex justify-center items-center">
                        L
                      </div>
                      <div className=" -ml-6 rounded-full w-[51px] h-[20px] m-auto bg-[#f56363] text-sm text-white flex justify-end items-center ">
                        <span className="pr-3"> {winCountB}</span>
                      </div>
                    </div>
                  </div>
                  {/* Section 2 */}
                  <div className="flex gap-4 md:flex-row flex-col flex-wrap w-[49%] justify-center">
                    <p className="text-md-center text-start mb-0 w-100">
                      {matchInfo.data.team_b_short}
                    </p>
                    <div className="flex gap-3">
                      <div className="z-40 border border-[#353535] rounded-full w-[24px] h-[24px] bg-[#3AB949] text-sm text-white flex justify-center items-center">
                        W
                      </div>
                      <div className=" -ml-6 rounded-full w-[51px] h-[20px] m-auto bg-[#3AB949] text-sm text-white flex justify-end items-center ">
                        <span className="pr-3"> {winCountB}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="z-40 border border-[#353535] rounded-full w-[24px] h-[24px] bg-[#f56363] text-sm text-white flex justify-center items-center">
                        L
                      </div>
                      <div className=" -ml-6 rounded-full w-[51px] h-[20px] m-auto bg-[#f56363] text-sm text-white flex justify-end items-center ">
                        <span className="pr-3">{winCountA}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Last Matches------ */}
              <div className="lg:w-[49%] w-[100%] bg-[#000] mx-auto rounded-[12px] md:px-6 px-[10px] py-4 md:block hidden">
                <p className="text-[#ffffffa8] py-2 flex justify-between mb-2">
                  <span className="w-[20%] text-start">Matches</span>
                  <span className="w-[20%] text-start">
                    {matchInfo.data.team_a_short} Team
                  </span>
                  <span className="w-[20%] text-start">
                    {matchInfo.data.team_b_short} Team
                  </span>
                  <span className="w-[40%] text-start">Result</span>
                </p>
                {matchInfo.data.head_to_head.matches.map((val, ind) => {
                  return (
                    <p
                      className="text-[#fff] flex justify-between text-[15px]"
                      key={ind}
                    >
                      <span className="w-[20%] text-start">{val.matchs}</span>
                      <span className="w-[20%] text-start">
                        {val.team_a_score + " (" + val.team_a_over + ")"}
                      </span>
                      <span className="w-[20%] text-start">
                        {val.team_b_score + " (" + val.team_b_over + ")"}
                      </span>
                      <span className="w-[40%] text-start">{val.result}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Umpire and Toss Comparision */}
          <div className="mx-md-4 mx-2 flex flex-wrap md:flex-row flex-col justify-between md:px-7 md:px-[30px] px-[20px] bg-[#002D4B] py-5 gap-6 bg-[#000000] rounded-[18px]">
            <div className="xl:w-[48.5%] w-[100%]">
              <div className="bg-[#000] border-2 rounded-[18px] border-[#000] py-4 md:px-7 px-3 w-[100%] md:mb-4 mb-[40px]">
                
                <div className="mb-4">
                  <p className="text-white text-[20px] pb-2">
                    <span className="bottom-line font-semibold">Toss Comparison</span> {" "}
                    <span className="text-sm text-[#ffffffa8] pb-4">
                  ( Last 5 matches)
                  </span>
                  </p>
                  
                </div>

                <div className="flex items-center justify-between p-2 border-2 border-[#252927] rounded-[6px] mb-2 ">
                  <div className="flex items-center gap-2 md:p-2">
                    <img alt=""
                      className="w-[30px] h-[30px] rounded-full shadow-xl shadow-[#000]"
                      src={matchInfo.data.team_a_img}
                    />
                    <p className="text-[16px] text-[#fff] font-[500] mb-0 lg:block hidden">
                      {matchInfo.data.team_a}
                    </p>
                    <p className="text-[16px] text-[#fff] font-[500] mb-0  lg:hidden block">
                      {matchInfo.data.team_a_short}
                    </p>
                  </div>
                  <div className="text-[16px] text-[#fff] flex gap-1">
                    {matchInfo.data.toss_comparison.team_a.map(
                      (result, index) => (
                        <p
                          key={index}
                          className={`text-white mb-0 rounded-full w-[25px] flex items-center justify-center ${result === "W"
                            ? "bg-[#3AB949]"
                            : result === "L"
                              ? "bg-[#f56363]"
                              : ""
                            }`}
                        >
                          {result}
                        </p>
                      )
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border-2 border-[#252927] rounded-[6px] ">
                  <div className="flex items-center gap-2 md:p-2">
                    <img alt=""
                      className="w-[30px] h-[30px] rounded-full"
                      src={matchInfo.data.team_b_img}
                    />
                    <p className="text-[16px] text-[#fff] font-[500] mb-0 lg:block hidden">
                      {matchInfo.data.team_b}
                    </p>
                    <p className="text-[16px] text-[#fff] font-[500] mb-0 block lg:hidden">
                      {matchInfo.data.team_b_short}
                    </p>
                  </div>
                  <div className="text-[16px] text-[#fff] flex gap-1">
                    {matchInfo.data.toss_comparison.team_b.map(
                      (result, index) => (
                        <p
                          key={index}
                          className={`text-white mb-0 rounded-full w-[25px] flex items-center justify-center ${result === "W"
                            ? "bg-[#3AB949]"
                            : result === "L"
                              ? "bg-[#f56363]"
                              : ""
                            }`}
                        >
                          {result}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-[#000] border-2 rounded-[18px] border-[#000] py-4 md:px-7 px-3 w-[100%] ">
                <p className="text-white text-[20px] font-semibold pb-2">
                  Recent Forms{" "}
                  <span className="text-sm text-[#677375]">
                    ( Last 5 matches)
                  </span>
                </p>
                <div className="flex items-center justify-between p-2 border-2 border-[#252927] rounded-[6px] mb-2 ">
                  <div className="flex items-center gap-2 md:p-2">
                    <img alt=""
                      className="w-[30px] h-[30px] rounded-full "
                      src={matchInfo.data.team_a_img}
                    />
                    <p className="text-[16px] text-[#fff] font-[500] mb-0 lg:block hidden">
                      {matchInfo.data.team_a}
                    </p>
                    <p className="text-[16px] text-[#fff] font-[500] mb-0  lg:hidden block">
                      {matchInfo.data.team_a_short}
                    </p>
                  </div>
                  <div className="text-[16px] text-[#fff] flex gap-1">
                    {matchInfo.data.forms.team_a.map((result, index) => (
                      <p
                        key={index}
                        className={`text-white mb-0 rounded-full w-[25px] flex items-center justify-center ${result === "W"
                          ? "bg-[#3AB949]"
                          : result === "L"
                            ? "bg-[#f56363]"
                            : ""
                          }`}
                      >
                        {result}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border-2 border-[#252927] rounded-[6px] ">
                  <div className="flex items-center gap-2 md:p-2">
                    <img alt=""
                      className="w-[30px] h-[30px] rounded-full"
                      src={matchInfo.data.team_b_img}
                    />
                    <p className="text-[16px] text-[#fff] font-[500] mb-0 lg:block hidden">
                      {matchInfo.data.team_b}
                    </p>
                    <p className="text-[16px] text-[#fff] font-[500] mb-0 block lg:hidden">
                      {matchInfo.data.team_b_short}
                    </p>
                  </div>
                  <div className="text-[16px] text-[#fff] flex gap-1">
                    {matchInfo.data.forms.team_b.map((result, index) => (
                      <p
                        key={index}
                        className={`text-white mb-0 rounded-full w-[25px] flex items-center justify-center ${result === "W"
                          ? "bg-[#3AB949]"
                          : result === "L"
                            ? "bg-[#f56363]"
                            : ""
                          }`}
                      >
                        {result}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-[48.5%] w-[100%]">
              <div className=" border-2 rounded-[18px] border-[#002d4b3d] bg-[#000]">
                <div
                  className=" bg-gradient-to-r from-[#002d4b3d] to-[#000] w-[100%] py-3 rounded-t-[16px] md:px-7 px-3 flex items-center text-white font-medium 
          text-[20px]"
                >
                  <p className="mb-0">Umpire</p>
                </div>

                <div className="flex items-center justify-center py-4 gap-5 w-[100%] md:px-4 px-[10px]">
                  <div className="space-y-4 w-[100%]">
                    <div className="bg-[#002d4b3d] rounded-[6px] flex justify-between md:gap-10 gap-2 items-center md:px-4 px-[10px] py-3">
                      <p className="text-[#ffffffa8] text-[14px] mb-0 font-[600]">
                        Match Umpires
                      </p>
                      <p className="text-[#fff] text-[14px] font-medium mb-0 text-end">
                        {matchInfo.data.umpire}
                      </p>
                    </div>
                    <div className="bg-[#002d4b3d] rounded-[6px] flex justify-between md:gap-10 gap-2 items-center md:px-4 px-[10px] py-3">
                      <p className="text-[#ffffffa8] text-[14px] mb-0 font-[600]">
                        3rd Umpire
                      </p>
                      <p className="text-[#fff] text-[14px] font-medium mb-0 text-end">
                        {matchInfo.data.third_umpire}
                      </p>
                    </div>
                    <div className="bg-[#002d4b3d] rounded-[6px] flex justify-between md:gap-10 gap-2 items-center md:px-4 px-[10px] py-3">
                      <p className="text-[#ffffffa8] text-[14px] mb-0 font-[600]">Referee</p>
                      <p className="text-[#fff] text-[14px] text-end font-medium mb-0">
                        {matchInfo.data.referee}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Box className="px-3 py-4 my-5 text-center">
          <CircularProgress style={{ color: "#002D4B" }} />
        </Box>
      )}
    </>
  );
};

export default MatchInfo;
