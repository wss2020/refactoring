
/**
 我可以做一个更明确的条件分发：
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
    // get plumage() {
    //     return this._plumage || "average";
    // }
    get plumage() {
        if (this._speciesDelegate instanceof NorwegianBlueParrotDelegate)
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


class NorwegianBlueParrotDelegate {
    constructor(data, bird) {
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
 不过我超级反感这种做法，希望你也能闻出同样的坏味道。像这样的显式类型检查几乎总是坏主意。
 另一个办法是在其他委托类中实现默认的行为。
 */






