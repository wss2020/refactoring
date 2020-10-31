/*
  我的朋友有一群鸟儿，他想知道这些鸟飞得有多快，以及它们的羽毛是什么样的。所以我们写了一小段程序来判断这些信息。
 */
function plumages(birds) {
    return new Map(birds.map(b => [b.name, plumage(b)]));
}

function speeds(birds) {
    return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]));
}

function plumage(bird) {
    switch (bird.type) {
        case 'EuropeanSwallow':
            return "average";
        case 'AfricanSwallow':
            return (bird.numberOfCoconuts > 2) ? "tired" : "average";
        case 'NorwegianBlueParrot':
            return (bird.voltage > 100) ? "scorched" : "beautiful";
        default:
            return "unknown";
    }
}

function airSpeedVelocity(bird) {
    switch (bird.type) {
        case 'EuropeanSwallow':
            return 35;
        case 'AfricanSwallow':
            return 40 - 2 * bird.numberOfCoconuts;
        case 'NorwegianBlueParrot':
            return (bird.isNailed) ? 0 : 10 + bird.voltage / 10;
        default:
            return null;
    }
}


/*
  1.有两个不同的操作，其行为都随着“鸟的类型”发生变化，因此可以创建出对应的类，用多态来处理各类型特有的行为。
         我先对airSpeedVelocity和plumage两个函数使用函数组合成类（144）。
 */
function plumage(bird) {
    return new Bird(bird).plumage;
}

function airSpeedVelocity(bird) {
    return new Bird(bird).airSpeedVelocity;
}

class Bird {
    constructor(birdObject) {
        Object.assign(this, birdObject);
    }

    get plumage() {
        switch (this.type) {
            case 'EuropeanSwallow':
                return "average";
            case 'AfricanSwallow':
                return (this.numberOfCoconuts > 2) ? "tired" : "average";
            case 'NorwegianBlueParrot':
                return (this.voltage > 100) ? "scorched" : "beautiful";
            default:
                return "unknown";
        }
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
}


/*
   2.然后针对每种鸟创建一个子类，用一个工厂函数来实例化合适的子类对象。
 */
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

class EuropeanSwallow extends Bird {

}

class AfricanSwallow extends Bird {

}

class NorwegianBlueParrot extends Bird {

}


/*
  3.现在我已经有了需要的类结构，可以处理两个条件逻辑了。
      先从plumage函数开始，我从switch语句中选一个分支，在适当的子类中覆写这个逻辑。
*/
class EuropeanSwallow {
    get plumage() {
        return "average";
    }
}

class Bird {
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

//在超类中，我把对应的逻辑分支改为抛出异常，因为我总是偏执地担心出错。
// 此时我就可以编译并测试。如果一切顺利的话，我可以接着处理下一个分支。
class AfricanSwallow {
    get plumage() {
        return (this.numberOfCoconuts > 2) ? "tired" : "average";
    }
}

//然后是挪威蓝鹦鹉（Norwegian Blue）的分支。
class NorwegianBlueParrot {
    get plumage() {
        return (this.voltage > 100) ? "scorched" : "beautiful";
    }
}

//超类函数保留下来处理默认情况。
class Bird {
    get plumage() {
        return "unknown";
    }
}


/*
   airSpeedVelocity也如法炮制。完成以后，代码大致如下（我还对顶层的
      airSpeedVelocity和plumage函数做了内联处理）：
 */

function plumages(birds) {
    return new Map(birds.map(b => createBird(b)).map(bird => [bird.name, bird.plumage]));
}

function speeds(birds) {
    return new Map(birds.map(b => createBird(b)).map(bird => [bird.name, bird.airSpeedVelocity]));
}

function createBird(bird) {
    switch (bird.type) {
        case 'EuropeanSwallow':
            return new EuropeanSwallow(bird);
        case 'AfricanSwallow':
            return new AfricanSwallow(bird);
        case 'NorwegianBlueParrot':
            return new NorwegianBlueParrot(bird);
        default:
            return new Bird(bird);
    }
}

class Bird {
    constructor(birdObject) {
        Object.assign(this, birdObject);
    }

    get plumage() {
        return "unknown";
    }

    get airSpeedVelocity() {
        return null;
    }
}

class EuropeanSwallow extends Bird {
    get plumage() {
        return "average";
    }

    get airSpeedVelocity() {
        return 35;
    }
}

class AfricanSwallow extends Bird {
    get plumage() {
        return (this.numberOfCoconuts > 2) ? "tired" : "average";
    }

    get airSpeedVelocity() {
        return 40 - 2 * this.numberOfCoconuts;
    }
}

class NorwegianBlueParrot extends Bird {
    get plumage() {
        return (this.voltage > 100) ? "scorched" : "beautiful";
    }

    get airSpeedVelocity() {
        return (this.isNailed) ? 0 : 10 + this.voltage / 10;
    }
}


























