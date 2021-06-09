//我们从一个常量开始。
const organization = {name: "Acme Gooseberries", country: "GB"};

/**
 * 我想把name改名为title。这个对象被很多地方使用，有些代码会更新name字段。所以我首先要用封装记录（162）把这个记录封装起来。
 * */
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
    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}

export const Organization = new Organization({name: "Acme Gooseberries", country: "GB"});
