/**
 系统的温控计划规则抑制了我的要求，作为这样一个系统的用户，我可能会感到很烦恼。不过作为程序员，我更担心的
 是targetTemperature函数依赖于全局的thermostat对象。我可以把需要这个对象提供的信息作为参数传入，从而打
 破对该对象的依赖。

    首先，我要用提炼变量（119）把“希望作为参数传入的信息”提炼出来。
 */
class HeatingPlan {
    get targetTemperature() {
        const selectedTemperature = thermostat.selectedTemperature;
        if (selectedTemperature > this._max) return this._max;
        else if (selectedTemperature < this._min) return this._min;
        else return selectedTemperature;
    }
}

// 调用方...
if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
else if(thePlan.targetTemperature<thermostat.currentTemperature)setToCool();
else setOff();


//这样可以比较容易地用提炼函数（106）把整个函数体提炼出来，只剩“计算参数值”的逻辑还在原地。
