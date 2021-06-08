/**
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
