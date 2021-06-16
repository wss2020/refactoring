/**
 * 现在我就可以使用引入断言（302）。
 * */
class ProductionPlan {
    constructor(production) {
        this._initialProduction = production;
        this._productionAccumulator = 0;
        this._adjustments = [];
    }

    get production() {
        assert(this._productionAccumulator === this.calculatedProductionAccumulator);
        return this._initialProduction + this._productionAccumulator;
    }

    get calculatedProductionAccumulator() {
        return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
    }

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._productionAccumulator += anAdjustment.amount;
    }
}

/**
 接下来的步骤就跟前一个范例一样了。不过我会更愿意保留calculatedProductionAccumulator这个属性，而不把它内联消去。
 */
