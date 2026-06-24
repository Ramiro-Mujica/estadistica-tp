// ============================================================
// DATOS — El impacto de las apuestas en la mente joven
// Encuesta n=30, jóvenes apostadores (17–27 años)
// ============================================================

const RAW = [
  { id: 1,  edad: 20, genero: "Hombre", ocupacion: "Ambas",       tipo: "Apuestas deportivas", antiguedad: 36,   gasto: 600000, horas: 8,    intentoDejar: "Sí", ansiedad: 3, conoce: "Sí", afecto: "No",     riesgo: 5 },
  { id: 2,  edad: 22, genero: "Hombre", ocupacion: "Estudiante",  tipo: "Apuestas deportivas", antiguedad: 24,   gasto: 100000, horas: 48,   intentoDejar: "Sí", ansiedad: 3, conoce: "No", afecto: "No",     riesgo: 5 },
  { id: 3,  edad: 21, genero: "Mujer",  ocupacion: "Estudiante",  tipo: "Cartas/Póker",        antiguedad: 18,   gasto: 50000,  horas: 3,    intentoDejar: "Sí", ansiedad: 3, conoce: "No", afecto: "Tal vez", riesgo: 4 },
  { id: 4,  edad: 20, genero: "Hombre", ocupacion: "Ambas",       tipo: "Apuestas deportivas", antiguedad: 12,   gasto: 80000,  horas: 4,    intentoDejar: "Sí", ansiedad: 4, conoce: "Sí", afecto: "Tal vez", riesgo: 4 },
  { id: 5,  edad: 23, genero: "Hombre", ocupacion: "Estudiante",  tipo: "Casino online",       antiguedad: 24,   gasto: 30000,  horas: 0.5,  intentoDejar: "No", ansiedad: 2, conoce: "No", afecto: "Tal vez", riesgo: 4, motivo: "El aburrimiento durante la pandemia y la facilidad de acceso de los casinos online." },
  { id: 6,  edad: 24, genero: "Mujer",  ocupacion: "Ambas",       tipo: "Otra",                antiguedad: 12,   gasto: 220000, horas: 0,    intentoDejar: "Sí", ansiedad: 3, conoce: "Sí", afecto: "Tal vez", riesgo: 2, motivo: "Para ayudar a una persona que me importa." },
  { id: 7,  edad: 23, genero: "Hombre", ocupacion: "Estudiante",  tipo: "Apuestas deportivas", antiguedad: 18,   gasto: 10000,  horas: 4,    intentoDejar: "Sí", ansiedad: 1, conoce: "Sí", afecto: "No",     riesgo: 5 },
  { id: 8,  edad: 24, genero: "Mujer",  ocupacion: "Estudiante",  tipo: "Apuestas deportivas", antiguedad: 2,    gasto: 10000,  horas: 2,    intentoDejar: "No", ansiedad: 1, conoce: "No", afecto: "No",     riesgo: 4 },
  { id: 9,  edad: 25, genero: "Hombre", ocupacion: "Ambas",       tipo: "Apuestas deportivas", antiguedad: 24,   gasto: 100000, horas: 3,    intentoDejar: "Sí", ansiedad: 5, conoce: "No", afecto: "No",     riesgo: 5 },
  { id: 10, edad: 17, genero: "Mujer",  ocupacion: "Estudiante",  tipo: "Apuestas deportivas", antiguedad: null, gasto: null,   horas: 0,    intentoDejar: "No", ansiedad: 2, conoce: "Sí", afecto: "Tal vez", riesgo: 1 },
  { id: 11, edad: 22, genero: "Mujer",  ocupacion: "Estudiante",  tipo: "Apuestas deportivas", antiguedad: null, gasto: 20000,  horas: 3,    intentoDejar: "Sí", ansiedad: 2, conoce: "No", afecto: "No",     riesgo: 4 },
  { id: 12, edad: 18, genero: "Hombre", ocupacion: "Ambas",       tipo: "Apuestas deportivas", antiguedad: 24,   gasto: 500000, horas: 8,    intentoDejar: "No", ansiedad: 5, conoce: "No", afecto: "Sí",     riesgo: 1 },
  { id: 13, edad: 24, genero: "Hombre", ocupacion: "Estudiante",  tipo: "Apuestas deportivas", antiguedad: 12,   gasto: 10000,  horas: 0.5,  intentoDejar: "Sí", ansiedad: 1, conoce: "No", afecto: "No",     riesgo: 5 },
  { id: 14, edad: 20, genero: "Hombre", ocupacion: "Estudiante",  tipo: "Apuestas deportivas", antiguedad: 24,   gasto: 300000, horas: 7,    intentoDejar: "Sí", ansiedad: 5, conoce: "Sí", afecto: "Tal vez", riesgo: 3 },
  { id: 15, edad: 25, genero: "Hombre", ocupacion: "Ambas",       tipo: "Loterías/Quinielas",  antiguedad: 60,   gasto: 5000,   horas: 0,    intentoDejar: "No", ansiedad: 1, conoce: "Sí", afecto: "No",     riesgo: 4 },
  { id: 16, edad: 22, genero: "Hombre", ocupacion: "Trabajador",  tipo: "Apuestas deportivas", antiguedad: 36,   gasto: 50000,  horas: 1,    intentoDejar: "Sí", ansiedad: 2, conoce: "Sí", afecto: "No",     riesgo: 4 },
  { id: 17, edad: 22, genero: "Mujer",  ocupacion: "Ambas",       tipo: "Casino online",       antiguedad: 5,    gasto: 15000,  horas: 1,    intentoDejar: "Sí", ansiedad: 1, conoce: "Sí", afecto: "No",     riesgo: 5 },
  { id: 18, edad: 21, genero: "Hombre", ocupacion: "Ambas",       tipo: "Apuestas deportivas", antiguedad: 48,   gasto: 500000, horas: 14,   intentoDejar: "Sí", ansiedad: 2, conoce: "Sí", afecto: "No",     riesgo: 5 },
  { id: 19, edad: 20, genero: "Hombre", ocupacion: "Ambas",       tipo: "Apuestas deportivas", antiguedad: 12,   gasto: 300000, horas: 8,    intentoDejar: "Sí", ansiedad: 3, conoce: "Sí", afecto: "Tal vez", riesgo: 3 },
  { id: 20, edad: 23, genero: "Hombre", ocupacion: "Estudiante",  tipo: "Casino online",       antiguedad: 10,   gasto: 5000,   horas: 2,    intentoDejar: "Sí", ansiedad: 1, conoce: "No", afecto: "No",     riesgo: 4 },
  { id: 21, edad: 24, genero: "Hombre", ocupacion: "Trabajador",  tipo: "Casino online",       antiguedad: 24,   gasto: 150000, horas: 7,    intentoDejar: "Sí", ansiedad: 2, conoce: "No", afecto: "No",     riesgo: 3 },
  { id: 22, edad: 19, genero: "Hombre", ocupacion: "Estudiante",  tipo: "Apuestas deportivas", antiguedad: 1,    gasto: 10000,  horas: 0.5,  intentoDejar: "Sí", ansiedad: 1, conoce: "No", afecto: "No",     riesgo: 3 },
  { id: 23, edad: 19, genero: "Hombre", ocupacion: "Estudiante",  tipo: "Apuestas deportivas", antiguedad: 6,    gasto: 200000, horas: 5,    intentoDejar: "Sí", ansiedad: 2, conoce: "Sí", afecto: "No",     riesgo: 4 },
  { id: 24, edad: 22, genero: "Hombre", ocupacion: "Ambas",       tipo: "Apuestas deportivas", antiguedad: 24,   gasto: 400000, horas: 11,   intentoDejar: "Sí", ansiedad: 4, conoce: "No", afecto: "Tal vez", riesgo: 4 },
  { id: 25, edad: 24, genero: "Mujer",  ocupacion: "Ambas",       tipo: "Casino online",       antiguedad: 12,   gasto: 230000, horas: 10,   intentoDejar: "Sí", ansiedad: 4, conoce: "Sí", afecto: "Sí",     riesgo: 4, motivo: "Publicidades hechas por influencers." },
  { id: 26, edad: 23, genero: "Hombre", ocupacion: "Estudiante",  tipo: "Apuestas deportivas", antiguedad: 6,    gasto: 150000, horas: 6,    intentoDejar: "No", ansiedad: 5, conoce: "Sí", afecto: "No",     riesgo: 5, motivo: "Aburrimiento — después se volvió dependencia." },
  { id: 27, edad: 27, genero: "Mujer",  ocupacion: "Trabajador",  tipo: "Casino online",       antiguedad: 36,   gasto: 600000, horas: 13,   intentoDejar: "Sí", ansiedad: 5, conoce: "No", afecto: "Tal vez", riesgo: 3 },
  { id: 28, edad: 25, genero: "Hombre", ocupacion: "Trabajador",  tipo: "Apuestas deportivas", antiguedad: 24,   gasto: 80000,  horas: 3,    intentoDejar: "No", ansiedad: 2, conoce: "No", afecto: "No",     riesgo: 3 },
  { id: 29, edad: 25, genero: "Hombre", ocupacion: "Trabajador",  tipo: "Apuestas deportivas", antiguedad: 60,   gasto: 100000, horas: 3,    intentoDejar: "No", ansiedad: 1, conoce: "No", afecto: "Tal vez", riesgo: 2 },
  { id: 30, edad: 18, genero: "Hombre", ocupacion: "Estudiante",  tipo: "Casino online",       antiguedad: 8,    gasto: 100000, horas: 2,    intentoDejar: "Sí", ansiedad: 1, conoce: "Sí", afecto: "No",     riesgo: 4 },
];

