/**
  上面的例子将记录的浅复制(为何是浅复制，看 test.js)展开到了对象里，
  但当我处理深层嵌套的数据（比如来自JSON文件的数据）时，
   又该怎么办呢？此时该重构手法的核心步骤依然适用，记录的更新点需要同样小心处理，但对记录的读取点则有多种处理方案。

  作为例子，这里有一个嵌套层级更深的数据：它是一组顾客信息的集合，保存在散列映射中，并通过顾客ID进行索引。
*/

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
//更新的例子...
customerData[customerID].usages[year][month] = amount;

//读取的例子...
function compareUsage(customerID, laterYear, month) {
    const later = customerData[customerID].usages[laterYear][month];
    const earlier = customerData[customerID].usages[laterYear - 1][month];
    return {laterAmount: later, change: later - earlier};
}

//1.对这样的数据施行封装，第一步仍是封装变量（132）。
function getRawDataOfCustomers() {
    return customerData;
}
function setRawDataOfCustomers(arg) {
    customerData = arg;
}
//更新的例子...
getRawDataOfCustomers()[customerID].usages[year][month] = amount;

//读取的例子...
function compareUsage (customerID, laterYear, month) {
    const later = getRawDataOfCustomers()[customerID].usages[laterYear][month];
    const earlier = getRawDataOfCustomers()[customerID].usages[laterYear - 1][month];
    return {laterAmount: later, change: later - earlier};
}


//2.接下来我要创建一个类来容纳整个数据结构。
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
//顶层作用域...
function getCustomerData() {
    return customerData;
}
function getRawDataOfCustomers() {
    return customerData._data;
}
function setRawDataOfCustomers(arg) {
    customerData = new CustomerData(arg);
}
/**
    最重要的是妥善处理好那些更新操作。
    因此，当我查看getRawDataOfCustomers的所有调用者时，总是特别关注那些对数据做修改的地方。
    再提醒你一下，下面是那步更新操作。
 */
getRawDataOfCustomers()[customerID].usages[year][month] = amount;
/**
   “做法”部分说，接下来要通过一个访问函数来返回原始的顾客数据，如果访问函数还不存在就创建一个。
   现在顾客类还没有设值函数，而且这个更新操作对结构进行了深入查找，因此是时候创建一个设值函数了。
   我会先用提炼函数（106），将层层深入数据结构的查找操作提炼到函数里。
 */
//更新的例子...
setUsage(customerID, year, month, amount);
//顶层作用域...
function setUsage(customerID, year, month, amount) {
    getRawDataOfCustomers()[customerID].usages[year][month] = amount;
}

//然后我再用搬移函数（198）将新函数搬移到新的顾客数据类中。
//更新的例子...
getCustomerData().setUsage(customerID, year, month, amount);


//class CustomerData...
/*
    setUsage(customerID, year, month, amount) {
        this._data[customerID].usages[year][month] = amount;
    }
*/
/**
   封装大型的数据结构时，我会更多关注更新操作。凸显更新操作，并将它们集中到一处地方，是此次封装过程最重要的一部分。

   一通替换过后，我可能认为修改已经告一段落，但如何确认替换是否真正完成了呢？
    检查的办法有很多，比如可以修改getRawDataOfCustomers函数，让其返回一份数据的深复制的副本。
    如果测试覆盖足够全面，那么当我真的遗漏了一些更新点时，测试就会报错。
 */


//顶层作用域...
function getCustomerData() {
    return customerData;
}
function getRawDataOfCustomers() {
    return customerData.rawData;
}
function setRawDataOfCustomers(arg) {
    customerData = new CustomerData(arg);
}
//class CustomerData...
/*
    get rawData() {
        return _.cloneDeep(this._data);
    }
 */

/**
我使用了lodash库来辅助生成深复制的副本。
  另一个方式是，返回一份只读的数据代理。如果客户端代码尝试修改对象的结构，那么该数据代理就会抛出异常。
   这在有些编程语言中能轻易实现，但用JavaScript实现可就麻烦了，我把它留给读者作为练习好了。
    或者，我可以复制一份数据，递归冻结副本的每个字段，以此阻止对它的任何修改企图。

  妥善处理好数据的更新当然价值不凡，但读取操作又怎么处理呢？这有几种选择。
     第一种选择是与设值函数采用同等待遇，把所有对数据的读取提炼成函数，并将它们搬移到CustomerData类中。
 */
//class CustomerData...
/*
    usage(customerID, year, month) {
        return this._data[customerID].usages[year][month];
    }
 */
//顶层作用域...
function compareUsage (customerID, laterYear, month) {
    const later = getCustomerData().usage(customerID, laterYear, month);
    const earlier = getCustomerData().usage(customerID, laterYear - 1, month);
    return {laterAmount: later, change: later - earlier};
}

/**
 这种处理方式的美妙之处在于，它为customerData提供了一份清晰的API列表，清楚描绘了该类的全部用途。
    我只需阅读类的代码，就能知道数据的所有用法。但这样会使代码量剧增，特别是当对象有许多用途时。
     现代编程语言大多提供直观的语法，以支持从深层的列表和散列[mf-lh]结构中获得数据，因此直接把这样的数据结构给到客户端，也不失为一种选择。

 如果客户端想拿到一份数据结构，我大可以直接将实际的数据交出去。
   但这样做的问题在于，我将无从阻止用户直接对数据进行修改，进而使我们封装所有更新操作的良苦用心失去意义。
   最简单的应对办法是返回原始数据的一份副本，这可以用到我前面写的rawData方法。
 */

/*
class CustomerData...
    get rawData() {
        return _.cloneDeep(this._data);
    }
*/

//顶层作用域...
function compareUsage (customerID, laterYear, month) {
    const later = getCustomerData().rawData[customerID].usages[laterYear][month];
    const earlier = getCustomerData().rawData[customerID].usages[laterYear - 1][month];
    return {laterAmount: later, change: later - earlier};
}


/**
简单归简单，这种方案也有缺点。
    最明显的问题是复制巨大的数据结构时代价颇高，这可能引发性能问题。
    不过也正如我对性能问题的一贯态度，这样的性能损耗也许是可以接受的——只有测量到可见的影响，我才会真的关心它。
    这种方案还可能带来困惑，比如客户端可能期望对该数据的修改会同时反映到原数据上。
    如果采用了只读代理或冻结副本数据的方案，就可以在此时提供一个有意义的错误信息。

另一种方案需要更多工作，但能提供更可靠的控制粒度：对每个字段循环应用封装记录。
  我会把顾客（customer）记录变成一个类，对其用途（usage）字段

应用封装集合（170），并为它创建一个类。
  然后我就能通过访问函数来控制其更新点，比如说对用途（usage）对象应用将引用对象改为值对象（252）。
  但处理一个大型的数据结构时，这种方案异常繁复，如果对该数据结构的更新点没那么多，其实大可不必这么做。
  有时，合理混用取值函数和新对象可能更明智，即使用取值函数来封装数据的深层查找操作，但更新数据时则用对象来包装其结构，
   而非直接操作未经封装的数据。我在“Refactoring Code to Load a Document”[mf-ref-doc]这篇文章中讨论了更多的细节，有兴趣的读者可移步阅读。
 */





//最终代码
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























































