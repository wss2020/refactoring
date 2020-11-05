//继续处理其他参数：
function score(candidate, medicalExam, scoringGuide) {
    return new Scorer(candidate, medicalExam, scoringGuide).execute();
}


class Scorer {
    constructor(candidate, medicalExam, scoringGuide) {
        this._candidate = candidate;
        this._medicalExam = medicalExam;
        this._scoringGuide = scoringGuide;
    }
    execute() {
        let result = 0;
        let healthLevel = 0;
        let highMedicalRiskFlag = false;

        if (this._medicalExam.isSmoker) {
            healthLevel += 10;
            highMedicalRiskFlag = true;
        }
        let certificationGrade = "regular";
        if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
            certificationGrade = "low";
            result -= 5;
        }
        // lots more code like this
        result -= Math.max(healthLevel - 5, 0);
        return result;
    }
}


/**
    以命令取代函数的重构到此就结束了，不过之所以要做这个重构，是为了拆解复杂的函数，所以我还是大致展示一下如何拆解。
 下一步是把所有局部变量都变成字段，我还是每次修改一处。
*/

class Scorer {
    constructor(candidate, medicalExam, scoringGuide) {
        this._candidate = candidate;
        this._medicalExam = medicalExam;
        this._scoringGuide = scoringGuide;
    }

    execute() {
        this._result = 0;
        let healthLevel = 0;
        let highMedicalRiskFlag = false;

        if (this._medicalExam.isSmoker) {
            healthLevel += 10;
            highMedicalRiskFlag = true;
        }
        let certificationGrade = "regular";
        if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
            certificationGrade = "low";
            this._result -= 5;
        }

        // lots more code like this
        this._result -= Math.max(healthLevel - 5, 0);
        return this._result;
    }
}

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


class Scorer {
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

