let gesangee= "Beta ver.";
//계산기 웹사이트 현재 버전

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calcVer").innerHTML= gesangee;
});

async function eevaluate() {
    try{
        //let eevLevel= parseInt(document.getElementById("currentLevel").value);
        let upNature= document.getElementById("natureUp").value;
        let downNature= document.getElementById("natureDown").value;
        let subSkill_10= document.getElementById("sub10").value;
        let subSkill_25= document.getElementById("sub25").value;
        let subSkill_50= document.getElementById("sub50").value;
        let subSkill_75= document.getElementById("sub75").value;
        let subSkill_100= document.getElementById("sub100").value;
        let eeveeLike= document.getElementById("eeveePrefer").value;
        let howSleep= document.getElementById("sleepWell").value;
        //유저 정보 가져오기

        //이브이 진화별 평가 점수
        let allGrade= {
            "sylveon": 0,
            "espeon": 0,
            "umbreon": 0,
            "jolteon": 0,
            "vaporeon": 0,
            "ingUmbreon": 0,
            "ingJolteon": 0,
            "ingVaporeon": 0
        };
        function allAddGrade(b) {
            for (let key in allGrade) {
                allGrade[key] = allGrade[key] + b;
            };
        };

        //성격 평가
        if(upNature.substring(0, 3) !== downNature.substring(0, 3)){
            if(downNature === "메인 스킬 발동률 -"){
                allAddGrade(-1);
            };
            if(upNature === "도우미 스피드+"){
                if(downNature === "기력 회복량 -"){
                    allGrade["umbreon"] += 2;
                }else if(downNature === "식재료 도우미 확률 -"){
                    allGrade["umbreon"] += 2;
                    allGrade["jolteon"] += 2;
                    allGrade["vaporeon"] += 2;
                    allGrade["ingUmbreon"] -= 1;
                    allGrade["ingJolteon"] -= 1;
                    allGrade["ingVaporeon"] -= 1;
                }else if(downNature === "EXP 획득량 -"){
                    allGrade["umbreon"] += 2;
                    allGrade["jolteon"] += 2;
                    allGrade["vaporeon"] += 2;
                };
            }else if(upNature === "기력 회복량+"){
                if(downNature === "도우미 스피드 -"){
                    if(howSleep === "잔다"){
                        allAddGrade(-2);
                    }else{
                        allAddGrade(-1);
                    }
                }else if((downNature === "식재료 도우미 확률 -") || (downNature === "EXP 획득량 -")){
                    if(howSleep === "잔다"){
                        allAddGrade(-1);
                    }else{
                        allGrade["umbreon"] += 2;
                        allGrade["jolteon"] += 2;
                        allGrade["vaporeon"] += 2;
                        allGrade["ingUmbreon"] -= 1;
                        allGrade["ingJolteon"] -= 1;
                        allGrade["ingVaporeon"] -= 1;
                    }
                };
            }else if(upNature === "식재료 도우미 확률+"){
                if(downNature === "도우미 스피드 -"){
                    allAddGrade(-2);
                }else if(downNature === "기력 회복량 -"){
                    allAddGrade(-1);
                };
            }else if(upNature === "메인 스킬 발동률+"){
                if(downNature === "도우미 스피드 -"){
                    allAddGrade(1);
                    allGrade["umbreon"] += 2;
                }else if(downNature === "기력 회복량 -"){
                    allGrade["sylveon"] += 1.5;
                }else if((downNature === "식재료 도우미 확률 -") || (downNature === "EXP 획득량 -")){
                    allGrade["sylveon"] += 1.5;
                    allGrade["espeon"] += 1.5;
                    allGrade["jolteon"] += 2;
                    allGrade["vaporeon"] += 1;
                };
            }else if(upNature === "EXP 획득량+"){
                    allAddGrade(-1);
            };
        };

        //레벨 별 서브스킬 가산점 
        let sub25Bonus= 2;
        let sub50Bonus= 1;
        let sub75Bonus= 0.5;
        let sub100Bonus= 0.1;
        //서브 스킬 평가
        const response= await fetch("criteria.json");
        const json= await response.json();
        for (let key in allGrade) {
            if(howSleep === "잔다"){
                //수면시간 8시간 이상인 유저는 기력 회복 보너스 서브가 꽝
                json[key]["(금색)기력 회복 보너스"]= 0;
            };
            if((subSkill_10 === "(금색)나무열매 수 S") || (subSkill_25 === "(금색)나무열매 수 S") && downNature === "식재료 도우미 확률 -"){
                //나무열매s 서브가 초반에 있는데 성격도 식재료 감소면 가산점
                allGrade[key] += 0.5;
            }
            allGrade[key] += (json[key][subSkill_10] + json[key][subSkill_25]) * sub25Bonus + json[key][subSkill_50] * sub50Bonus
                            + json[key][subSkill_75] * sub75Bonus + json[key][subSkill_100] * sub100Bonus;
            
            document.getElementById(key + "Final").innerHTML= allGrade[key];
        };
        

        document.getElementById("userInput").style.display= "none";
        document.getElementById("resultOutput").style.display= "block";
    }catch(err) {console.error('error in fetch:', err);}
};