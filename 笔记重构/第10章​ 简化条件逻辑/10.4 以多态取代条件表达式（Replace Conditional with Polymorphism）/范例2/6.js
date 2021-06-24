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
class Rating {
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
class ExperiencedChinaRating {
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
class Rating {
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
class ExperiencedChinaRating {
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
class Rating {
  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "china") result += 1;
    if (this.voyage.zone === "east-indies") result += 1;
    result += this.historyLengthFactor;
    result += this.voyageLengthFactor;
    return result;
  }
  get voyageLengthFactor() {
    return (this.voyage.length > 14) ? - 1 : 0;
  }
}

class ExperiencedChinaRating {
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
class ExperiencedChinaRating {
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