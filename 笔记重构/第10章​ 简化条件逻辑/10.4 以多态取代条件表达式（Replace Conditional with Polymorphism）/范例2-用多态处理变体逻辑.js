/*
   在前面的例子中，“鸟”的类型体系是一个清晰的泛化体系：超类是抽象的“鸟”，子类是各种具体的鸟。
      这是教科书（包括我写的书）中经常讨论的继承和多态，但并不是实践中使用继承的唯一方式。实际上，这种方式很可能不是最常用或最好的方式。
      另一种使用继承的情况是：我想表达某个对象与另一个对象大体类似，但又有一些不同之处。


   下面有一个这样的例子：有一家评级机构，要对远洋航船的航行进行投资评级。这家评级机构会给出“A”或者“B”两种评级，取决于多种风险和盈利潜力的因素。
      在评估风险时，既要考虑航程本身的特征，也要考虑船长过往航行的历史。

   zone：地区
   rating：等级    voyageRisk：航行风险   captainHistoryRisk：船长历史风险     voyageProfitFactor：航行利益因素
 */

function rating(voyage, history) {
    const vpf = voyageProfitFactor(voyage, history);
    const vr = voyageRisk(voyage);
    const chr = captainHistoryRisk(voyage, history);
    if (vpf * 3 > (vr + chr * 2)) return "A";
    else return "B";
}

function voyageRisk(voyage) {
    let result = 1;
    if (voyage.length > 4) result += 2;
    if (voyage.length > 8) result += voyage.length - 8;
    if (["china", "east-indies"].includes(voyage.zone)) result += 4;
    return Math.max(result, 0);
}

function captainHistoryRisk(voyage, history) {
    let result = 1;
    if (history.length < 5) result += 4;
    result += history.filter(v => v.profit < 0).length;
    if (voyage.zone === "china" && hasChina(history)) result -= 2;
    return Math.max(result, 0);
}

function hasChina(history) {
    return history.some(v => "china" === v.zone);
}

function voyageProfitFactor(voyage, history) {
    let result = 2;
    if (voyage.zone === "china") result += 1;
    if (voyage.zone === "east-indies") result += 1;
    if (voyage.zone === "china" && hasChina(history)) {
        result += 3;
        if (history.length > 10) result += 1;
        if (voyage.length > 12) result += 1;
        if (voyage.length > 18) result -= 1;
    } else {
        if (history.length > 8) result += 1;
        if (voyage.length > 14) result -= 1;

    }
    return result;
}

/*
  voyageRisk和captainHistoryRisk两个函数负责打出风险分数，
  voyageProfitFactor负责打出盈利潜力分数，
  rating函数将3个分数组合到一起，给出一次航行的综合评级。
*/
// 调用方的代码大概是这样：
const voyage = {zone: "west-indies", length: 10};
const history = [
    {zone: "east-indies", profit: 5},
    {zone: "west-indies", profit: 15},
    {zone: "china", profit:-2},
    {zone: "west-africa", profit: 7},
];
const myRating = rating(voyage, history);




//1.代码中有两处同样的条件逻辑，
     //都在询问“是否有到中国的航程”以及“船长是否曾去过中国”。
function rating(voyage, history) {
    const vpf = voyageProfitFactor(voyage, history);
    const vr = voyageRisk(voyage);
    const chr = captainHistoryRisk(voyage, history);
    if (vpf * 3 > (vr + chr * 2)) return "A";
    else return "B";
}
function voyageRisk(voyage) {
    let result = 1;
    if (voyage.length > 4) result += 2;
    if (voyage.length > 8) result += voyage.length - 8;
    if (["china", "east-indies"].includes(voyage.zone)) result += 4;
    return Math.max(result, 0);

}
function captainHistoryRisk(voyage, history) {
    let result = 1;
    if (history.length < 5) result += 4;
    result += history.filter(v => v.profit < 0).length;
    if (voyage.zone === "china" && hasChina(history)) result -= 2;
    return Math.max(result, 0);
}
function hasChina(history) {
    return history.some(v => "china" === v.zone);
}
function voyageProfitFactor(voyage, history) {
    let result = 2;
    if (voyage.zone === "china") result += 1;
    if (voyage.zone === "east-indies") result += 1;
    if (voyage.zone === "china" && hasChina(history)) {
        result += 3;
        if (history.length > 10) result += 1;
        if (voyage.length > 12) result += 1;
        if (voyage.length > 18) result -= 1;
    } else {
        if (history.length > 8) result += 1;
        if (voyage.length > 14) result -= 1;

    }
    return result;
}

