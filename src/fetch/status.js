import fetch from './fetch';
/*
    {
        courseId,
        videoId
    }
*/
export const logVisit = (data) => fetch('', 'POST', data);
/*
    {   
        corseId,
        videoId,
        mTime: 3
    }
*/
export const logTime = (data) => fetch('', 'POST', data);
/*
    {
        partId,
    }
*/
export const logPick = (data) => fetch('', 'POST', data);