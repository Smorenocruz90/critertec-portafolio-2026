// Contenido del Portafolio Critertec 2026 · fuente única para las dos versiones.
//
// index.html arma la versión larga y corto.html la corta: ambas leen de aquí, así que una
// corrección se escribe una sola vez. Qué lámina entra en cuál se decide en motor.js, no
// en este archivo; aquí solo vive el contenido.
//
// Regla de este archivo: toda afirmación externa —premio, reconocimiento, nota de prensa,
// alianza— lleva `link`. Si no hay link verificado, `link: null` y `porVerificar: true`.
// verificar.mjs los lista y el deck los pinta sin ancla, nunca con una URL inventada.
// Las cifras son las del Portafolio 2026 anterior, que es el material ya publicado.

/* ═══════════════════════════════════════════════════════════
   1 · QUIÉNES SOMOS
   ═══════════════════════════════════════════════════════════ */

export const QUIENES = {
  que: 'Un estudio creativo de proyectos educativos en Latinoamérica.',
  frase: 'Potenciamos la humanidad con tecnología y evidencia científica',
  desde: 2017,
  proposito:
    'Buscamos empoderar a las comunidades de sus proyectos de vida desde un enfoque '
    + 'posibilitante, lleno de creatividad, tecnología y evidencia.',
};

/** Los indicadores de portada. Son los del Portafolio 2026 anterior, sin cambios. */
export const INDICADORES = [
  { n: '+600k', u: 'personas', d: 'impactadas por nuestros proyectos' },
  { n: '8', u: 'países', d: 'con proyectos ejecutados en terreno' },
  { n: '+150', u: 'proyectos', d: 'y programas entregados' },
  { n: '10', u: 'años', d: 'de operación continua' },
];

/**
 * Los tres diferenciales, en la nomenclatura del Portafolio 2026 anterior.
 * `foto` apunta a assets/principios.
 */
export const DIFERENCIALES = [
  {
    t: 'Edutainment', foto: 'conducta', color: 'var(--coral)',
    d: 'Diseñamos desde la emoción movilizadora. Creamos experiencias que permiten aprender '
      + 'de forma voluntaria, divertida y con propósito.',
    dato: 'Storytelling · juego · didáctica · retos · comunidad',
  },
  {
    t: 'Tecnología', foto: 'tecnologia', color: 'var(--cian)',
    d: 'Somos geeks a la vanguardia que entienden cuándo y cómo aprovechar la tecnología para '
      + 'escalar, medir y emocionar. No delegamos la calidad a la máquina.',
    dato: 'Tecnologías de empatía',
  },
  {
    t: 'Ciencias del comportamiento', foto: 'evidencia', color: 'var(--amarillo)',
    // Más corto que los otros dos a propósito: su titular ocupa dos líneas y la columna es
    // la misma, así que con el texto largo la etiqueta del pie se pegaba al borde.
    d: 'No basta con cambiar creencias: hay que cambiar comportamientos. Usamos la evidencia '
      + 'para bajar la fricción del aprendizaje.',
    dato: 'Fricción intencionada',
  },
];

/* ═══════════════════════════════════════════════════════════
   2 · LAS TRES VERTICALES
   ═══════════════════════════════════════════════════════════ */

/**
 * `gama` son los cuatro colores de cada vertical según el Manifiesto de Marca; el primero
 * es el de firma, el que toma el punto del lockup.
 */
export const VERTICALES = [
  {
    id: 'studio', cod: 'V01', n: 'Criter', apellido: 'Studio', q: 'Edutainment',
    d: 'Producimos el contenido: serie web, animación, cómic, juego y estudio de grabación. '
      + 'Aquí viven el virtualizador y el autoeditor.',
    color: 'var(--coral)', gama: ['#FF1E56', '#FF8500', '#7C4DFF', '#FFF1D6'],
    foto: 'studio.png', desliz: '-33.5%',
    hace: ['Series web y animación', 'Cómics y universo gráfico', 'Apps interactivas y juegos',
      'Domos geodésicos con proyección 360°', 'Estudio de grabación profesional',
      'Virtualización de cursos'],
  },
  {
    id: 'academy', cod: 'V02', n: 'Criter', apellido: 'Academy', q: 'Desarrollo docente',
    d: 'Formamos a quien enseña. Plataforma propia, eventos y proyectos a la medida. Somos '
      + 'partner oficial de Canva for Education y Microsoft Global Training Partner.',
    color: 'var(--amarillo)', gama: ['#FFD93D', '#5BBFFF', '#CFFF5E', '#0A2740'],
    foto: 'academy.png', desliz: '0%',
    hace: ['Plataforma LXP propia', 'Programas de innovación educativa', 'Bootcamps y mentorías',
      'Alianzas oficiales con Canva y Microsoft', 'Festivales de edutainment'],
  },
  {
    id: 'lab', cod: 'V03', n: 'Criter', apellido: 'Lab', q: 'Apropiación digital',
    d: 'Llevamos programas a escala de país con gobiernos y cooperación internacional. '
      + 'Soy Digital es el más grande que hemos hecho.',
    color: 'var(--cian)', gama: ['#35D2C4', '#1E6BFF', '#0A1F44', '#E8EEF7'],
    foto: 'lab.jpg', desliz: '0%',
    hace: ['Alfabetización digital básica', 'Apropiación de inteligencia artificial',
      'Plataformas gamificadas a escala de país', 'Investigación aplicada'],
  },
];

/* ═══════════════════════════════════════════════════════════
   3 · ALIANZAS OFICIALES
   ═══════════════════════════════════════════════════════════ */

/**
 * Las dos alianzas oficiales. `sello` es la insignia que emite cada programa, en
 * assets/sellos, y va tal cual: son piezas de marca de un tercero, no se recolorean, no se
 * invierten y no se recortan. Por eso la lámina las trata como placa y no como logo.
 *
 * Nota sobre Microsoft: el directorio público de Global Training Partners no listaba a
 * Critertec bajo ningún país de la región al 24 de septiembre de 2026. La insignia oficial
 * del programa es el soporte que respalda la afirmación; el enlace sigue apuntando al
 * directorio por si alguien quiere consultarlo.
 */
export const SELLOS = [
  {
    id: 'canva',
    marca: 'Canva',
    sello: 'canva-education-partner.png',
    titulo: 'Canva for Education',
    rango: 'Education Training Partner',
    region: 'Colombia · Latinoamérica',
    d: 'Formamos maestros en Canva for Education con currículo y certificación oficiales. '
      + 'Es la alianza que abrió Panamá, Bogotá y Cundinamarca.',
    link: 'https://public.canva.site/education-training-partner',
    linkTexto: 'Directorio oficial de Education Training Partners',
    tinte: '#7D2AE8',
  },
  {
    id: 'microsoft',
    marca: 'Microsoft',
    sello: 'microsoft-global-training-partner.png',
    titulo: 'Microsoft Global Training Partner',
    rango: 'Microsoft in Education',
    region: 'Latinoamérica',
    d: 'Desarrollo profesional para maestros y directivos sobre las soluciones de educación '
      + 'de Microsoft, y acompañamiento a la planeación estratégica de sistemas escolares.',
    link: 'https://learn.microsoft.com/es-es/training/educator-center/programs/global-training-partner/find-global-training-partner',
    linkTexto: 'Directorio oficial de Global Training Partners',
    tinte: '#5C2D91',
  },
];

/* ═══════════════════════════════════════════════════════════
   4 · DÓNDE HEMOS TRABAJADO
   ═══════════════════════════════════════════════════════════ */

/**
 * Los ocho países con proyecto ejecutado en terreno, que son los que sostienen el indicador
 * de «8 países». En la lámina del mapa cada uno se enciende en coral sobre el croquis de puntos.
 *
 * `iso` tiene que coincidir con el `id` del país en mapa-latam.js: es lo que lo enciende.
 * `lon`/`lat` son la capital —de ahí sale la onda al encenderse—, y para Estados Unidos un
 * punto del sur, que es lo que entra en la ventana del mapa.
 * `anio` es cuándo llegamos: el mapa corre como línea del tiempo y cada país se enciende en su año.
 * `lado` es hacia dónde sale el nombre. Se elige a mano mirando la lámina: República
 * Dominicana y Puerto Rico comparten latitud y a la misma mano se pisarían, y a los del
 * Pacífico les conviene sacarla hacia el mar, donde no tapa tierra.
 * `servicios` y `clientes` no se pintan hoy; se guardan como registro.
 */
