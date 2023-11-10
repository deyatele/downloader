import {API_NAME} from '../../env';
import {TXT_ERROR_500} from '../constants';

export const WSCheckStatus = (
  url: string,
  jobId: string,
  callBack: Function,
  UpdateProgress: Function,
  callBackError: Function,
) => {
  const wssRequest = `wss://${
    url.split('//')[1]
  }/sub/${jobId}?fname=${API_NAME}`;

  const socket = new WebSocket(wssRequest);
  const resultCallback = (data: any) => {
    callBack(data);
    UpdateProgress(null);
  };

  const errorCallback = () => {
    callBackError(TXT_ERROR_500);
    UpdateProgress(null);
  };
  socket.onmessage = res => {
    const data = JSON.parse(res.data);
    data.action === 'success' && resultCallback(data.url);
    data.action === 'progress'
      ? UpdateProgress && UpdateProgress(data.value.toString())
      : data.action === 'error' && errorCallback();
  };

  socket.onerror = () => {
    callBackError(TXT_ERROR_500);
    UpdateProgress(null);
  };
};
