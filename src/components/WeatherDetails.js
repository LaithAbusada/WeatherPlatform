import React, { useEffect, useContext } from "react";
import { WeatherContext } from "./WeatherContext";
import { WeatherDescriptions } from "../constants/descriptionEnums";

function getImage(description) {
  if (description.includes(WeatherDescriptions.CLEAR))
    return "url('/images/clear.jpg')";
  if (description.includes(WeatherDescriptions.CLOUDS))
    return "url('/images/cloudy.jpg')";
  if (description.includes(WeatherDescriptions.RAIN))
    return "url('/images/rain.jpg')";
  if (description.includes(WeatherDescriptions.SNOW))
    return "url('/images/snow.jpg')";

    return "url('/images/clear.jpg')";
}

function WeatherDetails() {
  const { data, weatherError } = useContext(WeatherContext);

  useEffect(() => {
    if (data) {
      const backgroundImage = getImage(data.weather[0].description);
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundImage = backgroundImage;
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <>
      {!weatherError ? (
        <div className="flex flex-col mt-10 sm:mt-20 ml-4 sm:ml-10 p-6 rounded-lg text-white">
          <h1 className="text-3xl sm:text-5xl ml-4 sm:ml-10">{data.name}</h1>
          <div className="flex flex-col mt-5">
            <div className="flex flex-row m-2 sm:m-5 items-center">
              <h2 className="text-6xl sm:text-9xl mr-10">
                {Math.round(data.main.temp)}°C
              </h2>
              <div className="flex flex-wrap flex-grow mt-5 sm:mt-0">
                <div className="flex flex-col sm:flex-row text-sm sm:text-base lg:text-lg space-y-4 sm:space-y-0 sm:space-x-4 items-center flex-grow">
                  <div className="flex flex-col space-y-4 items-center flex-grow">
                    <span className="text-sm sm:text-base lg:text-lg xl:text-2xl">
                      Humidity
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg xl:text-2xl">
                      {data.main.humidity}%
                    </span>
                  </div>
                  <div className="flex flex-col space-y-4 items-center flex-grow">
                    <span className="text-sm sm:text-base lg:text-lg xl:text-2xl">
                      Feels Like
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg xl:text-2xl">
                      {Math.round(data.main.feels_like)}°C
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row text-sm sm:text-base lg:text-lg space-y-4 sm:space-y-0 sm:space-x-4 items-center flex-grow">
                  <div className="flex flex-col space-y-4 items-center flex-grow">
                    <span className="text-sm sm:text-base lg:text-lg xl:text-2xl">
                      Max/Min
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg xl:text-2xl">
                      {Math.round(data.main.temp_max)}°/
                      {Math.round(data.main.temp_min)}°
                    </span>
                  </div>
                  <div className="flex flex-col space-y-4 items-center flex-grow">
                    <span className="text-sm sm:text-base lg:text-lg xl:text-2xl">
                      Wind Speed
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg xl:text-2xl">
                      {data.wind.speed} km/h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-lg sm:text-3xl ml-4 sm:ml-10">
            {data.weather[0].description}
          </h3>
        </div>
      ) : (
        <div className="text-white flex justify-center items-center sm:text-2xl mt-40 mb-60 ml-10">
          There was an error fetching the Weather data for this city{" "}
        </div>
      )}
    </>
  );
}

export default WeatherDetails;
