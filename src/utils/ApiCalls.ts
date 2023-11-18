import axios from "axios";

interface SearchWeatherParams {
  searchParams: string;
  setData: (data: any) => void;
  showErrorToast?: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const SearchWeather = async (props: SearchWeatherParams) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}q=${props.searchParams}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
    .then((res: any) => {
      props.setData(res.data);
      props.setIsLoading(false);
    })
    .catch((err: any) => {
      if (props.showErrorToast) props.showErrorToast();
      props.setIsLoading(false);
    });
};

export const SearchWeatherForecast = async (props: SearchWeatherParams) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL_FC}q=${props.searchParams}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
    .then((res: any) => {
      props.setData(res.data);
      props.setIsLoading(false);
    })
    .catch((err: any) => {
      props.setIsLoading(false);
    });
};
