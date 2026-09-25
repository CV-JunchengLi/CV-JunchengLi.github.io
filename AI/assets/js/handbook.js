/* ============ 渲染 ============ */
const __HB = (window.HANDBOOKS || {})[window.HB_CURRENT];
if(!__HB) throw new Error("手册数据未加载：请确认 data-*.js 先于 handbook.js 引入");
const {PHASES, MILESTONES, FAQS, STORE_KEY} = __HB;

let store = {};
try{ store = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }catch(e){ store = {}; }

const TYPE_COLOR = {"视频":"t-video","教材":"t-book","文档":"t-doc","论文":"t-paper","工具":"t-tool","数据":"t-data","实战":"t-handson"};
const PRIO_LABEL = {1:"必做",2:"推荐",3:"选学"};

const phasesEl = document.getElementById("phases");
const overviewEl = document.getElementById("overviewGrid");

PHASES.forEach((ph, pi)=>{
  // 总览小卡（进度按核心资源计）
  const total = ph.resources.length;
  const coreN = ph.resources.filter(r=>r.p===1).length;
  const coreDone = ph.resources.filter((r,ri)=>r.p===1 && store[`r${pi}-${ri}`]).length;
  overviewEl.insertAdjacentHTML("beforeend",`
    <a class="phase-tile reveal" href="#${ph.id}" aria-label="进入阶段${ph.num}：${ph.title}">
      <div class="pt-top">
        <span class="seal">${ph.num}</span>
        <div><h3>${ph.title}</h3><span class="pt-weeks">${ph.weeks}</span></div>
      </div>
      <p>${ph.goal.replace(/<[^>]+>/g,"").slice(0,42)}…</p>
      <div class="pt-bar"><i data-phase-bar="${pi}" style="width:${Math.round(coreDone/coreN*100)}%"></i></div>
      <div class="pt-foot">
        <span class="only-core">核心 ${coreN} 项</span>
        <span class="only-all">共 ${total} 项</span>
        <span data-phase-count="${pi}">${coreDone} / ${coreN} 核心</span>
      </div>
    </a>`);

  // 阶段大区块
  const cards = ph.resources.map((r,ri)=>{
    const id = `r${pi}-${ri}`;
    const checked = store[id] ? "checked" : "";
    return `
    <article class="card ${store[id]?"is-done":""}" data-type="${r.type}" data-p="${r.p}" data-id="${id}">
      <div class="card-tags">
        <span class="tag tag-${r.type}">${r.type}</span>
        <span class="prio prio-${r.p}">${PRIO_LABEL[r.p]}</span>
      </div>
      <h3>${r.t}</h3>
      <p class="src">${r.s}</p>
      <p class="desc">${r.d}</p>
      <div class="card-foot">
        <a class="card-link" href="${r.url}" target="_blank" rel="noopener noreferrer">
          前往学习
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3h7v7M13 3 7.5 8.5M13 10v2.5A1.5 1.5 0 0 1 11.5 14h-7A1.5 1.5 0 0 1 3 12.5v-7A1.5 1.5 0 0 1 4.5 4H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <label class="check">
          <input type="checkbox" ${checked} aria-label="标记为已完成：${r.t}" />
          已学完
        </label>
      </div>
    </article>`;
  }).join("");

  phasesEl.insertAdjacentHTML("beforeend",`
    <section class="phase" id="${ph.id}" aria-labelledby="${ph.id}-title">
      <div class="container">
        <div class="phase-head reveal">
          <span class="seal" aria-hidden="true">${ph.num}</span>
          <div>
            <h2 id="${ph.id}-title">${ph.title}</h2>
            <div class="phase-meta">
              <span class="chip">${ph.weeks}</span>
              <span class="chip only-core">核心 ${ph.resources.filter(r=>r.p===1).length} 项</span>
              <span class="chip only-all">共 ${ph.resources.length} 项 · 核心 ${ph.resources.filter(r=>r.p===1).length} 项</span>
              ${ph.related ? `<a class="chip chip-link" href="${ph.related.href}">↗ ${ph.related.label}</a>` : ""}
            </div>
          </div>
        </div>
        <div class="phase-goal reveal">
          <b>阶段目标：</b>${ph.goal}
          <div class="outcomes">${ph.outcomes.map(o=>`<span>✓ ${o}</span>`).join("")}</div>
        </div>
        ${ph.pitfalls ? `
        <div class="pitfalls reveal">
          <b>常见误区</b>
          <ul>${ph.pitfalls.map(p=>`<li>${p}</li>`).join("")}</ul>
        </div>` : ""}
        <div class="legend reveal" aria-hidden="true">
          <span><i style="background:var(--t-video)"></i>视频课程</span>
          <span><i style="background:var(--t-book)"></i>教材</span>
          <span><i style="background:var(--t-doc)"></i>文档/教程</span>
          <span><i style="background:var(--t-paper)"></i>论文</span>
          <span><i style="background:var(--t-tool)"></i>工具框架</span>
          <span><i style="background:var(--t-data)"></i>数据集</span>
          <span><i style="background:var(--t-handson)"></i>实战项目</span>
        </div>
        <div class="card-grid">${cards}</div>
        ${ph.resources.some(r=>r.p!==1) ? `
        <div class="extra-hint only-core">
          <span>本阶段另有 <strong>${ph.resources.length - ph.resources.filter(r=>r.p===1).length}</strong> 项拓展资源，按兴趣或课题需要选学即可，不要求完成。</span>
          <button type="button" class="link-btn" data-showall>显示全部资源</button>
        </div>
        <div class="extra-hint only-all" style="border-style:solid;background:var(--pine-soft);border-color:var(--pine-soft)">
          <span>当前显示全部资源，其中 <strong>${ph.resources.filter(r=>r.p===1).length}</strong> 项为核心必学；优先完成核心项。</span>
          <button type="button" class="link-btn" data-showcore>只看核心</button>
        </div>` : ""}
      </div>
    </section>`);
});

