/*
   设想有一个戏剧演出团，演员们经常要去各种场合表演戏剧。
   通常客户（customer）会指定几出剧目，而剧团则根据观众（audience）人数及剧目类型来向客户收费。
   该团目前出演两种戏剧：悲剧（tragedy）和喜剧（comedy）。客户发出账单时，剧团还会根据到场观众的数量给出“观众量积分”（volume credit）优惠，
   下次客户再请剧团表演时可以使用积分获得折扣——你可以把它看作一种提升客户忠诚度的方式。
   该剧团将剧目的数据存储在一个简单的JSON文件中。 plays
   他们开出的账单也存储在一个JSON文件里   invoices
*/

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;


    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;

        //计算当前 表演节目 需要收取的 费用
        switch (play.type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
        }


        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);

        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type)
            volumeCredits += Math.floor(perf.audience / 5);

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
