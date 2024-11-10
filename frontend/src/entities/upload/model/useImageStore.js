"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useImageStore = void 0;
var zustand_1 = require("zustand");
exports.useImageStore = (0, zustand_1.create)()(function (set) { return ({
    isUpload: true,
    imageId: '',
    image: null,
    setUpload: function (isUpload) { return set(function () { return ({ isUpload: isUpload }); }); },
    setImage: function (image) { return set(function () { return ({ image: image }); }); },
    setImageId: function (imageId) { return set(function () { return ({ imageId: imageId }); }); },
}); });
