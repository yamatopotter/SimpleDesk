import axios from "axios";

export async function uploadPicture(picture) {
  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", picture);
  formData.append("upload_preset", `${import.meta.env.VITE_UPLOAD_PRESET}`);

  try{
    const response = await axios.post(url, formData);
    if(response.status === 200){
        return response.data;
    }
  }
  catch(e){
    return false;
  }

  return false;
}
