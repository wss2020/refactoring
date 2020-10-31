/*
到目前为止，我的重构主要是为原函数添加足够的结构，以便我能更好地理解它，看清它的逻辑结构。
这也是重构早期的一般步骤。把复杂的代码块分解为更小的单元，与好的命名一样都很重要。
现在，我可以更多关注我要修改的功能部分了，也就是为这张详单提供一个HTML版本。不管怎么说，
现在改起来更加简单了。因为计算代码已经被分离出来，我只需要为顶部的7行代码实现一个HTML的版本。
问题是，这些分解出来的函数嵌套在打印文本详单的函数中。无论嵌套函数组织得多么良好，
我总不想将它们全复制粘贴到另一个新函数中。我希望同样的计算函数可以被文本版详单和HTML版详单共用。

要实现复用有许多种方法，而我最喜欢的技术是拆分阶段（154）。
这里我的目标是将逻辑分成两部分：一部分计算详单所需的数据，另一部分将数据渲染成文本或HTML。
第一阶段会创建一个中转数据结构，再把它传递给第二阶段。

要开始拆分阶段（154），我会先对组成第二阶段的代码应用提炼函数（106）。
在这个例子中，这部分代码就是打印详单的代码，其实也就是statement函数的全部内容。
我要把它们与所有嵌套的函数一起抽取到一个新的顶层函数中，并将其命名为renderPlainText。
* */


/*
* 1.开始拆分阶段（154），我会先对组成第二阶段的代码应用提炼函数（106）。
  在这个例子中，这部分代码就是打印详单的代码，其实也就是statement函数的全部内容。
  我要把它们与所有嵌套的函数一起抽取到一个新的顶层函数中，并将其命名为renderPlainText。
* */
// function statement (invoice, plays) {
//     return renderPlainText(invoice, plays);
// }


//2.  接着创建一个对象，作为在两个阶段间传递的中转数据结构，
// 然后将它作为第一个参数传递给renderPlainText（然后编译、测试、提交）。
// function statement (invoice, plays) {
//     const statementData = {};
//     return renderPlainText(statementData, invoice, plays);
// }


//3.现在我要检查一下renderPlainText用到的其他参数。
// 我希望将它们挪到这个中转数据结构里，这样所有计算代码都可以被挪到statement函数中，
// 让renderPlainText只操作通过data参数传进来的数据。
function statement (invoice, plays) {
    const statementData = {};
    //3.1第一步是将顾客（customer）字段添加到中转对象里（编译、测试、提交）
    //然后把performances字段也搬移过去，这样我就可以移除掉renderPlainText的invoice参数
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances;
    return renderPlainText(statementData, plays);
    // return renderPlainText(statementData, invoice, plays);

}

function renderPlainText(data, plays) {
// function renderPlainText(data, invoice, plays) {

    //3.1  第一步是将顾客（customer）字段添加到中转对象里（编译、测试、提交）
    let result = `Statement for ${data.customer}\n`;
    //     let result = `Statement for ${invoice.customer}\n`;

    for (let perf of data.performances) {
    // for (let perf of invoice.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;


    function totalAmount() {
        let result = 0;
        for (let perf of data.performances) {
        // for (let perf of invoice.performances) {
            result += amountFor(perf);
        }
        return result;
    }

    function totalVolumeCredits() {
        let result = 0;
        for (let perf of data.performances) {
        // for (let perf of invoice.performances) {
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
        if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];

    }

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
