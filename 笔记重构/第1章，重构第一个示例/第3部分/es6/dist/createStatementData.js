"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createStatementData;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
*

* */

var PerformanceCalculator = function () {
    function PerformanceCalculator(aPerformance, aPlay) {
        _classCallCheck(this, PerformanceCalculator);

        this.performance = aPerformance;
        this.play = aPlay;
    }

    _createClass(PerformanceCalculator, [{
        key: "amount",
        get: function get() {
            throw new Error('subclass responsibility');
        }
    }, {
        key: "volumeCredits",
        get: function get() {
            return Math.max(this.performance.audience - 30, 0);
        }
    }]);

    return PerformanceCalculator;
}();

var TragedyCalculator = function (_PerformanceCalculato) {
    _inherits(TragedyCalculator, _PerformanceCalculato);

    function TragedyCalculator() {
        _classCallCheck(this, TragedyCalculator);

        return _possibleConstructorReturn(this, (TragedyCalculator.__proto__ || Object.getPrototypeOf(TragedyCalculator)).apply(this, arguments));
    }

    _createClass(TragedyCalculator, [{
        key: "amount",
        get: function get() {
            var result = 40000;
            if (this.performance.audience > 30) {
                result += 1000 * (this.performance.audience - 30);
            }
            return result;
        }
    }]);

    return TragedyCalculator;
}(PerformanceCalculator);

var ComedyCalculator = function (_PerformanceCalculato2) {
    _inherits(ComedyCalculator, _PerformanceCalculato2);

    function ComedyCalculator() {
        _classCallCheck(this, ComedyCalculator);

        return _possibleConstructorReturn(this, (ComedyCalculator.__proto__ || Object.getPrototypeOf(ComedyCalculator)).apply(this, arguments));
    }

    _createClass(ComedyCalculator, [{
        key: "volumeCredits",
        get: function get() {
            return _get(ComedyCalculator.prototype.__proto__ || Object.getPrototypeOf(ComedyCalculator.prototype), "volumeCredits", this) + Math.floor(this.performance.audience / 5);
        }
    }, {
        key: "amount",
        get: function get() {
            var result = 30000;
            if (this.performance.audience > 20) {
                result += 10000 + 500 * (this.performance.audience - 20);
            }
            result += 300 * this.performance.audience;return result;
        }
    }]);

    return ComedyCalculator;
}(PerformanceCalculator);

function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
        case "tragedy":
            return new TragedyCalculator(aPerformance, aPlay);
        case "comedy":
            return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error("unknown type: " + aPlay.type);
    }
}

function createStatementData(invoice, plays) {
    var result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;

    function enrichPerformance(aPerformance) {
        var calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        var result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function totalAmount(data) {
        return data.performances.reduce(function (total, p) {
            return total + p.amount;
        }, 0);
    }

    function totalVolumeCredits(data) {
        return data.performances.reduce(function (total, p) {
            return total + p.volumeCredits;
        }, 0);
    }
}