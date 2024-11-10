"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
//import { useTheme } from "@chakra-ui/react"
var react_1 = require("@chakra-ui/react");
var useImageStore_1 = require("entities/upload/model/useImageStore");
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
var ui_1 = require("shared/ui");
var lib_1 = require("../lib");
var iconpack_1 = require("shared/iconpack");
var Result = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, lib_1.useGetImages)(), imagesData = _a.imagesData, isFetching = _a.isFetching;
    console.log(imagesData);
    var image = (0, useImageStore_1.useImageStore)(function (state) { return state.image; });
    var setUpload = (0, useImageStore_1.useImageStore)(function (state) { return state.setUpload; });
    var setImage = (0, useImageStore_1.useImageStore)(function (state) { return state.setImage; });
    var _b = (0, react_2.useState)(null), isLandscape = _b[0], setIsLandscape = _b[1];
    console.log(isLandscape);
    //const imageUrl = 'https://avatars.dzeninfra.ru/get-ynews/271828/c420e881d62fe8317440717c31e026fd/992x496';
    //const imageUrl = 'https://i.pinimg.com/736x/d1/6c/5b/d16c5b47552d9e8bd71582abec78b4d7.jpg';
    (0, react_2.useEffect)(function () {
        if (image) {
            var img_1 = new window.Image();
            var imageUrl_1 = typeof image === 'string' ? image : URL.createObjectURL(image);
            img_1.src = imageUrl_1;
            img_1.onload = function () {
                setIsLandscape(img_1.width > img_1.height);
            };
            return function () {
                if (typeof image !== 'string') {
                    URL.revokeObjectURL(imageUrl_1);
                }
            };
        }
    }, [image]);
    return ((0, jsx_runtime_1.jsx)(ui_1.Flex, { flexDir: isLandscape ? 'column' : 'row', bgColor: 'gray.100', boxShadow: '0px 0px 4px 0px rgba(191, 193, 197, 1)', borderRadius: '20px', w: isLandscape ? { sm: '1020px', base: '1020px', md: '1630px', lg: '1580px' } : { sm: '1148px', base: '1148px', md: '1595px', lg: '1580px' }, h: { sm: '663px', base: '663px', md: '700px', lg: '700px' }, gap: !isLandscape ? '48px' : '0px', p: '20px', children: isFetching ?
            (0, jsx_runtime_1.jsx)(ui_1.Loading, {})
            :
                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(ui_1.Flex, { flexDir: !isLandscape ? 'column' : 'row', w: !isLandscape ? '358px' : '100%', h: '100%', justifyContent: 'space-between', children: [(0, jsx_runtime_1.jsx)(react_1.Box, { w: '358px', children: (0, jsx_runtime_1.jsx)(react_1.Image, { src: image ? (typeof image === 'string' ? image : URL.createObjectURL(image)) : undefined, boxSize: isLandscape ? { sm: 'auto 142px', base: 'auto 142px', md: '200px auto', lg: 'auto 200px' } : { sm: '438px auto', base: '438px auto', md: '657px auto', lg: '657px auto' }, objectFit: 'cover', borderRadius: '10px' }) }), (0, jsx_runtime_1.jsx)(ui_1.Button, { w: isLandscape ? '358px' : '100%', fontSize: { sm: '14px', base: '14px', md: '18px', lg: '18px' }, h: { sm: '40px', base: '40px', md: '50px', lg: '50px' }, variant: 'cancel', onClick: function () {
                                        setImage(null);
                                        setUpload(false);
                                        navigate('/');
                                    }, children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0438 \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" })] }), (0, jsx_runtime_1.jsxs)(ui_1.Flex, { flexDir: 'column', w: '100%', justifyContent: 'flex-start', pr: '28px', children: [(0, jsx_runtime_1.jsx)(ui_1.Text, { color: 'gray.500', fontSize: '16px', fontWeight: 500, children: "\u041F\u043E\u0445\u043E\u0436\u0435, \u043D\u0430 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0435:" }), (0, jsx_runtime_1.jsxs)(ui_1.Flex, { align: 'center', gap: '12px', mt: '6px', children: [(0, jsx_runtime_1.jsx)(react_1.Box, { bgColor: 'gray.200', borderRadius: '8px', p: '4px 25px', children: (0, jsx_runtime_1.jsx)(ui_1.Text, { color: 'gray.500', fontSize: '14px', fontWeight: 400, children: "\u0436\u0438\u0432\u043E\u0442\u043D\u044B\u0435" }) }), (0, jsx_runtime_1.jsx)(react_1.Box, { bgColor: 'gray.200', borderRadius: '8px', p: '4px 25px', children: (0, jsx_runtime_1.jsx)(ui_1.Text, { color: 'gray.500', fontSize: '14px', fontWeight: 400, children: "\u0445\u043E\u043C\u044F\u043A" }) })] }), (0, jsx_runtime_1.jsxs)(react_1.Tabs, { mt: '20px', variant: 'unstyled', children: [(0, jsx_runtime_1.jsxs)(ui_1.Flex, { align: 'center', justifyContent: 'space-between', children: [(0, jsx_runtime_1.jsxs)(react_1.TabList, { children: [(0, jsx_runtime_1.jsx)(react_1.Tab, { color: 'gray.500', _selected: { color: 'violet.500', borderBottom: '2px solid #5F5ECF' }, children: "\u041F\u043E\u0445\u043E\u0436\u0438\u0435" }), (0, jsx_runtime_1.jsx)(react_1.Tab, { color: 'gray.500', _selected: { color: 'violet.500', borderBottom: '2px solid #5F5ECF' }, children: "\u0421\u0430\u0439\u0442\u044B" })] }), (0, jsx_runtime_1.jsx)(ui_1.Text, { cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: 'violet.500', _hover: {
                                                        color: 'violet.600'
                                                    }, onClick: function () { }, children: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435" })] }), (0, jsx_runtime_1.jsxs)(react_1.TabPanels, { children: [(0, jsx_runtime_1.jsx)(react_1.TabPanel, { children: (0, jsx_runtime_1.jsxs)(ui_1.Flex, { wrap: 'wrap', gap: '24px', mt: '10px', overflowY: 'auto', maxH: !isLandscape ? { sm: '480px', base: '480px', md: '520px', lg: '520px' } : { sm: '270px', base: '270px', md: '310px', lg: '310px' }, children: [imagesData && imagesData.map(function (item) { return ((0, jsx_runtime_1.jsxs)(react_1.Box, { w: "198px", children: [(0, jsx_runtime_1.jsx)(react_1.Image, { src: item.file_link, boxSize: "198px", borderRadius: "8px", objectFit: "cover", mb: "8px" }), (0, jsx_runtime_1.jsx)(ui_1.Text, { fontSize: "14px", color: "gray.500", fontWeight: 500, children: "\u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435, \u0442\u0435\u0433\u0438" }), (0, jsx_runtime_1.jsx)(ui_1.Text, { fontSize: "14px", color: "violet.500", cursor: "pointer", fontWeight: 500, _hover: { color: 'violet.600' }, children: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] }, item.id)); }), !imagesData &&
                                                                (0, jsx_runtime_1.jsxs)(ui_1.Flex, { flexDir: 'column', alignItems: 'center', justifyContent: 'center', w: '100%', children: [(0, jsx_runtime_1.jsx)(iconpack_1.Nothing, {}), (0, jsx_runtime_1.jsx)(ui_1.Text, { fontSize: '20px', fontWeight: 400, color: 'gray.500', children: "\u0421\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u044F \u043D\u0430 \u0441\u0430\u0439\u0442\u0430\u0445 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B" })] })] }) }), (0, jsx_runtime_1.jsx)(react_1.TabPanel, { children: (0, jsx_runtime_1.jsxs)(ui_1.Flex, { flexDir: 'column', justifyContent: 'center', wrap: 'wrap', gap: '24px', mt: '40px', overflowY: 'auto', maxH: { sm: '480px', base: '480px', md: '520px', lg: '520px' }, align: 'center', children: [(0, jsx_runtime_1.jsx)(iconpack_1.Nothing, {}), (0, jsx_runtime_1.jsx)(ui_1.Text, { fontSize: '20px', fontWeight: 400, color: 'gray.500', children: "\u0421\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u044F \u043D\u0430 \u0441\u0430\u0439\u0442\u0430\u0445 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B" })] }) })] })] })] })] }) }));
};
exports.Result = Result;
