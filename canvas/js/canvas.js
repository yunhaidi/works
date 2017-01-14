$(function(){
//    菜单下拉

    $(".nav").hover(function(){
        $(".meau_inside").eq($(".nav").index(this)).slideDown(300);
    },function(){
        $(".meau_inside").eq($(".nav").index(this)).slideUp(300).stop(false,true);
    })

    $(".meau_inside li").hover(function(){
        $(this).css({ animation:"color .5s forwards"});
    },function(){
        $(this).css({ animation:"color1 .5s forwards"});
    })

    //阻止浏览器默认行为
    $(window).mousedown(function(e){
        e.preventDefault();
    })

//画画功能
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var copy=document.querySelector(".copy");
    var drawObj=new shape(canvas,copy,cobj);
    drawObj.pen();
    /*画图*/
    $(".meau_inside:eq(1) li").click(function(){
        var fn=$(this).attr("data-role");
        if(fn!=="pen") {
            drawObj.type = fn;
            drawObj.draw();
        }else{
            drawObj.pen();
        }
    })
    /*画图的方式*/
    $(".meau_inside:eq(2) li").click(function(){
        var fn=$(this).attr("data-role");
        drawObj.style=fn;
        drawObj.draw();
    })
    /*画图的颜色*/
    $(".meau_list:eq(3) input").change(function(){
        drawObj[$(this).attr("data-role")]=$(this).val();
        drawObj.draw();
    })
    $(".meau_list:eq(4) input").change(function(){
        drawObj[$(this).attr("data-role")]=$(this).val();
        drawObj.draw();
    })
    /*线条的粗细*/
    $(".meau_inside:eq(3) li").click(function(){
        var num=$(this).attr("data-role");
        if(num!=="null") {
            drawObj.lineWidth =num;
            drawObj.draw();
        }
    })
    // $(".meau_inside:eq(3) li input").change(function(){
    //     var num=$(this).val();
    //     drawObj.lineWidth =num;
    //     drawObj.draw();
    // })

    /*文件*/
    $(".meau_inside:eq(0) li").click(function(){
        var index=$(".meau_inside:eq(0) li").index(this);
        if(index==0){
            if(drawObj.history.length>0){
                var yes=confirm("是否保存");
                if(yes){
                    var url=canvas.toDataURL();
                    var newurl=url.replace("image/png","stream/octet");//下载到本地
                    location.href=newurl;
                }
            }
            cobj.clearRect(0,0,canvas.width,canvas.height);
            drawObj.history=[];
        }else if(index==1){
            //返回
            if(drawObj.history.length==0){
                //no
                cobj.clearRect(0,0,canvas.width,canvas.height);
                setTimeout(function(){
                    alert("不能返回");
                },10)
            }else{
                if (drawObj.isBack) {
                    if (drawObj.history.length == 1) {
                        drawObj.history.pop();
                        cobj.clearRect(0, 0, canvas.width, canvas.height);
                    } else {
                        drawObj.history.pop();
                        cobj.putImageData(drawObj.history.pop(), 0, 0);
                    }
                } else {
                    cobj.putImageData(drawObj.history.pop(), 0, 0);
                }
                drawObj.isBack = false;
            }
        }else if(index==2) {
            var url=canvas.toDataURL();
            var newurl=url.replace("image/png","stream/octet");
            location.href=newurl;
        }
    })
    //橡皮
    $(".meau_list:last-child").click(function(){
        var xpObj=$(".xp");
        drawObj.isshowxp=true;
        drawObj.xp(xpObj);
    });


//            图片处理
    var file=document.querySelector(".file");
    var img=document.querySelector("img");
    file.onchange=function(){
        var fileobj=this.files[0];
        var reader=new FileReader();
        reader.readAsDataURL(fileobj);
        reader.onload=function(e){
            img.src=e.target.result;
            cobj.drawImage(img,0,0,canvas.width,canvas.height);
            dataobj=cobj.getImageData(0,0,canvas.width,canvas.height);
        }
    };
    var lis=$(".tupian li");
    for(var i=0;i<lis.length;i++){
        lis[i].onclick=function(){
            var attr=this.getAttribute("data-role");
            if(attr=="mh"){
                drawObj.mh(dataobj,10,0,0);
            }else if(attr=="fx"){
                drawObj.fx(dataobj,0,0);
            }else if(attr=="msk"){
                drawObj.msk(dataobj,50,0,0);
            }
        }
    }

})