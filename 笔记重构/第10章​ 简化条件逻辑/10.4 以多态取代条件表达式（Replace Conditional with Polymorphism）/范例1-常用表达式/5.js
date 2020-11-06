/**
    在超类中，我把对应的逻辑分支改为抛出异常，因为我总是偏执地担心出错。
 此时我就可以编译并测试。如果一切顺利的话，我可以接着处理下一个分支。*/
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

//超类函数保留下来处理默认情况。
class Bird {
    get plumage() {
        return "unknown";
    }
}
class EuropeanSwallow extends Bird {
    get plumage() {
        return "average";
    }
}

class AfricanSwallow extends Bird {
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



/**
   airSpeedVelocity也如法炮制。完成以后，
 代码大致如下（我还对顶层的airSpeedVelocity和plumage函数做了内联处理）：
 */






