/*
*   最后再做一次编译、测试、提交，接下来，要编写一个HTML版本的对账单就很简单了。
*
* （我把usd函数也搬移到顶层作用域中，以便renderHtml也能访问它。）
* */



import createStatementData from './createStatementData.js';


function statement (invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

// function htmlStatement (invoice, plays) {
//     return renderHtml(createStatementData(invoice, plays));
// }
//
// function renderHtml (data) {
//     let result = `<h1>Statement for ${data.customer}</h1>\n`;
//         result += "<table>\n";
//         result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
//     for (let perf of data.performances) {
//         result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
//         result += `<td>${usd(perf.amount)}</td></tr>\n`;
//     }
//
//     result += "</table>\n";
//     result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
//     result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`; return result;
//
// }
//
// function usd(aNumber) {
//
// }




function renderPlainText(data) {
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
