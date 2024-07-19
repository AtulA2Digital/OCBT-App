import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postAPIHandler } from "../../Api";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const MatchDetails = () => {
  const [matchInfo, setMatchInfo] = useState(null);
  // console.log("matchInfo - ", matchInfo);
  const [liveInfo, setLiveInfo] = useState(null);
  const [matchStatus, setMatchStatus] = useState("UPCOMING");
  const [countdown, setCountdown] = useState("00:00:00");
  // console.log("matchStatus - ", matchStatus);
  const { matchId, seriesId } = useParams();



  useEffect(() => {
    GetMatchInfo(matchId);
    GetLiveMatchInfo(matchId);

    const interval = setInterval(() => {
      GetLiveMatchInfo(matchId);
    }, 5000);

    return () => clearInterval(interval);
  }, [matchId]);

  // Countdown
  const calculateCountdown = (matchTime) => {
    const now = new Date();
    // const matchDate = new Date(matchInfo.data.match_date);
    const matchDate = new Date(now);
    // console.log("matchDate1 - ", matchDate);

    const [time, modifier] = matchTime.split(" ");
    let [hours, minutes] = time.split(":");
    hours =
      (modifier === "PM" ? parseInt(hours, 10) + 12 : parseInt(hours, 10)) % 24;

    matchDate.setHours(hours);
    matchDate.setMinutes(minutes);
    matchDate.setSeconds(0);

    // console.log("matchDate2 - ", matchDate);
    // console.log("now - ", now);
    const difference = matchDate - now;
    // console.log("difference - ", difference);

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return `Match Starts in: ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      if (
        matchInfo.data.result.length === 0 &&
        matchInfo.data.toss.length === 0
      ) {
        return "Details will appear once the match starts.";
      }
    }
  };

  useEffect(() => {
    if (
      matchInfo &&
      matchInfo.data &&
      matchInfo.data.match_time &&
      matchInfo.data.match_date
    ) {
      const timer = setInterval(() => {
        const timeLeft = calculateCountdown(
          matchInfo.data.match_date && matchInfo.data.match_time
        );
        // console.log("timeLeft - ", timeLeft);
        setCountdown(timeLeft);
      }, 1000);

      return () => clearInterval(timer); // Clear the interval on component unmount
    }
  }, [matchInfo]);

  // According to match(LIVE, UPCOMING, FINISHED)
  useEffect(() => {
    if (liveInfo) {
      if (liveInfo.result) {
        setMatchStatus("FINISHED");
      } else if (liveInfo.toss) {
        setMatchStatus("LIVE");
      } else {
        setMatchStatus("UPCOMING");
      }
    }
  }, [matchInfo]);

  // Match Live Info--------------
  const GetLiveMatchInfo = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("liveMatch", formData);
    // console.log("response-->", response);
    setLiveInfo(response.data);
  };

  // Match Info API-----------------
  const GetMatchInfo = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("matchInfo", formData);
    // console.log("response-->", response);
    setMatchInfo(response);
  };

  const capitalizeSentence = (sentence) => {
    // Split the sentence into words
    const words = sentence.toLowerCase().split(" ");

    // Capitalize each word's first letter
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the words back into a sentence
    return capitalizedWords.join(" ");
  };
  return (
    <>
      {matchInfo && (
        <>
          {/* Banner */}
          <div className="bg-gradient-to-r from-[#00395F] to-[#002944] py-5 mb-5">
            <p className="text-white md:text-[30px] text-[24px] font-semibold px-4 flex items-center justify-center gap-x-4 mb-0">
              {liveInfo?.team_a} vs {liveInfo?.team_b}, {matchInfo?.data.matchs}
            </p>
          </div>
          {/* Details */}
          <div className="pb-3 border-b-2 mb-4 border-[#e4e6eb] text-[#002D4B]">
            <div className="d-flex xl:w-[90%] w-[95%] mx-auto text-[18px] pb-2 justify-center gap-5">
              <span className="flex items-center gap-2">
                <CalendarMonthIcon
                  style={{ color: "#000", fontSize: "30px" }}
                />
                {matchInfo.data.match_date}
              </span>
              <span className="flex items-center gap-2">
                <AccessTimeFilledIcon
                  style={{ color: "#000", fontSize: "30px" }}
                />
                {matchInfo.data.match_time} IST
              </span>
              <span className="flex items-center gap-2">
                <SportsCricketIcon
                  style={{ color: "#000", fontSize: "30px" }}
                />
                {matchInfo.data.venue}
              </span>
              <span className="flex items-center gap-2">
                <EmojiEventsIcon style={{ color: "#000", fontSize: "30px" }} />
                {matchInfo.data.series}
              </span>
            </div>
          </div>
          {/* Match Status */}
          <div className="text-center">
            <span
              className={`d-inline-block p-1 py-2 rounded-md px-4 blink-button text-center font-[600]`}
              style={{
                background: matchStatus === "LIVE" ? "green" : "red",
              }}
            >
              {matchStatus}
            </span>
          </div>
          {/* Counter */}
          <div className="lg:text-[18px] text-[15px] text-center font-[600] pt-4 text-[#002D4B]">
            <span className="capitalize">
              {liveInfo.result.length > 0
                ? capitalizeSentence(liveInfo.result)
                : liveInfo.trail_lead
                  ? capitalizeSentence(liveInfo.trail_lead)
                  : liveInfo.toss.length > 0
                    ? capitalizeSentence(liveInfo.toss)
                    : countdown}
            </span>
          </div>
          {/* Teams Score */}
          {liveInfo && (
            <div className="text-[#002D4B] lg:w-[55%] w-[90%] mx-auto md:px-5 px-[20px] py-5 flex justify-between">
              <div className="mb-4 pb-2">
                <div className="flex items-center gap-2">
                  <img
                    className=" w-[60px] h-[60px] rounded-lg object-cover shadow-lg shadow-[#bfb4b4] border-2 border-[#00000012"
                    src={liveInfo.team_a_img}
                  />
                  <p className="lg:text-[24px] text-[15px] font-[600] mb-0">
                    {liveInfo.team_a}
                  </p>
                </div>
                <p className="mb-0 mt-4">
                  <span className="lg:text-[22px] text-[15px] font-[600] mb-0">
                    {liveInfo.team_a_scores ? (
                      liveInfo.team_a_scores_over.map((score, ind) => {
                        return (
                          <span key={ind}>
                            {ind === 1 && <span>&</span>}
                            {score.score + " (" + score.over + ")"}
                          </span>
                        );
                      })
                    ) : (
                      <span className="lg:text-[18px] text-[15px]">
                        No Data
                      </span>
                    )}
                  </span>
                </p>
              </div>
              <div className="mb-4 pb-2">
                <div className="flex items-center gap-2">
                  <img
                    className=" w-[60px] h-[60px] rounded-lg object-cover shadow-lg shadow-[#bfb4b4] border-2 border-[#00000012]"
                    src={liveInfo.team_b_img}
                  />
                  <p className="lg:text-[24px] text-[15px] font-[600] mb-0">
                    {liveInfo.team_b}
                  </p>
                </div>
                <p className="mb-0 mt-4">
                  <span className="lg:text-[22px] text-[15px] font-[600] mb-0">
                    {liveInfo.team_b_scores ? (
                      liveInfo.team_b_scores_over.map((score, ind) => {
                        return (
                          <span key={ind}>
                            {ind === 1 && <span> & </span>}
                            {score.score + " (" + score.over + ")"}
                          </span>
                        );
                      })
                    ) : (
                      <span className="lg:text-[18px] text-[15px]">
                        No Data
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MatchDetails;
