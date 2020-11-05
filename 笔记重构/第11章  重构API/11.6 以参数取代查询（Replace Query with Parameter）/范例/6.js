//再把新函数改名，用回旧函数的名字。得益于之前给它起了一个容易搜索的名字，现在只要把前缀去掉就行。
class HeatingPlan {
    targetTemperature(selectedTemperature) {
        if (selectedTemperature > this._max) return this._max;
        else if (selectedTemperature < this._min) return this._min;
        else return selectedTemperature;
    }
}


// 调用方...
if(thePlan.targetTemperature(thermostat.selectedTemperature) > thermostat.currentTemperature)
    setToHeat();
else if (thePlan.targetTemperature(thermostat.selectedTemperature) < thermostat.currentTemperature)
    setToCool();
else
    setOff();


/**
    调用方的代码看起来比重构之前更笨重了，这是使用本重构手法的常见情况。将一个依赖关系从一个模块中移出，就意味着
 将处理这个依赖关系的责任推回给调用者。这是为了降低耦合度而付出的代价。

    但是，去除对thermostat对象的耦合，并不是本重构带来的唯一收益。HeatingPlan类本身是不可变的——字段的值都在
 构造函数中设置，任何函数都不会修改它们。（不用费心去查看整个类的代码，相信我就好。）在不可变的HeatingPlan基础上，
 把对thermostat的依赖移出函数体之后，我又使targetTemperature函数具备了引用透明性。从此以后，只要在同一个
 HeatingPlan对象上用同样的参数调用targetTemperature函数，我会始终得到 同样的结果。如果HeatingPlan的所有函数
 都具有引用透明性，这个类会更容易测试，其行为也更容易理解。

    JavaScript的类模型有一个问题：无法强制要求类的不可变性——始终有办法修改对象的内部数据。尽管如此，在编写一个类
 的时候明确说明并鼓励不可变性，通常也就足够了。尽量让类保持不可变通常是一个好的策略，以参数取代查询则是达成这一策略的利器。
*/
