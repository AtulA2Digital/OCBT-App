import axios from "axios";

const token = "c196e1df37194546726b416781bcc21f";
const apiService = axios.create({
  baseURL: "https://apicricketchampion.in/apiv4/",
});
export const serverUrl = "https://apicricketchampion.in/apiv4/";

export const fetchUpcomingMatches = () => {
  return apiService.get(`upcomingMatches/${token}`);
};

export const fetchLiveMatches = () => {
  return apiService.get(`liveMatchList/${token}`);
};

export const fetchrecentMatches = () => {
  return apiService.get(`recentMatches/${token}`);
};
export const fetchseriesList = () => {
  return apiService.get(`seriesList/${token}`);
};

// GET api
export const getAPIHandler = async (endPoint) => {
  try {
    const postRes = await axios.post(serverUrl + endPoint + "/" + token);
    return postRes.data;
  } catch (error) {
    // console.log("error is - ", error.response);
    return { error };
  }
};

// Post api
export const postAPIHandler = async (endPoint, value) => {
  try {
    const postRes = await axios.post(serverUrl + endPoint + "/" + token, value);
    return postRes.data;
  } catch (error) {
    // console.log("error is - ", error.response);
    return { error };
  }
};
