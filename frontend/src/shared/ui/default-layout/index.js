"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLayout = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@chakra-ui/react");
var DefaultLayout = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(react_1.Flex, { w: "100vw", h: "100vh", direction: "column", justify: "center", children: children }));
};
exports.DefaultLayout = DefaultLayout;
