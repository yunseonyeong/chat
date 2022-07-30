import axios from 'axios';

const fetcher = (url: string) => {
  axios.get(url).then((response) => response.data);
};

export default fetcher;

//response.data 가 login/index.tsx의 data로 들어간다.
//error 발생 시, error로 들어간다.