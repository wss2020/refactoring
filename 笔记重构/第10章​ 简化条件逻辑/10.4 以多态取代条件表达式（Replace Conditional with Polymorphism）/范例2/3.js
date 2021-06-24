/*
  我会用继承和多态将处理“中国因素”的逻辑从基础逻辑中分离出来。如果还要引入更多的特殊逻辑，这个重构就很有用——这些重复的“中国因素”会混淆视听，让基础逻辑难以理解。

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