export const PAISES = [
  {
    pais: 'Estados Unidos', iso: 'US', anio: 2020, lon: -89.1, lat: 30.9, lado: 'abajo', servicios: 'Investigación · Edutainment',
  },
  {
    pais: 'República Dominicana', iso: 'DO', anio: 2025, lon: -69.9, lat: 18.5, lado: 'abajo-der',
    servicios: 'Formación docente · Alfabetización y apropiación digital',
    clientes: 'INDOTEL · BID · Ministerio de Educación (MINERD)',
  },
  {
    pais: 'Puerto Rico', iso: 'PR', anio: 2024, lon: -66.1, lat: 18.4, lado: 'der', servicios: 'Edutainment',
  },
  {
    pais: 'Guatemala', iso: 'GT', anio: 2026, lon: -90.5, lat: 14.6, lado: 'izq', servicios: 'Virtualización de cursos',
  },
  {
    pais: 'Panamá', iso: 'PA', anio: 2026, lon: -79.5, lat: 9.0, lado: 'izq', servicios: 'Formación docente',
    clientes: 'Canva · OEI · Ministerio de Educación',
  },
  {
    pais: 'Colombia', iso: 'CO', anio: 2017, lon: -74.1, lat: 4.7, lado: 'der', sede: true,
    servicios: 'Formación docente · Edutainment · Apropiación digital',
    clientes: 'Comfama · Fundación Prosegur · Fundación Saldarriaga Concha · UDCA · '
      + 'Fundación Telefónica Movistar · Secretarías de Bogotá y Cundinamarca · MinTIC',
  },
  {
    pais: 'Perú', iso: 'PE', anio: 2021, lon: -77.0, lat: -12.0, lado: 'izq', servicios: 'Formación docente',
  },
  {
    pais: 'Chile', iso: 'CL', anio: 2021, lon: -70.6, lat: -33.4, lado: 'izq', servicios: 'Formación docente',
  },
];

/**
 * Clientes globales que no suman país en terreno pero sí alcance.
 * `corto` es para el pie de la lámina del mapa, donde el nombre completo desborda a tres
 * líneas y le roba alto al lienzo.
 */
export const ALCANCE_GLOBAL = [
  { n: 'Tony Blair Institute for Global Change', corto: 'Tony Blair Institute', lugar: 'Reino Unido' },
  { n: 'Canva', corto: 'Canva', lugar: 'Australia' },
  { n: 'MIT Media Lab', corto: 'MIT Media Lab', lugar: 'Estados Unidos' },
  { n: 'Fundación Jacobs', corto: 'Fundación Jacobs', lugar: 'Suiza' },
];

/* ═══════════════════════════════════════════════════════════
   5 · PREMIOS Y RECONOCIMIENTOS DE LA COMPAÑÍA
   ═══════════════════════════════════════════════════════════ */

/**
 * Premios de la compañía. La lámina pinta solo el logo del premio, el año y qué se premió:
 * el detalle vive en el enlace de referencia.
 *
 * `logo` es el logo oficial de la convocatoria de ese año, en assets/premios, y va sobre una
 * placa de color `placa` —el fondo con el que lo publica quien lo otorga— porque varios solo
 * existen en blanco o recortados de un banner. Como los sellos: no se recolorean.
 *   · Crea Digital 2019 y 2023: recortados de los banners oficiales de MinTIC. El de 2023 no
 *     tiene versión limpia publicada y conserva la foto del banner detrás; si MinTIC o la
 *     Fundación Telefónica pasan el vectorial, se cambia el archivo y listo.
 *   · Creativa GDL: logo del sitio oficial creativagdl.com.
 *   · ANDI: sello conjunto ANDI del Futuro · ANDI, de andidelfuturo.com.
 */
export const PREMIOS = [
  {
    id: 'crea-2019',
    premio: 'Crea Digital', anio: '2019', proyecto: 'Guardianes',
    otorga: 'MinTIC y Ministerio de Cultura de Colombia',
    logo: 'crea-digital-2019.jpg', placa: '#002043',
    link: 'https://www.mintic.gov.co/portal/inicio/Sala-de-prensa/Noticias/102814:La-convocatoria-Crea-Digital-2019-ya-tiene-ganadores',
    linkTexto: 'MinTIC · Ganadores Crea Digital 2019',
  },
  {
    // Figuraba como 2024, pero MinTIC lo publica entre los 37 ganadores de la
    // convocatoria 2023 (3 de agosto de 2023), categoría contenidos transmedia.
    id: 'crea-2023',
    premio: 'Crea Digital', anio: '2023', proyecto: 'Entre Tanto Cuento',
    otorga: 'MinTIC y Ministerio de las Culturas, las Artes y los Saberes',
    logo: 'crea-digital-2023.jpg', placa: '#1b1530',
    link: 'https://www.mintic.gov.co/portal/inicio/Sala-de-prensa/Noticias/277480:Elegidos-los-37-proyectos-digitales-ganadores-de-la-convocatoria-Crea-Digital-2023',
    linkTexto: 'MinTIC · Ganadores Crea Digital 2023',
  },
  {
    id: 'gdl-2024',
    premio: 'Guadalajara Creativa', anio: '2024', proyecto: 'Entre Tanto Cuento',
    otorga: 'Creativa GDL · Gobierno de Guadalajara, México',
    logo: 'creativa-gdl.webp', placa: 'var(--ink)',
    link: null,
    linkTexto: null,
    porVerificar: true,
  },
  {
    id: 'andi-2024',
    premio: 'ANDI del Futuro', anio: '2024', proyecto: 'Critertec',
    otorga: 'ANDI · Asociación Nacional de Empresarios de Colombia',
    logo: 'andi-del-futuro.svg', placa: 'var(--ink)',
    link: 'https://www.andi.com.co/Home/Noticia/17721-once-emprendimientos-de-la-andi-del-fut',
    linkTexto: 'ANDI · Once emprendimientos se consolidan',
  },
];


/* ═══════════════════════════════════════════════════════════
   6 · RECONOCIMIENTOS AL CEO
   ═══════════════════════════════════════════════════════════ */

export const CEO = {
  n: 'Sebastián Moreno Cruz',
  cargo: 'CEO y fundador de Critertec Educación',
  bio: 'Emprendedor social. Cofundador de Mett Colombia, miembro de ANDI del Futuro y '
    + 'miembro gestor del gremio EdTech Colombia. Hace parte de las juntas directivas de '
    + 'TECHO para Colombia y la Fundación Vida Nueva.',
  linkedin: 'https://www.linkedin.com/in/smorenocruz/',
};

export const RECONOCIMIENTOS_CEO = [
  {
    id: '40under40',
    titulo: '40 menores de 40', anio: '2024',
    otorga: 'La República · en alianza con ANDI del Futuro',
    d: 'Entre los cuarenta colombianos menores de cuarenta que hacen empresa, generan empleo '
      + 'y lideran sus campos de acción con ideas innovadoras.',
    link: 'https://www.larepublica.co/especiales/40-emprendedores-menores-de-40',
    linkTexto: 'La República · Especial 40 emprendedores menores de 40',
    porVerificar: true,
  },
  {
    id: '100lideres',
    titulo: '100 nuevos líderes de Colombia', anio: '2025',
    otorga: 'El País · Caracol Radio · Davivienda y Seguros Bolívar',
    d: 'Reconocimiento a los liderazgos emergentes que están transformando el país. La '
      + 'propuesta presentada se centra en la transformación educativa de todas las regiones.',
    link: 'https://elpais.com/america-colombia/branded/los-lideres-de-colombia/',
    linkTexto: 'El País · Nuevos líderes de Colombia',
  },
  {
    id: 'andi-ceo',
    titulo: 'ANDI del Futuro · empresa de alto impacto', anio: '2024',
    otorga: 'ANDI · Asociación Nacional de Empresarios de Colombia',
    d: 'Critertec se gradúa de ANDI del Futuro por crecimiento sostenido en operación, manejo '
      + 'financiero responsable, impacto positivo en su industria y capacidad de generar empleo.',
    link: 'https://www.andi.com.co/Home/Noticia/17721-once-emprendimientos-de-la-andi-del-fut',
    linkTexto: 'ANDI · Nota oficial',
  },
  {
    id: 'patria',
    titulo: 'Colombianos que hacen patria', anio: '2023',
    otorga: 'Colombianos Que Hacen Patria',
    d: 'Perfil audiovisual sobre cómo Critertec usa «tecnologías de empatía» para generar '
      + 'experiencias y transformación.',
    link: 'https://es-la.facebook.com/ColombianosQueHacenPatria/videos/colombianos-que-hacen-patria-sebasti%C3%A1n-moreno-cruz/416597428965032/',
    linkTexto: 'Ver el perfil en video',
  },
];

/* ═══════════════════════════════════════════════════════════
   7 · PROYECTOS
   ═══════════════════════════════════════════════════════════ */

