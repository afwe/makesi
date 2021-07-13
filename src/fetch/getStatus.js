import fetch from './fetch';

export const login = (data) => fetch("api/login", "POST", data);

export const register = (data) => fetch("api/register", "POST", data);

