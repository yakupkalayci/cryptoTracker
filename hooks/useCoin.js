import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

export default function useCoin(id) {
  const { data, error } = useSWR(`https://api.coincap.io/v2/assets/${id}`, fetcher, { refreshInterval: 500 });
  return {
    coin: data,
    isLoading: !error && !data,
    isError: error,
  };
}
