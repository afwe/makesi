import fetch from './fetch';
export const uploadNotice = (data)=> fetch('api/courses/notice/upload','POST',data)

export const getAllNotice = (data) => fetch(`api/upload/coursePicture/${data.courseId}`,'')