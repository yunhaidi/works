$(function(){
    function resize(originSize,type){
        var type=type||"x";
        var cw=document.documentElement.clientWidth;
        var ch=document.documentElement.clientHeight;
        if(type=="x"){
            var scale=cw/originSize*100;
        }
        if(type=="y"){
            var scale=ch/originSize*100;
        }
        var html=document.querySelector("html");
        html.style.fontSize=scale+"px";
    }
    resize(1334,"y");

})