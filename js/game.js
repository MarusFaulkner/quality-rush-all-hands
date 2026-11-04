/*! Quality Rush: All Hands — © 2026 Marcus Faulkner. Plain JS, no build step. */
// Art lives in assets/. Parts are drawn as SVG in code.
const ASSETS = {
  bg: "assets/bg.webp",
  end_down: "assets/end_down.webp",
  end_win: "assets/end_win.webp",
  logo: "assets/logo.webp",
  maya_dive: "assets/maya_dive.webp",
  maya_face_celebrate: "assets/maya_face_celebrate.webp",
  maya_face_confident: "assets/maya_face_confident.webp",
  maya_face_determined: "assets/maya_face_determined.webp",
  maya_face_frustrated: "assets/maya_face_frustrated.webp",
  maya_face_happy: "assets/maya_face_happy.webp",
  maya_face_surprised: "assets/maya_face_surprised.webp",
  maya_idle: "assets/maya_idle.webp",
  maya_run0: "assets/maya_run0.webp",
  maya_run1: "assets/maya_run1.webp",
  maya_run2: "assets/maya_run2.webp",
  mike_face_confident: "assets/mike_face_confident.webp",
  mike_face_determined: "assets/mike_face_determined.webp",
  mike_face_frustrated: "assets/mike_face_frustrated.webp",
  mike_face_happy: "assets/mike_face_happy.webp",
  mike_face_surprised: "assets/mike_face_surprised.webp",
  mike_idle: "assets/mike_idle.webp",
  mike_repair: "assets/mike_repair.webp",
  mike_run1: "assets/mike_run1.webp",
  mike_run2: "assets/mike_run2.webp",
  mike_t_lock: "assets/mike_t_lock.webp",
  mq_face_confident: "assets/mq_face_confident.webp",
  mq_face_determined: "assets/mq_face_determined.webp",
  mq_face_frustrated: "assets/mq_face_frustrated.webp",
  mq_face_happy: "assets/mq_face_happy.webp",
  mq_face_serious: "assets/mq_face_serious.webp",
  mq_face_surprised: "assets/mq_face_surprised.webp",
  mq_face_thinking: "assets/mq_face_thinking.webp",
  mq_idle: "assets/mq_idle.webp",
  mq_run1: "assets/mq_run1.webp",
  mq_run2: "assets/mq_run2.webp",
  mq_tag: "assets/mq_tag.webp",
  mq_throw: "assets/mq_throw.webp"
};

const DEFECTS = {
  missing:  {name:"Missing fastener", tier:0, lesson:"An empty bolt hole means the joint can loosen under load. Count every fastener."},
  scratch:  {name:"Surface scratch",  tier:0, lesson:"A scratch across a sealing face becomes a leak path."},
  contam:   {name:"Contamination",    tier:0, lesson:"Oil and chips cause bad coatings, seal damage and downstream failures."},
  wrongpart:{name:"Wrong component",  tier:1, lesson:"A brass bushing where the BOM calls for steel. Verify components, not just presence."},
  misalign: {name:"Misaligned bore",  tier:1, lesson:"An off-center bore won't line up with its mating part. Check geometry, not just surfaces."},
  crack:    {name:"Hairline crack",   tier:2, lesson:"Cracks grow. Hairline today, field failure tomorrow. Watch the bore edge."},
  chipped:  {name:"Chipped tooth",    tier:1, lesson:"A chipped gear tooth means noise, vibration and a failed gearbox. Inspect every tooth."},
};

/* Housing art (shared with Quality Quest), built as standalone SVG images */
const SVGDEFS = `<defs><linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef2f6"/><stop offset=".45" stop-color="#b6c1cd"/><stop offset="1" stop-color="#7d8b9b"/></linearGradient>
<radialGradient id="boreg" cx="50%" cy="45%"><stop offset="0" stop-color="#05090f"/><stop offset=".75" stop-color="#1c2836"/><stop offset="1" stop-color="#53657a"/></radialGradient>
<radialGradient id="bolt" cx="38%" cy="35%"><stop offset="0" stop-color="#f5f7f9"/><stop offset="1" stop-color="#6b7a8c"/></radialGradient>
<radialGradient id="brass" cx="38%" cy="35%"><stop offset="0" stop-color="#ffe6a0"/><stop offset="1" stop-color="#a3711f"/></radialGradient></defs>`;
function housingSVG(defect, seed=0){
  const o=[], bx=defect==="misalign"?58:50, by=defect==="misalign"?43:50;
  o.push(`<rect x="6" y="6" width="88" height="88" rx="12" fill="url(#steel)" stroke="#4d5c6d" stroke-width="2"/>`);
  o.push(`<rect x="12" y="12" width="76" height="76" rx="8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.2"/>`);
  o.push(`<circle cx="50" cy="50" r="30" fill="none" stroke="rgba(80,95,112,.25)" stroke-width="0.8"/>`);
  o.push(`<circle cx="${bx}" cy="${by}" r="19" fill="#8c99a8"/>`);
  if(defect==="wrongpart") o.push(`<circle cx="${bx}" cy="${by}" r="17" fill="url(#brass)" stroke="#7a5212"/>`);
  o.push(`<circle cx="${bx}" cy="${by}" r="${defect==="wrongpart"?12:15}" fill="url(#boreg)"/>`);
  const pos=[[20,20],[80,20],[20,80],[80,80]], miss=defect==="missing"?(seed%4):-1;
  pos.forEach(([x,y],k)=>{
    if(k===miss){ o.push(`<circle cx="${x}" cy="${y}" r="6.5" fill="#0b121b" stroke="#5a6e86" stroke-width="1.5"/>`); return; }
    const h=[0,1,2,3,4,5].map(i=>{const a=Math.PI/3*i+Math.PI/6; return `${(x+7*Math.cos(a)).toFixed(1)},${(y+7*Math.sin(a)).toFixed(1)}`}).join(" ");
    o.push(`<polygon points="${h}" fill="url(#bolt)" stroke="#4d5c6d" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.6" fill="#8c99a8"/>`);
  });
  if(defect==="scratch"){ o.push(seed%2?`<path d="M30 64 L72 34" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M30 64 L72 34" stroke="#ff6a6a" stroke-width="1.2"/>`:`<path d="M28 36 Q50 30 70 66" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M28 36 Q50 30 70 66" fill="none" stroke="#ff6a6a" stroke-width="1.2"/>`); }
  if(defect==="contam") o.push(`<path d="M60 64 q8 -6 14 2 q4 8 -6 10 q-10 3 -12 -4 q-2 -5 4 -8z" fill="#3a2a12" opacity=".9"/><path d="M28 60 q3 -4 6 0 q-3 3 -6 0z M34 70 q4 -1 3 4 M24 66 q2 3 6 1" stroke="#d9a63a" stroke-width="2" fill="none"/>`);
  if(defect==="crack") o.push(`<path d="M${bx+14} ${by-9} l6 -4 l3 3 l6 -5 l4 1" fill="none" stroke="#111820" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${SVGDEFS}${o.join("")}</svg>`;
}
const svgURL = s => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);

