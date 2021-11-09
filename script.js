import mergeImages from "merge-images";
import { saveAs } from "file-saver";

const mergedImage = document.querySelector(".merged-image");
const mergeBtn = document.querySelector(".merge-btn");
const selectFrame = document.querySelector(".select-frame");
const selectExpression = document.querySelector(".select-expression");
const downloadBtn = document.querySelector(".download-btn");
const cardsNodeList = document.querySelectorAll(".card");
const selectedExpression = document.querySelector(".selected-expression");
const selectedFrame = document.querySelector(".selected-frame");
const alertExpressionNodeList = document.querySelectorAll(".alert-expression");
const alertFrameNodeList = document.querySelectorAll(".alert-frame");

let frameImgPath = "";
let expressionImgPath = "";
let imagesData = [];
let imgFormat = "";

selectExpression.addEventListener("click", (event) => {
  const target = event.target;
  removeFocusedClass("expression-card-focused");
  if (target.classList.contains("img-15")) {
    expressionImgPath = target.getAttribute("src");
    target.closest(".card").classList.add("expression-card-focused");
    insertImage(selectedExpression, expressionImgPath);
    triggerAlert(alertExpressionNodeList, false);
  }
});

selectFrame.addEventListener("click", (event) => {
  const target = event.target;
  removeFocusedClass("frame-card-focused");

  if (target.classList.contains("img-15")) {
    imgFormat = target.dataset.format;
    frameImgPath = target.getAttribute("src");
    target.closest(".card").classList.add("frame-card-focused");
    insertImage(selectedFrame, frameImgPath);
    triggerAlert(alertFrameNodeList, false);
  }
});

mergeBtn.addEventListener("click", () => {
  if (!expressionImgPath) {
    triggerAlert(alertExpressionNodeList, true);
    return;
  }

  if (!frameImgPath) {
    triggerAlert(alertFrameNodeList, true);
    return;
  }

  imagesData.push(frameImgPath, expressionImgPath);
  // console.log(imagesData);

  if (imgFormat === "polaroid") {
    mergePolaroid(expressionImgPath, frameImgPath);
  }

  if (imgFormat === "ocg-green") {
    mergeOcgGreen(expressionImgPath, frameImgPath);
  }

  if (imgFormat === "ocg-purple") {
    mergeOcgPurple(expressionImgPath, frameImgPath);
  }

  mergedImage.previousElementSibling.classList.add("hide");
  mergedImage.classList.add("image-style");
});

function mergePolaroid(expression, frame) {
  mergeImages([
    { src: expression, x: 22, y: 22 },
    { src: frame, x: 0, y: 0 },
  ]).then((b64) => (mergedImage.src = b64));
}

function mergeOcgGreen(expression, frame) {
  mergeImages([
    { src: expression, x: 98, y: 224 },
    { src: frame, x: 0, y: 0 },
  ]).then((b64) => (mergedImage.src = b64));
}

function mergeOcgPurple(expression, frame) {
  mergeImages([
    { src: expression, x: 78, y: 180 },
    { src: frame, x: 0, y: 0 },
  ]).then((b64) => (mergedImage.src = b64));
}

function removeFocusedClass(focusedClass) {
  for (let i = 0; i < cardsNodeList.length; i++) {
    cardsNodeList[i].classList.remove(focusedClass);
  }
}

function triggerAlert(nodeList, hide) {
  if (hide === true) {
    nodeList.forEach((element) => {
      element.classList.remove("hide");
    });
  } else {
    nodeList.forEach((element) => {
      element.classList.add("hide");
    });
  }
}

function insertImage(element, imgPath) {
  element.innerHTML = `<img class="image-style" src='${imgPath}' alt="圖片下載失敗QQ"/>`;
}

downloadBtn.addEventListener("click", () => {
  const imgPath = mergedImage.getAttribute("src");
  saveAs(imgPath, "老婆貓貓.png");
});
