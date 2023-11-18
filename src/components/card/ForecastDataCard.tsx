import { ForeCastDataType } from "../../utils/interface";

type Props = {
  data: ForeCastDataType[];
};

const ForecastDataCard = ({ data }: Props) => {
  return (
    <div>
      <p className="font-bold text-2xl lg:mx-20 md:mx-10 mb-2">
        5-day forecast
      </p>
      <div className="relative lg:mx-20 md:mx-10">
        {data?.map((item: ForeCastDataType, index: number) => (
          <div className="md:grid md:grid-cols-3 flex flex-col bg-neutral-600/20 m-4 py-4 rounded-lg md:bg-transparent md:m-0 md:py-0 md:rounded-none">
            <div className="flex items-center justify-center">
              <p>{item.time}</p>
            </div>
            <div className="flex items-center space-x-1 justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt="logo"
              />
              <p>{Math.round(item.maxTemp)}/</p>
              <p>{Math.round(item.minTemp)}°C</p>
            </div>
            <div className="flex items-center space-x-1 justify-center">
              <p>{item.condition}</p>
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-black/20 shadow-lg rounded-md -z-50"></div>
      </div>
    </div>
  );
};

export default ForecastDataCard;
