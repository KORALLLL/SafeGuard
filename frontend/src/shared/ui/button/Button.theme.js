"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonTheme = void 0;
var react_1 = require("@chakra-ui/react");
exports.ButtonTheme = (0, react_1.defineStyleConfig)({
    baseStyle: {
        w: '100%',
        borderRadius: '12px',
        fontWeight: '500',
        fontSize: '14px',
        background: 'violet.500',
        color: 'white',
        _hover: { background: 'violet.600', color: 'white' },
        _disabled: { background: 'violet.200', opacity: 1 },
    },
    variants: {
        baseStyle: {
            w: '100%',
            borderRadius: '12px',
            fontWeight: '500',
            fontSize: '14px',
            background: 'violet.500',
            color: 'white',
            _hover: { background: 'violet.600', color: 'white' },
            _disabled: { background: 'violet.200', opacity: 1 },
        },
        cancel: {
            w: '100%',
            borderRadius: '12px',
            fontWeight: '500',
            fontSize: '14px',
            background: 'gray.500',
            color: 'gray.100',
            _hover: { background: 'gray.600', color: 'white' },
        },
        edit: {
            w: '100%',
            borderRadius: '12px',
            fontWeight: '500',
            fontSize: '14px',
            background: 'gray.200',
            color: 'gray.500',
            _hover: { background: 'violet.200', color: 'gray.500' },
        },
    },
});
