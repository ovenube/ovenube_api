var request = require('request');

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
        const delivery_status = req.body["delivery_status"];
        const billing_status = req.body["billing_status"];
        const from_date = req.body["from_date"];
        const to_date = req.body["to_date"];
        let filters = ``;
        let fields = ``;
    }
}

module.exports = payment;