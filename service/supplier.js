var request = require('request');

var supplier = {
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
            url: instanceURL + `/api/resource/Supplier/?filters=[["tax_id", "=", ${tax_id}]]&fields=["supplier_name","tax_id"]`,
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
                    let error_message = JSON.parse(body._server_messages)[0];
                    res.status(response.statusCode).send({
                        "response": "No Supplier found",
                        "error": JSON.parse(error_message).message
                    });
                }
            }
        );
    }
}

module.exports = supplier;