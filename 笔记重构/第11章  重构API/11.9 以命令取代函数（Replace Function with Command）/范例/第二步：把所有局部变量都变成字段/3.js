/**
    现在函数的所有状态都已经移到了命令对象中，我可以放心使用提炼函数（106）等重构手法，而不用纠结于局
 部变量的作用域之类问题。
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

        this.scoreSmoking();
        this._certificationGrade = "regular";
        if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
            this._certificationGrade = "low";
            this._result -= 5;
        }
        // lots more code like this
        this._result -= Math.max(this._healthLevel - 5, 0);
        return this._result;
    }

    scoreSmoking() {
        if (this._medicalExam.isSmoker) {
            this._healthLevel += 10;
            this._highMedicalRiskFlag = true;
        }
    }
}


/**
    这样我就可以像处理嵌套函数一样处理命令对象。实际上，在JavaScript中运用此重构手法时，的确可以考虑用嵌套函数
 来代替命令对象。不过我还是会使用命令对象，不仅因为我对命令对象更熟悉，而且还因为我可以针对命令对象中任何一个函数
 进行测试和调试。
*/

