/*
* 1. 下一个要替换的条件表达式是观众量积分的计算。
* 我回顾了一下前面关于未来戏剧类型的讨论，发现大多数剧类在计算积分时都会检查观众数是否达到30，仅一小部分品类有所不同。
* 因此，将更为通用的逻辑放到超类作为默认条件，出现特殊场景时按需覆盖它，听起来十分合理。于是我将一部分喜剧的逻辑下移到子类。

* */


class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
        throw new Error('subclass responsibility');
    }

    get volumeCredits() {
        //1
        return Math.max(this.performance.audience - 30, 0);
        // let result = 0;
        // result += Math.max(this.performance.audience - 30, 0);
        // if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
        // return result;
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    //1
    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
    get amount() {
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience; return result;
    }
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
        case "tragedy":
            return new TragedyCalculator(aPerformance, aPlay);
        case "comedy" :
            return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`unknown type: ${aPlay.type}`);
    }
}


export default function createStatementData(invoice, plays) {
    const result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID]
    }

    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);

    }

}

