import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { postAPIHandler } from "../../../Api";

const Squads = () => {
  const { matchId } = useParams();
  const [teams, setTeams] = useState(null);
  // console.log("teams - ", teams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      GetSquadInfo(matchId);
    }, 1000);
  }, [matchId]);

  if (loading) {
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#002D4B" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <div className="text-center text-white py-4 my-10 bg-[#242424] w-50 mx-auto rounded-lg">
        No Data Found
      </div>
    );
  }

  // Squad Info-----------
  const GetSquadInfo = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("squadsByMatchId", formData);
    // console.log("squadsByMatchId response-->", response);
    setTeams(response.data);
    setLoading(false);
  };

  const renderTeam = (team) => (
    <div className="bg-[#002D4B] px-4 py-[40px] rounded-[12px] sm:w-[49%] squad-wrapper group md:mb-0 mb-[40px]">
      <h3 className="text-[#fff] text-[18px] font-bold mb-4 text-center group-hover:text-[#f56363]">
        {team.name} ({team.short_name})
      </h3>
      <div className="flex flex-wrap">
        {team.player.map((player) => (
          <div key={player.player_id} className="xl:w-[50%] w-[100%] p-2">

            <div className="bg-[#181919] hover:bg-[#181919b8] xl:px-4 px-[20%] py-4 rounded-[8px] flex items-center ">
              <img
                src={player.image}
                alt={player.name}
                className="w-[40px] h-[40px] rounded-full mr-2"
              />
              <div>
                <p className="text-[#C9C7C7] text-[14px] font-medium mb-0">
                  {player.name}
                </p>
                <p className="text-[#757575] text-[12px] mb-0">
                  {player.play_role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {teams ? (
        <div className="py-6 mx-md-4 mx-2">
          <p className="text-[#002D4B] text-[38px] font-semibold pb-5 text-center">
            <span className="bottom-line bottom-line-big">Squads</span>
          </p>
          <div className="flex flex-wrap justify-between">
            {teams.team_a && renderTeam(teams.team_a)}
            {teams.team_b && renderTeam(teams.team_b)}
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

export default Squads;
