import fetch from './fetch';

export const student_login = (data) => fetch("api/student_login", "POST", data);

export const student_register = (data) => fetch("api/student_register", "POST", data);

export const checkLogin_Student = (data) => fetch("api/students/currentUser", "POST", data);