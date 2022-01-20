import fetch from './fetch';

export const getTubeList = () => fetch("nodeapi/getRooms", "GET");