// Motor del Portafolio Critertec 2026.
//
// Define la biblioteca completa de láminas y la maquinaria de navegación. Las dos versiones
// —index.html larga, corto.html corta— importan `arranca(plan)` y le pasan la lista de ids
// que quieren, en el orden que quieren. Una lámina que nadie pide simplemente no se pinta.
//
// La navegación viene del deck de la junta de septiembre de 2026:
//   → o espacio avanza · ← retrocede · Esc abre el índice · F pantalla completa.
import * as C from './contenido.js';
import { VISTA, PAISES_GEO, proyecta } from './mapa-latam.js';

const vertDe = (id) => C.VERTICALES.find((v) => v.id === id);
/** Slug estable para los ids de lámina de proyecto: sin tildes, sin signos, en minúscula. */
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* ─────────────────────────────────────────────────────────────
   Piezas de texto
   `--d` escalona la entrada de cada pieza; el contador se reinicia en cada lámina.
   ───────────────────────────────────────────────────────────── */
let paso = 0;
const d = () => `style="--d:${paso++}"`;
const reinicia = () => { paso = 0; };

const eyebrow = (t) => `<p class="eyebrow pieza" ${d()}>${t}</p>`;
/** El punto final del titular es el punto de la marca: coral, y late con el pulso del deck. */
const conPunto = (t) => t.replace(/\.(<\/span>)?$/, '<span class="punto">.</span>$1');
const titular = (t, xl) => `<h2 class="titular${xl ? ' xl' : ''} pieza" ${d()}>${conPunto(t)}</h2>`;
const bajada = (t) => `<p class="bajada pieza" ${d()}>${t}</p>`;
const pieDato = (t) => `<p class="pie-dato pieza" ${d()}>${t}</p>`;

/**
 * Ancla de referencia. Sin `link` no pinta un ancla muerta: pinta la marca de pendiente,
 * que es información honesta —falta el soporte— y no un enlace que no lleva a ninguna parte.
 */
const enlace = (url, texto) => (url
  ? `<a class="enlace" href="${url}" target="_blank" rel="noopener noreferrer"
       ><span>${texto || url}</span></a>`
  : '');
/**
 * Marca de afirmación sin soporte. Es deliberadamente una sola línea fija y no el texto de
 * `nota`: el detalle de qué falta —a quién pedírselo, qué documento— es información interna,
 * y este deck se le manda a clientes. En pantalla basta la señal; el detalle lo imprime
 * verificar.mjs, que es quien lee el equipo antes de enviarlo.
 */
const pendiente = () => '<span class="pendiente">Sin enlace de referencia</span>';
const refs = (o, texto) => (o.link ? enlace(o.link, texto || o.linkTexto) : pendiente());

/* ─────────────────────────────────────────────────────────────
   Biblioteca de láminas
   ───────────────────────────────────────────────────────────── */
/** La biblioteca completa. La exporta para que verificar.mjs compruebe los planes sin DOM. */
export const LAMINAS = new Map();
const lamina = (id, seccion, titulo, clase, html) =>
  LAMINAS.set(id, { id, seccion, titulo, clase, html });

/* ═══ PORTADA ═══
   Del Manifiesto: «Un punto es alguien. Muchos puntos son una cohorte, un territorio, una cifra
   de impacto». Cientos de puntos llegan dispersos y se reúnen hasta formar un gran punto a la
   derecha; a la izquierda, la marca y la afirmación. Es pieza de la casa, así que solo lleva
   navy, blanco y el punto coral (Manifiesto: la sombrilla no usa colores de vertical). Las fotos
   quedan para el resto del deck. El lienzo lo anima `arrancarPuntos` mientras está en pantalla. */
lamina('portada', 'Portafolio', 'Critertec 2026', 'portada', () => `
  <canvas class="puntos" id="puntos" aria-hidden="true"></canvas>
  <div class="portada-cont">
    ${eyebrow('Portafolio 2026')}
    <img class="portada-logo pieza" ${d()} id="logo-portada" src="assets/logo/02-blanco-punto-coral.png" alt="Critertec">
    <h1 class="portada-tit pieza" ${d()}>${conPunto(C.QUIENES.que.replace(' en Latinoamérica.', ' <span class="apagado">en Latinoamérica.</span>'))}</h1>
    <p class="portada-frase pieza" ${d()}>${C.QUIENES.frase}<span class="punto">.</span></p>
  </div>
  <div class="portada-cifra pieza" ${d()}>
    <b>${C.INDICADORES[0].n}</b>
    <span>${C.INDICADORES[0].u} en ${C.INDICADORES[1].n} ${C.INDICADORES[1].u}<br><i>Cada punto es alguien</i></span>
  </div>`);

/* ═══ QUIÉNES SOMOS ═══ */
lamina('quienes', 'Quiénes somos', 'Quiénes somos', 'centro', () => `
  ${eyebrow(`Desde ${C.QUIENES.desde}`)}
  ${titular(C.QUIENES.que, true)}
  ${bajada(C.QUIENES.proposito)}
  ${pieDato('Criter Studio · Criter Academy · Criter Lab')}`);

/* ═══ INDICADORES ═══ */
lamina('impacto', 'Nuestro impacto', 'Nuestro impacto', null, () => `
  ${eyebrow('Nuestro impacto')}
  ${titular('Diez años de proyectos educativos de gran impacto <span class="apagado">en Latinoamérica.</span>')}
  <div class="indicadores pieza" ${d()}>
    ${C.INDICADORES.map((k) => `<div>
      <span class="n">${k.n}</span>
      <span class="u">${k.u}</span>
      <span class="d">${k.d}</span>
    </div>`).join('')}
  </div>
  ${pieDato('Cifras del Portafolio Critertec 2026')}`);

/* ═══ MAPA DE PAÍSES ═══
   Del caos al orden, con el mismo lenguaje de puntos de la portada: los puntos llegan dispersos,
   se ordenan en una trama que dibuja el croquis de Latinoamérica (sale de mapa-latam.js) y
   luego los ocho países se encienden en coral, uno por uno: primero Colombia, la sede, y desde
   ahí hacia afuera por distancia. Cada país se enciende en una onda que sale de su capital, con
   un pulso y su nombre; la lista de la izquierda se marca al mismo ritmo. Lo anima `arrancarMapa`. */
/** Por año de llegada: el mapa corre como línea del tiempo. */
const ordenMapa = () => [...C.PAISES].sort((x, y) => x.anio - y.anio);
/** Los años de la línea del tiempo, del primero al último, sin saltos. */
const aniosMapa = () => {
  const ys = C.PAISES.map((p) => p.anio);
  return Array.from({ length: Math.max(...ys) - Math.min(...ys) + 1 }, (_, k) => Math.min(...ys) + k);
};

lamina('mapa', 'Dónde trabajamos', 'Ocho países', 'mapa-full', () => `
  <canvas class="mapa-lienzo" id="mapa-puntos" role="img"
    aria-label="Mapa de Latinoamérica en puntos: los países donde Critertec tiene proyectos, por año de llegada: ${ordenMapa().map((p) => `${p.pais} (${p.anio})`).join(', ')}"></canvas>
  <div class="mapa-cab">
    ${eyebrow('Dónde hemos trabajado')}
    ${titular('Proyectos ejecutados en ocho países.')}
    <div class="mapa-tiempo pieza" ${d()}>
      <b class="mapa-anio" id="mapa-anio">${aniosMapa()[0]}</b>
      <ol class="mapa-hitos" id="mapa-hitos">
        ${aniosMapa().map((y) => {
    const suyos = C.PAISES.filter((p) => p.anio === y);
    return `<li data-y="${y}"${suyos.length ? ' class="hito"' : ''}><i></i><span>${y}</span></li>`;
  }).join('')}
      </ol>
    </div>
  </div>
  ${pieDato(`Sede en Bogotá · clientes globales: ${C.ALCANCE_GLOBAL.map((x) => x.corto).join(' · ')}`)}`);

/* ═══ DIFERENCIALES ═══ */
lamina('diferenciales', 'Qué nos hace diferentes', '¿Qué nos hace diferentes?', 'compacta', () => `
  ${eyebrow('Qué nos hace diferentes')}
  ${titular('Tres cosas que no se subcontratan.')}
  <div class="principios">
    ${C.DIFERENCIALES.map((b, i) => `<div class="principio pieza" style="--c:${b.color};--d:${i + 2}">
      <div class="foto"><img src="assets/principios/${b.foto}.jpg" alt=""></div>
      <div class="txt">
        <span class="nn">0${i + 1}</span>
        <h3>${b.t}</h3>
        <p>${b.d}</p>
        <span class="marca-dato">${b.dato}</span>
      </div>
    </div>`).join('')}
  </div>
  ${pieDato('No vendemos cursos: diseñamos las condiciones para que aprender sea inevitable')}`);

