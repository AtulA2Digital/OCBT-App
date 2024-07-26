import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postAPIHandler } from "../../../Api";

const Scoreboard = () => {
  const { matchId } = useParams();
  const [teamScoreCard, setTeamScoreCard] = useState([]);
  // console.log("teamScoreCard - ", teamScoreCard);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      GetTeamScorecard(matchId);
    }, 1000);
  }, [matchId]);

  const GetTeamScorecard = async (val) => {
    const formData = new FormData();
    formData.append("match_id", val);
    const response = await postAPIHandler("scorecardByMatchId", formData);
    // console.log("scorecardByMatchId resp - ", response);
    setTeamScoreCard(response.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#002D4B" }} />
      </Box>
    );
  }

  return (
    <div className="py-6 mx-md-4 mx-2">
      <p className="text-[#002D4B] text-[38px] font-semibold pb-4 text-center mb-0">
        <span className="bottom-line bottom-line-big">Scorecard</span>
      </p>

      {teamScoreCard.length !== 0 ? (
        <>
          <h3 className="text-[#f56363] text-center">
            {" " + teamScoreCard.result}
          </h3>
          {Object.values(teamScoreCard.scorecard).map((team, ind) => {
            return (
              <div className="mt-5" key={ind}>
                <div
                  className="rounded-lg py-3 mb-6"
                >
                  <p className="text-black md:text-[30px] text-[24px] font-semibold mb-0 flex flex-wrap justify-center">
                    <img
                      src={team.team.flag}
                      alt="team"
                      className="w-[50px] h-[50px] rounded-full object-cover border-[#00000047] border-2 shadow-xl shadow-[#f56363]"
                    />
                    <span className="hidden sm:block text-center ps-2">
                      {team.team.name}
                    </span>
                    <span className="sm:hidden block text-center ps-2">
                      {team.team.short_name}
                    </span>
                    <span className="text text-center ps-2 text-[18px] flex items-center text-[#002D4B]">
                      ( Match Inning:{" "}
                      {team.team.inning === 1
                        ? team.team.inning + "st "
                        : team.team.inning === 2
                          ? team.team.inning + "nd "
                          : team.team.inning + "rd "}
                      )
                    </span>
                  </p>
                </div>
                <div className="flex w-100 justify-between flex-wrap">
                  <div className="bg-[#242424] mb-lg-0 mb-4 rounded-lg lg:w-[49%] w-[100%]  group pb-4">
                    <div
                      className="bg-gradient-to-r from-[#002D4B] to-[#141815] py-3 px-4 "
                      style={{ borderRadius: "10px 10px 0 0" }}
                    >
                      <h3 className="text-white text-[18px] font-bold">
                        Batting
                      </h3>
                    </div>
                    <div className="squad-wrapper">
                      <div className="flex flex-wrap text-[#ffffff6e] justify-between py-3 my-3 px-2 rounded-lg mx-[2%] border-2 border-[#252927]">
                        <p className="mb-0 sm:w-[50] w-[40%]">Name</p>
                        <div className="flex justify-between sm:w-[50] w-[60%]">
                          <span>R</span>
                          <span>B</span>
                          <span>4s</span>
                          <span>6s</span>
                          <span>SR</span>
                        </div>
                      </div>
                      {/* Batsman List-------- */}
                      {team.batsman.map((batsman, ind) => {
                        return (
                          <div
                            className="px-2 mx-[2%] border-b-2 border-[#252927] pb-2 my-3"
                            key={ind}
                          >
                            <div
                              key={ind}
                              className="flex flex-wrap justify-between"
                            >
                              <p className="mb-0 sm:w-[50] w-[40%]">
                                {batsman.name}{" "}
                                {batsman.out_by === "not out" && "*"}
                              </p>
                              {/* <div className="md:space-x-8 space-x-4"> */}
                              <div className="flex justify-between sm:w-[50] w-[60%]">
                                <span>{batsman.run}</span>
                                <span>{batsman.ball}</span>
                                <span>{batsman.fours}</span>
                                <span>{batsman.sixes}</span>
                                <span>{batsman.strike_rate}</span>
                              </div>
                            </div>
                            <p className="text-[#ffffff6e] text-[14px] mb-0">
                              {batsman.out_by}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Fall Of Wickets--- */}
                    <div className="bg-[#181919] py-3 px-4 mx-3 rounded-lg mt-4">
                      <h4 className="text-white text-[16px] font-bold mb-0">
                        Fall Of Wickets
                      </h4>
                    </div>
                    {/* FOW Details--------- */}
                    <div className="mt-4 px-4 flex flex-wrap gap-3">
                      {team.fallwicket &&
                        team.fallwicket.map((fowDetails, ind) => {
                          return (
                            <p
                              className="mb-0 text-[#fff] sm:w-[47%]"
                              key={ind}
                            >
                              {fowDetails.score + " - " + fowDetails.wicket}{" "}
                              <span className="text-[15px] text-[#ffffffa3]">
                                ({fowDetails.player + ", " + fowDetails.over})
                              </span>
                            </p>
                          );
                        })}
                    </div>
                  </div>
                  <div className="bg-[#242424] mb-lg-0 mb-4 rounded-lg lg:w-[49%] w-[100%] group pb-4">
                    <div
                      className="bg-gradient-to-r from-[#002D4B] to-[#141815] py-3 px-4 "
                      style={{ borderRadius: "10px 10px 0 0" }}
                    >
                      <h3 className="text-white text-[18px] font-bold">
                        Bowling
                      </h3>
                    </div>
                    <div className="squad-wrapper">
                      <div className="flex flex-wrap text-[#ffffff6e] justify-between py-3 my-3 px-2 rounded-lg mx-[2%] border-2 border-[#252927]">
                        <p className="mb-0 sm:w-[50] w-[40%]">Name</p>
                        <div className="flex justify-between sm:w-[50] w-[60%]">
                          <span>O</span>
                          <span>M</span>
                          <span>R</span>
                          <span>W</span>
                          <span>ER</span>
                        </div>
                      </div>
                      {/* Bowler List--------- */}
                      {team.bolwer.map((bolwer, ind) => {
                        return (
                          <div
                            key={ind}
                            className="flex flex-wrap justify-between  pb-2 my-3 px-2  mx-[2%] border-b-2 border-[#252927]"
                          >
                            <p className="mb-0 sm:w-[50] w-[40%]">
                              {bolwer.name}
                            </p>
                            <div className="flex justify-between sm:w-[50] w-[60%]">
                              <span>{bolwer.over}</span>
                              <span>{bolwer.maiden}</span>
                              <span>{bolwer.run}</span>
                              <span>{bolwer.wicket}</span>
                              <span>{bolwer.economy}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Extra---- */}
                    <div className="bg-[#181919] py-3 px-4 mx-3 rounded-lg mt-4 flex justify-between">
                      <h4 className="text-white text-[18px] font-bold mb-0">
                        Extra
                      </h4>
                      <p className="mb-0 text-[#ffffffa3]">
                        {team.team.extras}
                      </p>
                    </div>
                    {/* Total---- */}
                    <div className="bg-[#181919] py-3 px-4 mx-3 rounded-lg mt-2 flex justify-between">
                      <h4 className="text-white text-[16px] font-bold mb-0">
                        Total
                      </h4>
                      <p className="mb-0 text-[#ffffffa3]">
                        {team.team.score + " "} (
                        {team.team.wicket + " Wkts, " + team.team.over + " Ov"})
                      </p>
                    </div>
                    {/* partnership--- */}
                    <div className="partnership-wrapper">
                      <div className="bg-[#181919] py-3 px-4 mx-3 rounded-lg mt-4">
                        <h4 className="text-white text-[16px] font-bold mb-0">
                          Partnership
                        </h4>
                      </div>
                      <div className="mt-4 px-4 flex flex-wrap gap-3">
                        {team.partnership &&
                          team.partnership.map((parnership, ind) => {
                            return (
                              <p
                                className="mb-0 text-[#fff] sm:w-[47%]"
                                key={ind}
                              >
                                {parnership.run +
                                  " (" +
                                  parnership.ball +
                                  ")" +
                                  " - " +
                                  (ind + 1)}{" "}
                                <span className="text-[15px] text-[#ffffffa3]">
                                  ({parnership.players_name})
                                </span>
                              </p>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="text-center text-white py-4 my-10 bg-[#242424] w-50 mx-auto rounded-lg">
          No Data Found
        </div>
      )}
    </div>
  );
};

export default Scoreboard;
