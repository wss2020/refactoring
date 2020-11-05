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


//现在可以对其使用内联函数（115）。
// 调用方...
if(thePlan.xxNEWtargetTemperature(thermostat.selectedTemperature) > thermostat.currentTemperature)
    setToHeat();
else if (thePlan.xxNEWtargetTemperature(thermostat.selectedTemperature) < thermostat.currentTemperature)
    setToCool();
else
    setOff();




//再把新函数改名，用回旧函数的名字。得益于之前给它起了一个容易搜索的名字，现在只要把前缀去掉就行。

