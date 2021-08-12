import fetch from './fetch';

export const updateTreeByID = (data) => fetch(`api/courses/${data.courseID}/video/submit`, "post", data);

export const getTreeByID = (id) => fetch(`api/courses/${id}/video`, "POST", "");