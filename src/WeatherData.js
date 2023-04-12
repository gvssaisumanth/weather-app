import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faThermometerHalf,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

import "./WeatherContainer.css";

var moment = require("moment");

function WeatherData(props) {
  let _date = new Date();
  const weekday = props.reading.dt * 1000;
  _date.setTime(weekday);
  const _img = `owf owf-${props.reading.weather[0].id} owf-5x`;
  const fahrenheitMax = props.reading.main.temp_max;

  const fahrenheitMin = props.reading.main.temp_min;

  const farenheitTemp = props.reading.main.temp;
  const COLORS = {
    sunny: [250, 250, 210],
    clouds: [
      [135, 206, 235],
      [176, 226, 255],
    ],
    rain: [
      [30, 144, 255],
      [0, 92, 230],
    ],

    snowyRainy: [215, 215, 245],
    snow: [245, 245, 245],
    clear: [
      [58, 123, 213],
      [94, 171, 244],
    ],
    default: [0, 245, 0],
  };
  function getGradientClear(color1, color2) {
    const [r1, g1, b1] = color1;
    const [r2, g2, b2] = color2;
    return `linear-gradient(135deg, rgba(${r1}, ${g1}, ${b1}, 1) 0%, rgba(${r2}, ${g2}, ${b2}, 1) 100%)`;
  }
  function getGradient(color) {
    const [r, g, b] = color;
    return `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 1) 0%, rgba(${r}, ${g}, ${b}, 0.6) 100%)`;
  }

  const GRADIENT_COLORS = {
    clear: getGradientClear(COLORS.clear[0], COLORS.clear[1]),
    clouds: getGradientClear(COLORS.clouds[0], COLORS.clouds[1]),
    snowyRainy: getGradient(COLORS.snowyRainy),
    rain: getGradientClear(COLORS.rain[0], COLORS.rain[1]),
    snow: getGradient(COLORS.snow),
    sunny: getGradient(COLORS.sunny),
    default: getGradient(COLORS.default),
  };

  let bagroundColor = COLORS.default;

  if (props.reading.weather[0].main === "Clear") {
    bagroundColor = GRADIENT_COLORS.clear;
  }

  if (props.reading.weather[0].main === "Clouds") {
    bagroundColor = GRADIENT_COLORS.clouds;
  }

  return (
    <div className="m-5">
      <Link
        to={{
          pathname: `/hourlyForecast/${props.reading.day}`,
          state: {
            completeData: props.completeData,
            cityName: props.cityName,
          },
        }}
      >
        <div
          className="card"
          style={{
            backgroundImage: bagroundColor,
          }}
        >
          <div className="row">
            <div className="col p-3">
              <h4 className="text-secondary">
                {moment(_date).format("MMMM D YYYY")}
              </h4>
              <h5>{props.reading.day}</h5>

              <h4>{props.reading.weather[0].description}</h4>
              <img
                src={`http://openweathermap.org/img/wn/${props.reading.weather[0].icon}@2x.png`}
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
                      Real feel: {props.reading.main.feels_like.toFixed()}°F |{" "}
                      {(
                        ((props.reading.main.feels_like.toFixed() - 32) * 5) /
                        9
                      ).toFixed()}
                      °C
                    </h5>
                  </div>
                  <div className="col-4">
                    <h5>
                      <FontAwesomeIcon icon={faTint} className="mx-1" />{" "}
                      Humidity: {props.reading.main.humidity.toFixed()} %
                    </h5>
                  </div>
                  <div className="col-4">
                    <h5>
                      <FontAwesomeIcon icon={faWind} className="mx-1" />
                      Wind: {props.reading.wind.speed.toFixed()} Km/Hr
                    </h5>
                  </div>
                </div>
              </div>
              <h4 className="mb-3">
                Minimum: {fahrenheitMin}°F and Maximum: {fahrenheitMax}°F
              </h4>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default withRouter(WeatherData);
