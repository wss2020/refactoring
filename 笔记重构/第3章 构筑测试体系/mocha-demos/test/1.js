let assert = require('assert');
let expect = require('chai').expect;

class Province {
    constructor(doc) {
        this._name = doc.name;
        this._producers = [];
        this._totalProduction = 0;
        this._demand = doc.demand;
        this._price = doc.price;
        doc.producers.forEach(d => this.addProducer(new Producer(this, d)));
    }

    addProducer(arg) {
        this._producers.push(arg);
        this._totalProduction += arg.production;
    }
    get name() {
        return this._name;
    }
    get producers() {
        return this._producers.slice();
    }
    get totalProduction() {
        return this._totalProduction;
    }
    set totalProduction(arg) {
        this._totalProduction = arg;
    }
    get demand() {
        return this._demand;
    }
    set demand(arg) {
        this._demand = parseInt(arg);
    }
    get price() {
        return this._price;
    }
    set price(arg) {
        this._price = parseInt(arg);
    }
    //缺额的计算逻辑
    get shortfall() {
        return this._demand - this.totalProduction;
    }
    //计算利润的逻辑
    get profit() {
        return this.demandValue - this.demandCost;
    }
    get demandCost() {
        let remainingDemand = this.demand;
        let result = 0;
        this.producers
            .sort((a, b) => a.cost - b.cost)
            .forEach(p => {
                const contribution = Math.min(remainingDemand, p.production);
                remainingDemand -= contribution;
                result += contribution * p.cost;
            });
        return result;
    }
    get demandValue() {
        return this.satisfiedDemand * this.price;
    }
    get satisfiedDemand() {
        return Math.min(this._demand, this.totalProduction);
    }
}

class Producer {
    constructor(aProvince, data) {
        this._province = aProvince;
        this._cost = data.cost;
        this._name = data.name;
        this._production = data.production || 0;
    }
    get name() {
        return this._name;
    }
    get cost() {
        return this._cost;
    }
    set cost(arg) {
        this._cost = parseInt(arg);
    }
    get production() {
        return this._production;
    }
    set production(amountStr) {
        const amount = parseInt(amountStr);
        const newProduction = Number.isNaN(amount) ? 0 : amount;
        this._province.totalProduction += newProduction - this._production;
        this._production = newProduction;
    }
}

function sampleProvinceData() {
    return {
        name: "Asia",
        producers: [
            {name: "Byzantium", cost: 10, production: 9},
            {name: "Attalia", cost: 12, production: 10},
            {name: "Sinope", cost: 10, production: 6},
        ],
        demand: 30,
        price: 20
    };
}

//缺额计算  测试用例
// describe('province', function () {
//     it('shortfall', function () {
//         const asia = new Province(sampleProvinceData());
//         expect(asia.shortfall).equal(5);
//     });
// });

//总利润 测试用例
describe('province', function () {
    //const asia = new Province(sampleProvinceData());  不推荐。

    // 使用了JavaScript中的const关键字只表明asia的引用不可修改，不表明对象的内容也不可修改。
    // 如果未来有一个测试改变了这个共享对象，测试就可能时不时失败，因为测试之间会通过共享夹具产生交互，
    // 而测试的结果就会受测试运行次序的影响。测试结果的这种不确定性，往往使你陷入漫长而又艰难的调试，
    // 严重时甚至可能令你对测试体系的信心产生动摇。因此，我比较推荐采取下面的做法：

    //beforeEach子句会在每个测试之前运行一遍，将asia变量清空，每次都给它赋一个新的值。
    // 这样我就能在每个测试开始前，为它们各自构建一套新的测试夹具，这保证了测试的独立性，避免了可能带来麻烦的不确定性。
    let asia;
    beforeEach(
        function() { asia = new Province(sampleProvinceData()); }
        );

    //缺额计算  测试用例
    it('shortfall', function () {
        // const asia = new Province(sampleProvinceData());
        expect(asia.shortfall).equal(5);
    });
    //总利润 测试用例
    it('profit', function () {
        // const asia = new Province(sampleProvinceData());
        expect(asia.profit).equal(230);
    });
    //Producer类中的产量（production）字段 测试用例
    it('change production', function() {
        asia.producers[0].production = 20;
        expect(asia.shortfall).equal(-6);
        expect(asia.profit).equal(292);
    });
    it('zero demand', function() {
        asia.demand = 0;
        expect(asia.shortfall).equal(-25);
        expect(asia.profit).equal(0);
    });
    it('negative demand', function() {
        asia.demand = -1;
        expect(asia.shortfall).equal(-26);
        expect(asia.profit).equal(-10);
    });
    it('empty string demand', function() {
        asia.demand = "";
        expect(asia.shortfall).NaN;
        expect(asia.profit).NaN;
    });

});

describe('no producers', function() {
    let noProducers;
    beforeEach(function() {
        const data = {
            name: "No proudcers",
            producers: [],
            demand: 30,
            price: 20
        };
        noProducers = new Province(data);
    });
    it('shortfall', function() {
        expect(noProducers.shortfall).equal(30);
    });
    it('profit', function() {
        expect(noProducers.profit).equal(0);
    });
});



describe('string for producers', function () {
    it('', function () {
        const data = {
            name: "String producers",
            producers: "",
            demand: 30,
            price: 20
        };
        const prov = new Province(data);
        expect(prov.shortfall).equal(0);
    });
});













