const screens = [...document.querySelectorAll(".screen")];
const progress = document.getElementById("progress");
let current = 0;

screens.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = "dot" + (i === 0 ? " active" : "");
  progress.appendChild(dot);
});

function show(index){
  current = Math.max(0, Math.min(index, screens.length - 1));
  screens.forEach((screen,i)=>screen.classList.toggle("active",i===current));
  [...progress.children].forEach((dot,i)=>dot.classList.toggle("active",i===current));
  if(current === 6) burstHearts(16);
}

document.getElementById("startBtn").addEventListener("click",()=>show(1));
document.querySelectorAll(".next").forEach(btn=>btn.addEventListener("click",()=>show(current+1)));

document.querySelectorAll(".choice").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const choice = btn.dataset.choice;
    if(choice === "yes"){
      burstHearts(12);
      show(6);
    }else{
      show(5);
    }
  });
});

document.getElementById("replayBtn").addEventListener("click",()=>{
  show(0);
});

function burstHearts(amount){
  const holder=document.getElementById("hearts");
  const symbols=["💗","💖","💕","✨","🤍"];
  for(let i=0;i<amount;i++){
    const el=document.createElement("span");
    el.className="heart";
    el.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    el.style.left=(15+Math.random()*70)+"%";
    el.style.top=(52+Math.random()*22)+"%";
    el.style.animationDelay=(Math.random()*.35)+"s";
    el.style.fontSize=(14+Math.random()*18)+"px";
    holder.appendChild(el);
    setTimeout(()=>el.remove(),2800);
  }
}

// Keyboard support
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight" && current<6) show(current+1);
  if(e.key==="ArrowLeft" && current>0) show(current-1);
});
