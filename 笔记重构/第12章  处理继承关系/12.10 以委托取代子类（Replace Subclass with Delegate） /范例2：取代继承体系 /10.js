
/**
    接下来是NorwegianBlueParrot（挪威蓝鹦鹉）子类。创建委托类和搬移 airSpeed Velocity函数的步骤都跟前面一样，所以我直接展示结果好了。
 */

function createBird(data) {
    switch (data.type) {
        // case 'AfricanSwallow':
        //     return new AfricanSwallow(data);
        case 'NorweigianBlueParrot':
            return new NorwegianBlueParrot(data);
        default:
            return new Bird(data);
    }
}

class Bird {
    constructor(data) {
        this._name = data.name;
        this._plumage = data.plumage;
        this._speciesDelegate = this.selectSpeciesDelegate(data);
    }
    selectSpeciesDelegate(data) {
        switch (data.type) {
            case 'EuropeanSwallow':
                return new EuropeanSwallowDelegate();
            case 'AfricanSwallow':
                return new AfricanSwallowDelegate(data);
            case 'NorweigianBlueParrot':
                return new NorwegianBlueParrotDelegate(data);
            default:
                return null;
        }
    }

    get name() { return this._name;}
    get plumage() {
        return this._plumage || "average";
    }
    get airSpeedVelocity() {
        return this._speciesDelegate ? this._speciesDelegate.airSpeedVelocity : null;
    }
}

class NorwegianBlueParrot extends Bird {
    constructor(data) {
        super(data);
        this._voltage = data.voltage;
        this._isNailed = data.isNailed;
    }
    get plumage() {
        if (this._voltage > 100) return "scorched";
        else return this._plumage || "beautiful";
    }
    get airSpeedVelocity() {
        return (this._isNailed) ? 0 : 10 + this._voltage / 10;
    }
}


class NorwegianBlueParrotDelegate {
    constructor(data) {
        this._voltage = data.voltage;
        this._isNailed = data.isNailed;
    }
    get airSpeedVelocity() {
        return (this._isNailed) ? 0 : 10 + this._voltage / 10;
    }
}

class AfricanSwallowDelegate{
    constructor(data) {
        this._numberOfCoconuts = data.numberOfCoconuts;
    }
    get airSpeedVelocity() {
        return 40 - 2 * this._numberOfCoconuts;
    }
}

class EuropeanSwallowDelegate {
    get airSpeedVelocity() {
        return this._speciesDelegate.airSpeedVelocity;
    }
}

/**
 一切正常。但NorwegianBlueParrot还覆写了plumage属性，前面两个例子则没有。
 首先我还是用搬移函数（198）把plumage函数搬到委托类中，这一步不难，不过需要修改构造函数，放入对Bird对象的反向引用。
 */