/* More parts on the line. Each family lists the defects it can carry. */
const FAMILIES={
  housing:{name:"Housing", defects:["missing","scratch","contam","wrongpart","misalign","crack"]},
  flange: {name:"Flange",  defects:["missing","scratch","contam","wrongpart","misalign","crack"]},
  gear:   {name:"Gear",    defects:["chipped","scratch","contam","wrongpart","misalign","crack"]},
  bracket:{name:"Bracket", defects:["missing","scratch","contam","wrongpart","crack"]},
};
const HEX=(x,y,r)=>[0,1,2,3,4,5].map(i=>{const a=Math.PI/3*i+Math.PI/6; return `${(x+r*Math.cos(a)).toFixed(1)},${(y+r*Math.sin(a)).toFixed(1)}`}).join(" ");
const BOLT=(x,y,r=7)=>`<polygon points="${HEX(x,y,r)}" fill="url(#bolt)" stroke="#4d5c6d" stroke-width="1"/><circle cx="${x}" cy="${y}" r="${r*.37}" fill="#8c99a8"/>`;
const HOLE=(x,y,r=6.5)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#0b121b" stroke="#5a6e86" stroke-width="1.5"/>`;
const SCRATCH=seed=>seed%2?`<path d="M30 64 L72 34" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M30 64 L72 34" stroke="#ff6a6a" stroke-width="1.2"/>`:`<path d="M28 36 Q50 30 70 66" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M28 36 Q50 30 70 66" fill="none" stroke="#ff6a6a" stroke-width="1.2"/>`;
const CONTAM=`<path d="M60 64 q8 -6 14 2 q4 8 -6 10 q-10 3 -12 -4 q-2 -5 4 -8z" fill="#3a2a12" opacity=".9"/><path d="M28 60 q3 -4 6 0 q-3 3 -6 0z M34 70 q4 -1 3 4 M24 66 q2 3 6 1" stroke="#d9a63a" stroke-width="2" fill="none"/>`;
const CRACK=(x,y)=>`<path d="M${x} ${y} l6 -4 l3 3 l6 -5 l4 1" fill="none" stroke="#111820" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
function flangeSVG(d,seed){
  const body=d==="wrongpart"?"url(#brass)":"url(#steel)", bx=d==="misalign"?58:50, by=d==="misalign"?43:50, o=[];
  o.push(`<circle cx="50" cy="50" r="45" fill="${body}" stroke="#4d5c6d" stroke-width="2"/><circle cx="50" cy="50" r="39" fill="none" stroke="rgba(255,255,255,.4)"/><circle cx="50" cy="50" r="22" fill="none" stroke="rgba(60,75,92,.35)" stroke-width="1.5"/>`);
  o.push(`<circle cx="${bx}" cy="${by}" r="14" fill="url(#boreg)" stroke="#5a6e86" stroke-width="2"/>`);
  for(let i=0;i<6;i++){ const a=i*Math.PI/3-Math.PI/2, x=+(50+32*Math.cos(a)).toFixed(1), y=+(50+32*Math.sin(a)).toFixed(1);
    o.push(d==="missing"&&i===seed%6?HOLE(x,y,5.5):BOLT(x,y,6)); }
  if(d==="scratch") o.push(SCRATCH(seed)); if(d==="contam") o.push(CONTAM); if(d==="crack") o.push(CRACK(bx+11,by-8));
  return o.join("");
}
function gearSVG(d,seed){
  // chipped tooth: the tooth is gone and the break bites into the rim (dark jagged notch), always on the upper half
  const body=d==="wrongpart"?"url(#brass)":"url(#steel)", bx=d==="misalign"?57:50, by=d==="misalign"?44:50, o=[], N=10, chip=[9,0,1][seed%3];
  for(let i=0;i<N;i++){ if(d==="chipped"&&i===chip) continue;
    o.push(`<rect x="43" y="1.5" width="14" height="16" rx="2" fill="${body}" stroke="#4d5c6d" stroke-width="1.2" transform="rotate(${i*360/N} 50 50)"/>`); }
  o.push(`<circle cx="50" cy="50" r="36" fill="${body}" stroke="#4d5c6d" stroke-width="1.5"/><circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,.35)"/>`);
  if(d==="chipped") o.push(`<path d="M39 13 L42.5 21 L45.5 18 L48.5 25.5 L51.5 19.5 L54.5 24 L57.5 18.5 L61 13 Z" fill="#0b1118" stroke="#ffffff" stroke-width="1.8" stroke-linejoin="round" transform="rotate(${chip*36} 50 50)"/>`);
  for(let i=0;i<4;i++){ const a=i*Math.PI/2+Math.PI/4; o.push(`<circle cx="${(50+21*Math.cos(a)).toFixed(1)}" cy="${(50+21*Math.sin(a)).toFixed(1)}" r="6" fill="#1c2836" stroke="#5a6e86"/>`); }
  o.push(`<circle cx="50" cy="50" r="13" fill="${body}" stroke="#4d5c6d" stroke-width="1.5"/><circle cx="${bx}" cy="${by}" r="7.5" fill="url(#boreg)"/><rect x="${bx-2}" y="${by-10}" width="4" height="4" fill="#0b121b"/>`);
  if(d==="scratch") o.push(SCRATCH(seed)); if(d==="contam") o.push(CONTAM); if(d==="crack") o.push(CRACK(bx+8,by-10));
  return o.join("");
}
function bracketSVG(d,seed){
  const body=d==="wrongpart"?"url(#brass)":"url(#steel)", o=[];
  o.push(`<path d="M12 10 H40 V62 H90 V90 H12 Z" fill="${body}" stroke="#4d5c6d" stroke-width="2" stroke-linejoin="round"/><path d="M18 16 H34 V68 H84 V84 H18 Z" fill="none" stroke="rgba(255,255,255,.4)"/>`);
  const pts=[[26,28],[26,74],[72,76]];
  pts.forEach(([x,y],i)=>o.push(d==="missing"&&i===seed%3?HOLE(x,y,6):BOLT(x,y,7)));
  if(d==="scratch") o.push(`<path d="M18 50 L36 36" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M18 50 L36 36" stroke="#ff6a6a" stroke-width="1.2"/><path d="M46 70 L66 82" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M46 70 L66 82" stroke="#ff6a6a" stroke-width="1.2"/>`);
  if(d==="contam") o.push(`<path d="M52 66 q8 -6 14 2 q4 8 -6 10 q-10 3 -12 -4 q-2 -5 4 -8z" fill="#3a2a12" opacity=".9"/><path d="M20 44 q3 -4 6 0 q-3 3 -6 0z" stroke="#d9a63a" stroke-width="2" fill="none"/>`);
  if(d==="crack") o.push(`<path d="M40 62 l4 5 l-3 4 l5 5 l-1 5" fill="none" stroke="#111820" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`);
  return o.join("");
}
function partSVG(fam,d,seed=0){
  if(fam==="housing") return housingSVG(d,seed);
  const inner={flange:flangeSVG,gear:gearSVG,bracket:bracketSVG}[fam](d,seed);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${SVGDEFS}${inner}</svg>`;
}




/* ===================== Rules ===================== */
const SHIFT=180, RUSH_AT=150, MAX_ESC=3;
const RANKS=["Trainee","Operator","Team Lead","Quality Champion","ALL HANDS ON DECK"];
const W=960, H=540, FEET=505;
const BELT=[238,744], BELT_Y=272;
let U=1, PART=44;   // U: readability boost on small screens (phone held upright). 1 on desktop.        // the conveyor in the background art
const BOX_Y=302, SHIP_X=948; let BW=58, BH=42;        // a roller conveyor from the belt to the truck bed        // boxes roll from the end of the belt to the truck
const ZONES={mike:[40,320], maya:[400,700], mq:[735,925]};   // Maya keeps a gap from Mike so they never overlap
const NAMES={mike:"Mike Maintenance", maya:"Maya Metrology", mq:"Mister Quality"};
const ROLES={mike:"Production · prevention", maya:"Inspection · detection", mq:"Shipping · containment"};

/* ===================== Sound ===================== */
let AC=null, SOUND=true;
function tone(seq,vol=.07){
  if(!SOUND) return;
  try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); let t=AC.currentTime;
    seq.forEach(([f,d,type])=>{ const o=AC.createOscillator(), g=AC.createGain(); o.type=type||"square"; o.frequency.value=f;
      g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(.001,t+d); o.connect(g).connect(AC.destination); o.start(t); o.stop(t+d); t+=d*.8; });
  }catch(e){}
}
const SFX={click:[[700,.04]], tick:[[440,.08]], go:[[880,.18]], swap:[[520,.04],[780,.06]],
  lock:[[1200,.03],[300,.08,"square"],[180,.1,"square"]], ratchet:[[1600,.02,"square"],[1100,.02,"square"]],
  fixed:[[523,.08],[784,.08],[1046,.16]], pm:[[659,.08],[880,.08],[1175,.1],[1568,.18]], alarm:[[880,.12,"square"],[660,.12,"square"]],
  down:[[220,.2,"sawtooth"],[165,.35,"sawtooth"]], pull:[[880,.06],[1320,.1]], wrong:[[260,.22,"sawtooth"]],
  throw:[[900,.03,"triangle"],[1400,.05,"triangle"]], hold:[[660,.06],[990,.1]], escape:[[180,.3,"sawtooth"],[120,.35,"sawtooth"]],
  win:[[523,.14],[659,.14],[784,.14],[1046,.32]], over:[[392,.2,"triangle"],[311,.25,"triangle"],[233,.4,"triangle"]]};
const Music={on:false,timer:0,next:0,step:0,bus:null,noise:null,
  ensure(){ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume();
    if(!this.bus){ this.bus=AC.createGain(); this.bus.gain.value=.28; this.bus.connect(AC.destination);
      const n=AC.sampleRate*.4, b=AC.createBuffer(1,n,AC.sampleRate), d=b.getChannelData(0); for(let i=0;i<n;i++) d[i]=Math.random()*2-1; this.noise=b; } },
  start(){ if(!SOUND||this.on) return; try{ this.ensure(); this.on=true; this.next=AC.currentTime+.06;
    clearInterval(this.timer); this.timer=setInterval(()=>this.tick(),25); }catch(e){} },
  stop(){ this.on=false; clearInterval(this.timer); },
  reset(){ this.stop(); this.step=0; },
  tick(){ if(!this.on) return; const bpm=118+28*(G?prog():0), s16=60/bpm/4;
    while(this.next<AC.currentTime+.12){ this.note(this.step,this.next,s16); this.next+=s16; this.step++; } },
  env(node,t,peak,dur){ const g=AC.createGain(); g.gain.setValueAtTime(peak,t); g.gain.exponentialRampToValueAtTime(.0008,t+dur); node.connect(g).connect(this.bus); return g; },
  osc(type,f,t,dur,peak,lp){ const o=AC.createOscillator(); o.type=type; o.frequency.setValueAtTime(f,t);
    let n=o; if(lp){ const fl=AC.createBiquadFilter(); fl.type="lowpass"; fl.frequency.value=lp; o.connect(fl); n=fl; }
    this.env(n,t,peak,dur); o.start(t); o.stop(t+dur+.02); return o; },
  hit(t,type,freq,peak,dur){ const s=AC.createBufferSource(); s.buffer=this.noise; const f=AC.createBiquadFilter(); f.type=type; f.frequency.value=freq;
    s.connect(f); this.env(f,t,peak,dur); s.start(t); s.stop(t+dur+.02); },
  note(i,t,s16){
    const k=i%16, bar=Math.floor(i/16)%4, section=Math.floor(i/64)%2;
    if(k===0||k===6||k===8||(k===14&&bar%2)){ const o=this.osc("sine",140,t,.16,.9); o.frequency.exponentialRampToValueAtTime(42,t+.12); }    // kick
    if(k===4||k===12){ this.hit(t,"bandpass",1800,.5,.12); }                                                                                 // snare
    if(k%2===1) this.hit(t,"highpass",8000,k%4===3?.2:.1,.03);                                                                               // hats
    if(k===10){ this.osc("square",1318,t,.05,.05); this.osc("square",1975,t,.08,.035); }                                                      // anvil
    const roots=[41.2,32.7,36.71,30.87];                                                                                                     // E C D B
    if(k%2===0||k===15){ const f=roots[bar]*(k%8===6?2:1); this.osc("sawtooth",f*2,t,s16*1.6,.3,560); }                                     // bass
    const chords=[[329.6,392,493.9],[261.6,329.6,392],[293.7,370,440],[246.9,311.1,370]], pat=[0,2,1,2,0,2,1,0];
    if(section===1 || prog()>.55){ const f=chords[bar][pat[k%8]]; this.osc("square",f,t,s16*.8,.06,2400); }                                 // arpeggio
    if(k===0&&section===0) this.osc("triangle",chords[bar][2]*2,t,s16*6,.06);                                                               // lead
  }};



/* ===================== Storage ===================== */
function loadBest(){ try{ return +localStorage.getItem("ah-best")||0; }catch(e){ return 0; } }
function saveBest(v){ try{ localStorage.setItem("ah-best",String(v)); }catch(e){} }

/* ===================== Images ===================== */
const IMG={}, PARTIMG={};
function loadImg(src){ return new Promise(r=>{ const i=new Image(); i.onload=()=>r(i); i.onerror=()=>r(i); i.src=src; }); }
async function loadAll(){
  const keys=["bg","maya_idle","maya_run0","maya_run1","maya_run2","maya_dive","mike_idle","mike_run1","mike_run2","mike_repair","mike_t_lock","mq_idle","mq_run1","mq_run2","mq_throw","mq_tag"];
  await Promise.all(keys.map(async k=>{ IMG[k]=await loadImg(ASSETS[k]); }));
  const jobs=[];
  for(const [f,info] of Object.entries(FAMILIES)) for(const d of [null,...info.defects]) for(let s=0;s<3;s++)
    jobs.push(loadImg(svgURL(partSVG(f,d,s))).then(i=>PARTIMG[f+":"+(d||"good")+s]=i));
  await Promise.all(jobs);
}

/* ===================== UI helpers ===================== */
const $=id=>document.getElementById(id);
const face=(who,n)=>`<img alt="${NAMES[who]}" src="${ASSETS[who+"_face_"+n]}">`;
function show(id){ ["title","play","end"].forEach(s=>$(s).hidden=s!==id); scrollTo(0,0); }
const fmt=t=>`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,"0")}`;
const rnd=(a,b)=>a+Math.random()*(b-a), lerp=(a,b,t)=>a+(b-a)*t;

/* ===================== Title ===================== */
function renderTitle(){
  const best=loadBest();
  $("title").innerHTML=`<div class="wrap">
    <img class="logo" src="${ASSETS.logo}" alt="Quality Rush: All Hands">
    <section class="panel callout"><div class="face">${face("mq","serious")}</div>
      <div class="bubble"><small>Mister Quality</small>One plant, one shift, three of us. A problem nobody fixes at the machine turns into a defect on the line, then a suspect box at the dock. Stop it as early as you can.</div></section>
    <button class="cta" id="startBtn"><span>START THE SHIFT<small>3:00 · 3 ESCAPES AND THE SHIFT FAILS</small></span></button>
    ${best?`<div class="best">Your best <b>${best}</b></div>`:""}
    <div class="banner"><span>The chain</span></div>
    <section class="panel chain">
      <div class="link"><div class="face">${face("mike","confident")}</div><div><b>1 · Mike · Production</b><span>A machine on <em class="y">yellow</em> makes bad parts and its lot becomes <em class="r">suspect</em>. Fix it on yellow and nothing bad gets made. Prevention.</span></div></div>
      <div class="arrow">▼</div>
      <div class="link"><div class="face">${face("maya","confident")}</div><div><b>2 · Maya · Inspection</b><span>Pull defective parts off the conveyor before they're boxed. Detection.</span></div></div>
      <div class="arrow">▼</div>
      <div class="link"><div class="face">${face("mq","serious")}</div><div><b>3 · Mister Quality · Shipping</b><span>Throw a HOLD tag on every box from a suspect lot before it reaches the truck. Containment.</span></div></div>
    </section>
    <div class="banner"><span>How to play</span></div>
    <section class="panel rules">
      <div><b style="color:var(--gold)">TAP</b><span>Tap a machine, a part or a box and the right person handles it. Tap a teammate's button to take control.</span></div>
      <div><b style="color:#8fc6ff">AUTOPILOT</b><span>The two you aren't controlling keep working, but slower and they miss things. Go where the <b>!</b> is.</span></div>
      <div><b style="color:var(--stop-hi)">LOCK OUT</b><span>Mike locks out every machine before he repairs it. Then tap Repair fast.</span></div>
      <div><b class="neg">ESCAPE</b><span>A box with a bad part ships. Three escapes and the shift fails.</span></div>
    </section>
    <div class="banner"><span>Scoring</span></div>
    <section class="panel rules">
      <div><b class="pos">+150</b><span>Fix a machine on yellow, before it breaks down.</span></div>
      <div><b class="pos">+80</b><span>Fix a machine after it breaks down.</span></div>
      <div><b class="pos">+60</b><span>Maya pulls a defective part.</span></div>
      <div><b class="pos">+100</b><span>Hold a box with a bad part in it. +40 for a good box from a suspect lot.</span></div>
      <div><b class="neg">−60</b><span>A HOLD on a lot that isn't suspect, or pulling a good part.</span></div>
      <div><b class="neg">−200</b><span>An escape.</span></div>
    </section>
    <button class="cta" id="startBtn2"><span>START THE SHIFT<small>ALL HANDS</small></span></button>
    <p class="foot">The Quality Rush finale, with <a href="https://marusfaulkner.github.io/quality-rush/" target="_blank" rel="noopener">Defect Runner</a>, <a href="https://marusfaulkner.github.io/line-down/" target="_blank" rel="noopener">Line Down!</a> and Containment Strike.<br>© 2026 Marcus Faulkner · Quality Rush · Mister Quality™<br>A game, not safety or quality training. Follow your site's procedures.</p>
  </div>`;
  const go=()=>{ tone(SFX.click); startGame(); };
  $("startBtn").onclick=go; $("startBtn2").onclick=go;
}

/* ===================== Game state ===================== */
const cv=$("cv"), ctx=cv.getContext("2d");
let SCALE=1, DPR=1, G=null, raf=0, last=0;
function resize(){
  const box=$("stagebox"), bw=box.clientWidth, bh=box.clientHeight; if(!bw) return;
  const portrait=matchMedia("(orientation:portrait) and (max-width:700px)").matches;
  SCALE=portrait?bw/W:Math.min(bw/W,bh/H); DPR=Math.min(window.devicePixelRatio||1,2.5);
  // phone held sideways: the floor takes the full height; team buttons and scoreboard fit in what's left
  const shortLand=matchMedia("(orientation:landscape) and (max-height:520px)").matches;
  if(shortLand){ const ph=$("play"), cs=getComputedStyle(ph), padV=parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom), padH=parseFloat(cs.paddingLeft)+parseFloat(cs.paddingRight);
    SCALE=Math.min((innerWidth-padH-2*(60+6))/W,(innerHeight-padV-4)/H); box.style.width=Math.floor(W*SCALE)+"px";
    ph.classList.toggle("narrow",(innerWidth-padH-W*SCALE)/2-6<112); }
  else { box.style.width=""; $("play").classList.remove("narrow"); }
  // when the floor is drawn small, scale up labels, boxes and parts so lot numbers stay readable
  U=Math.max(1,Math.min(1.7,.66/SCALE)); PART=44; BW=58; BH=42;   // boxes and parts keep their desktop size on every screen
  const rp=$("rp"), home=portrait?box:$("stage"); if(rp.parentNode!==home) home.appendChild(rp);
  cv.style.width=Math.floor(W*SCALE)+"px"; cv.style.height=Math.floor(H*SCALE)+"px";
  cv.width=Math.round(W*SCALE*DPR); cv.height=Math.round(H*SCALE*DPR);
  draw();
}
addEventListener("resize",()=>{ if(!$("play").hidden) resize(); });

let lotSeq=0;
function newLot(){ let n; do{ n=String(Math.floor(rnd(1000,9999))); } while(G&&((G.mach&&G.mach.some(m=>m.lot===n))||(G.suspect&&G.suspect.includes(n)))||new Set(n).size<3); return n; }
function newMachine(id,name,x,light){ return {id,name,x,light,state:"run",lot:newLot(),locked:false,prog:0,need:8,warnLeft:0,warnMax:1,down:0,since:0,nextPart:rnd(.5,2),fixedT:-1,flash:0}; }
function newChar(id,x){ return {id,x,tx:x,dir:1,moving:false,runPhase:0,act:-1,target:null,think:rnd(0,1),busy:0,at:-1,cool:0,manualT:0,keyDir:0}; }
function newGame(){
  G={ t:0, score:0, esc:0, held:0, heldBad:0, pulled:0, falseRej:0, wrongHold:0, suspectShipped:0, shippedGood:0, prevented:0, fixedDown:0,
    madeBad:0, downtime:0, parts:[], boxes:[], tags:[], fx:[], suspect:[], nextFault:7, ctrl:"mq",
    state:"count", count:3.4, paused:false, over:false, sayUntil:0, rushShown:false, seed:0 };
  G.mach=[newMachine("cnc","CNC Mill",96,[34,170]), newMachine("vmc","Machining Center",246,[205,190])];
  G.ch={mike:newChar("mike",170), maya:newChar("maya",520), mq:newChar("mq",830)};
  return G;
}
const prog=()=>Math.min(G.t/SHIFT,1);
const rush=()=>G.t>=RUSH_AT;
const beltV=()=>lerp(44,58,prog())*(rush()?1.45:1);
const boxV=()=>lerp(30,40,prog())*(rush()?1.45:1);
const uptime=()=>G.t>0?Math.max(0,1-G.downtime/(G.mach.length*G.t)):1;

async function startGame(){
  await READY;
  show("play"); newGame(); renderTeam(); resize(); renderHUD(); renderPanel();
  say("mq","serious","Clean shift so far. Watch the machines, the belt and the dock.",0);
  cancelAnimationFrame(raf); last=performance.now(); raf=requestAnimationFrame(loop); tone(SFX.tick);
}
function say(who,f,text,ms=1800){ $("mFace").innerHTML=face(who,f); $("mSay").innerHTML=`<small>${NAMES[who]}</small>${text}`; if(G) G.sayUntil=G.t+ms/1000; }
function announce(a,b,info){ const d=document.createElement("div"); d.className="banner-new"+(info?" info":""); d.innerHTML=`${a}<small>${b}</small>`; $("stage").appendChild(d); setTimeout(()=>d.remove(),2700); }
function fx(x,y,big,small,color){ G.fx.push({x,y,big,small,color,t:0}); }

/* ===================== Team switcher ===================== */
function needs(id){
  if(!G) return 0;
  if(id==="mike") return G.mach.filter(m=>m.state==="warn"||m.state==="down").length;
  if(id==="maya") return G.parts.filter(p=>p.state==="belt"&&p.defect).length;
  return G.boxes.filter(b=>b.state==="live"&&G.suspect.includes(b.lot)).length;
}
function renderTeam(){
  $("team").innerHTML=["mike","maya","mq"].map((id,i)=>`<button class="mate" data-id="${id}" aria-label="Control ${NAMES[id]}"><kbd>${i+1}</kbd><span class="face">${face(id,id==="mq"?"serious":"confident")}</span><span class="nm"><b>${NAMES[id].split(" ")[0]==="Mister"?"Mister Quality":NAMES[id].split(" ")[0]}</b><small>${ROLES[id]}</small></span><i class="dot"></i></button>`).join("");
  document.querySelectorAll(".mate").forEach(b=>b.addEventListener("pointerdown",e=>{ e.preventDefault(); control(b.dataset.id); }));
  updateTeam();
}
function updateTeam(){ if(!G) return; document.querySelectorAll(".mate").forEach(b=>{ const id=b.dataset.id, n=needs(id);
  b.classList.toggle("on",G.ctrl===id); const d=b.querySelector(".dot"); d.textContent=n?"!":""; d.classList.toggle("show",n>0); }); }
function control(id){ if(!G||G.over||G.paused||G.ctrl===id) return; G.ctrl=id; tone(SFX.swap); updateTeam(); renderPanel();
  say(id,id==="mq"?"serious":"confident",{mike:"I've got the machines.",maya:"Eyes on the belt.",mq:"I'll hold the dock."}[id],1100); }

/* ===================== Input ===================== */
function toLogical(e){ const r=cv.getBoundingClientRect(); return [(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H]; }
const clampZ=(id,x)=>Math.max(ZONES[id][0],Math.min(ZONES[id][1],x));
function charHit(x,y){ for(const id of ["mike","maya","mq"]){ const c=G.ch[id]; if(Math.abs(x-c.x)<46&&y>FEET-175&&y<FEET+10) return id; } return null; }
function machineAt(x,y){ return G.mach.findIndex(m=>Math.abs(m.x-x)<80&&y>120&&y<330); }
function partAt(x,y){ let best=null,bd=1e9; for(const p of G.parts){ if(p.state!=="belt") continue; const dx=Math.abs(p.x-x), dy=Math.abs(BELT_Y-PART/2-y); if(dx<PART*.9&&dy<PART*1.1&&dx<bd){bd=dx;best=p;} } return best; }
const boxY=b=>BOX_Y;   // single row on the rollers   // row 1 rides one level up so neighbouring labels never overlap
function boxRect(b){ const y=boxY(b); return [b.x-BW/2,y-BH,b.x+BW/2,y]; }
// What you see is what you tap: boxes nearer the truck are drawn on top, so the topmost box under the finger wins.
function boxAt(x,y){ const live=G.boxes.filter(b=>b.state==="live").sort((a,b)=>b.x-a.x), pad=6;
  for(const b of live){ const [l,t,r,bt]=boxRect(b); if(x>=l-pad&&x<=r+pad&&y>=t-pad-4&&y<=bt+pad) return b; }
  return null; }
function tapAt(x,y){
  if(!G||G.state!=="run"||G.paused) return;
  const p=partAt(x,y); if(p){ control("maya"); mayaTarget(p,true); return; }
  const b=boxAt(x,y); if(b){ control("mq"); mqTarget(b,true); return; }
  const m=machineAt(x,y); if(m>=0){ control("mike"); mikeGo(m); return; }
  const c=charHit(x,y); if(c){ control(c); return; }
  // floor: move whoever is in control, inside their zone
  const ch=G.ch[G.ctrl]; ch.tx=clampZ(G.ctrl,x); ch.target=null; ch.manualT=2.5; if(G.ctrl==="mike"){ G.ch.mike.at=-1; renderPanel(); }
}
cv.addEventListener("pointerdown",e=>{ e.preventDefault(); if(!G) return; if(G.paused){ setPause(false); return; } tapAt(...toLogical(e)); });
addEventListener("keydown",e=>{ if($("play").hidden||!G) return; const k=e.key;
  if(["p","P","Escape"].includes(k)){ setPause(!G.paused); return; }
  if(G.paused||G.state!=="run") return;
  if(["1","2","3"].includes(k)){ control(["mike","maya","mq"][+k-1]); return; }
  const ch=G.ch[G.ctrl];
  if(k==="ArrowLeft"||k==="a"||k==="A"){ e.preventDefault(); ch.keyDir=-1; ch.target=null; }
  else if(k==="ArrowRight"||k==="d"||k==="D"){ e.preventDefault(); ch.keyDir=1; ch.target=null; }
  else if(k===" "||k==="Enter"){ e.preventDefault(); if(G.ctrl==="mike"){ const m=G.mach[G.ch.mike.at]; if(m&&m.locked) repairTap(true); else if(m) lockout(true); } }
  else if((k==="l"||k==="L")&&G.ctrl==="mike") lockout(true);
});
addEventListener("keyup",e=>{ if(!G) return; if(["ArrowLeft","a","A","ArrowRight","d","D"].includes(e.key)){ const ch=G.ch[G.ctrl]; ch.keyDir=0; ch.tx=ch.x; ch.manualT=2; } });
$("pauseBtn").onclick=()=>setPause(!G.paused);
const SND_ON=`<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
      SND_OFF=`<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
function renderSnd(){ $("sndBtn").innerHTML=SOUND?SND_ON:SND_OFF; $("sndBtn").setAttribute("aria-label",SOUND?"Mute sound":"Turn sound on"); }
$("sndBtn").onclick=()=>{ SOUND=!SOUND; renderSnd(); if(!SOUND) Music.stop(); else if(G&&G.state==="run"&&!G.paused) Music.start(); }; renderSnd();
document.addEventListener("visibilitychange",()=>{ if(document.hidden && G && G.state==="run") setPause(true); });
function setPause(v){ if(!G||G.over) return; G.paused=v; if(v) Music.stop(); else if(G.state==="run") Music.start();
  $("ov").className="overlay"+(v?" pause":""); $("ov").innerHTML=v?`<div><b>PAUSED</b><span>Tap to resume</span></div>`:"";
  if(v) $("ov").onclick=()=>setPause(false); else { $("ov").onclick=null; last=performance.now(); } }

/* ===================== Mike: production ===================== */
const workX=i=>G.mach[i].x+(i===0?22:6);
function mikeGo(i){ const c=G.ch.mike; c.at=-1; c.target=i; c.tx=workX(i); c.manualT=0; renderPanel(); }
function lockout(manual){
  if(!G||G.over) return;
  const c=G.ch.mike, m=G.mach[c.at]; if(!m||m.state==="run"||m.locked) return;
  m.locked=true; m.prog=0; m.need=m.state==="warn"?7:11; if(m.state==="warn") m.state="pm";
  tone(SFX.lock); fx(m.x,215,"LOCKED OUT","Zero energy","#ff9a9a");
  if(manual) say("mike","confident","Locked and tagged. Now fix it.",1300);
  renderPanel();
}
function repairTap(manual){
  if(!G||G.over) return;
  const c=G.ch.mike, m=G.mach[c.at]; if(!m||!m.locked) return;
  m.prog++; m.flash=.12; if(manual) tone(SFX.ratchet,.05);
  if(m.prog>=m.need){
    const pm=m.state==="pm", pts=pm?150:80; G.score+=pts; if(pm) G.prevented++; else G.fixedDown++;
    fx(m.x,215,`+${pts}`,pm?"Prevented":"Back online","#56f08a"); tone(pm?SFX.pm:SFX.fixed);
    Object.assign(m,{state:"run",locked:false,prog:0,down:0,fixedT:0,lot:newLot(),nextPart:1.2});
    say("mike","happy",pm?"Fixed on yellow. Nothing bad got made after that.":"Back online. New lot started clean.",1700);
    c.target=null; renderHUD();
  }
  renderPanel();
}
function renderPanel(){
  const rp=$("rp"), c=G&&G.ch.mike, m=c&&c.at>=0?G.mach[c.at]:null;
  if(!G||G.state!=="run"||G.ctrl!=="mike"||!m||m.state==="run"){ rp.hidden=true; rp.dataset.key=""; return; }
  const key=[c.at,m.state,m.locked].join("|"); if(rp.dataset.key===key){ updateMeter(); return; }
  rp.dataset.key=key; rp.hidden=false; rp.className="rp"+(m.locked?" fix":m.state==="down"?" down":"");
  const head=`<div class="rp-h"><span class="chip">${m.locked?"Repairing":m.state==="down"?"Down":"Warning"}</span><b>${m.name}</b><span class="txt">Lot ${m.lot}${G.suspect.includes(m.lot)?" · suspect":""}</span></div>`;
  if(!m.locked){ rp.innerHTML=head+`<div class="fixrow"><button class="tb loto" id="tbL"><img src="${ASSETS.mike_t_lock}" alt=""><small>Lock out</small></button><div class="hint">Lock out first.</div></div>`;
    $("tbL").addEventListener("pointerdown",e=>{ e.preventDefault(); lockout(true); }); return; }
  rp.innerHTML=head+`<div class="fixrow"><button class="fixbtn" id="fixBtn">REPAIR!<small>TAP FAST</small></button><div class="meter"><i id="mtr"></i><span id="mtrT"></span></div></div>`;
  const b=$("fixBtn"); b.addEventListener("pointerdown",e=>{ e.preventDefault(); b.classList.add("down"); repairTap(true); });
  ["pointerup","pointerleave","pointercancel"].forEach(t=>b.addEventListener(t,()=>b.classList.remove("down")));
  updateMeter();
}
function updateMeter(){ const c=G.ch.mike, m=G.mach[c.at]; if(!m||!$("mtr")) return; $("mtr").style.width=Math.round(100*m.prog/m.need)+"%"; $("mtrT").textContent=`${m.prog} / ${m.need}`; }
function spawnFault(){
  const free=G.mach.filter(m=>m.state==="run"&&m.fixedT<0); if(!free.length) return;
  const m=free[Math.floor(Math.random()*free.length)];
  m.state="warn"; m.warnMax=m.warnLeft=lerp(14,9,prog()); m.since=G.t; tone(SFX.alarm,.05);
  if(!G.suspect.includes(m.lot)){ G.suspect.push(m.lot); }
  announce(`${m.name.toUpperCase()} ON YELLOW`,`Lot ${m.lot} is now suspect`);
  say("mike","determined",`${m.name} is on yellow. Everything it makes now is lot ${m.lot}, and that lot's suspect.`,2400);
  renderHUD(); updateTeam(); renderPanel();   // Mike may already be standing at this machine
}

