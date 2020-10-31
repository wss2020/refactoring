//原码
/* 作为例子，这里有一个嵌套层级更深的数据：它是一组顾客信息的集合，保存在散列映射中，并通过顾客ID进行索引。*/
let data = {
    "1920": {
        name: "martin",
        id: "1920",
        usages: {
            "2016": {
                "1": 50,
                "2": 55,
            },
            "2015": {
                "1": 70,
                "2": 63,
            }
        }
    },
    "38673":
        {
            name: "neal",
            id: "38673",
        }
};
// 对嵌套数据的更新和读取可以进到更深的层级。
const customerData = data;
//更新的例子...
customerData[customerID].usages[year][month] = amount;

//读取的例子...
function compareUsage(customerID, laterYear, month) {
    const later = customerData[customerID].usages[laterYear][month];
    const earlier = customerData[customerID].usages[laterYear - 1][month];
    return {laterAmount: later, change: later - earlier};
}





//重构后
class CustomerData {
    constructor(data) {
        this._data = data;
    }
    setUsage(customerID, year, month, amount) {
        this._data[customerID].usages[year][month] = amount;
    }
    usage(customerID, year, month) {
        return this._data[customerID].usages[year][month];
    }
    // 没用到
    get rawData() {
        return _.cloneDeep(this._data);
    }
}
//更新的例子...
const organization = new CustomerData(data);
organization.setUsage(1920,2016,2,888);
console.log(data);

//读取的例子...
// const organization = new CustomerData(data);
let result = {};
result.laterAmount = organization.usage(1920, 2016, 2);
result.change = result.laterAmount - organization.usage(1920, 2016 - 1, 2);
console.log(result);





























