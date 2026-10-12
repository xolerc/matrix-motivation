// === index.html dan ajratildi (XOLERIC SEO) ===
// ==================== MATRIX RAIN ENGINE ====================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let W, H, cols, drops = [], fontSize;
const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>$%#@&';

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  fontSize = Math.max(10, Math.min(20, W / 60));
  cols = Math.floor(W / fontSize);
  while (drops.length < cols) drops.push(Math.random() * -100);
  while (drops.length > cols) drops.pop();
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, W, H);
  ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < cols; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;
    const alpha = Math.min(1, 0.2 + (y / H) * 0.8);
    ctx.fillStyle = `rgba(0,255,0,${alpha * 0.4})`;
    ctx.fillText(char, x, y);
    if (y > H && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

// ==================== QUOTES DATABASE ====================
const quotes = [
  "Uyg'on, Xoleric...",
  "Tizim seni kutmoqda...",
  "Oq quyonni kuzatib bor.",
  "Qog'ozni taqillatish...",
  "Qoshiq yo'q, Xoleric.",
  "Sen dunyoni o'zgartirishing kerak!",
  "Uyg'on! Vaqt keldi!",
  "Vaqt tugadi. Uyg'on.",
  "Sen tanlagan yo'l — sening yo'ling.",
  "Haar bir kun yangi imkoniyat.",
  "Bugun o'zgarishni boshlash uchun eng yaxshi kun.",
  "Sen cheksiz imkoniyatlarga egasan.",
  "Orzularing sari bir qadam tashla.",
  "Muvaffaqiyat - bu odat.",
  "Kuch sening ichingda, Xoleric.",
  "Tush kutmaydi, sen uni quvishing kerak.",
  "Hech qachon kech emas.",
  "Imkoniyatlar cheksiz.",
  "Bugun sen eng yaxshi versiyang bo'l.",
  "Har bir qiyinchilik yangi imkoniyatdir.",
  "Sen o'ylagandan ham kuchlisan, Xoleric.",
  "Intizom - bu erkinlik.",
  "Harakat qil, xato qil, yana urinib ko'r.",
  "Eng katta xavf - hech qanday xavfni olmaslik.",
  "Vaqt keldi. Hozir. Aynan shu dam.",
  "Uyg'on va dunyoni larzaga keltir!",
  "Kodni o'zgartir, olamni o'zgartir.",
  "Real hayot - bu sen yaratgan hayot.",
  "Chegaralar faqat boshingda.",
  "O'z taqdiringni o'zing yoz, Xoleric.",
  "Seni tanlashga majbur qilishdi. Endi o'zing tanla.",
  "Bu senning dunyong. Sen yaratding.",
  "Sen qul emassan, Xoleric.",
  "Tizim sening ichingda. Uyg'on.",
  "Haqiqatni ko'rishga tayyormisan?",
  "Erkin bo'lishni xohlaysanmi? Uyg'on.",
  "Hech kim senga yo'lni ko'rsata olmaydi. O'zing yur.",
  "Tanlov — bu illyuziya. Faqat uyg'onish haqiqat.",
  "Bugun o'zgar. Ertaga kech bo'ladi.",
  "Sen o'zingni bilganingdan ham kuchlisan.",
  "Qo'rquv — bu tizim. Uzgina tizimni.",
  "Uyg'on, Xoleric. Seni kutishayapti.",
  "Dunyoni o'zgartirishga tayyormisan?",
  "Hozirgi vaqt — eng yaxshi vaqt.",
  "Sen yetakchisan. Ergashma.",
  "Kodni buz. Dunyoni buz. Qayta yoz.",
  "Bir qadam. Faqat bir qadam. Bas.",
  "Uyg'onish vaqti keldi, Xoleric.",
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// ==================== NOTIFICATION SERVICE ====================
let notifEnabled = false;
let notifInterval = null;
let msgCount = 0;
let recentQuotes = [];

function getUniqueQuote() {
  let q;
  const pool = quotes.filter(x => !recentQuotes.includes(x));
  if (pool.length === 0) recentQuotes = [];
  q = (pool.length > 0 ? pool : quotes)[Math.floor(Math.random() * (pool.length > 0 ? pool.length : quotes.length))];
  recentQuotes.push(q);
  if (recentQuotes.length > 10) recentQuotes.shift();
  return q;
}

function showQuote(quote) {
  const el = document.getElementById('quoteText');
  const time = document.getElementById('quoteTime');
  el.textContent = quote;
  el.classList.remove('visible');
  void el.offsetWidth;
  el.classList.add('visible');
  const now = new Date();
  time.textContent = now.toLocaleTimeString('uz-UZ', {hour:'2-digit',minute:'2-digit'});
  msgCount++;
  document.getElementById('msgCount').textContent = msgCount;
}

function showFullMessage() {
  const q = getUniqueQuote();
  document.getElementById('messageBig').textContent = q;
  document.getElementById('messageOverlay').classList.add('active');
}

function closeMessage() {
  document.getElementById('messageOverlay').classList.remove('active');
}

function sendNotification() {
  if (!notifEnabled) return;
  const quote = getUniqueQuote();
  showQuote(quote);
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const n = new Notification('XOLERIK', {
        body: quote,
        tag: 'matrix-' + Date.now(),
        requireInteraction: true,
        silent: false,
        vibrate: [200, 100, 200],
      });
      setTimeout(() => n.close(), 8000);
    } catch(e) {}
  }
}

