import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFetchSeriesList } from "../../redux/CricketApi/actions";
import { Link } from "react-router-dom";

const Series = () => {
  const dispatch = useDispatch();
  const { series_list } = useSelector((state) => state.CricketReducer);
  const [activeSeriesList, setActiveSeriesList] = useState();
  const [getAllMatchesList, setGetAllMatchesList] = useState(true);

  useEffect(() => {
    if (!series_list || series_list.length === 0) {
      dispatch(getFetchSeriesList(activeSeriesList));
    }
  }, [series_list, dispatch, activeSeriesList]); // Include activeSeriesList in dependency array

  const filteredMatches = series_list.filter(
    (match) => match.series_type === activeSeriesList
  );

  const groupMatchesByDate = (matches) => {
    return matches.reduce((acc, match) => {
      const date = match.date_wise;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(match);
      return acc;
    }, {});
  };

  let matchesGroupedByDate = groupMatchesByDate(filteredMatches);
  // console.log("matchesGroupedByDate - ", matchesGroupedByDate);
  if (getAllMatchesList) {
    matchesGroupedByDate = groupMatchesByDate(series_list);
  }

  return (
    <div className="xl:w-[90%] w-[95%] mx-auto px-2 my-10 py-7">
<<<<<<< HEAD
      <div className="bg-gradient-to-r from-[#002D4B] to-[#141815] rounded-lg py-3 mb-5 sm:w-[90%] mx-auto">
=======
      <div className="bg-gradient-to-r from-[#39441d] to-[#141815] rounded-lg py-3 mb-5 sm:w-[90%] mx-auto">
>>>>>>> db9d529c79b87f2c3a6735d1a3f3e29a19acd1ba
        <p className="text-white md:text-[30px] text-[24px] font-semibold px-4 flex items-center justify-center gap-x-4 mb-0">
          <img
            // src={Squads_Icon}
            alt="squads"
            className="w-[50px] border-2 rounded-full border-[#fff] p-2"
          />
          Series List
        </p>
      </div>
      <div className="lg:space-x-4 space-x-2 pb-3 border-b-2 mb-4 border-[#ffffff14] match-type-tabs">
        <button
          onClick={() => {
            setGetAllMatchesList(true);
            setActiveSeriesList();
          }}
          className={`toggle-button info-hover bg-[#ffffff] text-[#000] md:px-6 px-[5px] py-2 rounded-[32px] font-[600] cursor-pointer ${getAllMatchesList ? "active" : ""
            }`}
        >
          All
        </button>
        <button
          onClick={() => {
            setActiveSeriesList("International");
            setGetAllMatchesList(false);
          }}
          className={`toggle-button info-hover bg-[#ffffff] border-bottom-[3px] text-[#000] md:px-6 px-[5px] py-2 rounded-[32px] font-[600] cursor-pointer ${activeSeriesList === "International" ? "active" : ""
            }`}
        >
          International
        </button>
        <button
          onClick={() => {
            setActiveSeriesList("Domestic");
            setGetAllMatchesList(false);
          }}
          className={`toggle-button info-hover bg-[#ffffff] border-bottom-[3px] text-[#000] md:px-6 px-[5px] py-2 rounded-[32px] font-[600] cursor-pointer ${activeSeriesList === "Domestic" ? "active" : ""
            }`}
        >
          Domestic & Others
        </button>
        <button
          onClick={() => {
            setActiveSeriesList("League");
            setGetAllMatchesList(false);
          }}
          className={`toggle-button info-hover bg-[#ffffff] border-bottom-[3px] text-[#000] md:px-6 px-[5px] py-2 rounded-[32px] font-[600] cursor-pointer ${activeSeriesList === "League" ? "active" : ""
            }`}
        >
          League
        </button>
        <button
          onClick={() => {
            setActiveSeriesList("Women");
            setGetAllMatchesList(false);
          }}
          className={`toggle-button info-hover bg-[#ffffff] border-bottom-[3px] text-[#000] md:px-6 px-[5px] py-2 rounded-[32px] font-[600] cursor-pointer ${activeSeriesList === "Women" ? "active" : ""
            }`}
        >
          Women
        </button>
      </div>
      {Object.keys(matchesGroupedByDate).map((date) => (
        <div key={date} className="">
<<<<<<< HEAD
          <div className="flex md:mb-5 mb-[20px] justify-start items-center w-100 py-3 rounded-lg bg-gradient-to-r from-[#002D4B] to-[#141815] px-3 text-left text-xl font-bold">
=======
          <div className="flex md:mb-5 mb-[20px] justify-start items-center w-100 py-3 rounded-lg bg-gradient-to-r from-[#39441d] to-[#141815] px-3 text-left text-xl font-bold">
>>>>>>> db9d529c79b87f2c3a6735d1a3f3e29a19acd1ba
            <span className="lg:w-[200px] w-[150px] text-white">Month</span>{" "}
            {/* Display date */}
            <span className="text-white w-full ">Series Name</span>
          </div>
          {matchesGroupedByDate[date].map((match) => (
            <Link
              to={`/series-details/${match.series_id}`}
              key={match.series_id}
              className="text-white"
            >
              <div className="flex justify-start md:items-center md:gap-y-0 gap-y-5 flex-md-row flex-column w-100 md:py-2 py-3 bg-[#232525] hover:bg-[#393c3c] px-3 text-left md:mb-5 mb-[20px] rounded-lg">
                <span className="lg:w-[200px] w-[150px] md:text-[16px] text-[20px] font-bold">
                  {match.month_wise}
                </span>
                <div className="flex flex-row w-full gap-x-[30px] items-center">
                  <img
                    src={match.image}
                    alt="series img"
                    className="md:w-[100px] w-[60px] rounded-full"
                  />
                  <div className="flex flex-col w-full">
                    <span className="text-[16px]">{match.series}</span>
                    <span className="text-[13px] text-[#ffffffaf]">
                      {match.series_date}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
      {/* {!series_list || series_list.length === 0 ? (
        <Box className="px-3 py-4 my-5 text-center">
          <CircularProgress style={{ color: "#B6FF00" }} />
        </Box>
      ) : null} */}
    </div>
  );
};

export default Series;
