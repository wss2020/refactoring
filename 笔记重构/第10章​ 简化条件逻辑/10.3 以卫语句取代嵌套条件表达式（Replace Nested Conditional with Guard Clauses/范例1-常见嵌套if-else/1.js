/**
    下面的代码用于计算要支付给员工（employee）的工资。只有还在公司上班的员工才需要支付工资，所以这个函数需要检查两
 种“员工已经不在公司上班”的情况。
*/

/**
      “lorem.ipsum……”是一篇常见于排版设计领域的文章，其内容为不具可读性的字符组合，
          目的是使阅读者只专注于观察段落的字型和版型。——译者注
 */

function payAmount(employee) {
    let result;
    if (employee.isSeparated) {
        result = {amount: 0, reasonCode: "SEP"};
    } else {
        if (employee.isRetired) {
            result = {amount: 0, reasonCode: "RET"};
        } else {
            // logic to compute amount
            lorem.ipsum(dolor.sitAmet);
            consectetur(adipiscing).elit();
            sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
            ut.enim.ad(minim.veniam);
            result = someFinalComputation();
        }
    }
    return result;
}

/**
    嵌套的条件逻辑让我们看不清代码真实的含义。只有当前两个条件表达式都不为真的时候，这段代码
 才真正开始它的主要工作。所以，卫语句能让代码更清晰地阐述自己的意图。\
    一如既往地，我喜欢小步前进，所以我先处理最顶上的条件逻辑。
*/


