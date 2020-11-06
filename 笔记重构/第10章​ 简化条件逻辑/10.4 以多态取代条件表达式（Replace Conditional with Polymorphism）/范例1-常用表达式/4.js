/**
    现在我已经有了需要的类结构，可以处理两个条件逻辑了。
 先从plumage函数开始，我从switch语句中选一个分支，在适当的子类中覆写这个逻辑。
 */
function plumages(birds) {
    return new Map(birds.map(b => [b.name, plumage(b)]));
}
function speeds(birds) {
    return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]));
}

function plumage(bird) {
    return createBird(bird).plumage;
}

function airSpeedVelocity(bird) {
    return createBird(bird).airSpeedVelocity;
}

function createBird(bird) {
    switch (bird.type) {
        case 'EuropeanSwallow':
            return new EuropeanSwallow(bird);
        case 'AfricanSwallow':
            return new AfricanSwallow(bird);
        case 'NorweigianBlueParrot':
            return new NorwegianBlueParrot(bird);
        default:
            return new Bird(bird);
    }
}


class Bird {
    constructor(birdObject) {
        Object.assign(this, birdObject);
    }
    get airSpeedVelocity() {
        switch (this.type) {
            case 'EuropeanSwallow':
                return 35;
            case 'AfricanSwallow':
                return 40 - 2 * this.numberOfCoconuts;
            case 'NorwegianBlueParrot':
                return (this.isNailed) ? 0 : 10 + this.voltage / 10;
            default:
                return null;
        }
    }
    get plumage() {
        switch (this.type) {
            case 'EuropeanSwallow':
                throw "oops";
            case 'AfricanSwallow':
                return (this.numberOfCoconuts > 2) ? "tired" : "average";
            case 'NorwegianBlueParrot':
                return (this.voltage > 100) ? "scorched" : "beautiful";
            default:
                return "unknown";
        }
    }
}
class EuropeanSwallow extends Bird {
    get plumage() {
        return "average";
    }
}

class AfricanSwallow extends Bird {

}

class NorwegianBlueParrot extends Bird {

}





/**
    在超类中，我把对应的逻辑分支改为抛出异常，因为我总是偏执地担心出错。
此时我就可以编译并测试。如果一切顺利的话，我可以接着处理下一个分支。*/


