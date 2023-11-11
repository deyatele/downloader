export const timeConvert = (valueData: number) => {
  const value = +valueData;
  const min = Math.floor((value / 60) % 60);
  const sec = Math.floor(value % 60);
  const hour = Math.floor((value / 60 / 60) % 24);
  const result = `${hour ? (hour < 10 ? `0${hour}:` : `${hour}:`) : ''}${
    min ? (min < 10 ? `0${min}:` : `${min}:`) : ''
  }${sec ? (sec < 10 ? `0${sec}` : sec) : '00'}`;
  return result;
};