/* 里程碑 */
const msEl = document.getElementById("milestoneList");
MILESTONES.forEach((m,i)=>{
  const id = `m${i}`;
  msEl.insertAdjacentHTML("beforeend",`
    <div class="ms-item reveal ${store[id]?"is-done":""}" data-mid="${id}">
      <div class="ms-node" aria-hidden="true">${i+1}</div>
      <div class="ms-body">
        <h3><label class="check"><input type="checkbox" ${store[id]?"checked":""} aria-label="标记里程碑${i+1}已完成" /></label>${m.t}<span class="ms-when">${m.when}</span></h3>
        <p>${m.d}</p>
        <span class="deliver">${m.deliver}</span>
      </div>
    </div>`);
});

/* FAQ */
document.getElementById("faqList").innerHTML = FAQS.map(f=>`
  <details class="faq reveal">
    <summary>${f.q}</summary>
    <div class="faq-a">${f.a}</div>
  </details>`).join("");

/* ============ 进度逻辑 ============ */
const ringFill = document.getElementById("ringFill");
const ringPct = document.getElementById("ringPct");
const progressText = document.getElementById("progressText");
const C = 2 * Math.PI * 10.5;
ringFill.setAttribute("stroke-dasharray", C.toFixed(1));

function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(store)); }catch(e){} }

function updateProgress(){
  // 进度环始终只统计「核心必做」资源
  const coreTotal = PHASES.reduce((s,p)=>s+p.resources.filter(r=>r.p===1).length,0);
  let coreDoneAll = 0;
  PHASES.forEach((p,pi)=>{
    let coreN = 0, coreDone = 0, allDone = 0;
    p.resources.forEach((r,ri)=>{
      const d = !!store[`r${pi}-${ri}`];
      if(d) allDone++;
      if(r.p===1){ coreN++; if(d){coreDone++; coreDoneAll++;} }
    });
    const bar = document.querySelector(`[data-phase-bar="${pi}"]`);
    const cnt = document.querySelector(`[data-phase-count="${pi}"]`);
    if(bar) bar.style.width = `${Math.round(coreDone/coreN*100)}%`;
    if(cnt) cnt.textContent = mode==="core"
      ? `${coreDone} / ${coreN} 核心`
      : `${allDone} / ${p.resources.length} 已学（核心 ${coreDone}/${coreN}）`;
  });
  const pct = Math.round(coreDoneAll/coreTotal*100);
  ringFill.setAttribute("stroke-dashoffset", (C*(1-coreDoneAll/coreTotal)).toFixed(1));
  ringPct.textContent = pct + "%";
  progressText.textContent = `核心 ${coreDoneAll} / ${coreTotal}`;
}

/* ============ 核心 / 拓展 视图切换 ============ */
let mode = "core";
try{ mode = localStorage.getItem("medimg-roadmap-mode") === "all" ? "all" : "core"; }catch(e){}
function applyMode(scrollToOverview){
  document.body.dataset.mode = mode;
  document.querySelectorAll("[data-modebtn]").forEach(b=>{
    b.classList.toggle("active", b.dataset.modebtn === mode);
    b.setAttribute("aria-pressed", b.dataset.modebtn === mode ? "true" : "false");
  });
  try{ localStorage.setItem("medimg-roadmap-mode", mode); }catch(e){}
  updateProgress();
  if(scrollToOverview) document.getElementById("overview").scrollIntoView({behavior:"smooth"});
}
document.addEventListener("click", e=>{
  const mb = e.target.closest("[data-modebtn]");
  if(mb){ mode = mb.dataset.modebtn; applyMode(false); return; }
  if(e.target.closest("[data-showall]")){ mode = "all"; applyMode(true); return; }
  if(e.target.closest("[data-showcore]")){ mode = "core"; applyMode(false); }
});

document.addEventListener("change", e=>{
  if(!e.target.matches("input[type=checkbox]")) return;
  const card = e.target.closest(".card");
  const ms = e.target.closest(".ms-item");
  if(card){
    const id = card.dataset.id;
    store[id] = e.target.checked;
    card.classList.toggle("is-done", e.target.checked);
  }else if(ms){
    const id = ms.dataset.mid;
    store[id] = e.target.checked;
    ms.classList.toggle("is-done", e.target.checked);
  }
  save(); updateProgress();
});

