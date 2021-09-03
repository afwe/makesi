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
/*
{
    courseId: ,
    videoId:
}
*/
export const get_visit_status = (data) => fetch('', 'POST', data);
/*
{
    courseId: ,
    videoId: ,
}
*/
export const get_time_status = (data) => fetch('', 'POST', data);
/*
{
    courseId: ,
    videoid: ,
}
直接返回object数组[
    {
        id: ,
        times: ,
    }
]
*/
export const get_pick_status = (data) => fetch('', 'POST', data);