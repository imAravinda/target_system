import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  // axios cancel token
  // const CancelToken = axios.CancelToken();
  // const source = CancelToken.source()

  const [data, setData] = useState(null);
  const [isPending, setIspending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          setData(res.data);
        } else {
          console.log("error");
        }
        setIspending(false);
      } catch (error) {
        console.log(error);
        console.log(error.response?.data);
        console.log({ "error.message": error?.message });
        if (error.message === "cancel request") {
          console.log("fetch aborted");
        } else {
          setData(null);
          setIspending(false);
        }
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1500);

    return () => {
      // cancel axios request
      // source.cancel('cancel request');
    };
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data: data, isPending: isPending };
};

export default useFetch;
