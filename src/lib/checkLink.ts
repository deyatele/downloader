import {default as axios} from 'axios';
import {IYoutube} from './interfaceYoutube';

// const links = [
//   'https://youtu.be/Wo2TwPi3cNs?si=pneW87DsR_MZqzVo',
//   'https://youtu.be/whP7C8n7NzE?si=HNyz0MtsryVUp1vA',
//   'https://youtu.be/G5TM90ctc4s?si=1yK5XZ7b_w88P4hV',
//   'https://youtube.com/playlist?list=PLGQiJX6wM-zzcPye1y7gpyJO0uH7NMNP7&si=cWGDtXqwvvgSYM4t',
//   'https://www.youtube.com/watch?v=G5TM90ctc4s',
//   'https://youtube.com/playlist?list=PL8jIzbooWPdU_wsuNsiiszDuWYrSjp1Hn&si=WmOFJ-uqHg66tcsm',
// ];

export const checkLink = async (value: string) => {
  if (value.includes('playlist')) {
    const {data} = await axios.get(value);
    const chank = data.split('playlistVideoListRenderer')[1];
    const a = codeParser(chank);
    return a;
  }
  if (value.includes('youtu.be') || value.includes('youtube.com')) {
    return value;
  }
  return null;
};

const codeParser = (code: string): IYoutube => {
  let codeText = '';
  let lib = 0;
  for (let i = 2; i < code.length; i++) {
    codeText += code[i];
    if (code[i] === '{') {
      ++lib;
    }
    if (code[i] === '}') {
      --lib;
    }
    if (lib === 0) {
      break;
    }
  }
  return JSON.parse(codeText);
};
