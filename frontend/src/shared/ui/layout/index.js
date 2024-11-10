"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@chakra-ui/react");
var Layout = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(react_1.Flex, { w: "100vw", h: "100vh", direction: "column", justify: "center", align: "center", style: { position: 'relative', overflow: 'hidden' }, backgroundColor: '#E4E4E6', zIndex: 0, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    position: 'absolute',
                    bottom: '-5%',
                    left: '-5%',
                    width: '252px',
                    height: '252px',
                    background: '#BEBAE9',
                    filter: 'blur(70px)',
                    zIndex: -1,
                } }), (0, jsx_runtime_1.jsx)("div", { style: {
                    position: 'absolute',
                    bottom: '+30%',
                    right: '+15%',
                    width: '252px',
                    height: '252px',
                    background: '#BEBAE9',
                    filter: 'blur(70px)',
                    zIndex: -1,
                } }), children] }));
};
exports.Layout = Layout;
