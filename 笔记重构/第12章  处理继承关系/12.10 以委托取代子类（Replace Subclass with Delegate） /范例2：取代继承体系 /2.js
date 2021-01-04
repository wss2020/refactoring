/**
     在涉及多个子类时，我会一次处理一个子类，先从简单的开始——在这里，最简单的当属EuropeanSwallow（欧洲燕）。我先给它建一个空的委托类。
 */
function createBird(data) {
    switch (data.type) {
        case 'EuropeanSwallow':
            return new EuropeanSwallow(data);
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
    }
    get name() { return this._name;}
    get plumage() {
        return this._plumage || "average";
    }
    get airSpeedVelocity() { return null; }
}

class EuropeanSwallow extends Bird {
    get airSpeedVelocity() {
        return 35;
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

}


/**
    委托类中暂时还没有传入任何数据或反向引用。在这个例子里，我会在需要时再引入这些参数。

    现在需要决定如何初始化委托字段。由于构造函数接受的唯一参数data包含了所有的信息，我决定在构造函数中初始化委托字段。考虑到有多个委托对象要添加，
 我会建一个函数，其中根据类型码（data.type）来选择适当的委托对象。
 */








