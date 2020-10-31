//范例1
//原码
let tpHd = "untitled";
// 有些地方是在读取变量值：
result += `<h1>${tpHd}</h1>`;
// 另一些地方则更新它的值：
tpHd = obj['articleTitle'];

//重构
let _title = "untitled";
function title() {
    return _title;
}
function setTitle(arg) {
    _title = arg;
}

result += `<h1>${title()}</h1>`;
setTitle(setTitle['articleTitle']);





//范例2
//原码
const cpyNm = "Acme Gooseberries";

//重构
const companyName = "Acme Gooseberries";
const cpyNm = companyName;






















































