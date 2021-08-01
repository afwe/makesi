import fetch from './fetch';

export const teacher_login = (data) => fetch("api/teacher_login", "POST", data);

export const teacher_register = (data) => fetch("api/teacher_register", "POST", data);

export const checkLogin_Teacher = (data) => fetch("api/teachers/currentUser", "POST", data);