/**
 * `insignia: true` marca los seis que entran a la versión corta.
 * `fotos` son archivos de assets/fotos sin extensión. `impacto` usa las cifras publicadas
 * en el Portafolio 2026 anterior.
 *
 * Dos reglas sobre las fotos, y las dos se comprueban en verificar.mjs:
 *
 *   · Ninguna foto se usa en dos proyectos. Una foto del bootcamp de Panamá rotulada como
 *     otro proyecto es una afirmación falsa, y este documento va a clientes.
 *   · Un proyecto sin registro fotográfico se deja con la lista vacía. Su ficha se pinta
 *     como cartel —el dato de impacto en grande sobre el color de la vertical— en vez de
 *     tomar prestada una foto de al lado.
 */
export const PROYECTOS = [
  {
    p: 'Soy Digital', lugar: 'República Dominicana', anios: '2025–2026', v: 'lab', insignia: true,
    cliente: 'INDOTEL · BID · Ministerio de Educación (MINERD)',
    proposito: 'Capacitar a 100.000 personas en habilidades digitales básicas y avanzadas para '
      + 'que mejoren su calidad de vida en una economía digital en evolución.',
    como: 'Aplicación gamificada de spaced learning y microlearning, complementada con ferias '
      + 'presenciales en centros educativos, certificados y premios. Cuatro niveles progresivos '
      + 'de siete módulos cada uno.',
    impacto: '100.000 personas entre 2025 y 2026',
    // Solo el juego con nombre: sd-1 … sd-7 son las mismas tomas con menos resolución
    // (sd-retrato-hombre es sd-1 a 1200×1600, sd-comunidad es sd-4, y así). Llevar las
    // trece ponía cada foto dos veces en el mosaico.
    fotos: ['sd-retrato-hombre', 'sd-comunidad', 'sd-estudiantes', 'sd-silla-ruedas',
      'sd-retrato-mujer', 'sd-arena', 'sd-x01', 'sd-x02', 'sd-x03', 'sd-x04', 'sd-x05', 'sd-x06', 'sd-x07', 'sd-x08', 'sd-x09', 'sd-x10', 'sd-x11', 'sd-x12'],
    prensa: ['presidencia-rd', 'indotel', 'dpl-news', 'el-dinero'],
  },
  {
    p: 'Innovadores Pedagógicos', lugar: 'Latinoamérica', anios: '2020–2026', v: 'academy', insignia: true,
    cliente: 'Programa propio y aliados regionales',
    proposito: 'Talleres y rutas de inspiración y formación para que los maestros de la región '
      + 'se conviertan en diseñadores de experiencias educativas memorables y pertinentes, '
      + 'potenciados con tecnología.',
    como: 'Talleres presenciales, mentorías, talleres virtuales, contenidos asincrónicos, '
      + 'plantillas, LMS y webinars.',
    impacto: '+80.000 maestros',
    fotos: ['ip-grupo', 'ip-robotica', 'ip-vr', 'ip-maestra', 'ip-aula', 'ip-x01', 'ip-x02', 'ip-x03', 'ip-x04', 'ip-x05', 'ip-x06', 'ip-x07', 'ip-x08', 'ip-x09', 'ip-x10', 'ip-x11', 'ip-x12', 'ip-x13'],
    prensa: [],
  },
  {
    p: 'Encuentros Profuturo', lugar: 'Colombia', anios: '2019–2025', v: 'academy', insignia: true,
    cliente: 'Fundación Telefónica Movistar Colombia',
    proposito: 'Seis años diseñando, produciendo y operando los encuentros nacionales de '
      + 'maestros Profuturo.',
    como: 'Más de 20 webinars, talleres virtuales interactivos, contenidos asincrónicos en '
      + 'video, plantillas descargables, piezas gráficas de difusión y gestión de comunidad en '
      + 'WhatsApp y redes sociales.',
    impacto: 'Más de 20.000 participantes',
    fotos: ['prof-grupo', 'prof-auditorio', 'prof-mesa', 'prof-tablet', 'prof-sala', 'prof-x01', 'prof-x02', 'prof-x03', 'prof-x04', 'prof-x05', 'prof-x06', 'prof-x07', 'prof-x08', 'prof-x09', 'prof-x10', 'prof-x11', 'prof-x12', 'prof-x13'],
    prensa: ['semana-webinar'],
  },
  {
    p: 'Entre Tanto Cuento', lugar: 'Colombia', anios: '2021–2023', v: 'studio', insignia: true,
    cliente: 'Cooperación y aliados públicos',
    proposito: 'Educación transmedia para jóvenes y docentes sobre ciudadanía digital, '
      + 'apropiación digital y educación mediática.',
    como: 'Guías pedagógicas, talleres virtuales y presenciales, videojuegos, video, cómics e '
      + 'infografías.',
    impacto: 'Más de 5.000 participantes',
    fotos: ['etc-estudio', 'etc-selfie', 'etc-sinsesgos', 'etc-comic', 'etc-decalogo', 'etc-x01', 'etc-x02', 'etc-x03', 'etc-x04', 'etc-x05', 'etc-x06', 'etc-x07', 'etc-x08', 'etc-x09', 'etc-x10', 'etc-x11', 'etc-afiche'],
    prensa: [],
  },
  {
    p: 'Canva Panamá', lugar: 'Panamá', anios: '2025–2026', v: 'academy', insignia: true,
    cliente: 'Canva for Education · Ministerio de Educación de Panamá',
    proposito: 'Formación de formadores: llevar Canva for Education al magisterio del país con '
      + 'un modelo replicable país por país.',
    como: 'Bootcamp presencial y mentorías virtuales para maestros, con certificación oficial.',
    impacto: 'Modelo replicable, hoy en apertura en más países',
    fotos: ['canvapa-01', 'canvapa-02', 'canvapa-03', 'canvapa-04', 'canvapa-05', 'canvapa-06', 'canvapa-07'],
    prensa: [],
  },
  {
    p: 'IA Jam Sessions', lugar: 'Colombia', anios: '2024–2025', v: 'academy', insignia: true,
    cliente: 'Programa propio de investigación aplicada',
    proposito: 'Investigación aplicada semiexperimental de formación docente sobre el '
      + 'desarrollo de habilidades con IA generativa para crear contenidos educativos y clases '
      + 'interactivas.',
    como: 'Talleres presenciales y virtuales, gestión de comunidades y evaluaciones gamificadas.',
    impacto: '300 maestros',
    fotos: ['jam-escenario', 'jam-auditorio', 'jam-charla', 'jam-mesa', 'jam-aula', 'jam-pantalla', 'jam-resultados', 'jam-ruta'],
    prensa: ['semana-educacion'],
  },
  {
    p: 'Guardianes', lugar: 'Colombia', anios: '2019–2020', v: 'studio',
    cliente: 'MinTIC y Ministerio de Cultura · Crea Digital',
    proposito: 'Contenido transmedia ganador del estímulo Crea Digital 2019 en la categoría de '
      + 'coproducción para el desarrollo de contenidos transmedia.',
    como: 'Universo narrativo transmedia con componentes digitales e impresos.',
    impacto: 'Estímulo de $30 millones · 1 de 10 proyectos transmedia ganadores',
    fotos: ['guardianes-afiche', 'guardianes-afiche-2'],
    prensa: ['mintic-crea-2019'],
  },
  {
    p: 'Tony Blair Institute', lugar: 'Reino Unido · Global', anios: '2026', v: 'studio',
    cliente: 'Tony Blair Institute for Global Change',
    proposito: 'Primera venta internacional del virtualizador, junto con la plataforma de '
      + 'Academy para empresas.',
    como: 'Virtualización de contenidos y despliegue de la plataforma propia.',
    impacto: 'Primera venta internacional de producto propio',
    fotos: ['tbi-1', 'tbi-2', 'tbi-3', 'tbi-plataforma'],
    prensa: [],
  },
  {
    p: 'Fundación Prosegur', lugar: 'Colombia', anios: '2026', v: 'academy',
    cliente: 'Fundación Prosegur',
    proposito: 'Bootcamp e innovación educativa con escuelas rurales.',
    como: 'Bootcamp presencial, acompañamiento y contenidos a la medida.',
    impacto: 'Escuelas rurales acompañadas en terreno',
    fotos: ['prosegur-1', 'prosegur-2', 'prosegur-3', 'prosegur-x01', 'prosegur-x02', 'prosegur-x03', 'prosegur-x04', 'prosegur-x05', 'prosegur-x06', 'prosegur-x07'],
    prensa: [],
  },
  {
    p: 'Saldarriaga Concha · Economía plateada', lugar: 'Colombia', anios: '2025', v: 'studio',
    cliente: 'Fundación Saldarriaga Concha',
    proposito: 'Masterclasses de economía plateada.',
    como: 'Producción de estudio y virtualización. Financió la adecuación del estudio de '
      + 'grabación, hoy activo productivo de la compañía.',
    impacto: 'Estudio de grabación propio, hoy en operación',
    fotos: ['econ-plateada-1', 'econ-plateada-2', 'econ-plateada-3', 'econ-plateada-4', 'econ-plateada-5'],
    prensa: [],
  },
  {
    p: 'Saldarriaga Concha · Accesibilidad digital', lugar: 'Colombia', anios: '2026', v: 'studio',
    cliente: 'Fundación Saldarriaga Concha',
    proposito: 'Masterclasses de accesibilidad digital.',
    como: 'Producción de estudio con el autoeditor. Primer proyecto entregado con la herramienta.',
    impacto: 'Primer proyecto entregado con el autoeditor',
    fotos: ['estudio-3', 'estudio-4', 'estudio-masterclass'],
    prensa: [],
  },
  {
    p: 'OEI Panamá', lugar: 'Panamá', anios: '2026', v: 'academy',
    cliente: 'Organización de Estados Iberoamericanos',
    proposito: 'Bootcamp de innovación inclusiva para maestros.',
    como: 'Bootcamp presencial y acompañamiento.',
    impacto: 'Abrió la conversación con la OEI global para replicarlo país por país',
    fotos: ['oei-1', 'oei-2', 'oei-3'],
    prensa: [],
  },
  {
    p: 'Comfama Inspiración', lugar: 'Colombia', anios: '2017–2026', v: 'lab',
    cliente: 'Comfama',
    proposito: 'Programa de innovación educativa que se repite año tras año desde hace casi '
      + 'una década. La relación más larga de la casa.',
    como: 'Diseño, producción y operación de programas de innovación para maestros.',
    impacto: 'Casi una década de continuidad',
    fotos: ['insp-tablet', 'insp-manos', 'insp-ronda', 'insp-mascara', 'insp-juego', 'insp-pendon', 'insp-x01', 'insp-x02', 'insp-x03', 'insp-x04', 'insp-x05', 'insp-x06', 'insp-x07', 'insp-x08', 'insp-x09', 'insp-x10', 'insp-x11', 'insp-x12'],
    prensa: [],
  },
  {
    p: 'AgroTec Festival', lugar: 'Colombia', anios: '2025', v: 'lab',
    cliente: 'Comfama',
    proposito: 'Transmedia de agrociencia para jóvenes rurales.',
    como: 'Festival con componentes transmedia, domos geodésicos y experiencias presenciales.',
    impacto: 'Jóvenes rurales de Antioquia',
    fotos: ['agro-grupo', 'agro-arco', 'agro-taller', 'agro-lab', 'agro-juego', 'agro-lectura', 'agro-x01', 'agro-x02', 'agro-x03', 'agro-x04', 'agro-x05', 'agro-x06', 'agro-x07', 'agro-x08', 'agro-x09', 'agro-x10', 'agro-x11', 'agro-x12'],
    prensa: [],
  },
  {
    p: 'Canva Bogotá y Cundinamarca', lugar: 'Colombia', anios: '2026', v: 'academy',
    cliente: 'Secretarías de Educación de Bogotá y Cundinamarca · Canva',
    proposito: 'Llevar Canva for Education a los maestros de las dos secretarías.',
    como: 'Sesiones virtuales y acompañamiento.',
    impacto: 'Maestros de dos secretarías de educación',
    fotos: ['canva-auditorio', 'canva-3', 'canva-4'],
    prensa: [],
  },
  {
    p: 'UDCA', lugar: 'Colombia', anios: '2026', v: 'studio',
    cliente: 'Universidad de Ciencias Aplicadas y Ambientales',
    proposito: 'Virtualización de cursos universitarios.',
    como: 'Despliegue del virtualizador sobre material existente.',
    impacto: 'Primera venta del virtualizador',
    fotos: [],
    prensa: [],
  },
  // Proyectos que entran a la grilla sin ficha todavía: falta cliente, año, lugar, propósito,
  // cómo e impacto. Sin `cliente` el motor no les pinta ficha y la tarjeta no abre nada.
  { p: 'Gmech', v: 'studio', fotos: ['gmech-titulo', 'gmech-bosque'], prensa: [] },
  {
    // Fuentes: Colombia Aprende (especial del Foro Educativo Nacional 2019), colombia.com y
    // Despejando Dudas, octubre de 2019 (enlaces en PRENSA). Las tres nombran a Critertec.
    p: 'Héroes del Bicentenario', lugar: 'Colombia', anios: '2019', v: 'studio',
    cliente: 'Ministerio de Educación Nacional · Microsoft',
    proposito: 'Acercar a las aulas la historia de la independencia en el Bicentenario y potenciar '
      + 'la curiosidad y el pensamiento crítico e histórico de los estudiantes.',
    como: 'El primer videojuego pedagógico sobre la Campaña Libertadora de 1819: los estudiantes '
      + 'recorren sus hitos y toman decisiones que cambian el hilo de la historia y el futuro del '
      + 'país. Desarrollado por Critertec con Microsoft y lanzado en el Foro Educativo Nacional 2019.',
    impacto: 'Gratuito para las instituciones educativas públicas de todo el país',
    fotos: ['heroes-proceres', 'heroes-1819', 'heroes-juego', 'heroes-video'],
    prensa: ['colombia-aprende-heroes', 'colombia-com-heroes', 'despejando-dudas-heroes'],
  },
  { p: 'La Ciencia de los Superhéroes', v: 'studio', fotos: [], prensa: [] },
  { p: 'Innovadores Digitales', v: 'academy', fotos: ['idig-cuaderno', 'idig-robot', 'idig-vr', 'idig-tablet', 'idig-sonrisas', 'idig-grupo', 'idig-x01', 'idig-x02', 'idig-x03', 'idig-x04', 'idig-x05', 'idig-x06', 'idig-x07', 'idig-x08', 'idig-x09', 'idig-x10', 'idig-x11', 'idig-x12'], prensa: [] },
  // De la carpeta de SharePoint organizada por vertical (25 de septiembre de 2026).
  { p: 'Gratus', v: 'studio', fotos: ['gratus-1', 'gratus-2', 'gratus-3', 'gratus-4', 'gratus-5'], prensa: [] },
  {
    // Fuente: Lente Regional, 26 de febrero de 2024 (enlace en PRENSA · lente-regional). El rol de
    // Critertec y de los aliados lo confirmó la dirección de la compañía.
    p: 'Con Sentido', lugar: 'Florencia · Colombia', anios: '2024', v: 'studio',
    cliente: 'Alcaldía de Florencia · Welbin · Fundación Bolívar Davivienda',
    proposito: 'Promover prácticas de sexualidad responsable e impulsar los proyectos de vida de '
      + 'estudiantes y docentes de las instituciones educativas de Florencia.',
    como: 'Critertec fue el estudio creativo que produjo el universo transmedia —cómics, videos, '
      + 'historias y pódcast— de un dispositivo pedagógico de doce semanas, con Welbin como '
      + 'experto temático y la Fundación Bolívar Davivienda como financiador.',
    impacto: 'Más de 1.600 estudiantes y docentes',
    fotos: ['consentido-comic-01', 'consentido-anim-1', 'consentido-guia', 'consentido-comic-02', 'consentido-anim-2', 'consentido-comic-03', 'consentido-comic-04', 'consentido-anim-3', 'consentido-comic-05', 'consentido-comic-06', 'consentido-logo', 'consentido-comic-07', 'consentido-comic-08', 'consentido-comic-09'],
    prensa: ['lente-regional'],
  },
  { p: 'Cultivo mi futuro', v: 'studio', fotos: ['cultivo-comic', 'cultivo-collage', 'cultivo-guia', 'cultivo-rueda'], prensa: [] },
  { p: 'Educación para la paz', v: 'studio', fotos: ['paz-infografia'], prensa: [] },
  { p: 'Universidad Compensar', v: 'studio', fotos: [], prensa: [] },
  { p: 'MINICAMPUS', v: 'academy', fotos: ['mini-grupo', 'mini-taller', 'mini-tablet', 'mini-computadores', 'mini-01', 'mini-02', 'mini-03', 'mini-04', 'mini-05'], prensa: [] },
  { p: 'Taller Iberoamericana', v: 'academy', fotos: ['ibero-acompanamiento', 'ibero-sala', 'ibero-dinamica', 'ibero-equipo', 'ibero-senas', 'ibero-01', 'ibero-02', 'ibero-03', 'ibero-04', 'ibero-05', 'ibero-06', 'ibero-07', 'ibero-08', 'ibero-09', 'ibero-10'], prensa: [] },
  { p: 'Alianza Educativa', v: 'academy', fotos: ['alianza-01', 'alianza-02', 'alianza-03', 'alianza-04', 'alianza-05', 'alianza-06', 'alianza-07', 'alianza-08', 'alianza-09', 'alianza-10', 'alianza-11', 'alianza-12', 'alianza-13', 'alianza-14', 'alianza-15', 'alianza-16', 'alianza-17', 'alianza-18'], prensa: [] },
  { p: 'CESA · V Encuentro Docente', v: 'academy', fotos: ['cesa-01', 'cesa-02', 'cesa-03', 'cesa-04', 'cesa-05', 'cesa-06', 'cesa-07', 'cesa-08', 'cesa-09', 'cesa-10', 'cesa-11', 'cesa-12', 'cesa-13', 'cesa-14', 'cesa-15', 'cesa-16', 'cesa-17', 'cesa-18'], prensa: [] },
  { p: 'Vida Nueva', v: 'lab', fotos: ['vidanueva-01', 'vidanueva-02', 'vidanueva-03', 'vidanueva-04', 'vidanueva-05', 'vidanueva-06', 'vidanueva-07', 'vidanueva-08', 'vidanueva-09', 'vidanueva-10', 'vidanueva-11', 'vidanueva-12', 'vidanueva-13', 'vidanueva-14', 'vidanueva-15', 'vidanueva-16', 'vidanueva-17', 'vidanueva-18'], prensa: [] },
  { p: 'Showrooms', v: 'lab', fotos: ['showroom-01', 'showroom-02', 'showroom-03', 'showroom-04', 'showroom-05', 'showroom-06', 'showroom-07', 'showroom-08', 'showroom-09', 'showroom-10', 'showroom-11', 'showroom-12'], prensa: [] },
  { p: 'Disruptores', v: 'lab', fotos: ['disr-presentacion', 'disr-tablet', 'disr-muro', 'disr-dinamica', 'disr-equipo', 'disr-adultos', 'disr-x01', 'disr-x02', 'disr-x03', 'disr-x04', 'disr-x05', 'disr-x06', 'disr-x07', 'disr-x08', 'disr-x09', 'disr-x10', 'disr-x11', 'disr-x12'], prensa: [] },
];

