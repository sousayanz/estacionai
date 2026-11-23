const screens=[["login","Entrar"],["verificar","Verificar e-mail"],["busca","Busca"],["detalhe","Detalhe"],["checkout","Checkout"],["vagas","Minhas vagas"],["anunciar","Anunciar"],["chat","Negócios"],["conversa","Conversa"]];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$("#nav").innerHTML=screens.map(([id,l])=>`<a href="#${id}" data-n="${id}">${l}</a>`).join("");
$("#navToggle").addEventListener("click",()=>{const nav=$("#nav"),b=$("#navToggle"),hide=!nav.hidden;
 nav.hidden=hide;b.classList.toggle("off",hide);b.textContent=hide?"⌄":"⌃";b.setAttribute("aria-expanded",String(!hide));
 b.setAttribute("aria-label",hide?"Mostrar barra de navegação":"Ocultar barra de navegação")});
function show(){let h=location.hash.slice(1);if(!screens.some(s=>s[0]===h))h="login";
 $$(".screen").forEach(s=>s.classList.toggle("on",s.id===h));
 $$("#nav a").forEach(a=>a.classList.toggle("on",a.dataset.n===h));scrollTo(0,0)}
addEventListener("hashchange",show);show();
let tt;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),2200)}
document.addEventListener("click",e=>{const el=e.target.closest("[data-go],[data-toast]");if(!el)return;
 if(el.dataset.toast)toast(el.dataset.toast);if(el.dataset.go)location.hash=el.dataset.go});
// OTP
$("#otp").innerHTML=Array.from({length:6},(_,i)=>`<input inputmode="numeric" maxlength="1" aria-label="Dígito ${i+1}">`).join("");
$$("#otp input").forEach((x,i,a)=>x.addEventListener("input",()=>{if(x.value&&a[i+1])a[i+1].focus()}));
// olho
document.querySelector("[data-eye]").addEventListener("click",e=>{const i=e.target.closest("label").querySelector("input");i.type=i.type==="password"?"text":"password"});
// favorito
$("#heart").addEventListener("click",e=>{const b=e.currentTarget,on=b.textContent==="♡";b.textContent=on?"♥":"♡";b.style.color=on?"var(--coral)":"";toast(on?"Adicionado aos favoritos":"Removido dos favoritos")});
// mapa SVG
function mapSVG(){return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#e6ebf2"/><rect x="250" y="60" width="70" height="50" rx="6" fill="#cfe5cf"/><g stroke="#aab6d6" stroke-width="7" fill="none" stroke-linecap="round"><path d="M-10 90L410 200M60 -10L240 310M-10 220L410 60M300 -10L180 310"/></g><g stroke="#c3cce3" stroke-width="3" fill="none"><path d="M0 40h400M0 150h400M0 260h400M110 0v300M330 0v300"/></g></svg>`}
$("#map").insertAdjacentHTML("afterbegin",mapSVG());$("#lmap").insertAdjacentHTML("afterbegin",mapSVG());
[[24,22],[38,16],[52,16],[46,30],[34,42],[33,52],[42,62],[54,40],[76,66]].forEach(([x,y])=>$("#map").insertAdjacentHTML("beforeend",`<div class="pin" style="left:${x}%;top:${y}%"></div>`));
// calendário
const M=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const now=new Date();let cy=now.getFullYear(),cm=now.getMonth(),selD=now.getDate()+1,selT="14:00 - 16:00";
function cal(){$("#monLbl").textContent=`${M[cm]} ${cy}`;let h="DSTQQSS".split("").map(d=>`<div class="w">${d}</div>`).join("");
 const first=new Date(cy,cm,1).getDay(),n=new Date(cy,cm+1,0).getDate();
 for(let i=0;i<first;i++)h+="<div></div>";
 for(let d=1;d<=n;d++){const past=cy===now.getFullYear()&&cm===now.getMonth()&&d<now.getDate();
  h+=`<button type="button" class="${past?"mute":d===selD?"sel":""}" data-d="${d}" ${past?"disabled":""}>${d}</button>`}
 $("#cal").innerHTML=h}
$("#cal").addEventListener("click",e=>{const b=e.target.closest("[data-d]");if(!b)return;selD=+b.dataset.d;cal();sync()});
$("#prev").onclick=()=>{cm--;if(cm<0){cm=11;cy--}cal()};$("#next").onclick=()=>{cm++;if(cm>11){cm=0;cy++}cal()};
const T=["08:00 - 10:00","10:00 - 12:00","14:00 - 16:00","16:00 - 18:00","18:00 - 20:00"];
function slots(){$("#slots").innerHTML=T.map(t=>`<button type="button" class="slot ${t===selT?"sel":""}" data-t="${t}">${t}${t===selT?" ✓":""}</button>`).join("")}
$("#slots").addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(!b)return;selT=b.dataset.t;slots();sync()});
function sync(){$("#ckDate").textContent=new Date(cy,cm,selD).toLocaleDateString("pt-BR",{weekday:"short",day:"numeric",month:"short",year:"numeric"});$("#ckTime").textContent=selT.replace(" - ","–")}
cal();slots();sync();
// pagamento
$$(".pay").forEach(b=>b.addEventListener("click",()=>{$$(".pay").forEach(x=>{x.classList.remove("sel");x.querySelector(".ck").textContent=""});b.classList.add("sel");b.querySelector(".ck").textContent="✓";$("#payBtn").textContent=b.dataset.pay==="Pix"?"Pagar com Pix":"Pagar com cartão"}));
// abas e toggles
$$("#tabs button").forEach(b=>b.addEventListener("click",()=>{$$("#tabs button").forEach(x=>x.classList.toggle("on",x===b));$("#t1").hidden=b.dataset.t!=="t1";$("#t2").hidden=b.dataset.t!=="t2"}));
$$(".sw").forEach(s=>s.addEventListener("click",()=>s.classList.toggle("on")));
