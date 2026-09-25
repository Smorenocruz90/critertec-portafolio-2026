// El orden de las dos versiones del portafolio.
//
// Va aparte de los HTML para que verificar.mjs pueda comprobar, sin navegador, que cada id
// del plan existe en la biblioteca de motor.js. Si aquí se escribe un id que no existe, el
// deck falla al arrancar con el nombre exacto y verificar.mjs lo caza antes de enviarlo.
//
// Cada id es una lámina de la biblioteca. Cambiar el orden del portafolio es cambiar esta
// lista: no hay que tocar ni el motor ni el contenido.

/**
 * Versión larga (index.html) · 17 láminas en secuencia, más las fichas de proyecto que abre
 * la grilla.
 * La que sustenta una licitación, una alianza o una conversación con cooperación
 * internacional: proyectos uno por uno, premios con enlace, y la prensa completa.
 */
export const LARGO = [
  // quiénes somos
  'portada',
  'quienes',
  'impacto',
  'mapa',
  'diferenciales',
  // qué hacemos
  'verticales',
  'que-hacemos',
  'desarrollos',
  'sellos',
  // credenciales
  'premios',
  // proyectos
  // la grilla abre cada ficha; las fichas no van en la secuencia, el motor las agrega aparte
  'portafolio',
  // respaldo
  'medios-1',
  'aliados',
  'casa',
  'cierre',
  // anexo: después del cierre, para quien quiera saber quién dirige la empresa
  'ceo',
  'prensa-anexo',
];

/**
 * Versión corta (corto.html) · 12 láminas (la última, el anexo de prensa).
 * La que se manda en frío a un cliente nuevo o se presenta en diez minutos.
 * «palmares» existe solo aquí: condensa en una lámina los premios y los reconocimientos.
 */
export const CORTO = [
  'portada',
  'quienes',
  'impacto',
  'mapa',
  'verticales',
  'diferenciales',
  'sellos',
  'portafolio',
  'palmares',
  'medios-destacados',
  'cierre',
  // anexo: la tabla de prensa, a la que lleva el botón del abanico
  'prensa-anexo',
];
