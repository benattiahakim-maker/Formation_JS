import { Meme } from "./Meme";


var links;

const loadDatas = () => {
  const promise = fetch("http://localhost:5679/Images/").then((r) => r.json());
  return promise; 
};

const loadMemeDatas = () => {
  return fetch("http://localhost:5679/memes")
    .then((r) => r.json())
    .then((array) => {
      const memeArray = [];

      for (const jsonMeme of array) {
        memeArray.push(Object.assign(new Meme(), jsonMeme));
      }
      return memeArray;
    });
};

export const promiseImage = loadDatas();
export const promiseMeme = loadMemeDatas();