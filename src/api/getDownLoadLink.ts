import axios from 'axios';
import {IQuessionDownload, IResponseDownloadLink} from '../interface';

export const getDownLoadLink = async (
  server: string,
  dataOptions: IQuessionDownload,
): Promise<IResponseDownloadLink> => {
  const url = `${server}/api/json/convert`;
  const option = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-Key': 'de0cfuirtgf67a',
    },
  };
  const {data} = await axios.post<IResponseDownloadLink>(
    url,
    dataOptions,
    option,
  );
  return data;
};
