/*
* 前言
  1.我的下一个重构目标是volumeCredits。处理这个变量更加微妙，因为它是在循环的迭代过程中累加得到的。
    第一步，就是应用拆分循环（227）将volumeCredits的累加过程分离出来。
  2.完成这一步，我就可以使用移动语句（223）手法将变量声明挪动到紧邻循环的位置
  3.把与更新volumeCredits变量相关的代码都集中到一起，有利于以查询取代临时变量（178）手法的施展。
    第一步同样是先对变量的计算过程应用提炼函数（106）手法。
  4.完成函数提炼后，我再应用内联变量（123）手法内联totalVolumeCredits函数。
  5.接着我要重复同样的步骤来移除totalAmount。我以拆解循环开始（编译、测试、提交），然后下移累加变量的声明语句（编译、测试、提交），
    最后再提炼函数。这里令我有点头疼的是：最好的函数名应该是totalAmount，但它已经被变量名占用，我无法起两个同样的名字。
    因此，我在提炼函数时先给它随便取了一个名字（然后编译、测试、提交）。
    *接着我将变量内联（编译、测试、提交），然后将函数名改回totalAmount（编译、测试、提交）。
  6.趁着给新提炼的函数改名的机会，我顺手一并修改了函数内部的变量名，以便保持我一贯的编码风格。


* 小结：重构至此，让我先暂停一下，谈谈刚刚完成的修改。首先，我知道有些读者会再次对此修改可能带来的性能问题感到担忧，
*      我知道很多人本能地警惕重复的循环。但大多数时候，重复一次这样的循环对性能的影响都可忽略不计。如果你在重构前后进行计时，
*      很可能甚至都注意不到运行速度的变化——通常也确实没什么变化。许多程序员对代码实际的运行路径都所知不足，甚至经验丰富的程序员有时也未能避免。
*      在聪明的编译器、现代的缓存技术面前，我们很多直觉都是不准确的。软件的性能通常只与代码的一小部分相关，改变其他的部分往往对总体性能贡献甚微。
          当然，“大多数时候”不等同于“所有时候”。有时，一些重构手法也会显著地影响性能。但即便如此，我通常也不去管它，继续重构，因为有了一份结构良
       好的代码，回头调优其性能也容易得多。如果我在重构时引入了明显的性能损耗，我后面会花时间进行性能调优。进行调优时，可能会回退我早先做的一些重构
       ——但更多时候，因为重构我可以使用更高效的调优方案。最后我得到的是既整洁又高效的代码。
          因此对于重构过程的性能问题，我总体的建议是：大多数情况下可以忽略它。如果重构引入了性能损耗，先完成重构，再做性能优化。
       其次，我希望你能注意到：我们移除volumeCredits的过程是多么小步。整个过程一共有4步，每一步都伴随着一次编译、测试以及向本地代码库的提交：

      使用拆分循环（227）分离出累加过程；
      使用移动语句（223）将累加变量的声明与累加过程集中到一起；
      使用提炼函数（106）提炼出计算总数的函数；
      使用内联变量（123）完全移除中间变量。

      我得坦白，我并非总是如此小步——但在事情变复杂时，我的第一反应就是采用更小的步子。
      怎样算变复杂呢，就是当重构过程有测试失败而我又无法马上看清问题所在并立即修复时，我就会回滚到最后一次可工作的提交，
      然后以更小的步子重做。这得益于我如此频繁地提交。特别是与复杂代码打交道时，细小的步子是快速前进的关键。

*     P82
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


function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber/100);
}





//3 同样是先对变量的计算过程应用提炼函数（106）手法。
function totalVolumeCredits(invoice) {
    let result  = 0;
    for (let perf of invoice.performances) {
        result  += volumeCreditsFor(perf);
    }
    return result ;
}

//5.接着我要重复同样的步骤来移除totalAmount。
/*function totalAmount() {
    let totalAmount = 0;
    for (let perf of invoice.performances) {
        totalAmount += amountFor(perf);
    }
    return totalAmount;
}*/

//6.趁着给新提炼的函数改名的机会，我顺手一并修改了函数内部的变量名，以便保持我一贯的编码风格。
function totalAmount(invoice) {
    let result  = 0;
    for (let perf of invoice.performances) {
        result  += amountFor(perf);
    }
    return result ;
}


//4.再应用内联变量（123）手法内联totalVolumeCredits函数。
function statement(invoice) {
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount(invoice))}\n`;
    result += `You earned ${totalVolumeCredits(invoice)} credits\n`;
    return result;
}

/*function statement (invoice, plays) {
    let totalAmount = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    let volumeCredits = totalVolumeCredits();
    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}
*/

//2.使用移动语句（223）手法将变量声明挪动到紧邻循环的位置
/*function statement(invoice, plays) {
    let totalAmount = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);
    }

    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}*/

//1.应用拆分循环（227）将volumeCredits的累加过程分离出来。
/*function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);

    }
    for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);
    }
    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}
*/
/*function statement (invoice, plays) {
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
*/




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
