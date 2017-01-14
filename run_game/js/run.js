window.onload=function(){
    var clientW=document.documentElement.clientWidth;
    var clientH=document.documentElement.clientHeight;
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    canvas.width=clientW;
    canvas.height=clientH;
    var runA=document.querySelector(".runA");
    var jumpA=document.querySelector(".jumpA");
    var dieA=document.querySelector(".dieA");
    var sheA=document.querySelector(".sheA");
    var runimg=document.querySelectorAll(".run");
    var jumpimg=document.querySelectorAll(".jump");
    var hinderimg=document.querySelectorAll(".hinder");
    var zidanimg=document.querySelectorAll(".zidan")[0];
    var start=$(".start");
    var mask=$(".mask");
    var jifen=document.querySelector(".score span");
    var progress=document.querySelector(".progress1");
    var gameObj=new game(canvas,cobj,runimg,jumpimg,hinderimg,zidanimg,runA,jumpA,dieA,sheA,jifen,progress);
    $(".btn").one("click",function(){
        gameObj.play(start,mask);

    })




}