/**
 * Fotos que quedan fuera del muro de «En el campo». Siguen en la ficha de su proyecto —son
 * el registro de lo que se entregó— pero no entran al muro, por una de dos razones:
 *
 *   · No son de terreno. Un rectángulo blanco de interfaz entre fotos de gente rompe el
 *     registro de la lámina.
 *   · Son el mismo fotograma que otra de la lista, con otro nombre. En el muro salen las dos
 *     seguidas y se lee como descuido.
 */
export const FUERA_DEL_MURO = new Set([
  'tbi-1', 'tbi-2', 'tbi-3', 'tbi-plataforma', // capturas de la plataforma
  'gmech-titulo', 'gmech-bosque', // capturas del juego
  ...Array.from({ length: 9 }, (_, i) => `consentido-comic-0${i + 1}`), 'consentido-guia',
  'consentido-anim-1', 'consentido-anim-2', 'consentido-anim-3', 'consentido-logo', 'cultivo-comic', 'cultivo-guia', 'cultivo-collage', // piezas
  'cultivo-rueda', 'paz-infografia', 'heroes-proceres', 'heroes-1819', 'heroes-juego', // digitales
  'heroes-video',
  'guardianes-afiche', 'guardianes-afiche-2', 'etc-afiche', // afiches
  'jam-resultados', 'jam-ruta', // capturas del tablero de resultados
  'gratus-1', 'gratus-2', 'gratus-3', 'gratus-4', 'gratus-5', // capturas del juego
  'etc-sinsesgos', 'etc-comic', 'etc-decalogo', // piezas digitales de Entre Tanto Cuento
  'etc-x05', 'etc-x06', 'etc-x07', 'etc-x08', 'etc-x09', 'etc-x10', 'etc-x11',
  'canva-4', // pieza promocional de un webinar
  'estudio-set', // mismo fotograma que estudio-1 (1254×708 los dos)
  'estudio-masterclass', // mismo fotograma que estudio-4 (1139×641 los dos)
]);

