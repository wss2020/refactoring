/**
 接下来处理AfricanSwallow（非洲燕）子类。为它创建一个委托类 AfricanSwallowDelegate，这次委托类的构造函数需要传入data参数。
 */

function createBird(data) {
    switch (data.type) {
        case 'AfricanSwallow':
            return new AfricanSwallow(data);
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
            default:
                return null;
        }
    }

    get name() {
        return this._name;
    }

    get plumage() {
        return this._plumage || "average";
    }

    get airSpeedVelocity() {
        return this._speciesDelegate ? this._speciesDelegate.airSpeedVelocity : null;
    }
}

class AfricanSwallow extends Bird {
    constructor(data) {
        super(data);
        this._numberOfCoconuts = data.numberOfCoconuts;
    }

    get airSpeedVelocity() {
        return 40 - 2 * this._numberOfCoconuts;
    }
}

class NorwegianBlueParrot extends Bird {
    constructor(data) {
        super(data);
        this._voltage = data.voltage;
        this._isNailed = data.isNailed;
    }

    get plumage() {
        if (this._voltage > 100) return "scorched"; else return this._plumage || "beautiful";
    }

    get airSpeedVelocity() {
        return (this._isNailed) ? 0 : 10 + this._voltage / 10;
    }
}

class EuropeanSwallowDelegate {
    get airSpeedVelocity() {
        return 35;
    }
}

class AfricanSwallowDelegate {
    constructor(data) {
        this._numberOfCoconuts = data.numberOfCoconuts;
    }
}


/**
 同样用搬移函数（198）把airSpeedVelocity搬到委托类中。
 */