// ---------- Tablas de frecuencia: variables cualitativas ----------
const FREQ = {
  genero: [
    { cat: "Hombre", fi: 22, hi: 73.3 },
    { cat: "Mujer",  fi: 8,  hi: 26.7 },
  ],
  ocupacion: [
    { cat: "Estudiante", fi: 14, hi: 46.7 },
    { cat: "Ambas",      fi: 11, hi: 36.7 },
    { cat: "Trabajador", fi: 5,  hi: 16.7 },
  ],
  tipo: [
    { cat: "Apuestas deportivas", fi: 20, hi: 66.7 },
    { cat: "Casino online",       fi: 7,  hi: 23.3 },
    { cat: "Cartas/Póker",        fi: 1,  hi: 3.3 },
    { cat: "Loterías/Quinielas",  fi: 1,  hi: 3.3 },
    { cat: "Otra",                fi: 1,  hi: 3.3 },
  ],
  intentoDejar: [
    { cat: "Sí", fi: 22, hi: 73.3 },
    { cat: "No", fi: 8,  hi: 26.7 },
  ],
  conoce: [
    { cat: "Sí", fi: 15, hi: 50 },
    { cat: "No", fi: 15, hi: 50 },
  ],
  afecto: [
    { cat: "No",     fi: 18, hi: 60 },
    { cat: "Tal vez", fi: 10, hi: 33.3 },
    { cat: "Sí",     fi: 2,  hi: 6.7 },
  ],
};

