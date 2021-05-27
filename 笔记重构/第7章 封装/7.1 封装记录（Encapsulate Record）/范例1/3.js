
/**
 * 3.创建完对象后，我就能开始寻找该记录的使用点了。所有更新记录的地方，用一个设值函数来替换它
 *   同样地，我将所有读取记录的地方，用一个取值函数来替代。
 */
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



const organization = new Organization({name: "Acme Gooseberries", country: "GB"});
//客户端...
getOrganization().name = newName;

//客户端...
result += `<h1>${getOrganization().name}</h1>`;

//完成引用点的替换后，就可以兑现我之前的死亡威胁，为那个名称丑陋的函数送终了。
function getRawDataOfOrganization() {
    return organization._data;
}
function getOrganization() {
    return organization;
}
