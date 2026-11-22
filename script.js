
const $=i=>document.getElementById(i),R=a=>a[Math.random()*a.length|0];
const NM="Hinata Sakura Yuki Rin Mio Akane Haruka Misaki Asuka Rei Kaede Natsuki Shiori Ayame Minami Chiyo Kasumi Nanami Himari Ichika Mei Sora Tsubaki Aoi Koharu Mizuki Ritsu Yui Azusa Mikoto Nagisa Hotaru Ran Suzu Tomoe Fuyu Hana Kirika Madoka Shizuku Kanna Rika Emi Noa Saya Tomomi Yuzuki Miyu Chihiro Reina Sumire Airi Honoka Kotori Maki Nozomi Umi Hanayo Karin Ayumi Setsuna Shino Kyoko Mikan Yoshino Ami Minori Tsukasa Ayaka Nene Momoka Yuna Ibuki Akari Sayaka Mayu Fumiko Hikari Kanade Ena Riko Sana Chika Haru Nao Mana Kokoro Itsuki Midori Toko Sachiko Rina Yume Hiyori Kaoru Ruka Mitsuki Tamaki Ayano Shion Naoko Satsuki Ririka Hazuki Kiriko Mahiro Sena Yukino Tsugumi Wakana Misora Eri Arisa Fubuki Yayoi Hibiki Otoha Sumika Runa Reiko".split(" ");
const BOTS=NM.map((n,i)=>({n,i,e:Math.round(100+i*2900/(NM.length-1))}));
const TT=["Novata torpe","Aprendiz orgullosa","Rival de barrio","Club escolar","Capitana del club","Prodigio arrogante","Maestra altiva","Reina tsundere"];
const tt=e=>TT[Math.min(7,e/400|0)],fc=e=>e<700?"🥺":e<1300?"😳":e<2000?"😤":e<2600?"😠":"😈";
const L={
intro:["¡N-no es que quiera jugar contigo ni nada!","Hmph... no pierdas mi tiempo, ¿sí?","¡No te hagas ilusiones, baka!","¿Quieres jugar conmigo...? ¡N-no estoy contenta!","Más te vale no llorar cuando pierdas, tonto."],
mv:["Hmph.","Tsk... ¡es obvio!","No es que me importe tu juego...","¿Eso es todo lo que tienes?","¡No me mires tanto, baka!","Mi jugada... ¡no es para impresionarte!"],
cap:["¡Ja! Esa pieza estorbaba... ¡no lo hice por ti!","¡Toma eso, baka!","Te la quité. L-lo siento... ¡no! ¡No lo siento!"],
chk:["¡Jaque! ¡Cuidado, baka!","¡Tu rey está en peligro! ¡N-no es que me preocupe!"],
win:["¡JAQUE MATE! ¡B-BAKA! ¡No es que quisiera ganarte...!","¡Jaque mate, baka! ¡No te pongas triste... n-no digo eso por ti!"],
lose:["¡B-BAKA!! ¡S-solo te dejé ganar...!","¡N-no es justo! ¡Revancha ahora mismo!","Hmph... ¡no creas que eres mejor que yo, baka!"],
mine:["¿¡Eh!? ¡Mi pieza...! ¡Baka!","¡N-no era importante! ¡Tonto!"],
mychk:["¡N-no me asustas con ese jaque!","¡Tsk! ¿Un jaque? ¡Solo suerte!"],
draw:["Tablas... ¡no cuenta como perder, baka!"]};
/* ---------- sonido ---------- */
let mute=0,ac;
function tone(a){if(mute)return;try{ac=ac||new AudioContext();a.forEach((f,i)=>{const o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime+i*.13;o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(.18,t);g.gain.exponentialRampToValueAtTime(.001,t+.12);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+.13)})}catch(e){}}
function say(t,p=1.9){if(mute)return;try{const u=new SpeechSynthesisUtterance(t);u.lang="ja-JP";u.pitch=p;u.rate=1.05;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
/* ---------- motor (0x88) ---------- */
const N=[-33,-31,-18,-14,14,18,31,33],K=[-17,-16,-15,-1,1,15,16,17],BD=[-17,-15,15,17],RD=[-16,-1,1,16],V=[0,100,320,330,500,900,0];
let b=new Int8Array(128),side=1,cr=15,ep=-1,ks=[4,116],nodes=0,dl=0;
function init(){b.fill(0);const k=[4,2,3,5,6,3,2,4];for(let i=0;i<8;i++){b[i]=k[i];b[16+i]=1;b[96+i]=-1;b[112+i]=-k[i]}side=1;cr=15;ep=-1;ks=[4,116]}
function att(q,y){let t;
for(const d of N){t=q+d;if(!(t&136)&&b[t]==2*y)return 1}
for(const d of K){t=q+d;if(!(t&136)&&b[t]==6*y)return 1}
for(const e of[15,17]){t=q-e*y;if(!(t&136)&&b[t]==y)return 1}
for(const d of BD){t=q+d;while(!(t&136)){if(b[t]){if(b[t]==3*y||b[t]==5*y)return 1;break}t+=d}}
for(const d of RD){t=q+d;while(!(t&136)){if(b[t]){if(b[t]==4*y||b[t]==5*y)return 1;break}t+=d}}
return 0}
function gen(co){const L=[],s=side,add=(f,t,x)=>{if(co&&!b[t]&&x<1)return;L.push(f|t<<8|x<<16)};
for(let f=0;f<128;f++){if(f&136){f+=7;continue}const p=b[f];if(!p||p*s<0)continue;const a=p*s;
if(a==1){const d=16*s,pr=((f+d)>>4)==(s>0?7:0)?1:0;let t=f+d;
if(!b[t]){add(f,t,pr);if((f>>4)==(s>0?1:6)&&!b[t+d])add(f,t+d,0)}
for(const e of[d-1,d+1]){t=f+e;if(t&136)continue;if(b[t]*s<0)add(f,t,pr);else if(t==ep)add(f,t,2)}}
else if(a==2||a==6){for(const d of a==2?N:K){const t=f+d;if(!(t&136)&&b[t]*s<=0)add(f,t,0)}
if(a==6&&!co){const o=s>0?0:112,r=s>0?1:4;if(f==o+4&&!att(f,-s)){
if((cr&r)&&!b[o+5]&&!b[o+6]&&!att(o+5,-s))add(f,o+6,3);
if((cr&r*2)&&!b[o+3]&&!b[o+2]&&!b[o+1]&&!att(o+3,-s))add(f,o+2,3)}}}
else{for(const d of a==3?BD:a==4?RD:BD.concat(RD)){let t=f+d;while(!(t&136)){if(b[t]*s>0)break;add(f,t,0);if(b[t])break;t+=d}}}}
return L}
function make(m){const f=m&255,t=(m>>8)&255,x=m>>16,s=side,p=b[f],u={m,p,c:b[t],cr,ep,cp:0};
b[t]=p;b[f]=0;
if(x==1)b[t]=5*s;
if(x==2){u.cp=t-16*s;u.c=b[u.cp];b[u.cp]=0}
if(x==3){if(t>f){b[t-1]=b[t+1];b[t+1]=0}else{b[t+1]=b[t-2];b[t-2]=0}}
ep=(Math.abs(p)==1&&Math.abs(t-f)==32)?(f+t)/2:-1;
if(Math.abs(p)==6){ks[s>0?0:1]=t;cr&=s>0?12:3}
for(const q of[f,t]){if(q==0)cr&=~2;if(q==7)cr&=~1;if(q==112)cr&=~8;if(q==119)cr&=~4}
side=-s;return u}
function unmake(u){side=-side;const s=side,f=u.m&255,t=(u.m>>8)&255,x=u.m>>16;
b[f]=u.p;b[t]=x==2?0:u.c;if(x==2)b[u.cp]=u.c;
if(x==3){if(t>f){b[t+1]=b[t-1];b[t-1]=0}else{b[t-2]=b[t+1];b[t+1]=0}}
if(Math.abs(u.p)==6)ks[s>0?0:1]=f;
cr=u.cr;ep=u.ep}
function mk(m){const u=make(m);if(att(ks[side>0?1:0],side)){unmake(u);return 0}return u}
const sc=m=>{const t=(m>>8)&255;return(b[t]?Math.abs(b[t])*10-Math.abs(b[m&255]):0)+((m>>16)==1?50:0)};
const legal=()=>gen().filter(m=>{const u=mk(m);if(!u)return 0;unmake(u);return 1});
function ev(){let s=0;for(let f=0;f<128;f++){if(f&136){f+=7;continue}const p=b[f];if(!p)continue;
const a=p>0?p:-p,x=f&7,y=f>>4,c=7-(Math.abs(2*x-7)+Math.abs(2*y-7))/2;
let v=V[a]+(a==1?c*2+(p>0?y-1:6-y)*5:a==2||a==3?c*4:a==5?c:0);s+=p>0?v:-v}
return side*s}
function Q(al,be,d){if(!(++nodes&1023)&&Date.now()>dl)throw 1;const s=ev();if(s>=be)return be;if(s>al)al=s;if(d<=0)return al;
for(const m of gen(1).sort((x,y)=>sc(y)-sc(x))){const u=mk(m);if(!u)continue;const v=-Q(-be,-al,d-1);unmake(u);if(v>=be)return be;if(v>al)al=v}return al}
function S(d,al,be){if(d<=0)return Q(al,be,4);if(!(++nodes&1023)&&Date.now()>dl)throw 1;let any=0;
for(const m of gen().sort((x,y)=>sc(y)-sc(x))){const u=mk(m);if(!u)continue;any=1;const v=-S(d-1,-be,-al);unmake(u);if(v>=be)return be;if(v>al)al=v}
if(!any)return att(ks[side>0?0:1],-side)?-9e4-d:0;return al}
function pick(){const e=bot.e,ms=legal();if(ms.length<2)return ms[0];
if(e<800&&Math.random()<(800-e)/1400)return R(ms);
const mx=e<900?1:e<1700?2:e<2300?3:4,nz=Math.max(0,2800-e)*.18,sb=b.slice(),ss=side,sc0=cr,se=ep,sk=ks.slice();
dl=Date.now()+(e>=2300?3000:1500);nodes=0;let res=null;
try{for(let d=1;d<=mx;d++){const r=[];for(const m of ms){const u=mk(m);r.push([-S(d-1,-1e9,1e9),m]);unmake(u)}res=r}}
catch(x){b.set(sb);side=ss;cr=sc0;ep=se;ks=sk}
if(!res)return R(ms);
let best=res[0][1],bv=-1e9;for(const[v,m]of res){const w=v+Math.random()*(nz+3);if(w>bv){bv=w;best=m}}return best}
/* ---------- interfaz + progreso local ---------- */
const G=['','♟','♞','♝','♜','♛','♚'].map(x=>x&&x+'\uFE0E');
L.back=["¿Volviste...? ¡N-no te estaba esperando, baka!","¡Tardaste mucho! Sigamos la partida, tonto."];
const KEY="tsundere-chess-v1";
let P={bot:40,me:1,mute:0,moves:[],stats:{}};
try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&typeof d=="object")Object.assign(P,d)}catch(e){}
if(!P.stats||typeof P.stats!="object")P.stats={};
let bot=BOTS[P.bot]||BOTS[40],me=P.me<0?-1:1,hist=[],mvs=[],last=0,over=0,busy=0,selq=-1,tg={},gid=0;
mute=P.mute?1:0;
const sqs=[],sn=s=>"abcdefgh"[s&7]+((s>>4)+1);
const sqOf=i=>{const r=i>>3,c=i&7;return me<0?r*16+7-c:(7-r)*16+c};
function save(){try{localStorage.setItem(KEY,JSON.stringify({bot:bot.i,me,mute:+mute,moves:hist.map(u=>u.m),stats:P.stats}))}catch(e){}}
function rec(r){const s=P.stats[bot.i]=P.stats[bot.i]||[0,0,0];s[r]++}
function refreshStats(){let w=0;BOTS.forEach(B=>{const s=P.stats[B.i]||[0,0,0];if(s[0])w++;B.el.querySelector("small").textContent=`${B.e} · ${tt(B.e)}${s[0]?" · ✓":""}`});
$("won").textContent=`Vencidas: ${w}/${BOTS.length}`;const s=P.stats[bot.i]||[0,0,0];
$("el").textContent=`Elo ${bot.e} · ${tt(bot.e)} · Tú: ${s[0]}G ${s[1]}P ${s[2]}T`}
for(let i=0;i<64;i++){const e=document.createElement("div");e.onclick=()=>click(sqOf(i));sqs.push(e);$("bd").append(e)}
function talk(t){$("bub").textContent=t}
function st(t){$("st").textContent=t}
function render(){const ck=!over&&att(ks[side>0?0:1],-side)?ks[side>0?0:1]:-1;
sqs.forEach((e,i)=>{const s=sqOf(i),p=b[s],T=tg[s];
e.className="sq "+(((s>>4)+(s&7))&1?"lt":"dk")+(s==selq?" sel":"")+(T?(b[s]||T>>16==2?" mv cap":" mv"):"")+(last&&(s==(last&255)||s==((last>>8)&255))?" last":"")+(s==ck?" chk":"");
e.innerHTML=p?`<b class="p ${p>0?"w":"k"}">${G[Math.abs(p)]}</b>`:""});
$("mv").textContent=mvs.join("  ");$("mv").scrollTop=1e5}
function setBot(){$("face").textContent=fc(bot.e);$("nm").textContent=bot.n;
BOTS.forEach(B=>B.el.classList.toggle("on",B==bot));refreshStats();
const l=$("list");l.scrollTop=bot.el.offsetTop-l.offsetTop-l.clientHeight/2}
function reset(){gid++;init();hist=[];mvs=[];last=0;over=0;busy=0;selq=-1;tg={};setBot()}
function newGame(){reset();talk(R(L.intro));st(me>0?"Tu turno (blancas)":"Juegas con negras");render();save();if(me<0)botTurn()}
function click(s){if(over||busy||side!=me)return;if(tg[s]){play(tg[s]);return}
if(b[s]*me>0){selq=s;tg={};for(const m of legal())if((m&255)==s)tg[(m>>8)&255]=m}else{selq=-1;tg={}}render()}
function apply(m){const f=m&255,t=(m>>8)&255,cap=!!(b[t]||m>>16==2);mvs.push(sn(f)+(cap?"x":"-")+sn(t));hist.push(make(m));last=m;selq=-1;tg={};return cap}
function play(m){const mover=side,cap=apply(m);finish(mover,cap,1)}
function finish(mover,cap,fresh){const ck=att(ks[side>0?0:1],-side),any=legal().length,bm=mover!=me;
let n=0;for(let i=0;i<128;i++)if(!(i&136)&&b[i])n++;
if(!any||n==2||hist.length>300){over=1;
if(any||!ck){if(fresh)rec(2);st(any&&n!=2?"Tablas por límite de jugadas":"Tablas");talk(R(L.draw))}
else{if(fresh){tone([988,784,659,523]);say(bm?"バカ！":"バカ！バカ！");rec(bm?1:0)}
st(bm?`Jaque mate · ganó ${bot.n} 💢`:`Jaque mate · ¡ganaste a ${bot.n}!`);talk(R(bm?L.win:L.lose))}
refreshStats()}
else if(fresh){if(ck){tone([784,659]);say("ふんっ！",1.6)}
if(bm){talk(ck?R(L.chk):cap?R(L.cap):R(L.mv));st(ck?"¡Jaque! Tu turno":"Tu turno")}
else{if(ck)talk(R(L.mychk));else if(cap)talk(R(L.mine));st(ck?"Jaque a tu rival":"Turno de "+bot.n)}}
else st(side==me?"Tu turno":"Turno de "+bot.n);
render();save();if(!over&&side!=me)botTurn()}
function botTurn(){busy=1;const g=gid;st(`${bot.n} está pensando… 💭`);
setTimeout(()=>{if(g!=gid)return;const m=pick();busy=0;play(m)},80)}
function resume(){reset();const ms=Array.isArray(P.moves)?P.moves:[];let ok=ms.length>0,mover=1,cap=0;
for(const m of ms){if(!Number.isInteger(m)||!legal().includes(m)){ok=false;break}mover=side;cap=apply(m)}
if(!ok){newGame();return}
talk(R(L.back));finish(mover,cap,0)}
/* lista de bots */
BOTS.forEach(B=>{const d=document.createElement("button");d.className="bc";
d.innerHTML=`<span class="av" style="background:hsl(${B.i*3},80%,80%)">${fc(B.e)}</span><span><b>${B.n}</b><small></small></span>`;
d.onclick=()=>{bot=B;newGame()};B.el=d;$("list").append(d)});
$("q").oninput=e=>{const v=e.target.value.toLowerCase().trim();BOTS.forEach(B=>B.el.hidden=!(B.n.toLowerCase().includes(v)||String(B.e).includes(v)))};
const near=v=>BOTS[Math.round((v-100)*(BOTS.length-1)/2900)];
$("rg").oninput=e=>{const B=near(+e.target.value);$("rl").textContent=`Elo ${e.target.value} → ${B.n} (${B.e})`};
$("rg").onchange=e=>{bot=near(+e.target.value);newGame()};
$("nw").onclick=newGame;
const fpT=()=>$("fp").textContent=me>0?"Jugar con negras":"Jugar con blancas";
$("fp").onclick=()=>{me=-me;fpT();newGame()};
$("un").onclick=()=>{if(busy||over||!hist.length)return;do{unmake(hist.pop());mvs.pop()}while(hist.length&&side!=me);
selq=-1;tg={};last=hist.length?hist[hist.length-1].m:0;st("Tu turno");render();save();if(side!=me)botTurn()};
const muT=()=>$("mu").textContent=mute?"🔇 Sin sonido":"🔊 Sonido";
$("mu").onclick=()=>{mute=!mute;muT();save();if(mute)try{speechSynthesis.cancel()}catch(e){}};
$("rs").onclick=()=>{if(!confirm("¿Borrar todo el progreso guardado?"))return;P.stats={};try{localStorage.removeItem(KEY)}catch(e){}
bot=BOTS[40];me=1;fpT();newGame()};
fpT();muT();resume();
