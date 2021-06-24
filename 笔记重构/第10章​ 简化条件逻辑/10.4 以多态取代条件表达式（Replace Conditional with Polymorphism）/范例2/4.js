//于是我就有了一个类，用来安放基础逻辑。现在我需要另建一个空的子类，用来安放与超类不同的行为。
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
    // if (this.voyage.zone === "china" && this.hasChinaHistory) result -= 2;
    return Math.max(result, 0);
  }
}
//在子类中覆写这个函数。
class ExperiencedChinaRating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }
}

//第二处：
class Rating {
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