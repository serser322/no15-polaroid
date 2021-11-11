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
const alertDownloadNodeList = document.querySelectorAll(".alert-download");
const textCustom = document.querySelector(".text-custom");
const textCanvas = document.querySelector(".text-canvas").getContext("2d");
const textImg = document.querySelector(".text-img");
const textarea = document.querySelector("#textarea");
const footerBtn = document.querySelector(".footer-btn");
const introHide = footerBtn.previousElementSibling;
const introShow = introHide.previousElementSibling;

let frameImgPath = "";
let expressionImgPath = "";
let imgFormat = "";

const polaroidPos = { x: 22, y: 22 };
const ocgGreenPos = { x: 98, y: 224 };
const ocgPurplePos = { x: 78, y: 180 };

//Expression selection event
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

//Frame selection event
selectFrame.addEventListener("click", (event) => {
  const target = event.target;
  removeFocusedClass("frame-card-focused");

  if (target.classList.contains("img-15")) {
    imgFormat = target.dataset.format;
    frameImgPath = target.getAttribute("src");
    target.closest(".card").classList.add("frame-card-focused");
    insertImage(selectedFrame, frameImgPath);

    if (imgFormat === "polaroid-custom") {
      textCustom.classList.remove("hide");
    } else {
      textCustom.classList.add("hide");
    }

    triggerAlert(alertFrameNodeList, false);
  }
});

//Images merger event
mergeBtn.addEventListener("click", () => {
  //Error detection
  if (!expressionImgPath) {
    triggerAlert(alertExpressionNodeList, true);
    return;
  }

  if (!frameImgPath) {
    triggerAlert(alertFrameNodeList, true);
    return;
  }

  //Merge different kind of images
  if (imgFormat === "polaroid-custom") {
    mergePolaroidCustom(expressionImgPath, frameImgPath);
  }

  if (imgFormat === "polaroid") {
    merge15Images(expressionImgPath, frameImgPath, polaroidPos);
  }

  if (imgFormat === "ocg-green") {
    merge15Images(expressionImgPath, frameImgPath, ocgGreenPos);
  }

  if (imgFormat === "ocg-purple") {
    merge15Images(expressionImgPath, frameImgPath, ocgPurplePos);
  }

  mergedImage.previousElementSibling.classList.add("hide");
  mergedImage.classList.add("image-style");
});

//Download event
downloadBtn.addEventListener("click", () => {
  const imgPath = mergedImage.getAttribute("src");

  if (!imgPath) {
    triggerAlert(alertDownloadNodeList, true);
    return;
  }

  saveAs(imgPath, "老婆貓貓.png");
  triggerAlert(alertDownloadNodeList, false);
});

footerBtn.addEventListener("mouseenter", () => {
  toggleHidddenIntro();
  footerBtn.innerHTML = "危";
});

footerBtn.addEventListener("mouseout", () => {
  toggleHidddenIntro();
  footerBtn.innerHTML = "請勿接觸此鍵";
});

//Function
function merge15Images(expression, frame, pos) {
  mergeImages([
    { src: expression, x: pos.x, y: pos.y },
    { src: frame, x: 0, y: 0 },
  ]).then((b64) => (mergedImage.src = b64));
}

function mergePolaroidCustom(expression, frame) {
  getCustomTextImage();
  mergeImages([
    { src: expression, x: 22, y: 22 },
    { src: frame, x: 0, y: 0 },
    { src: textImg.getAttribute("src"), x: 30, y: 530 },
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

function getCustomTextImage() {
  textCanvas.font = "bold 45px Noto Sans CJK TC";
  const MaxLine = 2;
  const CharPerLine = 11;
  const LineHeight = 55;
  for (let i = 0; i <= MaxLine - 1; i++) {
    textCanvas.fillText(
      textarea.value.slice(CharPerLine * i, CharPerLine * (i + 1)),
      0,
      LineHeight * (i + 1)
    );
  }

  textImg.src = textCanvas.canvas.toDataURL();
}

function toggleHidddenIntro() {
  introShow.classList.toggle("hide");
  introHide.classList.toggle("hide");
}
