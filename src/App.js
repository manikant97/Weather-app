import React from "react";
import { fetchWeather } from "./Utils/api.js";
import _ from "lodash";
import randomColor from "randomcolor";
import WeekWeather from "./Components/WeekWeather.jsx";
import "./CSS/Style.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Delhi",
      searchedCity: "Delhi",
      weekWeather: [],
      color: randomColor({ luminosity: "dark", format: "hex" }),
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather(searchedCity = this.state.city) {
    fetchWeather(searchedCity).then((response) => {
      var weather = _.map(response.list, (dayWeather) => {
        return {
          dayWeather,
          country: response.city.country,
          city: response.city.name,
        };
      });

      this.setState({
        weekWeather: weather,
        city: searchedCity,
        color: randomColor({ luminosity: "dark", format: "hex" }),
      });
    });
  }

  render() {
    return (
      <div className="weather-container" style={{ backgroundColor: this.state.color }}>
        {_.isEmpty(this.state.weekWeather) ? "no data" : (
          <WeekWeather color={this.state.color} weekWeather={this.state.weekWeather} />
        )}
        {this.renderForm()}
        <blockquote className="blockquote blockquote-centered">
          <p>
            Created by <a href=""> @Mani kant</a>
          </p>
        </blockquote>
      </div>
    );
  }

  renderForm() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <legend>Enter your city</legend>
          <input
            className="form-input"
            ref={(input) => (this.locationName = input)}
            type="text"
            defaultValue={this.state.searchedCity}
          />
        </fieldset>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const searchedCity = this.locationName.value.trim();
    if (searchedCity === this.state.city) {
      return;
    }
    this.getWeather(searchedCity);
  }
}
