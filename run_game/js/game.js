//人物
function person(canvas,cobj,runimg,jumpimg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runimg;
    this.jumps=jumpimg;
    this.x=0;
    this.y=280;
    this.width=94;
    this.height=129;
    this.speedx=6;
    this.status="runs";
    this.state=0;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,94,129,0,0,this.width,this.height);
        this.cobj.restore();
    }
}

//障碍物
function hinder(canvas,cobj,hinderimg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderimg=hinderimg;
    this.x=this.canvas.width-200;
    this.y=320;
    this.state=0;
    this.width=80;
    this.height=80;
    this.speedx=16;
}
hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinderimg[this.state],0,0,200,200,0,0,this.width,this.height);
        this.cobj.restore();
    }
}

//血
function blood(canvas,cobj,x,y){
    this.canvas=canvas;
    this.cobj=cobj;
    this.x=x;
    this.y=y;
    this.w=canvas.width;
    this.h=canvas.height;
    this.r=2*Math.random();
    this.speedx=12*Math.random()-6;
    this.speedy=12*Math.random()-6;
    this.speedr=0.1;
}
blood.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.fillStyle="red";
        this.cobj.beginPath();
        this.cobj.arc(0,0,this.r,0,2*Math.PI);
        this.cobj.fill();
        this.cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.y+=this.speedy;
        this.r-=this.speedr;
    }
}
function xue(canvas,cobj,x,y){
    var bloodArr=[];
    for(var j=0;j<100;j++){
        var bloodObj=new blood(canvas,cobj,x,y);
        bloodObj.x=x;
        bloodObj.y=y;
        bloodArr.push(bloodObj);
    }
    var t=setInterval(function(){
        cobj.clearRect(0,0,this.w,this.h);
        for(var j=0;j<bloodArr.length;j++){
            bloodArr[j].draw();
            bloodArr[j].update();
            if(bloodArr[j].r<0){
                bloodArr.splice(j,1);
            }
        }
    },50)
    if(bloodArr.length==0){
        clearInterval(t);
    }
}
//子弹
function zidan(canvas,cobj,zidanimg){
    this.canvas=canvas;
    this.width=canvas.width;
    this.height=canvas.height;
    this.cobj=cobj;
    this.zidanimg=zidanimg;
    this.state=0;
    this.x=0;
    this.y=0;
    this.width=60;
    this.height=40;
    this.speedx=5;
    this.jia=1;
}
zidan.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.zidanimg,0,0,120,80,0,0,this.width,this.height);
        this.cobj.restore();
    },
    update:function(){
        this.speedx+=this.jia;
        this.x+=this.speedx;
    }
}

