/**
 * 再用移除死代码（237）扫清使用旧变量的地方。
 * */
class ProductionPlan {
    constructor(production) {
        this._production = production;
        this._adjustments = [];
    }

    get production() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        // this._production += anAdjustment.amount;
    }
}


