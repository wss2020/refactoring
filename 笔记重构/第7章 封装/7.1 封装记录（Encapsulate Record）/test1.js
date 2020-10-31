
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
