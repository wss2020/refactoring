//我首先创建一个空的类，用搬移函数（198）把上述函数搬到这个类里去。
function score(candidate, medicalExam, scoringGuide) {
    return new Scorer().execute(candidate, medicalExam, scoringGuide);
}
class Scorer {
    execute (candidate, medicalExam, scoringGuide) {
        let result = 0;
        let healthLevel = 0;
        let highMedicalRiskFlag = false;

        if (medicalExam.isSmoker) {
            healthLevel += 10;
            highMedicalRiskFlag = true;
        }

        let certificationGrade = "regular";
        if (scoringGuide.stateWithLowCertification(candidate.originState)) { certificationGrade = "low";
            result -= 5;
        }

        // lots more code like this
        result -= Math.max(healthLevel - 5, 0); return result;
    }
}


/**
    大多数时候，我更愿意在命令对象的构造函数中传入参数，而不让execute 函数接收参数。在这样一个简单的拆解场景中，这一点带来的
 影响不大；但如果我要处理的命令需要更复杂的参数设置周期或者大量定制，上述做法就会带来很多便利：多个命令类可以分别从各自的构造函
 数中获得各自不同的参数，然后又可以排成队列挨个执行，因为它们的execute函数签名都一样。
    我可以每次搬移一个参数到构造函数。
 */
