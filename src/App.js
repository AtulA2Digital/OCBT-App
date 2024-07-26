import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import ScrollTop from "./Components/ScrollToTop";
import Layout from "./LayoutWrapper/AdminLayout";
import Home from "./Pages/Home";
import Series from "./Pages/Series";
import SeriesDetails from "./Pages/SeriesDetails";
import MatchDetails from "./Pages/MatchDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/prediction">
        <ScrollTop>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tournaments" element={<Series />} />
              <Route
                path="/series-details/:seriesId/:seriesName"
                element={<SeriesDetails />}
              />
              <Route
                path="/match-details/:seriesId/:matchId/:team_a_id/:team_b_id/:matchName"
                element={<MatchDetails />}
              />
              <Route
                path="*"
                element={
                  <div className="my-10 bg-[#232525] p-4 w-[80%] rounded-lg mx-auto">
                    <h2 className="text-center">No Page Found</h2>
                  </div>
                }
              />
            </Routes>
          </Layout>
        </ScrollTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