/* ===================== Maya: inspection ===================== */
function mayaTarget(p,manual){ const c=G.ch.maya; c.target=p; c.manualT=0; c.tx=clampZ("maya",p.x+(manual?20:30)); }
function pullPart(p,manual){
  if(!G||G.over||!p||p.state!=="belt") return; p.state="pulled"; p.t=0; const c=G.ch.maya; c.act=0; c.dir=p.x>=c.x?1:-1;
  if(p.defect){ G.pulled++; G.score+=60; tone(SFX.pull); fx(p.x,BELT_Y-70,"+60",DEFECT_NAME(p),"#56f08a");
    if(manual) say("maya","happy",["Good catch.","Pulled it.","That's a reject.","Nice eye."][G.pulled%4],1000); }
  else { G.falseRej++; G.score-=60; p.state="wrong"; tone(SFX.wrong); fx(p.x,BELT_Y-70,"−60","Good part","#ff6060"); say("maya","frustrated","That one was good. Look before you pull.",1600); }
  renderHUD();
}
const DEFECT_NAME=p=>DEFECTS[p.defect]?DEFECTS[p.defect].name:"Defect";
// two machines feed one belt: wait for a part-width gap at the belt start so parts never spawn on top of each other
const beltClear=()=>!G.parts.some(p=>p.state==="belt"&&p.x<BELT[0]+4+PART+8);
function spawnPart(m){
  const bad=m.state==="warn"&&Math.random()<.75;
  const fams=Object.keys(FAMILIES), fam=fams[Math.floor(Math.random()*fams.length)];
  let defect=null; if(bad){ const pool=FAMILIES[fam].defects.filter(d=>d!=="crack"&&d!=="misalign"); defect=pool[Math.floor(Math.random()*pool.length)]; G.madeBad++; }
  G.parts.push({x:BELT[0]+4,fam,defect,lot:m.lot,img:PARTIMG[fam+":"+(defect||"good")+(G.seed++%3)],state:"belt",t:0});
}

