
/**
    我喜欢这种办法，因为它简化了Bird类中的委托函数。我可以一目了然地看到哪些行为已经被委托给SpeciesDelegate，哪些行为还留在Bird类中。
    这几个类最终的状态如下：
 */
function createBird(data) {
    return new Bird(data);
}

class Bird {
    constructor(data) {
        this._name = data.name;
        this._plumage = data.plumage;
        this._speciesDelegate = this.selectSpeciesDelegate(data);
    }
    get name() { return this._name;}
    get plumage() { return this._speciesDelegate.plumage; }
    get airSpeedVelocity() { return this._speciesDelegate.airSpeedVelocity; }

    selectSpeciesDelegate(data) {
        switch (data.type) {
            case 'EuropeanSwallow':
                return new EuropeanSwallowDelegate(data, this);
            case 'AfricanSwallow':
                return new AfricanSwallowDelegate(data, this);
            case 'NorweigianBlueParrot':
                return new NorwegianBlueParrotDelegate(data, this);
            default:
                return new SpeciesDelegate(data, this);
        }
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
    constructor(data,bird) {
        super(data,bird)
        this._numberOfCoconuts = data.numberOfCoconuts;
    }
    get airSpeedVelocity() {
        return 40 - 2 * this._numberOfCoconuts;
    }
}

class NorwegianBlueParrotDelegate extends SpeciesDelegate {
    constructor(data, bird) {
        super(data,bird)
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
    在这个例子中，我用一系列委托类取代了原来的多个子类，与原来非常相似的继承结构被转移到了SpeciesDelegate下面。除了给Bird类重新被继承的机会，从
 这个重构中我还有什么收获？新的继承体系范围更收拢了，只涉及各个品种不同的数据和行为，各个品种相同的代码则全都留在了Bird中，它未来的子类也将得益于这些
 共用的行为。

    在前面的“演出预订”的例子中，我也可以采用同样的手法，创建一个委托超类。这样在Booking类中就不需要分发逻辑，直接调用委托对象即可，让继承关系来搞
 定分发。不过写到这儿，我要去吃晚饭了，就把这个练习留给读者吧。

    从这两个例子看来，“对象组合优于类继承”这句话更确切的表述可能应该是“审慎地组合使用对象组合与类继承，优于单独使用其中任何一种”——不过这就不太上口了。
 */









