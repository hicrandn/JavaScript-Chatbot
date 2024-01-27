var data= {
    chatinit:{
        title: ["Merhaba  <span class='emoji'> &#128075;</span>","Ben Derintec dijital asistanıyım.","Size nasıl yardımcı olabilirim?"],
        options: ["Donanim ve Teknik Hizmetler","E-Posta Hizmetleri","Ağ Kurulumu "]
    },
    donanim: {
        title:["Talebin EBYS veya BYS Kanalı ile İletmeye Başla",
        "Talebin karşılanması uygun mu / mümkün mü?"],
        options:['EVET','HAYIR'],
        url : {
            
        }
    },
    
    e_posta: {
        title:[""],
        options:[""],
        url : {
            more:"",
            link:[""]
        }
    },
    ag: {
        title:[""],
        options:[''],
        url : {
            
        }
    },
    
    evet: {
        title: ["İlgili Teknik Personele Yönlendir","Garanti veya bakım sözleşmesi var mı?"],
        options: ["Garanti sözleşmesi var  ", "Bakim garanti sözleşmesi yok"],
        url: {
            
        }
    },
    garanti: {
        title: ["Servis Çağırabilirsiniz."],
        options: ["Servis Çağır"],
        url: {
            more:"",
            link:["#","#","#","#"]
            
        }
    },
    bakim: {
        title: ["Teknik Personel ile Sorunu Çözebilirsiniz.","İşlemin tamamlanması ile birlikte EBYS/BYS kanalı üzerinden birime/kullanıcıya bilgi verilir."],
        options: ["Ana Menüye Dönebilirsiniz"],
        url: {
            more:"http://derinteknoloji.com.tr/",
            link:["#","#","#","#"]
            
        }
    },
    hayir: {
        title: ["Talebi Reddet"],
        options: [" Reddet"],
        url: {
        }
    },

    
}

document.getElementById("init").addEventListener("click",showChatBot);
var cbot= document.getElementById("chat-box");

var len1= data.chatinit.title.length;

function showChatBot(){
    console.log(this.innerText);
    if(this.innerText=='DİJİTAL ASİSTAN'){
        document.getElementById('test').style.display='block';
        document.getElementById('init').innerText='SOHBETİ BİTİR';
        initChat();
    }
    else{
        location.reload();
    }
}

function initChat(){
    j=0;
    cbot.innerHTML='';
    for(var i=0;i<len1;i++){
        setTimeout(handleChat,(i*500));
    }
    setTimeout(function(){
        showOptions(data.chatinit.options)
    },((len1+1)*500))
}

var j=0;
function handleChat(){
    console.log(j);
    var elm= document.createElement("p");
    elm.innerHTML= data.chatinit.title[j];
    elm.setAttribute("class","msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function showOptions(options){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<div>'+options[i]+'</div>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

function handleOpt(){
    console.log(this);
    var str= this.innerText;
    var textArr= str.split(" ");
    var findText= textArr[0];
    
    document.querySelectorAll(".opt").forEach(el=>{
        el.remove();
    })
    var elm= document.createElement("p");
    elm.setAttribute("class","test");
    var sp= '<span class="rep">'+this.innerText+'</span>';
    elm.innerHTML= sp;
    cbot.appendChild(elm);

    console.log(findText.toLowerCase());
    var tempObj= data[findText.toLowerCase()];
    handleResults(tempObj.title,tempObj.options,tempObj.url);
}

function handleDelay(title){
    var elm= document.createElement("p");
        elm.innerHTML= title;
        elm.setAttribute("class","msg");
        cbot.appendChild(elm);
}


function handleResults(title,options,url){
    for(let i=0;i<title.length;i++){
        setTimeout(function(){
            handleDelay(title[i]);
        },i*500)
        
    }

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    if(isObjectEmpty(url)==true){
        console.log("having more options");
        setTimeout(function(){
            showOptions(options);
        },title.length*500)
        
    }
    else{
        console.log("end result");
        setTimeout(function(){
            handleOptions(options,url);
        },title.length*500)
        
    }
}

function handleOptions(options,url){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<a class="m-link" href="'+url.link[i]+'">'+options[i]+'</a>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        cbot.appendChild(opt);
    }
    var opt= document.createElement("span");
    var inp= '<a class="m-link" href="'+url.more+'">'+'Daha fazla</a>';

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    console.log(isObjectEmpty(url));
    console.log(url);
    opt.innerHTML=inp;
    opt.setAttribute("class","opt link");
    cbot.appendChild(opt);
    handleScroll();
}

function handleScroll(){
    var elem= document.getElementById('chat-box');
    elem.scrollTop= elem.scrollHeight;
}