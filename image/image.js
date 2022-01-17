import fetch from './fetch';

export const getKey = (data) => fetch("/api/upload/coursePicture/getToken", "POST", data);

