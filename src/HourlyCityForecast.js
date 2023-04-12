import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faThermometerHalf,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

var moment = require("moment");

function HourlyForecast(data) {
  let _date = new Date();
  const weekday = data.data.dt * 1000;
  _date.setTime(weekday);
  // const _img = `owf owf-${data.data.weather[0].id} owf-5x`;
  const fahrenheitMax = Math.round(data.data.main.temp_max);

  const fahrenheitMin = Math.round(data.data.main.temp_min);

  const farenheitTemp = Math.round(data.data.main.temp);
  console.log("full data", data.data);
  return (
    <div className="row">
      <div className="col-12">
        <div className="card py-2 my-3">
          <div className="row">
            <div className="col">
              <h4 className="text-muted">
                {moment(_date).format("MMMM D YYYY")}
              </h4>
              <h5>
                {data.data.day} at {moment(_date).format("HH:mm a")}
              </h5>
              <h4>{data.data.weather[0].description}</h4>
              <img
                src={`http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`}
                alt="no"
              />
              <div style={{ textAlign: "center" }}>
                <div className="h4">
                  Temperature: {farenheitTemp.toFixed()}°F |{" "}
                  {(((farenheitTemp.toFixed() - 32) * 5) / 9).toFixed()}°C
                </div>

                <div className="row my-5">
                  <div className="col-4">
                    <h5>
                      <FontAwesomeIcon
                        icon={faThermometerHalf}
                        className="mx-1"
                      />{" "}
                      Real feel: {data.data.main.feels_like.toFixed()}°F |{" "}
                      {(
                        ((data.data.main.feels_like.toFixed() - 32) * 5) /
                        9
                      ).toFixed()}
                      °C
                    </h5>
                  </div>
                  <div className="col-4">
                    <h5>
                      <FontAwesomeIcon icon={faTint} className="mx-1" />{" "}
                      Humidity:{" "}
                      {data.data.main.humidity
                        .toFixed()}{" "}
                      %
                    </h5>
                  </div>
                  <div className="col-4">
                    <h5>
                      <FontAwesomeIcon icon={faWind} className="mx-1" />
                      Wind: {data.data.wind.speed.toFixed()} Km/Hr
                    </h5>
                  </div>
                </div>
              </div>
              <p>
                Minimum:{fahrenheitMin}°F and Maximum: {fahrenheitMax}°F
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;
