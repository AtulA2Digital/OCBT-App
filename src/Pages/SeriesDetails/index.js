import React, { useEffect, useState } from "react";
import { getAPIHandler, postAPIHandler } from "../../Api";
import { Link, useParams } from "react-router-dom";

const SeriesDetails = () => {
  const { seriesId, seriesName } = useParams();
  var FormData = require("form-data");
  const [seriesUpcommingData, setSeriesUpcommingData] = useState([]);
  const [seriesLiveMatches, setSeriesLiveMatches] = useState([]);
  const [countdownTimers, setCountdownTimers] = useState({});

  // Countdown
  const calculateCountdown = (matchDate, matchTime) => {
    const now = new Date();
    const matchDateTime = new Date(`${matchDate} 2024 ${matchTime}`);
    const difference = matchDateTime - now;

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      if (difference < 24 * 60 * 60 * 1000) { // Less than 24 hours
        return <span className="blink-button">{`Match Starts in: ${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</span>;
      } else {
        return "Match will be started soon";
      }
    } else {
      return <span className="text-[green] blink-button">Match started</span>;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimers = {};
      combinedData.forEach((match) => {
        updatedTimers[match.match_id] = calculateCountdown(match.match_date, match.match_time);
      });
      setCountdownTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(timer);
  }, [seriesUpcommingData, seriesLiveMatches]);

  const getSeriesUpcommingDetails = async (value) => {
    const formData = new FormData();
    formData.append("series_id", value);

    const response = await postAPIHandler("upcomingMatchesBySeriesId", formData);
    setSeriesUpcommingData(response.data);
  };

  const getSeriesLiveMatches = async () => {
    const response = await getAPIHandler("liveMatchList");
    setSeriesLiveMatches(response.data);
  };

  const formatUrlString = (str) => {
    return str
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^a-z0-9-']/g, '');
  };

  useEffect(() => {
    getSeriesUpcommingDetails(seriesId);
    getSeriesLiveMatches();
  }, [seriesId]);

  const filteredMatches = seriesLiveMatches.filter(
    (match) => formatUrlString(match.series) === seriesName
  );

  const combinedData = [...filteredMatches, ...seriesUpcommingData];
  // console.log("combinedData - ", combinedData);

  return (
    <>
      {combinedData.length !== 0 ? (
        <>
          <div className="bg-gradient-to-r from-[#00395F] to-[#002944] py-5 mb-5">
            <p className="text-white md:text-[30px] text-[24px] font-semibold px-4 flex items-center justify-center gap-x-4 mb-0">
              {combinedData.length !== 0 && combinedData[0].series}
            </p>
          </div>
          <div className="xl:w-[60%] w-[100%] mx-auto px-2 my-10">
            <div className="series-details-wrapper">
              {combinedData.map((val, ind) => (
                <Link
                  to={`/match-details/${seriesId}/${val.match_id}/${val.team_a_id}/${val.team_b_id}/${formatUrlString(val.team_a + " vs " + val.team_b + " " + val.series)}`}
                  key={ind}
                >
                  <div className="swiper-slide bg-[#fff] hover:bg-[#00395f0d] mb-4 rounded-lg shadow-sm shadow-[#bfb4b4] text-[#00395F]">
                    <div className="card-header-wrapper px-4 py-3 font-[600] flex justify-between flex-row">
                      <div className="stadium-details">
                        <span className="stadium-name">
                          {val.match_date} | {val.match_time} IST
                        </span>
                      </div>
                      <div className="time-left">
                        {countdownTimers[val.match_id] || "Calculating..."}
                      </div>
                      <div className="series-details">
                        <span className="series-name">{val.series}</span>
                      </div>
                    </div>
                    <div className="card-body-wrapper px-4 py-3 border-t-[1px] border-[#e4e6eb] border-solid flex justify-between flex-wrap">
                      <div className="body-left-block w-[35%] text-[18px] flex justify-between flex-column gap-4">
                        <div className="format-type font-[600]">
                          {val.matchs}
                        </div>
                        <div className="stadium-details mt-[10%]">
                          {val.venue}
                        </div>
                      </div>
                      <div className="body-right-block w-[63%] border-s-[1px] border-[#e4e6eb] border-solid ps-4 flex justify-between">
                        <div className="team-details flex justify-between flex-column px-2 gap-4">
                          <div className="team-name flex gap-3 items-center text-[20px] font-[600]">
                            <img
                              src={`${val.team_a_img}`}
                              className="w-[40px] h-[40px] object-cover rounded-full shadow-lg shadow-[#0000004e]"
                            />
                            <span>{val.team_a}</span>
                          </div>
                          <div className="team-name flex gap-3 items-center text-[20px] font-[600]">
                            <img
                              src={`${val.team_b_img}`}
                              className="w-[40px] h-[40px] object-cover rounded-full shadow-lg shadow-[#0000004e]"
                            />
                            <span>{val.team_b}</span>
                          </div>
                        </div>
                        <div className="lg:text-[14px] text-[15px] text-white font-[500]">
                          <span className={`capitalize blink-button  px-2 py-1 rounded-sm`} style={{
                            backgroundColor: val.match_status == "Live" ? "green" : "red"
                          }}>
                            {val.match_status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <h4 className="text-[#FF0000] py-5 text-center">No Data Found</h4>
      )
      }
    </>
  );
};

export default SeriesDetails;
