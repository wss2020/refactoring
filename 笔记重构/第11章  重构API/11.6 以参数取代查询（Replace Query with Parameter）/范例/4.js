//然后把刚才提炼出来的变量内联回去，于是旧函数就只剩一个简单的调用。
class HeatingPlan {
    get targetTemperature() {
        return this.xxNEWtargetTemperature(thermostat.selectedTemperature);
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



//现在可以对其使用内联函数（115）。调用方...
