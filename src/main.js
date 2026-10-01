import { fillForm, fillFormAllInput,loadImageNames } from "./pages/Editor/Editor";
import { promiseImage } from "/src/datas.js";
import { promiseMeme } from "./datas.js";

var wrapper;

function loadDate() {
  var date = new Date().toLocaleString();
  var footer = document.getElementById("footer");
  footer.innerText = date;
}

function updateDate() {
  setInterval(function () {
    loadDate();
  }, 1000);
}

function loadDOMEditor() {
  const promiseLoadingPage = loadWrapperContent("src/pages/Editor/Editor.html");

  promiseLoadingPage.then((r) => {
    console.log("fin de chargement");
  });

  Promise.all([promiseImage, promiseLoadingPage]).then((arraydesReponses) => {
    console.log("tous les chargements sont effectués", arraydesReponses);

    loadImageNames(arraydesReponses[0]);
    console.log("test");
    fillFormAllInput();
  });
}
function loadDOMThumbnail() {
  const promiseLoadingPage = loadWrapperContent(
    "/src/pages/Thumbnail/Thumbnail.html",
  );

  Promise.all([promiseMeme,promiseImage, promiseLoadingPage]).then((arraydesReponses) => {
    console.log("tous les chargements sont effectués", arraydesReponses);
    const thmbnailDiv = document.querySelector("#thumbnail");
    arraydesReponses[0].forEach((meme) => {
      const div = document.createElement("div");
      div.className = "preview";
      const h3 = document.createElement("h3");
      h3.innerHTML = meme.titre;
      div.appendChild(h3);
      div.appendChild(meme.getSVGNode());
      thmbnailDiv.appendChild(div);
    });
  });
}
function loadDOMHome() {
  loadWrapperContent("src/pages/home/home.html");
}

document.addEventListener("DOMContentLoaded", function (evt) {
  updateDate();
  wrapper = document.getElementById("wrapper");
  initNavbar();
  constructPage(this.location.pathname);
});

function initNavbar() {
  var links = document.querySelectorAll("nav a");

  links.forEach(function (link) {
    link.addEventListener("click", function (evt) {
      evt.preventDefault();
      console.log(evt);
      constructPage(evt.target.attributes["href"].value);
      history.pushState(null, "", evt.target.attributes["href"].value);
    });
  });
}

function constructPage(path) {
  switch (path) {
    case "/editor":
      loadDOMEditor();
      break;
    case "/thumbnail":
      loadDOMThumbnail();
      break;
    default:
      loadDOMHome();
      break;
  }
}

/**
 * fonction pour charger le contenu d'une page html dans le wrapper venant d'une adresse
 * @param {string} path chemin de la page html
 * @returns {void} aucun retour
 * */
const loadWrapperContent = (path) => {
  const promise = fetch(path).then((response) => {
    return response.text();
  });
  const html = promise.then((html) => (wrapper.innerHTML = html));
  return html;
};

const loadImage = (id) => {
  const url = "http://localhost:5679/Images/" + id;

  const promise = fetch(url).then((response) => {
    return response.json();
  });
  promise.then((img) => console.log(img));
};
