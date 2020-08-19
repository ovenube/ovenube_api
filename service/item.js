var request = require('request');

var item = {
    find: function (req, res, next) {
        const instanceURL = req.body["instance_url"];
        let resource = `/api/resource/Item/`
        const token = req.body["token"];
        const headers = {
            'Authorization': "token " + token
        };
        const name = req.body["name"];
        const item_name = req.body["item_name"];
        const item_group = req.body["item_group"];
        const brand = req.body["brand"];
        const has_variants = req.body["has_variants"];
        const variant_of = req.body["variant_of"];
        let filters = ``;
        let fields = ``;
        if (name != undefined) {
            resource = resource + `${name}`;
        } else {
            filters = `?filters=[`;
            fields = `&fields=["name","item_name","item_code","stock_uom","brand","item_group","image","description","has_variants"]`;
            if (item_name != undefined) {
                filters = filters + `["item_name","LIKE","%${item_name}%"]`;
            }
            if (item_group != undefined) {
                if (filters.slice(-1) != `[`) {
                    filters = filters + `,`;
                }
                filters = filters + `["item_group","LIKE","%${item_group}%"]`;
            }
            if (brand != undefined) {
                if (filters.slice(-1) != `[`) {
                    filters = filters + `,`;
                }
                filters = filters + `["brand","LIKE","%${brand}%"]`;
            }
            if (has_variants != undefined) {
                if (filters.slice(-1) != `[`) {
                    filters = filters + `,`;
                }
                filters = filters + `["has_variants","LIKE","%${has_variants}%"]`;
            }
            if (variant_of != undefined) {
                if (filters.slice(-1) != `[`) {
                    filters = filters + `,`;
                }
                filters = filters + `["variant_of","LIKE","%${variant_of}%"]`;
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

module.exports = item;