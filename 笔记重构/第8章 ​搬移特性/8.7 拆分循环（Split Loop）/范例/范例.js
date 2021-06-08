// 下面我以一段循环代码开始。该循环会计算需要支付给所有员工的总薪水（total salary），并计算出最年轻（youngest）员工的年龄。
function test() {
    let youngest = people[0] ? people[0].age : Infinity;
    let totalSalary = 0;
    for (const p of people) {
        if (p.age < youngest) youngest = p.age;
        totalSalary += p.salary;
    }
    return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;
}




//该循环十分简单，但仍然做了两种不同的计算。要拆分这两种计算，我要先复制一遍循环代码。
function test() {
    let youngest = people[0] ? people[0].age : Infinity;
    let totalSalary = 0;
    for (const p of people) {
        if (p.age < youngest) youngest = p.age;
        totalSalary += p.salary;
    }

    for (const p of people) {
        if (p.age < youngest) youngest = p.age;
        totalSalary += p.salary;
    }

    return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;
}


//复制过后，我需要将循环中重复的计算逻辑删除，否则就会累加出错误的结果。如果循环中的代码没有副作用，那便可以先留着它们不删除，可惜上述例子并不符合这种情况。
function test() {
    let youngest = people[0] ? people[0].age : Infinity;
    let totalSalary = 0;

    for (const p of people) {
        if (p.age < youngest) youngest = p.age;
        // totalSalary += p.salary;
    }

    for (const p of people) {
        // if (p.age < youngest) youngest = p.age;
        totalSalary += p.salary;
    }

    return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;
}



/*
    至此，拆分循环这个手法本身的内容就结束了。但本手法的意义不仅在于拆分出循环本身，而且在于它为进一步优化提供了良好的起点——下一步我通常会寻求将每个
循环提炼到独立的函数中。在做提炼之前，我得先用移动语句（223）微调一下代码顺序，将与循环相关的变量先搬移到一起：
 */
function test() {
    let totalSalary = 0;
    for (const p of people) {
        totalSalary += p.salary;
    }

    let youngest = people[0] ? people[0].age : Infinity;
    for (const p of people) {
        if (p.age < youngest) youngest = p.age;
    }

    return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;
}


//    然后，我就可以顺利地应用提炼函数（106）了。
function test() {
    return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

    function totalSalary() {
        let totalSalary = 0;
        for (const p of people) {
            totalSalary += p.salary;
        }
        return totalSalary;
    }

    function youngestAge() {
        let youngest = people[0] ? people[0].age : Infinity;
        for (const p of people) {
            if (p.age < youngest) youngest = p.age;
        }
        return youngest;
    }
}


//对于像totalSalary这样的累加计算，我绝少能抵挡得住进一步使用以管道取代循环（231）重构它的诱惑；而对于youngestAge的计算，显然可以用替换算法（195）替之以更好的算法。
function test() {
    return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

    function totalSalary() {
        return people.reduce((total, p) => total + p.salary, 0);
    }

    function youngestAge() {
        return Math.min(...people.map(p => p.age));
    }
}














