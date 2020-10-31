/*
* 前言
* 观察amountFor函数时，我会看看它的参数都从哪里来。aPerformance是从循环变量中来，所以自然每次循环都会改变，
* 但play变量是由performance变量计算得到的，因此根本没必要将它作为参数传入，我可以在amountFor函数中重新计算得到它。
* 当我分解一个长函数时，我喜欢将play这样的变量移除掉，因为它们创建了很多具有局部作用域的临时变量，这会使提炼函数更加复杂。
* 这里我要使用的重构手法是以查询取代临时变量（178）。
*
* */



//3.
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

//1.取代临时变量
//2.内联变量（123）手法内联play变量。
function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for (let perf of invoice.performances) {

        // const play = playFor(perf);
        let thisAmount = amountFor(perf);

        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);

        // add extra credit for every ten comedy attendees
        if ("comedy" === playFor(perf).type)
            volumeCredits += Math.floor(perf.audience / 5);

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
