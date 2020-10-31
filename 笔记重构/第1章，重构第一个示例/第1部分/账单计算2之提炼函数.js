/* 前言：
   在这个例子里，我们的用户希望对系统做几个修改。首先，他们希望以HTML格式输出详单。现在请你想一想，这个变化会带来什么影响。
   对于每处追加字符串到result变量的地方我都得为它们添加分支逻辑。这会为函数引入更多复杂度。遇到这种需求时，很多人会选择直接复制整个方法，
   在其中修改输出HTML的部分。复制一遍代码似乎不算太难，但却给未来留下各种隐患：一旦计费逻辑发生变化，我就得同时修改两个地方，以保证它们逻辑相同。
   如果你编写的是一个永不需要修改的程序，这样剪剪贴贴就还好。但如果程序要保存很长时间，那么重复的逻辑就会造成潜在的威胁。
   现在，第二个变化来了：演员们尝试在表演类型上做更多突破，无论是历史剧、田园剧、田园喜剧、田园史剧、历史悲剧还是历史田园悲喜剧，无论一成不变的正统戏，
   还是千变万幻的新派戏，他们都希望有所尝试，只是还没有决定试哪种以及何时试演。
   这对戏剧场次的计费方式、积分的计算方式都有影响。
   作为一个经验丰富的开发者，我可以肯定：不论最终提出什么方案，他们一定会在6个月之内再次修改它。
   毕竟，需求通常不来则已，一来便会接踵而至。
*/

/*
为了应对分类规则和计费规则的变化，程序必须对statement函数做出修改。
但如果我把statement内的代码复制到用以打印HTML详单的函数中，就必须确保将来的任何修改在这两个地方保持一致。
随着各种规则变得越来越复杂，适当的修改点将越来越难找，不犯错的机会也越来越少。
 */

/*
每当看到这样长长的函数，我便下意识地想从整个函数中分离出不同的关注点。第一个引起我注意的就是中间那段switch语句。
所干的事情给它命名，比如叫amountFor(performance)。
每次想将一块代码抽取成一个函数时，我都会遵循一个标准流程，最大程度减少犯错的可能。
我把这个流程记录了下来，并将它命名为提炼函数（106），以便日后可以方便地引用
*/

//1.提炼函数
//2.变量改名  使它们更简洁，比如将thisAmount重命名为result。个人的编码风格：永远将函数的返回值命名为“result”，这样我一眼就能知道它的作用。
// 然后我再次编译、测试、提交代码。接着，我前往下一个目标——函数参数。
//3.接着，我前往下一个目标——函数参数。  perf 改成 aPerformance 使用一门动态类型语言（如JavaScript）时，跟踪变量的类型很有意义。
// 我为参数取名时都默认带上其类型名。一般我会使用不定冠词修饰它，除非命名中另有解释其角色的相关信息。


function amountFor(aPerformance, play) {
    let result = 0;
    switch (play.type) {
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
            throw new Error(`unknown type: ${play.type}`);
    }
    return result;
}


function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf, play);

        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);

        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        // print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
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
