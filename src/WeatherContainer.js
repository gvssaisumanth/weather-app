import React, { useState, useEffect } from "react";
import WeatherData from "./WeatherData";
import { useHistoryState } from "./useHistroy";
import { Card, Input, Segment } from "semantic-ui-react";
import "./WeatherContainer.css";


var moment = require("moment");

function WeatherContainer() {
  const [completeData, setCompleteData] = useState([]);
  const [dailyData, setDailyData] = useState([]); //JSON.parse(localStorage.getItem("data"))
  const [cityName, setCityName] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setDailyData(JSON.parse(localStorage.getItem("data")) || []);
    if (dailyData.length <= 0) refreshData();
  }, []);

  let display;
  if (completeData.length > 0 || hasError == false) {
    display = displayData();
  }
  function changeText(event) {
    setCityName(event.target.value);
    if (event.target.value.length === 0) {
      localStorage.clear();
      setDailyData([]);
    }
  }

  function displayData() {
    return dailyData.map((reading, index) => (
      <WeatherData
        reading={reading}
        key={index}
        completeData={completeData}
        cityName={cityName}
      />
    ));
  }
  function refreshData() {
    const _url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&APPID=52ffb76e2c36793c7f3dd6d9982e1191
    `;
    fetch(_url)
      .then((res) => res.json())
      .then((data) => {
        const _data = data.list.filter((reading) =>
          reading.dt_txt.includes("00:00:00")
        );
        data.list.map(function (name) {
          let _date = new Date();
          const weekday = name.dt * 1000;
          _date.setTime(weekday);
          name.day = moment(_date).format("dddd");
        });

        setCompleteData(data.list);
        setHasError(false);
        setDailyData(_data);
        localStorage.setItem("data", JSON.stringify(_data));
        setDailyData(JSON.parse(localStorage.getItem("data")) || []);
      })
      .catch((err) => {
        setCompleteData([]);
        setHasError(true);
        setDailyData([]);
      });
  }
  return (
    <Segment className="p-5 segment-class">
      <h1>WEATHER APPLICATION</h1>
      <h3>Weather Report for {cityName} </h3>
      <br />
      <i className="fa-solid fa-droplet-percent"></i>
      <hr />
      <br />
      <div>
        <span>
          <Input
            icon="location arrow"
            iconPosition="left"
            label={{ tag: true, content: "Enter City" }}
            labelPosition="right"
            placeholder="Enter City"
            value={cityName}
            onChange={changeText}
          ></Input>
          {"     "}
          <input
            type="button"
            className="get-weather-button"
            value="Get Weather Details"
            onClick={refreshData}
            disabled={cityName == 0}
          />
        </span>
      </div>
      {completeData.length > 0 && <div className="mt-5">{display}</div>}
    </Segment>
  );
}

export default WeatherContainer;
