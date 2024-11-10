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
exports.Scrin = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Scrin = function (_a) {
    var _b = _a.fillColor, fillColor = _b === void 0 ? '#353535' : _b, props = __rest(_a, ["fillColor"]);
    return ((0, jsx_runtime_1.jsx)("svg", __assign({ width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props, { children: (0, jsx_runtime_1.jsx)("path", { d: "M3.47178 13.5544L4.19222 13.346L3.47178 13.5544ZM3.47178 6.90653L2.75134 6.69805H2.75134L3.47178 6.90653ZM20.5282 6.90654L21.2487 6.69806V6.69806L20.5282 6.90654ZM20.5282 13.5544L19.8078 13.346V13.346L20.5282 13.5544ZM16.8148 17.0075L16.6747 16.2707L16.8148 17.0075ZM7.18522 17.0075L7.32531 16.2707L7.18522 17.0075ZM7.18522 3.45344L7.04513 2.71664L7.18522 3.45344ZM16.8148 3.45344L16.9549 2.71664L16.8148 3.45344ZM3.52005 13.7212L2.79961 13.9297H2.79961L3.52005 13.7212ZM20.48 13.7212L21.2004 13.9297L21.2004 13.9297L20.48 13.7212ZM20.48 6.73973L19.7595 6.94822L19.7595 6.94822L20.48 6.73973ZM3.52005 6.73973L4.24049 6.94822L3.52005 6.73973ZM12.75 17.923C12.75 17.5088 12.4142 17.173 12 17.173C11.5858 17.173 11.25 17.5088 11.25 17.923H12.75ZM11.25 21C11.25 21.4142 11.5858 21.75 12 21.75C12.4142 21.75 12.75 21.4142 12.75 21H11.25ZM9.36386 20.25C8.94964 20.25 8.61386 20.5858 8.61386 21C8.61386 21.4142 8.94964 21.75 9.36386 21.75V20.25ZM14.6361 21.75C15.0504 21.75 15.3861 21.4142 15.3861 21C15.3861 20.5858 15.0504 20.25 14.6361 20.25V21.75ZM19.7595 6.94822L19.8078 7.11503L21.2487 6.69806L21.2004 6.53125L19.7595 6.94822ZM19.8078 13.346L19.7595 13.5128L21.2004 13.9297L21.2487 13.7629L19.8078 13.346ZM4.24049 13.5128L4.19222 13.346L2.75134 13.7629L2.79961 13.9297L4.24049 13.5128ZM4.19222 7.11502L4.24049 6.94822L2.79961 6.53125L2.75134 6.69805L4.19222 7.11502ZM4.19222 13.346C3.60259 11.3084 3.60259 9.15256 4.19222 7.11502L2.75134 6.69805C2.08289 9.00798 2.08289 11.453 2.75134 13.7629L4.19222 13.346ZM19.8078 7.11502C20.3974 9.15256 20.3974 11.3084 19.8078 13.346L21.2487 13.7629C21.9171 11.453 21.9171 9.00798 21.2487 6.69806L19.8078 7.11502ZM16.6747 16.2707C13.5875 16.8577 10.4125 16.8577 7.32531 16.2707L7.04513 17.7443C10.3175 18.3665 13.6825 18.3665 16.9549 17.7443L16.6747 16.2707ZM7.32531 4.19024C10.4125 3.60325 13.5875 3.60325 16.6747 4.19024L16.9549 2.71664C13.6825 2.09445 10.3175 2.09445 7.04513 2.71664L7.32531 4.19024ZM7.32531 16.2707C5.83267 15.9869 4.64581 14.9134 4.24049 13.5128L2.79961 13.9297C3.36686 15.8899 5.015 17.3583 7.04513 17.7443L7.32531 16.2707ZM16.9549 17.7443C18.985 17.3583 20.6331 15.8899 21.2004 13.9297L19.7595 13.5128C19.3542 14.9134 18.1673 15.9869 16.6747 16.2707L16.9549 17.7443ZM16.6747 4.19024C18.1673 4.47405 19.3542 5.5476 19.7595 6.94822L21.2004 6.53125C20.6331 4.57103 18.985 3.10264 16.9549 2.71664L16.6747 4.19024ZM7.04513 2.71664C5.015 3.10264 3.36686 4.57103 2.79961 6.53125L4.24049 6.94822C4.64581 5.5476 5.83267 4.47405 7.32531 4.19024L7.04513 2.71664ZM11.25 17.923V21H12.75V17.923H11.25ZM9.36386 21.75H14.6361V20.25H9.36386V21.75Z", fill: fillColor }) })));
};
exports.Scrin = Scrin;