/* ═══════════════════════════════════════════════════════════
   8 · DESARROLLOS PROPIOS
   ═══════════════════════════════════════════════════════════ */

/**
 * Desarrollos propios. No se presentan como productos —Critertec no los vende—: son la
 * tecnología de la casa que hace los proyectos más rápidos y mejores. Cada uno es un
 * resultado, una vertical y las herramientas que lo producen.
 * `cifra` es el dato grande de la tarjeta; el 2X–3X de producción viene de la dirección de la
 * compañía (septiembre de 2026).
 */
export const DESARROLLOS = [
  {
    v: 'studio', foto: 'estudio-2',
    cifra: '2X–3X', que: 'más rápido en producción de eduentretenimiento',
    d: 'Virtualizamos cursos y postproducimos video con herramientas propias, sin depender de '
      + 'la edición manual.',
    con: 'Virtualizador · Autoeditor',
  },
  {
    v: 'academy', foto: 'canva-2',
    cifra: 'Mejor', que: 'aprendizaje en formación docente',
    d: 'Una plataforma de experiencias de aprendizaje para maestros, con un modelo propio de '
      + 'lectura profunda anclado en evidencia.',
    con: 'Plataforma Criter Academy',
  },
  {
    v: 'lab', foto: 'sd-retrato-hombre',
    cifra: 'A la medida', que: 'proyectos tecnológicos para la educación',
    d: 'Apps gamificadas y plataformas a escala de país, diseñadas para cada proyecto.',
    con: 'Soy Digital · República Dominicana',
  },
];

/* ═══════════════════════════════════════════════════════════
   9 · EN LOS MEDIOS
   ═══════════════════════════════════════════════════════════ */

/**
 * `id` es el que citan los proyectos en su campo `prensa`.
 * `destacada: true` marca las que entran a la versión corta.
 * `captura` es el recorte de la nota tal como salió publicada, en assets/prensa, sacado de la
 * carpeta «PR - Prensa» de SharePoint. Las notas con captura van en el muro de recortes.
 * El logo del medio no se usa: los nombres van tipográficos, que es más limpio y no depende
 * de material de marca de terceros.
 */
