import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("amman");
  const [inputCity, setInputCity] = useState("");
  const API_Key = "27f3b214589df0db3ae4609c9a8171a8";

  function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_Key}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data(weather):", error);
        toast.info(
          "This City doesn't exist, Please check your spelling or try another",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          }
        );
      });

    axios
      .get(forecastUrl)
      .then((response) => {
        var uniqueForecastDays = [];
        const fiveDaysForecast = response.data.list.filter((forecast) => {
          var forecastDate = new Date(forecast.dt_txt).getDate();
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

        setForecast(fiveDaysForecast);
      })
      .catch((error) => {
        console.error("Error fetching data(forecast)", error);
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
        setInputCity,
        setCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
