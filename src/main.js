var wrapper;
var links;

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
  wrapper.innerHTML = "<h1>Editor</h1>";
}
function loadDOMThumbnail() {
  wrapper.innerHTML = "<h1>Thumbnail</h1>";
}
function loadDOMHome() {
  wrapper.innerHTML = "<h1>Home</h1>";
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
