//原码
//首先，我从一个常量开始，该常量在程序中被大量使用。
const organization = {name: "Acme Gooseberries", country: "GB"};

//这是一个普通的JavaScript对象，程序中很多地方都把它当作记录型结构在使用。以下是对其进行读取和更新的地方：
result += `<h1>${organization.name}</h1>`;
organization.name = newName;



//重构后
const data = {name: "Acme Gooseberries", country: "GB"};
class Organization {
    constructor(data) {
        this._name = data.name;
        this._country = data.country;
    }
    get name() {
        return this._name;
    }
    set name(aString) {
        this._name = aString;
    }
    get country(){
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}
const organization = new Organization(data);
result += `<h1>${organization.name}</h1>`;
organization.name = newName;


/*
    这样做有一个好处，能够使外界无须再引用原始的数据记录。直接持有原始的记录会破坏封装的完整性。
    但有时也可能不适合将对象展开到独立的字段里，此时我就会先将_data复制一份，再进行赋值。
 */

















































