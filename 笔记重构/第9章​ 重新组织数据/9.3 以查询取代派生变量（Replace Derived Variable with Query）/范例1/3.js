/**
 * 放上这个断言之后，我会运行测试。如果断言没有失败，我就可以不再返回该字段，改为返回即时计算的结果。
 * */
class ProductionPlan {
    constructor(production) {
        this._production = production;
        this._adjustments = [];
    }

    get production() {
        // assert(this._production === this.calculatedProduction);
        return this.calculatedProduction;
    }

    get calculatedProduction() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}


