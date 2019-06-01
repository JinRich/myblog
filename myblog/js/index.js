window.onload=function () {
    //鼠标移入当前元素展开其他元素隐藏
    function li(){
        let listUl=document.querySelector(".down>#show>.list");
        // console.log(listUl);
        let listLi=listUl.getElementsByTagName("li");
        // console.log(listLi);
        for (let i=0;i<listLi.length;i++){
            listLi[i].onmouseenter=function () {
                for (let j=0;j<listLi.length;j++){
                    listLi[j].classList.remove("hot")
                }
                this.classList.add("hot")
            }
        }
    }
    li();

    let tabUl=document.getElementsByClassName("banner")[0];
    let tabLi=tabUl.getElementsByTagName("li");
    let down=document.querySelectorAll(".down>.tab");
    // console.log(down);
    // console.log(tabLi);
    //个人博客处页内切换
    for (let i=0;i<tabLi.length;i++){
        tabLi[i].onclick=function () {
            for (let j=0;j<tabLi.length;j++) {
                tabLi[j].id ="";
                down[j].id="";
            }
            tabLi[i].id="border";
            down[i].id="show";
            li();
        }
    }



    let right=document.querySelector(".rightbutton");
    let bannerImg=document.querySelectorAll(".neck>.box1>a>img");
    let left=document.querySelector(".leftbutton");
    let point=document.getElementsByClassName("lipoint");
    let point1=Array.from(point);
    let flag=true;
    let now=0,next=0;
    let w =bannerImg[0].offsetWidth;
    //轮播图下坐标点
    point1.forEach(function (value,index) {
        value.onclick=function () {

            for (let j=0;j<point1.length;j++){
                point1[j].style.background=""
            }
            point1[index].style.background="#12b7de";
            if (!flag){
                return;
            }
            flag=false;
            if (index===now){
                flag=true;
                return
            }
            if (index>now){
                bannerImg[index].style.left=w+'px';
                animate(bannerImg[now],{left:-w});
                animate(bannerImg[index],{left:0},function () {
                    flag=true;
                });
            }
            else{
                bannerImg[index].style.left=-w+'px';
                animate(bannerImg[now],{left:w});
                animate(bannerImg[index],{left:0},function () {
                    flag=true
                });
            }

            now=index;
            next=index;
            console.log("touch-num"+now);
        }
    });
    //轮播图向右点击
    right.onclick=function () {
        if (!flag){
            return;
        }
        flag=false;
        next++;
        if (next==bannerImg.length){
            next=0;
        }
        bannerImg[next].style.left=w+'px';
        animate(bannerImg[now],{left:-w});
        animate(bannerImg[next],{left:0},function () {
            flag=true;
        });
        for (let j=0;j<point1.length;j++){
            point1[j].style.background=""
        }
        point1[next].style.background="#12b7de";
        now=next;
    };
    //轮播图向左点击
    left.onclick=function () {
        if (!flag){
            return;
        }
        flag=false;
        next--;
        if (next<0){
            next=bannerImg.length-1;
        }
        bannerImg[next].style.left=-w+'px';
        animate(bannerImg[now],{left:w});
        animate(bannerImg[next],{left:0},function () {
            flag=true
        });
        for (let j=0;j<point1.length;j++){
            point1[j].style.background=""
        }
        point1[next].style.background="#12b7de";
        now=next;
    };
    //自动轮播
    let t=setInterval(right.onclick,3000);
    let neckBox=document.querySelector(".neck>.box1");
    //鼠标移入轮播暂停
    neckBox.onmouseenter=function (){
        clearInterval(t);
    };
    //鼠标移出轮播继续
    neckBox.onmouseleave=function (){
        t=setInterval(right.onclick,3000);
    };

    //按需加载,懒加载
    let H=window.innerHeight;
    let imgs=document.querySelectorAll(".lazy");
    let Position=[];
    imgs.forEach(function (a) {
        let parentH=a.offsetParent;
        Position.push(parentH.offsetTop + a.offsetTop);
    });
    // console.log(Position);
    window.onscroll=function () {
        let scrollTop=document.documentElement.scrollTop;
        // console.log(scrollTop);
        for (let i=0;i<Position.length;i++){
            if (scrollTop+H>=Position[i]){
                if (!imgs[i].src){
                    imgs[i].src=imgs[i].getAttribute("aa");
                    console.log('none');
                }
            }
        }
    }
};