/* ═══ LAS TRES VERTICALES ═══
   Pantalla partida en diagonal: una cuña por vertical, con su foto, su tinte y el lockup de
   critertec.com. A media altura cada franja ocupa 0–33 %, 33–67 % y 67–100 %: sus ejes están
   en 16,5 %, 50 % y 83,5 %, y el bloque de texto se centra ahí. Al hacer clic la cuña se
   abre a pantalla completa con el detalle. */
const CUNAS = [
  { clip: 'polygon(0 0, 40% 0, 26% 100%, 0 100%)', eje: 16.5 },
  { clip: 'polygon(40% 0, 74% 0, 60% 100%, 26% 100%)', eje: 50 },
  { clip: 'polygon(74% 0, 100% 0, 100% 100%, 60% 100%)', eje: 83.5 },
];
const ANCHO_CUNA = 24;

lamina('verticales', 'Qué hacemos', 'Las tres verticales', 'diagonal', () => `
  <div class="diag">
    ${C.VERTICALES.map((v, i) => `
      <div class="diag-panel" data-v="${v.id}" tabindex="0" role="button"
        aria-label="Ver ${v.n} ${v.apellido}"
        style="clip-path:${CUNAS[i].clip};--c:${v.color};--desliz:${v.desliz}">
        <img src="assets/verticales/${v.foto}" alt="">
        <div class="tinte"></div><div class="oscuro"></div>
      </div>`).join('')}
    ${C.VERTICALES.map((v, i) => `
      <div class="diag-cont" style="left:${CUNAS[i].eje}%;width:${ANCHO_CUNA}%;
        margin-left:${-ANCHO_CUNA / 2}%;--c:${v.color}">
        <span class="diag-regla" style="background:${v.color}"></span>
        <span class="diag-cod">${v.cod} · ${v.q}</span>
        <span class="marca-v"><b>${v.n}</b> <i>${v.apellido}</i><span class="punto">.</span></span>
        <p>${v.d}</p>
      </div>`).join('')}
    ${C.VERTICALES.map((v) => `
      <div class="diag-detalle" data-det="${v.id}" style="--c:${v.color}">
        <div class="izq">
          <span class="diag-regla" style="background:${v.color}"></span>
          <span class="diag-cod">${v.cod} · ${v.q}</span>
          <span class="marca-v"><b>${v.n}</b> <i>${v.apellido}</i><span class="punto">.</span></span>
        </div>
        <div class="der">
          <p>${v.d}</p>
          <ul>${v.hace.map((h) => `<li>${h}</li>`).join('')}</ul>
          <span class="diag-cerrar">Clic para volver</span>
        </div>
      </div>`).join('')}
  </div>`);

/* ═══ QUÉ HACE CADA VERTICAL ═══
   La versión estática de la lámina anterior: la diagonal se explora, esta se lee y se
   imprime. En la versión corta no entra. */
lamina('que-hacemos', 'Qué hacemos', 'Qué hace cada vertical', 'compacta', () => `
  ${eyebrow('Qué hacemos')}
  ${titular('Lo que entrega cada vertical.')}
  <div class="cambios pieza" ${d()}>
    ${C.VERTICALES.map((v, i) => `<div style="--c:${v.color}">
      <span class="nn">${v.cod} · ${v.q}</span>
      <h3>${v.n} ${v.apellido}</h3>
      <ul>${v.hace.map((h) => `<li>${h}</li>`).join('')}</ul>
    </div>`).join('')}
  </div>
  ${pieDato('Los tres productos son la misma idea en tres formatos')}`);

/* ═══ SELLOS OFICIALES ═══ */
lamina('sellos', 'Alianzas oficiales', 'Partners oficiales', 'compacta', () => `
  ${eyebrow('Alianzas oficiales')}
  ${titular('Somos partner oficial de las dos plataformas que usan los maestros de la región.')}
  <div class="sellos">
    ${C.SELLOS.map((s, i) => `<div class="sello pieza" style="--c:${s.tinte};--d:${i + 2}">
      <div class="insignia">
        <img class="placa" src="assets/sellos/${s.sello}"
          alt="Insignia oficial de ${s.titulo}">
        <div class="quien">
          <h3>${s.titulo}</h3>
          <span class="region">${s.region}</span>
        </div>
      </div>
      <p>${s.d}</p>
      <div class="pie">
        ${enlace(s.link, s.linkTexto)}
        ${s.porVerificar ? pendiente() : ''}
      </div>
    </div>`).join('')}
  </div>`);

/* ═══ PREMIOS DE LA COMPAÑÍA ═══ */
lamina('premios', 'Premios', 'Premios y distinciones', 'compacta', () => `
  ${eyebrow('Premios y distinciones')}
  ${titular('Lo que han reconocido de nosotros.')}
  <div class="premios">
    ${C.PREMIOS.map((p, i) => `<div class="premio con-logo pieza" style="--c:${i % 2 ? 'var(--cian)' : 'var(--coral)'};--d:${i + 2}">
      <div class="placa${/\.jpg$/.test(p.logo) ? ' recorte' : ''}" style="--p:${p.placa}">
        <img src="assets/premios/${p.logo}" alt="Logo ${p.premio} ${p.anio}"></div>
      <span class="anio">${p.anio}</span>
      <h3>${p.premio}</h3>
      <span class="premiado">${p.proyecto}</span>
      <div class="pie">${refs(p)}</div>
    </div>`).join('')}
  </div>`);

/* ═══ RECONOCIMIENTOS DEL CEO ═══ */
lamina('ceo', 'Anexo', 'Anexo · Sebastián Moreno Cruz', 'compacta', () => `
  ${eyebrow('Anexo · Reconocimientos al liderazgo')}
  <div class="ceo-caja">
    <div class="ceo-retrato pieza" ${d()}><img src="assets/equipo/sebastian.jpg" alt="${C.CEO.n}"></div>
    <div class="ceo-ficha pieza" ${d()}>
      <span class="cargo">${C.CEO.cargo}</span>
      <span class="n">${C.CEO.n}</span>
      <p>${C.CEO.bio}</p>
      ${enlace(C.CEO.linkedin, 'Perfil en LinkedIn')}
    </div>
    <div class="recos pieza" ${d()}>
      ${C.RECONOCIMIENTOS_CEO.map((r) => `<div class="reco">
        <span class="anio">${r.anio}</span>
        <div class="cuerpo">
          <h3>${r.titulo}</h3>
          <span class="otorga">${r.otorga}</span>
          <p>${r.d}</p>
          ${refs(r)}
        </div>
      </div>`).join('')}
    </div>
  </div>`);

/* ═══ PALMARÉS CONSOLIDADO ═══
   Solo para la versión corta: junta premios de compañía y reconocimientos del CEO en una
   lámina, porque la corta no tiene sitio para las dos. */
lamina('palmares', 'Premios', 'Premios y reconocimientos', 'compacta', () => {
  const todo = [
    ...C.PREMIOS.map((p) => ({ anio: p.anio, t: p.premio, o: p.otorga, l: p, c: 'var(--coral)' })),
    ...C.RECONOCIMIENTOS_CEO.filter((r) => r.id !== 'andi-ceo')
      .map((r) => ({ anio: r.anio, t: r.titulo, o: r.otorga, l: r, c: 'var(--cian)' })),
  ];
  return `
  ${eyebrow('Premios y reconocimientos')}
  ${titular('Lo que han reconocido de la empresa y de quien la dirige.')}
  <div class="premios">
    ${todo.map((x, i) => `<div class="premio pieza" style="--c:${x.c};--d:${i + 2}">
      <span class="anio">${x.anio}</span>
      <h3>${x.t}</h3>
      <span class="otorga">${x.o}</span>
      <div class="pie">${refs(x.l)}</div>
    </div>`).join('')}
  </div>`;
});

/* ═══ PORTAFOLIO DE PROYECTOS ═══
   Todos los proyectos en una grilla, con tres selectores arriba —uno por vertical— a la manera
   de un portafolio web. Un selector filtra; pulsarlo otra vez vuelve a mostrar todos. Cada
   tarjeta con ficha la abre al hacer clic; las fichas quedan fuera de la secuencia lineal del
   deck (ver `arranca`). `filtroV` vive aquí y no en el DOM porque la lámina «campo» repinta el
   deck entero y el filtro tiene que sobrevivir a eso. */
let filtroV = null;
const idFicha = (p) => `p-${slug(p.p)}`;
/** Abre ficha todo proyecto con datos o con fotos: sin datos todavía, la ficha muestra al menos
    el carrusel, el nombre y la vertical, y los campos que falten simplemente no se pintan. */
const tieneFicha = (p) => Boolean(p.cliente || p.fotos.length);
/** Columnas de la grilla: ocho, o las que hagan falta para no pasar de cuatro filas. Las filas
    salen de cuántos proyectos hay y miden siempre lo mismo. */
