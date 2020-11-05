//这样可以比较容易地用提炼函数（106）把整个函数体提炼出来，只剩“计算参数值”的逻辑还在原地。
class HeatingPlan {
    get targetTemperature() {
        const selectedTemperature = thermostat.selectedTemperature;
        return this.xxNEWtargetTemperature(selectedTemperature);
    }
    xxNEWtargetTemperature(selectedTemperature) {
        if (selectedTemperature > this._max) return this._max;
        else if (selectedTemperature < this._min) return this._min;
        else return selectedTemperature;
    }
}

// 调用方...
if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
else if(thePlan.targetTemperature<thermostat.currentTemperature)setToCool();
else setOff();



//然后把刚才提炼出来的变量内联回去，于是旧函数就只剩一个简单的调用。
