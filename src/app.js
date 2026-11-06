/* Витрина: правьте названия, описания, цены. p: null — цену не показываем */
const SHOW = [
  {n:"Творожная тарталетка", d:"Свежая клубника, Ø6 см", p:null, img:"tart"},
  {n:"Трубочки", d:"Творожный крем, сахарная пудра", p:null, img:"trub"},
  {n:"Профитроли", d:"Заварное тесто, сливочный крем", p:null, img:"prof"},
  {n:"Крембель", d:"Хрустящий крамбль, заварной крем", p:null, img:"kreb"},
  {n:"Мини Павлова", d:"Меренга, клубника, фисташка", p:null, img:"pav"},
  {n:"Мини-тарт баноффи", d:"Банан, варёная сгущёнка, крем", p:null, img:"banm"},
  {n:"Творожные розетки", d:"Ягодное желе, кокос", p:null, img:"roz"},
  {n:"Торт клубника-ваниль", d:"Ванильный бисквит, клубника", p:null, img:"kv"},
  {n:"Шоколадное печенье", d:"Мягкое, с тёмным шоколадом", p:null, img:"cook"}
];
const SETS = [
  {ppl:"8–10", note:"человек", items:["Трубочки 10","Крембель 20","Профитроли 10","Павлова 8"]},
  {ppl:"10–12", note:"человек · с тортом", hot:true, items:["Трубочки","Крембель","Профитроли","Павлова 6","Розетки","Баноффи 6","Творожный тарт 6","Торт клубника-ваниль"]},
  {ppl:"15–20", note:"человек", items:["Трубочки 1 кг","Крембель 1 кг","Профитроли 1 кг","Павлова 12","Розетки 1 кг","Баноффи 12","Творожный тарт 12"]}
];
const MORE = [
  ["Торты", ["Медовый","«Милка»","«Карамельная девочка»","Шоколадно-банановый"]],
  ["Чизкейки", ["«Тары» с обжаренным тары","Сан-Себастьян","«Классика» порционный"]],
  ["Пироги и тарты", ["Баноффи пай","Банановый пирог","Тарт со смородиной","Творожник","Мини-тарт «Сникерс»"]],
  ["Рулеты", ["Фисташковый","Меренговый"]],
  ["В стаканчиках", ["Тирамису с белым шоколадом","Панна-котта с малиной","Мусс «Три шоколада»"]],
  ["Выпечка", ["Рогалики со сгущёнкой","Вафли"]]
];

const fmt = n => n.toLocaleString("ru-RU").replace(/ /g," ") + " ₸";
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
    <div class="c-line"><h3 class="c-name">${esc(i.n)}</h3>${i.p?`<span class="c-price">${fmt(i.p)}</span>`:""}</div>
    <p class="c-desc">${esc(i.d)}</p>
  </button>`).join("");

document.getElementById("setsBox").innerHTML = SETS.map(s => `
  <article class="set${s.hot?" hot":""}">
    ${s.hot?`<span class="badge">Самый полный</span>`:""}
    <p class="ppl">${s.ppl}<small>${esc(s.note)}</small></p>
    <ul>${s.items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
  </article>`).join("");

document.getElementById("moreBox").innerHTML = MORE.map(([h,xs]) => `
  <div class="grp"><h3>${esc(h)}</h3><p>${xs.map(x=>`<span>${esc(x)}</span>`).join("")}</p></div>`).join("");

const zoom = document.getElementById("zoom");
document.getElementById("grid").addEventListener("click", e => {
  const c = e.target.closest(".card"); if (!c) return;
  const i = SHOW[+c.dataset.k];
  document.getElementById("zoomImg").src = PHOTOS[i.img];
  document.getElementById("zoomImg").alt = i.n;
  document.getElementById("zoomName").textContent = i.n + (i.p ? " — " + fmt(i.p) : "");
  document.getElementById("zoomDesc").textContent = i.d;
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