const colsGrilla = () => Math.max(8, Math.ceil(enGrilla().length / 4));
/** Proyectos que salen en la grilla: los que tienen fotos. Los que aún no tienen quedan fuera
    hasta que las tengan; siguen en contenido.js y vuelven solos en cuanto se les agreguen. */
const enGrilla = () => C.PROYECTOS.filter((p) => p.fotos.length);
/** Por vertical, en el orden de VERTICALES —Studio, Academy, Lab—: así los lee la grilla y así
    los recorren → y ← dentro de las fichas. */
const ordenGrilla = () => C.VERTICALES.flatMap((v) => enGrilla().filter((p) => p.v === v.id));

lamina('portafolio', 'Proyectos', 'Nuestros proyectos', 'compacta', () => `
  <div class="port-cab">
    <div>
      ${eyebrow('Proyectos')}
      ${titular('Lo que hemos hecho.')}
    </div>
  </div>
  <div class="port-filtros">
    <div class="filtros pieza" ${d()} id="filtros" role="group" aria-label="Filtrar por vertical">
      ${C.VERTICALES.map((v) => `<button data-v="${v.id}" aria-pressed="${filtroV === v.id}"
        style="--c:${v.color}"><i></i>${v.n}${v.apellido}
        <span class="cn">${enGrilla().filter((p) => p.v === v.id).length}</span></button>`).join('')}
    </div>
  </div>
  <div class="grilla-proy pieza" id="grilla-proy" data-filtro="${filtroV || ''}"
    style="--d:${paso++};--cols:${colsGrilla()};--filas:${Math.ceil(enGrilla().length / colsGrilla())}">
    ${ordenGrilla().map((p) => {
  const v = vertDe(p.v);
  const tag = tieneFicha(p) ? 'button' : 'div';
  const meta = [p.lugar, p.anios].filter(Boolean).join(' · ');
  return `<${tag} class="pc${p.fotos.length ? '' : ' cartel'}" data-v="${p.v}" style="--c:${v.color}"
      ${tieneFicha(p) ? `data-ir="${idFicha(p)}" aria-label="Ver ficha de ${p.p}"` : ''}>
      ${p.fotos.length ? `<img src="assets/fotos/${p.fotos[0]}.jpg" alt="" loading="lazy">` : ''}
      <span class="velo"></span>
      <span class="txt">
        <span class="cat">${v.apellido}</span>
        <span class="nom">${p.p}</span>
        ${meta ? `<span class="meta">${meta}</span>` : ''}
      </span>
    </${tag}>`;
}).join('')}
  </div>`);

/* Carrusel de la ficha: tres franjas verticales en loop, cada una con FOTOS_CARRIL fotos de
   las que se ven tres. La del medio baja y las de los lados suben. Cada franja arranca en un
   punto distinto de la lista, así que aunque el proyecto tenga pocas fotos las tres franjas no
   muestran la misma a la vez; con dieciocho o más, cada franja lleva seis distintas.
   La pista repite su lista dos veces y se desplaza media altura: el salto de vuelta no se ve. */
const FOTOS_CARRIL = 6;
/** Segundos por vuelta completa de cada franja: ~6 s por foto, velocidad pausada. Difieren un
    poco para que las tres no se muevan en bloque. */
const DURACION_CARRIL = [36, 42, 39];
const carriles = (fotos) => {
  const n = fotos.length;
  const salto = n >= 3 * FOTOS_CARRIL ? FOTOS_CARRIL : Math.floor(n / 3);
  return [0, 1, 2].map((k) => Array.from({ length: FOTOS_CARRIL },
    (_, j) => fotos[(k * salto + j) % n]));
};

/* ═══ FICHAS DE PROYECTO ═══
   Una lámina por proyecto: foto a sangre a la izquierda, ficha a la derecha con la misma
   estructura del portafolio anterior —propósito, cómo, impacto—, que es la que ya reconocen
   los clientes que lo han recibido. */
for (const p of C.PROYECTOS.filter(tieneFicha)) {
  const v = vertDe(p.v);
  const id = idFicha(p);
  lamina(id, 'Proyectos', p.p, 'ficha', () => {
    const notas = (p.prensa || [])
      .map((k) => C.PRENSA.find((n) => n.id === k))
      .filter((n) => n && n.link);
    const campos = [['Cliente', p.cliente], ['Propósito', p.proposito], ['Cómo', p.como]]
      .filter(([, x]) => x);
    // Sin foto propia, el panel izquierdo va de cartel. Antes de esto tomaba prestada una
    // foto de otro proyecto, que en un portafolio que va a clientes es rotular una cosa
    // como otra.
    const panel = p.fotos.length
      ? `<div class="ficha-foto carriles">
          ${carriles(p.fotos).map((c, k) => `<div class="carril${k === 1 ? ' baja' : ''}" style="--t:${DURACION_CARRIL[k]}s">
            <div class="pista">${[...c, ...c].map((f) => `<i><img src="assets/fotos/${f}.jpg" alt="" loading="lazy"></i>`).join('')}</div>
          </div>`).join('')}
          <div class="velo"></div>
        </div>`
      : `<div class="ficha-cartel">
          <span class="regla"></span>
          <span class="marca-v"><b>${v.n}</b> <i>${v.apellido}</i><span class="punto">.</span></span>
          <span class="k">${p.anios} · ${p.lugar}</span>
          <span class="cifra">${p.impacto}</span>
        </div>`;
    return `
    <div class="ficha-caja" style="--c:${v.color}">
      ${panel}
      <div class="ficha-txt">
        <button class="volver" data-volver><span class="flecha">←</span> Volver a proyectos</button>
        <p class="eyebrow pieza" ${d()}>${v.cod} · ${v.apellido}</p>
        <h2 class="pieza" ${d()}>${p.p}</h2>
        ${p.lugar || p.anios ? `<div class="ficha-meta pieza" ${d()}>
          ${[p.lugar, p.anios].filter(Boolean).map((x) => `<span>${x}</span>`).join('<span class="sep"></span>')}
        </div>` : ''}
        ${campos.length ? `<div class="ficha-campos pieza" ${d()}>
          ${campos.map(([k, x]) => `<div><span class="k">${k}</span><span class="v">${x}</span></div>`).join('')}
        </div>` : ''}
        ${p.fotos.length && p.impacto ? `<div class="ficha-impacto pieza" ${d()}>
          <span class="k">Impacto</span><span class="v">${p.impacto}</span>
        </div>` : ''}
        ${notas.length ? `<div class="ficha-links pieza" ${d()}>
          ${notas.map((n) => enlace(n.link, n.medio)).join('')}
        </div>` : ''}
      </div>
    </div>`;
  });
}

/* ═══ MOSAICO DE CAMPO ═══
   Todas las fotos de terreno en una galería justificada, con un selector de proyecto al
   lado. Lo que sostiene el portafolio no es la lista: son las fotos. */
// `null` es «todos», que es como arranca la lámina. La galería justificada necesita bastantes
// fotos de proporciones mezcladas para llenar el marco: con las seis de un solo proyecto cabe
// una fila y sobra medio alto. Mostrando el campo entero llena, y el selector filtra a quien
// le interese un proyecto concreto.
let proyectoAbierto = null;
const MUESTRA_CAMPO = 20;
const TODOS = 'Todos';

lamina('campo', 'En el campo', 'En el campo', 'compacta', () => {
  const conFotos = C.PROYECTOS.filter((p) => p.fotos.length);
  const abierto = conFotos.find((p) => p.p === proyectoAbierto) || null;
  // El muro completo deja fuera capturas y piezas promocionales; la vista de un proyecto
  // concreto las conserva, porque ahí sí son el registro de lo entregado.
  const deCampo = (p) => p.fotos.filter((f) => !C.FUERA_DEL_MURO.has(f));
  // «Todo el campo» es una muestra: con sesenta fotos la galería justificada las dejaba de
  // cincuenta píxeles de alto. Se toman por turnos, una de cada proyecto por vuelta, hasta
  // MUESTRA_CAMPO; el selector de un proyecto sigue mostrando todas las suyas.
  const todas = conFotos.flatMap(deCampo);
  const muestra = [];
  for (let vuelta = 0; muestra.length < Math.min(MUESTRA_CAMPO, todas.length); vuelta++) {
    for (const p of conFotos) {
      const f = deCampo(p)[vuelta];
      if (f && muestra.length < MUESTRA_CAMPO) muestra.push(f);
    }
  }
  const fotos = abierto ? abierto.fotos : muestra;
  const pie = abierto
    ? `${[abierto.p, abierto.lugar].filter(Boolean).join(' · ')}`
    : `${conFotos.filter((p) => deCampo(p).length).length} proyectos · ${fotos.length} de ${todas.length} fotos de terreno · elige un proyecto para ver las suyas`;
  return `
  ${eyebrow('En el campo')}
  ${titular('Así se ve cuando pasa.')}
  <div class="carrusel">
    <div class="mosaico">
      ${fotos.map((f, i) => `<i data-ar="${C.FOTO_AR[f] || 1.5}" style="--d:${Math.min(i, 10)}"
        ><img src="assets/fotos/${f}.jpg" alt=""></i>`).join('')}
      <span class="pie">${pie}</span>
    </div>
    <div class="selector" id="selproy">
      <button data-proy="${TODOS}" aria-pressed="${!abierto}">
        <span>Todo el campo</span><span class="cn">${conFotos.reduce((a, p) => a + deCampo(p).length, 0)}</span>
      </button>
      ${conFotos.map((p) => `<button data-proy="${p.p}" aria-pressed="${p === abierto}">
        <span>${p.p}</span><span class="cn">${p.fotos.length}</span>
      </button>`).join('')}
    </div>
  </div>`;
});

