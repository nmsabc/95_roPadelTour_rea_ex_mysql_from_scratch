const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");


const london =
  "https://api.openweathermap.org/data/2.5/weather?q=Timisoara,ro&APPID=e6a01a8a7d7cf235e594d91f349012fa";
const timisoara =
  "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=17091c25e9959ba12e7b677314fe4d86";
const baden =
  "https://api.openweathermap.org/data/2.5/weather?lat=48.00&lon=16.21&APPID=e6a01a8a7d7cf235e594d91f349012fa";

router.get("/:city", async (req, res) => {
  city_req = req.params.city;
  var requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  };
  try {
    let result = await getApi(requestOptions, city_req);
    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

function getApi(requestOptions, ci) {
  if (ci === "baden") {
    city_to_req = baden;
  }
  if (ci === "timisoara") {
    city_to_req = timisoara;
  }
  if (ci === "london") {
    city_to_req = london;
  }
  return fetch(city_to_req, requestOptions).then((res) => {
    return res.json();
  });
}

module.exports = router;