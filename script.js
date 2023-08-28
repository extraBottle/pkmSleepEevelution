let gesangee= "Beta ver.";
//계산기 웹사이트 현재 버전

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calcVer").innerHTML= gesangee;
});

function eevaluate() {
    let eevLevel= parseInt(document.getElementById("currentLevel").value);
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

    let sylveonGrade= 0;
    let espeonGrade= 0;
    let umbreonGrade= 0;
    let jolteonGrade= 0;
    let vaporeonGrade= 0;
    //이브이 진화별 평가 점수
    let allGrade= [sylveonGrade, espeonGrade, umbreonGrade, jolteonGrade, vaporeonGrade];
    function allAddGrade(b) {
        allGrade.forEach((element, index, array) => {array[index]= element + b;});
    };

    //성격부터 평가
    if(upNature !== downNature){
        if(downNature === "메인 스킬 발동률 -"){
            allAddGrade(-1);
        };
        if(upNature === "도우미 스피드+"){
            if(downNature === "기력 회복량 -"){
                allGrade[0] += 1;
                allGrade[2] += 2;
            }else if(downNature === "식재료 도우미 확률 -"){
                allAddGrade(1);
            }else if(downNature === "EXP 획득량 -"){
                allAddGrade(1);
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
                    allAddGrade(1);
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
                allGrade[0] += 1;
                allGrade[1] += 0.5;
                allGrade[2] -= 1;
                allGrade[3] += 0.5;
            }else if(downNature === "기력 회복량 -"){
                allGrade[0] += 2;
            }else if(downNature === "식재료 도우미 확률 -"){
                allGrade[0] += 2;
                allGrade[1] += 2;
                allGrade[3] += 1;
                allGrade[4] += 1;
            }
        }
    };
    document.getElementById("userInput").style.display= "none";
    document.getElementById("resultOutput").style.display= "block";
}