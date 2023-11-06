import {ILinksOptionsDate} from '../optionsDownload';

export const findDubleSelected = (data: ILinksOptionsDate): void => {
  let result = [];
  Object.keys(data).forEach(item => {
    Object.keys(data[item]).forEach(item2 => {
      if (data[item][item2].selected) {
        if (result.length) {
          data[item][item2].selected = false;
          return;
        }
        result.push(data[item][item2]);
      }
    });
  });
};
