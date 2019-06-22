window.onload=function () {
    let head=document.querySelectorAll('.head>img');
    let preHead=0;
    for (let i=0;i<head.length;i++){
        head[i].onclick=function () {
            head[preHead].style.opacity='0.6';
            this.style.opacity='1';
            preHead=i;
        }
    }
    let textarea=document.querySelector("textarea");
    let span=document.querySelector("#num");
    textarea.onkeyup=function(){
        let num=this.value;
        span.innerHTML=num.length;
    };
    let forms=document.querySelector("form");
    console.dir(forms);
    let submit=document.querySelector("p>a");
    let ul=document.querySelector(".content");
    console.log(submit);
    let text=document.querySelector("p>input[type=text]");
    console.log(text);
    // console.log(ul);
    submit.onclick=function (e) {
        let image=head[preHead].src;
        let value=textarea.value;
        let name=text.value;
        let date=new Date().toLocaleDateString();
        e.preventDefault();
        let conHtml=`<li>
                                <img src="${image}" alt="">    
                                <div class="conBox">
                                <div>
                                    <p class="name">${name}</p>
                                    <p class="time">${date}</p>
                                </div>      
                                <p class="con">${value}</p>  
                                </div>   
                           </li>`;
        ul.innerHTML=conHtml+ul.innerHTML;
        res();
        return false;
    };
    function res() {
        forms.reset();
        head[preHead].style.opacity='0.6';
        preHead=0;
        span.innerHTML=''
    }
};