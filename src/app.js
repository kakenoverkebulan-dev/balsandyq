/* Витрина: правьте названия, описания, цены. p: null — цену не показываем (только подтверждённые владельцем цены) */
const SHOW = [
  {n:"Творожная тарталетка", d:"Свежая клубника, Ø6 см", p:5350, u:"кг", img:"tart"},
  {n:"Трубочки", d:"Творожный крем, сахарная пудра", p:5500, u:"кг", img:"trub"},
  {n:"Профитроли", d:"Заварное тесто, сливочный крем", p:6200, u:"кг", img:"prof"},
  {n:"Крембель", d:"Хрустящий крамбль, заварной крем", p:6200, u:"кг", img:"kreb"},
  {n:"Мини Павлова", d:"Меренга, клубника, фисташка", p:null, img:"pav"},
  {n:"Мини-тарт баноффи", d:"Банан, варёная сгущёнка, крем", p:null, img:"banm"},
  {n:"Творожные розетки", d:"Ягодное желе, кокос", p:null, img:"roz"},
  {n:"Торт клубника-ваниль", d:"Ванильный бисквит, клубника", p:10000, u:"кг", img:"kv"},
  {n:"Шоколадное печенье", d:"Мягкое, с тёмным шоколадом", p:190, u:"шт", img:"cook"},
  {n:"Мини-тарт «Сникерс»", d:"Шоколадное тесто, карамель, арахис", p:null, img:"snik"},
  {n:"Тирамису с белым шоколадом", d:"Савоярди, крем, какао", p:680, u:"шт", img:"tira"},
  {n:"Мусс «Три шоколада»", d:"Тёмный, молочный, белый шоколад", p:680, u:"шт", img:"muss"},
  {n:"Панна-котта с малиной", d:"Сливочная, малиновый соус", p:680, u:"шт", img:"panna"},
  {n:"Меренговый рулет", d:"Меренга, крем, клубника", p:7500, u:"шт", img:"rmer"},
  {n:"Фисташковый рулет", d:"Меренга, фисташковый крем, ягоды", p:9700, u:"шт", img:"rfis"},
  {n:"Рогалики со сгущёнкой", d:"Слоёные, варёная сгущёнка", p:5500, u:"кг", img:"rog"},
  {n:"Медовый торт", d:"Медовые коржи, нежный крем", p:7000, u:"кг", img:"med"},
  {n:"Торт «Милка»", d:"Шоколадный бисквит, ганаш, голубика", p:10000, u:"кг", img:"milka"},
  {n:"Орешки со сгущёнкой", d:"Песочное тесто, варёная сгущёнка", p:250, u:"шт", img:"oreh"},
  {n:"Мини-чизкейк «Манго-маракуйя»", d:"Сливочный сыр, манго, маракуйя", p:null, img:"mango"}
];
const SETS = [
  {ppl:"8–10", note:"человек", price:14990, img:"set8", items:[["Трубочки","10 шт","trub"],["Крембель","20 шт","kreb"],["Профитроли","10 шт","prof"],["Мини Павлова","8 шт","pav"]]},
  {ppl:"10–12", note:"человек · с тортом", price:31490, hot:true, img:"set10", items:[["Торт клубника-ваниль","1 шт","kv"],["Трубочки","500 г","trub"],["Крембель","500 г","kreb"],["Профитроли","500 г","prof"],["Мини Павлова","6 шт","pav"],["Розетки","500 г","roz"],["Баноффи","6 шт","banm"],["Творожный тарт","6 шт","tart"]]},
  {ppl:"15–20", note:"человек", price:43990, img:"set15", items:[["Трубочки","1 кг","trub"],["Крембель","1 кг","kreb"],["Профитроли","1 кг","prof"],["Мини Павлова","12 шт","pav"],["Розетки","1 кг","roz"],["Баноффи","12 шт","banm"],["Творожный тарт","12 шт","tart"]]}
];
const MORE = [
  ["Торты", [["«Карамельная девочка»",7500,"кг"],["Шоколадно-банановый",8000,"кг"],["Фисташка-малина",11000,"кг"]]],
  ["Чизкейки", [["«Тары» с клубничным соусом",12490,"шт"],["Сан-Себастьян",10000,"шт"],["«Классика» порционный"]]],
  ["Пироги и тарты на заказ", [["Пирог «Баноффи» Ø26 см",5300,"шт"],["Банановый пирог 20×30 см",9450,"шт"],["Пирог «Сникерс» Ø26 см",7500,"шт"],["Тарт со смородиной Ø24 см",4000,"шт"],["Творожник с ягодами 20×30 см",13000,"шт"],["Сметанник с персиками",4500,"шт"],["Лимонный кекс Ø26 см",7500,"шт"],["Шоколадный пирог с ганашем 20×30 см",15000,"шт"]]],
  ["Сытная выпечка", [["Пирог куриный",8000,"шт"],["Пирог мясной",9000,"шт"],["Киш с сёмгой и брокколи",8500,"шт"],["Самса с мясом",5500,"кг"],["Самса с курицей",4500,"кг"]]],
  ["Весовая выпечка", [["Вафли",2500,"кг"],["Сдобные булочки с молочной заливкой",2700,"кг"]]]
];

const fmt = (n,u) => n.toLocaleString("ru-RU").replace(/\s/g,"\u00a0") + "\u00a0₸" + (u ? "/" + u : "");
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

