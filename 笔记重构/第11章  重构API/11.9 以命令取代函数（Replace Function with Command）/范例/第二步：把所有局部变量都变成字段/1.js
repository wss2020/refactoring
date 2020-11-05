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
    重复上述过程，直到所有局部变量都变成字段。（“把局部变量变成字段”这个重构手法是如此简单，以至于我都没有在
 重构名录中给它一席之地。对此我略感愧疚。）
*/
