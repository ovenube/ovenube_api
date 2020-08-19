var request = require('requestretry');

var payment = {
    find: function (req, res, next) {
        const instanceURL = req.body["instance_url"];
        let resource = ``;
        const token = req.body["token"];
        const headers = {
            'Authorization': "token " + token
        };
        const payment_name = req.body["payment_name"];
        const payment_type = req.body["payment_type"];
        const payment_entity = req.body["payment_entity"];
        const entity_type = req.body["entity_type"];
        const payment_status = req.body["payment_status"];
        const from_date = req.body["from_date"];
        const to_date = req.body["to_date"];
        let filters = ``;
        let fields = ``;
        if (entity_type != undefined) {
            resource = `/api/resource/Payment Entry/`;
            fields = `&fields=["name","payment_type","posting_date","status","party_type","party","mode_of_payment","paid_amount","base_paid_amount","reference_no","reference_date"]`;
            if (entity_type == "customer" || entity_type == "patient") {
                entity_type = "customer";
            }
            if (payment_name != undefined) {
                resource = resource + `${payment_name}`;
                fields = ``;
            } else {
                filters = `?filters=[`;
                if (payment_entity != undefined) {
                    filters = filters + `["party  ","=","${payment_entity}"]`;
                    if (payment_type != undefined) {
                        if (filters.slice(-1) != `[`) {
                            filters = filters + `,`;
                        }
                        filters = filters + `["status","=","${payment_type}"]`
                    }
                    if (payment_status != undefined) {
                        if (filters.slice(-1) != `[`) {
                            filters = filters + `,`;
                        }
                        filters = filters + `["status","=","${payment_status}"]`
                    }
                    if (from_date != undefined) {
                        if (filters.slice(-1) != `[`) {
                            filters = filters + `,`;
                        }
                        filters = filters + `["posting_date",">=","${from_date}"]`
                    }
                    if (to_date != undefined) {
                        if (filters.slice(-1) != `[`) {
                            filters = filters + `,`;
                        }
                        filters = filters + `["posting_date","<=","${to_date}"]`
                    }
                }
                filters = filters + `]`;
            }
            var options = {
                method: 'GET',
                json: true,
                timeout: 4000,
                maxAttempts: 10,
                retryDelay: 1000,
                url: instanceURL + resource + filters + fields,
                headers: headers
            }
            request(options,
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let r = body.data;
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
                            "response": "No payment found",
                            "error": error_message
                        });
                    }
                }
            );
        }
    }
}

module.exports = payment;