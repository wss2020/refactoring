// 原码
function test() {
    let youngest = people[0] ? people[0].age : Infinity;
    let totalSalary = 0;
    for (const p of people) {
        if (p.age < youngest) youngest = p.age;
        totalSalary += p.salary;
    }
    return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;
}



//重构
function test() {
    return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

    function totalSalary(){
        return people.reduce((total,p)=> total + p.salary,0);
    }
    function youngestAge(){
        return Math.min(...people.map(p => p.age));
    }
}
