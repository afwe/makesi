import fetch from './fetch';

export const uploadVideo = (data) => fetch("api/upload/video", "POST", data);
export const uploadCourseFace = (data) => fetch(`api/upload/coursePicture/${datacourseId}`,"POST",data);