import axios from "axios";

interface SearchWeatherParams {
    searchParams: string
    setData: (data: any) => void
    showErrorToast: () => void
}

export const SearchWeather = (props: SearchWeatherParams) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}q=${props.searchParams}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((res: any) => {
        props.setData(res.data);
      })
      .catch((err: any) => {
        props.showErrorToast();
      });
};

export const SearchWeatherForecast = (props: SearchWeatherParams) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL_FC}q=${props.searchParams}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((res: any) => {
        props.setData(res.data);
      })
      .catch((err: any) => {
        props.showErrorToast();
      });
};