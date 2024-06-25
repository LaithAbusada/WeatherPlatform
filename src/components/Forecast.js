import React, { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

function Forecast() {
  const { forecast } = useContext(WeatherContext);

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  return (
    <>
      <div className="flex flex-col space-y-4 sm:ml-16">
        {forecast.slice(1).map((item, index) => {
          const iconUrl = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
          return (
            <div
              key={index}
              className="flex flex-row flex-wrap mt-10 sm:ml-10 items-center justify-center text-white sm:text-xl"
            >
              <span className="flex-grow text-center sm:w-40  sm:text-left">
                {formatDate(item.dt)}
              </span>
              <span className="flex-grow text-center sm:text-left flex items-center">
                {item.main.humidity}%
                <svg
                  className="w-6 h-6 fill-current ml-1"
                  viewBox="0 0 16 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1,0,0,1,-4,-2)">
                    <path
                      d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                      style={{ fillRule: "nonzero" }}
                    />
                  </g>
                </svg>
              </span>

              <img src={iconUrl} alt="image" className="w-10 h-10"></img>
              <span className="flex-grow text-center sm:text-left">
                {Math.round(item.main.temp_min)}° /
                {Math.round(item.main.temp_max)}°
              </span>
              <span className="flex-grow text-center sm:text-left w-40">
                {item.weather[0].description}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Forecast;
