/*
*  前言：
*    我已将全部计算逻辑搬移到一个类中，是时候将它多态化了。
*
* 1.第一步是应用以子类取代类型码（362）引入子类，弃用类型代码。
* 为此，我需要为演出计算器创建子类，并在createStatementData中获取对应的子类。
* 要得到正确的子类，我需要将构造函数调用替换为一个普通的函数调用，因为JavaScript的构造函数里无法返回子类。
* 于是我使用以工厂函数取代构造函数（334）。
*
* 2.改造成普通函数后，我就可以在里面创建演出计算器的子类，然后由创建函数决定返回哪一个子类的实例。
*
* 3.准备好实现多态的类结构后，我就可以继续使用以多态取代条件表达式（272）手法了。
    3.1我先从悲剧的价格计算逻辑开始搬移。
    3.2虽说子类有了这个方法已足以覆盖超类对应的条件分支，但要是你也和我一样偏执，你也许还想在超类的分支上抛一个异常。

*   虽然我也可以直接删掉处理悲剧的分支，将错误留给默认分支去抛出，
*     但我更喜欢显式地抛出异常——何况这行代码只能再活个几分钟了（这也是我直接抛出一个字符串而不用更好的错误对象的原因）。
    3.3.再次进行编译、测试、提交。之后，将处理喜剧类型的分支也下移到子类中去。
    3.4理论上讲，我可以将超类的amount方法一并移除了，反正它也不应再被调用到。
       但不删它，给未来的自己留点纪念品也是极好的，顺便可以提醒后来者记得实现这个函数。

* */


class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }


    //3.4
    get amount() {
        throw new Error('subclass responsibility');
    }

    //3.2
    // get amount() {
    //     let result = 0;
    //     switch (this.play.type) {
    //         case "tragedy":
    //             throw 'bad thing';
    //         case "comedy":
    //             result = 30000;
    //             if (this.performance.audience > 20) {
    //                 result += 10000 + 500 * (this.performance.audience - 20);
    //             }
    //             result += 300 * this.performance.audience;
    //             break;
    //         default:
    //             throw new Error(`unknown type: ${this.play.type}`);
    //     }
    //     return result;
    // }


    // get amount() {
    //     let result = 0;
    //     switch (this.play.type) {
    //         case "tragedy":
    //             result = 40000;
    //             if (this.performance.audience > 30) {
    //                 result += 1000 * (this.performance.audience - 30);
    //             }
    //             break;
    //         case "comedy":
    //             result = 30000;
    //             if (this.performance.audience > 20) {
    //                 result += 10000 + 500 * (this.performance.audience - 20);
    //             }
    //             result += 300 * this.performance.audience;
    //             break;
    //         default:
    //             throw new Error(`unknown type: ${this.play.type}`);
    //     }
    //     return result;
    // }

    get volumeCredits() {
        let result = 0;
        result += Math.max(this.performance.audience - 30, 0);
        if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
        return result;
    }
}

//2.
class TragedyCalculator extends PerformanceCalculator {
    //3.1
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    //3.3
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
    // return new PerformanceCalculator(aPerformance, aPlay);
}


export default function createStatementData(invoice, plays) {
    const result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;

    //1.
    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        // const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
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

