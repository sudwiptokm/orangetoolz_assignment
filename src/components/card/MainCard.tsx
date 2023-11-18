import { ArrowLongDownIcon } from "@heroicons/react/20/solid";
import { CapitalizeSentence } from "../../utils/functions";
import CurrentDateAndTime from "../CurrentDateAndTime";

type Props = {
  data: any;
};

const MainCard = ({ data }: Props) => {
  return (
    <div className="p-4 relative mb-10">
      {/* Current Time and Date */}
      <div>
        <CurrentDateAndTime offset={data.timezone} />
      </div>

      {/* City Name */}
      <div className="mt-1">
        <p className="text-4xl font-bold text-white">
          {data.name}, {data.sys.country}
        </p>
      </div>

      {/* Icon and weather */}
      <div className="mt-4 flex space-x-3 items-center">
        <img
          alt="weather condition icon"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        />
        <p className="text-4xl">{Math.round(data.main.temp)}°C</p>
      </div>

      {/* Description */}
      <div>
        <p className="font-semibold text-lg">
          Feels like {Math.round(data.main.temp)}°C. {data.weather[0].main}.{" "}
          {CapitalizeSentence(data.weather[0].description)}
        </p>
      </div>

      {/* Stats */}
      <div className="pl-6 border-l border-white mt-2 grid grid-cols-2 gap-x-6">
        {/* First Column */}
        <div className="space-y-1">
          {/* Wind Speed */}
          <div className="flex space-x-2 items-center">
            <div
              className="mt-1"
              style={{
                transform: `rotate(${data.wind.deg}deg)`,
              }}
            >
              <ArrowLongDownIcon className="h-5 w-5 text-white" />
            </div>
            <p>{data.wind.speed}m/s</p>
          </div>

          {/* Humidity */}
          <div>
            <p>Humidity: {data.main.humidity}hPa</p>
          </div>

          {/* Visibility */}
          <div>
            <p>Visibility: {data.visibility / 1000}km</p>
          </div>
        </div>

        {/* Second Column */}
        <div>
          {/* Pressure */}
          <div>
            <p>Pressure: {data.main.pressure}hPa</p>
          </div>
          {/* Cloudiness */}
          <div>
            <p>Cloudiness: {data.clouds.all}%</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/20 shadow-lg rounded-md -z-50"></div>
    </div>
  );
};

export default MainCard;
