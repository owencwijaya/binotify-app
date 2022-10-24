/*
    template script to perform an AJAX request to API 
    args:
        type: the request type, e.g. "GET" or "POST"
        endpoint: the API URL to post to
        data: the data wanted to be processed
        callback: callback function to be run

*/
const request = (type, endpoint, data, callback) => {
    var request = new XMLHttpRequest();

    // set onreadystatechange event handler

    request.onreadystatechange = () => {
        if (request.readyState == 4){
            alert(request.responseText)
            callback(request.responseText);
        }
    }

    request.open(type, endpoint);

    if (data === undefined){
        request.send()
    } else {
        request.send(data)
    }
}
