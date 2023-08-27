let gesangee= "Beta ver.";
//계산기 웹사이트 현재 버전

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calcVer").innerHTML= gesangee;
    if(window.innerHeight > document.body.offsetHeight){
        document.getElementById("fillEmpty").style.height= window.innerHeight - document.body.offsetHeight;
    };
});