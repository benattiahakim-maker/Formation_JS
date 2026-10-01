import { promiseImage } from "./datas";

const SVG_NS = "http://www.w3.org/2000/svg";

export class Meme {
  titre = "";
  text = "MemeTest";
  x = 100;
  y = 20;
  fontWeight = "500";
  fontSize = 30;
  underline = false;
  italic = false;
  imageId = -1;
  color = "#000000";
  frameSizeX = 0;
  frameSizeY = 0;

  getSVGNode() {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 500 500");

    // L'image est créée en premier pour rester sous le texte
    const image = document.createElementNS(SVG_NS, "image");
    image.setAttribute("x", 0);
    image.setAttribute("y", 0);
    svg.appendChild(image);

    promiseImage.then((images) => {
      const currentImage = images.find((img) =>{
            
           return  img.id == this.imageId
      
      
      });
      if (currentImage) {
        console.log("test");

        image.setAttribute("href", currentImage.url);
        image.setAttribute("width", currentImage.w);
        image.setAttribute("height", currentImage.h);
        svg.setAttribute("viewBox", `0 0 ${currentImage.w} ${currentImage.h}`);
        svg.appendChild(image);
      }
    });

    const texte = document.createElementNS(SVG_NS, "text");
    texte.textContent = this.text;
    texte.setAttribute("x", this.x);
    texte.setAttribute("y", this.y);
    texte.setAttribute("fill", this.color);
    texte.setAttribute("font-size", this.fontSize);
    texte.setAttribute("font-weight", this.fontWeight);
    texte.setAttribute(
      "text-decoration",
      this.underline ? "underline" : "none",
    );
    texte.setAttribute("font-style", this.italic ? "italic" : "normal");
    svg.appendChild(texte);

    return svg;
  }
}
