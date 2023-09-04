
document.querySelectorAll(".subInputButton").forEach(s => {
    s.addEventListener('input', () => {
        if(s.value.slice(0, 4) === "(금색)"){
            s.style.backgroundColor= "#fee672";
            s.style.borderColor = '#f3af2b';
            s.style.borderWidth = '2px';
            s.style.borderStyle = 'solid';
        }else if(s.value.slice(0, 4) === "(청색)"){
            s.style.backgroundColor= "#d9eeff";
            s.style.borderColor = '#6ab1f5';
            s.style.borderWidth = '2px';
            s.style.borderStyle = 'solid';
        }else if(s.value === "--선택하세요--"){
            s.style.backgroundColor = '';
            s.style.borderColor = '';
            s.style.borderWidth = '';
            s.style.borderStyle = '';
        }else{
            s.style.backgroundColor= "#f9f9f9";
            s.style.borderColor = '#dfdede';
            s.style.borderWidth = '2px';
            s.style.borderStyle = 'solid';
        };
    });
});
let ha= document.getElementById("eeveePrefer");
ha.addEventListener("input", () => {
    if(ha.value === "샤미드"){
        ha.style.backgroundColor= '#9cd4ea';
        ha.style.color= '';
    }else if(ha.value === "쥬피썬더"){
        ha.style.backgroundColor= '#fef06d';
        ha.style.color= '';
    }else if(ha.value === "부스터"){
        ha.style.backgroundColor= '#f49e63';
        ha.style.color= '';
    }else if(ha.value === "에브이"){
        ha.style.backgroundColor= '#fbe4f2';
        ha.style.color= '';
    }else if(ha.value === "블래키"){
        ha.style.backgroundColor= '#5e6b6c';
        ha.style.color= 'white';
    }else if(ha.value === "리피아"){
        ha.style.backgroundColor= '#7fdc9e';
        ha.style.color= '';
    }else if(ha.value === "글레이시아"){
        ha.style.backgroundColor= '#65c4dc';
        ha.style.color= '';
    }else if(ha.value === "님피아"){
        ha.style.backgroundColor= '#ffaec0';
        ha.style.color= '';
    }else{
        ha.style.backgroundColor= '';
        ha.style.color= '';
    }
});

function retry(){
    document.getElementById("resultOutput").style.display= "none";
    document.getElementById("userInput").style.display= "block";
    document.getElementById("retryButton").style.display= "none";
    document.getElementById("calcButton").style.display= "block";
    document.getElementById("anotherButton").style.display= "none";
    document.getElementById("otherEevee").style.display= "none";
};