export const PRENSA = [
  {
    id: 'semana-revolucion', destacada: true, captura: 'semana-revolucion',
    medio: 'Semana', pais: 'Colombia', fecha: '21 de junio de 2017',
    titular: 'La empresa colombiana que está revolucionando la educación con tecnología',
    bajada: 'Perfil de Critertec y de cómo usa realidad virtual, realidad aumentada y '
      + 'programación tangible para transformar la enseñanza tradicional.',
    link: 'https://www.semana.com/criterctec-empresa-de-tecnologia-para-educacion/246834/',
  },
  {
    id: 'semana-educacion', destacada: true, captura: 'semana-educacion',
    medio: 'Semana', pais: 'Colombia', fecha: '2024',
    titular: 'Retos y oportunidades de una educación conectada: ¿cómo la tecnología transforma '
      + 'el papel de los docentes?',
    bajada: 'Sebastián Moreno en la XI Cumbre Líderes por la Educación: «los maestros deben '
      + 'investigar y aprender sobre inteligencia artificial hasta volverla inteligencia '
      + 'aumentada para ellos».',
    link: 'https://www.semana.com/educacion/articulo/retos-y-oportunidades-de-una-educacion-conectada-como-la-tecnologia-transforma-el-papel-de-los-docentes/202400/',
  },
  {
    id: 'presidencia-rd', destacada: true,
    medio: 'Presidencia de la República Dominicana', pais: 'República Dominicana',
    fecha: '30 de septiembre de 2025',
    titular: 'Indotel lanza programa de alfabetización digital para 100,000 personas',
    bajada: 'El lanzamiento oficial de Soy Digital, con el respaldo del BID y el apoyo de la '
      + 'empresa colombiana Critertec, que diseñó el programa.',
    link: 'https://presidencia.gob.do/noticias/indotel-lanza-programa-de-alfabetizacion-digital-para-100000-personas',
  },
  {
    id: 'indotel',
    medio: 'INDOTEL', pais: 'República Dominicana', fecha: '30 de septiembre de 2025',
    titular: 'INDOTEL lanza programa de alfabetización digital para 100,000 personas',
    bajada: 'Nota oficial del Instituto Dominicano de las Telecomunicaciones sobre Soy Digital '
      + 'y sus cuatro niveles de formación.',
    link: 'https://indotel.gob.do/indotel-lanza-programa-de-alfabetizacion-digital-para-100000-personas/',
  },
  {
    id: 'dpl-news', destacada: true,
    medio: 'DPL News', pais: 'Latinoamérica', fecha: 'septiembre de 2025',
    titular: 'República Dominicana | Indotel lanza programa de alfabetización digital para '
      + '100,000 personas',
    bajada: 'Cobertura regional especializada en telecomunicaciones y política digital.',
    link: 'https://dplnews.com/republica-dominicana-indotel-lanza-programa-alfabetizacion-digital-100000-personas/',
  },
  {
    id: 'el-dinero',
    medio: 'El Dinero', pais: 'República Dominicana', fecha: 'septiembre de 2025',
    titular: 'Indotel lanza un programa de alfabetización digital para 100,000 personas',
    bajada: 'Cobertura del principal diario económico dominicano.',
    link: 'https://eldinero.com.do/338714/indotel-lanza-un-programa-de-alfabetizacion-digital-para-100000-personas/',
  },
  {
    id: 'diario-digital',
    medio: 'DiarioDigital RD', pais: 'República Dominicana', fecha: '30 de septiembre de 2025',
    titular: 'INDOTEL impulsa programa digital para 100 mil familias dominicanas',
    bajada: 'Cobertura del alcance familiar del programa.',
    link: 'https://www.diariodigital.com.do/2025/09/30/indotel-impulsa-programa-digital-para-100-mil-familias-dominicanas.html/',
  },
  {
    id: 'rc-noticias',
    medio: 'RC Noticias · Roberto Cavada', pais: 'República Dominicana',
    fecha: '30 de septiembre de 2025',
    titular: 'INDOTEL lanza programa de alfabetización digital para 100,000 personas',
    bajada: 'Cobertura televisiva del lanzamiento.',
    link: 'https://robertocavada.com/nacionales/2025/09/30/indotel-lanza-programa-de-alfabetizacion-digital-para-100000-personas/',
  },
  {
    id: 'remolacha',
    medio: 'Remolacha', pais: 'República Dominicana', fecha: 'octubre de 2025',
    titular: 'Soy Digital · Indotel lanza programa de alfabetización digital',
    bajada: 'Cobertura de medio digital dominicano.',
    link: 'https://remolacha.net/2025/10/soy-digital/',
  },
  {
    id: 'mintic-crea-2019',
    medio: 'MinTIC', pais: 'Colombia', fecha: '23 de agosto de 2019',
    titular: 'La convocatoria «Crea Digital» 2019 ya tiene ganadores',
    bajada: 'Critertec Educación S.A.S. entre los ganadores con el proyecto Guardianes, en la '
      + 'categoría de coproducción para el desarrollo de contenidos transmedia.',
    link: 'https://www.mintic.gov.co/portal/inicio/Sala-de-prensa/Noticias/102814:La-convocatoria-Crea-Digital-2019-ya-tiene-ganadores',
  },
  {
    id: 'andi-nota', destacada: true, captura: 'andi-nota',
    medio: 'ANDI', pais: 'Colombia', fecha: '5 de septiembre de 2024',
    titular: 'Once emprendimientos de la ANDI del Futuro se consolidan y pasan a hacer parte de '
      + 'la ANDI, junto a las empresas más grandes del país',
    bajada: 'Critertec entre los once, reconocida como empresa de alto impacto por su '
      + 'crecimiento, su manejo financiero y su impacto social.',
    link: 'https://www.andi.com.co/Home/Noticia/17721-once-emprendimientos-de-la-andi-del-fut',
  },
  {
    id: 'k12-digest', captura: 'k12-digest',
    medio: 'K12 Digest', pais: 'Internacional', fecha: '31 de marzo de 2022',
    titular: 'Transmedia Education: A Proposal to Stimulate Curiosity and Participation in the '
      + 'Information Era',
    bajada: 'Artículo de autor de Sebastián Moreno Cruz en revista internacional de educación.',
    link: 'https://www.k12digest.com/transmedia-education-a-proposal-to-stimulate-curiosity-and-participation-in-the-information-era/',
  },
  {
    id: 'empresarial-laboral',
    medio: 'Revista Empresarial & Laboral', pais: 'Colombia', fecha: '2023–2026',
    titular: 'Columnas de Sebastián Moreno Cruz',
    bajada: 'Serie de columnas sobre educación, tecnología y transformación digital.',
    link: 'https://revistaempresarial.com/author/sebastian-moreno-cruz/',
  },
  {
    id: 'semana-webinar',
    medio: 'Semana · Foros', pais: 'Colombia', fecha: '2024',
    titular: 'Más de un millón de alumnos se han beneficiado de la educación digital en el país',
    bajada: 'Webinar de Fundación Telefónica Movistar, aliado de los Encuentros Profuturo.',
    link: 'https://www.semana.com/foros-semana/articulo/mas-de-un-millon-de-alumnos-se-han-beneficiado-de-la-educacion-digital-en-el-pais-conozca-mas-en-el-webinar-de-fundacion-telefonica-movistar/202416/',
  },
  {
    // Especial «Nuevos líderes de Colombia», proyecto de Davivienda y Seguros Bolívar. La misma
    // nota salió en Caracol Radio (grupo PRISA): va aparte, con su captura.
    id: 'el-pais', destacada: true, captura: 'el-pais',
    medio: 'El País', pais: 'Colombia', fecha: '12 de diciembre de 2025',
    titular: 'Sebastián Moreno transforma la educación en América Latina con juego y tecnología',
    bajada: 'Perfil del CEO en el especial «Nuevos líderes de Colombia».',
    link: 'https://elpais.com/america-colombia/branded/los-lideres-de-colombia/2025-12-12/sebastian-moreno-transforma-la-educacion-en-america-latina-con-juego-y-tecnologia.html',
  },
  {
    // Reemplaza a «Critertec en Caracol», que venía de critertec.com sin fecha ni enlace.
    id: 'caracol-radio', destacada: true, captura: 'caracol-radio',
    medio: 'Caracol Radio', pais: 'Colombia', fecha: '11 de diciembre de 2025',
    titular: 'Sebastián Moreno: el colombiano que está revolucionando la educación con tecnología y juego',
    bajada: 'Sección «100 Nuevos Líderes de Colombia».',
    link: 'https://caracol.com.co/2025/12/12/sebastian-moreno-el-colombiano-que-esta-revolucionando-la-educacion-con-tecnologia-y-juego/',
  },
  {
    id: 'caracol-video',
    medio: 'Caracol Radio · Video', pais: 'Colombia', fecha: 'diciembre de 2025',
    titular: 'Sebastián Moreno y la tecnología para cerrar la brecha educativa en Latam',
    bajada: 'Video de la serie «100 Nuevos Líderes».',
    link: 'https://www.youtube.com/watch?v=bnctBdKOGdA',
  },
  {
    id: 'dinero',
    medio: 'Dinero', pais: 'Colombia', fecha: null,
    titular: 'Critertec en Revista Dinero',
    bajada: 'Cobertura en Dinero sobre el emprendimiento y su crecimiento.',
    link: null,
    porVerificar: true,
  },
  {
    id: 'colombia-aprende-heroes',
    medio: 'Colombia Aprende · MinEducación', pais: 'Colombia', fecha: 'octubre de 2019',
    titular: 'Héroes del Bicentenario, el primer videojuego pedagógico sobre la independencia',
    bajada: 'Lanzado en el Foro Educativo Nacional 2019 con el apoyo de Microsoft y Critertec.',
    link: 'https://especiales.colombiaaprende.edu.co/fen2019/videojuego.html',
  },
  {
    id: 'colombia-com-heroes',
    medio: 'Colombia.com', pais: 'Colombia', fecha: '21 de octubre de 2019',
    titular: 'Héroes del Bicentenario: enseñanza a través de la tecnología',
    bajada: 'Videojuego desarrollado con Microsoft y Critertec sobre la Campaña Libertadora.',
    link: 'https://www.colombia.com/tecnologia/videojuegos/heroes-del-bicentenario-ensenanza-a-traves-de-la-tecnologia-245037',
  },
  {
    id: 'despejando-dudas-heroes',
    medio: 'Despejando Dudas', pais: 'Colombia', fecha: '19 de octubre de 2019',
    titular: 'Héroes del Bicentenario, la apuesta del Ministerio de Educación para aprender jugando',
    bajada: 'Gamificación para explorar la Campaña Libertadora de 1819.',
    link: 'https://www.despejandodudas.co/index.php/innovacion/1504-heroes-del-bicentenario-la-apuesta-del-ministerio-de-educacion-para-aprender-jugando',
  },
  {
    id: 'lente-regional',
    medio: 'Lente Regional', pais: 'Colombia', fecha: '26 de febrero de 2024',
    titular: 'Más de 1.600 estudiantes y docentes de Florencia se beneficiarán del proyecto '
      + '«ConSentido» que lidera la Alcaldía',
    bajada: 'Dispositivo transmedia de doce semanas sobre sexualidad responsable y proyecto de vida.',
    link: 'https://lenteregional.com/mas-de-1600-estudiantes-y-docentes-de-florencia-se-beneficiaran-del-proyecto-consentido-que-lidera-la-alcaldia/',
  },
  {
    id: 'wfp', captura: 'wfp',
    medio: 'Programa Mundial de Alimentos (WFP)', pais: 'Colombia',
    fecha: '27 de noviembre de 2024',
    titular: 'La innovación mejora la calidad de vida de personas desplazadas y migrantes en Colombia',
    bajada: 'Critertec, entre las startups finalistas del programa de aceleración EnRumbo30.',
    link: 'https://es.wfp.org/noticias/la-innovacion-mejora-la-calidad-de-vida-de-personas-desplazadas-y-migrantes-en-colombia',
  },
  {
    id: 'la-bakana',
    medio: 'La Bakana 105', pais: 'República Dominicana', fecha: '30 de septiembre de 2025',
    titular: 'Sebastián Moreno Cruz: «Los contenidos que enseñamos hoy en dos años serán inservibles»',
    bajada: 'Entrevista sobre educación gamificada y competencias digitales básicas.',
    link: 'https://labakana105.com/noticia/sebastian-moreno-cruz-los-contenidos-que-ensenamos-hoy-en-dos-anos-seran-inservibles',
  },
  {
    id: 'rcc-entrevista', captura: 'rcc-entrevista',
    medio: 'RCC Noticias', pais: 'República Dominicana', fecha: '30 de septiembre de 2025',
    titular: 'Sebastián Moreno Cruz: «Los contenidos que enseñamos hoy en dos años serán inservibles»',
    bajada: 'Entrevista sobre educación gamificada y competencias digitales básicas.',
    link: 'https://rccnoticias.com.do/sebastian-moreno-cruz-los-contenidos-que-ensenamos-hoy-en-dos-anos-seran-inservibles-440611/',
  },
];

