

//首先，我从一个常量开始，该常量在程序中被大量使用。
const organization = {name: "Acme Gooseberries", country: "GB"};

//这是一个普通的JavaScript对象，程序中很多地方都把它当作记录型结构在使用。以下是对其进行读取和更新的地方：
result += `<h1>${organization.name}</h1>`;
organization.name = newName;



//1。重构的第一步很简单，先施展一下封装变量（132）。
function getRawDataOfOrganization() {
    return organization;
}
//读取的例子...
result += `<h1>${getRawDataOfOrganization().name}</h1>`;
//更新的例子...
getRawDataOfOrganization().name = newName;


/* 2。
   这里施展的不全是标准的封装变量（132）手法，我刻意为设值函数取了一个又丑又长、容易搜索的名字，因为我有意不让它在这次重构中活得太久。
   封装记录意味着，仅仅替换变量还不够，我还想控制它的使用方式。我可以用类来替换记录，从而达到这一目的。
 */
//class Organization...
class Organization {
    constructor(data) {
        this._data = data;
    }

    set name(aString) {
        this._data.name = aString;
    }
    get name() {
        return this._data.name;
    }
}
//顶层作用域
const organization = new Organization({name: "Acme Gooseberries", country: "GB"});
function getRawDataOfOrganization() {
    return organization._data;
}
function getOrganization() {
    return organization;
}



//3。创建完对象后，我就能开始寻找该记录的使用点了。所有更新记录的地方，用一个设值函数来替换它。
//class Organization...
// set name(aString) {
//     this._data.name = aString;
// }


//客户端...
getOrganization().name = newName;

//同样地，我将所有读取记录的地方，用一个取值函数来替代。
//class Organization...
//get name() {return this._data.name;}

//客户端...
result += `<h1>${getOrganization().name}</h1>`;

//完成引用点的替换后，就可以兑现我之前的死亡威胁，为那个名称丑陋的函数送终了。
function getRawDataOfOrganization() {
    return organization._data;
}
function getOrganization() {
    return organization;
}



//我还倾向于把_data里的字段展开到对象中。
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
const data = {name: "Acme Gooseberries", country: "GB"};
const organization = new Organization(data);
result += `<h1>${organization.name}</h1>`;
organization.name = newName;


/*
    这样做有一个好处，能够使外界无须再引用原始的数据记录。直接持有原始的记录会破坏封装的完整性。
    但有时也可能不适合将对象展开到独立的字段里，此时我就会先将_data复制一份，再进行赋值。
 */

















































