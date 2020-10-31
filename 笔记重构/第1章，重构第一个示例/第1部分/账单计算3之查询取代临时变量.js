/*
* 前言
* 处理完amountFor的参数后，我回过头来看一下它的调用点。它被赋值给一个临时变量，之后就不再被修改，
* 因此我又采用内联变量（123）手法内联它。
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

function statement(invoice) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for (let perf of invoice.performances) {

        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);

        // add extra credit for every ten comedy attendees
        if ("comedy" === playFor(perf).type)
            volumeCredits += Math.floor(perf.audience / 5);

        // print line for this order
        result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
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