/* ═══════════════════════════════════════════════════════════
   10 · ALIADOS
   ═══════════════════════════════════════════════════════════ */

/**
 * Logos de clientes y aliados, de la carpeta «Logos Clientes» de SharePoint. Van en assets/clientes,
 * recortados y aplanados sobre blanco: varios venían con transparencia y la lámina los pone
 * sobre un tablero blanco. Orden: cooperación y tecnología, gobiernos, empresas y fundaciones,
 * universidades.
 */
export const ALIADOS = [
  { n: 'Microsoft', f: 'microsoft.png' },
  { n: 'Canva', f: 'canva.png' },
  { n: 'BID', f: 'bid.png' },
  { n: 'Tony Blair Institute for Global Change', f: 'tony-blair.png' },
  { n: 'Jacobs Foundation', f: 'jacobs.png' },
  { n: 'Confederación Suiza', f: 'suiza.png' },
  { n: 'OEI', f: 'oei.png' },
  { n: 'MIT J-WEL', f: 'mit-jwel.png' },
  { n: 'Fundación Telefónica Movistar', f: 'fundacion-telefonica.png' },
  { n: 'ProFuturo', f: 'profuturo.png' },
  { n: 'LinkedIn Learning', f: 'linkedin-learning.png' },
  { n: 'Ministerio de Educación de República Dominicana', f: 'minerd.png' },
  { n: 'INDOTEL', f: 'indotel.png' },
  { n: 'Ministerio de Educación de Panamá', f: 'mineduc-panama.png' },
  { n: 'MinEducación Colombia', f: 'mineducacion.png' },
  { n: 'Secretaría de Educación de Bogotá', f: 'sed-bogota.png' },
  { n: 'Computadores para Educar', f: 'computadores-educar.png' },
  { n: 'Banca de las Oportunidades', f: 'banca-oportunidades.png' },
  { n: 'Bancóldex', f: 'bancoldex.png' },
  { n: 'Alcaldía de Medellín', f: 'alcaldia-medellin.png' },
  { n: 'Secretaría de Educación de Medellín', f: 'sed-medellin.png' },
  { n: 'Comfama', f: 'comfama.png' },
  { n: 'Colsubsidio', f: 'colsubsidio.png' },
  { n: 'Fundación Universitaria Compensar', f: 'compensar.png' },
  { n: 'Fundación Saldarriaga Concha', f: 'saldarriaga.png' },
  { n: 'Fundación Bolívar Davivienda', f: 'bolivar-davivienda.png' },
  { n: 'ISA Energía', f: 'isa.png' },
  { n: 'Gran Tierra Energy', f: 'gran-tierra.png' },
  { n: 'iGravity', f: 'igravity.png' },
  { n: 'University of Toronto', f: 'toronto.png' },
  { n: 'CESA', f: 'cesa.png' },
  { n: 'Universidad EAFIT', f: 'eafit.png' },
  { n: 'Universidad del Rosario', f: 'rosario.png' },
  { n: 'Universidad de La Sabana', f: 'sabana.png' },
  { n: 'Universidad EAN', f: 'ean.png' },
  { n: 'Corporación Universitaria Iberoamericana', f: 'ibero.png' },
  { n: 'Politécnico Grancolombiano', f: 'poli.png' },
  { n: 'UDCA', f: 'udca.png' },
];

/* ═══════════════════════════════════════════════════════════
   11 · EQUIPO, CASA Y CONTACTO
   ═══════════════════════════════════════════════════════════ */

export const CASA = {
  d: 'Somos un equipo de 38 personas en Bogotá, con estudio de grabación propio, sala de '
    + 'producción y un espacio pensado para que el trabajo creativo pase en el mismo lugar '
    + 'donde se produce.',
  fotos: ['sala', 'estudio', 'vista-1', 'vista-2'],
};

export const CONTACTO = {
  empresa: 'Critertec Educación S.A.S.',
  nit: 'NIT 800.152.913-3',
  dir: 'Cra. 7 # 180-75, Bogotá, Colombia',
  web: 'https://www.critertec.com',
  academy: 'https://www.criteracademy.com',
  prensa: 'prensa@critertec.com',
  linkedin: 'https://www.linkedin.com/company/critertecexp',
};

/* ═══════════════════════════════════════════════════════════
   12 · PROPORCIONES DE FOTO
   ═══════════════════════════════════════════════════════════ */

/**
 * Proporción (ancho ÷ alto) de cada foto, medida con medir-fotos.mjs. El mosaico de campo la
 * necesita para justificar las filas sin recortar: las fotos van de vertical de celular a
 * 16:9, y con celdas iguales las verticales perdían dos tercios.
 */
