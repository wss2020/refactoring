/*
* 创建演出计算器
  1.enrichPerformance函数是关键所在，因为正是它用每场演出的数据来填充中转数据结构。
* 目前它直接调用了计算价格和观众量积分的函数，我需要创建一个类，通过这个类来调用这些函数。
* 由于这个类存放了与每场演出相关数据的计算函数，于是我把它称为演出计算器（performance calculator）。

* 2.到目前为止，这个新对象还没做什么事。我希望将函数行为搬移进来，这可以从最容易搬移的东西——play字段开始。
  严格来讲，我不需要搬移这个字段，因为它并未体现出多态性，但这样可以把所有数据转换集中到一处地方，保证了代码的一致性和清晰度。
  为此，我将使用改变函数声明（124）手法将performance的play字段传给计算器。

*
*
* 3.将函数搬移进计算器
* 我要搬移的下一块逻辑，对计算一场演出的价格（amount）来说就尤为重要了。
* 在调整嵌套函数的层级时，我经常将函数挪来挪去，但接下来需要改动到更深入的函数上下文，因此我将小心使用搬移函数（198）来重构它。
* 首先，将amount函数的逻辑复制一份到新的上下文中，也就是PerformanceCalculator类中。
* 然后微调一下代码，将aPerformance改为this.performance，将playFor(aPerformance)改为this.play，使代码适应这个新家。
       搬移完成后可以编译一下，看看是否有编译错误。我在本地开发环境运行代码时，编译会自动发生，
*   我实际需要做的只是运行一下Babel。编译能帮我发现新函数中潜在的语法错误，语法之外的就帮不上什么忙了。尽管如此，这一步还是很有用。
    使新函数适应新家后，我会将原来的函数改造成一个委托函数，让它直接调用新函数。

  4.现在，我可以执行一次编译、测试、提交，确保代码搬到新家后也能如常工作。
     之后，我应用内联函数（115），让引用点直接调用新函数（然后编译、测试、提交）。


* 5.搬移观众量积分计算也遵循同样的流程。
*
*
* */


class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }


    // 3.将函数搬移进计算器
    get amountFor() {
        let result = 0;
        switch (this.play.type) {
            case "tragedy":
                result = 40000;
                if (this.performance.audience > 30) {
                    result += 1000 * (this.performance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (this.performance.audience > 20) {
                    result += 10000 + 500 * (this.performance.audience - 20);
                }
                result += 300 * this.performance.audience;
                break;
            default:
                throw new Error(`unknown type: ${this.play.type}`);
        }
        return result;
    }

    //5.搬移观众量积分计算
    get volumeCreditsFor() {
        let result = 0;
        result += Math.max(this.performance.audience - 30, 0);
        if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
        return result;
    }
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
        //2.使用改变函数声明（124）手法将performance的play字段传给计算器。
        const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
        // const calculator = new PerformanceCalculator(aPerformance);
        const result = Object.assign({}, aPerformance);
        //2.
        result.play = calculator.play;
        // result.play = playFor(result);
        //4.
        result.amount = calculator.amount;
        // result.amount = amountFor(result);
        result.volumeCredits = calculator.volumeCredits;
        // result.volumeCredits = volumeCreditsFor(result);
        return result;
    }
    // function enrichPerformance(aPerformance) {
    //     const result = Object.assign({}, aPerformance);
    //     result.play = playFor(result);
    //     result.amount = amountFor(result);
    //     result.volumeCredits = volumeCreditsFor(result);
    //     return result;
    // }

    function playFor(aPerformance) {
        return plays[aPerformance.playID]
    }



    // function amountFor(aPerformance) {
    //     //3.将函数搬移进计算器
    //     return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
    //
    //     // let result = 0;
    //     // switch (aPerformance.play.type) {
    //     //     case "tragedy":
    //     //         result = 40000;
    //     //         if (aPerformance.audience > 30) {
    //     //             result += 1000 * (aPerformance.audience - 30);
    //     //         }
    //     //         break;
    //     //     case "comedy":
    //     //         result = 30000;
    //     //         if (aPerformance.audience > 20) {
    //     //             result += 10000 + 500 * (aPerformance.audience - 20);
    //     //         }
    //     //         result += 300 * aPerformance.audience;
    //     //         break;
    //     //     default:
    //     //         throw new Error(`unknown type: ${aPerformance.play.type}`);
    //     // }
    //     // return result;
    // }

    // function volumeCreditsFor(aPerformance) {
    //     return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumeCreditsFor;
    //
    //
    //     // let result = 0;
    //     // result += Math.max(aPerformance.audience - 30, 0);
    //     // if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
    //     // return result;
    // }

    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);

    }

}

