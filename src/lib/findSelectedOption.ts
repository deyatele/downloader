import {ILinksOptionsDate, ILinksOptionsDateName} from '../optionsDownload';

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

  return value!;
};
