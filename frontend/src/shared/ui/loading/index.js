"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ui_1 = require("shared/ui");
var Loading = function () {
    return ((0, jsx_runtime_1.jsx)(ui_1.Center, { w: "100%", h: "100%", children: (0, jsx_runtime_1.jsx)(ui_1.Spinner, { w: "50px", h: "50px", color: "lightblue.300" }) }));
};
exports.Loading = Loading;
