// ============================================================
// CONFIG GLOBAL
// ============================================================
const COLOR = {
  ink: "#18222B",
  inkSoft: "#4B5660",
  paper: "#F6F1E6",
  paperRaised: "#FBF8F0",
  rust: "#B5472E",
  rustSoft: "#E7CFC4",
  moss: "#3F6657",
  mossSoft: "#D7E2DB",
  gold: "#A9822F",
  goldSoft: "#E9DAB5",
  line: "#DCD2BC",
};

const LEVEL_COLORS = ["#3F6657", "#6E7A52", "#9C8E4D", "#B97240", "#B5472E"]; // 1→5, calma→alarma

Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = COLOR.inkSoft;
Chart.defaults.borderColor = COLOR.line;

const tooltipBase = {
  backgroundColor: COLOR.ink,
  titleFont: { family: "'IBM Plex Mono', monospace", size: 12, weight: "600" },
  bodyFont: { family: "'IBM Plex Mono', monospace", size: 12 },
  padding: 10,
  cornerRadius: 6,
  displayColors: false,
  caretSize: 5,
};

function fmtMoney(n){
  return "$" + Math.round(n).toLocaleString("es-AR");
}

// ============================================================
// 1. GÉNERO — doughnut
// ============================================================
new Chart(document.getElementById("chartGenero"), {
  type: "doughnut",
  data: {
    labels: FREQ.genero.map(d => d.cat),
    datasets: [{
      data: FREQ.genero.map(d => d.fi),
      backgroundColor: [COLOR.moss, COLOR.gold],
      borderColor: COLOR.paperRaised,
      borderWidth: 3,
    }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 10, boxHeight: 10, font: { size: 12.5 } } },
      tooltip: { ...tooltipBase, callbacks: { label: (ctx) => {
        const d = FREQ.genero[ctx.dataIndex];
        return ` ${d.cat}: ${d.fi} personas (${d.hi}%)`;
      } } },
    },
  },
});

// ============================================================
// 2. OCUPACIÓN — barra horizontal
// ============================================================
new Chart(document.getElementById("chartOcupacion"), {
  type: "bar",
  data: {
    labels: FREQ.ocupacion.map(d => d.cat),
    datasets: [{
      data: FREQ.ocupacion.map(d => d.fi),
      backgroundColor: COLOR.moss,
      borderRadius: 4,
      barThickness: 28,
    }],
  },
  options: {
    indexAxis: "y",
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { ...tooltipBase, callbacks: { label: (ctx) => {
        const d = FREQ.ocupacion[ctx.dataIndex];
        return ` ${d.fi} personas — ${d.hi}%`;
      } } },
    },
    scales: {
      x: { grid: { color: COLOR.line }, ticks: { precision: 0 } },
      y: { grid: { display: false } },
    },
  },
});

// ============================================================
// 3. TIPO DE APUESTA — Pareto (barras + línea acumulada)
// ============================================================
(function(){
  let acc = 0;
  const cumPct = FREQ.tipo.map(d => (acc += d.hi));
  new Chart(document.getElementById("chartTipo"), {
    data: {
      labels: FREQ.tipo.map(d => d.cat),
      datasets: [
        {
          type: "bar",
          label: "Frecuencia",
          data: FREQ.tipo.map(d => d.fi),
          backgroundColor: COLOR.gold,
          borderRadius: 4,
          yAxisID: "y",
          order: 2,
        },
        {
          type: "line",
          label: "% acumulado",
          data: cumPct,
          borderColor: COLOR.rust,
          backgroundColor: COLOR.rust,
          pointBackgroundColor: COLOR.rust,
          pointRadius: 4,
          tension: 0.25,
          yAxisID: "y1",
          order: 1,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: "top", align: "end", labels: { boxWidth: 10, boxHeight: 10, font: { size: 12 } } },
        tooltip: { ...tooltipBase, callbacks: { label: (ctx) => {
          if(ctx.dataset.type === "line") return ` Acumulado: ${ctx.parsed.y.toFixed(1)}%`;
          const d = FREQ.tipo[ctx.dataIndex];
          return ` ${d.fi} casos (${d.hi}%)`;
        } } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { autoSkip: false, font: { size: 11 } } },
        y: { position: "left", title: { display: true, text: "Frecuencia absoluta" }, grid: { color: COLOR.line } },
        y1: { position: "right", min: 0, max: 100, title: { display: true, text: "% acumulado" }, grid: { display: false } },
      },
    },
  });
})();

