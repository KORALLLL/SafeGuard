"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUpload = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
var iconpack_1 = require("shared/iconpack");
var ui_1 = require("shared/ui");
//import { useImageUpload } from "../lib"
var useImageStore_1 = require("entities/upload/model/useImageStore");
var react_router_dom_1 = require("react-router-dom");
var MAX_FILE_SIZE_MB = 50;
var ImageUpload = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var setUpload = (0, useImageStore_1.useImageStore)(function (state) { return state.setUpload; });
    var setImage = (0, useImageStore_1.useImageStore)(function (state) { return state.setImage; });
    var theme = (0, react_1.useTheme)();
    var gray500 = theme.colors.gray['500'];
    var _a = (0, react_2.useState)(null), file = _a[0], setFile = _a[1];
    //const { uploadImage } = useImageUpload()
    var handleFileChange = function (event) {
        var _a;
        var selectedFile = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };
    var handlePaste = function (event) {
        var _a;
        var clipboardItems = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.items;
        if (clipboardItems) {
            for (var _i = 0, clipboardItems_1 = clipboardItems; _i < clipboardItems_1.length; _i++) {
                var item = clipboardItems_1[_i];
                if (item.type.startsWith('image')) {
                    var pastedFile = item.getAsFile();
                    if (pastedFile) {
                        processFile(pastedFile);
                    }
                    event.preventDefault();
                    break;
                }
            }
        }
    };
    var processFile = function (selectedFile) {
        if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            alert("\u0424\u0430\u0439\u043B \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0439. \u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430 - ".concat(MAX_FILE_SIZE_MB, " \u041C\u0411"));
        }
        else {
            setFile(selectedFile);
        }
    };
    var handleSaveClick = function () {
        if (file) {
            //uploadImage(file);
            setImage(file);
            setUpload(true);
            setFile(null);
            navigate('/edit');
        }
    };
    var handleCancelClick = function () {
        setFile(null);
    };
    (0, react_2.useEffect)(function () {
        document.addEventListener('paste', handlePaste);
        return function () {
            document.removeEventListener('paste', handlePaste);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return ((0, jsx_runtime_1.jsxs)(ui_1.Flex, { flexDir: 'column', align: 'center', justifyContent: 'center', w: { sm: '1036px', base: '1036px', md: '1254px', lg: '2072px' }, h: { sm: '527px', base: '527px', md: '690px', lg: '1054px' }, gap: '25px', children: [(0, jsx_runtime_1.jsxs)(ui_1.Flex, { bgColor: 'gray.100', boxShadow: '0px 0px 4px 0px rgba(191, 193, 197, 1)', borderRadius: '20px', w: { sm: '1036px', base: '1036px', md: '1254px', lg: '2072px' }, h: { sm: '462px', base: '462px', md: '593px', lg: '924px' }, flexDirection: 'column', alignItems: 'center', justify: 'center', gap: '16px', position: "relative", children: [file ? ((0, jsx_runtime_1.jsx)(ui_1.Text, { color: 'gray.500', align: 'center', fontSize: '20px', fontWeight: 500, children: file.name })) : ((0, jsx_runtime_1.jsxs)(ui_1.Flex, { flexDir: 'column', gap: '17px', alignItems: 'center', children: [(0, jsx_runtime_1.jsx)(iconpack_1.CloudUpload, { color: gray500, width: '7%', height: 'auto' }), (0, jsx_runtime_1.jsx)(ui_1.Text, { color: 'gray.500', fontSize: { sm: '20px', base: '20px', md: '30px', lg: '50px' }, fontWeight: 400, align: 'center', children: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0432 \u044D\u0442\u043E \u043E\u043A\u043D\u043E" }), (0, jsx_runtime_1.jsx)(ui_1.Text, { fontSize: { sm: '20px', base: '20px', md: '30px', lg: '50px' }, fontWeight: 500, color: 'gray.500', children: ".jpg, .jpeg" }), (0, jsx_runtime_1.jsx)(ui_1.Text, { fontSize: { sm: '18px', base: '18px', md: '28px', lg: '48px' }, fontWeight: 400, color: 'gray.500', children: "\u0420\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430: \u0434\u043E 50 MB" })] })), (0, jsx_runtime_1.jsx)("input", { name: "img", type: "file", accept: ".jpg, .png", onChange: handleFileChange, style: {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            opacity: 0,
                            cursor: 'pointer',
                        } })] }), (0, jsx_runtime_1.jsxs)(ui_1.Flex, { gap: { sm: '36px', base: '36px', md: '54px', lg: '72px' }, justifyContent: 'space-between', align: 'center', w: '100%', children: [(0, jsx_runtime_1.jsx)(ui_1.Button, { fontSize: { sm: '14px', base: '14px', md: '21px', lg: '28px' }, h: { sm: '40px', base: '40px', md: '62px', lg: '82px' }, variant: 'cancel', onClick: handleCancelClick, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }), (0, jsx_runtime_1.jsx)(ui_1.Button, { h: { sm: '40px', base: '40px', md: '62px', lg: '82px' }, fontSize: { sm: '14px', base: '14px', md: '21px', lg: '28px' }, onClick: handleSaveClick, children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C" })] })] }));
};
exports.ImageUpload = ImageUpload;
