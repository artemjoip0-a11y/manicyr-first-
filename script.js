let S=JSON.parse(JSON.stringify(window.SITE_DATA));
const app=document.getElementById('app');
let admin=false;
try{admin=sessionStorage.getItem('adm')==='1'}catch(e){}
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function toast(t){const m=document.createElement('div');m.className='msg';m.textContent=t;document.body.appendChild(m);setTimeout(()=>m.remove(),2600)}
function render(){
  const vk=esc(S.vk),book=`<a class="btn" href="${vk}" target="_blank" rel="noopener">Записаться ВКонтакте</a>`;
  const pr=S.prices.map((x,i)=>admin?
   `<div class="edit"><input class="w" data-k="prices.${i}.n" value="${esc(x.n)}" placeholder="Услуга"><input class="w" data-k="prices.${i}.d" value="${esc(x.d)}" placeholder="Описание"><div style="display:flex;gap:8px"><input class="w" data-k="prices.${i}.p" value="${esc(x.p)}" placeholder="Цена"><button class="x" data-act="delp" data-i="${i}" title="Удалить">✕</button></div></div>`:
   `<div class="row"><div class="n">${esc(x.n)}<div class="d">${esc(x.d)}</div></div><div class="p">${esc(x.p)}</div></div>`).join('');
  const wk=S.works.map((w,i)=>`<div class="work tilt rv"><div class="im"><img src="${w.src}" alt="${esc(w.c||'Работа мастера, Арзамас')}" data-act="zoom" data-i="${i}"></div>${admin?`<div class="c"><input class="w" data-k="works.${i}.c" value="${esc(w.c)}" placeholder="Подпись"><button class="x" data-act="delw" data-i="${i}">✕ удалить</button></div>`:(w.c?`<div class="c">${esc(w.c)}</div>`:'')}</div>`).join('');
  const ct=admin?`<div class="edit"><input class="w" data-k="name" value="${esc(S.name)}" placeholder="Название"><textarea class="w" data-k="tagline" rows="3" placeholder="Описание">${esc(S.tagline)}</textarea><input class="w" data-k="vk" value="${esc(S.vk)}" placeholder="Ссылка ВК для записи"><input class="w" data-k="phone" value="${esc(S.phone)}" placeholder="Телефон (необязательно)"><input class="w" data-k="address" value="${esc(S.address)}" placeholder="Адрес"></div>`:
   `<div class="card contacts tilt rv"><div>📍 ${esc(S.address)}</div>${S.phone?`<div>📞 <a href="tel:${esc(String(S.phone).replace(/[^\d+]/g,''))}">${esc(S.phone)}</a></div>`:''}<div>💬 <a href="${vk}" target="_blank" rel="noopener">Мы ВКонтакте</a></div></div>`;
  app.innerHTML=(admin?`<div class="bar"><b>Режим мастера</b><button class="btn sm" data-act="save">💾 Скачать data.js</button><button class="btn sm sec" data-act="logout">Выйти</button></div>`:'')+
  `<div class="hero"><div class="wrap"><nav><b>${esc(S.name)}</b><div><a href="#prices">Прайс</a><a href="#works">Работы</a><a href="#contacts">Контакты</a><a class="btn sm" href="${vk}" target="_blank" rel="noopener">Записаться</a></div></nav>
  <div class="hc"><div class="scene"><div class="rig"><div class="orb o1"></div><div class="orb o2"></div><div class="nails">${[['-22','26','#ff8fb5','#c9386d'],['-11','6','#f8cdbf','#e39a89'],['0','-8','#c3adff','#7b5ce6'],['11','6','#ff6a80','#b3123b'],['22','26','#ffd6e8','#f08fbd']].map((n,i)=>`<div class="nl" style="--r:${n[0]}deg;--y:${n[1]}px;--c1:${n[2]};--c2:${n[3]};--d:${i*.35}s"><div class="n3"></div></div>`).join('')}</div><i class="sp s1">✦</i><i class="sp s2">✦</i><i class="sp s3">✧</i><i class="sp s4">✦</i></div></div><span class="tag">✨ Арзамас</span><h1>Маникюр <span>Арзамас</span></h1><p>${esc(S.tagline)}</p>${book}</div></div></div>
  <div class="wrap"><div class="perks"><div class="perk tilt rv"><i>🧼</i><b>Стерильность</b><span>Обработка инструментов после каждого клиента</span></div><div class="perk tilt rv"><i>💎</i><b>Стойкое покрытие</b><span>Держится без сколов до 4 недель</span></div><div class="perk tilt rv"><i>🌸</i><b>Дизайн на любой вкус</b><span>От нежных оттенков до сложных рисунков</span></div></div>
  <section id="prices"><h2>Прайс</h2><p class="sub">Цены на услуги</p>${admin?pr+`<button class="btn sec sm" data-act="addp">+ Добавить услугу</button>`:`<div class="card rv">${pr||'<div class="empty">Скоро здесь появятся цены</div>'}</div>`}</section>
  <section id="works"><h2>Мои работы</h2><p class="sub">Примеры маникюра</p>${admin?`<div style="text-align:center;margin-bottom:16px"><label class="btn sec sm">+ Добавить фото<input id="file" type="file" accept="image/*" multiple hidden></label></div>`:''}${wk?`<div class="grid">${wk}</div>`:'<div class="empty">Скоро здесь появятся работы</div>'}</section>
  <div class="cta rv"><h2>Запишитесь на маникюр</h2><p>Выберите удобное время в личных сообщениях ВКонтакте</p>${book}</div>
  <section id="contacts"><h2>Контакты</h2><p class="sub">Мы находимся в Арзамасе</p>${ct}</section>
  <footer>© ${esc(S.name)} ${admin?'':'· <a data-act="login">Вход для мастера</a>'}</footer></div>`;fx();
}
app.addEventListener('input',e=>{
  const k=e.target.dataset.k;if(!k)return;
  const p=k.split('.');let o=S;while(p.length>1)o=o[p.shift()];o[p[0]]=e.target.value;
});
app.addEventListener('change',async e=>{
  if(e.target.id!=='file')return;
  for(const f of e.target.files){try{S.works.unshift({src:await shrink(f),c:''})}catch(x){toast('Не удалось загрузить фото')}}
  render();
});
function shrink(f){return new Promise((ok,no)=>{const u=URL.createObjectURL(f),im=new Image();
  im.onload=()=>{const m=900,r=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*r;c.height=im.height*r;c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);ok(c.toDataURL('image/jpeg',.8))};
  im.onerror=no;im.src=u})}
