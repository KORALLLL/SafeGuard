"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardMenu = BoardMenu;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@chakra-ui/react");
var useImageStore_1 = require("entities/upload/model/useImageStore");
var react_router_dom_1 = require("react-router-dom");
var iconpack_1 = require("shared/iconpack");
var ui_1 = require("shared/ui");
function BoardMenu() {
    var setUpload = (0, useImageStore_1.useImageStore)(function (state) { return state.setUpload; });
    var setImage = (0, useImageStore_1.useImageStore)(function (state) { return state.setImage; });
    var navigate = (0, react_router_dom_1.useNavigate)();
    var isHome = (0, react_router_dom_1.useMatch)('/');
    return ((0, jsx_runtime_1.jsxs)(ui_1.Flex, { flexDirection: 'column', justifyContent: 'center', align: 'center', h: '100%', w: '100%', gap: '24px', children: [(0, jsx_runtime_1.jsx)(react_1.IconButton, { isRound: true, w: { sm: '40px', base: '40px', md: '60px', lg: '80px' }, h: { sm: '40px', base: '40px', md: '60px', lg: '80px' }, "aria-label": "title", icon: (0, jsx_runtime_1.jsx)(iconpack_1.Picture, { width: '75%', height: 'auto', strokeColor: isHome ? '#5F5ECF' : '#353535' }), color: isHome ? 'violet.500' : 'gray.500', borderRadius: "50%", background: 'white', boxShadow: isHome ? 'inset 0px 0px 22.5px 0px rgba(255, 255, 255, 0.25), 0px 0px 8.9px 0px rgba(95, 94, 207, 1)' : '', _hover: {
                    color: 'violet.500',
                    background: 'white',
                    boxShadow: 'inset 0px 0px 22.5px 0px rgba(255, 255, 255, 0.25), 0px 0px 8.9px 0px rgba(95, 94, 207, 1)',
                }, onClick: isHome ? function () { } : function () {
                    setImage(null);
                    setUpload(false);
                    navigate('/');
                } }), (0, jsx_runtime_1.jsx)(react_1.IconButton, { isRound: true, "aria-label": "title", icon: (0, jsx_runtime_1.jsx)(iconpack_1.Face, { width: '75%', height: 'auto' }), w: { sm: '40px', base: '40px', md: '60px', lg: '80px' }, h: { sm: '40px', base: '40px', md: '60px', lg: '80px' }, color: 'gray.500', borderRadius: "30px", background: 'white', boxShadow: '', _hover: {
                    color: 'violet.500',
                    background: 'white',
                    boxShadow: 'inset 0px 0px 22.5px 0px rgba(255, 255, 255, 0.25), 0px 0px 8.9px 0px rgba(95, 94, 207, 1)',
                }, onClick: function () { } }), (0, jsx_runtime_1.jsx)(react_1.IconButton, { isRound: true, "aria-label": "title", icon: (0, jsx_runtime_1.jsx)(iconpack_1.Scrin, { width: '75%', height: 'auto' }), w: { sm: '40px', base: '40px', md: '60px', lg: '80px' }, h: { sm: '40px', base: '40px', md: '60px', lg: '80px' }, color: 'gray.500', borderRadius: "30px", background: 'white', boxShadow: '', _hover: {
                    color: 'violet.500',
                    background: 'white',
                    boxShadow: 'inset 0px 0px 22.5px 0px rgba(255, 255, 255, 0.25), 0px 0px 8.9px 0px rgba(95, 94, 207, 1)',
                }, onClick: function () { } })] }));
}