/* ═══ DESARROLLOS PROPIOS ═══
   No es un catálogo: Critertec no vende productos. Es lo que la tecnología de la casa le
   aporta a cada proyecto, una tarjeta por vertical con su resultado en grande. */
lamina('desarrollos', 'Tecnología propia', 'Desarrollos propios', 'compacta', () => `
  ${eyebrow('Tecnología propia')}
  ${titular('No vendemos productos: diseñamos y ejecutamos proyectos educativos potenciados con tecnología.')}
  <div class="desarrollos">
    ${C.DESARROLLOS.map((x, i) => {
  const v = vertDe(x.v);
  return `<div class="desarrollo pieza" style="--c:${v.color};--d:${i + 2}">
      <div class="foto"><img src="assets/fotos/${x.foto}.jpg" alt=""></div>
      <div class="cuerpo">
        <span class="cat">${v.n}${v.apellido}</span>
        <span class="cifra">${x.cifra}</span>
        <span class="que">${x.que}</span>
        <p>${x.d}</p>
        <span class="con">${x.con}</span>
      </div>
    </div>`;
}).join('')}
  </div>`);

/* ═══ EN LOS MEDIOS ═══
   En la secuencia va el abanico de recortes; la lista completa vive en un anexo en tabla al
   final, al que se llega con el botón «Ver todas las notas». */
/* Abanico de recortes: cada nota con captura va completa —sin recortar— sobre una tarjeta
   vertical de papel, y las tarjetas se abren en abanico, un poco giradas, como notas sobre una
   mesa: se lee de un golpe que son varias. Una pasa al frente cada pocos segundos y abajo se lee
   su medio, su titular y el enlace; un clic en cualquiera la trae. Lo anima `arrancarAbanico`. */
const GIRO = [-6, 3, -2, 5, -4, 2, -3, 4];
const laminaRecortes = (id, titulo, lista) =>
  lamina(id, 'En los medios', titulo, 'compacta', () => {
    const notas = lista();
    return `
    <div class="port-cab">
      <div>
        ${eyebrow('En los medios')}
        ${titular(titulo)}
      </div>
      <button class="ver-todas pieza" ${d()} data-ir="prensa-anexo">Ver todas las notas
        <span class="cn">${C.PRENSA.length}</span> <span class="flecha">→</span></button>
    </div>
    <div class="abanico pieza" style="--d:${paso++};--n:${notas.length}">
      ${notas.map((n, k) => `<button class="hoja${k === 0 ? ' activa' : ''}" data-k="${k}"
        style="--i:${k};--rot:${GIRO[k % GIRO.length]}deg;--z:${10 - k}" aria-label="${n.medio}: ${n.titular}">
        <span class="papel"><img src="assets/prensa/${n.captura}.jpg" alt=""></span>
        <span class="sello">${n.medio}</span>
      </button>`).join('')}
    </div>
    <div class="abanico-notas">
      ${notas.map((n, k) => `<div class="abanico-nota${k === 0 ? ' on' : ''}" data-k="${k}">
        <span class="mm">${n.medio}</span>
        <span class="fecha">${n.fecha || n.pais}</span>
        <span class="tit">${n.titular}</span>
        ${n.link ? enlace(n.link, 'Leer la nota') : pendiente()}
      </div>`).join('')}
    </div>`;
  });

const conCaptura = () => C.PRENSA.filter((n) => n.captura);
laminaRecortes('medios-1', 'Han hablado de nosotros.', conCaptura);
laminaRecortes('medios-destacados', 'Han hablado de nosotros.', conCaptura);

/* Anexo de prensa: todas las notas en una tabla, de la más reciente a la más antigua. El año sale
   de la fecha escrita; las que no la tienen van al final. «Volver» regresa al abanico que haya en
   la versión (medios-1 en la larga, medios-destacados en la corta). */