// ============================================================
// Helper: histograma desde tabla agrupada
// ============================================================
function histogram(canvasId, grouped, color, unitLabel){
  const labels = grouped.clases.map(c => `${c.l1}–${c.l2}`);
  new Chart(document.getElementById(canvasId), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: grouped.clases.map(c => c.fi),
        backgroundColor: color,
        borderRadius: 3,
        categoryPercentage: 1.0,
        barPercentage: 0.98,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipBase, callbacks: { label: (ctx) => {
          const c = grouped.clases[ctx.dataIndex];
          return ` ${c.fi} casos (${c.hi}%) · ${unitLabel}`;
        } } },
      },
      scales: {
        x: { grid: { display: false }, title: { display: true, text: unitLabel, font: { size: 11.5 } } },
        y: { grid: { color: COLOR.line }, ticks: { precision: 0 } },
      },
    },
  });
}

histogram("chartEdad", GROUPED.edad, COLOR.moss, "años");
histogram("chartAntiguedad", GROUPED.antiguedad, COLOR.gold, "meses");
histogram("chartGasto", GROUPED.gasto, COLOR.rust, "pesos ($)");
histogram("chartHoras", GROUPED.horas, COLOR.gold, "horas/semana");

// ============================================================
// 6. COEFICIENTE DE VARIACIÓN COMPARADO
// ============================================================
new Chart(document.getElementById("chartCV"), {
  type: "bar",
  data: {
    labels: MEASURES.map(m => m.variable),
    datasets: [{
      data: MEASURES.map(m => m.cv),
      backgroundColor: MEASURES.map(m => m.cv >= 70 ? COLOR.rust : COLOR.moss),
      borderRadius: 4,
    }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { ...tooltipBase, callbacks: { label: (ctx) => ` CV: ${ctx.parsed.y}%` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: { grid: { color: COLOR.line }, title: { display: true, text: "Coef. de variación (%)" } },
    },
  },
});

// ============================================================
// DISCRETAS 1–5 (Ansiedad / Riesgo)
// ============================================================
function discreteBar(canvasId, dist, totalLabel){
  new Chart(document.getElementById(canvasId), {
    type: "bar",
    data: {
      labels: dist.map(d => d.nivel),
      datasets: [{
        data: dist.map(d => d.fi),
        backgroundColor: dist.map(d => LEVEL_COLORS[d.nivel - 1]),
        borderRadius: 4,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipBase, callbacks: { label: (ctx) => {
          const d = dist[ctx.dataIndex];
          const pct = ((d.fi / 30) * 100).toFixed(1);
          return ` Nivel ${d.nivel}: ${d.fi} personas (${pct}%)`;
        } } },
      },
      scales: {
        x: { grid: { display: false }, title: { display: true, text: totalLabel, font: { size: 11 } } },
        y: { grid: { color: COLOR.line }, ticks: { precision: 0 } },
      },
    },
  });
}
discreteBar("chartAnsiedad", ANSIEDAD_DIST, "1 = nada · 5 = mucho");
discreteBar("chartRiesgo", RIESGO_DIST, "1 = nada riesgoso · 5 = muy riesgoso");

// ============================================================
// DONUTS / BARRA: intento, conoce, afecto
// ============================================================
new Chart(document.getElementById("chartIntento"), {
  type: "doughnut",
  data: {
    labels: FREQ.intentoDejar.map(d => d.cat),
    datasets: [{ data: FREQ.intentoDejar.map(d => d.fi), backgroundColor: [COLOR.rust, COLOR.mossSoft], borderColor: COLOR.paperRaised, borderWidth: 3 }],
  },
  options: {
    responsive: true, maintainAspectRatio: false, cutout: "62%",
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 10, boxHeight: 10, font: { size: 12 } } },
      tooltip: { ...tooltipBase, callbacks: { label: (ctx) => {
        const d = FREQ.intentoDejar[ctx.dataIndex]; return ` ${d.cat}: ${d.fi} (${d.hi}%)`;
      } } },
    },
  },
});