/* ===================== Mister Quality: containment ===================== */
const RANGE=300;
function mqTarget(b,manual){ const c=G.ch.mq; c.target=b; c.manualT=0;
  if(Math.abs(b.x-c.x)>RANGE-20) c.tx=clampZ("mq",b.x-RANGE+60); else { c.tx=c.x; throwAt(b); } }
function throwAt(b){
  if(!G||G.over) return;
  const c=G.ch.mq; if(b.state!=="live"||c.cool>0) return;
  c.target=null; c.act=0; c.cool=.32; c.dir=b.x>=c.x?1:-1; b.state="targeted"; tone(SFX.throw);
  G.tags.push({x0:c.x+c.dir*40,y0:FEET-150,box:b,t:0,dur:.24+Math.abs(b.x-c.x)/2600});
}
function resolveTag(tag){
  if(G.over) return; const b=tag.box, sus=G.suspect.includes(b.lot);
  if(sus){ b.state="held"; G.held++; if(b.defect){ G.heldBad++; G.score+=100; fx(b.x,boxY(b)-BH-30,"+100","Bad part contained","#56f08a"); } else { G.score+=40; fx(b.x,boxY(b)-BH-30,"+40",`Lot ${b.lot} on hold`,"#56f08a"); } tone(SFX.hold); }
  else { b.state="wronghold"; G.wrongHold++; G.score-=60; tone(SFX.wrong); fx(b.x,boxY(b)-BH-30,"−60",`Lot ${b.lot} isn't suspect`,"#ff6060"); say("mq","frustrated",`Lot ${b.lot} isn't on the suspect list. Good product's on hold now.`,1900); }
  b.t=0; renderHUD();
}

