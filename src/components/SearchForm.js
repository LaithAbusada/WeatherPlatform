import React, { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

function SearchForm() {
  const { inputCity, setInputCity, setCity } = useContext(WeatherContext);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      setCity(inputCity.toLowerCase().trim());
      setInputCity("");
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <input
        className="w-2/3 sm:w-1/4 h-12 p-4 text-center text-white text-lg rounded-full border-4 border-white-600 bg-transparent bg-opacity-50 placeholder-gray-500 focus:outline-none focus:ring-0"
        placeholder="Enter city name"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default SearchForm;
