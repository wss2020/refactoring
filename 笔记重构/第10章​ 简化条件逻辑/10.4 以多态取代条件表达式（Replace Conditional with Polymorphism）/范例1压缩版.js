
// 原码
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


//重构后
function plumages(birds) {
    return new Map(  birds.map(b => createBird(b)).map(bird => [bird.name, bird.plumage])   );
}
function speeds(birds) {
    return new Map(  birds.map(b => createBird(b)).map(bird => [bird.name, bird.airSpeedVelocity])  );
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