/* ===================== Loop ===================== */
const PORTRAIT_Q=matchMedia("(orientation:portrait) and (max-width:700px)");
const portraitPhone=()=>PORTRAIT_Q.matches;
function loop(now){
  raf=requestAnimationFrame(loop);
  let dt=(now-last)/1000; last=now; if(dt>.1) dt=.016;
  if(!G||G.over) return;
  if(portraitPhone()){ if(G.state==="run"&&!G.paused) setPause(true); return; }   // no gameplay with a phone held upright
  if(G.paused){ draw(); return; }
  if(G.state==="count"){
    const before=Math.ceil(G.count); G.count-=dt; const after=Math.ceil(G.count);
    if(after!==before && after>0) tone(SFX.tick);
    if(G.count<=0){ G.state="run"; tone(SFX.go); $("ov").innerHTML=""; Music.reset(); Music.start(); }
    else { const lab=G.count>.6?String(Math.ceil(G.count-.4)):"GO!"; if(lab!==G.countShown){ G.countShown=lab; $("ov").innerHTML=`<div class="big">${lab}</div>`; } }
    draw(); return;
  }
  step(dt); if(!G.over) draw();
}
function moveChar(id,dt,speed){
  const c=G.ch[id];
  if(c.keyDir){ c.tx=clampZ(id,c.x+c.keyDir*80); }
  const d=c.tx-c.x; c.moving=Math.abs(d)>1;
  if(c.moving){ c.dir=Math.sign(d); c.x+=Math.sign(d)*Math.min(Math.abs(d),speed*dt); c.runPhase+=dt*2.3; }
  if(c.act>=0){ c.act+=dt/.34; if(c.act>=1) c.act=-1; }
  c.cool=Math.max(0,(c.cool||0)-dt); c.manualT=Math.max(0,(c.manualT||0)-dt);
}
function step(dt){
  G.t+=dt; const ctrl=G.ctrl;
  // ---- schedule
  G.nextFault-=dt; if(G.nextFault<=0&&G.t<SHIFT-6){ spawnFault(); G.nextFault=lerp(15,8,prog())*(rush()?.8:1)+rnd(0,3); }
  if(!G.rushShown&&rush()){ G.rushShown=true; announce("TRUCK RUSH","Last 30 seconds. Everything moves faster"); tone(SFX.alarm,.06); say("mq","determined","Truck rush. Nothing bad gets on it.",2400); }
  // ---- machines
  G.mach.forEach(m=>{
    if(m.fixedT>=0){ m.fixedT+=dt; if(m.fixedT>3) m.fixedT=-1; } m.flash=Math.max(0,m.flash-dt);
    if(m.state==="warn"){ m.warnLeft-=dt; if(m.warnLeft<=0){ m.state="down"; m.down=0; tone(SFX.down); fx(m.x,215,"DOWN!",m.name,"#ff6060");
      say("mike","frustrated",`${m.name} broke down. Line's starving.`,1800); renderPanel(); updateTeam(); } }
    if(m.state==="down"||m.state==="pm") G.downtime+=dt*(m.state==="pm"?.5:1);
    if(m.state==="down") m.down+=dt;
    if(m.state==="run"||m.state==="warn"){ m.nextPart-=dt; if(m.nextPart<=0&&G.t<SHIFT-1.5&&beltClear()){ spawnPart(m); m.nextPart=lerp(4.2,3.2,prog())*(rush()?.8:1)+rnd(0,.9); } }
  });
  // ---- Mike
  const mike=G.ch.mike;
  if(ctrl!=="mike"||mike.manualT<=0){
    if(mike.target==null && mike.at<0 && ctrl!=="mike"){ // autopilot picks the worst machine after a reaction delay
      const cand=G.mach.map((m,i)=>[m,i]).filter(([m])=>(m.state==="down"||m.state==="warn")&&G.t-m.since>5).sort((a,b)=>(b[0].state==="down")-(a[0].state==="down"));
      if(cand.length) mikeGo(cand[0][1]); }
  }
  moveChar("mike",dt,ctrl==="mike"?430:170);
  if(mike.target!=null&&!mike.moving){ mike.at=mike.target; mike.target=null; renderPanel(); }
  if(mike.at>=0&&Math.abs(mike.x-workX(mike.at))>6) { mike.at=-1; renderPanel(); }
  if(ctrl!=="mike"&&mike.at>=0){ const m=G.mach[mike.at]; mike.busy+=dt;
    if(m.state==="run"){ mike.at=-1; }
    else if(!m.locked){ if(mike.busy>1.4){ lockout(false); mike.busy=0; } }
    else if(mike.busy>.95){ mike.busy=0; repairTap(false); } }
  // ---- belt
  const bv=beltV();
  for(const p of G.parts){ p.t+=dt;
    if(p.state==="belt"){ p.x+=bv*dt; if(p.x>=BELT[1]){ p.state="boxed";
      const sx=BELT[1]+14, gap=r=>G.boxes.filter(b=>(b.state==="live"||b.state==="targeted")&&(b.row||0)===r).reduce((m,b)=>Math.min(m,b.x),1e9)-sx;
      const g=gap(0), row=0, x=g>=BW+4?sx:(g>-60?sx+g-(BW+4):sx+g-BW*.6);   // keep a gap so labels never overlap (box waits back on the belt end)
      G.boxes.push({x,row,lot:p.lot,defect:!!p.defect,state:"live",t:0,tint:Math.random()*.1}); } } }
  G.parts=G.parts.filter(p=>p.state==="belt"||((p.state==="pulled"||p.state==="wrong")&&p.t<.6));
  // ---- Maya
  const maya=G.ch.maya;
  if(maya.target&&maya.target.state!=="belt") maya.target=null;
  if(ctrl!=="maya"||maya.manualT<=0){
    if(ctrl!=="maya"){ maya.think-=dt;
      if(!maya.target&&maya.think<=0){ maya.think=1.1;
        const d=G.parts.filter(p=>p.state==="belt"&&p.defect&&!p.seen&&Math.abs(p.x-maya.x)<150).sort((a,b)=>b.x-a.x)[0];
        if(d){ d.seen=true; if(Math.random()<.4) mayaTarget(d,false); } } }   // on autopilot she gets one look at each part, and misses most
  }
  if(maya.target){ maya.tx=clampZ("maya",maya.target.x+20); if(Math.abs(maya.target.x-maya.x)<110) pullPart(maya.target,ctrl==="maya"), maya.target=null; }
  moveChar("maya",dt,ctrl==="maya"?420:150);
  // ---- boxes
  const xv=boxV();
  for(const b of G.boxes){ if(G.over) break; b.t+=dt;
    if(b.state==="live"||b.state==="targeted"){ b.x+=xv*dt;
      if(b.x>=SHIP_X&&b.state==="live"){ b.state="gone"; const sus=G.suspect.includes(b.lot);
        if(b.defect){ G.esc++; G.score-=200; tone(SFX.escape); G.shipFlash=1; fx(SHIP_X-90,BOX_Y-90,"ESCAPE −200",`Lot ${b.lot} shipped`,"#ff6060");
          announce(`ESCAPE ${G.esc}/${MAX_ESC}`,"A bad part reached the truck"); say("mq","frustrated",`Lot ${b.lot} shipped with a bad part in it. That's at the customer now.`,2200);
          renderHUD(); if(G.esc>=MAX_ESC){ endGame("escape"); break; } }
        else if(sus){ G.suspectShipped++; G.score-=20; fx(SHIP_X-90,BOX_Y-90,"−20","Suspect lot shipped","#ffb3b3"); }
        else { G.shippedGood++; G.score+=5; } } }
    else if(b.state==="held"||b.state==="wronghold"){ /* stays put, then fades */ } }
  if(G.over) return;
  G.boxes=G.boxes.filter(b=>b.state==="live"||b.state==="targeted"||((b.state==="held"||b.state==="wronghold")&&b.t<.9));
  G.tags.forEach(t=>{ t.t+=dt/t.dur; if(t.t>=1&&!t.done){ t.done=true; resolveTag(t); } }); G.tags=G.tags.filter(t=>!t.done);
  // ---- Mister Quality
  const mq=G.ch.mq;
  if(mq.target&&mq.target.state!=="live") mq.target=null;
  if(mq.target&&Math.abs(mq.target.x-mq.x)<=RANGE){ mq.tx=mq.x; throwAt(mq.target); }
  if(ctrl!=="mq"){ mq.think-=dt;
    if(!mq.target&&mq.think<=0){ mq.think=1.3;
      const s=G.boxes.filter(b=>b.state==="live"&&G.suspect.includes(b.lot)&&!b.seen&&Math.abs(b.x-mq.x)<180).sort((a,b)=>b.x-a.x)[0];
      if(s){ s.seen=true; if(Math.random()<.45) throwAt(s); } }
    if(!mq.target&&!mq.moving&&Math.abs(mq.x-830)>20&&mq.manualT<=0) mq.tx=830; }
  moveChar("mq",dt,ctrl==="mq"?480:260);
  // ---- misc
  G.fx.forEach(f=>f.t+=dt); G.fx=G.fx.filter(f=>f.t<1.2);
  if(G.shipFlash) G.shipFlash=Math.max(0,G.shipFlash-dt*1.6);
  if(G.t>G.sayUntil&&G.t>3){ G.sayUntil=G.t+999; const n={mike:needs("mike"),maya:needs("maya"),mq:needs("mq")};
    const top=Object.entries(n).sort((a,b)=>b[1]-a[1])[0];
    if(top[1]>0) say(top[0],"determined",{mike:"A machine needs me. Tap it.",maya:"Bad parts on the belt. Tap them.",mq:"Suspect boxes heading for the truck. Tag them."}[top[0]],0);
    else say("mq","serious","Running clean. Watch for the next yellow light.",0); }
  if(Math.floor(G.t*4)!==Math.floor((G.t-dt)*4)){ renderHUD(); updateTeam(); }
  if(G.t>=SHIFT) endGame("complete");
}

