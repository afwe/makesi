import fetch from './fetch';

export const uploadVideo = (data) => fetch("api/upload/video", "POST", data);