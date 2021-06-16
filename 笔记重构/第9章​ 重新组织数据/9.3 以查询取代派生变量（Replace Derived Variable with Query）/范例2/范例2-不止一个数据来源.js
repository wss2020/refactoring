//上面的例子处理得轻松愉快，因为production的值很明显只有一个来源。但有时候，累计值会受到多个数据来源的影响。
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


/*
   如果照上面的方式运用引入断言（302），只要production的初始值不为0，断言就会失败。

   不过我还是可以替换派生数据，只不过必须先运用拆分变量（240）。
 */
class ProductionPlan {
    constructor(production) {
        this._initialProduction = production;
        this._productionAccumulator = 0;
        this._adjustments = [];
    }
    get production() {
        return this._initialProduction + this._productionAccumulator;
    }
    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}


// 现在我就可以使用引入断言（302）。
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
}

/*
   接下来的步骤就跟前一个范例一样了。不过我会更愿意保留calculatedProductionAccumulator这个属性，而不把它内联消去。
 */






































