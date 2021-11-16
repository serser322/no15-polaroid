// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"psK8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Defaults
var defaultOptions = {
  format: 'image/png',
  quality: 0.92,
  width: undefined,
  height: undefined,
  Canvas: undefined,
  crossOrigin: undefined
}; // Return Promise

var mergeImages = function (sources, options) {
  if (sources === void 0) sources = [];
  if (options === void 0) options = {};
  return new Promise(function (resolve) {
    options = Object.assign({}, defaultOptions, options); // Setup browser/Node.js specific variables

    var canvas = options.Canvas ? new options.Canvas() : window.document.createElement('canvas');
    var Image = options.Image || window.Image; // Load sources

    var images = sources.map(function (source) {
      return new Promise(function (resolve, reject) {
        // Convert sources to objects
        if (source.constructor.name !== 'Object') {
          source = {
            src: source
          };
        } // Resolve source and img when loaded


        var img = new Image();
        img.crossOrigin = options.crossOrigin;

        img.onerror = function () {
          return reject(new Error('Couldn\'t load image'));
        };

        img.onload = function () {
          return resolve(Object.assign({}, source, {
            img: img
          }));
        };

        img.src = source.src;
      });
    }); // Get canvas context

    var ctx = canvas.getContext('2d'); // When sources have loaded

    resolve(Promise.all(images).then(function (images) {
      // Set canvas dimensions
      var getSize = function (dim) {
        return options[dim] || Math.max.apply(Math, images.map(function (image) {
          return image.img[dim];
        }));
      };

      canvas.width = getSize('width');
      canvas.height = getSize('height'); // Draw images to canvas

      images.forEach(function (image) {
        ctx.globalAlpha = image.opacity ? image.opacity : 1;
        return ctx.drawImage(image.img, image.x || 0, image.y || 0);
      });

      if (options.Canvas && options.format === 'image/jpeg') {
        // Resolve data URI for node-canvas jpeg async
        return new Promise(function (resolve, reject) {
          canvas.toDataURL(options.format, {
            quality: options.quality,
            progressive: false
          }, function (err, jpeg) {
            if (err) {
              reject(err);
              return;
            }

            resolve(jpeg);
          });
        });
      } // Resolve all other data URIs sync


      return canvas.toDataURL(options.format, options.quality);
    }));
  });
};

var _default = mergeImages;
exports.default = _default;
},{}],"i0aF":[function(require,module,exports) {
var define;
var global = arguments[3];
(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g,"undefined"!=typeof module&&(module.exports=g)});


},{}],"mpVp":[function(require,module,exports) {
"use strict";

var _mergeImages = _interopRequireDefault(require("merge-images"));

var _fileSaver = require("file-saver");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergedImage = document.querySelector(".merged-image");
var mergeBtn = document.querySelector(".merge-btn");
var selectFrame = document.querySelector(".select-frame");
var selectExpression = document.querySelector(".select-expression");
var downloadBtn = document.querySelector(".download-btn");
var cardsNodeList = document.querySelectorAll(".card");
var selectedExpression = document.querySelector(".selected-expression");
var selectedFrame = document.querySelector(".selected-frame");
var alertExpressionNodeList = document.querySelectorAll(".alert-expression");
var alertFrameNodeList = document.querySelectorAll(".alert-frame");
var alertDownloadNodeList = document.querySelectorAll(".alert-download");
var textCustom = document.querySelector(".text-custom");
var textCanvas = document.querySelector(".text-canvas").getContext("2d");
var textImg = document.querySelector(".text-img");
var textarea = document.querySelector("#textarea");
var footerBtn = document.querySelector(".footer-btn");
var introHide = footerBtn.previousElementSibling;
var introShow = introHide.previousElementSibling;
var frameImgPath = "";
var expressionImgPath = "";
var imgFormat = "";
var polaroidPos = {
  x: 22,
  y: 22
};
var ocgGreenPos = {
  x: 98,
  y: 224
};
var ocgPurplePos = {
  x: 78,
  y: 180
}; //Expression selection event

selectExpression.addEventListener("click", function (event) {
  var target = event.target;
  removeFocusedClass("expression-card-focused");

  if (target.classList.contains("img-15")) {
    expressionImgPath = target.getAttribute("src");
    target.closest(".card").classList.add("expression-card-focused");
    insertImage(selectedExpression, expressionImgPath);
    triggerAlert(alertExpressionNodeList, false);
  }
}); //Frame selection event

selectFrame.addEventListener("click", function (event) {
  var target = event.target;
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
}); //Images merger event

mergeBtn.addEventListener("click", function () {
  //Error detection
  if (!expressionImgPath) {
    triggerAlert(alertExpressionNodeList, true);
    return;
  }

  if (!frameImgPath) {
    triggerAlert(alertFrameNodeList, true);
    return;
  } //Merge different kind of images


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
}); //Download event

downloadBtn.addEventListener("click", function () {
  var imgPath = mergedImage.getAttribute("src");

  if (!imgPath) {
    triggerAlert(alertDownloadNodeList, true);
    return;
  }

  (0, _fileSaver.saveAs)(imgPath, "老婆貓貓.png");
  triggerAlert(alertDownloadNodeList, false);
});
footerBtn.addEventListener("mouseenter", function () {
  toggleHidddenIntro();
  footerBtn.innerHTML = "危";
});
footerBtn.addEventListener("mouseout", function () {
  toggleHidddenIntro();
  footerBtn.innerHTML = "請勿接觸此鍵";
}); //Function

function merge15Images(expression, frame, pos) {
  (0, _mergeImages.default)([{
    src: expression,
    x: pos.x,
    y: pos.y
  }, {
    src: frame,
    x: 0,
    y: 0
  }]).then(function (b64) {
    return mergedImage.src = b64;
  });
}

function mergePolaroidCustom(expression, frame) {
  getCustomTextImage();
  (0, _mergeImages.default)([{
    src: expression,
    x: 22,
    y: 22
  }, {
    src: frame,
    x: 0,
    y: 0
  }, {
    src: textImg.getAttribute("src"),
    x: 30,
    y: 530
  }]).then(function (b64) {
    return mergedImage.src = b64;
  });
}

function removeFocusedClass(focusedClass) {
  for (var i = 0; i < cardsNodeList.length; i++) {
    cardsNodeList[i].classList.remove(focusedClass);
  }
}

function triggerAlert(nodeList, hide) {
  if (hide === true) {
    nodeList.forEach(function (element) {
      element.classList.remove("hide");
    });
  } else {
    nodeList.forEach(function (element) {
      element.classList.add("hide");
    });
  }
}

function insertImage(element, imgPath) {
  element.innerHTML = "<img class=\"image-style\" src='".concat(imgPath, "' alt=\"\u5716\u7247\u4E0B\u8F09\u5931\u6557QQ\"/>");
}

function getCustomTextImage() {
  textCanvas.font = "bold 45px Noto Sans CJK TC";
  var MaxLine = 2;
  var CharPerLine = 11;
  var LineHeight = 55;

  for (var i = 0; i <= MaxLine - 1; i++) {
    textCanvas.fillText(textarea.value.slice(CharPerLine * i, CharPerLine * (i + 1)), 0, LineHeight * (i + 1));
  }

  textImg.src = textCanvas.canvas.toDataURL();
  textCanvas.clearRect(0, 0, 510, 120); //Clear canvas
}

function toggleHidddenIntro() {
  introShow.classList.toggle("hide");
  introHide.classList.toggle("hide");
}
},{"merge-images":"psK8","file-saver":"i0aF"}]},{},["mpVp"], null)
//# sourceMappingURL=/script.183260f2.js.map