// ---------- Tablas de datos agrupados (Sturges) ----------
const GROUPED = {
  edad: {
    n: 30, unidad: "años",
    clases: [
      { l1: 17, l2: 19, mc: 18, fi: 3, hi: 10.0 },
      { l1: 19, l2: 21, mc: 20, fi: 6, hi: 20.0 },
      { l1: 21, l2: 23, mc: 22, fi: 7, hi: 23.3 },
      { l1: 23, l2: 25, mc: 24, fi: 9, hi: 30.0 },
      { l1: 25, l2: 27, mc: 26, fi: 5, hi: 16.7 },
    ],
  },
  antiguedad: {
    n: 28, unidad: "meses", nota: "2 encuestados sin dato numérico recuperable",
    clases: [
      { l1: 0,  l2: 10, mc: 5,  fi: 6, hi: 21.4 },
      { l1: 10, l2: 20, mc: 15, fi: 8, hi: 28.6 },
      { l1: 20, l2: 30, mc: 25, fi: 8, hi: 28.6 },
      { l1: 30, l2: 40, mc: 35, fi: 3, hi: 10.7 },
      { l1: 40, l2: 50, mc: 45, fi: 1, hi: 3.6 },
      { l1: 50, l2: 60, mc: 55, fi: 2, hi: 7.1 },
    ],
  },
  gasto: {
    n: 29, unidad: "pesos", nota: "1 encuestado sin dato numérico recuperable",
    clases: [
      { l1: 0,      l2: 100000, mc: 50000,  fi: 13, hi: 44.8 },
      { l1: 100000, l2: 200000, mc: 150000, fi: 6,  hi: 20.7 },
      { l1: 200000, l2: 300000, mc: 250000, fi: 3,  hi: 10.3 },
      { l1: 300000, l2: 400000, mc: 350000, fi: 2,  hi: 6.9 },
      { l1: 400000, l2: 500000, mc: 450000, fi: 1,  hi: 3.4 },
      { l1: 500000, l2: 600000, mc: 550000, fi: 4,  hi: 13.8 },
    ],
  },
  horas: {
    n: 29, unidad: "horas/semana", nota: "excluye 1 valor atípico genuino (48 hs/semana)",
    clases: [
      { l1: 0,  l2: 3,  mc: 1.5,  fi: 11, hi: 37.9 },
      { l1: 3,  l2: 6,  mc: 4.5,  fi: 8,  hi: 27.6 },
      { l1: 6,  l2: 9,  mc: 7.5,  fi: 6,  hi: 20.7 },
      { l1: 9,  l2: 12, mc: 10.5, fi: 2,  hi: 6.9 },
      { l1: 12, l2: 15, mc: 13.5, fi: 2,  hi: 6.9 },
    ],
  },
};

