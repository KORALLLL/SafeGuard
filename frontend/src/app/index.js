"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var jsx_runtime_1 = require("react/jsx-runtime");
var index_1 = require("pages/index");
var lib_1 = require("./lib");
function App() {
    return ((0, jsx_runtime_1.jsx)(lib_1.CombinedProviders, { children: (0, jsx_runtime_1.jsx)(index_1.default, {}) }));
}
