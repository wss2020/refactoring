/**
    airSpeedVelocity也如法炮制。完成以后，
 代码大致如下（我还对顶层的airSpeedVelocity和plumage函数做了内联处理）：
 */
function plumages(birds) {
    return new Map(
        birds.map(b => createBird(b)).map(bird => [bird.name, bird.plumage])
    );
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






let databirds = [
    {name:1,type:'EuropeanSwallow',},
    {name:1,type:'EuropeanSwallow',},
    {name:2,type:'AfricanSwallow',numberOfCoconuts:1},
    {name:3,type:'NorweigianBlueParrot',voltage:'120',isNailed:false},
    {name:4,type:'AfricanSwallow',numberOfCoconuts:3},
];
console.log( plumages(databirds) );
console.log( speeds(databirds) );