//游戏的主类，整合一系列对象
function game(canvas,cobj,runimg,jumpimg,hinderimg,zidanimg,runA,jumpA,dieA,sheA,jifen,progress){
    this.canvas=canvas;
    this.cobj=cobj;
    this.width=canvas.width;
    this.height=canvas.height;
    this.back=0;
    this.backSpeed=10;
    this.hinderArr=[];
    this.hinderimg=hinderimg;
    this.zidanimg=zidanimg;
    this.person=new person(canvas,cobj,runimg,jumpimg);
    this.life=3;
    this.score=0;
    this.jifen=jifen;
    this.progress=progress;
    this.name="";
    this.runA=runA;
    this.jumpA=jumpA;
    this.dieA=dieA;
    this.sheA=sheA;
    this.zidan=new zidan(canvas,cobj,zidanimg);
    this.isfir=false;
    this.isrun=false;
    //move
    this.ts={};
    this.num=0;
    this.top=0;
    this.num1=0;
    this.rand=(Math.ceil((2+Math.random()*3)))*1000;
    //move2
    this.flag=true;
    this.inita=0;
    this.speeda=5;
    this.r=100;
    this.y1=this.person.y;
}
game.prototype={
    play:function(start,mask){
        //大幕拉起
        start.css("animation","start1 2s ease forwards");
        mask.css("animation","mask1 2s ease forwards");
        this.name=prompt("请输入用户名","yun");
        this.run();
        this.key();
        this.fashe();
    },
    run:function(){
        var that=this;
        that.runA.play();
        that.ts.t1=setInterval(function(){
            that.move();
        },50);

    },
    move:function(){
        var that=this;
            that.cobj.clearRect(0,0,that.width,that.height);
            that.num++;
            if(that.person.status=="runs"){
                that.person.state=that.num%8;
            }
            else{
                that.person.state=0;
            }
            that.person.x+=that.person.speedx;
            if(that.person.x>that.width/3){
                that.person.x=that.width/3;
            }
            that.person.draw();
            //背景
            that.back-=that.backSpeed;
            that.canvas.style.backgroundPositionX=that.back+"px";
            //    障碍物
            that.num1+=100;
            if(that.num1%that.rand==0){
                that.num1=0;
                var hinderObj=new hinder(that.canvas,that.cobj,that.hinderimg);
                hinderObj.state=Math.floor(Math.random()*that.hinderimg.length);
                that.hinderArr.push(hinderObj);
            }
            if(that.hinderArr.length>5){
                that.hinderArr.shift();
            }
            for(var i=0;i<that.hinderArr.length;i++){
                that.hinderArr[i].x-=that.hinderArr[i].speedx;
                that.hinderArr[i].draw();
                //碰撞
                if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
                    if(!that.hinderArr[i].flag){
                        that.life--;
                        that.progress.style.background="red";
                        that.progress.style.width=180-(3-that.life)*60+"px";
                        xue(that.canvas,that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                        // that.dieA().play;
                        if(that.life==0){
                            // 存储
                            var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
                            var temp={name:that.name,score:that.score};
                            // 排序
                            if(messages.length>0){
                                messages.sort(function(a,b){
                                  return a.score<b.score;
                                });
                                if(messages.length==3){
                                    if(temp.store>messages[messages.length-1].store){
                                        messages[messages.length-1]=temp;
                                    }
                                }else if(messages.length<3){
                                    messages.push(temp);
                                }
                            }else{
                                messages.push(temp);
                            }

                            localStorage.messages=JSON.stringify(messages);
                            messages.push(temp);
                            that.over();
                        }
                    }
                    that.hinderArr[i].flag=true;
                }else if(that.hinderArr[i].x+that.hinderArr[i].width<that.person.x) {
                    if (!that.hinderArr[i].flag1 && !that.hinderArr[i].flag) {
                        document.title=++that.score;
                        that.jifen.innerHTML=that.score;
                    }
                    that.hinderArr[i].flag1 = true;
                }
                //操作子弹
                if(that.isfir){
                    if(hitPix(that.canvas,that.cobj,that.zidan,that.hinderArr[i])){
                        that.hinderArr.splice(i,1);
                        that.cobj.clearRect(0,0,that.w,that.h);
                        document.title=++that.score;
                        that.jifen.innerHTML=that.score;
                        that.sheA.play();
                    }
                }


            }

            if(that.isfir){
                if(that.zidan.x>700){
                    that.isfir=false;
                    that.zidan.speedx1=5;
                }
                that.zidan.update();
                that.zidan.draw();
            }
            that.num1+=50;
    },
    key:function(){
        var that=this;
        document.onkeydown=function(e){
            if(e.keyCode==38){
                if(!that.isrun){
                    for(var i in that.ts){
                        clearInterval(that.ts[i]);
                    }
                    that.runA.pause();
                    that.isrun=true;
                }else if(that.isrun){
                    that.ts.t1=setInterval(function(){
                        that.move();
                    },50);
                    if(!that.flag){
                        clearInterval(that.ts.t2);
                        that.ts.t2=setInterval(function(){
                            that.move2();
                        },50);
                    }
                    that.runA.play();
                    that.isrun=false;
                }
            }else if(e.keyCode==32){
                if(!that.flag){
                    return;
                }
                that.flag=false;
                that.jumpA.play();
                that.person.status="jumps";
                that.ts.t2=setInterval(function(){
                    that.move2();
                },50)
            }
        }
    },
    move2:function(){
        var that=this;
        that.inita+=that.speeda;
        var top1=Math.sin(that.inita*Math.PI/180)*that.r;
        if(that.inita>=180){
            clearInterval(that.ts.t2);
            that.runA.play();
            that.person.y=that.y1;
            that.person.status="runs";
            that.flag=true;
            that.inita=0;
        }else{
            that.person.y=that.y1-top1;
        }
    },
    over:function(){
        for(var i in this.ts){
            clearInterval(this.ts[i]);  //关闭所有的计时器
        }
        var over=document.querySelector(".over");
        over.style.animation="start 2s ease forwards";
        this.runA.pause();
        //记录分数
        var scoreEle=document.querySelector(".scoreEle");
        scoreEle.innerHTML=this.score;
        var lis=document.querySelector(".over ul");
        var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
        var str="";
        for (var i = 0; i < messages.length; i++) {
            str+="<li>"+messages[i].name+"："+messages[i].score;
        }
        lis.innerHTML=str;
        this.again();
    },
    again:function(){
        var that=this;
        that.name="";
        var btn1=document.querySelector(".again");
        btn1.onclick=function() {
            var over=document.querySelector(".over");
            over.style.animation="start1 2s ease forwards";
            location.reload();
        }
    },
    fashe:function(){
        var that=this;
        var mask=$(".mask");
        mask.click(function(){
            if(that.isfir){
                return false;
            }
            that.isfir=true;
            that.zidan.x=that.person.x+that.person.width/2;
            that.zidan.y=that.person.y+that.person.height/2;

        })
    }
}