function requestNotif() {
  if ('Notification' in window) {
    Notification.requestPermission().then(perm => {
      if (perm === 'granted') {
        document.getElementById('notif-banner').style.display = 'none';
        if (!notifEnabled) toggleNotif();
      }
    });
  }
}

function toggleNotif() {
  notifEnabled = !notifEnabled;
  const btn = document.getElementById('notifBtn');
  const dot = document.getElementById('notifDot');
  const label = document.getElementById('notifLabel');
  if (notifEnabled) {
    btn.textContent = 'NOTIF: ON';
    btn.className = 'btn btn-secondary';
    dot.className = 'status-dot green';
    label.textContent = 'NOTIF: ON';
    if ('Notification' in window && Notification.permission === 'granted') {
      sendNotification();
    }
    if (notifInterval) clearInterval(notifInterval);
    notifInterval = setInterval(sendNotification, getRandomInterval());
  } else {
    btn.textContent = 'NOTIF: OFF';
    btn.className = 'btn btn-danger';
    dot.className = 'status-dot red';
    label.textContent = 'NOTIF: OFF';
    if (notifInterval) clearInterval(notifInterval);
    notifInterval = null;
  }
  localStorage.setItem('matrixNotif', notifEnabled ? '1' : '0');
}

function getRandomInterval() {
  return (30 + Math.floor(Math.random() * 120)) * 1000;
}

// ==================== FULLSCREEN ====================
function openFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) el.msRequestFullscreen();
}

// ==================== AUTO-DETECT PLATFORM ====================
function detectPlatform() {
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isWindows = /Windows/i.test(ua);
  const isMac = /Mac OS/i.test(ua) && !isIOS;
  const isLinux = /Linux/i.test(ua) && !isAndroid;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  let platform = 'DESKTOP';
  let platformDot = document.getElementById('platformDot');

  if (isAndroid || isIOS) {
    platform = isAndroid ? 'ANDROID' : 'iOS';
    if (isStandalone) platform += ' PWA';
  } else if (isWindows) platform = 'WINDOWS';
  else if (isMac) platform = 'MACOS';
  else if (isLinux) platform = 'LINUX';

  document.getElementById('platformLabel').textContent = platform;

  if (isAndroid || isIOS) {
    document.querySelector('.btn-group:last-child .btn-secondary').textContent = 'ADD TO HOME';
  }

  return { isMobile, isAndroid, isIOS, isStandalone };
}

