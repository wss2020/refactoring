/*
  1.接着我使用类似的手法搬移amountFor函数（编译、测试、提交）。

  2.接下来搬移观众量积分的计算（编译、测试、提交）。

  3.最后，我将两个计算总数的函数搬移到statement函数中。

  4.尽管我可以修改函数体，让这些计算总数的函数直接使用statementData变量（反正它在作用域内），但我更喜欢显式地传入函数参数。
    等到搬移完成，编译、测试、提交也做完，
    我便忍不住以管道取代循环（231）对几个地方进行重构。


*/


function statement(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);

    //3.将两个计算总数的函数搬移到statement函数中
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return renderPlainText(statementData, plays);


    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        //1.搬移amountFor函数
        result.amount = amountFor(result);
        //2.搬移观众量积分的计算
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    //1.搬移amountFor函数
    function amountFor(aPerformance) {
        let result = 0;
        switch (aPerformance.play.type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${aPerformance.play.type}`);
        }
        return result;
    }

    //2.搬移观众量积分的计算
    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
        return result;
    }

    //3.将两个计算总数的函数搬移到statement函数中
    function totalAmount(data) {
        //4.管道取代循环（231）
        return data.performances.reduce((total,p)=> total + p.amount,0);
        // let result = 0;
        // for (let perf of data.performances) {
        //     result += perf.amount;
        // }
        // return result;
    }

    function totalVolumeCredits(data) {
        //4.管道取代循环（231）
        return data.performances.reduce((total,p)=>total + p.volumeCredits,0);
        // let result = 0;
        // for (let perf of data.performances) {
        //     result += perf.volumeCredits;
        // }
        // return result;
    }

}



function renderPlainText(data, plays) {

    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd( perf.amount )} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;




    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
            {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber / 100);
    }

    // function totalAmount() {
    //     let result = 0;
    //     for (let perf of data.performances) {
    //         result += perf.amount;
    //         //1 result += amountFor(perf);
    //     }
    //     return result;
    // }
    //
    // function totalVolumeCredits() {
    //     let result = 0;
    //     for (let perf of data.performances) {
    //         result += perf.volumeCredits;
    //         //2 result += volumeCreditsFor(perf);
    //     }
    //     return result;
    // }

    // function volumeCreditsFor(aPerformance) {
    //     let result = 0;
    //     result += Math.max(aPerformance.audience - 30, 0);
    //     if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
    //     return result;
    // }

    // function amountFor(aPerformance) {
    //     let result = 0;
    //     switch (aPerformance.play.type) {
    //         case "tragedy":
    //             result = 40000;
    //             if (aPerformance.audience > 30) {
    //                 result += 1000 * (aPerformance.audience - 30);
    //             }
    //             break;
    //         case "comedy":
    //             result = 30000;
    //             if (aPerformance.audience > 20) {
    //                 result += 10000 + 500 * (aPerformance.audience - 20);
    //             }
    //             result += 300 * aPerformance.audience;
    //             break;
    //         default:
    //             throw new Error(`unknown type: ${aPerformance.play.type}`);
    //     }
    //     return result;
    // }
}


//演出节目，以及所处类型
let plays = {
    "hamlet":  {"name": "Hamlet",         "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy" },
    "othello": {"name": "Othello",        "type": "tragedy"}
};

//客户名称， 所 表演节目，观看人数
let invoices = {
    "customer": "BigCo",
    "performances": [
        {"playID": "hamlet",  "audience": 55},
        {"playID": "as-like", "audience": 35},
        {"playID": "othello", "audience": 40}
    ]
};


let result = statement(invoices, plays);
console.log(result);
