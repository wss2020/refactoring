/*
  我的朋友有一群鸟儿，他想知道这些鸟飞得有多快，以及它们的羽毛是什么样的。所以我们写了一小段程序来判断这些信息。
  plumages: n. 鸟类羽毛；翅膀
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


/**
  有两个不同的操作，其行为都随着“鸟的类型”发生变化，因此可以创建出对应的类，用多态来处理各类型特有的行为。
         我先对airSpeedVelocity和plumage两个函数使用函数组合成类（144）。
 */







