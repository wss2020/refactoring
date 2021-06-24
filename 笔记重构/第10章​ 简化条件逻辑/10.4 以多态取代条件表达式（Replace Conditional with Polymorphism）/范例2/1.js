/**
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
const voyage = { zone: "west-indies", length: 10 };
const history = [
  { zone: "east-indies", profit: 5 },
  { zone: "west-indies", profit: 15 },
  { zone: "china", profit: -2 },
  { zone: "west-africa", profit: 7 },
];
const myRating = rating(voyage, history);