import fetch from './fetch';

export const login = (data) => fetch("api/student_login", "POST", data);

export const login = (data) => fetch("api/teacher_login", "POST", data);

export const register = (data) => fetch("api/student_register", "POST", data);

export const login = (data) => fetch("api/teacher_login", "POST", data);

export const cheeckLogin = () => fetch("api/checkLogin", "GET");