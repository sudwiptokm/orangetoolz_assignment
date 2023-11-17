import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./components/Button";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import MainCard from "./components/card/MainCard";
import LineChartComponent from "./components/charts/LineChart";
import { SearchWeather, SearchWeatherForecast } from "./utils/ApiCalls";
import { ConvertToChartData } from "./utils/functions";
import { ChartDataType } from "./utils/interface";

function App() {
  const [searchParams, setSearchParams] = useState<string>("");
  const [data, setData] = useState<any>();
  const [forecastData, setForecastData] = useState<any>();
  const [chartData, setChartData] = useState<ChartDataType[]>();

  const showErrorToast = () => toast.error("Couldn't find the city!");

  const SearchWeatherData = () => {
    SearchWeather({ searchParams, setData, showErrorToast });
    SearchWeatherForecast({
      searchParams,
      setData: setForecastData,
      showErrorToast,
    });
    setSearchParams("");
  };

  useEffect(() => {
    SearchWeather({ searchParams: "Dhaka", setData, showErrorToast });
    SearchWeatherForecast({
      searchParams: "Dhaka",
      setData: setForecastData,
      showErrorToast,
    });
  }, []);

  useEffect(() => {
    // console.log(forecastData);
    if (forecastData) ConvertToChartData(forecastData, setChartData);
  }, [forecastData]);

  return (
    <div className="min-h-screen mt-10 max-w-4xl mx-auto">
      <div className="flex space-x-4 items-center w-full">
        <div className="flex-1">
          <SearchBar val={searchParams} setVal={setSearchParams} />
        </div>
        <Button title="Search" onClick={SearchWeatherData} />
      </div>
      <div className="flex justify-center mt-10 w-full">
        {!data ? (
          <Spinner />
        ) : (
          // Main Card
          <div className="flex w-full space-x-4">
            <MainCard data={data} />
            <LineChartComponent />
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
