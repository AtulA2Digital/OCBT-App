import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { postAPIHandler } from "../../../Api";
import { Typography } from "@mui/material";
import "./style.css";

const PointsTable = () => {
  const { seriesId } = useParams();
  const [matchPointsTable, setMatchPointsTable] = useState({});
  // console.log("matchPointsTable - ", matchPointsTable);
  const [loading, setLoading] = useState(false); // Initially true to show loading on mount
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchPointsTable(seriesId);
    }, 1000);
  }, [seriesId]);

  const fetchPointsTable = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    const response = await postAPIHandler("groupPointsTable", formData);
    setMatchPointsTable(response.data);
    setLoading(false);
  };
  // Conditional rendering for the loading state
  if (loading) {
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#002D4B" }} />
      </Box>
    );
  }

  // Conditional rendering for the error state
  if (error) {
    return (
      <div className="text-center text-white py-4 my-10 bg-[#242424] w-50 mx-auto rounded-lg">
        {error} {/* Display the error message dynamically */}
      </div>
    );
  }

  // Main content rendering
  return (
    <div className="py-6 mx-md-4 mx-2">
      <p className="text-[#002D4B] text-[38px] font-semibold pb-5 text-center">
        <span className="bottom-line bottom-line-big">Points Table</span>
      </p>
      {Object.keys(matchPointsTable).length > 0 ? (
        Object.entries(matchPointsTable).map(([groupName, teams]) => (
          <div
            key={groupName}
            className="gap-1 d-flex flex-col lg:w-[60%] md:w-[90%] mx-auto"
          >
            <Typography variant="h2" gutterBottom className="text-[#002D4B]">
              {groupName} {/* Dynamic Group Name */}
            </Typography>
            <div className="flex flex-wrap justify-between xl:gap-36 bg-gradient-to-r from-[#002D4B] to-[#141815] py-3 rounded-lg lg:px-[10%] px-[5%]">
              <span>Team</span>
              <div className="md:space-x-10 space-x-2 point-table-keys">
                <span>M</span>
                <span>W</span>
                <span>L</span>
                <span>NR</span>
                <span>Pts</span>
                <span className="nrr">NRR</span>
              </div>
            </div>
            {teams.map((team) => (
              <div
                key={team.teams}
                className="flex flex-wrap justify-between xl:gap-36 w-100 py-3 rounded-lg mt-2 bg-[#232525] hover:bg-[#393c3c] lg:px-[10%] px-[5%]"
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={team.flag}
                    alt={team.teams}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  {team.teams}
                </div>
                <div className="md:space-x-10 space-x-2 point-table-keys">
                  <span>{team.P}</span>
                  <span>{team.W}</span>
                  <span>{team.L}</span>
                  <span>{team.NR}</span>
                  <span>{team.Pts}</span>
                  <span className="nrr">{team.NRR}</span>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="text-center text-white py-4 my-10 bg-[#242424] w-50 mx-auto rounded-lg">
          No Data Found
        </div>
      )}
    </div>
  );
};

export default PointsTable;