new Chart(document.getElementById("chartConoce"), {
  type: "doughnut",
  data: {
    labels: FREQ.conoce.map(d => d.cat),
    datasets: [{ data: FREQ.conoce.map(d => d.fi), backgroundColor: [COLOR.gold, COLOR.mossSoft], borderColor: COLOR.paperRaised, borderWidth: 3 }],
  },
  options: {
    responsive: true, maintainAspectRatio: false, cutout: "62%",
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 10, boxHeight: 10, font: { size: 12 } } },
      tooltip: { ...tooltipBase, callbacks: { label: (ctx) => {
        const d = FREQ.conoce[ctx.dataIndex]; return ` ${d.cat}: ${d.fi} (${d.hi}%)`;
      } } },
    },
  },
});

new Chart(document.getElementById("chartAfecto"), {
  type: "bar",
  data: {
    labels: FREQ.afecto.map(d => d.cat),
    datasets: [{ data: FREQ.afecto.map(d => d.fi), backgroundColor: [COLOR.moss, COLOR.gold, COLOR.rust], borderRadius: 4 }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { ...tooltipBase, callbacks: { label: (ctx) => {
        const d = FREQ.afecto[ctx.dataIndex]; return ` ${d.fi} personas (${d.hi}%)`;
      } } },
    },
    scales: { x: { grid: { display: false } }, y: { grid: { color: COLOR.line }, ticks: { precision: 0 } } },
  },
});

// ============================================================
// CRUCE ANSIEDAD vs GASTO / HORAS
// ============================================================
new Chart(document.getElementById("chartCruceGasto"), {
  type: "bar",
  data: {
    labels: [`Ansiedad baja (1–2) · n=${CRUCE.baja.n}`, `Ansiedad alta (3–5) · n=${CRUCE.alta.n}`],
    datasets: [{ data: [CRUCE.baja.gasto, CRUCE.alta.gasto], backgroundColor: [COLOR.moss, COLOR.rust], borderRadius: 6, barThickness: 70 }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { ...tooltipBase, callbacks: { label: (ctx) => ` Media: ${fmtMoney(ctx.parsed.y)}` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11.5 } } },
      y: { grid: { color: COLOR.line }, ticks: { callback: (v) => "$" + (v/1000) + "k" } },
    },
  },
});

new Chart(document.getElementById("chartCruceHoras"), {
  type: "bar",
  data: {
    labels: [`Ansiedad baja (1–2) · n=${CRUCE.baja.n}`, `Ansiedad alta (3–5) · n=${CRUCE.alta.n}`],
    datasets: [{ data: [CRUCE.baja.horas, CRUCE.alta.horas], backgroundColor: [COLOR.moss, COLOR.rust], borderRadius: 6, barThickness: 70 }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { ...tooltipBase, callbacks: { label: (ctx) => ` Media: ${ctx.parsed.y.toFixed(1)} hs/semana` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11.5 } } },
      y: { grid: { color: COLOR.line }, title: { display: true, text: "Horas/semana" } },
    },
  },
});

