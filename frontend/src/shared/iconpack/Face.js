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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Face = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Face = function (_a) {
    var _b = _a.strokeColor, strokeColor = _b === void 0 ? '#353535' : _b, props = __rest(_a, ["strokeColor"]);
    return ((0, jsx_runtime_1.jsxs)("svg", __assign({ width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props, { children: [(0, jsx_runtime_1.jsx)("path", { d: "M8.5 15.7409C8.5 14.7575 9.20862 13.9198 10.1717 13.7648C11.3829 13.5699 12.6171 13.5699 13.8283 13.7648C14.7914 13.9198 15.5 14.7575 15.5 15.7409V15.9586C15.5 16.5338 15.0376 17 14.4673 17H9.53269C8.96235 17 8.5 16.5338 8.5 15.9586V15.7409Z", stroke: strokeColor, strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M14.0417 9.05882C14.0417 10.1959 13.1276 11.1176 12 11.1176C10.8724 11.1176 9.95833 10.1959 9.95833 9.05882C9.95833 7.92177 10.8724 7 12 7C13.1276 7 14.0417 7.92177 14.0417 9.05882Z", stroke: strokeColor, strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M21 7C21 4.79086 18.7614 3 16 3M3 16C3 18.7614 4.79086 21 7 21M7 3C4.79086 3 3 4.79086 3 7M16 21C18.7614 21 21 18.7614 21 16", stroke: strokeColor, strokeWidth: "1.5", strokeLinecap: "round" })] })));
};
exports.Face = Face;
