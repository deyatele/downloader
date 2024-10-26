import {IOptionsDate} from '../interface';
import {getOptions} from './getOptions';

let count = 0;
export const getDataLinks = async (
  value: string,
): Promise<IOptionsDate | null> => {
  try {
    const data = await getOptions(value);
    if (!data && count < 5) {
      count++;
      return await getDataLinks(value);
    }
    return data;
  } catch (error) {
    if (count > 5) {
      return null;
    }
    count++;
    return await getDataLinks(value);
  }
};
