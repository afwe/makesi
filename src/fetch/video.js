import fetch from './fetch'

export const getVideoByCourseID = (id) => fetch(`api/courses/${id}/video`, "POST", "") ;