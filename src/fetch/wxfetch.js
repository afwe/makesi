function fetch(  
    url = "",
    method = "GET",
    data = {},
    headers = {}
    ) {
        headers['content-type'] = 'application/x-www-form-urlencoded';
    return new Promise(
        (resolve, reject) => {
            wx.request({
                url: url,
                data: data,
                method: method,
                dataType: 'json',
                responseType: 'rext',
                headers: headers,
                success: resolve,
                fail: reject
            })
        }
    )
}
export default {
    fetch
}