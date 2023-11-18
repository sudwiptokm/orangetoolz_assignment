import { ChartDataType, ForeCastDataType } from "./interface";

export const CapitalizeSentence = (sentence: string): string => {
  return sentence
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const ConvertTo12HourFormat = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (hours === 0 && minutes === 0) {
    // If it's 12:00am, include the day in the format "19th Nov"
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    return `${day}${GetDaySuffix(day)} ${month}`;
  }

  // Otherwise, use the regular 12-hour format
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

// Function to get the day suffix (e.g., "th", "st", "nd", "rd")
const GetDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// export const GetTimeAndDate = (setFormattedDate: (val: string) => void) => {
//   const currentDate = new Date();
//   // Example: Add 1 hour to the current time
//   currentDate.setSeconds(currentDate.getSeconds() + 7200);

//   // Format the date as "MMM DD, hh:mma"
//   const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
//     currentDate
//   );
//   const day = currentDate.getDate();

//   const timeOptions = {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   } as Intl.DateTimeFormatOptions;
//   const formattedTime = currentDate.toLocaleString("en-US", timeOptions);

//   const formattedDate = `${month} ${day}, ${formattedTime}`;

//   setFormattedDate(formattedDate);
// };

const isDST = (date: Date) => {
  const januaryOffset = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
  const julyOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  return Math.max(januaryOffset, julyOffset) !== date.getTimezoneOffset();
};
export const GetTimeAndDate = (
  setFormattedDate: (val: string) => void,
  timezoneOffset: number
) => {
  const currentDate = new Date();

  // Calculate the UTC time
  const utcTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;

  // Adjust for daylight saving time (DST)
  const dstOffset = isDST(currentDate) ? 60 : 0;

  // Adjust for the provided timezone offset
  const adjustedTime = utcTime + (timezoneOffset + dstOffset) * 1000;

  // Format the date as "MMM DD, hh:mma"
  const adjustedDate = new Date(adjustedTime);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    adjustedDate
  );
  const day = adjustedDate.getDate();

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  } as Intl.DateTimeFormatOptions;
  const formattedTime = adjustedDate.toLocaleString("en-US", timeOptions);

  const formattedDate = `${month} ${day}, ${formattedTime}`;

  setFormattedDate(formattedDate);
};

export const ConvertToChartData = (
  res: any,
  setChartData: (val: ChartDataType[]) => void
): void => {
  let completeData: ChartDataType[] = [];

  for (let i = 0; i < 8; i++) {
    let chartData: ChartDataType = {
      labels: {
        condition: "",
        windSpeed: "",
        time: "",
        humidity: "",
      },
      maxTemp: 0,
      minTemp: 0,
    };
    chartData.labels.condition = res.list[i].weather[0].description;
    chartData.labels.windSpeed = `${res.list[i].wind.speed}m/s`;
    chartData.labels.time = ConvertTo12HourFormat(res.list[i].dt_txt);
    chartData.labels.humidity = `${res.list[i].main.humidity}%`;
    chartData.maxTemp = res.list[i].main.temp_max;
    chartData.minTemp = res.list[i].main.temp_min;
    completeData.push(chartData);
  }
  setChartData(completeData);
};

export const GetDayAndDate = (timestamp: string) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dateObj = new Date(timestamp);
  const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];

  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    dateObj
  );
  const day = dateObj.getUTCDate();

  return `${dayOfWeek}, ${month} ${day}`;
};

export const ConvertToForecastData = (
  res: any,
  setFilteredForecastData: (val: ForeCastDataType[]) => void
) => {
  const organizedData: { [key: string]: ForeCastDataType } = {};
  const completedData: ForeCastDataType[] = [];

  res.list.forEach((data: any) => {
    const date = GetDayAndDate(data.dt_txt);
    const existingData = organizedData[date];

    if (!existingData) {
      organizedData[date] = {
        time: date,
        maxTemp: data.main.temp_max,
        minTemp: data.main.temp_min,
        condition: data.weather[0].description,
        icon: data.weather[0].icon,
      };
    } else {
      // Update min and max temperatures if needed
      if (data.main.temp_max > existingData.maxTemp) {
        existingData.maxTemp = data.main.temp_max;
      }
      if (data.main.temp_min < existingData.minTemp) {
        existingData.minTemp = data.main.temp_min;
      }
    }
  });

  // Convert the organized data to an array
  const keys = Object.keys(organizedData);
  keys.forEach((key) => {
    completedData.push(organizedData[key]);
    if (completedData.length > 5) {
      completedData.pop();
    }
  });

  console.log(completedData);

  setFilteredForecastData(completedData);
};
