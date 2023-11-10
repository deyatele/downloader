import {Dispatch, SetStateAction} from 'react';
import {ILinksOptionsDateName, IQuessionDownload} from '../interface';

export const selectedValue = (
  value: ILinksOptionsDateName,
  setOptionsForLink: Dispatch<SetStateAction<IQuessionDownload | null>>,
) => {
  setOptionsForLink(prev => {
    if (prev) {
      return {...prev, fquality: value.k, ftype: value.f};
    }
    console.log('selectedValue', value);
    return prev;
  });
};
