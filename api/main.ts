import { VercelRequest, VercelResponse } from "@vercel/node";
import { JSDOM } from "jsdom";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { resourceId } = req.query;
  const { window } = await JSDOM.fromURL(
    `https://www.fifarosters.com/players?futid=${resourceId}`,
    { resources: "usable" }
  );

  window.addEventListener("load", () => {
    const { document } = window;
    const cardElement = document.getElementsByClassName("player")[0].children[0];
    const pictureElement = document.getElementsByClassName("playercard-picture")[0];
    const nameElement = document.getElementsByClassName("playercard-name")[0];
    const positionElement = document.getElementsByClassName("playercard-position")[0];
    const nationElement = document.getElementsByClassName("playercard-nation")[0];
    const clubElement = document.getElementsByClassName("playercard-club")[0];
    const ratingElement = document.getElementsByClassName("playercard-rating")[0];
    const backgroundUrl = window.getComputedStyle(cardElement).backgroundImage;
    const baseBackgroundUrl = "https://cdn-0.fifarosters.com/assets/cards/fifa21";
    const backgroundName = backgroundUrl.match(/cards_bg_e_[0-9]_[0-9]_[0-9]/)[0];

    res.send({
      name: nameElement.children[0].innerHTML,
      position: positionElement.innerHTML,
      rating: parseInt(ratingElement.innerHTML),
      nationId: parseInt(nationElement.innerHTML.match(/[0-9]+\.png/)[0].replace(".png", "")),
      clubId: parseInt(clubElement.innerHTML.match(/[0-9]+\.png/)[0].replace(".png", "")),
      backgroundUrl: `${baseBackgroundUrl}/${backgroundName}.png`,
      nationUrl: nationElement.children[0].getAttribute("src"),
      clubUrl: clubElement.children[0].getAttribute("src"),
      faceUrl: pictureElement.children[0].getAttribute("src"),
    });
  });
};
