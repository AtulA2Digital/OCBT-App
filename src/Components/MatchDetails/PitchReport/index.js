import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
// weather Icons------------
import Thermometer from "../../../Images/Cricket-Pages/thermometer.png";
import Humidity from "../../../Images/Cricket-Pages/humidity.png";
import Wind_Speed from "../../../Images/Cricket-Pages/wind-speed.png";
import Rainny from "../../../Images/Cricket-Pages/rainny.png";
import Wind_Direction from "../../../Images/Cricket-Pages/Wind-Direction.png";

// Ground Icons----------
import Capacity from "../../../Images/Cricket-Pages/Grounds/capacity.png";
import Ends from "../../../Images/Cricket-Pages/Grounds/Ends.png";
import Known_As from "../../../Images/Cricket-Pages/Grounds/know as.png";
import Location from "../../../Images/Cricket-Pages/Grounds/location.png";
import Opened from "../../../Images/Cricket-Pages/Grounds/opened.png";
import Profile from "../../../Images/Cricket-Pages/Grounds/profile.png";
import Timezone from "../../../Images/Cricket-Pages/Grounds/timezone.png";
import Floodlights from "../../../Images/Cricket-Pages/Grounds/floodlight.png";
import { postAPIHandler } from "../../../Api";

const PitchReport = () => {
  const { matchId } = useParams();
  const [matchInfo, setMatchInfo] = useState(null);
  // console.log("matchInfo - ", matchInfo && matchInfo.data);
  const [venueID, setVenueID] = useState(null);
  // console.log("venueID - ", venueID);
  const [venueDetails, setVenueDetails] = useState(null);
  // console.log("venueDetails - ", venueDetails);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch match details
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      GetMatchInfo(matchId);
    }, 1000);
  }, [matchId]);

  // Fetch venue details
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      GetVenueInfo(venueID);
    }, 1000);
  }, [venueID]);

  if (loading)
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#002D4B" }} />
      </Box>
    );
  if (error)
    return (
      <div className="text-center text-white py-4 my-10 bg-[#242424] w-50 mx-auto rounded-lg">
        No Data Found
      </div>
    );

  // Match Info API-----------------
  const GetMatchInfo = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("matchInfo", formData);
    // console.log("response-->", response);
    setMatchInfo(response);
    setVenueID(response.data.venue_id);
    setLoading(false);
  };

  // Venue Info-----------
  const GetVenueInfo = async (value) => {
    const formData = new FormData();
    formData.append("venue_id", value);

    const response = await postAPIHandler("venuesDetail", formData);
    // console.log("venuesDetail response-->", response);
    setVenueDetails(response.data);
    setLoading(false);
  };
  return (
    <div>
      {matchInfo && (
        <div className="py-6 mx-md-4 mx-2 flex md:flex-row flex-col flex-wrap justify-between gap-6">
          {/* Wheather */}
          {matchInfo.data.venue_weather && (
            <div className={`w-100`}>
              <div className="bg-[#000000] border-2 rounded-[18px] border-[#002D4B]">
                <div
                  className="bg-gradient-to-r from-[#002D4B] to-[#141815] w-[100%] py-3 rounded-t-[12px] md:px-7 px-3 flex items-center text-white font-medium 
         text-[20px]"
                >
                  <p className="mb-0 font-[600]">Weather</p>  
                </div>

                <div className="py-3">
                  <div className="flex px-4 flex-wrap gap-4">
                    <div className="flex flex-col justify-start items-center lg:w-[30%] md:w-[45%] w-[100%]">
                      <img className="w-[56px] h-[56px]" src={Thermometer} />
                      <p className="text-[18px] font-bold text-white mt-2 mb-1">
                        {matchInfo.data.venue_weather.temp_c}°C
                      </p>
                      <p className="text-[#4D4D4D] text-sm mb-0">
                        Ahmedabad, India
                      </p>
                      <p className="text-[#4D4D4D] text-sm">Hazy</p>
                    </div>
                    <div className="flex flex-col justify-start items-center lg:w-[30%] md:w-[45%] w-[100%]">
                      <img className="w-[56px] h-[56px]" src={Humidity} />
                      <p className="text-[18px] font-bold text-white mt-2 mb-1">
                        {matchInfo.data.venue_weather.humidity}%
                      </p>
                      <p className=" text-[#777777] text-sm">(Humidity)</p>
                    </div>
                    <div className="flex flex-col justify-start items-center lg:w-[30%] md:w-[45%] w-[100%]">
                      <img className="w-[56px] h-[56px]" src={Wind_Speed} />
                      <p className="text-[18px] font-bold text-white mt-2 mb-1">
                        {matchInfo.data.venue_weather.wind_kph}KPH
                      </p>
                      <p className=" text-[#777777] text-sm">(Wind Speed)</p>
                    </div>
                    <div className="flex flex-col justify-start items-center lg:w-[30%] md:w-[45%] w-[100%]">
                      <img className="w-[56px] h-[56px]" src={Rainny} />
                      <p className="text-[18px] font-bold text-white mt-2 mb-1">
                        {matchInfo.data.venue_weather.cloud}%
                      </p>
                      <p className=" text-[#777777] text-sm">
                        ({matchInfo.data.venue_weather.weather})
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-center lg:w-[30%] md:w-[45%] w-[100%]">
                      <img className="w-[56px] h-[56px]" src={Wind_Direction} />
                      <p className="text-[18px] font-bold text-white mt-2 mb-1">
                        {matchInfo.data.venue_weather.wind_dir}
                      </p>
                      <p className=" text-[#777777] text-sm">
                        (Wind Direction)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ground Picture */}
          {venueDetails && (
            <div className={`w-100`}>
              <div className="bg-[#000000] border-2 rounded-[18px] border-[#002D4B]">
                <div
                  className=" bg-gradient-to-r from-[#002D4B] to-[#141815] w-[100%] py-3 rounded-t-[12px] md:px-7 px-3 flex items-center text-white font-medium 
         text-[20px]"
                >
                  <p className="mb-0 font-[600]">Ground Picture</p>
                </div>

                <div className="">
                  <img
                    src={venueDetails.image}
                    alt="ground image"
                    className="lg:h-[400px] xl:object-contain object-cover"
                    style={{ borderRadius: "0 0 16px 16px" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Ground Details */}
          {venueDetails && (
            <div className={`w-100`}>
              <div className="bg-[#000000] border-2 rounded-[18px] border-[#002D4B]">
                <div
                  className=" bg-gradient-to-r from-[#002D4B] to-[#141815] w-[100%] py-3 rounded-t-[12px] md:px-7 px-3 flex items-center text-white font-medium 
         text-[20px]"
                >
                  <p className="mb-0 font-[600]">Ground Details</p>
                </div>

                <div className="py-4">
                  <div className="flex px-4 flex-wrap gap-4 justify-between">
                    {/* capacity */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Capacity} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.capacity}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Capacity)</p>
                    </div>
                    {/* curator */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Profile} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.curator}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Curator)</p>
                    </div>
                    {/* ends */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Ends} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.ends}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Ends)</p>
                    </div>
                    {/* floodlights */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Floodlights} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.floodlights}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Floodlights)</p>
                    </div>
                    {/* home_to */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Capacity} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.home_to}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Home)</p>
                    </div>
                    {/* known_as */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Known_As} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.known_as}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Known As)</p>
                    </div>
                    {/* location */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Location} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.location}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Location)</p>
                    </div>
                    {/* name */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Capacity} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.name}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Ground Name)</p>
                    </div>
                    {/* opened */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Opened} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.opened}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Opened)</p>
                    </div>
                    {/* time_zone */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Timezone} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.time_zone}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Time Zone)</p>
                    </div>
                    {/* About */}
                    <div className="flex flex-col justify-start items-center w-100">
                      <img className="w-[56px] h-[56px]" src={Capacity} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        <span className="border-b-2 border-[#002D4B] pb-1">
                          {" "}
                          About
                        </span>
                      </p>
                      <div className="text-[#fff] text-md">
                        {venueDetails && venueDetails.profile ? (
                          <div
                            className="mt-2 text-justify md:px-5"
                            dangerouslySetInnerHTML={{
                              __html: venueDetails.profile,
                            }}
                          />
                        ) : (
                          "--"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PitchReport;