// ---------- Medidas de tendencia central, posición y variabilidad ----------
const MEASURES = [
  { variable: "Edad",                 unidad: "años",     n: 30, min: 17,   max: 27,    media: 22.07,  mediana: 22,    moda: 22,   q1: 20,   q3: 24,    iqr: 4,      s: 2.48,    cv: 11.2 },
  { variable: "Antigüedad apostando", unidad: "meses",    n: 28, min: 1,    max: 60,    media: 21.5,   mediana: 21,    moda: 24,   q1: 11.5, q3: 24,    iqr: 12.5,   s: 15.74,   cv: 73.2 },
  { variable: "Gasto mensual",        unidad: "$",        n: 29, min: 5000, max: 600000, media: 169828, mediana: 100000, moda: 100000, q1: 20000, q3: 230000, iqr: 210000, s: 186095, cv: 109.6 },
  { variable: "Horas semanales",      unidad: "hs/sem",   n: 30, min: 0,    max: 48,    media: 5.92,   mediana: 3,     moda: 3,    q1: 1.25, q3: 7.75,  iqr: 6.5,    s: 8.87,    cv: 149.9 },
  { variable: "Ansiedad percibida",   unidad: "esc. 1–5", n: 30, min: 1,    max: 5,     media: 2.57,   mediana: 2,     moda: 1,    q1: 1,    q3: 3.75,  iqr: 2.75,   s: 1.45,    cv: 56.7 },
  { variable: "Riesgo percibido",     unidad: "esc. 1–5", n: 30, min: 1,    max: 5,     media: 3.73,   mediana: 4,     moda: 4,    q1: 3,    q3: 4.75,  iqr: 1.75,   s: 1.14,    cv: 30.6 },
];

// boxplot del gasto mensual (n=29, sin el faltante #10) — valores ordenados
const GASTO_VALUES = RAW.filter(r => r.gasto !== null).map(r => ({ id: r.id, value: r.gasto }));

// ---------- Distribución discreta 1–5 ----------
const ANSIEDAD_DIST = [1,2,3,4,5].map(v => ({ nivel: v, fi: RAW.filter(r => r.ansiedad === v).length }));
const RIESGO_DIST   = [1,2,3,4,5].map(v => ({ nivel: v, fi: RAW.filter(r => r.riesgo === v).length }));

// ---------- Cruce: ansiedad baja (1–2) vs alta (3–5) ----------
const CRUCE = {
  baja: { n: 17, gasto: 80937.5,  horas: 2.85 },
  alta: { n: 13, gasto: 279230.8, horas: 9.92 },
};

const BIBLIOGRAFIA = [
  { texto: "Observatorio Humanitario de Cruz Roja Argentina (dic. 2025). Informe: Apuestas online y adolescencia — Encuesta Nacional.", url: "https://cruzroja.org.ar/observatorio-humanitario/" },
  { texto: "UNICEF Argentina (2025). Las apuestas online afectan la salud mental de las y los adolescentes — Kids Online Argentina.", url: "https://www.unicef.org/argentina/apuestas-online-salud-mental" },
  { texto: "Branz, J. B. y Murzi, D. (2024). Apuestas deportivas online y jóvenes en Argentina: entre la sociabilidad, el dinero y el riesgo. UNSAM-CONICET.", url: null },
  { texto: "Infobae (2 dic. 2025). Apuestas online en el país: el 60% de los adolescentes está expuesto, según Cruz Roja Argentina.", url: "https://www.infobae.com/salud/2025/12/02/" },
  { texto: "La Nación (30 may. 2024). El 16% de los jóvenes reconoce que realiza apuestas online, según Opina Argentina.", url: "https://www.lanacion.com.ar/sociedad/" },
  { texto: "La Nación (2026). Frente al Mundial: crece la preocupación entre familias de adolescentes y especialistas por las apuestas online — declaraciones de Débora Blanca (Lazos en Juego).", url: null },
];
