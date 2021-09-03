import fetch from './fetch'

export const getPartByID = (data) => fetch(`api/courses/${data.courseID}/video/${data.videoID}`, "POST", "") ;

export const getVideoListByCourseID = (id) => fetch(`api/courses/${id}/video`, "POST", "");

export const getPartListByCourseID = (id) => fetch(`api/courses/${id}/videoList`, "POST", "");

export const deleteVideoByID = (data) => fetch('', 'POST', data);