// ============================================================
// SCATTER: gasto vs ansiedad (tamaño = horas)
// ============================================================
(function(){
  const points = RAW.filter(r => r.gasto !== null).map(r => {
    const seed = (r.id * 9301 + 49297) % 233280;
    const jitter = ((seed / 233280) - 0.5) * 0.5;
    return {
      x: r.gasto,
      y: r.ansiedad + jitter,
      r: Math.min(22, 5 + Math.sqrt(r.horas) * 2.6),
      meta: r,
    };
  });

  new Chart(document.getElementById("chartScatter"), {
    type: "bubble",
    data: {
      datasets: [{
        data: points,
        backgroundColor: points.map(p => LEVEL_COLORS[p.meta.ansiedad - 1] + "B3"),
        borderColor: points.map(p => LEVEL_COLORS[p.meta.ansiedad - 1]),
        borderWidth: 1.5,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipBase,
          callbacks: {
            title: (items) => `Encuestado #${items[0].raw.meta.id}`,
            label: (ctx) => {
              const m = ctx.raw.meta;
              return [
                ` Gasto: ${fmtMoney(m.gasto)}`,
                ` Ansiedad: ${m.ansiedad}/5`,
                ` Horas/sem: ${m.horas}`,
                ` Tipo: ${m.tipo}`,
              ];
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "Gasto mensual ($)" },
          grid: { color: COLOR.line },
          ticks: { callback: (v) => "$" + (v/1000) + "k" },
        },
        y: {
          title: { display: true, text: "Nivel de ansiedad (1–5)" },
          min: 0, max: 6,
          grid: { color: COLOR.line },
          ticks: { stepSize: 1, callback: (v) => (v>=1 && v<=5 ? v : "") },
        },
      },
    },
  });
})();

// ============================================================
// BOXPLOT custom (SVG) — Gasto mensual
// ============================================================
(function(){
  const container = document.getElementById("boxplotGasto");
  const W = 640, H = 260;
  const domainMax = 640000;
  const xScale = (v) => 50 + (v / domainMax) * (W - 90);

  const stats = { min: 5000, q1: 20000, median: 100000, q3: 230000, whiskerMax: 500000 };
  const outliers = GASTO_VALUES.filter(d => d.value > 545000);
  const normals = GASTO_VALUES.filter(d => d.value <= 545000);

  const boxY = 150, boxH = 46;
  const stripY = 60;

  let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, monospace">`;

  // axis
  for(let v=0; v<=domainMax; v+=100000){
    const x = xScale(v);
    svg += `<line x1="${x}" y1="20" x2="${x}" y2="${boxY+boxH+40}" stroke="${COLOR.line}" stroke-width="1"/>`;
    svg += `<text x="${x}" y="${boxY+boxH+58}" font-size="10.5" fill="${COLOR.inkSoft}" text-anchor="middle">${v/1000}k</text>`;
  }

  // strip plot (todos los valores, jitter vertical leve)
  normals.forEach((d,i) => {
    const jitter = ((d.id * 13) % 7) - 3;
    svg += `<circle class="vizpoint" data-id="${d.id}" data-value="${d.value}" data-outlier="0" cx="${xScale(d.value)}" cy="${stripY + jitter}" r="5" fill="${COLOR.moss}" fill-opacity="0.55" stroke="${COLOR.moss}" stroke-width="1" style="cursor:pointer"/>`;
  });
  outliers.forEach((d) => {
    svg += `<circle class="vizpoint" data-id="${d.id}" data-value="${d.value}" data-outlier="1" cx="${xScale(d.value)}" cy="${stripY}" r="6" fill="${COLOR.rust}" fill-opacity="0.85" stroke="${COLOR.rust}" stroke-width="1.5" style="cursor:pointer"/>`;
  });

  // whiskers
  const cy = boxY + boxH/2;
  svg += `<line x1="${xScale(stats.min)}" y1="${cy}" x2="${xScale(stats.q1)}" y2="${cy}" stroke="${COLOR.ink}" stroke-width="1.5"/>`;
  svg += `<line x1="${xScale(stats.q3)}" y1="${cy}" x2="${xScale(stats.whiskerMax)}" y2="${cy}" stroke="${COLOR.ink}" stroke-width="1.5"/>`;
  [stats.min, stats.whiskerMax].forEach(v=>{
    svg += `<line x1="${xScale(v)}" y1="${boxY+8}" x2="${xScale(v)}" y2="${boxY+boxH-8}" stroke="${COLOR.ink}" stroke-width="1.5"/>`;
  });

  // box
  svg += `<rect x="${xScale(stats.q1)}" y="${boxY}" width="${xScale(stats.q3)-xScale(stats.q1)}" height="${boxH}" fill="${COLOR.goldSoft}" stroke="${COLOR.ink}" stroke-width="1.5" rx="3"/>`;
  svg += `<line x1="${xScale(stats.median)}" y1="${boxY}" x2="${xScale(stats.median)}" y2="${boxY+boxH}" stroke="${COLOR.rust}" stroke-width="2.5"/>`;

  // outlier dots on box row too, for clarity
  outliers.forEach((d) => {
    svg += `<circle class="vizpoint" data-id="${d.id}" data-value="${d.value}" data-outlier="1" cx="${xScale(d.value)}" cy="${cy}" r="5.5" fill="${COLOR.rust}" stroke="${COLOR.paperRaised}" stroke-width="1.5" style="cursor:pointer"/>`;
  });

  // labels
  svg += `<text x="${xScale(stats.q1)}" y="${boxY-10}" font-size="10.5" fill="${COLOR.inkSoft}" text-anchor="middle">Q1</text>`;
  svg += `<text x="${xScale(stats.median)}" y="${boxY-10}" font-size="10.5" fill="${COLOR.rust}" font-weight="600" text-anchor="middle">Mediana</text>`;
  svg += `<text x="${xScale(stats.q3)}" y="${boxY-10}" font-size="10.5" fill="${COLOR.inkSoft}" text-anchor="middle">Q3</text>`;
  svg += `<text x="10" y="${stripY+4}" font-size="10" fill="${COLOR.inkSoft}" text-anchor="start">n=29</text>`;

  svg += `</svg>`;
  container.innerHTML = svg;

  // tooltip behaviour
  const tooltip = document.getElementById("vizTooltip");
  container.querySelectorAll(".vizpoint").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const id = el.dataset.id, value = +el.dataset.value, isOut = el.dataset.outlier === "1";
      tooltip.innerHTML = `<strong>Encuestado #${id}</strong><br>${fmtMoney(value)}/mes${isOut ? "<br><span style='color:#E7CFC4'>Valor atípico</span>" : ""}`;
      tooltip.style.left = (e.clientX + 14) + "px";
      tooltip.style.top = (e.clientY - 10) + "px";
      tooltip.classList.add("show");
    });
    el.addEventListener("mouseleave", () => tooltip.classList.remove("show"));
  });
})();

