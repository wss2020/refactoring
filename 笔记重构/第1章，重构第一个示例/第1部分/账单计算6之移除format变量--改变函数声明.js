/*
* 前言
  1.正如我上面所指出的，临时变量往往会带来麻烦。它们只在对其进行处理的代码块中有用，
    因此临时变量实质上是鼓励你写长而复杂的函数。因此，下一步我要替换掉一些临时变量，而最简单的莫过于从format变量入手。
    这是典型的“将函数赋值给临时变量”的场景，我更愿意将其替换为一个明确声明的函数。
  2.我对提炼得到的函数名称不很满意——format未能清晰地描述其作用。formatAsUSD很表意，但又太长，特别它仅是小范围地被用在一个字符串模板中。
    我认为这里真正需要强调的是，它格式化的是一个货币数字，因此我选取了一个能体现此意图的命名，并应用了改变函数声明（124）手法。
    *
    * 好的命名十分重要，但往往并非唾手可得。只有恰如其分地命名，才能彰显出将大函数分解成小函数的价值。
    * 有了好的名称，我就不必通过阅读函数体来了解其行为。但要一次把名取好并不容易，因此我会使用当下能想到最好的那个。
    * 如果稍后想到更好的，我就会毫不犹豫地换掉它。通常你需要花几秒钟通读更多代码，才能发现最好的名称是什么。
    *
    * 重命名的同时，我还将重复的除以100的行为也搬移到函数里。将钱以美分为单位作为正整数存储是一种常见的做法，可以避免使用浮点数来存储货币的小
    * 数部分，同时又不影响用数学运算符操作它。不过，对于这样一个以美分为单位的整数，我又需要以美元为单位进行展示，
    * 因此让格式化函数来处理整除的事宜再好不过。

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


function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);
    return volumeCredits;
}

//1. 提炼 formart 函数
/*function format(aNumber) {
    return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber);
}*/
/*function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        let thisAmount = amountFor(perf);
        volumeCredits += volumeCreditsFor(perf);
        result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}*/


//2. 重命名  加  改变函数声明
function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber/100);
}
function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);

        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    result += `Amount owed is ${usd(totalAmount)}\n`;
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
