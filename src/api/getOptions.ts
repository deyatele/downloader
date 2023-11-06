import axios from 'axios';
import {API_URL_OPTIONS} from '../../env';
import {IOptionsDate} from '../optionsDownload';

export const getOptions = async (inputValue: string) => {
  const urlStart = API_URL_OPTIONS;
  const body = {
    q: inputValue,
    vt: 'home',
  };
  const option = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept-Language': 'ru,en;q=0.9',
    },
  };

  const {data} = await axios.post<IOptionsDate>(urlStart, body, option);
  return data;
};