// ============================================================
// BIBLIOGRAFÍA
// ============================================================
(function(){
  const list = document.getElementById("biblioList");
  BIBLIOGRAFIA.forEach(b => {
    const li = document.createElement("li");
    li.innerHTML = b.url ? `${b.texto} <a href="${b.url}" target="_blank" rel="noopener">${b.url}</a>` : b.texto;
    list.appendChild(li);
  });
})();

// ============================================================
// TOOLTIP ELEMENT (compartido para los SVG custom)
// ============================================================
const vizTooltip = document.createElement("div");
vizTooltip.id = "vizTooltip";
vizTooltip.className = "viz-tooltip";
document.body.appendChild(vizTooltip);

// ============================================================
// NAV: progreso de scroll + sección activa + TOC
// ============================================================
const progressFill = document.getElementById("progressFill");
const navSection = document.getElementById("navSection");
const sections = [...document.querySelectorAll("section[id]")];

function onScroll(){
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressFill.style.width = pct + "%";

  let current = sections[0];
  for(const s of sections){
    if(s.getBoundingClientRect().top < 140) current = s;
  }
  if(current){
    const h2 = current.querySelector("h2");
    if(h2) navSection.textContent = h2.textContent;
  }
}
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const navToggle = document.getElementById("navToggle");
const tocPanel = document.getElementById("tocPanel");
navToggle.addEventListener("click", () => tocPanel.classList.toggle("open"));
tocPanel.querySelectorAll("a").forEach(a => a.addEventListener("click", () => tocPanel.classList.remove("open")));
document.addEventListener("click", (e) => {
  if(!tocPanel.contains(e.target) && !navToggle.contains(e.target)) tocPanel.classList.remove("open");
});

document.getElementById("scrollCue").addEventListener("click", () => {
  document.getElementById("intro").scrollIntoView({ behavior: "smooth" });
});

// ============================================================
// REVEAL ON SCROLL
// ============================================================
const revealTargets = document.querySelectorAll(".chart-card, .stat-block");
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { if(en.isIntersecting) en.target.classList.add("is-visible"); });
}, { threshold: 0.15 });
revealTargets.forEach(t => io.observe(t));
