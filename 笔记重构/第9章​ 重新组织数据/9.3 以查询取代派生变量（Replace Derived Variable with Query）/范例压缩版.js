//范例1
//原码
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


//重构
class ProductionPlan {
    constructor(production) {
        this._production = production;
        this._adjustments = [];
    }
    get production() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }
}
