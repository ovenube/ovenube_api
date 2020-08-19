var request = require('requestretry');

var quotation = {
    find: function (req, res, next) {
        const instanceURL = req.body["instance_url"];
        let resource = ``;
        const token = req.body["token"];
        const headers = {
            'Authorization': "token " + token
        };
        const quotation_name = req.body["quotation_name"];
        const quotation_entity = req.body["quotation_entity"];
        const quotation_status = req.body["quotation_status"];
        const from_date = req.body["from_date"];
        const to_date = req.body["to_date"];
        let filters = ``;
        let fields = ``;
        resource = `/api/resource/Quotation/`;
        fields = `&fields=["name","status","transaction_date","valid_till","order_type,"quotation_to","party_name","currency","total_qty","net_total","total_taxes_and_charges","grand_total"]`;
        if (quotation_name != undefined) {
            resource = resource + `${quotation_name}`;
            fields = ``;
        } else {
            filters = `?filters=[`;
            if (quotation_entity != undefined) {
                filters = filters + `["party_name","=","${quotation_entity}"]`;
                if (quotation_status != undefined) {
                    if (filters.slice(-1) != `[`) {
                        filters = filters + `,`;
                    }
                    filters = filters + `["status","=","${quotation_status}"]`
                }
                if (quotation_status != undefined) {
                    if (filters.slice(-1) != `[`) {
                        filters = filters + `,`;
                    }
                    filters = filters + `["quotation_status","=","${quotation_status}"]`
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
                        "response": "No Invoice found",
                        "error": error_message
                    });
                }
            }
        );
    }
}

module.exports = quotation;