"use strict";

var _createStatementData = require("./createStatementData.js");

var _createStatementData2 = _interopRequireDefault(_createStatementData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function statement(invoice, plays) {
    return renderPlainText((0, _createStatementData2.default)(invoice, plays));
} /*
  *
  
  * */

function renderPlainText(data) {
    var result = "Statement for " + data.customer + "\n";
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data.performances[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var perf = _step.value;

            result += " " + perf.play.name + ": " + usd(perf.amount) + " (" + perf.audience + " seats)\n";
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    result += "Amount owed is " + usd(data.totalAmount) + "\n";
    result += "You earned " + data.totalVolumeCredits + " credits\n";
    return result;
}

function htmlStatement(invoice, plays) {
    return renderHtml((0, _createStatementData2.default)(invoice, plays));
}

function renderHtml(data) {
    var result = "<h1>Statement for " + data.customer + "</h1>\n";
    result += "<table>\n";
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = data.performances[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var perf = _step2.value;

            result += "<tr><td>" + perf.play.name + "</td><td>" + perf.audience + "</td>";
            result += "<td>" + usd(perf.amount) + "</td></tr>\n";
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    result += "</table>\n";
    result += "<p>Amount owed is <em>" + usd(data.totalAmount) + "</em></p>\n";
    result += "<p>You earned <em>" + data.totalVolumeCredits + "</em> credits</p>\n";return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber / 100);
}

//演出节目，以及所处类型
var plays = {
    "hamlet": { "name": "Hamlet", "type": "tragedy" },
    "as-like": { "name": "As You Like It", "type": "comedy" },
    "othello": { "name": "Othello", "type": "tragedy" }
};

//客户名称， 所 表演节目，观看人数
var invoices = {
    "customer": "BigCo",
    "performances": [{ "playID": "hamlet", "audience": 55 }, { "playID": "as-like", "audience": 35 }, { "playID": "othello", "audience": 40 }]
};

var result = statement(invoices, plays);
// let result = htmlStatement(invoices, plays);
console.log(result);