let finalList;
let eeveeFilter;
const korName= ["님피아", "에브이", "쥬피썬더", "샤미드", "블래키", "쥬피썬더(식재료형)", "샤미드(식재료형)", "블래키(식재료형)", "글레이시아", "부스터", "리피아"];
const tierList= ["sylveon", "espeon", "jolteon", "vaporeon", "umbreon", "ingJolteon", "ingVaporeon", "ingUmbreon", "glaceon", "flareon", "leafeon"];
const preferList= ["글레이시아", "부스터", "리피아"];
//글&부 선호하는데 식재료형이 후보로 선택되었을 때 처리용
let checkIfIng;


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

        const originInput= [subSkill_10, subSkill_25, subSkill_50, subSkill_75, subSkill_100];
        const checkInputValid= new Set([subSkill_10, subSkill_25, subSkill_50, subSkill_75, subSkill_100]);
        if(originInput.indexOf("--선택하세요--") !== -1){
            alert("이브이가 보유한 서브 스킬을 전부 입력해주세요.");
            return;
        }
        if(originInput.length !== checkInputValid.size){
            alert("서브 스킬은 중복될 수 없습니다. 제대로 입력했는지 다시 확인해주세요.");
            return;
        };
        checkIfIng= undefined;

        const goldSub= ["(금색)수면 EXP 보너스", "(금색)기력 회복 보너스", "(금색)리서치 EXP 보너스", "(금색)꿈의조각 보너스"];

        //이브이 진화별 평가 점수
        let allGrade= [
            {"sylveon": 0},
            {"espeon": 0},
            {"jolteon": 0},
            {"vaporeon": 0},
            {"umbreon": 0},
            {"ingJolteon": 0},
            {"ingVaporeon": 0},
            {"ingUmbreon": 0},
        ];
        function allAddGrade(b) {
            for(let i= 0; i < allGrade.length; i++) {
                allGrade[i][tierList[i]] += b;
            };
        };

        //성격 평가
        if(upNature.substring(0, 3) !== downNature.substring(0, 3)){
            if(upNature === "영향 없음" || downNature === "영향 없음"){
                alert("성격을 제대로 입력했는지 다시 확인해주세요.");
                return;
            };
            if(downNature === "메인 스킬 발동률 -"){
                allAddGrade(-1);
            };
            if(upNature === "도우미 스피드+"){
                if(downNature === "기력 회복량 -"){
                    allGrade[tierList.indexOf("umbreon")]["umbreon"] += 0.5;
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.1;
                    allGrade[tierList.indexOf("ingUmbreon")]["ingUmbreon"] += 0.5;
                }else if(downNature === "식재료 도우미 확률 -"){
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.2;
                    allGrade[tierList.indexOf("espeon")]["espeon"] += 0.2;
                    allGrade[tierList.indexOf("umbreon")]["umbreon"] += 1;
                    allGrade[tierList.indexOf("jolteon")]["jolteon"] += 1;
                    allGrade[tierList.indexOf("vaporeon")]["vaporeon"] += 1;
                    allGrade[tierList.indexOf("ingUmbreon")]["ingUmbreon"] -= 0.5;
                    allGrade[tierList.indexOf("ingJolteon")]["ingJolteon"] -= 0.5;
                    allGrade[tierList.indexOf("ingVaporeon")]["ingVaporeon"] -= 0.5;
                }else if(downNature === "EXP 획득량 -"){
                    allAddGrade(1);
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] -= 0.8;
                    allGrade[tierList.indexOf("espeon")]["espeon"] -= 0.8;
                }else if(downNature === "메인 스킬 발동률 -"){
                    allAddGrade(0.5);
                    allGrade[tierList.indexOf("umbreon")]["umbreon"] -= 0.5;
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] -= 0.5;
                };
            }else if(upNature === "기력 회복량+"){
                if(downNature === "도우미 스피드 -"){
                    if(howSleep === "잔다"){
                        allAddGrade(-0.5);
                        allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.3;
                        allGrade[tierList.indexOf("espeon")]["espeon"] += 0.2;
                        allGrade[tierList.indexOf("jolteon")]["jolteon"] += 0.1;
                        allGrade[tierList.indexOf("ingJolteon")]["ingJolteon"] += 0.1;
                    }else{
                        allAddGrade(-0.2);
                        allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.2;
                        allGrade[tierList.indexOf("espeon")]["espeon"] += 0.2;
                        allGrade[tierList.indexOf("jolteon")]["jolteon"] += 0.1;
                        allGrade[tierList.indexOf("ingJolteon")]["ingJolteon"] += 0.1;
                    };
                }else if(downNature === "식재료 도우미 확률 -"){
                    if(howSleep === "잔다"){
                        allAddGrade(-0.5);
                        allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.5;
                        allGrade[tierList.indexOf("espeon")]["espeon"] += 0.3;
                    }else{
                        allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.2;
                        allGrade[tierList.indexOf("espeon")]["espeon"] += 0.2;
                        allGrade[tierList.indexOf("umbreon")]["umbreon"] += 0.5;
                        allGrade[tierList.indexOf("jolteon")]["jolteon"] += 0.5;
                        allGrade[tierList.indexOf("vaporeon")]["vaporeon"] += 0.5;
                        allGrade[tierList.indexOf("ingUmbreon")]["ingUmbreon"] -= 0.2;
                        allGrade[tierList.indexOf("ingJolteon")]["ingJolteon"] -= 0.2;
                        allGrade[tierList.indexOf("ingVaporeon")]["ingVaporeon"] -= 0.2;
                    };
                }else if(downNature === "EXP 획득량 -"){
                    if(howSleep === "잔다"){
                        allAddGrade(-0.5);
                        allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.5;
                        allGrade[tierList.indexOf("espeon")]["espeon"] += 0.3;
                    }else{
                        allAddGrade(0.5);
                        allGrade[tierList.indexOf("sylveon")]["sylveon"] -= 0.3;
                        allGrade[tierList.indexOf("espeon")]["espeon"] -= 0.3;
                    };
                };
            }else if(upNature === "식재료 도우미 확률+"){
                if(downNature === "도우미 스피드 -"){
                    allAddGrade(-0.5);
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.2;
                    allGrade[tierList.indexOf("espeon")]["espeon"] += 0.2;
                    allGrade[tierList.indexOf("jolteon")]["jolteon"] += 0.1;
                    allGrade[tierList.indexOf("ingUmbreon")]["ingUmbreon"] += 1;
                    allGrade[tierList.indexOf("ingJolteon")]["ingJolteon"] += 1;
                    allGrade[tierList.indexOf("ingVaporeon")]["ingVaporeon"] += 1;
                }else if(downNature === "기력 회복량 -"){
                    allAddGrade(-0.5);
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.3;
                    allGrade[tierList.indexOf("espeon")]["espeon"] += 0.2;
                    allGrade[tierList.indexOf("ingUmbreon")]["ingUmbreon"] += 1.5;
                    allGrade[tierList.indexOf("ingJolteon")]["ingJolteon"] += 1;
                    allGrade[tierList.indexOf("ingVaporeon")]["ingVaporeon"] += 1;
                }else if(downNature === "EXP 획득량 -"){
                    allGrade[tierList.indexOf("ingUmbreon")]["ingUmbreon"] += 1;
                    allGrade[tierList.indexOf("ingJolteon")]["ingJolteon"] += 1;
                    allGrade[tierList.indexOf("ingVaporeon")]["ingVaporeon"] += 1;
                };
            }else if(upNature === "메인 스킬 발동률+"){
                if(downNature === "도우미 스피드 -"){
                    allAddGrade(0.5);
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.5;
                    allGrade[tierList.indexOf("espeon")]["espeon"] += 0.5;
                    allGrade[tierList.indexOf("jolteon")]["jolteon"] += 0.1;
                    allGrade[tierList.indexOf("umbreon")]["umbreon"] -= 1;
                    allGrade[tierList.indexOf("ingJolteon")]["ingJolteon"] += 0.1;
                }else if(downNature === "기력 회복량 -"){
                    allAddGrade(1);
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.5;
                }else if((downNature === "식재료 도우미 확률 -") || (downNature === "EXP 획득량 -")){
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] += 1.5;
                    allGrade[tierList.indexOf("espeon")]["espeon"] += 1.5;
                    allGrade[tierList.indexOf("umbreon")]["umbreon"] += 0.5;
                    allGrade[tierList.indexOf("jolteon")]["jolteon"] += 1;
                    allGrade[tierList.indexOf("vaporeon")]["vaporeon"] += 1;
                };
            }else if(upNature === "EXP 획득량+"){
                if(downNature === "도우미 스피드 -"){
                    allAddGrade(-0.5);
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.2;
                    allGrade[tierList.indexOf("espeon")]["espeon"] += 0.2;
                    allGrade[tierList.indexOf("jolteon")]["jolteon"] += 0.1;
                    allGrade[tierList.indexOf("ingJolteon")]["ingJolteon"] += 0.1;
                }else if(downNature === "기력 회복량 -"){
                    allAddGrade(-0.5);
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] += 0.3;
                    allGrade[tierList.indexOf("espeon")]["espeon"] += 0.2;
                }else if(downNature === "식재료 도우미 확률 -"){
                    allAddGrade(+0.5);
                    allGrade[tierList.indexOf("sylveon")]["sylveon"] -= 0.3;
                    allGrade[tierList.indexOf("espeon")]["espeon"] -= 0.3;
                    allGrade[tierList.indexOf("ingUmbreon")]["ingUmbreon"] -= 1;
                    allGrade[tierList.indexOf("ingJolteon")]["ingJolteon"] -= 1;
                    allGrade[tierList.indexOf("ingVaporeon")]["ingVaporeon"] -= 1;
                };
            };
        };

        //입력 데이터 유효성 확인 후 결과화면으로 전환
        document.getElementById("userInput").style.display= "none";
        document.getElementById("resultOutput").style.display= "block";
        document.getElementById("retryButton").style.display= "block";
        document.getElementById("calcButton").style.display= "none";

        //레벨 별 서브스킬 가산점 
        const sub25Bonus= 2;
        const sub50Bonus= 1;
        const sub75Bonus= 0.1;
        const sub100Bonus= 0.01;
        //이브이 종류에 따른 티어별 급간 점수차
        const tierScore= {"goodTier": [1, 0.3, 0.1, 0], "midTier": [1, 0.5, 0.3, 0]};
        const sameTierGap= {"goodTier1": 0.5, "midTier1": 0.2, "allTier": 0.01};

        //서브 스킬 배점 계산
        let response= await fetch("evaulationBasis.json");
        let json= await response.json();
        
        for(const key of tierList.slice(0, allGrade.length)){
            let tierScoreEle= (json[key]["performance"] === "good") ? "goodTier" : "midTier";

            for(let i= 0; i < 4; i++){
                let whatTier= "tier" + (i + 1);
                for(let z= 0; z < json[key][whatTier].length; z++){
                    let sameTierGapEle= (whatTier === "tier1") ? (tierScoreEle + "1") : "allTier";
                    if(whatTier === "tier4"){
                        json[key]["subScore"][json[key][whatTier][z]]= tierScore[tierScoreEle][i];
                    }else{
                        json[key]["subScore"][json[key][whatTier][z]]= tierScore[tierScoreEle][i] - z * sameTierGap[sameTierGapEle]; 
                    };
                };
            };
            goldSub.forEach(e => {
                //gold 배점이랑 골드 서브 스킬 배점을 동일하게 부여
                json[key]["subScore"][e]= json[key]["subScore"]["gold"];
            });
            if(howSleep === "잔다"){
                //수면시간 8시간 이상인 유저는 기력 회복 보너스 서브가 꽝
                json[key]["subScore"]["(금색)기력 회복 보너스"]= 0;
            };
        };

        function calcScore(name, s10= "blank", s25= "blank", s50= "blank", s75= "blank", s100= "blank"){
            return (json[name]["subScore"][s10] + json[name]["subScore"][s25]) * sub25Bonus
                    + json[name]["subScore"][s50] * sub50Bonus
                    + json[name]["subScore"][s75] * sub75Bonus
                    + json[name]["subScore"][s100] * sub100Bonus;
        };
        //사용자의 서브 스킬 점수 계산
        for (const key of tierList.slice(0, allGrade.length)) {
            if(((subSkill_10 === "(금색)나무열매 수 S") || (subSkill_25 === "(금색)나무열매 수 S")) && downNature === "식재료 도우미 확률 -"){
                //나무열매s 서브가 초반에 있는데 성격도 식재료 감소면 가산점
                allGrade[tierList.indexOf(key)][key] += 0.5;
            };
            allGrade[tierList.indexOf(key)][key] += calcScore(key, subSkill_10, subSkill_25, subSkill_50, subSkill_75, subSkill_100);
        };

        //합격 커트라인 계산
        const sylveonCut= calcScore("sylveon", "(청색)스킬 확률 업 M", "blank", "식재료 확률 업 S");
        const espeonCut= 1 + calcScore("espeon", "스킬 확률 업 S", "도우미 스피드 S");
        const umbreonCut= 0.5 + calcScore("umbreon", json["umbreon"]["tier2"][json["umbreon"]["tier2"].length - 1], json["umbreon"]["tier2"][json["umbreon"]["tier2"].length - 2]);
        const jolteonCut= 0.5 + calcScore("jolteon", json["jolteon"]["tier2"][json["jolteon"]["tier2"].length - 1], json["jolteon"]["tier2"][json["jolteon"]["tier2"].length - 2]);
        const vaporeonCut= 0.5 + calcScore("vaporeon", json["vaporeon"]["tier2"][json["vaporeon"]["tier2"].length - 1], json["vaporeon"]["tier2"][json["vaporeon"]["tier2"].length - 2]);
        const ingUmbreonCut= 1 + calcScore("ingUmbreon", "(청색)식재료 확률 업 M", "도우미 스피드 S", "(청색)최대 소지 수 업 L", "(금색)나무열매 수 S", "최대 소지 수 업 S");
        const ingJolteonCut= 1 + calcScore("ingJolteon", "(청색)식재료 확률 업 M", "도우미 스피드 S", "(청색)최대 소지 수 업 L", "(금색)나무열매 수 S", "최대 소지 수 업 S");
        const ingVaporeonCut= 1 + calcScore("ingVaporeon", "(청색)식재료 확률 업 M", "도우미 스피드 S", "(청색)최대 소지 수 업 L", "(금색)나무열매 수 S", "최대 소지 수 업 S");
        
        //커트라인, 최소최대 점수 저장용
        eeveeFilter= {
            "sylveon": {"cut": sylveonCut},
            "espeon": {"cut": espeonCut},
            "umbreon": {"cut": umbreonCut},
            "jolteon": {"cut": jolteonCut},
            "vaporeon": {"cut": vaporeonCut},
            "ingUmbreon": {"cut": ingUmbreonCut},
            "ingJolteon": {"cut": ingJolteonCut},
            "ingVaporeon": {"cut": ingVaporeonCut}
        }; 

        //이브이 진화별 최대최소 점수 계산.
        //(나무열매s + 식재료 감소) & 금딱처럼 중복 점수는 편의상 무시
        //상당히 하드코딩이라 티어표 변동되면 이것도 꼭 변경해야함! 주의
        for(const key of tierList.slice(0, allGrade.length)){
            let mm10, mm25, mm50, mm75, mm100;
            mm10 = json[key]["tier1"][0]; 
            mm25 = json[key]["tier1"][1];
            mm50 = json[key]["tier2"][0];
            mm75 = json[key]["tier2"][1];
            mm100 = json[key]["tier2"][2];
            eeveeFilter[key]["max"]= calcScore(key, mm10, mm25, mm50, mm75, mm100);
            if(json[key]["tier4"].length !== 0){
                mm10 = json[key]["tier4"][0]; 
                mm25 = json[key]["tier4"][1];
                mm50 = json[key]["tier4"][2];
                mm75 = json[key]["tier3"][json[key]["tier3"].length - 1];
                mm100 =json[key]["tier3"][json[key]["tier3"].length - 2];
                eeveeFilter[key]["min"]= calcScore(key, mm10, mm25, mm50, mm75, mm100);
            }else{
                let mmarray= [];
                for(let z=0; z < 5; z++){
                    if(json[key]["tier3"].length > z){
                        mmarray.push(json[key]["tier3"][json[key]["tier3"].length - 1 - z]);
                    }else{
                        mmarray.push(json[key]["tier3"][json[key]["tier2"].length - 1 - z]);
                    };
                };
                eeveeFilter[key]["min"]= calcScore(key, mmarray[0], mmarray[1], mmarray[2], mmarray[3], mmarray[4]);
            };
        };
        //최대최소 점수에 진화체별 성격 보정 추가
        eeveeFilter["sylveon"]["max"] += 2;
        eeveeFilter["espeon"]["max"] += 2;
        eeveeFilter["jolteon"]["max"] += 1.5;
        eeveeFilter["vaporeon"]["max"] += 1.5;
        eeveeFilter["umbreon"]["max"] += 1.5;
        eeveeFilter["ingJolteon"]["max"] += 1;
        eeveeFilter["ingVaporeon"]["max"] += 1;
        eeveeFilter["ingUmbreon"]["max"] += 1;

        eeveeFilter["sylveon"]["min"] -= 1;
        eeveeFilter["espeon"]["min"] -= 1;
        eeveeFilter["jolteon"]["min"] -= 1;
        eeveeFilter["vaporeon"]["min"] -= 1;
        eeveeFilter["umbreon"]["min"] -= 1;
        eeveeFilter["ingJolteon"]["min"] -= 1;
        eeveeFilter["ingVaporeon"]["min"] -= 1;
        eeveeFilter["ingUmbreon"]["min"] -= 1;

        //최종 합격 목록
        finalList= [];
        let sylEsp= [];
        //최종 결과가 커트라인을 넘기면 합격 목록에 추가
        for (const key of tierList.slice(0, allGrade.length)) {
            if(eeveeFilter[key]["cut"] <= allGrade[tierList.indexOf(key)][key]){            
                finalList.push(key);
            };
        };
        if(finalList.length !== 0){
            //님피아&에브이 -> 쥬피썬더&샤미드&블래키 순으로 선택
            if(finalList.includes(tierList[0]) || finalList.includes(tierList[1])){
                //님&에 둘다 존재하면 점수순으로 나열. 동점 시 님피아 우선
                if(finalList.includes(tierList[0]) && finalList.includes(tierList[1])){
                    if(allGrade[1][tierList[1]] > allGrade[0][tierList[0]]){
                        const esp= finalList[1];
                        finalList[1]= finalList[0];
                        finalList[0]= esp;
                    };
                    sylEsp= finalList.slice(0, 2);
                    finalList= finalList.slice(2);
                }else{
                    sylEsp.push(finalList.shift());
                };
            };
            //님&에 제외한 나머지를 점수순으로 나열
            finalList.sort((a, b) => allGrade[tierList.indexOf(b)][b] - allGrade[tierList.indexOf(a)][a]);
            //다시 님&에랑 합쳐서 전체 점수순 배열 완성
            finalList= sylEsp.concat(finalList);
            if(finalList[0] === undefined){
                //뒤에 추가하므로 첫 원소인 빈칸이 안사라지는 문제 해결
                finalList.shift();
            };
            for(const j of finalList){
                if(allGrade[j] >= eeveeFilter[j]["max"]){
                    eeveeFilter[j]["percent"]= 100;    
                }else{
                    eeveeFilter[j]["percent"]= 100 * (allGrade[tierList.indexOf(j)][j] - eeveeFilter[j]["min"]) / (eeveeFilter[j]["max"] - eeveeFilter[j]["min"]);
                    eeveeFilter[j]["cutPercent"]= 100 * (eeveeFilter[j]["cut"] - eeveeFilter[j]["min"]) / (eeveeFilter[j]["max"] - eeveeFilter[j]["min"]);
                };
            };
            if(eeveeLike !== "없음"){
                //선호하는 진화가 글&부&리 가 아닐 경우
                if(preferList.indexOf(eeveeLike) === -1){
                    //선호하는 이브이가 추천 후보에 있을 경우
                    if(finalList.indexOf(tierList[korName.indexOf(eeveeLike)]) !== -1){
                        //선호 이브이를 1순위로 배치한다.
                        finalList.splice(finalList.indexOf(tierList[korName.indexOf(eeveeLike)]), 1);
                        finalList.unshift(tierList[korName.indexOf(eeveeLike)]);
                    };
                }else{
                    if(eeveeLike === "리피아"){
                        if(finalList.indexOf("sylveon") !== -1){
                            finalList.unshift(tierList[korName.indexOf(eeveeLike)]);
                            eeveeFilter[tierList[korName.indexOf(eeveeLike)]]= eeveeFilter["sylveon"];
                        };
                    }else{
                        //선호하는 진화가 글&부 중에 하나
                        let findSubstitute= tierList.slice(2, 4);
                        findSubstitute.push(...tierList.slice(5, 7));
                        for(const z of findSubstitute){
                            if(finalList.indexOf(z) !== -1){
                                //블&주&샤가 후보에 있으면 동일한 평가로 1순위에 선호 이브이를 추가
                                finalList.unshift(tierList[korName.indexOf(eeveeLike)]);
                                eeveeFilter[tierList[korName.indexOf(eeveeLike)]]= eeveeFilter[z];
                                if(z.slice(0, 3) === "ing"){
                                    checkIfIng= korName[tierList.indexOf(finalList[0])] + "(식재료형)";
                                };
                                break;
                            };
                        }
                    }
                };
            };
            if(checkIfIng === undefined){
                checkIfIng= korName[tierList.indexOf(finalList[0])];
            };

            //간단 코멘트
            const eeveeComment= {
                "sylveon": "포켓몬 슬립 내에서 몇 안되는 기력 서포터 포켓몬입니다. 기력은 포켓몬들의 도우미 효율과 직결되므로 그 중요성은 이루 다 말할 수 없습니다. 또한 서포터 포켓몬 특성 상 어떠한 파티에도 쉽게 어우러집니다. 최소한의 조건만 갖추면 바로 훌륭한 성능을 발휘하기에 개체 선별도 쉬운 편입니다. 이러한 복합적인 이유로 이브이 진화체 중에서도 최상위권으로 평가 받고 있습니다.",
                "espeon": "포켓몬 슬립 내에서 최고의 스킬 중 하나로 평가 받는 '에너지 차지 M' 스킬을 보유한 포켓몬입니다. 스킬 레벨에 따른 에너지 증가량이 기하급수적으로 늘어나는 것이 특징입니다. 메인 스킬 6렙 기준 잠만보에게 4546의 에너지를 주며, 이는 적당한 요리 1개 분량의 에너지입니다. 에브이의 레벨에 따라 메인 스킬의 에너지량은 더 증가하므로 실질적인 에너지량은 더 많습니다.",
                "jolteon": "포켓몬 슬립 내에서 라이츄, 팬텀과 더불어 제일 빠른 도우미 속도를 보유한 포켓몬입니다. 그렇기에 스킬을 배제해도 자체 스펙이 매우 뛰어납니다. 쥬피썬더는 동료 포켓몬이 일정 횟수 즉시 도움을 발동하는 스킬을 보유했는데, 이는 동료 포켓몬의 성능에 따라 편차가 큽니다. 따라서 단독으로도 고성능을 내는 에브이에 밀리는 것이 사실입니다. 하지만 게임 후반으로 갈수록, 팀 포켓몬의 성능이 좋아질수록 에브이를 능가할 잠재능력은 충분한 포켓몬입니다.",
                "vaporeon":"무작위 종류의 식재료를 최대 21개까지 주는 '식재료 획득 S'스킬을 보유한 포켓몬입니다. 스킬 자체의 성능은 매우 우수하기에 동일한 스킬을 보유한 비스킬형 포켓몬들도 웬만하면 메인 스킬 발동률 감소는 피하는 편입니다. 하지만 랜덤이기에 안정적인 식재료 수급은 어렵고, 느린 도우미 속도가 아쉽습니다.",
                "umbreon": "상당히 흥미로운 구조를 지닌 포켓몬입니다. 자체 기력을 회복하는 스킬은 사실 특출난 점이 없습니다만, 반대로 생각해보면 자체적으로 기력 관리가 용이해서 안정적인 도움이 가능합니다.(기력이 높을수록 도우미 효율은 증가합니다.) 또한 스킬이 적은 투자로도 높은 효율을 보이기에 스킬형 포켓몬이지만 스킬에 집중하지 않고 다른 능력에 투자할 수 있다는 장점이 있습니다. 느린 도우미 속도가 아쉽지만, 높은 기력 유지력으로 실질적인 도우미 속도는 훨씬 빠르기에 큰 문제가 되지는 않습니다.",
                "ingJolteon": "(식재료형이 일반적인 이브이에 비해서 성능이 떨어지는 것은 사실이나, 이렇게 식재료 관련 능력이 많이 붙으면 그냥 식재료형으로 쓰라는 운명일지도 모릅니다.)<br><br>포켓몬 슬립 내에서 라이츄, 팬텀과 더불어 제일 빠른 도우미 속도를 보유한 포켓몬입니다. 그렇기에 스킬을 배제해도 자체 스펙이 매우 뛰어납니다. 쥬피썬더는 동료 포켓몬이 일정 횟수 즉시 도움을 발동하는 스킬을 보유했는데, 이는 동료 포켓몬의 성능에 따라 편차가 큽니다. 따라서 단독으로도 고성능을 내는 에브이에 밀리는 것이 사실입니다. 하지만 게임 후반으로 갈수록, 팀 포켓몬의 성능이 좋아질수록 에브이를 능가할 잠재능력은 충분한 포켓몬입니다.",
                "ingVaporeon":"(식재료형이 일반적인 이브이에 비해서 성능이 떨어지는 것은 사실이나, 이렇게 식재료 관련 능력이 많이 붙으면 그냥 식재료형으로 쓰라는 운명일지도 모릅니다.)<br><br>무작위 종류의 식재료를 최대 21개까지 주는 '식재료 획득 S'스킬을 보유한 포켓몬입니다. 스킬 자체의 성능은 매우 우수하기에 동일한 스킬을 보유한 비스킬형 포켓몬들도 웬만하면 메인 스킬 발동 확률 감소는 피하는 편입니다. 하지만 랜덤이기에 안정적인 식재료 수급은 어렵고, 느린 도우미 속도가 아쉽습니다.",
                "ingUmbreon": "(식재료형이 일반적인 이브이에 비해서 성능이 떨어지는 것은 사실이나, 이렇게 식재료 관련 능력이 많이 붙으면 그냥 식재료형으로 쓰라는 운명일지도 모릅니다.)<br><br>상당히 흥미로운 구조를 지닌 포켓몬입니다. 자체 기력을 회복시키는 스킬은 사실 특출난 점이 없습니다만, 반대로 보면 자체적으로 기력 관리가 용이해서 안정적인 도움이 가능합니다. 또한 스킬이 적은 투자로도 높은 효율을 보이기에 스킬형 포켓몬이지만 스킬에 집중하지 않고 다른 능력에 투자할 수 있다는 장점이 있습니다. 느린 도우미 속도가 아쉽지만, 높은 기력 유지력으로 실질적인 도우미 속도는 훨씬 빠르기에 큰 문제가 되지는 않습니다.",
                "glaceon": "요리에 필요한 냄비 용량을 늘리는 독특한 스킬을 보유한 포켓몬입니다. 사실 자체적으로 잠만보 에너지에 기여하는 능력이 없고, 동료 포켓몬이 모은 식재료를 사용할 수 있게 해주는 능력이라 아직은 평가가 엇갈리는 포켓몬입니다. 하지만 게임 후반에 동료 포켓몬이 생성하는 식재료 개수가 크게 증가하면 평가가 좋아질 가능성은 충분히 있습니다.",
                "flareon": "요리에 필요한 냄비 용량을 늘리는 독특한 스킬을 보유한 포켓몬입니다. 사실 자체적으로 잠만보 에너지에 기여하는 능력이 없고, 동료 포켓몬이 모은 식재료를 사용할 수 있게 해주는 능력이라 아직은 평가가 엇갈리는 포켓몬입니다. 하지만 게임 후반에 동료 포켓몬이 생성하는 식재료 개수가 크게 증가하면 평가가 좋아질 가능성은 충분히 있습니다.",
                "leafeon": "포켓몬 슬립 내에서 몇 안되는 기력 서포터 포켓몬입니다. 기력은 포켓몬들의 도우미 효율과 직결되므로 그 중요성은 이루 다 말할 수 없습니다. 또한 서포터 포켓몬 특성 상 어떠한 파티에도 쉽게 어우러집니다. 하지만 무작위의 포켓몬에게 기력을 회복시켜준다는 점은 아쉽습니다."
            };
            //간략한 평가 기준 설명
            const eeveeGuide= {
                "sylveon": "별다른 준비 없이도 훌륭한 서포팅 능력을 보입니다. 그렇기에 웬만하면 적합 판정을 주려고 했습니다. '스킬 확률업 M', '스킬 확률업 S', 그리고 '메인 스킬 발동률 증가' 성격이 고평가를 받습니다. 또한 서포터의 특성을 고려해, 팀 전체를 서포팅하는 서브 스킬에 가산점을 주었습니다.",
                "espeon": "메인 스킬의 성능이 압도적이기에 스킬 관련 능력치에 높은 비중을 두었습니다. '스킬 확률업 M', '스킬 확률업 S', 그리고 '메인 스킬 발동률 증가' 성격이 고평가를 받습니다. 님피아와 유사한 조건을 갖췄지만, 팀 에이스의 역할이기에 보다 엄격한 기준을 적용했습니다. 따라서 에브이가 추천으로 나왔으면 웬만하면 님피아로도 훌륭한 친구입니다.",
                "jolteon": "자체 스펙이 훌륭하기에 '나무열매 수 S'의 효율이 매우 좋습니다. '스킬 확률업 M'은 당연히 좋습니다. 이미 훌륭한 스펙 덕분에 자신의 강화 대신 팀원 서포팅에 투자할 여유가 있습니다. 그래서 '도우미 보너스'를 필두로 다양한 팀 서포팅 능력에 가산점을 주었습니다.",
                "vaporeon": "느린 도우미 속도를 보완하는 데 중점을 두었습니다. 비슷한 경쟁 상대인 쥬피썬더와 조건이 비슷하지만, 동료 서포팅에 무게를 둔 쥬피썬더에 비해 '도우미 스피드 M'등 자체 스펙을 보완하는 능력에 중점을 두었습니다. '스킬 확률업 M'은 당연히 좋습니다.",
                "umbreon": "스킬형이지만 스킬이 중요하지 않다는 특징이 핵심입니다. 따라서 메인 스킬 관련 성격 및 서브 스킬의 중요도가 떨어지고 그 외에 도움이 되는 많은 능력에서 가점을 얻습니다. 어떻게 키워도 밥값을 하기에 육성 방향이 자유롭습니다.",
                "glaceon": "스킬 발동이 중점인 포켓몬이지만, 그렇다고 스킬만 난사한다고 무조건 좋은 것도 아닌 친구입니다. 따라서 스킬과 자체 도움의 균형이 중요한데...게임 후반부에 접어들어야 정확한 평가가 가능할 것 같습니다. 우선은 '나무열매 수 S'등 모든 포켓몬에게 무난하게 좋은 서브 스킬들에 가산점을 주었습니다.",
                "flareon": "스킬 발동이 중점인 포켓몬이지만, 그렇다고 스킬만 난사한다고 무조건 좋은 것도 아닌 친구입니다. 따라서 스킬과 자체 도움의 균형이 중요한데...게임 후반부에 접어들어야 정확한 평가가 가능할 것 같습니다. 우선은 '나무열매 수 S'등 모든 포켓몬에게 무난하게 좋은 서브 스킬들에 가산점을 주었습니다.",
                "leafeon": "스킬 확률업 M, 스킬 확률업 S, 그리고 메인 스킬 발동률 증가 성격이 고평가를 받을 수 있습니다. 또한 서포터의 특성을 고려해, 팀 전체를 서포팅하는 서브 스킬에 가산점을 주었습니다."
            };
            let naming= finalList[0];
            if(naming.slice(0, 3) === "ing"){
                naming= finalList[0].slice(3).toLowerCase();
            };
            document.getElementById("realFinalImage").innerHTML= `<img class="middleImage" src="eevelutionArt/${naming + "2"}.png"/>`;
            document.getElementById("realFinalName").innerHTML= `${checkIfIng}`;
            document.getElementById("realFinalScore").innerHTML= `<fieldset id="resultScore">
                                                                        <legend><strong>적합도:</strong></legend>
                                                                        <p><h1>&nbsp;${Math.floor(eeveeFilter[finalList[0]]["percent"])} %&nbsp;</h1></p>
                                                                        (추천하는 최소 적합도: ${Math.floor(eeveeFilter[finalList[0]]["cutPercent"])} %)
                                                                    </fieldset>`;
            document.getElementById("realFinalComment").innerHTML= `<fieldset id="resultComment">
                                                                        <legend><strong>소개:</strong></legend>
                                                                        <p>${eeveeComment[finalList[0]]}</p>
                                                                    </fieldset>`;
            document.getElementById("realFinalGuide").innerHTML= `<fieldset id="resultGuide">
                                                                        <legend><strong>평가 중점사항:</strong></legend>
                                                                        <p>${eeveeGuide[naming]}</p>
                                                                    </fieldset>`;
            document.getElementById("anotherButton").style.display= "block";                                                                        
        }else{
            document.getElementById("realFinalScore").innerHTML= "";
            document.getElementById("realFinalGuide").innerHTML= "";
            document.getElementById("realFinalImage").innerHTML= `<img class="middleImage" src="eevelutionArt/noResult.png"/>`;
            document.getElementById("realFinalName").innerHTML= `이브이`;
            document.getElementById("realFinalComment").innerHTML= `<fieldset id="resultComment">                
                                                                        <p>적합한 진화체를 찾지 못했습니다.<br>이 이브이는 지금 상태 그대로를 제일 마음에 들어하는 것 같네요.</p>
                                                                    </fieldset>`;                                                                    
        };
    }catch(err) {
        alert("오류가 발생했습니다. 기입한 정보가 잘못되지 않았는지 다시 확인해주세요.");
        console.error('error:', err);
    };
};

function showMore(){
    //다른 추천 목록 보기
    if(finalList.length > 1){
        document.getElementById("otherEevee").style.display= "block";
        document.getElementById("anotherButton").style.display= "none";
        let anotherResult= "";
        for(let v=1; v < finalList.length; v++){
            let candiEevee= finalList[v];
            if(finalList[v].slice(0, 3) === "ing"){
                candiEevee= finalList[v].slice(3).toLowerCase();
            };
            anotherResult += `<div id="realFinalOthers">
            <img src="eevelutionArt/${candiEevee}.png" class="eevelutionAll" id="${candiEevee}"/>
            <div class="otherBlank"><h2 class="otherNameBlank">${korName[tierList.indexOf(finalList[v])]}</h2>
                적합도: <h2 style="display: inline;">${Math.floor(eeveeFilter[finalList[v]]["percent"])} %</h2>
                <div class="explain">(최소 추천 적합도: <strong>${Math.floor(eeveeFilter[finalList[v]]["cutPercent"])} %</strong>)
                </div>
            </div></div><br>`;
        }
        document.getElementById("realFinalList").innerHTML= anotherResult;
    }else{
        alert("다른 추천 목록이 없습니다.");
    };
};