/*
  2.我会用继承和多态将处理“中国因素”的逻辑从基础逻辑中分离出来。如果还要引入更多的特殊逻辑，这个重构就很有用——这些重复的“中国因素”会混淆视听，让基础逻辑难以理解。

  起初代码里只有一堆函数，如果要引入多态的话，我需要先建立一个类结构，因此我首先使用函数组合成类（144）。这一步重构的结果如下所示：
 */
function rating(voyage, history) {
    return new Rating(voyage, history).value;
}

class Rating {
    constructor(voyage, history) {
        this.voyage = voyage;
        this.history = history;
    }

    get value() {
        const vpf = this.voyageProfitFactor;
        const vr = this.voyageRisk;
        const chr = this.captainHistoryRisk;
        if (vpf * 3 > (vr + chr * 2)) return "A";
        else return "B";
    }

    get voyageRisk() {
        let result = 1;
        if (this.voyage.length > 4) result += 2;
        if (this.voyage.length > 8) result += this.voyage.length - 8;
        if (["china", "east-indies"].includes(this.voyage.zone)) result += 4;
        return Math.max(result, 0);
    }

    get captainHistoryRisk() {
        let result = 1;
        if (this.history.length < 5) result += 4;
        result += this.history.filter(v => v.profit < 0).length;
        if (this.voyage.zone === "china" && this.hasChinaHistory) result -= 2;
        return Math.max(result, 0);
    }

    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        if (this.voyage.zone === "china" && this.hasChinaHistory) {
            result += 3;
            if (this.history.length > 10) result += 1;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result -= 1;
        } else {
            if (this.history.length > 8) result += 1;
            if (this.voyage.length > 14) result -= 1;

        }
        return result;
    }

    get hasChinaHistory() {
        return this.history.some(v => "china" === v.zone);
    }
}


//3.于是我就有了一个类，用来安放基础逻辑。现在我需要另建一个空的子类，用来安放与超类不同的行为。
class ExperiencedChinaRating extends Rating {

}
//然后，建立一个工厂函数，用于在需要时返回变体类。
function createRating(voyage, history) {
    if (voyage.zone === "china" && history.some(v => "china" === v.zone))
        return new ExperiencedChinaRating(voyage, history);
    else
        return new Rating(voyage, history);
}
//我需要修改所有调用方代码，让它们使用该工厂函数，而不要直接调用构造函数。还好现在调用构造函数的只有rating函数一处。
function rating(voyage, history) {
    return createRating(voyage, history).value;
}

//有两处行为需要移入子类中。我先处理captainHistoryRisk中的逻辑。
//第一处：
class Rating {
    get captainHistoryRisk() {
        let result = 1;
        if (this.history.length < 5) result += 4;
        result += this.history.filter(v => v.profit < 0).length;
        if (this.voyage.zone === "china" && this.hasChinaHistory) result -= 2;
        return Math.max(result, 0);
    }
}
//在子类中覆写这个函数。
class ExperiencedChinaRating{
    get captainHistoryRisk() {
        const result = super.captainHistoryRisk - 2;
        return Math.max(result, 0);
    }
}

//第二处：
class Rating{
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        if (this.voyage.zone === "china" && this.hasChinaHistory) {
            result += 3;
            if (this.history.length > 10) result += 1;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result -= 1;
        } else {
            if (this.history.length > 8) result += 1;
            if (this.voyage.length > 14) result -= 1;

        }
        return result;
    }
}

