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


/**
    这样做有一个好处，能够使外界无须再引用原始的数据记录。直接持有原始的记录会破坏封装的完整性。
    但有时也可能不适合将对象展开到独立的字段里，此时我就会先将_data复制一份，再进行赋值。
 */