app.addEventListener('click',async e=>{
  const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act,i=+t.dataset.i;
  if(a==='login')return loginBox();
  if(a==='logout'){admin=false;try{sessionStorage.removeItem('adm')}catch(x){};render()}
  if(a==='addp'){S.prices.push({n:'',d:'',p:''});render()}
  if(a==='delp'){S.prices.splice(i,1);render()}
  if(a==='delw'){S.works.splice(i,1);render()}
  if(a==='zoom'&&!admin){const m=document.createElement('div');m.className='modal';m.innerHTML=`<img src="${S.works[i].src}" alt="">`;m.onclick=()=>m.remove();document.body.appendChild(m)}
  if(a==='save')save();
});
let io,fxInit=false;
function fx(){
  const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,els=app.querySelectorAll('.rv');
  if(admin||rm||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'))}
  else{io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}
  if(fxInit||rm)return;fxInit=true;
  document.addEventListener('pointermove',e=>{
    const t=e.target.closest&&e.target.closest('.tilt:not(.rv:not(.in))');
    document.querySelectorAll('.tilt.on').forEach(x=>{if(x!==t){x.classList.remove('on');x.style.transform=''}});
    if(t&&!admin){const r=t.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;t.classList.add('on');t.style.transform=`perspective(800px) rotateY(${px*14}deg) rotateX(${-py*14}deg) translateZ(10px)`}
    const h=document.querySelector('.hero');if(h){h.style.setProperty('--mx',((e.clientX/innerWidth-.5)*2).toFixed(2));h.style.setProperty('--my',((e.clientY/innerHeight-.5)*2).toFixed(2))}
  });
  addEventListener('scroll',()=>document.documentElement.style.setProperty('--sy',scrollY),{passive:true});
}
function loginBox(){
  const m=document.createElement('div');m.className='modal';
  m.innerHTML=`<div class="box"><b>Вход для мастера</b><input id="pw" type="password" placeholder="Пароль" autocomplete="off"><p class="err" id="er"></p><button class="btn" id="go">Войти</button><button class="btn sec" id="cx">Отмена</button></div>`;
  document.body.appendChild(m);const pw=m.querySelector('#pw');pw.focus();
  const go=()=>{if(pw.value==='admin123'){admin=true;try{sessionStorage.setItem('adm','1')}catch(x){};m.remove();render()}else m.querySelector('#er').textContent='Неверный пароль'};
  m.querySelector('#go').onclick=go;m.querySelector('#cx').onclick=()=>m.remove();pw.onkeydown=e=>{if(e.key==='Enter')go()};
}
function save(){
  const txt='window.SITE_DATA = '+JSON.stringify(S,null,1)+';\n';
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/javascript'}));a.download='data.js';a.click();
  toast('Скачан data.js. Загрузите его на хостинг вместо старого');
}
render();
