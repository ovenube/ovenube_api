'use strict';

const controller = require('./controller');

module.exports = function (app) {
    app.route('/api/customer')
        .get(controller.getCustomer);
    app.route('/api/student')
        .get(controller.getStudent);
    app.route('/api/patient')
        .get(controller.getPatient);
    app.route('/api/supplier')
        .get(controller.getSupplier);
    app.route('/api/item')
        .get(controller.getItem);
    app.route('/api/invoice')
        .get(controller.getInvoice);
    app.route('/api/order')
        .get(controller.getOrder);
    app.route('/api/payment')
        .get(controller.getPayment);
    app.route('/api/quotation')
        .get(controller.getQuotation);
};