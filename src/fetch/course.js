import fetch from './fetch';

export const create_course_identify = (data) => fetch("api/courses/create_course", "POST", data);

export const create_course = (data) => fetch("api/courses/create_course/submit", "POST", data);

export const join_course = (data) => fetch(`api/courses/${data}/join`, "POST", {});

export const get_course_by_id = (id) => fetch(`api/courses/${id}`, "POST", {});

export const get_all_courses = () => fetch("api/courses", "POST", {});

export const deleteCourseByID = (data) => fetch(`api/courses/delete/course/${data.courseId}`, "POST", '');