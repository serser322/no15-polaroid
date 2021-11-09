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
})({"node_modules/merge-images/dist/index.es2015.js":[function(require,module,exports) {
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
},{}],"node_modules/file-saver/dist/FileSaver.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g,"undefined"!=typeof module&&(module.exports=g)});


},{}],"script.js":[function(require,module,exports) {
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
var frameImgPath = "";
var expressionImgPath = "";
var imagesData = [];
var imgFormat = "";
selectExpression.addEventListener("click", function (event) {
  var target = event.target;
  removeFocusedClass("expression-card-focused");

  if (target.classList.contains("img-15")) {
    expressionImgPath = target.getAttribute("src");
    target.closest(".card").classList.add("expression-card-focused");
    insertImage(selectedExpression, expressionImgPath);
    triggerAlert(alertExpressionNodeList, false);
  }
});
selectFrame.addEventListener("click", function (event) {
  var target = event.target;
  removeFocusedClass("frame-card-focused");

  if (target.classList.contains("img-15")) {
    imgFormat = target.dataset.format;
    frameImgPath = target.getAttribute("src");
    target.closest(".card").classList.add("frame-card-focused");
    insertImage(selectedFrame, frameImgPath);
    triggerAlert(alertFrameNodeList, false);
  }
});
mergeBtn.addEventListener("click", function () {
  if (!expressionImgPath) {
    triggerAlert(alertExpressionNodeList, true);
    return;
  }

  if (!frameImgPath) {
    triggerAlert(alertFrameNodeList, true);
    return;
  }

  imagesData.push(frameImgPath, expressionImgPath); // console.log(imagesData);

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
  (0, _mergeImages.default)([{
    src: expression,
    x: 22,
    y: 22
  }, {
    src: frame,
    x: 0,
    y: 0
  }]).then(function (b64) {
    return mergedImage.src = b64;
  });
}

function mergeOcgGreen(expression, frame) {
  (0, _mergeImages.default)([{
    src: expression,
    x: 98,
    y: 224
  }, {
    src: frame,
    x: 0,
    y: 0
  }]).then(function (b64) {
    return mergedImage.src = b64;
  });
}

function mergeOcgPurple(expression, frame) {
  (0, _mergeImages.default)([{
    src: expression,
    x: 78,
    y: 180
  }, {
    src: frame,
    x: 0,
    y: 0
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

downloadBtn.addEventListener("click", function () {
  var imgPath = mergedImage.getAttribute("src");
  (0, _fileSaver.saveAs)(imgPath, "老婆貓貓.png");
});
},{"merge-images":"node_modules/merge-images/dist/index.es2015.js","file-saver":"node_modules/file-saver/dist/FileSaver.min.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "6981" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map