/*
 4. 分离voyageProfitFactor函数中的变体行为要更麻烦一些。
    我不能直接从超类中删掉变体行为，因为在超类中还有另一条执行路径。我又不想把整个超类中的函数复制到子类中。
*/
class Rating{
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        if (this.voyage.zone === "china" && this.hasChinaHistory) {
            result += 3;
            if (this.history.length > 10) result += 1;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result -= 1;
        }
        else {
            if (this.history.length > 8) result += 1;
            if (this.voyage.length > 14) result -= 1;
        }
        return result;
    }
}
//所以我先用提炼函数（106）将整个条件逻辑块提炼出来。
class Rating{
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        result += this.voyageAndHistoryLengthFactor;
        return result;
    }

    get voyageAndHistoryLengthFactor() {
        let result = 0;
        if (this.voyage.zone === "china" && this.hasChinaHistory) {
            result += 3;
            if (this.history.length > 10) result += 1;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result -= 1;
        }
        else {
            if (this.history.length > 8) result += 1;
            if (this.voyage.length > 14) result -= 1;
        }
        return result;
    }
}



//函数名中出现“And”字样是一个很不好的味道，不过我会暂时容忍它，先聚焦子类化操作。

class Rating{
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        if (this.history.length > 8) result += 1;
        if (this.voyage.length > 14) result -= 1;
        return result;
    }
}

class ExperiencedChinaRating{
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        result += 3;
        if (this.history.length > 10) result += 1;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
}



/*
   严格说来，重构到这儿就结束了——我已经把变体行为分离到了子类中，超类的逻辑理解和维护起来更简单了，只有在进入子类代码时我才需要操心变体逻辑。
      子类的代码表述了它与超类的差异。

   但我觉得至少应该谈谈如何处理这个丑陋的新函数。
      引入一个函数以便子类覆写，这在处理这种“基础和变体”的继承关系时是常见操作。
      但这样一个难看的函数只会妨碍——而不是帮助——别人理解其中的逻辑。

   函数名中的“And”字样说明其中包含了两件事，所以我觉得应该将它们分开。
        我会用提炼函数（106）把“历史航行数”（history length）的相关逻辑提炼出来。
        这一步提炼在超类和子类中都要发生，我首先从超类开始。
 */
class Rating{
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        result += this.historyLengthFactor;
        if (this.voyage.length > 14) result -= 1;
        return result;
    }
    get historyLengthFactor() {
        return (this.history.length > 8) ? 1 : 0;
    }
}


//然后在子类中也如法炮制。
class ExperiencedChinaRating{
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        result += 3;
        result += this.historyLengthFactor;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
    get historyLengthFactor() {
        return (this.history.length > 10) ? 1 : 0;
    }
}



//然后在超类中使用搬移语句到调用者（217）。
class Rating{
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        result += this.historyLengthFactor;
        result += this.voyageAndHistoryLengthFactor;
        return result;
    }
    get voyageAndHistoryLengthFactor() {
        let result = 0;
           // result += this.historyLengthFactor; 移除
        if (this.voyage.length > 14) result -= 1;
        return result;
    }
}

// 子类中，也去掉这一行
class ExperiencedChinaRating{
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        result += 3;
           //result += this.historyLengthFactor;  同样去掉这一行
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
}



//再用函数改名（124）改掉这个难听的名字。  同时 改为三元表达式，以简化voyageLengthFactor函数。
class Rating{
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        result += this.historyLengthFactor;
        result += this.voyageLengthFactor;
        return result;
    }
    get voyageLengthFactor() {
        return (this.voyage.length > 14) ? - 1: 0;
    }
}


class ExperiencedChinaRating{
    get voyageLengthFactor() {
        let result = 0;
        result += 3;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
}


/*
   最后一件事：在“航程数”（voyage length）因素上加上3分，我认为这个逻辑不合理，应该把这3分加在最终的结果上。
 */
class ExperiencedChinaRating{
    get voyageProfitFactor() {
        return super.voyageProfitFactor + 3;
    }
    get voyageLengthFactor() {
        let result = 0;
        // result += 3;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
}