document.getElementById("heroImg").src = PHOTOS.table;
(() => {
  const slides = document.getElementById("slides"), cap = document.getElementById("slideCap");
  const seq = [["table","Дастархан BAL SANDYQ"],["pav","Мини Павлова"],["trub","Трубочки"],["tart","Творожная тарталетка"],["prof","Профитроли"],["banm","Мини-тарт баноффи"],["kv","Торт клубника-ваниль"]];
  for (const [k,c] of seq.slice(1)) { const im = new Image(); im.src = PHOTOS[k]; im.alt = c; slides.appendChild(im); }
  const imgs = [...slides.children]; let i = 0;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  setInterval(() => {
    if (document.hidden) return;
    imgs[i].classList.remove("on"); i = (i + 1) % imgs.length; imgs[i].classList.add("on");
    cap.style.opacity = 0; setTimeout(() => { cap.textContent = seq[i][1]; cap.style.opacity = 1; }, reduce ? 0 : 250);
  }, 3200);
})();
const T = ["Свежее каждый день","Қош келдіңіз","Доставка по Астане","Корпоративные заказы","Сэты на 8–20 человек","Фирменная коробка"];
const line = T.map(t=>`<span>${t}</span><b>✦</b>`).join("");
document.getElementById("ticker").innerHTML = line + line;
document.getElementById("feed").innerHTML = ["pav","trub","tart","prof","banm","roz"].map(k=>`<img src="${PHOTOS[k]}" alt="" loading="lazy">`).join("");

document.getElementById("grid").innerHTML = SHOW.map((i,k) => `
  <button class="card" type="button" data-k="${k}" aria-label="${esc(i.n)} — увеличить фото">
    <div class="ph"><img src="${PHOTOS[i.img]}" alt="${esc(i.n)}" loading="lazy"></div>
    <div class="c-line"><h3 class="c-name">${esc(i.n)}</h3>${i.p?`<span class="c-price">${fmt(i.p,i.u)}</span>`:""}</div>
    <p class="c-desc">${esc(i.d)}</p>
  </button>`).join("");

document.getElementById("setsBox").innerHTML = SETS.map(s => `
  <article class="set${s.hot?" hot":""}">
    <button class="set-ph" type="button" data-set="${s.img}" data-cap="Сэт на ${s.ppl} ${esc(s.note)}${s.price?" — "+fmt(s.price):""}" aria-label="Сэт на ${s.ppl} человек — увеличить фото"><img src="${PHOTOS[s.img]}" alt="Десерты сэта на ${s.ppl} человек на столе" loading="lazy">${s.hot?`<span class="badge">Самый полный</span>`:""}</button>
    <p class="ppl">${s.ppl}<small>${esc(s.note)}</small></p>${s.price?`<p class="s-price">${fmt(s.price)}</p>`:""}
    <ul>${s.items.map(([n,q])=>`<li>${esc(n)} <small>${esc(q)}</small></li>`).join("")}</ul>
  </article>`).join("");

document.getElementById("moreBox").innerHTML = MORE.map(([h,xs]) => `
  <div class="grp"><h3>${esc(h)}</h3><ul>${xs.map(([n,p,u])=>`<li><span>${esc(n)}</span>${p?`<b>${fmt(p,u)}</b>`:""}</li>`).join("")}</ul></div>`).join("");

const zoom = document.getElementById("zoom");
document.getElementById("grid").addEventListener("click", e => {
  const c = e.target.closest(".card"); if (!c) return;
  const i = SHOW[+c.dataset.k];
  document.getElementById("zoomImg").src = PHOTOS[i.img];
  document.getElementById("zoomImg").alt = i.n;
  document.getElementById("zoomName").textContent = i.n + (i.p ? " — " + fmt(i.p,i.u) : "");
  document.getElementById("zoomDesc").textContent = i.d;
  try { zoom.showModal(); } catch { zoom.setAttribute("open",""); }
});
document.getElementById("setsBox").addEventListener("click", e => {
  const b = e.target.closest(".set-ph"); if (!b) return;
  document.getElementById("zoomImg").src = PHOTOS[b.dataset.set];
  document.getElementById("zoomImg").alt = b.dataset.cap;
  document.getElementById("zoomName").textContent = b.dataset.cap;
  document.getElementById("zoomDesc").textContent = "Всё, что входит в сэт";
  try { zoom.showModal(); } catch { zoom.setAttribute("open",""); }
});
document.getElementById("zoomClose").addEventListener("click", () => zoom.close());
zoom.addEventListener("click", e => { if (e.target === zoom) zoom.close(); });

for (const a of document.querySelectorAll('a[href^="#"]')) a.addEventListener("click", e => {
  const t = document.getElementById(a.getAttribute("href").slice(1));
  if (t) { e.preventDefault(); t.scrollIntoView({block:"start"}); }
});

const fl = document.getElementById("float");
try {
  new IntersectionObserver(es => es.forEach(en => fl.classList.toggle("off", en.isIntersecting)), {threshold:0.05})
    .observe(document.getElementById("order"));
} catch {}

document.getElementById("copyPhone").addEventListener("click", e => {
  const b = e.currentTarget, el = document.getElementById("phone");
  const sel = () => { const r=document.createRange(); r.selectNodeContents(el); const s=getSelection(); s.removeAllRanges(); s.addRange(r); };
  try { navigator.clipboard.writeText(el.textContent).then(() => { b.textContent="Номер скопирован"; setTimeout(()=>b.textContent="Скопировать номер",2000); }).catch(sel); } catch { sel(); }
});
