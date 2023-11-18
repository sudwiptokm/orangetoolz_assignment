export interface ChartDataType {
    labels: {
        condition: string,
        windSpeed: string,
        time: string,
        humidity: string,
    }
    maxTemp: number,
    minTemp: number,            
}

export interface ForeCastDataType {
    time: string
    maxTemp: number,
    minTemp: number,  
    condition: string,
    icon: string
}