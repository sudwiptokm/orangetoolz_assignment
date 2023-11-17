export  interface ChartDataType {
    labels: {
        condition: string,
        windSpeed: number,
        time: string,
        humidity: number,
    }
    maxTemp: number,
    minTemp: number,            
}