import {ILinksOptionsDate, ILinksOptionsDateName} from '../interface';

export const findDubleSelected = (data: ILinksOptionsDate): void => {
  let result: ILinksOptionsDateName[] = [];
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
  if (!result.length) {
    Object.values(data?.mp4)[0].selected = true;
  }
};
