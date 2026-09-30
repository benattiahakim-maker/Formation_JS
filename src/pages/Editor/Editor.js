import {images} from "./data"; 

const loadImageNames = () => {
  const select = document.forms["meme-form"]["imageId"];
  select.innerHTML = "";
  images.forEach(image => {
    const op = document.createElement("option");
    op.innerHTML = image.name;
    select.appendChild(op);
  });
};