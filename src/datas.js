
var links;

const loadDatas = () => {
  const promise = fetch("http://localhost:5679/Images/").then((r) => r.json());
};

export const promiseImage = loadDatas();
