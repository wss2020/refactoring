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

class ProductionPlan {
    constructor(production) {
        this._production = production;
        this._adjustments = [];
    }
    get production() {
        assert(this._production === this.calculatedProduction);
        return this._production;
    }

    get calculatedProduction() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }
}

//放上这个断言之后，我会运行测试。如果断言没有失败，我就可以不再返回该字段，改为返回即时计算的结果。
class ProductionPlan {
    constructor(production) {
        this._production = production;
        this._adjustments = [];
    }
    get production() {
        assert(this._production === this.calculatedProduction);
        return this.calculatedProduction;
    }
}
//然后用内联函数（115）把计算逻辑内联到production函数内。
class ProductionPlan {
    constructor(production) {
        this._production = production;
        this._adjustments = [];
    }
    get production() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }
}


//再用移除死代码（237）扫清使用旧变量的地方。
class ProductionPlan {
    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}















