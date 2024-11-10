"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squere = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Squere = function (props) { return ((0, jsx_runtime_1.jsx)("svg", __assign({ width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props, { children: (0, jsx_runtime_1.jsx)("rect", { x: "5.75", y: "5.75", width: "12.5", height: "12.5", rx: "3.25", stroke: "#353535", strokeWidth: "1.5", strokeLinejoin: "round" }) }))); };
exports.Squere = Squere;
