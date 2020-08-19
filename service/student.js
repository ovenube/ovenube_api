var request = require('requestretry');

var student = {
    find: function (req, res, next) {
        const instanceURL = req.body["instance_url"];
        const token = req.body["token"];
        const headers = {
            'Authorization': "token " + token
        };
        const tax_id = req.body["tax_id"];
        var options = {
            method: 'GET',
            json: true,
            timeout: 4000,
            maxAttempts: 10,
            retryDelay: 1000,
            url: instanceURL + `/api/resource/Student/?filters=[["tax_id", "=", ${tax_id}]]&fields=["title","tax_id"]`,
            headers: headers
        }
        request(options,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    r = body.data[0];
                    res.status(response.statusCode).send({
                        "response": r
                    });
                } else {
                    let error_message;
                    if (body == undefined) {
                        error_message = error.message;
                    } else {
                        error_message = JSON.parse(JSON.parse(body._server_messages)[0]).message;
                    }
                    res.send({
                        "response": "No Invoice found",
                        "error": error_message
                    });
                }
            }
        );
    }
}

module.exports = student;