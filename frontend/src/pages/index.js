"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Routing;
var jsx_runtime_1 = require("react/jsx-runtime");
var useImageStore_1 = require("entities/upload/model/useImageStore");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var iconpack_1 = require("shared/iconpack");
var ui_1 = require("shared/ui");
var index_1 = require("widgets/index");
var HomePage = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require('./home'); }); });
var ResultPage = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require('./result'); }); });
var EditPage = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require('./edit'); }); });
function Routing() {
    var isUpload = (0, useImageStore_1.useImageStore)(function (state) { return state.isUpload; });
    return ((0, jsx_runtime_1.jsxs)(ui_1.Layout, { children: [(0, jsx_runtime_1.jsx)(ui_1.Flex, { w: "100%", h: "100px", flexDirection: "column", justifyContent: "space-around", children: (0, jsx_runtime_1.jsx)(ui_1.Flex, { ml: { sm: '40px', base: '40px', md: '60px', lg: '80px' }, children: (0, jsx_runtime_1.jsx)(iconpack_1.Logo, { width: '10%', height: 'auto' }) }) }), (0, jsx_runtime_1.jsxs)(ui_1.Flex, { w: "100vw", h: "100%", children: [(0, jsx_runtime_1.jsx)(ui_1.Flex, { h: "100%", w: "100px", align: 'center', pl: { sm: '40px', base: '40px', md: '60px', lg: '80px' }, children: (0, jsx_runtime_1.jsx)(index_1.BoardMenu, {}) }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/', element: (0, jsx_runtime_1.jsx)(HomePage, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/result', element: isUpload ? ((0, jsx_runtime_1.jsx)(ResultPage, {})) : ((0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/", replace: true })) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/edit', element: isUpload ? ((0, jsx_runtime_1.jsx)(EditPage, {})) : ((0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/", replace: true })) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '*', element: (0, jsx_runtime_1.jsx)(ui_1.Flex, { w: "100%", h: "100%", justifyContent: "center", alignItems: "center", children: (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "404 page" }) }) })] })] })] }));
}
