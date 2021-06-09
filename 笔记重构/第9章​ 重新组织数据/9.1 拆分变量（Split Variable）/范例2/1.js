/**
 * 另一种情况是，变量是以输入参数的形式声明又在函数内部被再次赋值，此时也可以考虑拆分变量。例如，下列代码：
 * */
function discount(inputValue, quantity) {
    if (inputValue > 50) inputValue = inputValue - 2;
    if (quantity > 100) inputValue = inputValue - 1;
    return inputValue;
}
