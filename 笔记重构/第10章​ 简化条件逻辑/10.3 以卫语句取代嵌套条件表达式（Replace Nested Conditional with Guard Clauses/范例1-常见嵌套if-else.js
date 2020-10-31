
/*
   下面的代码用于计算要支付给员工（employee）的工资。只有还在公司上班的员工才需要支付工资，所以这个函数需要检查两种“员工已经不在公司上班”的情况。
*/

/*
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


/*
   1。
   嵌套的条件逻辑让我们看不清代码真实的含义。只有当前两个条件表达式都不为真的时候，这段代码才真正开始它的主要工作。
      所以，卫语句能让代码更清晰地阐述自己的意图。

   一如既往地，我喜欢小步前进，所以我先处理最顶上的条件逻辑。
 */

function payAmount(employee) {
    let result;
    if (employee.isSeparated) return {amount: 0, reasonCode: "SEP"};
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
    return result;
}


//2。做完这步修改，我执行测试，然后继续下一步。

function payAmount(employee) {
    let result;
    if (employee.isSeparated) return {amount: 0, reasonCode: "SEP"};
    if (employee.isRetired) return {amount: 0, reasonCode: "RET"};

    // logic to compute amount
    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
    ut.enim.ad(minim.veniam);
    result = someFinalComputation();
    return result;

}


//3。此时，result变量已经没有用处了，所以我把它删掉：
function payAmount(employee) {
    // let result;
    if (employee.isSeparated) return {amount: 0, reasonCode: "SEP"};
    if (employee.isRetired) return {amount: 0, reasonCode: "RET"};

    // logic to compute amount
    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
    ut.enim.ad(minim.veniam);
    return someFinalComputation();
}

//能减少一个可变变量总是好的。






//简化版本：
//修改前
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


// 修改后
function payAmount(employee) {
    if (employee.isSeparated) return {amount: 0, reasonCode: "SEP"};
    if (employee.isRetired) return {amount: 0, reasonCode: "RET"};

    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
    ut.enim.ad(minim.veniam);
    return someFinalComputation();
}




















































