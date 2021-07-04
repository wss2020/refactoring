/**
 有了共同的超类以后，就可以把SpeciesDelegate字段默认设置为这个超类的实例，并把Bird类中的默认行为搬移到SpeciesDelegate超类中。
 */

function createBird(data) {
    switch (data.type) {
        // case 'NorweigianBlueParrot':
        //     return new NorwegianBlueParrot(data);
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
                return new EuropeanSwallowDelegate(data, this);
            case 'AfricanSwallow':
                return new AfricanSwallowDelegate(data, this);
            case 'NorweigianBlueParrot':
                return new NorwegianBlueParrotDelegate(data, this);
            default:
                // return null;
                return new SpeciesDelegate(data, this);
        }
    }

    get name() {
        return this._name;
    }

    get plumage() {
        // if (this._speciesDelegate)
        //     return this._speciesDelegate.plumage;
        // else
        //     return this._plumage || "average";
        return this._speciesDelegate.plumage;
    }

    get airSpeedVelocity() {
        // return this._speciesDelegate ? this._speciesDelegate.airSpeedVelocity : null;
        return this._speciesDelegate.airSpeedVelocity;
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

    get airSpeedVelocity() {
        return null;
    }
}

class SpeciesDelegate {
    constructor(data, bird) {
        this._bird = bird;
    }

    get plumage() {
        return this._bird._plumage || "average"
    }

    get airSpeedVelocity() {
        return null;
    }
}

class EuropeanSwallowDelegate extends SpeciesDelegate {
    get airSpeedVelocity() {
        return 35;
    }
}

class AfricanSwallowDelegate extends SpeciesDelegate {
    constructor(data, bird) {
        super(data, bird)
        this._numberOfCoconuts = data.numberOfCoconuts;
    }

    get airSpeedVelocity() {
        return 40 - 2 * this._numberOfCoconuts;
    }
}

class NorwegianBlueParrotDelegate extends SpeciesDelegate {
    constructor(data, bird) {
        super(data, bird)
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


/**
 我喜欢这种办法，因为它简化了Bird类中的委托函数。我可以一目了然地看到哪些行为已经被委托给SpeciesDelegate，哪些行为还留在Bird类中。
 */




