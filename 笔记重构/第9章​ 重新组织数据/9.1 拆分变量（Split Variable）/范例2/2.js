/**
 * 另一种情况是，变量是以输入参数的形式声明又在函数内部被再次赋值，此时也可以考虑拆分变量。例如，下列代码：
 * */
function discount(inputValue, quantity) {
    if (inputValue > 50) inputValue = inputValue - 2;
    if (quantity > 100) inputValue = inputValue - 1;
    return inputValue;
}

/**
 这里的inputValue有两个用途：它既是函数的输入，也负责把结果带回给调用方。
（由于JavaScript的参数是按值传递的，所以函数内部对inputValue的修改不会影响调用方。）
 在这种情况下，我就会对inputValue变量做拆分。
 */
function discount(originalInputValue, quantity) {
    let inputValue = originalInputValue;

    if (inputValue > 50) inputValue = inputValue - 2;
    if (quantity > 100) inputValue = inputValue - 1;
    return inputValue;

}