document.getElementById("resetBtn").addEventListener("click", ()=>{
  if(!confirm("确定要清空本机保存的全部学习进度吗？")) return;
  store = {};
  save();
  document.querySelectorAll(".card").forEach(c=>c.classList.remove("is-done"));
  document.querySelectorAll(".ms-item").forEach(m=>m.classList.remove("is-done"));
  document.querySelectorAll('input[type="checkbox"]').forEach(cb=>cb.checked=false);
  updateProgress();
});

/* ============ 复制代码按钮 ============ */
document.addEventListener("click", async e=>{
  const btn = e.target.closest(".copy-btn");
  if(!btn) return;
  const code = btn.parentElement.querySelector("code").innerText;
  try{
    await navigator.clipboard.writeText(code);
  }catch(err){
    const ta=document.createElement("textarea");ta.value=code;document.body.appendChild(ta);
    ta.select();document.execCommand("copy");ta.remove();
  }
  btn.textContent="已复制 ✓";btn.classList.add("ok");
  setTimeout(()=>{btn.textContent="复制";btn.classList.remove("ok")},1600);
});

/* ============ 滚动显现 ============ */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

/* ============ 导航高亮 ============ */
const navLinks = [...document.querySelectorAll(".nav a")];
const spy = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const id = en.target.id;
      navLinks.forEach(a=>{
        const href = a.getAttribute("href").slice(1);
        a.classList.toggle("active", href===id || (href==="p0" && id==="p1"));
      });
    }
  });
},{rootMargin:"-40% 0px -55% 0px"});
["overview","p0","p1","p2","p3","p4","p5","milestones","setup","faq"].forEach(id=>{
  const el = document.getElementById(id); if(el) spy.observe(el);
});

applyMode();

/* ============ 深色模式 ============ */
const THEME_KEY = "hb-theme";
function applyTheme(t){
  document.documentElement.dataset.theme = t;
  const btn = document.getElementById("themeBtn");
  if(btn){
    btn.textContent = t === "dark" ? "☀" : "☾";
    btn.setAttribute("aria-label", t === "dark" ? "切换为浅色模式" : "切换为深色模式");
    btn.title = btn.getAttribute("aria-label");
  }
  /* 进度环颜色随主题切换（SVG 属性为硬编码颜色） */
  const ring = document.getElementById("ringFill");
  const track = document.querySelector(".progress-chip svg circle");
  if(ring) ring.setAttribute("stroke", t === "dark" ? "#8fc2b8" : "#1c4d47");
  if(track) track.setAttribute("stroke", t === "dark" ? "#3a4247" : "#ded4bb");
}
(function initTheme(){
  const chip = document.querySelector(".progress-chip");
  if(chip){
    const btn = document.createElement("button");
    btn.type = "button"; btn.id = "themeBtn"; btn.className = "reset-btn theme-btn";
    btn.addEventListener("click", ()=>{
      const cur = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      try{ localStorage.setItem(THEME_KEY, cur); }catch(e){}
      applyTheme(cur);
    });
    chip.appendChild(btn);
  }
  applyTheme(document.documentElement.dataset.theme || "light");
})();

/* ============ 进度导出 / 导入 ============ */
(function initProgressTools(){
  const foot = document.querySelector(".site-footer .footer-meta");
  if(!foot) return;
  const box = document.createElement("div");
  box.className = "progress-tools";
  box.innerHTML = `
    <span>进度备份：</span>
    <button type="button" id="exportBtn">导出进度</button>
    <button type="button" id="importBtn">导入进度</button>
    <input type="file" id="importFile" accept="application/json,.json" hidden />`;
  foot.appendChild(box);

  document.getElementById("exportBtn").addEventListener("click", ()=>{
    const payload = {handbook: STORE_KEY, version: 1, exportedAt: new Date().toISOString(), progress: store};
    const blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = STORE_KEY + "-progress.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  const fileInput = document.getElementById("importFile");
  document.getElementById("importBtn").addEventListener("click", ()=>fileInput.click());
  fileInput.addEventListener("change", ()=>{
    const f = fileInput.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const payload = JSON.parse(reader.result);
        if(!payload || typeof payload.progress !== "object" || payload.progress === null) throw new Error("bad");
        if(payload.handbook && payload.handbook !== STORE_KEY
           && !confirm("该备份文件来自另一本手册（" + payload.handbook + "），仍要导入吗？")) return;
        store = payload.progress;
        save();
        location.reload();
      }catch(err){ alert("导入失败：文件格式不正确。"); }
    };
    reader.readAsText(f);
    fileInput.value = "";
  });
})();

/* ============ 打印前展开全部折叠内容 ============ */
window.addEventListener("beforeprint", ()=>{
  document.querySelectorAll("details").forEach(d=>{ d.open = true; });
});
