//下面这个例子虽小，却完美展示了代码的丑陋。
class ProductionPlan {
    constructor(production) {
        this._production = production;
        this._adjustments = [];
    }
    get production() {
        return this._production;
    }
    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}

/**
 丑与不丑，全在观者。我看到的丑陋之处是重复——不是常见的代码重复，而是数据的重复。如果我要对生产计划（production plan）做调整（adjustment），
 不光要把调整的信息保存下来，还要根据调整信息修改一个累计值——后者完全可以即时计算，而不必每次更新。但我是个谨慎的人。“可以即时计算”只是我的猜想——我可
 以用引入断言（302）来验证这个猜想。
 */
