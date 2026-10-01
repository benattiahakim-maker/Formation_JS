import { Meme } from "../../Meme";

export const loadImageNames = (images) => {
  const select = document.forms["meme-form"]["imageId"];
  select.innerHTML = '<option value="-1"> no img </option>';
  images.forEach((image) => {
    const op = document.createElement("option");
    op.value=image.id
    op.innerHTML = image.name;
    select.appendChild(op);
  });
};

let currentMeme = new Meme();

/**fonction pour remplir un champs du formulaire en utilisant la valeur venant de l'objet courrant meme
 *
 */
export const fillForm = () => {
  const inputText = document.forms["meme-form"]["text"];
  inputText.value = currentMeme.text;
  inputText.addEventListener("input", (evt) => {
    console.log(evt.target.value);
  });
};

export const fillFormAllInput = () => {
  const form = document.forms["meme-form"];

  for (var i = 0; i < form.length-2; i++) {
    const name = form[i].name;
    const input = form[i];

    if (input.type == "checkbox") {
      input.checked = currentMeme[name];
      input.addEventListener("change", (evt) => {
        currentMeme[name] = input.checked;
        const svg = currentMeme.getSVGNode();
        const viewer =document.querySelector('#viewer'); 
        const children=viewer.querySelectorAll('*');
        children.forEach((child) =>{ child.remove()}); 
        viewer.appendChild(svg);
        console.log(evt.target.checked);
      });

    } else {
      input.value = currentMeme[name];
      input.addEventListener("input", (evt) => {
        currentMeme[name] = input.value;
        const svg = currentMeme.getSVGNode();
        const viewer =document.querySelector('#viewer'); 
        const children=viewer.querySelectorAll('*');
        children.forEach((child) =>{ child.remove()}); 
        viewer.appendChild(svg);
        console.log(evt.target.value);
      });
    }
  }
};
