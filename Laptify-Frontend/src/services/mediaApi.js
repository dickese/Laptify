import axios from "axios";

export const generateFilePath = (file) => {
  const timestamp = Date.now();
  const uuid = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split('.').pop();
  const folder = 'products';
  
  return `${folder}/${timestamp}-${uuid}.${extension}`;
};

export const uploadImage = async (file, filePath) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('filePath', filePath);

  return axios.post('http://localhost:8080/api/v1/media/upload', formData);
};
