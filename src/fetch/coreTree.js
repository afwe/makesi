import fetch from './fetch';

export const updateTreeByID = (data) => fetch(`api/courses/${data.courseId}/video/submit`, "post", data.UploadVideoParam);

export const getTreeByID = (data) => fetch(`api/courses/${data.cid}/video/${data.vid}`, "POST", "");