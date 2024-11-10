"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendImage = sendImage;
exports.getImages = getImages;
var axios_1 = require("shared/api/axios");
// export function sendImage(file: File) {
//     // console.log(file)
//     // console.log(typeof file)
//     // const formData = new FormData()
//     // formData.append('img', file)
//     // console.log(formData)
//     // console.log(typeof formData)
//     const image =
//         {
//           img: file
//         }
//         console.log(image)
//       return axios.post('/api/upload/', image, {
//       withCredentials: true,
//     })
// }
function sendImage(file, model_name) {
    var formData = new FormData();
    formData.append('file', file);
    console.log(file, formData);
    return axios_1.default.post("/api/v1/image?name=picture&model_name=".concat(model_name), formData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
function getImages(_a) {
    var id = _a.id;
    return axios_1.default.get("/api/v1/image/".concat(id, "/return_images"), {
        withCredentials: true,
    });
}
