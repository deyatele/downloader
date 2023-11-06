import axios from 'axios';
import {IQuessionDownload} from '../optionsDownload';
import {API_URL_DOWNLOAD} from '../../env';

type ResponseProps = {result: string; status: string; statusCode: string};

export const getLinkDownload = async (
  optionsForLink: IQuessionDownload,
): Promise<ResponseProps> => {
  const url = API_URL_DOWNLOAD;
  const option = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  };

  const {data} = await axios.post(url, optionsForLink, option);
  return data;
};
