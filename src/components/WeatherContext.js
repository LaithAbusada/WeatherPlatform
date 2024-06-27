import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("amman");
  const [inputCity, setInputCity] = useState("");
  const [weatherError, setWeatherError] = useState("");
  const [forecastError, setForecastError] = useState("");
  const API_Key = "27f3b214589df0db3ae4609c9a8171a8";

  function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_Key}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setWeatherError("");
      })
      .catch((error) => {
        if (error.response) {
          setWeatherError(error.response.status);
        } else {
          setWeatherError("Network Error");
        }
      });

    axios
      .get(forecastUrl)
      .then((response) => {
        let uniqueForecastDays = [];
        let fiveDaysForecast = response.data.list.filter((forecast) => {
          let forecastDate = new Date(forecast.dt_txt).getDate();
          if (
            !uniqueForecastDays.some(
              (item) => new Date(item.dt_txt).getDate() === forecastDate
            )
          ) {
            uniqueForecastDays.push(forecast);
            return true;
          }
          return false;
        });
        console.log(fiveDaysForecast);
        fiveDaysForecast = fiveDaysForecast.slice(1);
        setForecast(fiveDaysForecast);
        setForecastError("");
      })
      .catch((error) => {
        if (error.response) {
          setForecastError(error.response.status);
        } else {
          setForecastError("Network Error");
        }
      });
  }

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        data,
        forecast,
        inputCity,
        forecastError,
        weatherError,
        setInputCity,
        setCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
