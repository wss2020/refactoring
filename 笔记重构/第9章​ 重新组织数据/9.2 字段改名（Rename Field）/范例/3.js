/**
 * 接下来我就可以在构造函数中使用title字段。
 * */
class Organization {
    constructor(data) {
        this._title = (data.title !== undefined) ? data.title : data.name;
        this._country = data.country;
    }

    get name() {
        return this._title;
    }

    set name(aString) {
        this._title = aString;
    }

    get country() {
        return this._country;
    }

    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}

/**
 * 现在，构造函数的调用者既可以使用name也可以使用title（后者的优先级更高）。我会逐一查看所有调用构造函数的地方，将它们改为使用新名字。
 * */
const organization = new Organization({ title: "Acme Gooseberries", country: "GB" });
