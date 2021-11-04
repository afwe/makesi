import fetch from './fetch';

export const getTubeList = () => fetch("nodeApi/getRooms", "get", "");