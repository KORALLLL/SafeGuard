import axios from "shared/api/axios";

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

export function sendImage(file: File, model_name: string) {
  const formData = new FormData();
  formData.append('file', file);
  console.log(file, formData)

  return axios.post(`/api/v1/image?name=picture&model_name=${model_name}`, formData, {
      withCredentials: true,
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
}

export function getImages({ id }: { id: string | undefined }) {
  return axios.get(`/api/v1/image/${id}/return_images`, {
    withCredentials: true,
  })
}