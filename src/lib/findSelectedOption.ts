import {ILinksOptionsDate, ILinksOptionsDateName} from '../interface';

export const findSelectedOption = (
  data: ILinksOptionsDate,
): ILinksOptionsDateName => {
  let value;

  Object.values(data).forEach(val => {
    Object.values(val).forEach(key => {
      if (key.selected) {
        value = key;
      }
    });
  });
  if (!value) {
    value = Object.values(data.mp4)[0]
      ? Object.values(data.mp4)[0]
      : {
          f: '',
          q: '',
          key: '',
          k: '',
          selected: null,
          size: '',
        };
  }

  return value;
};
