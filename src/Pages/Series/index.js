import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAPIHandler } from "../../Api";
import "./style.css"

const Series = () => {
  const [seriesList, setSeriesList] = useState();
  // console.log("seriesList - ", seriesList);
  const [activeSeriesList, setActiveSeriesList] = useState();
  // console.log("activeSeriesList - ", activeSeriesList);
  const [getAllMatchesList, setGetAllMatchesList] = useState(true);
  // console.log("getAllMatchesList - ", getAllMatchesList);

  useEffect(() => {
    if (!seriesList || seriesList.length === 0) {
      // dispatch(getFetchSeriesList(activeSeriesList));
    }
    // }, [seriesList, dispatch, activeSeriesList]); // Include activeSeriesList in dependency array
    GetAllSeriesList()
  }, [getAllMatchesList, activeSeriesList]); // Include activeSeriesList in dependency array



  let GetAllSeriesList = async () => {
    const response = await getAPIHandler("seriesList")
    // console.log("response - ", response);
    setSeriesList(response.data);
  }

  const filteredMatches = seriesList !== undefined && seriesList.filter(
    (match) => match.series_type === activeSeriesList
  );

  // console.log("filteredMatches - ", filteredMatches);
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
  let matchesGroupedByDate;
  if (seriesList !== undefined) {

    matchesGroupedByDate = groupMatchesByDate(filteredMatches);
    if (getAllMatchesList) {
      matchesGroupedByDate = groupMatchesByDate(seriesList);
    }
  }


  // Format URL------------------
  const formatUrlString = (str) => {
    return str
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^a-z0-9-']/g, '');
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#00395F] to-[#002944] py-5 mb-5">
        <p className="text-white md:text-[30px] text-[24px] font-semibold px-4 flex items-center justify-center gap-x-4 mb-0">
          Cricket Series & Tournaments
        </p>
      </div>
      <div className="pb-3 border-b-2 mb-4 border-[#e4e6eb] ">
        <div className="d-flex  match-type-tabs xl:w-[90%] w-[95%] mx-auto text-[18px] pb-2">
          <button
            onClick={() => {
              setGetAllMatchesList(true);
              setActiveSeriesList();
            }}
            className={`toggle-button info-hover  text-[#000] font-[400] cursor-pointer ${getAllMatchesList ? "active" : ""
              }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setActiveSeriesList("International");
              setGetAllMatchesList(false);
            }}
            className={`toggle-button info-hover  border-bottom-[3px] text-[#000] font-[400] cursor-pointer ${activeSeriesList === "International" ? "active" : ""
              }`}
          >
            International
          </button>
          <button
            onClick={() => {
              setActiveSeriesList("Domestic");
              setGetAllMatchesList(false);
            }}
            className={`toggle-button info-hover  border-bottom-[3px] text-[#000] font-[400] cursor-pointer ${activeSeriesList === "Domestic" ? "active" : ""
              }`}
          >
            Domestic & Others
          </button>
          <button
            onClick={() => {
              setActiveSeriesList("League");
              setGetAllMatchesList(false);
            }}
            className={`toggle-button info-hover  border-bottom-[3px] text-[#000] font-[400] cursor-pointer ${activeSeriesList === "League" ? "active" : ""
              }`}
          >
            League
          </button>
          <button
            onClick={() => {
              setActiveSeriesList("Women");
              setGetAllMatchesList(false);
            }}
            className={`toggle-button info-hover  border-bottom-[3px] text-[#000] font-[400] cursor-pointer ${activeSeriesList === "Women" ? "active" : ""
              }`}
          >
            Women
          </button>
        </div>
      </div>
      <div className="xl:w-[90%] w-[95%] mx-auto my-10">
        {matchesGroupedByDate !== undefined ? Object.keys(matchesGroupedByDate).map((date) => (
          <div key={date} className=" d-flex flex-wrap gap-lg-4 gap-3">
            {matchesGroupedByDate[date].map((match) => (
              <Link
                to={`/series-details/${match.series_id}/${formatUrlString(match.series)}`}
                key={match.series_id}
                className="text-white lg:w-[23.3%] sm:w-[48%] w-[100%] mb-5"
              >
                <div className="flex flex-column w-100 bg-[#fff] md:mb-5 mb-[20px] rounded-lg shadow-sm shadow-[#bfb4b4]">
                  <div>
                    <img
                      src={match.image}
                      alt="series img"
                      className="w-[100%] object-cover object-top mx-auto rounded-t-lg"
                    />
                  </div>
                  <div className="pt-4 pb-5 px-3 text-[#043454]">
                    <span className="md:text-[20px] text-[20px] font-bold">
                      {match.month_wise}
                    </span>
                    <div className="flex flex-row w-full gap-x-[30px] items-center pt-2">
                      <div className="flex flex-col w-full ">
                        <div className="text-[18px] wrap-text">{match.series}</div>
                        <span className="text-[16px] text-[#043454ad]">
                          {match.series_date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-[-10%]">
                    {/* <Button></Button> */}
                    <button className="bg-[#043454] px-4 py-3 rounded-md text-[18px]">View Details</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )) : <h4 className="text-[#FF0000]">No Data Found</h4>}
      </div>
    </div>
  );
};

export default Series;
