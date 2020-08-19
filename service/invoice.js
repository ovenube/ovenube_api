var request = require('request');

var invoice = {
    find: function (req, res, next) {
        const instanceURL = req.body["instance_url"];
        let resource = ``;
        const token = req.body["token"];
        const headers = {
            'Authorization': "token " + token
        };
        const invoice_name = req.body["invoice_name"];
        const invoice_entity = req.body["invoice_entity"];
        const entity_type = req.body["entity_type"];
        const invoice_status = req.body["invoice_status"];
        const from_date = req.body["from_date"];
        const to_date = req.body["to_date"];
        let filters = ``;
        let fields = ``;
        if (entity_type != undefined) {
            if (entity_type == "customer" || entity_type == "patient") {
                resource = `/api/resource/Sales Invoice/`;
                entity_type = "customer";
                fields = `&fields=["name","tipo_comprobante","posting_date","tax_id","status","${entity_type}","${entity_type}_name","currency","total_qty","net_total","total_taxes_and_charges","total"]`;
            } else if (entity_type == "supplier") {
                resource = `/api/resource/Purchase Invoice/`;
                fields = `&fields=["name","tipo_comprobante","posting_date","tax_id","status","${entity_type}","${entity_type}_name","currency","total_qty","net_total","total_taxes_and_charges","total"]`;
            } else if (entity_type == "student") {
                resource = `/api/resource/Fees/`;
                fields = `&fields=["name","tipo_comprobante","posting_date","tax_id","${entity_type}","${entity_type}_name","currency","grand_total"]`;
            }
            if (invoice_name != undefined) {
                resource = resource + `${invoice_name}`;
                fields = ``;
            } else {
                filters = `?filters=[`;
                if (invoice_entity != undefined) {
                    filters = filters + `["${entity_type}","=","${invoice_entity}"]`;
                    if (invoice_status != undefined) {
                        if (filters.slice(-1) != `[`) {
                            filters = filters + `,`;
                        }
                        filters = filters + `["status","=","${invoice_status}"]`
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
                        let error_message = JSON.parse(body._server_messages)[0];
                        res.status(response.statusCode).send({
                            "response": "No Invoice found",
                            "error": JSON.parse(error_message).message
                        });
                    }
                }
            );
        }
    }
}

module.exports = invoice;