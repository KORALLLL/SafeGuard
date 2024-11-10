"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var $api = axios_1.default.create({
    withCredentials: true,
    responseType: 'json',
});
/* == $API with response interceptors == */
$api.interceptors.response.use(function (config) { return config; }, function (error) {
    throw error;
});
exports.default = $api;