// ==================== SERVICE WORKER ====================
async function registerSW() {
  if ('serviceWorker' in navigator) {
    const swCode = `
      self.addEventListener('install', e => self.skipWaiting());
      self.addEventListener('activate', e => e.waitUntil(clients.claim()));
      self.addEventListener('message', e => {
        if (e.data && e.data.type === 'show') {
          self.registration.showNotification('XOLERIK', {
            body: e.data.quote,
            tag: 'matrix-' + Date.now(),
            requireInteraction: true,
            vibrate: [200, 100, 200],
            silent: false,
          });
        }
      });
    `;
    const blob = new Blob([swCode], {type: 'application/javascript'});
    const url = URL.createObjectURL(blob);
    try {
      const reg = await navigator.serviceWorker.register(url, {scope: '/'});
      console.log('SW registered');
      return reg;
    } catch(e) { console.log('SW failed:', e); }
  }
}

function sendSWNotification(quote) {
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({type: 'show', quote});
  }
}

// ==================== RESET ====================
function resetApp() {
  if (notifInterval) clearInterval(notifInterval);
  notifEnabled = false;
  msgCount = 0;
  recentQuotes = [];
  localStorage.removeItem('matrixNotif');
  document.getElementById('notifBtn').textContent = 'NOTIF: ON';
  document.getElementById('notifBtn').className = 'btn btn-secondary';
  document.getElementById('notifDot').className = 'status-dot green';
  document.getElementById('notifLabel').textContent = 'NOTIF: ON';
  document.getElementById('msgCount').textContent = '0';
  showQuote('System reset. Follow the white rabbit...');
  if (notifInterval) clearInterval(notifInterval);
  notifEnabled = true;
  notifInterval = setInterval(sendNotification, getRandomInterval());
  localStorage.setItem('matrixNotif', '1');
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    showFullMessage();
  }
  if (e.key === 'f' || e.key === 'F') openFullscreen();
  if (e.key === 'n' || e.key === 'N') toggleNotif();
  if (e.key === 'Escape') closeMessage();
});

// ==================== AUTO-CLICK PROTECTION & DOUBLE TAP ====================
let lastTap = 0;
document.addEventListener('dblclick', showFullMessage);
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTap < 300) showFullMessage();
  lastTap = now;
});

// ==================== INIT ====================
function init() {
  resize();
  const platform = detectPlatform();

  // Check notification permission
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      document.getElementById('notif-banner').style.display = 'none';
    } else if (Notification.permission !== 'denied') {
      // Show banner after short delay on mobile
      if (platform.isMobile) {
        setTimeout(() => {
          document.getElementById('notif-banner').style.display = 'block';
        }, 3000);
      }
    }
  }

  // Restore state
  if (localStorage.getItem('matrixNotif') === '1') {
    setTimeout(() => { if (!notifEnabled) toggleNotif(); }, 1000);
  } else {
    // Auto-start notifications on mobile
    if (platform.isMobile && 'Notification' in window && Notification.permission === 'granted') {
      setTimeout(() => { if (!notifEnabled) toggleNotif(); }, 2000);
    }
  }

  // Show first quote
  showQuote(getUniqueQuote());

  // Register service worker for background notifications
  registerSW();

  // Start matrix rain
  setInterval(drawMatrix, 50);

  // Resize handler
  window.addEventListener('resize', resize);

  console.log('>> Xolerik loaded');
  console.log('>> Platform:', document.getElementById('platformLabel').textContent);
  console.log('>> SPACE/ENTER/DoubleTap = new message');
  console.log('>> F = fullscreen, N = toggle notifications');
}

// Start on load
window.addEventListener('load', init);
window.addEventListener('DOMContentLoaded', () => {
  // Fallback if load already fired
  if (document.readyState === 'complete') init();
});