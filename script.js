let expPerLevel= [54, 71, 108, 128, 164, 202, 244, 274,
315, 345,  376, 407, 419, 429, 440, 454, 469, 483, 497, 515,
537, 558, 579, 600, 622, 643, 665, 686, 708, 729, 748, 766, 785,
803, 821, 839, 857, 875, 893, 910, 928, 945, 963, 980, 997, 1015,
1032, 1049, 1066];
//레벨 당 경험치량
let shardPerLevel= [14, 18, 22, 27, 30, 34, 39, 44, 48, 50, 52, 53,
56, 59, 62, 66, 68, 71, 74, 78, 81, 85, 88, 92, 95, 100, 105, 111,
117, 122, 126, 130, 136, 143, 151, 160, 167, 174, 184, 192, 201,
211, 221, 227, 236, 250, 264, 279, 295, 309];
//특정 레벨에서 사탕 하나 당 필요한 꿈의 조각 개수
let gesangee= "Beta ver.";
//계산기 웹사이트 현재 버전

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calcVer").innerHTML= gesangee;
});

let proOn= document.getElementById("proVer");
//프로 버전 계산기 선택했는지 확인
let lightOn= document.getElementById("lightVer");
//라이트 버전 계산기 선택했는지 확인

proOn.addEventListener("change", () => {
    if(proOn.checked){
        for(let ele of document.getElementsByClassName("proCalc")){
            ele.style.display= "flex";
        };
    };
});
lightOn.addEventListener("change", () => {
    if(lightOn.checked){
        for(let elle of document.getElementsByClassName("proCalc")){
            elle.style.display= "none";
        };
    };
});
//라이트, 프로 버전 계산기에 따라 입력란이 변함

function calculator() {
    let candy= 25;
    //사탕 하나의 경험치량
    let current= parseInt(document.getElementById('currentLevel').value);
    //포켓몬의 현재 레벨
    let goal= parseInt(document.getElementById('targetLevel').value);  
    //포켓몬의 목표 레벨
    let left= expPerLevel[current - 1];
    //포켓몬의 다음 레벨까지 남은 경험치량
    //라이트 계산기는 현재 남은 경험치량 고려 안함
    let checkIf600poke;
    let checkIfExpNature;
    let errorMessage= "";
    //사용자가 정보 오기입시 띄울 알림창 메시지
    let noInputError = true;
    //사용자가 정보 오기입 했는지 확인

    if(current < 1 || current > 49){
        errorMessage += "-현재 레벨은 1부터 49 사이만 가능합니다.\n";
        noInputError = false;
    };
    if(goal < 2 || goal > 50){
        errorMessage += "-목표 레벨은 2부터 50 사이만 가능합니다.\n";
        noInputError = false;
    };

    if(proOn.checked){
        left= parseInt(document.getElementById('leftExp').value);
        //포켓몬의 다음 레벨까지 남은 경험치량
        checkIf600poke= document.getElementById("600poke").value;
        //600족 포켓몬인지 확인
        checkIfExpNature= document.getElementById("expNature").value;
        //경험치 증감 성격 확인
    };

    if(checkIf600poke === "애버라스 계열"){
        if(left > expPerLevel[current - 1] * 1.5){
            errorMessage += "-남은 경험치량을 제대로 기입했는지 확인해주세요.\n";
            noInputError = false;
        };
    }else{
        if(left > expPerLevel[current - 1]){
            errorMessage += "-남은 경험치량을 제대로 기입했는지 확인해주세요.\n";
            noInputError = false;
        };
    };

    if(noInputError){
        if(checkIfExpNature === "exp 획득량 감소"){
            candy= candy * 0.8;
        }else if(checkIfExpNature === "exp 획득량 증가"){
            candy = candy * 1.2;
        };
        let totalExpRequired= left;
        //현재 레벨에서 목표레벨까지 필요한 경험치량
        let leftoverCandyExp= candy - left % candy;
        //사탕으로 렙업할 때 렙업하고도 초과하는 경험치량
        let totalShardsRequired= Math.ceil(left / candy) * shardPerLevel[current - 1];
        //현재 레벨에서 목표레벨까지 필요한 꿈의 조각 개수
    
        if(checkIf600poke === "애버라스 계열"){
            for(let z= 0; z < (goal - current - 1); z++){
                totalExpRequired += expPerLevel[z + current] * 1.5;
                totalShardsRequired += Math.ceil((expPerLevel[z + current] * 1.5 - leftoverCandyExp) / candy) * shardPerLevel[z + current];
                if((expPerLevel[z + current] * 1.5 - leftoverCandyExp) % candy === 0){
                    leftoverCandyExp= 0;
                }else{
                    leftoverCandyExp= candy - (expPerLevel[z + current] * 1.5 - leftoverCandyExp) % candy;
                };
            };
        }else{
            for(let z= 0; z < (goal - current - 1); z++){
                totalExpRequired += expPerLevel[z + current];
                totalShardsRequired += Math.ceil((expPerLevel[z + current] - leftoverCandyExp) / candy) * shardPerLevel[z + current];
                if((expPerLevel[z + current] - leftoverCandyExp) % candy === 0){
                    leftoverCandyExp= 0;
                }else{
                    leftoverCandyExp= candy - (expPerLevel[z + current] - leftoverCandyExp) % candy;
                };
            };
        };
        let totalCandyRequired= Math.ceil(totalExpRequired / candy);
        //현재 레벨에서 목표레벨까지 필요한 사탕 개수
    
        document.getElementById('resultExp').value= totalExpRequired;
        document.getElementById('resultCandy').value= totalCandyRequired;
        document.getElementById('resultShard').value= totalShardsRequired;
        document.getElementById('resultOutput').style.visibility = "visible";
    }else{
        alert(errorMessage);
    };
};


//예를들어, 레벨3 부터 레벨8까지 경험치, 남은 경험치 30
