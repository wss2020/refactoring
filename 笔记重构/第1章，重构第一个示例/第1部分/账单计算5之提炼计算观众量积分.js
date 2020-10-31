/*
* 前言
我仍需要处理其他两个局部变量。perf同样可以轻易作为参数传入，但volumeCredits变量则有些棘手。
* 它是一个累加变量，循环的每次迭代都会更新
它的值。因此最简单的方式是，将整块逻辑提炼到新函数中，然后在新函数中直接返回volumeCredits。

*
* */




function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
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
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
}


function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

//2改名称
// function volumeCreditsFor(perf) {
//     let volumeCredits = 0;
//     volumeCredits += Math.max(perf.audience - 30, 0);
//     if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
//     return volumeCredits;
// }
function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);
    return volumeCredits;
}

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for (let perf of invoice.performances) {

        let thisAmount = amountFor(perf);
        volumeCredits += volumeCreditsFor(perf);

        //1.抽离
        // // add volume credits
        // volumeCredits += Math.max(perf.audience - 30, 0);
        // // add extra credit for every ten comedy attendees
        // if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

        // print line for this order
        result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
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