const anioDe = (n) => Number(((n.fecha || '').match(/\d{4}/) || [0])[0]);
lamina('prensa-anexo', 'Anexo', 'Anexo · Todas las notas', 'compacta', () => `
  <div class="port-cab">
    <div>
      ${eyebrow('Anexo · En los medios')}
      ${titular('Todas las notas.')}
    </div>
    <button class="ver-todas pieza" ${d()} data-ir="medios-1,medios-destacados">
      <span class="flecha">←</span> Volver</button>
  </div>
  <div class="tabla-prensa pieza" ${d()}>
    <table>
      <thead><tr><th>Año</th><th>Medio</th><th>País</th><th>Titular</th><th></th></tr></thead>
      <tbody>
        ${[...C.PRENSA].sort((x, y) => anioDe(y) - anioDe(x)).map((n) => `<tr${n.link ? '' : ' class="sin-link"'}>
          <td class="anio">${anioDe(n) || '—'}</td>
          <td class="mm">${n.medio}</td>
          <td class="pais">${n.pais}</td>
          <td class="tit" title="${n.titular}"><span>${n.titular}</span></td>
          <td class="lk">${n.link ? enlace(n.link, 'Leer') : '<span class="pendiente">Sin enlace</span>'}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`);

/* ═══ ALIADOS ═══
   Todos los logos de clientes y aliados, a color, sobre un tablero blanco: varios vienen con
   transparencia o pensados para fondo claro, y así se ven como los emite cada marca. */
lamina('aliados', 'Aliados', 'Con quién trabajamos', 'compacta', () => `
  ${eyebrow('Clientes y aliados')}
  ${titular('Quiénes nos han permitido soñar en grande.')}
  <div class="aliados pieza" style="--d:${paso++}">
    ${C.ALIADOS.map((x) => `<div><img src="assets/clientes/${x.f}" alt="${x.n}" title="${x.n}" loading="lazy"></div>`).join('')}
  </div>`);

/* ═══ LA CASA ═══ */
lamina('casa', 'La casa', 'Dónde se hace', 'compacta', () => `
  ${eyebrow('La casa')}
  ${titular('Dónde se hace.')}
  ${bajada(C.CASA.d)}
  <div class="mosaico pieza" style="--d:${paso++};flex:1">
    ${C.CASA.fotos.map((f, i) => `<i data-ar="1.5" style="--d:${i}"
      ><img src="assets/oficina/${f}.jpg" alt=""></i>`).join('')}
  </div>`);

/* ═══ CIERRE ═══ */
lamina('cierre', 'Contacto', 'Creemos mejores futuros juntos', 'centro', () => `
  ${eyebrow('Hablemos')}
  ${titular('Creemos mejores futuros <span class="apagado">juntos.</span>', true)}
  <div class="contacto pieza" style="--d:${paso++};width:100%;text-align:left">
    <div>
      <span class="k">Compañía</span>
      <span class="v">${C.CONTACTO.empresa}<br>${C.CONTACTO.nit}</span>
    </div>
    <div>
      <span class="k">Dónde estamos</span>
      <span class="v">${C.CONTACTO.dir}</span>
    </div>
    <div>
      <span class="k">En línea</span>
      <span class="v">${enlace(C.CONTACTO.web, 'critertec.com')}<br>
        ${enlace(C.CONTACTO.academy, 'criteracademy.com')}</span>
    </div>
    <div>
      <span class="k">Contacto</span>
      <span class="v">${C.CONTACTO.prensa}<br>${enlace(C.CONTACTO.linkedin, 'LinkedIn')}</span>
    </div>
  </div>`);

/* ─────────────────────────────────────────────────────────────
   Montaje y navegación
   ───────────────────────────────────────────────────────────── */

/** Láminas con botones o tarjetas en los bordes, donde las zonas de clic estorban. */
const CON_CONTROLES = new Set(['portafolio', 'medios-1', 'medios-destacados', 'prensa-anexo']);

export function arranca(plan) {
  // Las fichas de proyecto no van en el plan: si el plan trae la grilla, el motor las agrega
  // al final del deck, fuera de la secuencia. Se llega a ellas desde la grilla y desde ahí →
  // y ← recorren las fichas del filtro activo; al pasar la última se vuelve a la grilla.
  const fichas = plan.includes('portafolio')
    ? C.PROYECTOS.filter(tieneFicha).map(idFicha).filter((id) => !plan.includes(id)) : [];
  const L = [...plan, ...fichas].map((id) => {
    const s = LAMINAS.get(id);
    if (!s) throw new Error(`Lámina desconocida en el plan: «${id}»`);
    return s;
  });
  const enSecuencia = plan.length;
  const esFicha = (i) => i >= enSecuencia;
  const iGrilla = plan.indexOf('portafolio');
  const indice = (id) => L.findIndex((x) => x.id === id);
  /** Las fichas en el orden de la grilla, respetando el filtro de vertical activo. */
  const fichasVisibles = () => ordenGrilla()
    .filter((p) => tieneFicha(p) && (!filtroV || p.v === filtroV)).map((p) => indice(idFicha(p)));

  let actual = 0;
  const deck = document.getElementById('deck');
  const contador = document.getElementById('contador').querySelector('span');
  const seccion = document.getElementById('seccion');
  const avance = document.getElementById('avance');
  const logo = document.getElementById('logo');
  const general = document.getElementById('general');
  const rejilla = document.getElementById('rejilla');

  function pintar() {
    deck.innerHTML = L.map((s) => {
      reinicia();
      return `<section class="slide ${s.clase || ''}" id="l-${s.id}" aria-hidden="true"
        >${s.html()}</section>`;
    }).join('');
    conectar();
    ir(actual, true);
    ajustarLogo();
  }

  // ---------------- pulso ----------------
  // Un solo ritmo para todo el deck: el latido (lub-dub) de la portada, el del campo de fondo en
  // el cierre y el de los puntos de los titulares en CSS (--pulso, al doble de tiempo).
  const PULSO = 1400;
  /** 0…1: dos golpes al principio de cada ciclo, como un corazón. */
  const latido = (t) => {
    const f = ((t % PULSO) + PULSO) % PULSO / PULSO;
    const golpe = (c, w) => Math.max(0, 1 - Math.abs(f - c) / w);
    return Math.max(golpe(0.06, 0.06), golpe(0.2, 0.06) * 0.6);
  };
  const suaveS = (x) => 1 - Math.pow(1 - x, 3);
  const suaveIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const lim01 = (x) => Math.min(1, Math.max(0, x));
  const colores = () => {
    const css = getComputedStyle(document.documentElement);
    return { claro: css.getPropertyValue('--texto').trim() || '#fff',
      coral: css.getPropertyValue('--coral').trim() || '#FF1E56' };
  };

  // ---------------- portada: divergir, converger, contagiar ----------------
  // Del Manifiesto: «un punto es alguien; muchos puntos son una cohorte». Y del diseño centrado
  // en las personas, sus dos movimientos:
  //   1 · un solo punto coral late; de su latido estallan cientos de puntos que se dispersan
  //       por la pantalla (divergencia) y luego se reúnen y ordenan en un gran disco (convergencia);
  //   2 · el punto sigue latiendo y cada latido lanza una onda que enciende de coral los puntos
  //       dentro de un radio cada vez mayor; cada punto encendido se une al vecino que lo
  //       contagió, y la red crece desde el centro hasta cubrir el disco.
  // Los vecinos salen de la espiral de girasol: en ella, los puntos k-8, k-13, k-21, k-34 y k-55
  // (números de Fibonacci) son los más cercanos hacia el centro.
  let cuadro = 0;
  const pararPuntos = () => { cancelAnimationFrame(cuadro); cuadro = 0; };
  function arrancarPuntos() {
    pararPuntos();
    const lienzo = document.getElementById('puntos');
    if (!lienzo) return;
    const ctx = lienzo.getContext('2d');
    const dpr = Math.min(2, devicePixelRatio || 1);
    const { width: w, height: h } = lienzo.getBoundingClientRect();
    if (!w || !h) return;
    lienzo.width = w * dpr; lienzo.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const { claro, coral } = colores();
    const angosta = w < 860;
    const R = angosta ? Math.min(w, h) * 0.42 : Math.min(h * 0.37, w * 0.23);
    const cx = angosta ? w / 2 : w * 0.745, cy = angosta ? h * 0.42 : h * 0.44;
    const N = 640, oro = Math.PI * (3 - Math.sqrt(5));
    const pts = Array.from({ length: N }, (_, k) => {
      const rr = R * Math.sqrt((k + 0.5) / N), ang = k * oro;
      return {
        rr, tx: cx + rr * Math.cos(ang), ty: cy + rr * Math.sin(ang),
        dx: Math.random() * w, dy: Math.random() * h,
        r: 1.1 + Math.random() * 1.6, fase: Math.random() * Math.PI * 2,
        d1: 700 + Math.random() * 700, d2: 2500 + Math.random() * 600 + (rr / R) * 500,
      };
    });
    for (let k = 0; k < N; k++) {
      let mejor = -1, dm = Infinity;
      for (const o of [8, 13, 21, 34, 55]) {
        const q = k - o;
        if (q < 0) continue;
        const dd = Math.hypot(pts[q].tx - pts[k].tx, pts[q].ty - pts[k].ty);
        if (dd < dm) { dm = dd; mejor = q; }
      }
      pts[k].padre = mejor;
    }
    const RED = 5000, LATIDOS = 7, ONDA = 800;
    // Cuándo se enciende cada punto: en el primer latido cuyo radio lo alcanza, cuando la onda pasa.
    for (const p of pts) {
      const kk = Math.min(LATIDOS - 1, Math.floor((p.rr / R) * LATIDOS - 1e-6));
      const Rk = R * (kk + 1) / LATIDOS;
      p.luz = RED + kk * PULSO + ONDA * (p.rr / Rk);
    }
    const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    const pinta = (ahora) => {
      const t = quieto ? 1e6 : ahora - t0;
      ctx.clearRect(0, 0, w, h);
      const pos = (p) => {
        if (t < p.d1) return [cx, cy, 0];
        if (t < p.d2) { const k = suaveS(lim01((t - p.d1) / 1300)); return [cx + (p.dx - cx) * k, cy + (p.dy - cy) * k, k]; }
        const k = suaveIO(lim01((t - p.d2) / 1800));
        const resp = Math.sin(t / 1400 + p.fase) * 1.4 * k;
        return [p.dx + (p.tx - p.dx) * k + resp, p.dy + (p.ty - p.dy) * k + resp * 0.6, 1];
      };
      const xy = pts.map(pos);
      // red: del punto que contagia al contagiado
      ctx.lineWidth = 0.8; ctx.strokeStyle = coral;
      for (let k = 0; k < N; k++) {
        const p = pts[k];
        if (p.padre < 0 || t < p.luz) continue;
        const g = lim01((t - p.luz) / 350);
        const [x1, y1] = xy[p.padre], [x2, y2] = xy[k];
        ctx.globalAlpha = 0.28 * g;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 + (x2 - x1) * g, y1 + (y2 - y1) * g); ctx.stroke();
      }
      for (let k = 0; k < N; k++) {
        const p = pts[k], [x, y, vis] = xy[k];
        if (!vis) continue;
        const g = t >= p.luz ? lim01((t - p.luz) / 300) : 0;
        ctx.globalAlpha = g ? 0.5 + 0.45 * g : 0.22 + 0.45 * vis;
        ctx.fillStyle = g ? coral : claro;
        ctx.beginPath(); ctx.arc(x, y, p.r * (1 + 0.5 * Math.sin(Math.PI * g)), 0, Math.PI * 2); ctx.fill();
      }
      // ondas de cada latido, desde que arranca la red
      if (t >= RED) {
        const kb = Math.floor((t - RED) / PULSO), tb = (t - RED) % PULSO;
        const Rk = R * Math.min(1, (kb + 1) / LATIDOS) * (kb >= LATIDOS ? 1.08 : 1);
        const a = lim01(tb / ONDA);
        ctx.globalAlpha = 0.55 * (1 - a); ctx.lineWidth = 1.2; ctx.strokeStyle = coral;
        ctx.beginPath(); ctx.arc(cx, cy, Rk * suaveS(a), 0, Math.PI * 2); ctx.stroke();
      }
      // el corazón: late desde el principio
      ctx.globalAlpha = 1; ctx.fillStyle = coral;
      ctx.beginPath(); ctx.arc(cx, cy, 6 * (1 + 0.6 * latido(t)), 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      if (!quieto) cuadro = requestAnimationFrame(pinta);
    };
    cuadro = requestAnimationFrame(pinta);
  }

  // ---------------- campo de fondo ----------------
  // Una trama tenue de puntos detrás de todas las láminas. Respira; en cada cambio de lámina se
  // dispersa un poco hacia afuera y vuelve a ordenarse en otra posición (divergir y converger en
  // cada paso). En el cierre, el punto de «juntos.» late y contagia de coral al campo, con la
  // misma red que en la portada. Se oculta donde la lámina trae su propio lienzo o va a sangre.
  const fondo = document.createElement('canvas');
  fondo.id = 'fondo-puntos'; fondo.setAttribute('aria-hidden', 'true');
  document.body.prepend(fondo);
  const fctx = fondo.getContext('2d');
  let campo = [], fw = 0, fh = 0, fpaso = 56, fcambio = 0, contagio = null, fcol = colores();
  const SIN_FONDO = /^(portada|mapa|verticales|desarrollos)$|^p-/;
  function armarCampo() {
    const dpr = Math.min(2, devicePixelRatio || 1);
    fw = innerWidth; fh = innerHeight;
    fondo.width = fw * dpr; fondo.height = fh * dpr;
    fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fpaso = Math.max(40, Math.min(fw, fh) / 15);
    campo = [];
    for (let y = fpaso / 2; y < fh; y += fpaso) {
      for (let x = fpaso / 2; x < fw; x += fpaso) {
        campo.push({ bx: x, by: y, x, y, fx: x, fy: y, hx: x, hy: y, fase: Math.random() * 6.28,
          coral: Math.random() < 0.06 });
      }
    }
    fcol = colores();
  }
  function cambiarCampo(id) {
    fondo.style.opacity = SIN_FONDO.test(id) ? '0' : '1';
    fcambio = performance.now();
    const ccx = fw / 2, ccy = fh / 2;
    for (const p of campo) {
      p.fx = p.x; p.fy = p.y;
      const ang = Math.atan2(p.y - ccy, p.x - ccx);
      p.ox = Math.cos(ang) * fpaso * 0.6; p.oy = Math.sin(ang) * fpaso * 0.6;
      p.hx = p.bx + (Math.random() - 0.5) * fpaso * 0.45;
      p.hy = p.by + (Math.random() - 0.5) * fpaso * 0.45;
      p.luz = null;
    }
    contagio = null;
    if (id === 'cierre') {
      // el origen es el punto de «juntos.», cuando ya está en su sitio
      const turno = fcambio;
      setTimeout(() => {
        // Si ya se pasó a otra lámina, no arranca.
        if (turno !== fcambio) return;
        const el = document.querySelector('#l-cierre .titular .punto');
        if (!el) return;
        const rc = el.getBoundingClientRect();
        contagio = { x: rc.left + rc.width / 2, y: rc.top + rc.height * 0.72, t0: performance.now() };
        const diag = Math.hypot(fw, fh);
        for (const p of campo) {
          const dd = Math.hypot(p.hx - contagio.x, p.hy - contagio.y);
          const kk = Math.floor(dd / (diag * 0.1));
          p.luz = kk * PULSO + 700 * ((dd % (diag * 0.1)) / (diag * 0.1));
          p.coralFinal = Math.random() < 0.55;
          // vecino ya encendido más cercano, para la red
          let mejor = null, dm = Infinity;
          for (const q of campo) {
            if (q === p) continue;
            const dq = Math.hypot(q.hx - contagio.x, q.hy - contagio.y);
            if (dq >= dd) continue;
            const d2 = Math.hypot(q.hx - p.hx, q.hy - p.hy);
            if (d2 < dm && d2 < fpaso * 1.6) { dm = d2; mejor = q; }
          }
          p.padre = mejor;
        }
      }, 900);
    }
  }
  function pintaCampo(ahora) {
    requestAnimationFrame(pintaCampo);
    if (document.hidden || fondo.style.opacity === '0') return;
    const t = ahora - fcambio;
    fctx.clearRect(0, 0, fw, fh);
    const k = suaveIO(lim01(t / 1600));
    const sal = Math.sin(Math.PI * lim01(t / 1600));
    for (const p of campo) {
      const resp = Math.sin(ahora / 2200 + p.fase) * 1.5;
      p.x = p.fx + (p.hx - p.fx) * k + p.ox * sal + resp;
      p.y = p.fy + (p.hy - p.fy) * k + p.oy * sal + resp * 0.6;
    }
    const tc = contagio ? ahora - contagio.t0 : -1;
    if (contagio) {
      fctx.lineWidth = 0.7; fctx.strokeStyle = fcol.coral;
      for (const p of campo) {
        if (!p.padre || tc < p.luz) continue;
        fctx.globalAlpha = 0.16 * lim01((tc - p.luz) / 400);
        fctx.beginPath(); fctx.moveTo(p.padre.x, p.padre.y); fctx.lineTo(p.x, p.y); fctx.stroke();
      }
      const a = lim01((tc % PULSO) / 900);
      fctx.globalAlpha = 0.3 * (1 - a); fctx.lineWidth = 1;
      fctx.beginPath(); fctx.arc(contagio.x, contagio.y, Math.hypot(fw, fh) * 0.1 * (Math.floor(tc / PULSO) + 1) * suaveS(a), 0, Math.PI * 2); fctx.stroke();
    }
    for (const p of campo) {
      const lit = contagio && tc >= p.luz && p.coralFinal;
      fctx.globalAlpha = lit ? 0.55 : p.coral ? 0.28 : 0.1;
      fctx.fillStyle = lit || p.coral ? fcol.coral : fcol.claro;
      fctx.beginPath(); fctx.arc(p.x, p.y, lit ? 2.2 : 1.6, 0, Math.PI * 2); fctx.fill();
    }
    fctx.globalAlpha = 1;
  }
  armarCampo();
  requestAnimationFrame(pintaCampo);

  // ---------------- mapa de puntos ----------------
  // La trama se calcula una vez por tamaño de lienzo: cada nodo de una rejilla hexagonal se
  // prueba contra los trazos de cada país (Path2D + isPointInPath en coordenadas del viewBox).
  // A los países clave se les suma un punto en la capital, para que Puerto Rico o Panamá —que
  // a esta resolución casi no tienen nodos— también se enciendan.
  let cuadroMapa = 0, tramaMapa = null;
  const pararMapa = () => { cancelAnimationFrame(cuadroMapa); cuadroMapa = 0; };
  function tramaDe(w, h) {
    if (tramaMapa && tramaMapa.w === w && tramaMapa.h === h) return tramaMapa;
    const riel = Math.min(90, h * 0.1), angosta = w < 860;
    const sc = Math.min(w / VISTA.w, (h - 2 * riel) / VISTA.h);
    const ox = angosta ? (w - VISTA.w * sc) / 2 : w - VISTA.w * sc - w * 0.06;
    const oy = riel + (h - 2 * riel - VISTA.h * sc) / 2;
    const ctx = document.createElement('canvas').getContext('2d');
    const trazos = PAISES_GEO.map((g) => ({ id: g.id, p: new Path2D(g.d) }));
    const paso = Math.max(6.5, Math.min(w, h) / 64);
    const clave = new Map(C.PAISES.map((p) => [p.iso, p]));
    const puntos = [];
    for (let fila = 0, y = oy + paso / 2; y < oy + VISTA.h * sc; fila++, y += paso * 0.866) {
      for (let x = ox + (fila % 2 ? paso : paso / 2); x < ox + VISTA.w * sc; x += paso) {
        const vx = (x - ox) / sc, vy = (y - oy) / sc;
        const t = trazos.find((q) => ctx.isPointInPath(q.p, vx, vy));
        if (t) puntos.push({ tx: x, ty: y, iso: clave.has(t.id) ? t.id : null });
      }
    }
    const capitales = C.PAISES.map((p) => {
      const [vx, vy] = proyecta(p.lon, p.lat);
      return { iso: p.iso, x: ox + vx * sc, y: oy + vy * sc, p };
    });
    for (const c of capitales) puntos.push({ tx: c.x, ty: c.y, iso: c.iso, cap: true });
    for (const pt of puntos) {
      const c = capitales.find((k) => k.iso === pt.iso);
      pt.dist = c ? Math.hypot(pt.tx - c.x, pt.ty - c.y) : 0;
    }
    tramaMapa = { w, h, paso, puntos, capitales };
    return tramaMapa;
  }
  function arrancarMapa() {
    pararMapa();
    const lienzo = document.getElementById('mapa-puntos');
    if (!lienzo) return;
    const { width: w, height: h } = lienzo.getBoundingClientRect();
    if (!w || !h) return;
    const dpr = Math.min(2, devicePixelRatio || 1);
    lienzo.width = w * dpr; lienzo.height = h * dpr;
    const ctx = lienzo.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const css = getComputedStyle(document.documentElement);
    const claro = css.getPropertyValue('--texto').trim() || '#fff';
    const coral = css.getPropertyValue('--coral').trim() || '#FF1E56';
    const fondo = css.getPropertyValue('--fondo').trim() || '#12103A';
    const mono = css.getPropertyValue('--mono').trim() || 'monospace';
    const { paso, puntos, capitales } = tramaDe(w, h);
    for (const p of puntos) {
      p.x0 = Math.random() * w; p.y0 = Math.random() * h;
      p.dly = Math.random() * 700 + (p.tx / w) * 900; p.fase = Math.random() * Math.PI * 2;
    }
    // Línea del tiempo: tras armarse el croquis, un año cada POR_ANIO ms; cada país se enciende
    // cuando el contador llega a su año.
    const anios = aniosMapa();
    const LLEGADA = 1900, INICIO = 2700, POR_ANIO = 700;
    const inicioAnio = (y) => INICIO + (y - anios[0]) * POR_ANIO;
    const anioDe = new Map(C.PAISES.map((p) => [p.iso, p.anio]));
    const r0 = paso * 0.2;
    const ETQ = { der: [1, 0, 'left'], izq: [-1, 0, 'right'], arriba: [0, -1, 'center'],
      abajo: [0, 1, 'center'], 'abajo-der': [0.35, 1, 'left'] };
    const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const suave = (x) => 1 - Math.pow(1 - x, 3);
    const lim = (x) => Math.min(1, Math.max(0, x));
    const anioEl = document.getElementById('mapa-anio');
    const hitos = [...document.querySelectorAll('#mapa-hitos li')];
    hitos.forEach((li) => li.classList.remove('on'));
    let ultimo = null;
    const t0 = performance.now();
    const pinta = (ahora) => {
      const t = quieto ? 1e6 : ahora - t0;
      // contador y línea del tiempo
      const actual = anios[Math.max(0, Math.min(anios.length - 1, Math.floor((t - INICIO) / POR_ANIO)))];
      if (t >= INICIO && actual !== ultimo) {
        ultimo = actual;
        if (anioEl) anioEl.textContent = actual;
        hitos.forEach((li) => li.classList.toggle('on', Number(li.dataset.y) <= actual));
      }
      ctx.clearRect(0, 0, w, h);
      const apaga = lim((t - INICIO) / 1200);
      for (const p of puntos) {
        const k = suave(lim((t - p.dly) / LLEGADA));
        const resp = Math.sin(t / 1500 + p.fase) * 0.9 * k;
        const x = p.x0 + (p.tx - p.x0) * k + resp, y = p.y0 + (p.ty - p.y0) * k + resp * 0.5;
        const luz = p.iso ? lim((t - inicioAnio(anioDe.get(p.iso)) - p.dist * 2) / 380) : 0;
        if (luz > 0) {
          ctx.globalAlpha = 0.55 + 0.45 * luz; ctx.fillStyle = coral;
          ctx.beginPath(); ctx.arc(x, y, r0 * (1 + 0.25 * Math.sin(Math.PI * luz)), 0, Math.PI * 2); ctx.fill();
        } else if (!p.cap) {
          ctx.globalAlpha = (0.18 + 0.4 * k) * (1 - 0.35 * apaga); ctx.fillStyle = claro;
          ctx.beginPath(); ctx.arc(x, y, r0, 0, Math.PI * 2); ctx.fill();
        }
      }
      // Nombres: una línea roja fina desde la capital hasta el nombre, y el año debajo.
      const fs1 = Math.max(10, Math.min(15, paso * 1.25));
      ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      for (const c of capitales) {
        const tc = t - inicioAnio(c.p.anio);
        const al = lim((tc - 150) / 450);
        if (al <= 0) continue;
        const [dx, dy, alin] = ETQ[c.p.lado] || ETQ.der;
        const largo = paso * 2.6 * suave(al);
        const ex = c.x + dx * largo, ey = c.y + dy * largo;
        ctx.globalAlpha = al; ctx.strokeStyle = coral; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(ex, ey); ctx.stroke();
        const sep = 6;
        const tx = ex + (dx > 0 ? sep : dx < 0 ? -sep : 0);
        const ty = ey + (dy > 0 ? fs1 * 0.8 : dy < 0 ? -fs1 * 1.4 : 0);
        ctx.textAlign = alin;
        ctx.font = `500 ${fs1}px ${mono}`;
        ctx.strokeStyle = fondo; ctx.lineWidth = 5; ctx.strokeText(c.p.pais.toUpperCase(), tx, ty);
        ctx.fillStyle = claro; ctx.fillText(c.p.pais.toUpperCase(), tx, ty);
        ctx.font = `500 ${fs1 * 0.85}px ${mono}`;
        ctx.strokeText(String(c.p.anio), tx, ty + fs1 * 1.15);
        ctx.fillStyle = coral; ctx.fillText(String(c.p.anio), tx, ty + fs1 * 1.15);
      }
      ctx.globalAlpha = 1;
      if (!quieto) cuadroMapa = requestAnimationFrame(pinta);
    };
    cuadroMapa = requestAnimationFrame(pinta);
  }

  // ---------------- abanico de prensa ----------------
  let relojAbanico = 0;
  const pararAbanico = () => { clearInterval(relojAbanico); relojAbanico = 0; };
  /** Trae al frente la tarjeta k: las vecinas quedan encima de las lejanas. */
  function activarRecorte(k) {
    const ab = document.querySelector('.slide.viva .abanico');
    if (!ab) return;
    ab.dataset.activa = k;
    ab.querySelectorAll('.hoja').forEach((c) => {
      const i = Number(c.dataset.k);
      c.classList.toggle('activa', i === k);
      c.style.setProperty('--z', String(20 - Math.abs(i - k)));
    });
    ab.parentElement.querySelectorAll('.abanico-nota').forEach((x) =>
      x.classList.toggle('on', Number(x.dataset.k) === k));
  }
  function arrancarAbanico() {
    pararAbanico();
    const ab = document.querySelector('.slide.viva .abanico');
    if (!ab) return;
    const n = ab.querySelectorAll('.hoja').length;
    activarRecorte(0);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    relojAbanico = setInterval(() => {
      if (ab.matches(':hover')) return;
      activarRecorte((Number(ab.dataset.activa || 0) + 1) % n);
    }, 4000);
  }

  // ---------------- verticales expandibles ----------------
  function abrirVertical(id) {
    const s = document.getElementById('l-verticales');
    if (!s) return;
    s.querySelectorAll('.diag-panel').forEach((p) => {
      p.classList.toggle('abierto', p.dataset.v === id);
      p.classList.toggle('cerrado', Boolean(id) && p.dataset.v !== id);
    });
    s.querySelectorAll('.diag-cont').forEach((c) => c.classList.toggle('oculto', Boolean(id)));
    s.querySelectorAll('.diag-detalle').forEach((x) => x.classList.toggle('on', x.dataset.det === id));
    s.dataset.abierta = id || '';
  }

  // ---------------- mosaico de campo ----------------
  /**
   * Coloca las fotos como galería justificada: cada fila llena el ancho del marco y cada
   * foto conserva su proporción exacta, así que ninguna se recorta.
   *
   * Una cuadrícula de celdas iguales no sirve: las fotos van de vertical de celular a 16:9 y
   * las verticales perdían dos tercios. Con proporciones fijas no se puede llenar el ancho Y
   * el alto a la vez, así que se justifica al ancho —que es lo que se ve— y se escoge el
   * número de filas cuyo alto natural más se acerca al del marco sin pasarse.
   */
  const HUECO_MOSAICO = 3;

  function ajustarMosaico(sel) {
    const m = document.querySelector(sel);
    if (!m) return;
    const caja = m.getBoundingClientRect();
    const fotos = [...m.querySelectorAll(':scope > i')];
    if (!fotos.length || !caja.width || !caja.height) return;
    const ar = (f) => Number(f.dataset.ar) || 1.5;
    const suma = fotos.reduce((a, f) => a + ar(f), 0);

    /** Reparte las fotos en n filas de proporción pareja, en el orden en que vienen. */
    const repartir = (n) => {
      const objetivo = suma / n;
      const filas = [];
      let fila = [];
      let acum = 0;
      for (const f of fotos) {
        fila.push(f);
        acum += ar(f);
        // se cierra la fila al llegar al objetivo, dejando sitio para las que faltan
        if (acum >= objetivo && filas.length < n - 1
          && fotos.length - (filas.flat().length + fila.length) >= n - filas.length - 1) {
          filas.push(fila); fila = []; acum = 0;
        }
      }
      if (fila.length) filas.push(fila);
      return filas;
    };

    /** Alto de una fila justificada al ancho del marco. */
    const altoDe = (fila) => (caja.width - HUECO_MOSAICO * (fila.length - 1))
      / fila.reduce((a, x) => a + ar(x), 0);

    // Se prueban todos los repartos y gana el que más llena el marco sin desbordarlo. De cada
    // uno se prueban dos variantes: con la última fila justificada al ancho, y con la última
    // fila corta —heredando el alto de la anterior—, que suele llenar bastante más.
    let mejor = null;
    const probar = (filas, altos) => {
      const total = altos.reduce((a, b) => a + b, 0) + HUECO_MOSAICO * (filas.length - 1);
      const cabe = total <= caja.height + 1
        && altos.every((h, i) => filas[i].reduce((a, x) => a + ar(x) * h, 0)
          + HUECO_MOSAICO * (filas[i].length - 1) <= caja.width + 1);
      if (cabe && (!mejor || total > mejor.total)) mejor = { filas, altos, total };
    };
    for (let n = 1; n <= fotos.length; n++) {
      const filas = repartir(n);
      if (filas.length !== n) continue;
      const altos = filas.map(altoDe);
      probar(filas, altos);
      if (n > 1) probar(filas, altos.map((h, i) => (i === n - 1 ? altos[n - 2] : h)));
    }
    // Si ni la repartición más fina cabe, se usa la más alta y el marco recorta lo justo.
    if (!mejor) {
      const filas = repartir(fotos.length);
      mejor = { filas, altos: filas.map(altoDe) };
    }

    mejor.filas.forEach((fila, i) => {
      fila.forEach((f) => {
        f.style.height = `${mejor.altos[i]}px`;
        f.style.flex = `0 0 ${ar(f) * mejor.altos[i]}px`;
      });
    });
  }

  /** Las dos láminas que llevan mosaico justificado, con el selector que las encuentra. */
  const MOSAICOS = { campo: '#l-campo .mosaico', casa: '#l-casa .mosaico' };
  const ajustarActual = () => {
    const sel = MOSAICOS[L[actual].id];
    if (sel) ajustarMosaico(sel);
  };

  function conectar() {
    // Verticales: clic en una cuña la lleva a pantalla completa; clic en el detalle vuelve.
    const sv = document.getElementById('l-verticales');
    sv?.addEventListener('click', (ev) => {
      const det = ev.target.closest('.diag-detalle');
      if (det) { abrirVertical(null); return; }
      const p = ev.target.closest('.diag-panel');
      if (p) abrirVertical(p.dataset.v === sv.dataset.abierta ? null : p.dataset.v);
    });
    sv?.addEventListener('keydown', (ev) => {
      const p = ev.target.closest('.diag-panel');
      if (p && (ev.key === 'Enter' || ev.key === ' ')) {
        ev.preventDefault(); abrirVertical(p.dataset.v);
      }
    });

    // Campo: cambiar de proyecto en la lista repinta el mosaico.
    document.getElementById('selproy')?.addEventListener('click', (ev) => {
      const b = ev.target.closest('button[data-proy]');
      if (!b) return;
      proyectoAbierto = b.dataset.proy === TODOS ? null : b.dataset.proy;
      pintar();
    });
  }

  function ir(n, inmediato = false) {
    actual = Math.max(0, Math.min(L.length - 1, n));
    [...deck.children].forEach((el, i) => {
      el.classList.toggle('viva', i === actual);
      el.classList.toggle('salio', i < actual);
      el.setAttribute('aria-hidden', String(i !== actual));
    });
    // Una ficha cuenta como la lámina de la grilla: está «dentro» de ella.
    const pos = esFicha(actual) ? iGrilla : actual;
    contador.textContent = `${String(pos + 1).padStart(2, '0')} / ${enSecuencia}`;
    seccion.textContent = L[actual].seccion;
    // En las láminas con controles propios las zonas de clic de los bordes se apagan: tapan los
    // botones y las tarjetas de las columnas extremas, y un clic ahí pasaba de lámina.
    document.body.toggleAttribute('data-controles', CON_CONTROLES.has(L[actual].id));
    avance.style.width = `${100 * (pos + 1) / enSecuencia}%`;
    rejilla.querySelectorAll('button').forEach((b, i) =>
      b.setAttribute('aria-current', String(i === actual)));
    // Los puntos de la portada solo se animan mientras está en pantalla; al volver, se reúnen
    // de nuevo. En la portada el logo del riel se oculta: ya está en grande.
    cambiarCampo(L[actual].id);
    const enPortada = L[actual].id === 'portada';
    document.body.toggleAttribute('data-portada', enPortada);
    if (enPortada) arrancarPuntos(); else pararPuntos();
    if (L[actual].id === 'mapa') arrancarMapa(); else pararMapa();
    if (/^medios-(1|destacados)$/.test(L[actual].id)) arrancarAbanico(); else pararAbanico();
    // Salir de la lámina de verticales la deja recogida para la próxima vuelta.
    if (L[actual].id !== 'verticales') abrirVertical(null);
    // Se llama de inmediato y otra vez tras el reflujo: el alto del marco depende del riel.
    ajustarActual();
    requestAnimationFrame(ajustarActual);
    if (inmediato) requestAnimationFrame(ajustarActual);
  }

  // ---------------- control ----------------
  /** Dentro de las fichas, → y ← recorren las del filtro activo; fuera, la secuencia. */
  const paso = (delta) => {
    if (!esFicha(actual)) { ir(Math.min(enSecuencia - 1, actual + delta)); return; }
    const lista = fichasVisibles();
    const k = lista.indexOf(actual) + delta;
    ir(k >= 0 && k < lista.length ? lista[k] : iGrilla);
  };
  const sig = () => paso(1);
  const ant = () => paso(-1);

  // Grilla de proyectos: filtros, apertura de fichas y regreso. Va en el deck, que persiste
  // entre repintados, y no en `conectar`, que se vuelve a llamar con cada uno.
  deck.addEventListener('click', (ev) => {
    const f = ev.target.closest('#filtros button[data-v]');
    if (f) {
      filtroV = filtroV === f.dataset.v ? null : f.dataset.v;
      document.getElementById('grilla-proy').dataset.filtro = filtroV || '';
      document.querySelectorAll('#filtros button').forEach((b) =>
        b.setAttribute('aria-pressed', String(b.dataset.v === filtroV)));
      return;
    }
    const rc = ev.target.closest('.abanico .hoja');
    if (rc) { activarRecorte(Number(rc.dataset.k)); return; }
    const t = ev.target.closest('[data-ir]');
    if (t) {
      const id = t.dataset.ir.split(',').find((x) => indice(x) >= 0);
      if (id) ir(indice(id));
      return;
    }
    if (ev.target.closest('[data-volver]')) ir(iGrilla);
  });
  document.getElementById('adelante').addEventListener('click', sig);
  document.getElementById('atras').addEventListener('click', ant);

  rejilla.innerHTML = L.slice(0, enSecuencia).map((s, i) => `<button data-n="${i}">
    <span class="nn">${String(i + 1).padStart(2, '0')} · ${s.seccion}</span>
    <span class="tt">${s.titulo}</span></button>`).join('');
  rejilla.addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-n]');
    if (!b) return;
    general.classList.remove('abierta');
    ir(Number(b.dataset.n));
  });
  const alternarIndice = () => general.classList.toggle('abierta');
  document.getElementById('indice').addEventListener('click', alternarIndice);

  addEventListener('keydown', (ev) => {
    if (ev.key === ' ' && ev.target instanceof Element && ev.target.closest('button')) return;
    switch (ev.key) {
      case 'ArrowRight': case 'PageDown': case ' ': ev.preventDefault(); sig(); break;
      case 'ArrowLeft': case 'PageUp': ev.preventDefault(); ant(); break;
      case 'Home': ev.preventDefault(); ir(0); break;
      case 'End': ev.preventDefault(); ir(enSecuencia - 1); break;
      // Dentro de una ficha, retroceso vuelve a la grilla, como el botón «Volver a proyectos».
      case 'Backspace': if (esFicha(actual)) { ev.preventDefault(); ir(iGrilla); } break;
      case 'Escape': ev.preventDefault(); alternarIndice(); break;
      case 'f': case 'F': pantallaCompleta(); break;
      default: break;
    }
  });

  function pantallaCompleta() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => { });
  }
  document.getElementById('pantalla').addEventListener('click', pantallaCompleta);

  const esOscuro = () => document.documentElement.dataset.theme !== 'light';
  function ajustarLogo() {
    const src = esOscuro()
      ? 'assets/logo/02-blanco-punto-coral.png'
      : 'assets/logo/01-navy-punto-coral.png';
    logo.src = src;
    const grande = document.getElementById('logo-portada');
    if (grande) grande.src = src;
  }
  document.getElementById('tema').addEventListener('click', () => {
    document.documentElement.dataset.theme = esOscuro() ? 'light' : 'dark';
    ajustarLogo();
    // Los puntos toman el color del tema al dibujarse: se rehacen.
    if (L[actual].id === 'portada') arrancarPuntos();
    if (L[actual].id === 'mapa') arrancarMapa();
    fcol = colores();
  });

  // El mosaico depende del tamaño del marco: al cambiar la ventana hay que recalcularlo.
  addEventListener('resize', () => {
    ajustarActual();
    armarCampo(); cambiarCampo(L[actual].id);
    // Los lienzos de puntos se dibujan al tamaño de la lámina: se rehacen.
    if (L[actual].id === 'portada') arrancarPuntos();
    if (L[actual].id === 'mapa') arrancarMapa();
  });

  pintar();
}
