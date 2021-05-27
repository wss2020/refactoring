
//首先，我从一个常量开始，该常量在程序中被大量使用。
const organization = { name: "Acme Gooseberries", country: "GB" };

//这是一个普通的JavaScript对象，程序中很多地方都把它当作记录型结构在使用。以下是对其进行读取和更新的地方：
result += `<h1>${organization.name}</h1>`;
organization.name = newName;



//1.重构的第一步很简单，先施展一下封装变量（132）。
function getRawDataOfOrganization() {
    return organization;
}
//读取的例子...
result += `<h1>${getRawDataOfOrganization().name}</h1>`;
//更新的例子...
getRawDataOfOrganization().name = newName;
