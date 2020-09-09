var request = require('requestretry');

var order = {
    find: function (req, res, next) {
        const instanceURL = req.body["instance_url"];
        let resource = ``;
        const token = req.body["token"];
        const headers = {
            'Authorization': "token " + token
        };
        const order_name = req.body["order_name"];
        const order_entity = req.body["order_entity"];
        const entity_type = req.body["entity_type"];
        const order_status = req.body["order_status"];
        const delivery_status = req.body["delivery_status"];
        const billing_status = req.body["billing_status"];
        const from_date = req.body["from_date"];
        const to_date = req.body["to_date"];
        let filters = ``;
        let fields = ``;
        if (entity_type != undefined) {
            if (entity_type == "customer") {
                resource = `/api/resource/Sales Order/`;
                fields = `&fields=["name","status","delivery_status","billing_status","transaction_date","${entity_type}","${entity_type}_name","currency","total_qty","net_total","total_taxes_and_charges","grand_total"]`;
            } else if (entity_type == "supplier") {
                resource = `/api/resource/Purchase Order/`;
                fields = `&fields=["name","status","transaction_date","${entity_type}","${entity_type}_name","currency","total_qty","net_total","total_taxes_and_charges","grand_total"]`;
            }
            if (order_name != undefined) {
                resource = resource + `${order_name}`;
                fields = ``;
            } else {
                filters = `?filters=[`;
                if (order_entity != undefined) {
                    filters = filters + `["${entity_type}","=","${order_entity}"]`;
                    if (order_status != undefined) {
                        if (filters.slice(-1) != `[`) {
                            filters = filters + `,`;
                        }
                        filters = filters + `["status","=","${order_status}"]`
                    }
                    if (delivery_status != undefined && entity_type == "customer") {
                        if (filters.slice(-1) != `[`) {
                            filters = filters + `,`;
                        }
                        filters = filters + `["delivery_status","=","${delivery_status}"]`
                    }
                    if (billing_status != undefined && entity_type == "customer") {
                        if (filters.slice(-1) != `[`) {
                            filters = filters + `,`;
                        }
                        filters = filters + `["billing_status","=","${billing_status}"]`
                    }
                    if (from_date != undefined) {
                        if (filters.slice(-1) != `[`) {
                            filters = filters + `,`;
                        }
                        filters = filters + `["transaction_date",">=","${from_date}"]`
                    }
                    if (to_date != undefined) {
                        if (filters.slice(-1) != `[`) {
                            filters = filters + `,`;
                        }
                        filters = filters + `["transaction_date","<=","${to_date}"]`
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
                            "response": "No Order found",
                            "error": error_message
                        });
                    }
                }
            );
        }
    }
}

module.exports = order;