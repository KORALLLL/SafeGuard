"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LassoSelector = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_konva_1 = require("react-konva");
var use_image_1 = require("use-image");
var ui_1 = require("shared/ui");
var iconpack_1 = require("shared/iconpack");
var react_router_dom_1 = require("react-router-dom");
var useImageStore_1 = require("entities/upload/model/useImageStore");
var lib_1 = require("widgets/ImageUpload/lib");
var LassoSelector = function () {
    var image = (0, useImageStore_1.useImageStore)(function (state) { return state.image; });
    var setUpload = (0, useImageStore_1.useImageStore)(function (state) { return state.setUpload; });
    var setImage = (0, useImageStore_1.useImageStore)(function (state) { return state.setImage; });
    console.log(image);
    var navigate = (0, react_router_dom_1.useNavigate)();
    var uploadImage = (0, lib_1.useImageUpload)().uploadImage;
    //const [originalImage] = useImage(image instanceof File ? URL.createObjectURL(image) : '');
    var _a = (0, react_1.useState)(null), originalImageURL = _a[0], setOriginalImageURL = _a[1];
    var _b = (0, react_1.useState)(''), processedImageURL = _b[0], setProcessedImageURL = _b[1];
    var processedImage = (0, use_image_1.default)(processedImageURL)[0];
    var _c = (0, react_1.useState)([]), points = _c[0], setPoints = _c[1];
    var _d = (0, react_1.useState)(false), isDrawing = _d[0], setIsDrawing = _d[1];
    var _e = (0, react_1.useState)('freeform'), selectionMode = _e[0], setSelectionMode = _e[1];
    var _f = (0, react_1.useState)(null), rectStart = _f[0], setRectStart = _f[1];
    var _g = (0, react_1.useState)(null), rect = _g[0], setRect = _g[1];
    var stageRef = (0, react_1.useRef)(null);
    var imageRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (image) {
            var url_1 = URL.createObjectURL(image);
            setOriginalImageURL(url_1);
            return function () {
                URL.revokeObjectURL(url_1);
            };
        }
    }, [image]);
    (0, react_1.useEffect)(function () {
        if (originalImageURL) {
            localStorage.setItem('originalImage', originalImageURL);
        }
    }, [originalImageURL]);
    (0, react_1.useEffect)(function () {
        var storedImage = localStorage.getItem('originalImage');
        if (storedImage) {
            setOriginalImageURL(storedImage);
        }
    }, []);
    var handleRemoveImage = function () {
        setOriginalImageURL(null);
        localStorage.removeItem('originalImage');
    };
    var originalImage = (0, use_image_1.default)(originalImageURL || '')[0];
    var handleMouseDown = function () {
        var _a;
        setIsDrawing(true);
        setPoints([]);
        setRect(null);
        if (selectionMode === 'rectangle') {
            var point = (_a = stageRef.current) === null || _a === void 0 ? void 0 : _a.getPointerPosition();
            if (point) {
                setRectStart(point);
            }
        }
    };
    var handleMouseMove = function () {
        if (!isDrawing || !stageRef.current)
            return;
        var point = stageRef.current.getPointerPosition();
        if (point) {
            if (selectionMode === 'freeform') {
                setPoints(function (prevPoints) { return __spreadArray(__spreadArray([], prevPoints, true), [point.x, point.y], false); });
            }
            else if (selectionMode === 'rectangle' && rectStart) {
                var width = point.x - rectStart.x;
                var height = point.y - rectStart.y;
                setRect({
                    x: Math.min(point.x, rectStart.x),
                    y: Math.min(point.y, rectStart.y),
                    width: Math.abs(width),
                    height: Math.abs(height),
                });
            }
        }
    };
    var handleMouseUp = function () {
        setIsDrawing(false);
        if (selectionMode === 'freeform') {
            setPoints(function (prevPoints) { return __spreadArray(__spreadArray([], prevPoints, true), [prevPoints[0], prevPoints[1]], false); });
        }
        handleProcessImage();
    };
    var handleProcessImage = function () {
        if (!stageRef.current || !originalImage || !imageRef.current)
            return;
        var canvas = document.createElement('canvas');
        var _a = calculateImageSize(), canvasWidth = _a.width, canvasHeight = _a.height;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        var context = canvas.getContext('2d');
        if (!context)
            return;
        context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);
        context.fillStyle = 'rgba(95, 94, 207, 0.8)';
        context.beginPath();
        context.rect(0, 0, canvasWidth, canvasHeight);
        if (selectionMode === 'freeform' && points.length >= 4) {
            context.moveTo(points[0], points[1]);
            for (var i = 2; i < points.length; i += 2) {
                context.lineTo(points[i], points[i + 1]);
            }
            context.closePath();
        }
        else if (selectionMode === 'rectangle' && rect) {
            context.rect(rect.x, rect.y, rect.width, rect.height);
        }
        context.fill('evenodd');
        var processedImageURL = canvas.toDataURL();
        setProcessedImageURL(processedImageURL);
    };
    var handleClearSelection = function () {
        setPoints([]);
        setRect(null);
        setProcessedImageURL('');
    };
    var dataURLtoFile = function (dataURL, filename) {
        var arr = dataURL.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    var handleSend = function () {
        if (processedImageURL) {
            // Если было сделано выделение, отправляем обработанное изображение
            var file = dataURLtoFile(processedImageURL, 'processed-image.jpg');
            uploadImage(file);
        }
        else if (originalImageURL) {
            console.log(9090);
            // Если выделения нет, отправляем оригинальное изображение
            var file = dataURLtoFile(originalImageURL, 'original-image.jpg');
            uploadImage(file);
        }
        else {
            console.error("No image available to send.");
        }
    };
    var containerWidth = 500;
    var containerHeight = 400;
    var calculateImageSize = function () {
        if (originalImage) {
            var imgAspect = originalImage.width / originalImage.height;
            var containerAspect = containerWidth / containerHeight;
            if (imgAspect > containerAspect) {
                return { width: containerWidth, height: containerWidth / imgAspect };
            }
            else {
                return { width: containerHeight * imgAspect, height: containerHeight };
            }
        }
        return { width: containerWidth, height: containerHeight };
    };
    var _h = calculateImageSize(), imageWidth = _h.width, imageHeight = _h.height;
    return ((0, jsx_runtime_1.jsxs)(ui_1.Flex, { flexDir: 'column', align: 'center', justifyContent: 'center', w: { sm: '1036px', base: '1036px', md: '1254px', lg: '1254px' }, h: { sm: '527px', base: '527px', md: '690px', lg: '690px' }, gap: '25px', children: [(0, jsx_runtime_1.jsxs)(ui_1.Flex, { bgColor: 'gray.100', boxShadow: '0px 0px 4px 0px rgba(191, 193, 197, 1)', borderRadius: '20px', w: { sm: '1036px', base: '1036px', md: '1254px', lg: '1254px' }, h: { sm: '462px', base: '462px', md: '593px', lg: '924px' }, gap: '16px', p: '28px 70px', children: [(0, jsx_runtime_1.jsx)(react_konva_1.Stage, { width: 600, height: 400, ref: stageRef, onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, children: (0, jsx_runtime_1.jsxs)(react_konva_1.Layer, { children: [!processedImageURL && originalImage && ((0, jsx_runtime_1.jsx)(react_konva_1.Image, { image: originalImage, width: imageWidth, height: imageHeight, ref: imageRef })), processedImageURL && processedImage && ((0, jsx_runtime_1.jsx)(react_konva_1.Image, { image: processedImage, width: imageWidth, height: imageHeight })), selectionMode === 'freeform' ? ((0, jsx_runtime_1.jsx)(react_konva_1.Line, { points: points, stroke: "#5F5ECF", strokeWidth: 2, lineCap: "round", lineJoin: "round", closed: !isDrawing })) : (rect && ((0, jsx_runtime_1.jsx)(react_konva_1.Rect, { x: rect.x, y: rect.y, width: rect.width, height: rect.height, stroke: "#5F5ECF", strokeWidth: 2 })))] }) }), (0, jsx_runtime_1.jsxs)(ui_1.Flex, { direction: "column", gap: "21px", w: '100%', align: 'center', pt: '6px', children: [(0, jsx_runtime_1.jsx)(ui_1.Button, { leftIcon: (0, jsx_runtime_1.jsx)(iconpack_1.Pencil, {}), w: '290px', bgColor: selectionMode === 'rectangle' ? 'gray.200' : 'violet.200', onClick: function () { return setSelectionMode('freeform'); }, variant: 'edit', children: "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u0443\u044E \u043E\u0431\u043B\u0430\u0441\u0442\u044C" }), (0, jsx_runtime_1.jsx)(ui_1.Button, { leftIcon: (0, jsx_runtime_1.jsx)(iconpack_1.Squere, {}), w: '290px', bgColor: selectionMode === 'freeform' ? 'gray.200' : 'violet.200', onClick: function () { return setSelectionMode('rectangle'); }, variant: 'edit', children: "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0443\u044E \u043E\u0431\u043B\u0430\u0441\u0442\u044C" }), (0, jsx_runtime_1.jsx)(ui_1.Button, { w: '290px', onClick: handleClearSelection, variant: 'edit', children: "\u0423\u0431\u0440\u0430\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435" })] })] }), (0, jsx_runtime_1.jsxs)(ui_1.Flex, { gap: { sm: '36px', base: '36px', md: '54px', lg: '72px' }, justifyContent: 'space-between', align: 'center', w: '100%', children: [(0, jsx_runtime_1.jsx)(ui_1.Button, { fontSize: { sm: '14px', base: '14px', md: '21px', lg: '28px' }, h: { sm: '40px', base: '40px', md: '62px', lg: '82px' }, variant: 'cancel', onClick: function () {
                            handleRemoveImage();
                            setUpload(false);
                            setImage(null);
                            navigate('/');
                        }, children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0438 \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" }), (0, jsx_runtime_1.jsx)(ui_1.Button, { h: { sm: '40px', base: '40px', md: '62px', lg: '82px' }, fontSize: { sm: '14px', base: '14px', md: '21px', lg: '28px' }, onClick: handleSend, children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C" })] })] }));
};
exports.LassoSelector = LassoSelector;
