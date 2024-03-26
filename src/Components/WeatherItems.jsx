import React from "react";
import Skycons from "react-skycons";
import Moment from "moment";
import CountUp from "react-countup";
import { getIcon } from "./../Utils/getIcon";

export default class WeatherItem extends React.Component {
  render() {
    let weather = this.props.data;
    let country = weather.country;
    let city = weather.city;
    let timestamp = weather.dayWeather.dt;
    let temperature = weather.dayWeather.temp.max;
    let weatherType = weather.dayWeather.weather[0].description;
    let weatherDescription = weather.dayWeather.weather[0].main;
    let icon = weather.dayWeather.weather[0].id;

    return (
      <div className={"weather-item " + this.props.theme}>
        <p className="location">
          <span className="city">{city}</span>
          <span className="country">{country ? `, ${country}` : null}</span>
        </p>
        <Skycons color="white" icon={getIcon(icon)} />
        {this._renderDayName()}
        <div className="temperature-info">
          <p className="temperature">
            <CountUp end={Math.round(temperature)} duration={1.2} />
            °C
          </p>
          <p className="info">{weatherType}</p>
        </div>
      </div>
    );
  }

  _renderDayName() {
    let days = {
      sameDay: "[Today]",
      nextDay: "ddd",
      nextWeek: "ddd",
      lastDay: "ddd",
      lastWeek: "ddd",
    };

    return (
      <p className="timestamp">
        {Moment(this.props.data.dayWeather.dt * 1000).calendar(null, days)}
      </p>
    );
  }
}
