/**
    上面的例子展示了用逻辑或合并条件表达式的做法。不过，我有可能遇到需要逻辑与的情况。
例如，嵌套if语句的情况：
*/

function test (anEmployee){
    if (anEmployee.onVacation)
        if (anEmployee.seniority > 10) return 1;
    return 0.5;
}



