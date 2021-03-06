const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API_HEADERS = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export { API_BASE_URL, API_HEADERS };
