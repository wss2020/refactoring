
/**
 * 对于像totalSalary这样的累加计算，我绝少能抵挡得住进一步使用以管道取代循环（231）重构它的诱惑；
 * 而对于youngestAge的计算，显然可以用替换算法（195）替之以更好的算法。
 * */
function test() {
    return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

    function totalSalary() {
        return people.reduce((total, p) => total + p.salary, 0);
    }

    function youngestAge() {
        return Math.min(...people.map(p => p.age));
    }
}
