
/** 2。
   这里施展的不全是标准的封装变量（132）手法，我刻意为设值函数取了一个又丑又长、容易搜索的名字，因为我有意不让它在这次重构中活得太久。
   封装记录意味着，仅仅替换变量还不够，我还想控制它的使用方式。我可以用类来替换记录，从而达到这一目的。
 */
//class Organization...
class Organization {
    constructor(data) {
        this._data = data;
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
