/*
*   最后再做一次编译、测试、提交，
*   1.接下来，要编写一个HTML版本的对账单就很简单了。
*
*   2.我把usd函数也搬移到顶层作用域中，以便renderHtml也能访问它。）
*
*   3.代码行数由我开始重构时的44行增加到了70行（不算htmlStatement），这主要是将代码抽取到函数里带来的额外包装成本。
*     虽然代码的行数增加了，但重构也带来了代码可读性的提高。额外的包装将混杂的逻辑分解成可辨别的部分，分离了详单的计算逻辑与样式。
*     这种模块化使我更容易辨别代码的不同部分，了解它们的协作关系。
*     虽说言以简为贵，但可演化的软件却以明确为贵。通过增强代码的模块化，我可以轻易地添加HTML版本的代码，而无须重复计算部分的逻辑。
*
*     编程时，需要遵循营地法则：保证你离开时的代码库一定比来时更健康。
*
*     其实打印逻辑还可以进一步简化，但当前的代码也够用了。我经常需要在所有可做的重构与添加新特性之间寻找平衡。
*      在当今业界，大多数人面临同样的选择时，似乎多以延缓重构而告终——当然这也是一种选择。
*      我的观点则与营地法则无异：保证离开时的代码库一定比你来时更加健康。完美的境界很难达到，但应该时时都勤加拂拭。

* */



import createStatementData from './createStatementData.js';


function statement (invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd( perf.amount )} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;

    //2.usd函数也搬移到顶层作用域中
    // function usd(aNumber) {
    //     return new Intl.NumberFormat("en-US",
    //         {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber / 100);
    // }
}


//1.编写一个HTML版本的对账单
function htmlStatement (invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml (data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
        result += "<table>\n";
        result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";

    for (let perf of data.performances) {
        result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }
    result += "</table>\n";
    result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`; return result;

}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber/100);
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


// let result = statement(invoices, plays);
let result = htmlStatement(invoices, plays);
console.log(result);
