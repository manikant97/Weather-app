import React from "react";
import WeatherItem from "./WeatherItems";

import _ from "lodash";

export default class WeekWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const color = this.props.color;

    return (
      <div className="week-container">
        <div className="week-current-day">
          <WeatherItem data={this.props.weekWeather[0]} />
        </div>
        <div className="week-all-days">
          {_.map(this.props.weekWeather, (weather, i) => {
            // Calculate the shade of color
            const shade = -(i + 1) / 20;
            const shadedColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${shade})`;

            var style = {
              backgroundColor: shadedColor
            };
            return (
              <div key={i} className="week-one-day" style={style}>
                <WeatherItem theme={"small"} data={weather} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
