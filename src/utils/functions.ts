import { ChartDataType } from "./interface";

export const capitalizeSentence = (sentence:string):string => {
    return sentence
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  export const convertTo12HourFormat = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    if (hours === 0 && minutes === 0) {
      // If it's 12:00am, include the day in the format "19th Nov"
      const day = date.getDate();
      const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
      return `${day}${getDaySuffix(day)} ${month}`;
    }
  
    // Otherwise, use the regular 12-hour format
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };
  
  // Function to get the day suffix (e.g., "th", "st", "nd", "rd")
  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

 

export const ConvertToChartData = (
  res: any, setChartData: (val:ChartDataType[])=>void
  ):void => {

let completeData:ChartDataType[] = []

for (let i=0; i<8; i++) {
  let chartData:ChartDataType = {
    labels: {
        condition: "",
        windSpeed: 0,
        time: "",
        humidity: 0,
    },
    maxTemp: 0,
    minTemp: 0,
}
    chartData.labels.condition = res.list[i].weather[0].description
    chartData.labels.windSpeed = res.list[i].wind.speed
    chartData.labels.time = convertTo12HourFormat(res.list[i].dt_txt)
    chartData.labels.humidity = res.list[i].main.humidity
    chartData.maxTemp = res.list[i].main.temp_max
    chartData.minTemp = res.list[i].main.temp_min
    completeData.push(chartData)
}
console.log(completeData);
setChartData(completeData)
}