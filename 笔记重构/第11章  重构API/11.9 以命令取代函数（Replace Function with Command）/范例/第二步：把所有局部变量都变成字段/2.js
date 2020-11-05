/**
    重复上述过程，直到所有局部变量都变成字段。（“把局部变量变成字段”这个重构手法是如此简单，以至于我都没有在重构名录中给它一
 席之地。对此我略感愧疚。）
*/
class Scorer {
    constructor(candidate, medicalExam, scoringGuide) {
        this._candidate = candidate;
        this._medicalExam = medicalExam;
        this._scoringGuide = scoringGuide;
    }

    execute() {
        this._result = 0;
        this._healthLevel = 0;
        this._highMedicalRiskFlag = false;

        if (this._medicalExam.isSmoker) {
            this._healthLevel += 10;
            this._highMedicalRiskFlag = true;
        }
        this._certificationGrade = "regular";
        if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
            this._certificationGrade = "low";
            this._result -= 5;
        }
        // lots more code like this
        this._result -= Math.max(this._healthLevel - 5, 0);
        return this._result;
    }
}




/**
    现在函数的所有状态都已经移到了命令对象中，我可以放心使用提炼函数（106）等重构手法，而不用纠结于局
 部变量的作用域之类问题。
*/

