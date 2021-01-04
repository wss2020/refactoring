
/**
 但这又造成了plumage默认行为的重复。如果这还不够糟糕的话，还有一个“额外奖励”：构造函数中给_bird反向引用赋值的代码也会重复。

 解决重复的办法，很自然，就是继承——用提炼超类（375）从各个代理类中提炼出一个共同继承的超类。
 */

function createBird(data) {
    switch (data.type) {
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
                return new NorwegianBlueParrotDelegate(data,this);
            default:
                return null;
        }
    }

    get name() { return this._name;}
    get plumage() {
        if (this._speciesDelegate)
            return this._speciesDelegate.plumage;
        else
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
        return this._speciesDelegate.plumage;
    }
}


class SpeciesDelegate {
    constructor(data, bird) {
        this._bird = bird;
    }
    get plumage() {
        return this._bird._plumage || "average"
    }
}

class NorwegianBlueParrotDelegate extends SpeciesDelegate {
    constructor(data, bird) {
        super(data,bird)
        this._bird = bird;
        this._voltage = data.voltage;
        this._isNailed = data.isNailed;
    }
    get airSpeedVelocity() {
        return (this._isNailed) ? 0 : 10 + this._voltage / 10;
    }
    get plumage() {
        if (this._voltage > 100) return "scorched";
        else return this._bird._plumage || "beautiful";
    }
}

class AfricanSwallowDelegate extends SpeciesDelegate {
    constructor(data,bird) {
        super(data,bird)
        this._numberOfCoconuts = data.numberOfCoconuts;
    }
    get airSpeedVelocity() {
        return 40 - 2 * this._numberOfCoconuts;
    }
    get plumage() {
        return this._bird._plumage || "average";
    }
}

class EuropeanSwallowDelegate {
    get airSpeedVelocity() {
        return this._speciesDelegate.airSpeedVelocity;
    }
    get plumage() {
        return this._bird._plumage || "average";
    }
}

/**
    有了共同的超类以后，就可以把SpeciesDelegate字段默认设置为这个超类的实例，并把Bird类中的默认行为搬移到SpeciesDelegate超类中。
 */







