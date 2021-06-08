/**
 * 复制过后，我需要将循环中重复的计算逻辑删除，否则就会累加出错误的结果。如果循环中的代码没有副作用，那便可以先留着它们不删除，
 * 可惜上述例子并不符合这种情况。
 * */
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
