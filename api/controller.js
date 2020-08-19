'use strict';

var properties = require('../package.json');
var customer = require('../service/customer');
var student = require('../service/student');
var patient = require('../service/patient');
var supplier = require('../service/supplier');
var item = require('../service/item');
var invoice = require('../service/invoice');
var order = require('../service/order');
var payment = require('../service/payment');
var quotation = require('../service/quotation');

var controllers = {
    getCustomer: function (req, res) {
        customer.find(req, res, function (err, response) {
            if (err)
                res.send(err);
            res.send(response);
        });
    },
    getStudent: function (req, res) {
        student.find(req, res, function (err, response) {
            if (err)
                res.send(err);
            res.send(response);
        });
    },
    getPatient: function (req, res) {
        patient.find(req, res, function (err, response) {
            if (err)
                res.send(err);
            res.send(response);
        });
    },
    getSupplier: function (req, res) {
        supplier.find(req, res, function (err, response) {
            if (err)
                res.send(err);
            res.send(response);
        });
    },
    getItem: function (req, res) {
        item.find(req, res, function (err, response) {
            if (err)
                res.send(err);
            res.send(response);
        });
    },
    getInvoice: function (req, res) {
        invoice.find(req, res, function (err, response) {
            if (err)
                res.send(err);
            res.send(response);
        });
    },
    getOrder: function (req, res) {
        order.find(req, res, function (err, response) {
            if (err)
                res.send(err);
            res.send(response);
        });
    },
    getPayment: function (req, res) {
        payment.find(req, res, function (err, response) {
            if (err)
                res.send(err);
            res.send(response);
        });
    },
    getQuotation: function (req, res) {
        quotation.find(req, res, function (err, response) {
            if (err)
                res.send(err);
            res.send(response);
        });
    },
};

module.exports = controllers;