export const FOTO_AR = {
  'econ-plateada-1': 1.778,
  'econ-plateada-2': 1.787,
  'econ-plateada-3': 1.773,
  'econ-plateada-4': 1.777,
  'econ-plateada-5': 1.777,
  'consentido-guia': 1.295,
  'consentido-comic-01': 0.708,
  'consentido-comic-02': 0.708,
  'consentido-comic-03': 0.708,
  'consentido-comic-04': 0.708,
  'consentido-comic-05': 0.708,
  'consentido-comic-06': 0.708,
  'consentido-comic-07': 0.708,
  'consentido-comic-08': 0.708,
  'consentido-comic-09': 0.708,
  'consentido-anim-1': 1.784,
  'consentido-anim-2': 1.786,
  'consentido-logo': 1.78,
  'consentido-anim-3': 1.768,
  'canvapa-01': 1.775,
  'canvapa-02': 1.333,
  'canvapa-03': 1.376,
  'canvapa-04': 1.333,
  'canvapa-05': 1.333,
  'canvapa-06': 0.563,
  'canvapa-07': 1.333,
  'guardianes-afiche': 0.667,
  'guardianes-afiche-2': 0.667,
  'etc-afiche': 0.667,
  'jam-aula': 3.509,
  'jam-pantalla': 1.333,
  'jam-resultados': 1.806,
  'jam-ruta': 2.041,
  'gratus-1': 1.67,
  'gratus-2': 1.682,
  'gratus-3': 1.668,
  'gratus-4': 1.665,
  'gratus-5': 1.66,
  'showroom-01': 1.333,
  'showroom-02': 1.333,
  'showroom-03': 1.333,
  'showroom-04': 1.333,
  'showroom-05': 1.333,
  'showroom-06': 1.333,
  'showroom-07': 1.333,
  'showroom-08': 1.333,
  'showroom-09': 1.333,
  'showroom-10': 1.333,
  'showroom-11': 1.333,
  'showroom-12': 1.333,
  'vidanueva-01': 1.501,
  'vidanueva-02': 1.501,
  'vidanueva-03': 1.501,
  'vidanueva-04': 1.501,
  'vidanueva-05': 1.501,
  'vidanueva-06': 1.501,
  'vidanueva-07': 1.501,
  'vidanueva-08': 1.501,
  'vidanueva-09': 1.501,
  'vidanueva-10': 1.501,
  'vidanueva-11': 1.501,
  'vidanueva-12': 1.501,
  'vidanueva-13': 1.501,
  'vidanueva-14': 1.501,
  'vidanueva-15': 1.501,
  'vidanueva-16': 1.501,
  'vidanueva-17': 1.501,
  'vidanueva-18': 1.501,
  'alianza-01': 1.332,
  'alianza-02': 1.332,
  'alianza-03': 1.332,
  'alianza-04': 1.332,
  'alianza-05': 1.332,
  'alianza-06': 1.332,
  'alianza-07': 1.332,
  'alianza-08': 1.332,
  'alianza-09': 1.332,
  'alianza-10': 1.332,
  'alianza-11': 1.332,
  'alianza-12': 0.751,
  'alianza-13': 1.332,
  'alianza-14': 1.332,
  'alianza-15': 1.332,
  'alianza-16': 1.332,
  'alianza-17': 1.332,
  'alianza-18': 1.332,
  'cesa-01': 1.5,
  'cesa-02': 1.5,
  'cesa-03': 1.5,
  'cesa-04': 1.5,
  'cesa-05': 1.5,
  'cesa-06': 1.5,
  'cesa-07': 1.5,
  'cesa-08': 1.5,
  'cesa-09': 1.5,
  'cesa-10': 1.5,
  'cesa-11': 1.5,
  'cesa-12': 1.5,
  'cesa-13': 1.5,
  'cesa-14': 1.5,
  'cesa-15': 1.5,
  'cesa-16': 1.5,
  'cesa-17': 1.5,
  'cesa-18': 1.5,
  'mini-01': 1.501,
  'mini-02': 0.667,
  'mini-03': 1.501,
  'mini-04': 1.501,
  'mini-05': 1.501,
  'ibero-01': 1.501,
  'ibero-02': 1.501,
  'ibero-03': 1.501,
  'ibero-04': 1.501,
  'ibero-05': 1.501,
  'ibero-06': 1.501,
  'ibero-07': 1.501,
  'ibero-08': 1.501,
  'ibero-09': 1.501,
  'ibero-10': 1.501,
  'cultivo-comic': 0.791,
  'cultivo-guia': 0.8,
  'cultivo-collage': 0.93,
  'cultivo-rueda': 1.81,
  'paz-infografia': 1.61,
  'heroes-proceres': 1.755,
  'heroes-1819': 1.79,
  'heroes-juego': 1.78,
  'heroes-video': 1.759,
  'mini-grupo': 1.501,
  'mini-taller': 1.501,
  'mini-tablet': 1.501,
  'mini-computadores': 1.501,
  'ibero-acompanamiento': 1.501,
  'ibero-sala': 1.501,
  'ibero-dinamica': 1.501,
  'ibero-equipo': 1.501,
  'ibero-senas': 1.501,
  'prosegur-x01': 0.667,
  'prosegur-x02': 0.667,
  'prosegur-x03': 0.667,
  'prosegur-x04': 0.75,
  'prosegur-x05': 0.667,
  'prosegur-x06': 1.333,
  'prosegur-x07': 1.333,
  'prof-x01': 1.333,
  'prof-x02': 1.333,
  'prof-x03': 1.333,
  'prof-x04': 1.333,
  'prof-x05': 1.333,
  'prof-x06': 1.333,
  'prof-x07': 1.333,
  'prof-x08': 2,
  'prof-x09': 1.335,
  'prof-x10': 1.333,
  'prof-x11': 1.333,
  'prof-x12': 1.333,
  'prof-x13': 1.333,
  'ip-x01': 1.333,
  'ip-x02': 1.5,
  'ip-x03': 1.5,
  'ip-x04': 1.5,
  'ip-x05': 1.5,
  'ip-x06': 1.5,
  'ip-x07': 1.5,
  'ip-x08': 1.5,
  'ip-x09': 1.5,
  'ip-x10': 1.5,
  'ip-x11': 1.774,
  'ip-x12': 1.333,
  'ip-x13': 1.498,
  'idig-x01': 1.5,
  'idig-x02': 1.5,
  'idig-x03': 1.5,
  'idig-x04': 1.5,
  'idig-x05': 1.5,
  'idig-x06': 1.5,
  'idig-x07': 1.5,
  'idig-x08': 1.5,
  'idig-x09': 1.5,
  'idig-x10': 1.5,
  'idig-x11': 1.5,
  'idig-x12': 1.5,
  'insp-x01': 1.333,
  'insp-x02': 1.333,
  'insp-x03': 1.329,
  'insp-x04': 0.75,
  'insp-x05': 1.333,
  'insp-x06': 1.333,
  'insp-x07': 1.333,
  'insp-x08': 1.333,
  'insp-x09': 1.941,
  'insp-x10': 1.405,
  'insp-x11': 1.776,
  'insp-x12': 0.876,
  'disr-x01': 2.222,
  'disr-x02': 2.222,
  'disr-x03': 1.332,
  'disr-x04': 2.157,
  'disr-x05': 1.63,
  'disr-x06': 1.481,
  'disr-x07': 1.78,
  'disr-x08': 1.333,
  'disr-x09': 1.778,
  'disr-x10': 1.333,
  'disr-x11': 1.333,
  'disr-x12': 1.333,
  'etc-x01': 2.222,
  'etc-x02': 2.219,
  'etc-x03': 0.451,
  'etc-x04': 2.219,
  'etc-x05': 0.88,
  'etc-x06': 1.76,
  'etc-x07': 2.1,
  'etc-x08': 0.654,
  'etc-x09': 1.78,
  'etc-x10': 1.78,
  'etc-x11': 1.778,
  'agro-x01': 0.8,
  'agro-x02': 1.333,
  'agro-x03': 2.222,
  'agro-x04': 1.333,
  'agro-x05': 2.166,
  'agro-x06': 2.168,
  'agro-x07': 1.779,
  'agro-x08': 0.75,
  'agro-x09': 1.333,
  'agro-x10': 1.337,
  'agro-x11': 1.778,
  'agro-x12': 1.338,
  'sd-x01': 1.333,
  'sd-x02': 1.778,
  'sd-x03': 1.333,
  'sd-x04': 1.5,
  'sd-x05': 0.75,
  'sd-x06': 1.778,
  'sd-x07': 1.779,
  'sd-x08': 1.333,
  'sd-x09': 0.623,
  'sd-x10': 1.778,
  'sd-x11': 0.667,
  'sd-x12': 1.333,
  'disr-presentacion': 1.778,
  'disr-tablet': 1.333,
  'disr-muro': 1.333,
  'disr-dinamica': 1.46,
  'disr-equipo': 2.222,
  'disr-adultos': 1.333,
  'etc-estudio': 2.219,
  'etc-selfie': 1.333,
  'etc-sinsesgos': 1.768,
  'etc-comic': 0.66,
  'etc-decalogo': 0.77,
  'insp-tablet': 1.333,
  'insp-mascara': 0.599,
  'insp-manos': 1.333,
  'insp-ronda': 1.352,
  'insp-juego': 1.84,
  'insp-pendon': 1.7,
  'prof-grupo': 1.333,
  'prof-auditorio': 1.333,
  'prof-mesa': 1.333,
  'prof-tablet': 1.333,
  'prof-sala': 1.333,
  'ip-grupo': 1.5,
  'ip-robotica': 1.5,
  'ip-vr': 1.5,
  'ip-maestra': 1.333,
  'ip-aula': 1.5,
  'idig-cuaderno': 1.5,
  'idig-robot': 1.5,
  'idig-vr': 1.5,
  'idig-tablet': 1.5,
  'idig-sonrisas': 1.5,
  'idig-grupo': 1.5,
  'gmech-titulo': 1.788,
  'gmech-bosque': 1.784,
  'agro-arco': 2.222,
  'agro-grupo': 1.333,
  'agro-taller': 1.333,
  'agro-lab': 1.333,
  'agro-juego': 1.779,
  'agro-lectura': 2.222,
  'jam-escenario': 1.333,
  'jam-mesa': 0.75,
  'jam-auditorio': 1.499,
  'jam-charla': 1.499,
  'canva-2': 1.333,
  'canva-3': 1.333,
  'canva-4': 1.777,
  'canva-auditorio': 1.333,
  'equipo-1': 1.333,
  'estudio-1': 1.771,
  'estudio-2': 1.778,
  'estudio-3': 1.787,
  'estudio-4': 1.777,
  'estudio-masterclass': 1.777,
  'estudio-set': 1.771,
  'oei-1': 0.751,
  'oei-2': 1.778,
  'oei-3': 0.563,
  'prosegur-1': 0.750,
  'prosegur-2': 0.750,
  'prosegur-3': 1.333,
  'sd-1': 0.750,
  'sd-2': 0.750,
  'sd-3': 0.750,
  'sd-4': 0.750,
  'sd-5': 1.771,
  'sd-6': 0.563,
  'sd-7': 0.547,
  'sd-arena': 0.563,
  'sd-comunidad': 0.750,
  'sd-estudiantes': 1.771,
  'sd-retrato-hombre': 0.750,
  'sd-retrato-mujer': 0.750,
  'sd-silla-ruedas': 0.750,
  'tbi-1': 1.471,
  'tbi-2': 1.047,
  'tbi-3': 0.860,
  'tbi-plataforma': 1.047,
};
