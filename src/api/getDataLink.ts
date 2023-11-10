import axios from 'axios';
import {
  IQuessionDownload,
  TResponseLinkRedirect,
  TResponseLinkSuccess,
} from '../interface';
import {API_URL_DOWNLOAD} from '../../env';

type ResponseProps = TResponseLinkRedirect | TResponseLinkSuccess;

export const getDataLink = async (
  optionsForLink: IQuessionDownload,
): Promise<ResponseProps> => {
  const url: string = API_URL_DOWNLOAD;
  const option = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-Key': 'de0cfuirtgf67a',
    },
  };

  const {data} = await axios.post<ResponseProps>(url, optionsForLink, option);

  return data;
};
