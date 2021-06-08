
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