/* ===================== HUD ===================== */
function renderHUD(){
  if(!G) return;
  $("hScore").textContent=G.score;
  const u=uptime(), e=$("hUp"); e.textContent=Math.round(u*100)+"%"; e.className="v "+(u>=.9?"good":u>=.75?"mid":"bad");
  $("hTime").textContent=fmt(Math.max(0,Math.ceil(SHIFT-G.t)));
  $("hEsc").innerHTML=Array.from({length:MAX_ESC},(_,k)=>`<i class="${k<G.esc?"on":""}">✕</i>`).join("");
  $("hHeld").textContent=G.held;
}

/* ===================== Drawing ===================== */
function img(k,x,y,h,flip){ const i=IMG[k]; if(!i||!i.width) return 0; const w=i.width*h/i.height;
  if(flip){ ctx.save(); ctx.translate(x,0); ctx.scale(-1,1); ctx.drawImage(i,-w/2,y-h,w,h); ctx.restore(); } else ctx.drawImage(i,x-w/2,y-h,w,h); return w; }
function rrect(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function text(t,x,y,size,color,font){ ctx.font=`${size}px ${font||"'Lilita One',Impact,sans-serif"}`; ctx.textAlign="center"; ctx.lineWidth=4; ctx.strokeStyle="rgba(0,0,0,.8)"; ctx.strokeText(t,x,y); ctx.fillStyle=color; ctx.fillText(t,x,y); }
// Repair panel placement: normally 33% down the floor. While Mike is standing at the machine (warning / down, before
// lockout) his head reaches higher than when he kneels to repair, so lift the panel until its bottom clears his head.
const MIKE_HEAD_Y=FEET-190;   // top of his cap in floor coordinates (idle sprite is 196 tall, a few px are transparent)
function placePanel(){
  const rp=$("rp"); if(rp.hidden||!G) return;
  const m=G.ch.mike.at>=0?G.mach[G.ch.mike.at]:null, standing=!!m&&!m.locked;
  const sh=$("stage").clientHeight; if(!sh) return;
  let top=.33*sh;
  if(standing) top=Math.max(.15*sh,   // never above 15%: the suspect-lot banner lives there
     Math.min(top, MIKE_HEAD_Y/H*sh-rp.offsetHeight-4));
  const v=Math.round(top)+"px"; if(rp.style.top!==v) rp.style.top=v;
}
function draw(){
  if(!cv.width) return; placePanel();
  ctx.setTransform(SCALE*DPR,0,0,SCALE*DPR,0,0); ctx.imageSmoothingQuality="high";
  const g=G||newGame();
  if(IMG.bg&&IMG.bg.width) ctx.drawImage(IMG.bg,0,0,W,H); else { ctx.fillStyle="#123"; ctx.fillRect(0,0,W,H); }
  ctx.fillStyle="rgba(4,10,22,.18)"; ctx.fillRect(0,0,W,H);
  g.mach.forEach(m=>drawMachine(m,g));
  // parts on the belt
  g.parts.forEach(p=>{ let y=BELT_Y-PART, a=1, s=1;
    if(p.state==="pulled"){ y-=p.t*110; a=1-p.t*1.7; s=1+p.t*.4; } if(p.state==="wrong") a=1-p.t*1.7;
    ctx.globalAlpha=Math.max(0,a); if(p.img&&p.img.width) ctx.drawImage(p.img,p.x-PART*s/2,y,PART*s,PART*s);
    if(p.state!=="belt"){ ctx.strokeStyle=p.state==="pulled"?"#56f08a":"#ff6060"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(p.x,y+PART/2,PART*.62,0,Math.PI*2); ctx.stroke(); }
    ctx.globalAlpha=1; });
  drawRollers();
  // truck exit glow
  const sg=ctx.createLinearGradient(W,0,W-70,0); sg.addColorStop(0,`rgba(212,42,42,${.45+.4*(g.shipFlash||0)})`); sg.addColorStop(1,"rgba(212,42,42,0)"); ctx.fillStyle=sg; ctx.fillRect(W-70,BOX_Y-70,70,90);
  g.boxes.slice().sort((a,b)=>a.x-b.x).forEach(drawBox);   // rightmost (closest to the truck) drawn last, on top
  // characters back to front by zone
  ["mike","maya","mq"].forEach(id=>drawChar(id,g));
  g.tags.forEach(t=>{ const b=t.box, x=lerp(t.x0,b.x,t.t), y=lerp(t.y0,boxY(b)-BH*.6,t.t)-Math.sin(t.t*Math.PI)*50;
    ctx.save(); ctx.translate(x,y); ctx.rotate(t.t*Math.PI*3); img("mq_tag",0,18,34); ctx.restore(); });
  g.fx.forEach(f=>{ const a=Math.min(1,1.7-f.t*1.5); ctx.globalAlpha=Math.max(0,a); const y=f.y-f.t*36;
    // keep popup text inside the floor (it was clipping off the right edge near the truck)
    ctx.font=`700 ${Math.round(13*U)}px 'Barlow Condensed',sans-serif`; const half=Math.max(ctx.measureText((f.small||"").toUpperCase()).width,f.big.length*13*U)/2+8, x=Math.min(W-half,Math.max(half,f.x));
    text(f.big,x,y,22*U,f.color); if(f.small){ ctx.font=`700 ${Math.round(13*U)}px 'Barlow Condensed',sans-serif`; ctx.lineWidth=4; ctx.strokeText(f.small.toUpperCase(),x,y+16*U); ctx.fillStyle="#fff"; ctx.fillText(f.small.toUpperCase(),x,y+16*U); }
    ctx.globalAlpha=1; });
  drawAlert(g);
  if(G&&rush()&&G.state==="run"){ ctx.strokeStyle=`rgba(255,96,96,${.25+.2*Math.sin(G.t*8)})`; ctx.lineWidth=8; ctx.strokeRect(4,4,W-8,H-8); }
}
function drawMachine(m,g){
  const [lx,ly]=m.light;
  const col=m.state==="warn"?"#ffb000":m.state==="down"?"#ff3b3b":m.state==="pm"?"#e0507f":"#2fdc6a";
  const pulse=m.state==="warn"||m.state==="down"?.6+.4*Math.sin(g.t*11):1;
  ctx.save(); ctx.globalAlpha=pulse; ctx.shadowColor=col; ctx.shadowBlur=18; ctx.fillStyle=col; ctx.beginPath(); ctx.arc(lx,ly,9,0,Math.PI*2); ctx.fill(); ctx.restore();
  if(m.state!=="run"){ // floor glow + status tag
    const gr=ctx.createRadialGradient(m.x,322,8,m.x,322,95); gr.addColorStop(0,col+"88"); gr.addColorStop(1,col+"00"); ctx.fillStyle=gr; ctx.beginPath(); ctx.ellipse(m.x,322,95,20,0,0,Math.PI*2); ctx.fill();
    const T=Math.min(U,1.3), t=m.state==="warn"?"WARNING":m.state==="down"?"DOWN":"LOCKED OUT", bob=m.state==="warn"?Math.sin(g.t*6)*3:0, tw=112*T, ty=66+bob;
    rrect(m.x-tw/2,ty,tw,32*T,9); ctx.fillStyle="rgba(6,15,28,.92)"; ctx.fill(); ctx.lineWidth=3; ctx.strokeStyle=col; ctx.stroke();
    ctx.fillStyle=col; ctx.font=`${Math.round(17*T)}px 'Lilita One',Impact,sans-serif`; ctx.textAlign="center"; ctx.fillText(t,m.x,ty+22*T);
    if(m.state==="warn"){ const f=Math.max(0,m.warnLeft/m.warnMax); ctx.fillStyle="#3a2a00"; ctx.fillRect(m.x-tw/2+8,ty+26,tw-16,4); ctx.fillStyle="#ffd54a"; ctx.fillRect(m.x-tw/2+8,ty+26,(tw-16)*f,4); }
    if(m.locked){ img("mike_t_lock",m.x+44,300,40); }
  } else if(m.fixedT>=0&&m.fixedT<2){ ctx.globalAlpha=1-m.fixedT/2; text("RUNNING",m.x,92,17,"#56f08a"); ctx.globalAlpha=1; }
  // lot plate
  const sus=g.suspect.includes(m.lot), L=Math.min(U,1.5); ctx.font=`700 ${Math.round(12*L)}px 'Barlow Condensed',sans-serif`; ctx.textAlign="center";
  const s=`LOT ${m.lot}`, w=ctx.measureText(s).width+12, py=U>1?152:136; rrect(m.x-w/2,py,w,17*L,5); ctx.fillStyle=sus?"rgba(150,15,25,.92)":"rgba(6,15,28,.85)"; ctx.fill(); ctx.fillStyle="#fff"; ctx.fillText(s,m.x,py+12.5*L);
}
function drawRollers(){ const y=BOX_Y; ctx.fillStyle="#3b4656"; ctx.fillRect(BELT[1]-6,y,SHIP_X-BELT[1]+12,9); ctx.fillStyle="#8b99ab";
  for(let x=BELT[1]+((G?-G.t*boxV():0)%18+18)%18;x<SHIP_X;x+=18){ ctx.beginPath(); ctx.arc(x,y+3,4,0,Math.PI*2); ctx.fill(); }
  ctx.fillStyle="#2a3340"; [BELT[1]+10,850,SHIP_X-10].forEach(x=>ctx.fillRect(x-3,y+9,6,34)); }
function drawBox(b){
  let yb=boxY(b), a=1; if(b.state==="held"||b.state==="wronghold"){ yb-=b.t*60; a=Math.max(0,1-b.t*1.2); }
  ctx.globalAlpha=a;
  ctx.fillStyle="rgba(0,0,0,.32)"; ctx.beginPath(); ctx.ellipse(b.x,yb+2,BW*.5,5,0,0,Math.PI*2); ctx.fill();
  const sh=Math.round(201-b.tint*80); ctx.fillStyle=`rgb(${sh},${Math.round(sh*.71)},${Math.round(sh*.39)})`; ctx.fillRect(b.x-BW/2,yb-BH,BW,BH);
  ctx.strokeStyle="#6d4a20"; ctx.lineWidth=2; ctx.strokeRect(b.x-BW/2,yb-BH,BW,BH); ctx.fillStyle="#e2bd84"; ctx.fillRect(b.x-BW/2,yb-BH,BW,6);
  const lw=BW-10, lh=24, lx=b.x-lw/2, ly=yb-BH+10; rrect(lx,ly,lw,lh,3); ctx.fillStyle="#fff"; ctx.fill(); ctx.strokeStyle="#333"; ctx.lineWidth=1; ctx.stroke();
  ctx.fillStyle="#666"; ctx.font="700 8px 'Barlow Condensed',sans-serif"; ctx.textAlign="center"; ctx.fillText("LOT",b.x,ly+8);
  ctx.fillStyle="#111"; ctx.font="16px 'Lilita One',Impact,sans-serif"; ctx.fillText(b.lot,b.x,ly+lh-3);
  if(b.state==="targeted"){ ctx.strokeStyle="#ffcc1f"; ctx.lineWidth=3; ctx.strokeRect(b.x-BW/2-2,yb-BH-2,BW+4,BH+4); }
  if(b.state==="held"||b.state==="wronghold"){ img("mq_tag",b.x+BW*.3,yb-BH*.1,28); ctx.strokeStyle=b.state==="held"?"#56f08a":"#ff6060"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(b.x,yb-BH/2,BW*.72,0,Math.PI*2); ctx.stroke(); }
  ctx.globalAlpha=1;
}
function drawChar(id,g){
  const c=g.ch[id]; let k,h,flip=c.dir<0,y=FEET,x=c.x;
  if(id==="mike"){
    if(c.at>=0&&g.mach[c.at]&&g.mach[c.at].locked){ k="mike_repair"; h=134; flip=false; }
    else if(c.moving){ k=(Math.floor(c.runPhase*4)%2)?"mike_run2":"mike_run1"; h=160; }
    else { k="mike_idle"; h=196; flip=false; } }
  else if(id==="maya"){
    if(c.act>=0){ k="maya_dive"; h=96; }
    else if(c.moving){ k="maya_run"+[0,1,2,1][Math.floor(c.runPhase*4)%4]; h=158; }
    else { k="maya_idle"; h=200*(1+.012*Math.sin((G?G.t:0)*2.6+1)); flip=false; } }   // standing: slow breathing
  else { if(c.act>=0){ k="mq_throw"; h=186; }
    else if(c.moving){ k=(Math.floor(c.runPhase*4)%2)?"mq_run2":"mq_run1"; h=176; }
    else { k="mq_idle"; h=192; flip=false; } }
  const on=G&&G.ctrl===id;
  // control ring
  ctx.fillStyle="rgba(0,0,0,.38)"; ctx.beginPath(); ctx.ellipse(c.x,FEET+2,40,7,0,0,Math.PI*2); ctx.fill();
  if(on){ ctx.strokeStyle="#ffcc1f"; ctx.lineWidth=4; ctx.shadowColor="#ffcc1f"; ctx.shadowBlur=12; ctx.beginPath(); ctx.ellipse(c.x,FEET+2,48,11,0,0,Math.PI*2); ctx.stroke(); ctx.shadowBlur=0; }
  img(k,x,y,h,flip);
  // marker over head: gold chevron for the one you control, red ! where you're needed
  const top=y-(k==="mike_repair"?150:200), n=needs(id);
  // Mister Quality stands under the moving boxes, so his ! sits beside his head, not above it, and never covers a lot number
  const mx=id==="mq"?c.x-58*Math.min(U,1.4):c.x, my=id==="mq"?FEET-150:top-10;
  if(on){ ctx.fillStyle="#ffcc1f"; ctx.beginPath(); ctx.moveTo(c.x-11,top-14); ctx.lineTo(c.x+11,top-14); ctx.lineTo(c.x,top); ctx.fill(); }
  else if(n&&G&&G.state==="run"){ const r=(14+2*Math.sin(G.t*9))*Math.min(U,1.4); ctx.fillStyle="#d42a2a"; ctx.beginPath(); ctx.arc(mx,my,r,0,Math.PI*2); ctx.fill(); ctx.lineWidth=3; ctx.strokeStyle="#fff"; ctx.stroke();
    ctx.fillStyle="#fff"; ctx.font=`${Math.round(20*Math.min(U,1.4))}px 'Lilita One',Impact,sans-serif`; ctx.textAlign="center"; ctx.fillText("!",mx,my+7*Math.min(U,1.4)); }
}
function drawAlert(g){ ctx.save(); const A=Math.min(U,1.35); ctx.translate(W/2,0); ctx.scale(A,A); ctx.translate(-W/2,0); drawAlertInner(g); ctx.restore(); }
function drawAlertInner(g){
  const lots=g.suspect.slice(-3), w=lots.length?130+lots.length*92:270, x=W/2-w/2, y=6;
  ctx.save(); rrect(x,y,w,40,10); ctx.fillStyle=lots.length?"rgba(120,10,20,.93)":"rgba(10,60,30,.9)"; ctx.fill(); ctx.lineWidth=2.5; ctx.strokeStyle=lots.length?"#ff8a8a":"#56f08a"; ctx.stroke();
  ctx.fillStyle="#fff"; ctx.font="700 13px 'Barlow Condensed',sans-serif";
  if(!lots.length){ ctx.textAlign="center"; ctx.fillText("NO SUSPECT LOTS · RUNNING CLEAN",W/2,y+25); ctx.restore(); return; }
  ctx.textAlign="left"; ctx.fillText("SUSPECT",x+14,y+18); ctx.fillText(lots.length>1?"LOTS":"LOT",x+14,y+32);
  lots.forEach((l,i)=>{ const bx=x+84+i*92; rrect(bx,y+6,84,28,6); ctx.fillStyle="#fff"; ctx.fill(); ctx.fillStyle="#b3101f"; ctx.font="22px 'Lilita One',Impact,sans-serif"; ctx.textAlign="center"; ctx.fillText(l,bx+42,y+29); });
  ctx.restore();
}

/* ===================== End ===================== */
function rankFor(r){ if(!r.complete) return 0; let k=1;
  if(r.esc<=1&&r.uptime>=.75) k=2; if(r.esc===0&&r.uptime>=.82) k=3;
  if(r.esc===0&&r.uptime>=.88&&r.prevented>=Math.max(1,(r.prevented+r.fixedDown)*.6)&&r.wrongHold+r.falseRej<=2) k=4; return k; }
function endGame(reason){
  if(G.over) return; G.over=true; G.state="over"; Music.stop(); renderPanel();
  const complete=reason==="complete", u=uptime();
  if(complete) G.score+=Math.round(u*100)*3;
  const r={complete,score:G.score,uptime:u,esc:G.esc,pulled:G.pulled,heldBad:G.heldBad,held:G.held,prevented:G.prevented,fixedDown:G.fixedDown,
    wrongHold:G.wrongHold,falseRej:G.falseRej,madeBad:G.madeBad,inTransit:G.parts.filter(p=>p.state==="belt"&&p.defect).length+G.boxes.filter(b=>b.defect&&(b.state==="live"||b.state==="targeted")).length,suspectShipped:G.suspectShipped,lots:G.suspect.length,t:Math.min(G.t,SHIFT)};
  const prev=loadBest(); r.newBest=r.score>prev; if(r.newBest) saveBest(r.score);
  tone(complete?SFX.win:SFX.over);
  setTimeout(()=>{ cancelAnimationFrame(raf); document.querySelectorAll(".banner-new").forEach(e=>e.remove()); renderEnd(r); },complete?500:1100);
}
function renderEnd(r){
  const k=rankFor(r), pct=Math.round(r.uptime*100), caught=r.pulled+r.heldBad+r.esc;
  const bar=(label,n,col,note)=>{ const w=caught?Math.round(100*n/caught):0; return `<div class="bar"><div class="bl"><b>${label}</b><span>${note}</span></div><div class="bt"><i style="width:${w}%;background:${col}"></i></div><div class="bn">${n}</div></div>`; };
  const line=!r.complete?"Three bad parts reached the customer. The problem started at a machine and nobody stopped it in time.":
    k===4?"Fixed at the source, caught on the line, nothing on the truck. That's the whole quality system working.":
    r.prevented<r.fixedDown?"We fixed more breakdowns than warnings. Every yellow light we catch is a lot we never have to contain.":
    r.esc?"Shift's done, but bad parts shipped. Catch them earlier next time.":"Good shift. Now push more of the fixes upstream.";
  $("end").innerHTML=`<div class="wrap">
    <div class="endhero" style="--rc:${r.complete?"var(--gold)":"var(--stop-hi)"};--rg:${r.complete?"rgba(255,204,31,.4)":"rgba(255,60,60,.4)"}">
      <img src="${r.complete?ASSETS.end_win:ASSETS.end_down}" alt="${r.complete?"The team celebrating":"The team after a failed shift"}">
      <div class="stamp"><h1>${r.complete?"SHIFT COMPLETE":"SHIFT FAILED"}</h1><div class="big">${r.esc}</div><small>Escapes to the customer</small></div>
    </div>
    <section class="panel callout"><div class="face">${face("mq",!r.complete?"frustrated":k>=3?"happy":"confident")}</div><div class="bubble"><small>Mister Quality</small>${line}</div></section>
    <section class="panel rankp"><div class="k">Team rank</div><div class="rankname">${RANKS[k]}</div>
      <div class="ladder">${RANKS.map((n,i)=>`<span class="${i===k?"on":""}">${n}</span>`).join("")}</div></section>
    <div class="banner"><span>Where it got caught</span></div>
    <section class="panel bars">
      <div class="prev"><b>${r.prevented}</b><span>Machines fixed on yellow. Every one cut off bad parts before they were made.</span></div>
      ${bar("Inspection",r.pulled,"var(--go)","Maya pulled it off the line")}
      ${bar("Containment",r.heldBad,"var(--warn)","Held at the dock")}
      ${bar("Escaped",r.esc,"var(--stop)","Reached the customer")}
      <p class="note">Bad parts made this shift: ${r.madeBad}${r.inTransit?` (${r.inTransit} still on the line when the shift ended, not yet caught or shipped)`:""}. The earlier a problem is caught, the cheaper it is: at the machine it costs a repair, on the line a scrapped part, at the dock a held lot, and at the customer a complaint or a recall.</p>
    </section>
    <div class="kpis">
      <div class="kpi"><b class="pos">${r.score}</b><span>${r.newBest?"New best score!":loadBest()>0?"Score · best "+loadBest():"Score"}</span></div>
      <div class="kpi"><b style="color:${pct>=90?"var(--go-hi)":pct>=75?"var(--warn-hi)":"var(--stop-hi)"}">${pct}%</b><span>Uptime</span></div>
      <div class="kpi"><b>${r.fixedDown}</b><span>Breakdowns fixed</span></div>
      <div class="kpi"><b>${r.held}</b><span>Boxes held</span></div>
      <div class="kpi"><b>${r.wrongHold+r.falseRej}</b><span>Good product rejected or held</span></div>
      <div class="kpi"><b>${r.suspectShipped}</b><span>Suspect boxes shipped</span></div>
    </div>
    <button class="cta" id="againBtn"><span>RUN ANOTHER SHIFT<small>${Math.max(r.score,loadBest())>0?"BEAT "+Math.max(r.score,loadBest()):"TRY AGAIN"}</small></span></button>
    <button class="cta alt" id="homeBtn"><span>BACK TO TITLE</span></button>
    <p class="foot">© 2026 Marcus Faulkner · Quality Rush · Mister Quality™</p>
  </div>`;
  show("end");
  $("againBtn").onclick=()=>{ tone(SFX.click); startGame(); };
  $("homeBtn").onclick=()=>{ tone(SFX.click); renderTitle(); show("title"); };
}

/* ===================== Boot ===================== */
const READY=loadAll();
(function boot(){ renderTitle(); show("title"); })();
