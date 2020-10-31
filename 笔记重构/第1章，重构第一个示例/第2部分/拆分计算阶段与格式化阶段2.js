/*
现在，我希望“剧目名称”信息也从中转数据中获得。
为此，需要使用play中的数据填充aPerformance对象（记得编译、测试、提交）

1。现在我只是简单地返回了一个aPerformance对象的副本，但马上我就会往这条记录中添加新的数据。
返回副本的原因是，我不想修改传给函数的参数，
我总是尽量保持数据不可变（immutable）——可变的状态会很快变成烫手的山芋。
   在不熟悉 JavaScript 的人看来，result = Object.assign({},aPerformance)的写法可能十分奇怪。
它返回的是一个浅副本。虽然我更希望有个函数来完成此功能，但这个用法已经约定俗成，
如果我自己写个函数，在JavaScript程序员看来反而会格格不入。
这里 的 用法 是复制一份 invoice.performances 给 statementData.performances。

2.现在我们已经有了安放play字段的地方，可以把数据放进去。
  我需要对playFor和statement函数应用搬移函数（198）（然后编译、测试、提交）。
* */

// P93   P62


// 1。复制
function statement(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    return renderPlainText(statementData, plays);
    // function enrichPerformance(aPerformance) {
    //     const result = Object.assign({}, aPerformance);
    //     return result;
    // }
    //2。使用play中的数据填充aPerformance对象
    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        return result;
    }
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
}
// function statement (invoice, plays) {
//     const statementData = {};
//     statementData.customer = invoice.customer;
//     statementData.performances = invoice.performances;
//     return renderPlainText(statementData, plays);
//
// }




function renderPlainText(data, plays) {

    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        // result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;



    function totalAmount() {
        let result = 0;
        for (let perf of data.performances) {
            result += amountFor(perf);
        }
        return result;
    }

    function totalVolumeCredits() {
        let result = 0;
        for (let perf of data.performances) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
            {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber / 100);

    }

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
        // if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
        return result;
    }

    // function playFor(aPerformance) {
    //     return plays[aPerformance.playID];
    // }


    function amountFor(aPerformance) {
        let result = 0;
        switch (aPerformance.play.type) {
        // switch (playFor(aPerformance).type) {
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
                // throw new Error(`unknown type: ${playFor(aPerformance).type}`);
        }
        return result;
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
