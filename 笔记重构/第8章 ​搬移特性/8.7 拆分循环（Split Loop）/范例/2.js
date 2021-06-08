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
