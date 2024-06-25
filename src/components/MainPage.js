import React from "react";
import { WeatherProvider } from "./WeatherContext";
import SearchForm from "./SearchForm";
import WeatherDetails from "./WeatherDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forecast from "./Forecast";
function MainPage() {
  return (
    <WeatherProvider>
      <ToastContainer />

      <SearchForm />
      <WeatherDetails />
      <Forecast />
    </WeatherProvider>
  );
}

export default MainPage;
