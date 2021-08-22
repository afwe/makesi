import fetch from './fetch'

export const getVideoByID = (data) => fetch(`api/courses/${data.courseID}/video/${data.videoID}`, "POST", "") ;

export const getVideoListByCourseID = (id) => fetch(`api//courses/${id}/video`, "POST", "");
