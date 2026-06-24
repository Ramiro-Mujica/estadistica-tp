# El impacto de las apuestas en la mente joven

Informe estadístico interactivo (sitio estático: HTML + CSS + JS, sin build).

## Estructura
```
index.html      → estructura del informe
styles.css      → diseño (paleta, tipografía, layout)
data.js         → dataset (n=30) y tablas estadísticas
script.js       → gráficos (Chart.js) + boxplot SVG custom + interacciones
vercel.json     → config mínima para Vercel
```

## Probar en local
No necesita instalación. Simplemente abrí `index.html` en el navegador,
o corré un servidor estático simple:

```bash
npx serve .
# o
python3 -m http.server 8000
```

## Subir a Vercel (un click)

**Opción A — Vercel CLI (la más directa):**
```bash
npm i -g vercel
cd apuestas-site
vercel --prod
```
Seguí las preguntas (elegí "Other" como framework, directorio actual como root).
Al terminar te da una URL pública lista para compartir.

**Opción B — Sin instalar nada, desde vercel.com:**
1. Entrá a https://vercel.com/new
2. Arrastrá la carpeta `apuestas-site` completa (o subila a un repo de GitHub
   y conectá ese repo).
3. Framework Preset: "Other". No hace falta build command.
4. Deploy. Vercel te da la URL en menos de un minuto.

## Editar contenido
- Los números y tablas están todos en `data.js`. Si corregís algún dato del
  Excel, solo tenés que tocar ese archivo: los gráficos se redibujan solos.
- El texto del informe (introducción, metodología, conclusiones) está
  directamente en `index.html`, dentro de cada `<section>`.
