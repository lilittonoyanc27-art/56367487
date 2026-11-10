export interface TableRow {
  cells: { es: string; hy: string; note?: string }[];
}

export interface TableData {
  headers: { es: string; hy: string }[];
  rows: TableRow[];
}

export interface ContentBlock {
  id: string;
  type: 'paragraph' | 'formula' | 'callout' | 'example' | 'quote' | 'table' | 'key-rule';
  es: string;
  hy: string;
  highlight?: string;
  table?: TableData;
  sourceUrl?: string;
  sourceName?: string;
}

export interface Section {
  id: string;
  part: 1 | 2; // Part 1: Main guide (1-18), Part 2: Detailed deep dive (1-15)
  sectionNumber: number;
  category: 'basics' | 'meter' | 'rhyme' | 'themes' | 'examples' | 'mistakes' | 'exam';
  titleEs: string;
  titleHy: string;
  summaryEs?: string;
  summaryHy?: string;
  blocks: ContentBlock[];
}

export interface QuizQuestion {
  id: string;
  questionEs: string;
  questionHy: string;
  options: {
    es: string;
    hy: string;
    correct: boolean;
    explanationHy: string;
  }[];
}

export const ROMANCE_SECTIONS: Section[] = [
  // ================= PART 1 =================
  {
    id: 'sec-1-1',
    part: 1,
    sectionNumber: 1,
    category: 'basics',
    titleEs: '1. ¿Qué es un romance?',
    titleHy: '1. Ի՞նչ է ռոմանսը',
    summaryEs: 'Definición, métrica octosílaba, rima asonante en pares y carácter épico-lírico.',
    summaryHy: 'Ռոմանսի սահմանումը, ութվանկանի տողերը, ձայնավորային հանգը զույգ տողերում և պատմողական-քնարական բնույթը։',
    blocks: [
      {
        id: '1-1-p1',
        type: 'paragraph',
        es: 'El romance es un poema formado por una serie de versos, normalmente octosílabos, con rima asonante en los versos pares. Los versos impares quedan sueltos. No tiene un número fijo de versos y suele contar una historia.',
        hy: 'Ռոմանսը բանաստեղծություն է, որը սովորաբար կազմված է ութվանկանի տողերից։ Զույգ տողերը միմյանց հետ ունեն ձայնավորային հանգ, իսկ կենտ տողերը մնում են անհանգ։ Տողերի քանակը հաստատուն չէ։ Ռոմանսը հաճախ որևէ պատմություն է պատմում։'
      },
      {
        id: '1-1-formula',
        type: 'formula',
        es: '8– / 8a / 8– / 8a / 8– / 8a…',
        hy: 'Դասական ռոմանսի հիմնական բանաձևը՝ 8– / 8a / 8– / 8a / 8– / 8a…'
      },
      {
        id: '1-1-p2',
        type: 'paragraph',
        es: 'Es una composición de carácter narrativo que también puede expresar sentimientos: por eso se habla de su carácter épico-lírico.',
        hy: 'Այն կարող է և՛ դեպքեր պատմել, և՛ զգացմունքներ արտահայտել։ Այդ պատճառով այն բնութագրվում է որպես պատմողական-քնարական ստեղծագործություն։',
        sourceName: 'ceiploreto.es',
        sourceUrl: 'https://ceiploreto.es/sugerencias/recursos.cnice.mec.es/lengua/profesores/eso1/t3/teoria_5.htm'
      }
    ]
  },
  {
    id: 'sec-1-2',
    part: 1,
    sectionNumber: 2,
    category: 'basics',
    titleEs: '2. Verso, estrofa y poema',
    titleHy: '2. Տող, տուն և բանաստեղծություն',
    summaryEs: 'Composición no estrófica y distinción entre octosílabo y número total de versos.',
    summaryHy: 'Ռոմանսի ոչ էստրոֆիկ կառուցվածքը և ութվանկանիի ու ամբողջ տողերի քանակի տարբերությունը։',
    blocks: [
      {
        id: '1-2-t1',
        type: 'table',
        es: 'Términos métricos fundamentales: verso, estrofa y poema.',
        hy: 'Հիմնական տաղաչափական հասկացությունները՝ տող, տուն և բանաստեղծություն։',
        table: {
          headers: [
            { es: 'Español', hy: 'Հայերեն' }
          ],
          rows: [
            {
              cells: [
                { es: 'Verso: cada línea de un poema.', hy: 'Բանաստեղծական տող․ բանաստեղծության յուրաքանչյուր տողը։' }
              ]
            },
            {
              cells: [
                { es: 'Estrofa: conjunto de versos organizado según una estructura.', hy: 'Տուն․ որոշակի կառուցվածքով միավորված տողերի խումբ։' }
              ]
            },
            {
              cells: [
                { es: 'Poema: la composición completa.', hy: 'Բանաստեղծություն․ ամբողջ ստեղծագործությունը։' }
              ]
            }
          ]
        }
      },
      {
        id: '1-2-p1',
        type: 'paragraph',
        es: 'El romance es una composición no estrófica: su estructura no exige grupos de cuatro, seis u ocho versos. Puede aparecer dividido visualmente en bloques, pero eso no cambia necesariamente su forma métrica.',
        hy: 'Ռոմանսի կառուցվածքը չի պահանջում տների պարտադիր բաժանում, օրինակ՝ ամեն չորս կամ վեց տողից հետո։ Գրքում այն կարող է բաժանված լինել հատվածների, բայց այդ տեսողական բաժանումը պարտադիր չի փոխում նրա բանաստեղծական ձևը։'
      },
      {
        id: '1-2-callout',
        type: 'callout',
        es: '¡Atención! Octosílabo significa que un verso tiene ocho sílabas métricas; no significa que el poema tenga ocho versos.',
        hy: 'Ուշադրությո՛ւն։ Ութվանկանի նշանակում է, որ մեկ տողը ունի ութ տաղաչափական վանկ։ Դա չի նշանակում, որ ամբողջ բանաստեղծությունը ունի ութ տող։'
      }
    ]
  },
  {
    id: 'sec-1-3',
    part: 1,
    sectionNumber: 3,
    category: 'rhyme',
    titleEs: '3. Versos pares e impares',
    titleHy: '3. Զույգ և կենտ տողեր',
    summaryEs: 'Distribución métrica: versos impares sueltos y versos pares con rima «a».',
    summaryHy: 'Տողերի բաշխումը՝ կենտ տողերը անհանգ են, իսկ զույգ տողերը՝ «a» ձայնավորային հանգով։',
    blocks: [
      {
        id: '1-3-p0',
        type: 'paragraph',
        es: 'Los versos se numeran de arriba hacia abajo para el análisis métrico.',
        hy: 'Տողերը համարակալում ենք վերևից ներքև։'
      },
      {
        id: '1-3-t1',
        type: 'table',
        es: 'Esquema de versos pares e impares en el romance.',
        hy: 'Զույգ և կենտ տողերի սխեման ռոմանսում։',
        table: {
          headers: [
            { es: 'Número de verso', hy: 'Տողի համարը' },
            { es: 'Tipo', hy: 'Տեսակը' },
            { es: 'En el romance', hy: 'Ռոմանսում' }
          ],
          rows: [
            { cells: [{ es: '1', hy: '1' }, { es: 'Impar', hy: 'Կենտ' }, { es: 'Suelto', hy: 'Անհանգ' }] },
            { cells: [{ es: '2', hy: '2' }, { es: 'Par', hy: 'Զույգ' }, { es: 'Rima «a»', hy: '«a» հանգ' }] },
            { cells: [{ es: '3', hy: '3' }, { es: 'Impar', hy: 'Կենտ' }, { es: 'Suelto', hy: 'Անհանգ' }] },
            { cells: [{ es: '4', hy: '4' }, { es: 'Par', hy: 'Զույգ' }, { es: 'Rima «a»', hy: '«a» հանգ' }] },
            { cells: [{ es: '5', hy: '5' }, { es: 'Impar', hy: 'Կենտ' }, { es: 'Suelto', hy: 'Անհանգ' }] },
            { cells: [{ es: '6', hy: '6' }, { es: 'Par', hy: 'Զույգ' }, { es: 'Rima «a»', hy: '«a» հանգ' }] }
          ]
        }
      },
      {
        id: '1-3-p1',
        type: 'paragraph',
        es: 'En el romance tradicional, los versos pares mantienen la misma asonancia a lo largo del poema.',
        hy: 'Ավանդական ռոմանսում զույգ տողերի ձայնավորային հանգը պահպանվում է ամբողջ բանաստեղծության ընթացքում։'
      }
    ]
  },
  {
    id: 'sec-1-4',
    part: 1,
    sectionNumber: 4,
    category: 'rhyme',
    titleEs: '4. ¿Qué es la rima asonante?',
    titleHy: '4. Ի՞նչ է ձայնավորային հանգը',
    summaryEs: 'Coincidencia de vocales a partir de la última vocal tónica (ejemplos a-a, i-o).',
    summaryHy: 'Ձայնավորների համընկնումը վերջին շեշտված ձայնավորից սկսած (օրինակ՝ a-a, i-o)։',
    blocks: [
      {
        id: '1-4-p1',
        type: 'paragraph',
        es: 'En la rima asonante coinciden las vocales desde la última vocal tónica de la palabra final de cada verso.',
        hy: 'Ձայնավորային հանգի դեպքում տողերի վերջին բառերում համընկնում են վերջին շեշտված ձայնավորից սկսած ձայնավորները։'
      },
      {
        id: '1-4-ex1',
        type: 'example',
        es: 'casa — rama — ventana\n• casa → a–a\n• rama → a–a\n• ventana → a–a (la última vocal tónica es la «a» de «ta»)',
        hy: 'casa — rama — ventana\n• casa → a–a\n• rama → a–a\n• ventana → a–a, քանի որ վերջին շեշտված ձայնավորը «ta» վանկի «a»-ն է։'
      },
      {
        id: '1-4-p2',
        type: 'paragraph',
        es: 'Las consonantes pueden ser diferentes: lo que se repite es la combinación de vocales a–a.',
        hy: 'Բաղաձայնները կարող են տարբեր լինել։ Այստեղ կրկնվում է a–a ձայնավորների համադրությունը։'
      },
      {
        id: '1-4-ex2',
        type: 'example',
        es: 'camino — suspiro → i–o',
        hy: 'Մեկ այլ օրինակ՝ camino — suspiro → i–o'
      },
      {
        id: '1-4-callout',
        type: 'callout',
        es: 'No basta con mirar la última letra: hay que localizar la última vocal tónica.',
        hy: 'Միայն վերջին տառը նայելը բավարար չէ։ Պետք է գտնել վերջին շեշտված ձայնավորը։'
      }
    ]
  },
  {
    id: 'sec-1-5',
    part: 1,
    sectionNumber: 5,
    category: 'rhyme',
    titleEs: '5. Rima asonante y consonante',
    titleHy: '5. Ձայնավորային և լրիվ հանգ',
    summaryEs: 'Comparativa entre rima asonante (vocales) y rima consonante (todos los sonidos).',
    summaryHy: 'Համեմատություն ձայնավորային հանգի (միայն ձայնավորներ) և լրիվ հանգի (բոլոր հնչյուններ) միջև։',
    blocks: [
      {
        id: '1-5-t1',
        type: 'table',
        es: 'Diferencias entre rima asonante y consonante con ejemplos.',
        hy: 'Տարբերությունները ձայնավորային և լրիվ հանգերի միջև՝ օրինակներով։',
        table: {
          headers: [
            { es: 'Tipo', hy: 'Տեսակ' },
            { es: 'Regla en español', hy: 'Իսպաներեն կանոն' },
            { es: 'Բացատրություն հայերեն', hy: 'Հայերեն բացատրություն' },
            { es: 'Ejemplo', hy: 'Օրինակ' }
          ],
          rows: [
            {
              cells: [
                { es: 'Asonante', hy: 'Ձայնավորային' },
                { es: 'Coinciden las vocales desde la última vocal tónica.', hy: 'Համընկնում են ձայնավորները՝ վերջին շեշտված ձայնավորից սկսած։' },
                { es: 'Համընկնում են ձայնավորները՝ վերջին շեշտված ձայնավորից սկսած։', hy: 'Համընկնում են ձայնավորները՝ վերջին շեշտված ձայնավորից սկսած։' },
                { es: 'casa / rama', hy: 'casa / rama' }
              ]
            },
            {
              cells: [
                { es: 'Consonante', hy: 'Լրիվ (բաղաձայնական)' },
                { es: 'Coinciden todos los sonidos desde la última vocal tónica.', hy: 'Համընկնում են բոլոր հնչյունները՝ վերջին շեշտված ձայնավորից սկսած։' },
                { es: 'Համընկնում են բոլոր հնչյունները՝ վերջին շեշտված ձայնավորից սկսած։', hy: 'Համընկնում են բոլոր հնչյունները՝ վերջին շեշտված ձայնավորից սկսած։' },
                { es: 'canción / corazón', hy: 'canción / corazón' }
              ]
            }
          ]
        }
      },
      {
        id: '1-5-p1',
        type: 'paragraph',
        es: 'El romance tradicional se caracteriza por la rima asonante. Una coincidencia consonante aislada entre dos palabras no basta para descartar que sea un romance: hay que observar toda la serie.',
        hy: 'Ավանդական ռոմանսին բնորոշ է ձայնավորային հանգը։ Եթե երկու բառ պատահաբար լրիվ հանգ ունեն, դա դեռ չի նշանակում, որ ստեղծագործությունը ռոմանս չէ։ Պետք է ուսումնասիրել ամբողջ հանգավորումը։'
      }
    ]
  },
  {
    id: 'sec-1-6',
    part: 1,
    sectionNumber: 6,
    category: 'meter',
    titleEs: '6. ¿Qué significa «8– 8a»?',
    titleHy: '6. Ի՞նչ է նշանակում «8– 8a»',
    summaryEs: 'Explicación del número 8, guion (-) y letra (a). Arte menor (≤8) vs arte mayor (≥9).',
    summaryHy: '8 թվի, գծիկի (-) և «a» տառի իմաստը։ Arte menor (մինչև 8 վանկ) և arte mayor (9 և ավելի)։',
    blocks: [
      {
        id: '1-6-t1',
        type: 'table',
        es: 'Signos de la notación métrica 8– 8a.',
        hy: '8– 8a տաղաչափական նշանների նշանակությունը։',
        table: {
          headers: [
            { es: 'Signo', hy: 'Նշան' },
            { es: 'Español', hy: 'Իսպաներեն' },
            { es: 'Հայերեն', hy: 'Հայերեն' }
          ],
          rows: [
            { cells: [{ es: '8', hy: '8' }, { es: 'Ocho sílabas métricas.', hy: 'Ութ տաղաչափական վանկ։' }, { es: 'Ութ տաղաչափական վանկ։', hy: 'Ութ տաղաչափական վանկ։' }] },
            { cells: [{ es: '–', hy: '–' }, { es: 'Verso suelto.', hy: 'Անհանգ տող։' }, { es: 'Անհանգ տող։', hy: 'Անհանգ տող։' }] },
            { cells: [{ es: 'a', hy: 'a' }, { es: 'Verso que comparte la rima señalada con esa letra.', hy: 'Տող, որի հանգը համընկնում է նույն տառով նշված տողերի հանգին։' }, { es: 'Տող, որի հանգը համընկնում է նույն տառով նշված տողերի հանգին։', hy: 'Տող, որի հանգը համընկնում է նույն տառով նշված տողերի հանգին։' }] }
          ]
        }
      },
      {
        id: '1-6-p1',
        type: 'paragraph',
        es: 'La letra «a» es una etiqueta: no significa que la palabra deba terminar en la vocal «a». Se escribe en minúscula porque los versos son de arte menor.',
        hy: '«a» տառը պարզապես նշան է․ այն չի նշանակում, որ բառը պարտադիր պետք է ավարտվի «a» ձայնավորով։ Փոքրատառ է գրվում, որովհետև տողերը պատկանում են arte menor խմբին։'
      },
      {
        id: '1-6-p2',
        type: 'paragraph',
        es: 'Los versos de arte menor tienen hasta ocho sílabas métricas. Los de arte mayor tienen nueve o más.',
        hy: 'Arte menor խմբի տողերն ունեն մինչև ութ տաղաչափական վանկ, իսկ arte mayor խմբինը՝ ինը կամ ավելի։',
        sourceName: 'juntadeandalucia.es',
        sourceUrl: 'https://edea.juntadeandalucia.es'
      }
    ]
  },
  {
    id: 'sec-1-7',
    part: 1,
    sectionNumber: 7,
    category: 'meter',
    titleEs: '7. ¿Cómo se cuentan las sílabas?',
    titleHy: '7. Ինչպե՞ս հաշվել վանկերը',
    summaryEs: 'Los 4 pasos para medir un verso. Sílabas gramaticales vs métricas.',
    summaryHy: 'Տողի վանկերը չափելու 4 քայլերը։ Քերականական և տաղաչափական վանկերի տարբերությունը։',
    blocks: [
      {
        id: '1-7-steps',
        type: 'example',
        es: 'Para medir un verso:\n1. Separamos las palabras en sílabas.\n2. Comprobamos las uniones entre palabras, especialmente las sinalefas.\n3. Observamos si aparece alguna otra licencia métrica.\n4. Aplicamos la regla de la palabra final.',
        hy: 'Տողի վանկերը հաշվելու համար՝\n1. Բառերը բաժանում ենք վանկերի։\n2. Ստուգում ենք բառերի միջև միավորումները, հատկապես՝ սինալեֆաները։\n3. Ստուգում ենք՝ կա՞ արդյոք այլ տաղաչափական հնարք։\n4. Կիրառում ենք տողի վերջին բառի շեշտի կանոնը։'
      },
      {
        id: '1-7-key',
        type: 'key-rule',
        es: 'Las sílabas gramaticales y las métricas no siempre coinciden.',
        hy: 'Բառերի սովորական վանկերի գումարը միշտ չէ, որ հավասար է տողի տաղաչափական վանկերի թվին։'
      }
    ]
  },
  {
    id: 'sec-1-8',
    part: 1,
    sectionNumber: 8,
    category: 'meter',
    titleEs: '8. La sinalefa',
    titleHy: '8. Սինալեֆա',
    summaryEs: 'Unión de vocal final e inicial en una sola sílaba. Reglas con «h» y con «y».',
    summaryHy: 'Վերջին և հաջորդ բառի սկզբնական ձայնավորների միավորումը մեկ վանկում։ Կանոններ «h»-ով և «y»-ով։',
    blocks: [
      {
        id: '1-8-p1',
        type: 'paragraph',
        es: 'La sinalefa se produce cuando una palabra termina en vocal y la siguiente empieza por vocal: esas vocales se cuentan juntas dentro de una misma sílaba métrica.',
        hy: 'Սինալեֆան առաջանում է, երբ մի բառ ավարտվում է ձայնավորով, իսկ հաջորդը սկսվում է ձայնավորով․ դրանք միավորվում և հաշվվում են որպես մեկ տաղաչափական վանկ։'
      },
      {
        id: '1-8-ex1',
        type: 'example',
        es: 'La luna estaba crecida.\n• Sin sinalefa: La / lu / na / es / ta / ba / cre / ci / da = 9\n• Con sinalefa: La / lu / na_es / ta / ba / cre / ci / da = 8\nLa unión «na_es» reduce el cómputo en una sílaba.',
        hy: 'La luna estaba crecida. (Լուսինը մեծացել էր։)\n• Առանց միավորման՝ La / lu / na / es / ta / ba / cre / ci / da = 9\n• Սինալեֆայով՝ La / lu / na_es / ta / ba / cre / ci / da = 8\n«na_es» միավորման շնորհիվ հաշվարկը մեկ վանկով պակասում է։'
      },
      {
        id: '1-8-h',
        type: 'paragraph',
        es: 'Con «h»: La «h» muda no impide la sinalefa: mi_hijo.',
        hy: '«h» տառի դեպքում՝ Չարտասանվող «h» տառը չի խանգարում սինալեֆային՝ mi_hijo։'
      },
      {
        id: '1-8-y',
        type: 'paragraph',
        es: 'Con «y»: La «y» puede participar cuando tiene sonido vocálico /i/, como en y_el.',
        hy: '«y» տառի դեպքում՝ «y»-ը կարող է մասնակցել միավորմանը, երբ արտասանվում է որպես /ի/ ձայնավոր, օրինակ՝ y_el։'
      },
      {
        id: '1-8-oblig',
        type: 'paragraph',
        es: '¿Es siempre obligatoria? Es muy habitual, pero el ritmo o una pausa marcada pueden favorecer la separación. Una coma no impide automáticamente la sinalefa.',
        hy: 'Մի՞շտ է պարտադիր՝ Այն շատ տարածված է, բայց ռիթմը կամ ընդգծված դադարը կարող են նպաստել վանկերի առանձին արտասանությանը։ Ստորակետի առկայությունը ինքնաբերաբար չի արգելում սինալեֆան։',
        sourceName: 'EducaMadrid',
        sourceUrl: 'https://www.educa2.madrid.org'
      }
    ]
  },
  {
    id: 'sec-1-9',
    part: 1,
    sectionNumber: 9,
    category: 'meter',
    titleEs: '9. La palabra final: +1, 0, −1',
    titleHy: '9. Վերջին բառի կանոնը (+1, 0, −1)',
    summaryEs: 'Regla del acento final del verso: Aguda (+1), Llana/Grave (0), Esdrújula (-1).',
    summaryHy: 'Տողի վերջին բառի շեշտի կանոնը՝ Aguda (+1), Llana/Grave (0), Esdrújula (-1)։',
    blocks: [
      {
        id: '1-9-note',
        type: 'callout',
        es: 'Esta regla se aplica exclusivamente a la última palabra del verso, no a todas las palabras intermedias.',
        hy: 'Այս կանոնը կիրառվում է տողի վերջին բառի նկատմամբ, ոչ թե յուրաքանչյուր բառի։'
      },
      {
        id: '1-9-t1',
        type: 'table',
        es: 'Regla del cómputo métrico según el acento de la última palabra.',
        hy: 'Տաղաչափական հաշվարկի կանոնը՝ ըստ վերջին բառի շեշտի։',
        table: {
          headers: [
            { es: 'Última palabra', hy: 'Վերջին բառ' },
            { es: 'Español', hy: 'Իսպաներեն' },
            { es: 'Հայերեն', hy: 'Հայերեն' },
            { es: 'Operación', hy: 'Գործողություն' }
          ],
          rows: [
            {
              cells: [
                { es: 'Aguda', hy: 'Aguda (վերջին վանկ)' },
                { es: 'Acento en la última sílaba.', hy: 'Շեշտը վերջին վանկի վրա է։' },
                { es: 'Շեշտը վերջին վանկի վրա է։', hy: 'Շեշտը վերջին վանկի վրա է։' },
                { es: '+1', hy: '+1' }
              ]
            },
            {
              cells: [
                { es: 'Llana / grave', hy: 'Llana / grave (նախավերջին վանկ)' },
                { es: 'Acento en la penúltima sílaba.', hy: 'Շեշտը նախավերջին վանկի վրա է։' },
                { es: 'Շեշտը նախավերջին վանկի վրա է։', hy: 'Շեշտը նախավերջին վանկի վրա է։' },
                { es: '0', hy: '0' }
              ]
            },
            {
              cells: [
                { es: 'Esdrújula', hy: 'Esdrújula (վերջից 3-րդ վանկ)' },
                { es: 'Acento en la antepenúltima sílaba.', hy: 'Շեշտը վերջից երրորդ վանկի վրա է։' },
                { es: 'Շեշտը վերջից երրորդ վանկի վրա է։', hy: 'Շեշտը վերջից երրորդ վանկի վրա է։' },
                { es: '−1', hy: '−1' }
              ]
            }
          ]
        }
      },
      {
        id: '1-9-ex-aguda',
        type: 'example',
        es: 'A. Final agudo: «Yo te digo la verdad.»\nYo / te / di / go / la / ver / dad = 7 sílabas\n«verdad» es aguda → 7 + 1 = 8 sílabas métricas.',
        hy: 'A. Վերջին վանկի շեշտ (Aguda)՝ «Yo te digo la verdad.» (Ես քեզ ճշմարտությունն եմ ասում։)\nYo / te / di / go / la / ver / dad = 7\n«verdad» բառը aguda է → 7 + 1 = 8 տաղաչափական վանկ։'
      },
      {
        id: '1-9-ex-llano',
        type: 'example',
        es: 'B. Final llano: «Por el valle va la niña.»\nPor / el / va / lle / va / la / ni / ña = 8 sílabas\n«niña» es llana → 8 + 0 = 8 sílabas métricas.',
        hy: 'B. Նախավերջին վանկի շեշտ (Llana)՝ «Por el valle va la niña.» (Հովտով գնում է աղջիկը։)\nPor / el / va / lle / va / la / ni / ña = 8\n«niña» բառը llana է → 8 + 0 = 8 տաղաչափական վանկ։'
      },
      {
        id: '1-9-ex-esd',
        type: 'example',
        es: 'C. Final esdrújulo: «En el bosque suena música.»\nEn / el / bos / que / sue / na / mú / si / ca = 9 sílabas\n«música» es esdrújula → 9 − 1 = 8 sílabas métricas.',
        hy: 'C. Վերջից երրորդ վանկի շեշտ (Esdrújula)՝ «En el bosque suena música.» (Անտառում երաժշտություն է հնչում։)\nEn / el / bos / que / sue / na / mú / si / ca = 9\n«música» բառը esdrújula է → 9 − 1 = 8 տաղաչափական վանկ։'
      }
    ]
  },
  {
    id: 'sec-1-10',
    part: 1,
    sectionNumber: 10,
    category: 'meter',
    titleEs: '10. Otras licencias métricas',
    titleHy: '10. Այլ տաղաչափական հնարքներ',
    summaryEs: 'Hiato métrico / dialefa, sinéresis y diéresis con ejemplos.',
    summaryHy: 'Հիատուս/դիալեֆա, սիներեզիս և դիերեզիս՝ օրինակներով։',
    blocks: [
      {
        id: '1-10-t1',
        type: 'table',
        es: 'Licencias métricas adicionales.',
        hy: 'Լրացուցիչ տաղաչափական հնարքները։',
        table: {
          headers: [
            { es: 'Recurso', hy: 'Հնարք' },
            { es: 'Explicación en español', hy: 'Իսպաներեն բացատրություն' },
            { es: 'Բացատրություն հայերեն', hy: 'Հայերեն բացատրություն' }
          ],
          rows: [
            {
              cells: [
                { es: 'Hiato métrico / dialefa', hy: 'Hiato métrico / dialefa' },
                { es: 'Se mantienen separadas vocales de palabras distintas que podrían formar sinalefa.', hy: 'Տարբեր բառերի այն ձայնավորները, որոնք կարող էին միավորվել, հաշվվում են առանձին։' },
                { es: 'Տարբեր բառերի այն ձայնավորները, որոնք կարող էին միավորվել, հաշվվում են առանձին։', hy: 'Տարբեր բառերի այն ձայնավորները, որոնք կարող էին միավորվել, հաշվվում են առանձին։' }
              ]
            },
            {
              cells: [
                { es: 'Sinéresis', hy: 'Sinéresis (սիներեզիս)' },
                { es: 'Dentro de una palabra se unen vocales que normalmente forman hiato.', hy: 'Մեկ բառի ներսում միավորվում են սովորաբար առանձին վանկեր կազմող ձայնավորները։' },
                { es: 'Մեկ բառի ներսում միավորվում են սովորաբար առանձին վանկեր կազմող ձայնավորները։', hy: 'Մեկ բառի ներսում միավորվում են սովորաբար առանձին վանկեր կազմող ձայնավորները։' }
              ]
            },
            {
              cells: [
                { es: 'Diéresis', hy: 'Diéresis (դիերեզիս)' },
                { es: 'Dentro de una palabra se separa un diptongo en dos sílabas.', hy: 'Մեկ բառի ներսում երկբարբառը բաժանվում է երկու վանկի։' },
                { es: 'Մեկ բառի ներսում երկբարբառը բաժանվում է երկու վանկի։', hy: 'Մեկ բառի ներսում երկբարբառը բաժանվում է երկու վանկի։' }
              ]
            }
          ]
        }
      },
      {
        id: '1-10-ex',
        type: 'example',
        es: 'Ejemplos:\n• Dialefa: «mi / alma» (dos sílabas en lugar de la unión regular mi_alma).\n• Sinéresis: «po-e-ta» normalmente tiene tres sílabas, pero puede medirse en dos por ritmo poético.\n• Diéresis: «suave» normalmente es sua-ve (2 sílabas); con diéresis: su-a-ve (3 sílabas, a veces escrito süave).',
        hy: 'Օրինակներ՝\n• Dialefa: «mi / alma»՝ երկու հաշվվող վանկ՝ սովորական mi_alma միավորման փոխարեն։\n• Sinéresis: «po-e-ta» սովորաբար ունի երեք վանկ, բայց համապատասխան բանաստեղծական արտասանությամբ կարող է հաշվվել երկու։\n• Diéresis: «suave» սովորաբար sua-ve է՝ երկու վանկ։ Դիերեզիսի դեպքում՝ su-a-ve՝ երեք, երբեմն գրված՝ süave։'
      },
      {
        id: '1-10-warn',
        type: 'callout',
        es: 'Estas licencias deben justificarse por la pronunciación y el ritmo. No se aplican arbitrariamente para obtener ocho sílabas.',
        hy: 'Այս հնարքները պետք է հիմնավորվեն արտասանությամբ և ռիթմով։ Դրանք չի կարելի կամայականորեն կիրառել միայն ութ թիվը ստանալու համար։'
      }
    ]
  },
  {
    id: 'sec-1-11',
    part: 1,
    sectionNumber: 11,
    category: 'meter',
    titleEs: '11. Si cuento 9 o 10 sílabas, ¿puede ser un romance?',
    titleHy: '11. Եթե հաշվում եմ 9 կամ 10 վանկ, կարո՞ղ է ռոմանս լինել',
    summaryEs: 'Sí, si el resultado métrico final es ocho gracias a sinalefas y regla del acento.',
    summaryHy: 'Այո՛, եթե վերջնական տաղաչափական հաշվարկով ստացվում է ութ (սինալեֆաների և շեշտի կանոնի շնորհիվ)։',
    blocks: [
      {
        id: '1-11-core',
        type: 'key-rule',
        es: 'Sí, si el resultado métrico final es ocho.',
        hy: 'Այո՛, եթե վերջնական տաղաչափական հաշվարկով ստացվում է ութ։'
      },
      {
        id: '1-11-ex1',
        type: 'example',
        es: '«Su caballo era de oro.» (Su / ca / ba / llo / e / ra / de / o / ro = 9)\nAquí hay 9 sílabas gramaticales; si aplicamos dos sinalefas obtendríamos 7, no 8. Por tanto, no basta con ver vocales juntas; hay que entender el ritmo y pronunciación.',
        hy: '«Su caballo era de oro.» (Նրա ձին ոսկուց էր։)\nԲառերն առանձին հաշվելիս՝ Su / ca / ba / llo / e / ra / de / o / ro = 9\nԱյստեղ իրականում 9 սովորական վանկ է, և երկու սինալեֆա կիրառելու դեպքում կստացվի 7, ոչ թե 8։ Հետևաբար միայն ձայնավորներ տեսնելը բավարար չէ․ պետք է հասկանալ տվյալ տողի արտասանությունն ու համատեքստը։'
      },
      {
        id: '1-11-ex2',
        type: 'example',
        es: '«La niña mira a la estrella.»\n• Sin uniones: La / ni / ña / mi / ra / a / la / es / tre / lla = 10\n• Con dos sinalefas: La / ni / ña / mi / ra_a / la_es / tre / lla = 8\nAunque aparecen diez sílabas al contar cada palabra por separado, el verso es octosílabo porque tiene ocho sílabas métricas.',
        hy: 'Իսկ հստակ ութվանկանի օրինակ՝ «La niña mira a la estrella.» (Աղջիկը նայում է աստղին։)\n• Առանց միավորումների՝ La / ni / ña / mi / ra / a / la / es / tre / lla = 10\n• Երկու սինալեֆայով՝ La / ni / ña / mi / ra_a / la_es / tre / lla = 8\nԹեև բառերն առանձին հաշվելիս ստացվում է տասը վանկ, տողը ութվանկանի է, քանի որ ունի ութ տաղաչափական վանկ։'
      },
      {
        id: '1-11-whatif',
        type: 'paragraph',
        es: '¿Y si siguen siendo nueve o diez? Entonces ese verso es eneasílabo o decasílabo, no octosílabo. No encaja en el modelo regular del romance octosílabo. Sin embargo, algunos romances tradicionales presentan irregularidades y los autores modernos pueden introducir variaciones.',
        hy: 'Իսկ եթե վերջնական հաշվարկով մնում է ինը կամ տասը՞ Այդ դեպքում տվյալ տողը իննավանկանի կամ տասնավանկանի է, ոչ թե ութվանկանի։ Այն չի համապատասխանում ութվանկանի ռոմանսի կանոնավոր չափին։ Սակայն որոշ ավանդական ռոմանսներում կան անկանոնություններ, իսկ ժամանակակից հեղինակները կարող են փոփոխություններ կատարել։'
      },
      {
        id: '1-11-rule',
        type: 'key-rule',
        es: 'Para un examen escolar: romance tradicional = versos octosílabos + asonancia en los pares + impares sueltos.',
        hy: 'Դպրոցական քննության հիմնական կանոնը՝ ավանդական ռոմանս = ութվանկանի տողեր + ձայնավորային հանգ զույգ տողերում + անհանգ կենտ տողեր։',
        sourceName: 'portal.uned.es',
        sourceUrl: 'https://portal.uned.es'
      }
    ]
  },
  {
    id: 'sec-1-12',
    part: 1,
    sectionNumber: 12,
    category: 'examples',
    titleEs: '12. Ejemplo completo analizado',
    titleHy: '12. Ամբողջական վերլուծված օրինակ',
    summaryEs: 'Análisis verso a verso de «Por el valle va la niña...», métrica 8– 8a y rima asonante en casa / agua.',
    summaryHy: '«Por el valle va la niña...» բանաստեղծության տող առ տող վերլուծությունը, 8– 8a սխեման և casa / agua ձայնավորային հանգը։',
    blocks: [
      {
        id: '1-12-poem',
        type: 'quote',
        es: 'Por el valle va la niña,\nlleva flores a su casa;\nun jilguero canta cerca,\nmientras ella cruza el agua.',
        hy: 'Հովտով գնում է աղջիկը,\nծաղիկներ է տանում իր տուն,\nմոտակայքում երգում է սերինոսը,\nմինչ նա անցնում է ջրի միջով։'
      },
      {
        id: '1-12-t1',
        type: 'table',
        es: 'Tabla del análisis métrico del romance analizado.',
        hy: 'Վերլուծված ռոմանսի տաղաչափական աղյուսակը։',
        table: {
          headers: [
            { es: 'Verso', hy: 'Տող' },
            { es: 'División métrica', hy: 'Տաղաչափական բաժանում' },
            { es: 'Número', hy: 'Վանկերի թիվ' },
            { es: 'Rima', hy: 'Հանգ' }
          ],
          rows: [
            {
              cells: [
                { es: 'Por el valle va la niña', hy: 'Por el valle va la niña' },
                { es: 'Por / el / va / lle / va / la / ni / ña', hy: 'Por / el / va / lle / va / la / ni / ña' },
                { es: '8', hy: '8' },
                { es: '–', hy: '–' }
              ]
            },
            {
              cells: [
                { es: 'lleva flores a su casa', hy: 'lleva flores a su casa' },
                { es: 'lle / va / flo / res / a / su / ca / sa', hy: 'lle / va / flo / res / a / su / ca / sa' },
                { es: '8', hy: '8' },
                { es: 'a', hy: 'a' }
              ]
            },
            {
              cells: [
                { es: 'un jilguero canta cerca', hy: 'un jilguero canta cerca' },
                { es: 'un / jil / gue / ro / can / ta / cer / ca', hy: 'un / jil / gue / ro / can / ta / cer / ca' },
                { es: '8', hy: '8' },
                { es: '–', hy: '–' }
              ]
            },
            {
              cells: [
                { es: 'mientras ella cruza el agua', hy: 'mientras ella cruza el agua' },
                { es: 'mien / tras / e / lla / cru / za_el / a / gua', hy: 'mien / tras / e / lla / cru / za_el / a / gua' },
                { es: '8', hy: '8' },
                { es: 'a', hy: 'a' }
              ]
            }
          ]
        }
      },
      {
        id: '1-12-p1',
        type: 'paragraph',
        es: 'Los versos 2 y 4 terminan en casa / agua, con asonancia a–a. La «u» de agua es la vocal débil del diptongo y no se toma como una vocal adicional en esta asonancia. Los versos 1 y 3 quedan sueltos. Esquema: 8– / 8a / 8– / 8a.',
        hy: '2-րդ և 4-րդ տողերի վերջին բառերն են casa / agua, որոնց ձայնավորային հանգը a–a է։ «Agua» բառի «u»-ն երկբարբառի թույլ ձայնավորն է և այս հանգի հաշվարկում առանձին լրացուցիչ ձայնավոր չի համարվում։ 1-ին և 3-րդ տողերը անհանգ են։ Սխեմա՝ 8– / 8a / 8– / 8a։'
      }
    ]
  },
  {
    id: 'sec-1-13',
    part: 1,
    sectionNumber: 13,
    category: 'themes',
    titleEs: '13. Origen y transmisión',
    titleHy: '13. Ծագումը և տարածումը',
    summaryEs: 'Edad Media, tradición oral y relación histórica con los cantares de gesta.',
    summaryHy: 'Միջնադար, բանավոր ավանդույթ և պատմական կապը հերոսական վիպերգերի (cantares de gesta) հետ։',
    blocks: [
      {
        id: '1-13-p1',
        type: 'paragraph',
        es: 'El romance tradicional está vinculado a la Edad Media y a la transmisión oral. Se recitaba o cantaba, y podía pasar de una generación a otra. Por eso un mismo romance puede conservarse en versiones diferentes.',
        hy: 'Ավանդական ռոմանսը կապված է միջնադարի և բանավոր փոխանցման հետ։ Այն արտասանում կամ երգում էին և փոխանցում սերնդեսերունդ։ Այդ պատճառով նույն ռոմանսը կարող է պահպանված լինել տարբեր տարբերակներով։'
      },
      {
        id: '1-13-p2',
        type: 'paragraph',
        es: 'Una explicación tradicional relaciona muchos romances con los cantares de gesta: los versos largos, divididos en dos partes, habrían dado lugar a versos más breves. No debe entenderse que todos los romances procedan necesariamente de un cantar de gesta.',
        hy: 'Ավանդական բացատրություններից մեկը շատ ռոմանսների ծագումը կապում է հերոսական վիպերգերի հետ․ երկար տողերի երկու մասերից առաջացել են ավելի կարճ տողեր։ Բայց դա չի նշանակում, որ բոլոր ռոմանսները պարտադիր առաջացել են վիպերգերից։',
        sourceName: 'ceiploreto.es',
        sourceUrl: 'https://ceiploreto.es'
      }
    ]
  },
  {
    id: 'sec-1-14',
    part: 1,
    sectionNumber: 14,
    category: 'themes',
    titleEs: '14. Romancero viejo y romancero nuevo',
    titleHy: '14. Հին և նոր ռոմանսների ժողովածուներ',
    summaryEs: 'Romancero viejo (anónimo, medieval) vs Romancero nuevo (autores cultos, s. XVI en adelante).',
    summaryHy: 'Romancero viejo (անանուն, միջնադարյան) և Romancero nuevo (հայտնի հեղինակներ, XVI դարից սկսած)։',
    blocks: [
      {
        id: '1-14-def',
        type: 'key-rule',
        es: '«Romancero» es un conjunto de romances.',
        hy: '«Romancero» նշանակում է ռոմանսների ամբողջություն կամ ժողովածու։'
      },
      {
        id: '1-14-t1',
        type: 'table',
        es: 'Comparación entre Romancero viejo y Romancero nuevo.',
        hy: 'Համեմատություն Romancero viejo-ի և Romancero nuevo-ի միջև։',
        table: {
          headers: [
            { es: 'Tipo', hy: 'Տեսակ' },
            { es: 'Español', hy: 'Իսպաներեն' },
            { es: 'Հայերեն', hy: 'Հայերեն' }
          ],
          rows: [
            {
              cells: [
                { es: 'Romancero viejo', hy: 'Romancero viejo (Հին)' },
                { es: 'Romances de tradición medieval, generalmente anónimos y transmitidos oralmente.', hy: 'Միջնադարյան ավանդույթի ռոմանսներ, որոնք սովորաբար անանուն են և փոխանցվել են բանավոր։' },
                { es: 'Միջնադարյան ավանդույթի ռոմանսներ, որոնք սովորաբար անանուն են և փոխանցվել են բանավոր։', hy: 'Միջնադարյան ավանդույթի ռոմանսներ, որոնք սովորաբար անանուն են և փոխանցվել են բանավոր։' }
              ]
            },
            {
              cells: [
                { es: 'Romancero nuevo', hy: 'Romancero nuevo (Նոր)' },
                { es: 'Romances compuestos por autores conocidos, especialmente desde finales del siglo XVI, que recrean la forma tradicional.', hy: 'Հայտնի հեղինակների ստեղծած ռոմանսներ՝ հատկապես XVI դարի վերջից սկսած, որոնք վերամշակում են ավանդական ձևը։' },
                { es: 'Հայտնի հեղինակների ստեղծած ռոմանսներ՝ հատկապես XVI դարի վերջից սկսած, որոնք վերամշակում են ավանդական ձևը։', hy: 'Հայտնի հեղինակների ստեղծած ռոմանսներ՝ հատկապես XVI դարի վերջից սկսած, որոնք վերամշակում են ավանդական ձևը։' }
              ]
            }
          ]
        }
      },
      {
        id: '1-14-p1',
        type: 'paragraph',
        es: 'La forma del romance siguió utilizándose después: no es exclusiva de la Edad Media.',
        hy: 'Ռոմանսի ձևը շարունակել են օգտագործել նաև հետագա դարերում․ այն միայն միջնադարին չի պատկանում։'
      }
    ]
  },
  {
    id: 'sec-1-15',
    part: 1,
    sectionNumber: 15,
    category: 'themes',
    titleEs: '15. Temas del romance',
    titleHy: '15. Ռոմանսի թեմաները',
    summaryEs: 'Históricos, épicos, fronterizos, amorosos, novelescos y líricos.',
    summaryHy: 'Պատմական, հերոսական, սահմանային, սիրային, վիպական և քնարական թեմաներ։',
    blocks: [
      {
        id: '1-15-note',
        type: 'callout',
        es: 'Un romance no tiene que hablar necesariamente de amor. Puede tratar muchos temas.',
        hy: 'Ռոմանսը պարտադիր չէ, որ սիրո մասին լինի։ Այն կարող է ունենալ տարբեր թեմաներ։'
      },
      {
        id: '1-15-t1',
        type: 'table',
        es: 'Principales temas del romance tradicional y nuevo.',
        hy: 'Ռոմանսի հիմնական թեմաները։',
        table: {
          headers: [
            { es: 'Tema', hy: 'Թեմա' },
            { es: 'Descripción en español', hy: 'Բացատրություն' }
          ],
          rows: [
            {
              cells: [
                { es: 'Históricos', hy: 'Históricos (Պատմական)' },
                { es: 'Acontecimientos y personajes históricos reales.', hy: 'Պատմական իրադարձություններ և անձեր։' }
              ]
            },
            {
              cells: [
                { es: 'Épicos o heroicos', hy: 'Épicos o heroicos (Հերոսական)' },
                { es: 'Héroes legendarios, hazañas y conflictos bélicos.', hy: 'Հերոսներ, սխրանքներ և հակամարտություններ։' }
              ]
            },
            {
              cells: [
                { es: 'Fronterizos', hy: 'Fronterizos (Սահմանային)' },
                { es: 'Relatos de la frontera y choques entre reinos cristianos y musulmanes.', hy: 'Սահմանային կյանքի և քրիստոնեական ու մուսուլմանական թագավորությունների բախումների պատմություններ։' }
              ]
            },
            {
              cells: [
                { es: 'Amorosos', hy: 'Amorosos (Սիրային)' },
                { es: 'Amor, despedida, celos y nostalgia.', hy: 'Սեր, բաժանում, խանդ, կարոտ։' }
              ]
            },
            {
              cells: [
                { es: 'Novelescos y legendarios', hy: 'Novelescos y legendarios (Վիպական/առասպելական)' },
                { es: 'Aventuras imaginarias, misterios y leyendas.', hy: 'Հորինված արկածներ, առեղծվածներ և լեգենդներ։' }
              ]
            },
            {
              cells: [
                { es: 'Líricos', hy: 'Líricos (Քնարական)' },
                { es: 'Sentimientos y emociones que predominan sobre la acción externa.', hy: 'Զգացմունքներ, որոնք կարող են գերակշռել գործողության նկատմամբ։' }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'sec-1-16',
    part: 1,
    sectionNumber: 16,
    category: 'themes',
    titleEs: '16. Rasgos narrativos y de estilo',
    titleHy: '16. Պատմողական և ոճական հատկանիշներ',
    summaryEs: 'In medias res, final abierto, fragmentarismo, diálogo, repeticiones y lenguaje expresivo.',
    summaryHy: 'In medias res (կեսից սկսվել), բաց ավարտ, հատվածայնություն, երկխոսություն, կրկնություններ և արտահայտիչ լեզու։',
    blocks: [
      {
        id: '1-16-intro',
        type: 'paragraph',
        es: 'Estos son rasgos frecuentes en el romance, pero no es obligatorio que aparezcan todos en cada composición.',
        hy: 'Սրանք հաճախ հանդիպող հատկանիշներ են, բայց պարտադիր չէ, որ բոլորը լինեն յուրաքանչյուր ռոմանսում։'
      },
      {
        id: '1-16-a',
        type: 'example',
        es: 'A. Comienzo «in medias res»\nLa historia puede empezar cuando la acción ya está en marcha, sin explicar todos los antecedentes.',
        hy: 'A. Սկիզբ՝ գործողության կեսից («in medias res»)\nՊատմությունը կարող է սկսվել այն պահին, երբ գործողությունն արդեն ընթանում է՝ առանց նախորդ իրադարձությունները մանրամասն բացատրելու։'
      },
      {
        id: '1-16-b',
        type: 'example',
        es: 'B. Final abierto o abrupto\nAlgunos romances terminan sin resolver completamente la historia.',
        hy: 'B. Բաց կամ կտրուկ ավարտ\nՈրոշ ռոմանսներ ավարտվում են՝ պատմության լուծումը ամբողջությամբ չբացահայտելով։'
      },
      {
        id: '1-16-c',
        type: 'example',
        es: 'C. Fragmentarismo\nSe presenta un episodio intenso en lugar de desarrollar toda una historia desde el principio hasta el final.',
        hy: 'C. Հատվածայնություն\nԱմբողջ պատմությունը սկզբից մինչև վերջ ներկայացնելու փոխարեն ցուցադրվում է մի կարևոր կամ լարված դրվագ։'
      },
      {
        id: '1-16-d',
        type: 'example',
        es: 'D. Diálogo y dramatismo\nLos personajes pueden hablar directamente. El diálogo hace la escena más viva.',
        hy: 'D. Երկխոսություն և դրամատիզմ\nԿերպարները կարող են անմիջապես խոսել։ Երկխոսությունը տեսարանը դարձնում է ավելի կենդանի։'
      },
      {
        id: '1-16-e',
        type: 'example',
        es: 'E. Repeticiones y paralelismos\nSe repiten palabras o estructuras para crear ritmo, destacar ideas y facilitar la memorización.',
        hy: 'E. Կրկնություններ և զուգահեռ կառուցվածքներ\nԲառերի կամ կառույցների կրկնությունը ստեղծում է ռիթմ, ընդգծում մտքերը և հեշտացնում մտապահումը։'
      },
      {
        id: '1-16-f',
        type: 'example',
        es: 'F. Lenguaje expresivo\nPueden aparecer exclamaciones, preguntas, metáforas, personificaciones e hipérboles.',
        hy: 'F. Արտահայտիչ լեզու\nԿարող են հանդիպել բացականչություններ, հարցեր, փոխաբերություններ, անձնավորումներ և չափազանցություններ։'
      }
    ]
  },
  {
    id: 'sec-1-17',
    part: 1,
    sectionNumber: 17,
    category: 'meter',
    titleEs: '17. Variantes relacionadas',
    titleHy: '17. Հարակից տեսակները',
    summaryEs: 'Romance (8), Romancillo (≤6), Endecha (7), Romance heroico (11).',
    summaryHy: 'Ռոմանս (8 վանկ), Romancillo (6 վանկ), Endecha (7 վանկ), Romance heroico (11 վանկ)։',
    blocks: [
      {
        id: '1-17-intro',
        type: 'paragraph',
        es: 'Existen composiciones que conservan la organización de la rima del romance, pero utilizan otra medida métrica.',
        hy: 'Կան ստեղծագործություններ, որոնք պահպանում են ռոմանսի հանգավորման կառուցվածքը, բայց օգտագործում են այլ վանկաչափ։'
      },
      {
        id: '1-17-t1',
        type: 'table',
        es: 'Variantes de la estrofa y metro del romance.',
        hy: 'Ռոմանսի հարակից տեսակների աղյուսակը։',
        table: {
          headers: [
            { es: 'Forma', hy: 'Տեսակ' },
            { es: 'Medida habitual', hy: 'Իսպաներեն չափ' },
            { es: 'Սովորական վանկաչափ', hy: 'Հայերեն վանկաչափ' }
          ],
          rows: [
            {
              cells: [
                { es: 'Romance', hy: 'Romance (Դասական ռոմանս)' },
                { es: 'Octosílabos', hy: 'Octosílabos' },
                { es: '8 վանկ', hy: '8 վանկ' }
              ]
            },
            {
              cells: [
                { es: 'Romancillo', hy: 'Romancillo' },
                { es: 'Versos muy breves, frecuentemente hexasílabos', hy: 'Շատ կարճ տողեր, հաճախ հեքսասիլաբոս (6)' },
                { es: 'Հաճախ 6 վանկ կամ ավելի կարճ տողեր', hy: 'Հաճախ 6 վանկ կամ ավելի կարճ տողեր' }
              ]
            },
            {
              cells: [
                { es: 'Endecha, como variante métrica', hy: 'Endecha (Էնդեչա)' },
                { es: 'Heptasílabos', hy: 'Heptasílabos' },
                { es: '7 վանկ', hy: '7 վանկ' }
              ]
            },
            {
              cells: [
                { es: 'Romance heroico', hy: 'Romance heroico (Հերոսական ռոմանս)' },
                { es: 'Endecasílabos', hy: 'Endecasílabos' },
                { es: '11 վանկ', hy: '11 վանկ' }
              ]
            }
          ]
        }
      },
      {
        id: '1-17-note',
        type: 'paragraph',
        es: 'La terminología de las variantes breves puede variar entre manuales. Un poema de nueve o diez sílabas no recibe automáticamente uno de estos nombres.',
        hy: 'Կարճ տողերով տարբերակների անվանումները որոշ դասագրքերում կարող են տարբերվել։ Իննավանկանի կամ տասնավանկանի բանաստեղծությունը ինքնաբերաբար չի ստանում այս անուններից որևէ մեկը։',
        sourceName: 'cervantesvirtual.com',
        sourceUrl: 'https://www.cervantesvirtual.com'
      }
    ]
  },
  {
    id: 'sec-1-18',
    part: 1,
    sectionNumber: 18,
    category: 'exam',
    titleEs: '18. ¿Cómo justificar que un poema es un romance?',
    titleHy: '18. Ինչպե՞ս հիմնավորել, որ բանաստեղծությունը ռոմանս է',
    summaryEs: 'Los 4 pasos de comprobación y respuesta modelo para el examen escolar.',
    summaryHy: 'Ստուգման 4 քայլերը և քննական պատրաստի պատասխանի մոդելը։',
    blocks: [
      {
        id: '1-18-steps',
        type: 'example',
        es: 'En el examen comprueba primero:\n1. La medida: ¿los versos tienen ocho sílabas métricas?\n2. La rima: ¿los versos pares comparten rima asonante?\n3. Los impares: ¿quedan sueltos?\n4. La organización: ¿es una serie sin un número fijo de versos?',
        hy: 'Քննության ժամանակ նախ ստուգիր՝\n1. Չափը․ տողերն ունե՞ն ութ տաղաչափական վանկ։\n2. Հանգը․ զույգ տողերն ունե՞ն ընդհանուր ձայնավորային հանգ։\n3. Կենտ տողերը․ անհա՞նգ են։\n4. Կառուցվածքը․ տողերի թիվը հաստատուն սահմանափակում չունի՞։'
      },
      {
        id: '1-18-ready',
        type: 'callout',
        es: 'Respuesta modelo para examen: «Este poema es un romance porque está compuesto por versos octosílabos, presenta rima asonante en los versos pares y deja sueltos los impares. Su esquema métrico es 8–, 8a, 8–, 8a… Además, tiene carácter narrativo.»',
        hy: 'Պատրաստի պատասխան քննության համար՝ «Այս բանաստեղծությունը ռոմանս է, որովհետև կազմված է ութվանկանի տողերից, զույգ տողերն ունեն ձայնավորային հանգ, իսկ կենտ տողերն անհանգ են։ Դրա տաղաչափական սխեման է՝ 8–, 8a, 8–, 8a… Բացի այդ, այն ունի պատմողական բնույթ։»'
      },
      {
        id: '1-18-golden',
        type: 'key-rule',
        es: 'Regla de oro: «el ocho» indica la medida métrica del verso; «la letra a» indica la rima.',
        hy: 'Հիշելու ամենակարևոր կանոնը՝ «ութը» տողի վանկերի թիվն է, իսկ «a»-ն՝ հանգի նշանը։'
      }
    ]
  },

  // ================= PART 2: DEEP DIVE =================
  {
    id: 'sec-2-1',
    part: 2,
    sectionNumber: 1,
    category: 'meter',
    titleEs: '1. «8a» y «8–» no significan lo mismo',
    titleHy: '1. «8a»-ն և «8–»-ը նույնը չեն',
    summaryEs: 'Diferencia precisa entre verso con rima asonante (8a) y verso suelto (8–).',
    summaryHy: 'Ճշգրիտ տարբերությունը հանգավորված (8a) և անհանգ (8–) տողերի միջև։',
    blocks: [
      {
        id: '2-1-p1',
        type: 'paragraph',
        es: '«8a» indica dos cosas:\n• 8: el verso tiene ocho sílabas métricas.\n• a: ese verso comparte una rima con otros versos marcados con la misma letra.',
        hy: '«8a» նշումը ցույց է տալիս երկու բան․\n• 8․ տողն ունի ութ տաղաչափական վանկ։\n• a․ տողի հանգը համընկնում է նույն տառով նշված մյուս տողերի հանգին։'
      },
      {
        id: '2-1-p2',
        type: 'paragraph',
        es: '«8–» significa que el verso tiene ocho sílabas métricas, pero queda suelto: no participa en la rima regular del poema.',
        hy: '«8–» նշանակում է, որ տողն ունի ութ տաղաչափական վանկ, բայց անհանգ է՝ չի մասնակցում բանաստեղծության կանոնավոր հանգավորմանը։'
      },
      {
        id: '2-1-key',
        type: 'key-rule',
        es: 'El número indica la medida; la letra indica la rima.',
        hy: 'Թիվը ցույց է տալիս վանկաչափը, իսկ տառը՝ հանգը։'
      }
    ]
  },
  {
    id: 'sec-2-2',
    part: 2,
    sectionNumber: 2,
    category: 'rhyme',
    titleEs: '2. ¿Por qué se repite siempre «a»?',
    titleHy: '2. Ինչո՞ւ է անընդհատ կրկնվում «a»-ն',
    summaryEs: 'Por qué en el romance tradicional se mantiene la misma asonancia en todos los versos pares.',
    summaryHy: 'Ինչու է ավանդական ռոմանսում նույն ձայնավորային հանգը պահպանվում բոլոր զույգ տողերում։',
    blocks: [
      {
        id: '2-2-p1',
        type: 'paragraph',
        es: 'En un romance tradicional, los versos pares mantienen la misma rima asonante. Por eso se utiliza siempre la misma letra: 8– / 8a / 8– / 8a / 8– / 8a',
        hy: 'Ավանդական ռոմանսում զույգ տողերի ձայնավորային հանգը նույնն է։ Դրա համար օգտագործվում է նույն տառը՝ a (8– / 8a / 8– / 8a / 8– / 8a)։'
      },
      {
        id: '2-2-t1',
        type: 'table',
        es: 'Ejemplo de palabras finales de versos pares con asonancia constante a–a.',
        hy: 'Զույգ տողերի վերջին բառերի օրինակ՝ անփոփոխ a–a հանգով։',
        table: {
          headers: [
            { es: 'Verso', hy: 'Տող' },
            { es: 'Palabra final', hy: 'Վերջին բառ' },
            { es: 'Asonancia', hy: 'Ձայնավորային հանգ' }
          ],
          rows: [
            { cells: [{ es: '2', hy: '2' }, { es: 'ventana', hy: 'ventana' }, { es: 'a–a', hy: 'a–a' }] },
            { cells: [{ es: '4', hy: '4' }, { es: 'rama', hy: 'rama' }, { es: 'a–a', hy: 'a–a' }] },
            { cells: [{ es: '6', hy: '6' }, { es: 'casa', hy: 'casa' }, { es: 'a–a', hy: 'a–a' }] },
            { cells: [{ es: '8', hy: '8' }, { es: 'mañana', hy: 'mañana' }, { es: 'a–a', hy: 'a–a' }] }
          ]
        }
      },
      {
        id: '2-2-p2',
        type: 'paragraph',
        es: 'Si apareciera otra rima independiente, se marcaría con otra letra, por ejemplo, «b». Sin embargo, alternar varias rimas no es el esquema básico del romance tradicional.',
        hy: 'Եթե հայտնվեր այլ անկախ հանգ, այն կնշվեր ուրիշ տառով, օրինակ՝ b։ Սակայն տարբեր հանգերի հերթագայությունը ավանդական ռոմանսի հիմնական սխեման չէ։'
      }
    ]
  },
  {
    id: 'sec-2-3',
    part: 2,
    sectionNumber: 3,
    category: 'rhyme',
    titleEs: '3. ¿La letra «a» significa rima asonante?',
    titleHy: '3. «a»-ն նշանակո՞ւմ է ձայնավորային հանգ',
    summaryEs: 'No. «a» es solo una etiqueta que identifica una rima, no una abreviatura.',
    summaryHy: 'Ո՛չ։ «a»-ն asonante-ի հապավումը չէ, այլ որոշակի հանգի տաղաչափական նշան։',
    blocks: [
      {
        id: '2-3-ans',
        type: 'key-rule',
        es: 'No. La letra «a» no es una abreviatura de «asonante». Es una etiqueta que identifica una rima.',
        hy: 'Ո՛չ։ «a»-ն «asonante» բառի կրճատումը չէ։ Այն պարզապես նշում է որոշակի հանգ։'
      },
      {
        id: '2-3-p1',
        type: 'paragraph',
        es: 'Tanto una rima asonante como una consonante pueden representarse con «a». Para saber cuál es, debemos comparar los sonidos de las palabras finales:\n• casa / rama → asonante (coinciden a–a)\n• casa / pasa → consonante (coincide -asa)',
        hy: '«a» տառով կարելի է նշել և՛ ձայնավորային, և՛ լրիվ հանգ։ Տեսակը որոշելու համար պետք է համեմատել տողերի վերջին բառերի հնչյունները՝\n• casa / rama → asonante, համընկնում են a–a ձայնավորները։\n• casa / pasa → consonante, համընկնում է -asa հնչյունային հատվածը։'
      },
      {
        id: '2-3-rule',
        type: 'callout',
        es: 'La letra señala qué versos riman; no explica por sí sola cómo riman.',
        hy: 'Տառը ցույց է տալիս՝ որ տողերն են հանգավորվում, բայց ինքնուրույն չի ցույց տալիս հանգի տեսակը։'
      }
    ]
  },
  {
    id: 'sec-2-4',
    part: 2,
    sectionNumber: 4,
    category: 'meter',
    titleEs: '4. ¿Por qué «a» minúscula y no «A» mayúscula?',
    titleHy: '4. Ինչո՞ւ փոքրատառ «a», ոչ թե մեծատառ «A»',
    summaryEs: 'Minúscula para arte menor (≤8 sílabas), mayúscula para arte mayor (≥9 sílabas).',
    summaryHy: 'Փոքրատառը arte menor-ի (մինչև 8 վանկ), մեծատառը՝ arte mayor-ի (9 կամ ավելի) համար է։',
    blocks: [
      {
        id: '2-4-p1',
        type: 'paragraph',
        es: 'En el análisis métrico se utilizan normalmente:\n• Letras minúsculas: versos de arte menor, de hasta ocho sílabas.\n• Letras mayúsculas: versos de arte mayor, de nueve o más sílabas.',
        hy: 'Տաղաչափական վերլուծության մեջ սովորաբար օգտագործվում են՝\n• Փոքրատառեր․ մինչև ութ վանկ ունեցող տողերի համար (arte menor)։\n• Մեծատառեր․ ինը կամ ավելի վանկ ունեցող տողերի համար (arte mayor)։'
      },
      {
        id: '2-4-t1',
        type: 'table',
        es: 'Notación de rima en arte menor y arte mayor.',
        hy: 'Հանգի նշագրությունը arte menor և arte mayor խմբերում։',
        table: {
          headers: [
            { es: 'Notación', hy: 'Նշում' },
            { es: 'Significado', hy: 'Իմաստ' }
          ],
          rows: [
            { cells: [{ es: '7a', hy: '7a' }, { es: 'Verso heptasílabo con rima «a».', hy: 'Յոթվանկանի տող՝ «a» հանգով։' }] },
            { cells: [{ es: '8a', hy: '8a' }, { es: 'Verso octosílabo con rima «a».', hy: 'Ութվանկանի տող՝ «a» հանգով։' }] },
            { cells: [{ es: '9A', hy: '9A' }, { es: 'Verso eneasílabo con rima «A».', hy: 'Իննավանկանի տող՝ «A» հանգով։' }] },
            { cells: [{ es: '11A', hy: '11A' }, { es: 'Verso endecasílabo con rima «A».', hy: 'Տասնմեկվանկանի տող՝ «A» հանգով։' }] }
          ]
        }
      },
      {
        id: '2-4-warn',
        type: 'callout',
        es: 'La mayúscula no significa que la rima sea consonante, ni la minúscula que sea asonante.',
        hy: 'Մեծատառը չի նշանակում լրիվ հանգ, իսկ փոքրատառը՝ ձայնավորային հանգ։'
      }
    ]
  },
  {
    id: 'sec-2-5',
    part: 2,
    sectionNumber: 5,
    category: 'basics',
    titleEs: '5. Verso suelto y verso libre',
    titleHy: '5. Անհանգ տող և ազատ տող',
    summaryEs: 'Verso suelto (tiene medida fija pero no rima) vs verso libre (sin medida ni rima fijas).',
    summaryHy: 'Անհանգ տող (ունի կանոնավոր վանկաչափ, բայց չի հանգավորվում) և ազատ տող (չունի ֆիքսված չափ ու հանգ)։',
    blocks: [
      {
        id: '2-5-suelto',
        type: 'paragraph',
        es: 'Verso suelto: no rima dentro de una composición que sí presenta una organización métrica y una rima en otros versos. En el romance, los versos impares son sueltos, pero conservan las ocho sílabas.',
        hy: 'Անհանգ տող․ չի հանգավորվում այն ստեղծագործության ներսում, որտեղ մյուս տողերն ունեն որոշակի հանգավորում և չափ։ Ռոմանսում կենտ տողերն անհանգ են, բայց շարունակում են ունենալ ութ վանկ։'
      },
      {
        id: '2-5-libre',
        type: 'paragraph',
        es: 'Verso libre: no sigue un esquema regular obligatorio de medida y rima.',
        hy: 'Ազատ տող․ չի ենթարկվում վանկաչափի և հանգավորման պարտադիր կանոնավոր սխեմայի։'
      },
      {
        id: '2-5-key',
        type: 'key-rule',
        es: 'Los versos impares del romance son sueltos, no versos libres.',
        hy: 'Ռոմանսի կենտ տողերն անհանգ են, բայց ազատ տողեր չեն։'
      }
    ]
  },
  {
    id: 'sec-2-6',
    part: 2,
    sectionNumber: 6,
    category: 'rhyme',
    titleEs: '6. ¿Desde dónde buscamos la rima?',
    titleHy: '6. Որտեղի՞ց ենք որոշում հանգը',
    summaryEs: 'Desde la última vocal tónica hasta el final (camino / suspiro → i-o, no solo la última letra).',
    summaryHy: 'Հանգը որոշվում է վերջին շեշտված ձայնավորից սկսած (camino / suspiro → i-o)։',
    blocks: [
      {
        id: '2-6-p1',
        type: 'paragraph',
        es: 'Buscamos la última palabra del verso, localizamos su vocal tónica y observamos los sonidos desde esa vocal hasta el final.',
        hy: 'Վերցնում ենք տողի վերջին բառը, գտնում շեշտված ձայնավորը և ուսումնասիրում այդ ձայնավորից մինչև բառի վերջը։'
      },
      {
        id: '2-6-ex1',
        type: 'example',
        es: 'camino → ca–MI–no → i–o\nsuspiro → sus–PI–ro → i–o\n«Camino» y «suspiro» tienen rima asonante en i–o.',
        hy: 'camino → ca–MI–no → i–o\nsuspiro → sus–PI–ro → i–o\n«Camino» և «suspiro» բառերն ունեն i–o ձայնավորային հանգ։'
      },
      {
        id: '2-6-ex2',
        type: 'example',
        es: 'mesa → e–a\ncasa → a–a\nNo tienen la misma asonancia, aunque las dos palabras terminen en «a».',
        hy: 'mesa → e–a\ncasa → a–a\nԴրանք չունեն նույն ձայնավորային հանգը, թեև երկուսն էլ ավարտվում են «a»-ով։'
      }
    ]
  },
  {
    id: 'sec-2-7',
    part: 2,
    sectionNumber: 7,
    category: 'rhyme',
    titleEs: '7. ¿Qué ocurre si la palabra final es aguda?',
    titleHy: '7. Ի՞նչ է լինում, երբ վերջին բառը aguda է',
    summaryEs: 'Una sola vocal en la asonancia (mar, soledad, cantar en «a») y suma de +1 al verso.',
    summaryHy: 'Մեկ ձայնավոր հանգում (mar, soledad, cantar) և +1 ավելացում տաղաչափական հաշվարկին։',
    blocks: [
      {
        id: '2-7-p1',
        type: 'paragraph',
        es: 'En una palabra aguda, la vocal tónica está en la última sílaba. Por eso, en la rima asonante puede bastar una sola vocal:\nmar — soledad — cantar\nComparten asonancia en «a». Las consonantes finales no cuentan para la rima asonante.',
        hy: '«Aguda» բառի շեշտը վերջին վանկի վրա է։ Այդ պատճառով ձայնավորային հանգի մեջ կարող է մասնակցել միայն մեկ ձայնավոր՝\nmar — soledad — cantar\nԴրանք ունեն ընդհանուր «a» ձայնավորային հանգ։ Վերջի բաղաձայնները ձայնավորային հանգի որոշման մեջ հաշվի չեն առնվում։'
      },
      {
        id: '2-7-p2',
        type: 'paragraph',
        es: 'Además, si el verso termina en cualquiera de estas palabras agudas, se suma una sílaba (+1) al cómputo métrico.',
        hy: 'Բացի այդ, եթե տողն ավարտվում է այսպիսի վերջին վանկի շեշտ ունեցող բառով, տաղաչափական հաշվարկին ավելացնում ենք մեկ վանկ։'
      },
      {
        id: '2-7-key',
        type: 'key-rule',
        es: 'Son dos operaciones diferentes: identificar la rima y contar las sílabas.',
        hy: 'Սրանք երկու տարբեր գործողություններ են՝ որոշել հանգը և հաշվել վանկերը։'
      }
    ]
  },
  {
    id: 'sec-2-8',
    part: 2,
    sectionNumber: 8,
    category: 'meter',
    titleEs: '8. La sinalefa no depende de la escritura',
    titleHy: '8. Սինալեֆան կախված չէ միայն գրությունից',
    summaryEs: 'Depende de los sonidos reales: «mi amigo» (3), «la hija» (2 con h muda), «las olas» (no hay sinalefa).',
    summaryHy: 'Կախված է հնչյուններից՝ «mi amigo» (3), «la hija» (2), իսկ «las olas»՝ սինալեֆա չկա (s-ով ավարտ)։',
    blocks: [
      {
        id: '2-8-p1',
        type: 'paragraph',
        es: 'Para reconocer una sinalefa debemos fijarnos en los sonidos.',
        hy: 'Սինալեֆան ճանաչելու համար պետք է ուշադրություն դարձնել հնչյուններին։'
      },
      {
        id: '2-8-ex1',
        type: 'example',
        es: 'Ejemplo 1: «Mi amigo»\nmi_a / mi / go → 3 sílabas métricas (en lugar de mi / a / mi / go = 4).',
        hy: 'Օրինակ 1՝ «Mi amigo»\nmi_a / mi / go → 3 տաղաչափական վանկ (առանձին՝ mi / a / mi / go՝ 4 վանկ)։'
      },
      {
        id: '2-8-ex2',
        type: 'example',
        es: 'Ejemplo 2: «La hija»\nla_hi / ja → 2 sílabas métricas («h» muda no impide la unión).',
        hy: 'Օրինակ 2՝ «La hija»\nla_hi / ja → 2 տաղաչափական վանկ («h»-ն չի արտասանվում, ուստի չի խանգարում)։'
      },
      {
        id: '2-8-ex3',
        type: 'example',
        es: 'Ejemplo 3: «Las olas»\nlas / o / las → 3 sílabas (no hay sinalefa porque «las» termina en sonido consonántico /s/).',
        hy: 'Օրինակ 3՝ «Las olas»\nlas / o / las → 3 վանկ (սինալեֆա չկա, որովհետև «las»-ը ավարտվում է /ս/ բաղաձայնով)։'
      },
      {
        id: '2-8-warn',
        type: 'callout',
        es: 'No unimos palabras solo porque estén juntas.',
        hy: 'Բառերը չենք միավորում պարզապես այն պատճառով, որ իրար կողք են։'
      }
    ]
  },
  {
    id: 'sec-2-9',
    part: 2,
    sectionNumber: 9,
    category: 'meter',
    titleEs: '9. Sinalefa y acento final juntos',
    titleHy: '9. Սինալեֆան և վերջին բառի կանոնը միասին',
    summaryEs: 'Análisis paso a paso de «Una niña va al jardín» (8 − 1 + 1 = 8).',
    summaryHy: '«Una niña va al jardín» տողի քայլ առ քայլ վերլուծությունը (8 − 1 + 1 = 8)։',
    blocks: [
      {
        id: '2-9-verse',
        type: 'quote',
        es: '«Una niña va al jardín.»',
        hy: '«Una niña va al jardín.» (Մի աղջիկ գնում է պարտեզ։)'
      },
      {
        id: '2-9-steps',
        type: 'example',
        es: '• Paso 1. Separar las sílabas: U / na / ni / ña / va / al / jar / dín = 8\n• Paso 2. Aplicar la sinalefa: U / na / ni / ña / va_al / jar / dín = 7\n• Paso 3. Observar la palabra final: «jardín» es aguda (+1 sílaba)\nCómputo final: 7 + 1 = 8 sílabas métricas (verso octosílabo).',
        hy: '• Քայլ 1. Բաժանել վանկերի՝ U / na / ni / ña / va / al / jar / dín = 8\n• Քայլ 2. Կիրառել սինալեֆան՝ U / na / ni / ña / va_al / jar / dín = 7\n• Քայլ 3. Ստուգել վերջին բառը՝ «jardín»-ը aguda է (+1 վանկ)\nՎերջնական հաշվարկ՝ 7 + 1 = 8 տաղաչափական վանկ (ութվանկանի տող)։'
      },
      {
        id: '2-9-key',
        type: 'key-rule',
        es: 'La sinalefa resta una sílaba en este caso y el final agudo añade una.',
        hy: 'Այս դեպքում սինալեֆան պակասեցնում է մեկ վանկ, իսկ վերջին բառի շեշտի կանոնը՝ ավելացնում մեկ վանկ։'
      }
    ]
  },
  {
    id: 'sec-2-10',
    part: 2,
    sectionNumber: 10,
    category: 'basics',
    titleEs: '10. ¿Un romance siempre cuenta una historia de amor?',
    titleHy: '10. Ռոմանսը մի՞շտ է սիրո պատմություն',
    summaryEs: 'No confundir romance poético con historia romántica ni con Romanticismo.',
    summaryHy: 'Ռոմանս բանաստեղծական ձևը չշփոթել սիրային պատմության կամ Ռոմանտիզմի հետ։',
    blocks: [
      {
        id: '2-10-p1',
        type: 'paragraph',
        es: 'No. En literatura, «romance» es el nombre de una forma poética. Puede contar una batalla, una despedida, un encuentro misterioso, una traición o una historia de amor.',
        hy: 'Ո՛չ։ Գրականության մեջ «romance»-ը բանաստեղծական ձևի անուն է։ Այն կարող է պատմել ճակատամարտի, հրաժեշտի, առեղծվածային հանդիպման, դավաճանության կամ սիրո մասին։'
      },
      {
        id: '2-10-warn',
        type: 'callout',
        es: 'Tampoco debemos confundir «romance» con el «Romanticismo», un movimiento cultural y literario posterior.',
        hy: 'Պետք չէ նաև շփոթել «ռոմանսը» և «ռոմանտիզմը», որը հետագա մշակութային ու գրական ուղղություն է։'
      }
    ]
  },
  {
    id: 'sec-2-11',
    part: 2,
    sectionNumber: 11,
    category: 'themes',
    titleEs: '11. Narrador y personajes',
    titleHy: '11. Պատմողը և կերպարները',
    summaryEs: 'Narrador frente a personajes, estilo directo y dinamismo del diálogo.',
    summaryHy: 'Պատմողը ընդդեմ կերպարների, ուղղակի խոսք և երկխոսության կենդանություն։',
    blocks: [
      {
        id: '2-11-p1',
        type: 'paragraph',
        es: 'El narrador cuenta los hechos. Los personajes participan en la historia.',
        hy: 'Պատմողը ներկայացնում է դեպքերը, իսկ կերպարները մասնակցում են պատմությանը։'
      },
      {
        id: '2-11-ex',
        type: 'quote',
        es: 'La niña miró la puerta\ny preguntó: «¿Quién está?».',
        hy: 'Աղջիկը նայեց դռանը\nև հարցրեց․ «Ո՞վ է այնտեղ»։'
      },
      {
        id: '2-11-p2',
        type: 'paragraph',
        es: '• «La niña miró la puerta y preguntó…» → habla el narrador.\n• «¿Quién está?» → habla el personaje.\nCuando aparece la voz directa de un personaje, hay estilo directo. Si dos personajes intercambian palabras, hay diálogo.',
        hy: '• «La niña miró la puerta y preguntó…» → խոսում է պատմողը։\n• «¿Quién está?» → խոսում է կերպարը։\nԵրբ ներկայացվում են կերպարի անմիջական խոսքերը, դա ուղղակի խոսք է։ Երբ երկու կերպար խոսքեր են փոխանակում, առաջանում է երկխոսություն։'
      }
    ]
  },
  {
    id: 'sec-2-12',
    part: 2,
    sectionNumber: 12,
    category: 'themes',
    titleEs: '12. Tema y argumento',
    titleHy: '12. Թեման և բովանդակությունը',
    summaryEs: 'Diferencia entre tema (idea central sintetizada) y argumento (resumen de los hechos).',
    summaryHy: 'Տարբերությունը թեմայի (կարճ հիմնական գաղափար) և բովանդակության (դեպքերի ամփոփում) միջև։',
    blocks: [
      {
        id: '2-12-tema',
        type: 'paragraph',
        es: 'Tema: la idea central, expresada de forma breve. Ejemplo: «La tristeza de una despedida» (Հրաժեշտի տխրությունը)։',
        hy: 'Թեմա․ հիմնական գաղափարը՝ կարճ ձևակերպմամբ։ Օրինակ՝ «La tristeza de una despedida» (Հրաժեշտի տխրությունը)։'
      },
      {
        id: '2-12-arg',
        type: 'paragraph',
        es: 'Argumento: el resumen de lo que sucede. Ejemplo: Una joven espera a su hermano junto al camino, pero recibe la noticia de que no volverá.',
        hy: 'Բովանդակություն․ տեղի ունեցածի համառոտ ներկայացումը։ Օրինակ՝ Մի աղջիկ ճանապարհի մոտ սպասում է եղբորը, բայց լուր է ստանում, որ նա չի վերադառնալու։'
      },
      {
        id: '2-12-key',
        type: 'key-rule',
        es: 'El tema no es un resumen de todos los acontecimientos.',
        hy: 'Թեման բոլոր իրադարձությունների ամփոփումը չէ։'
      }
    ]
  },
  {
    id: 'sec-2-13',
    part: 2,
    sectionNumber: 13,
    category: 'themes',
    titleEs: '13. Repetición, anáfora y paralelismo',
    titleHy: '13. Կրկնություն, անաֆորա և զուգահեռություն',
    summaryEs: 'Recursos retóricos frecuentes para el ritmo y la memoria.',
    summaryHy: 'Հաճախակի հանդիպող հռետորական հնարքներ՝ ռիթմի և հիշողության համար։',
    blocks: [
      {
        id: '2-13-rep',
        type: 'example',
        es: 'Repetición: Se repite una palabra o expresión.\nEjemplo: «Lejos, muy lejos…»',
        hy: 'Կրկնություն (Repetición)․ Կրկնվում է բառ կամ արտահայտություն։\nՕրինակ՝ «Lejos, muy lejos…» (Հեռու, շատ հեռու…)։'
      },
      {
        id: '2-13-ana',
        type: 'example',
        es: 'Anáfora: Se repiten palabras al principio de varios versos o enunciados.\nNadie llama a su puerta.\nNadie escucha su voz.',
        hy: 'Անաֆորա (Anáfora)․ Մի քանի տողի կամ ասույթի սկզբում կրկնվում են նույն բառերը։\nNadie llama a su puerta. (Ոչ ոք չի թակում նրա դուռը։)\nNadie escucha su voz. (Ոչ ոք չի լսում նրա ձայնը։)'
      },
      {
        id: '2-13-par',
        type: 'example',
        es: 'Paralelismo: Se repite una estructura sintáctica semejante.\nLa niña mira la luna.\nEl niño mira la fuente.',
        hy: 'Զուգահեռ կառուցվածք (Paralelismo)․ Կրկնվում է նմանատիպ շարահյուսական կառուցվածք։\nLa niña mira la luna. (Աղջիկը նայում է լուսնին։)\nEl niño mira la fuente. (Տղան նայում է շատրվանին։)'
      },
      {
        id: '2-13-note',
        type: 'paragraph',
        es: 'Estos recursos no son obligatorios y también aparecen en otros tipos de poemas.',
        hy: 'Այս հնարքները պարտադիր չեն և հանդիպում են նաև այլ տեսակի բանաստեղծություններում։'
      }
    ]
  },
  {
    id: 'sec-2-14',
    part: 2,
    sectionNumber: 14,
    category: 'mistakes',
    titleEs: '14. Errores frecuentes',
    titleHy: '14. Հաճախակի սխալներ',
    summaryEs: 'Tabla completa de los 8 errores más habituales y sus correcciones precisas.',
    summaryHy: '8 ամենահաճախակի սխալ պատկերացումները և դրանց ճիշտ բացատրությունները։',
    blocks: [
      {
        id: '2-14-t1',
        type: 'table',
        es: 'Errores frecuentes en los exámenes sobre el romance y sus correcciones.',
        hy: 'Քննությունների ժամանակ թույլ տրվող հաճախակի սխալները և ճիշտ պատասխանները։',
        table: {
          headers: [
            { es: 'Idea incorrecta', hy: 'Սխալ պատկերացում' },
            { es: 'Corrección', hy: 'Ճիշտ բացատրություն' }
          ],
          rows: [
            {
              cells: [
                { es: '«Un romance tiene ocho versos».', hy: '«Ռոմանսն ունի ութ տող»։' },
                { es: 'El ocho indica las sílabas de cada verso, no el total de versos.', hy: 'Ութը յուրաքանչյուր տողի վանկերի թիվն է, ոչ թե ամբողջ բանաստեղծության տողերի։' }
              ]
            },
            {
              cells: [
                { es: '«La “a” significa asonante».', hy: '«“a”-ն նշանակում է asonante»։' },
                { es: 'La “a” es solo una etiqueta de rima, no una abreviatura.', hy: '«a»-ն պարզապես որոշակի հանգի նշան է։' }
              ]
            },
            {
              cells: [
                { es: '«Los versos impares no tienen medida».', hy: '«Կենտ տողերը չունեն վանկաչափ»։' },
                { es: 'Son sueltos (sin rima), pero tienen ocho sílabas.', hy: 'Դրանք անհանգ են, բայց կանոնավոր ռոմանսում ունեն ութ վանկ։' }
              ]
            },
            {
              cells: [
                { es: '«Si cuento nueve sílabas, no puede ser octosílabo».', hy: '«Եթե հաշվում եմ ինը վանկ, չի կարող ութվանկանի լինել»։' },
                { es: 'Primero hay que revisar sinalefas y el acento de la última palabra.', hy: 'Նախ պետք է ստուգել սինալեֆաները և վերջին բառի շեշտը։' }
              ]
            },
            {
              cells: [
                { es: '«Todas las palabras acabadas en “a” riman».', hy: '«Բոլոր “a”-ով վերջացող բառերը հանգավորվում են»։' },
                { es: 'Hay que comparar desde la última vocal tónica (ej. casa/mesa no riman).', hy: 'Պետք է համեմատել ձայնավորները վերջին շեշտված ձայնավորից սկսած։' }
              ]
            },
            {
              cells: [
                { es: '«Todo poema de ocho sílabas es un romance».', hy: '«Ութ վանկ ունեցող ցանկացած բանաստեղծություն ռոմանս է»։' },
                { es: 'Hay que comprobar la rima asonante en pares y sueltos en impares.', hy: 'Պետք է նաև ստուգել հանգավորման կառուցվածքը։' }
              ]
            },
            {
              cells: [
                { es: '«Todo romance es anónimo».', hy: '«Բոլոր ռոմանսներն անանուն են»։' },
                { es: 'Existen romances de autores cultos conocidos (Romancero nuevo).', hy: 'Կան նաև հայտնի հեղինակների ստեղծած ռոմանսներ։' }
              ]
            },
            {
              cells: [
                { es: '«Todo romance tiene un final abierto».', hy: '«Բոլոր ռոմանսներն ունեն բաց ավարտ»։' },
                { es: 'El final abierto es frecuente, pero no es una regla obligatoria.', hy: 'Բաց ավարտը հաճախ հանդիպող հատկանիշ է, բայց պարտադիր կանոն չէ։' }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'sec-2-15',
    part: 2,
    sectionNumber: 15,
    category: 'exam',
    titleEs: '15. Una explicación completa para el examen',
    titleHy: '15. Ամբողջական բացատրություն քննության համար',
    summaryEs: 'Síntesis doctrinal completa para memorizar y responder en evaluaciones formales.',
    summaryHy: 'Ամբողջական ձևակերպված ամփոփում՝ քննություններին անթերի պատասխանելու համար։',
    blocks: [
      {
        id: '2-15-es',
        type: 'callout',
        es: 'El romance es una composición poética no estrófica, formada tradicionalmente por una serie de versos octosílabos. Los versos pares presentan una misma rima asonante y los impares quedan sueltos. Su esquema es 8–, 8a, 8–, 8a… Suele tener carácter narrativo y puede incluir diálogos, repeticiones y elementos líricos. El comienzo en mitad de la acción y el final abierto son frecuentes, pero no obligatorios.',
        hy: 'Ռոմանսը բանաստեղծական ստեղծագործություն է, որի կառուցվածքը չի պահանջում հաստատուն տների բաժանում։ Ավանդաբար այն կազմված է ութվանկանի տողերի շարքից։ Զույգ տողերն ունեն նույն ձայնավորային հանգը, իսկ կենտ տողերը մնում են անհանգ։ Սխեման է՝ 8–, 8a, 8–, 8a… Այն սովորաբար ունի պատմողական բնույթ և կարող է ներառել երկխոսություններ, կրկնություններ ու քնարական տարրեր։ Գործողության կեսից սկսվելը և բաց ավարտը հաճախ հանդիպող, բայց ոչ պարտադիր հատկանիշներ են։'
      }
    ]
  }
];

export const PRESET_VERSES = [
  {
    text: 'Por el valle va la niña',
    translation: 'Հովտով գնում է աղջիկը',
    syllables: ['Por', 'el', 'va', 'lle', 'va', 'la', 'ni', 'ña'],
    sinalefas: [],
    finalWord: 'niña',
    accentType: 'llana' as const,
    offset: 0,
    expectedCount: 8,
    note: '8 վանկ, վերջին բառը llana է (0)'
  },
  {
    text: 'lleva flores a su casa',
    translation: 'ծաղիկներ է տանում իր տուն',
    syllables: ['lle', 'va', 'flo', 'res', 'a', 'su', 'ca', 'sa'],
    sinalefas: [],
    finalWord: 'casa',
    accentType: 'llana' as const,
    offset: 0,
    expectedCount: 8,
    note: '8 վանկ, հանգում է casa (a-a)'
  },
  {
    text: 'mientras ella cruza el agua',
    translation: 'մինչ նա անցնում է ջրի միջով',
    syllables: ['mien', 'tras', 'e', 'lla', 'cru', 'za_el', 'a', 'gua'],
    sinalefas: ['cruza + el → cruza_el'],
    finalWord: 'agua',
    accentType: 'llana' as const,
    offset: 0,
    expectedCount: 8,
    note: 'cruza_el սինալեֆա: 9 - 1 = 8'
  },
  {
    text: 'La luna estaba crecida',
    translation: 'Լուսինը մեծացել էր',
    syllables: ['La', 'lu', 'na_es', 'ta', 'ba', 'cre', 'ci', 'da'],
    sinalefas: ['luna + estaba → na_es'],
    finalWord: 'crecida',
    accentType: 'llana' as const,
    offset: 0,
    expectedCount: 8,
    note: 'na_es սինալեֆա: 9 - 1 = 8'
  },
  {
    text: 'Yo te digo la verdad',
    translation: 'Ես քեզ ճշմարտությունն եմ ասում',
    syllables: ['Yo', 'te', 'di', 'go', 'la', 'ver', 'dad'],
    sinalefas: [],
    finalWord: 'verdad',
    accentType: 'aguda' as const,
    offset: +1,
    expectedCount: 8,
    note: 'verdad բառը aguda է (+1): 7 + 1 = 8'
  },
  {
    text: 'En el bosque suena música',
    translation: 'Անտառում երաժշտություն է հնչում',
    syllables: ['En', 'el', 'bos', 'que', 'sue', 'na', 'mú', 'si', 'ca'],
    sinalefas: [],
    finalWord: 'música',
    accentType: 'esdrújula' as const,
    offset: -1,
    expectedCount: 8,
    note: 'música բառը esdrújula է (-1): 9 - 1 = 8'
  },
  {
    text: 'Una niña va al jardín',
    translation: 'Մի աղջիկ գնում է պարտեզ',
    syllables: ['U', 'na', 'ni', 'ña', 'va_al', 'jar', 'dín'],
    sinalefas: ['va + al → va_al'],
    finalWord: 'jardín',
    accentType: 'aguda' as const,
    offset: +1,
    expectedCount: 8,
    note: 'սինալեֆա (-1) և aguda (+1)՝ 8 - 1 + 1 = 8'
  },
  {
    text: 'La niña mira a la estrella',
    translation: 'Աղջիկը նայում է աստղին',
    syllables: ['La', 'ni', 'ña', 'mi', 'ra_a', 'la_es', 'tre', 'lla'],
    sinalefas: ['mira + a → ra_a', 'la + estrella → la_es'],
    finalWord: 'estrella',
    accentType: 'llana' as const,
    offset: 0,
    expectedCount: 8,
    note: 'երկու սինալեֆա՝ 10 - 2 = 8 վանկ'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    questionEs: '¿Qué significa exactamente «8a» en el esquema métrico de un romance?',
    questionHy: 'Ի՞նչ է ճշգրիտ նշանակում «8a»-ն ռոմանսի տաղաչափական սխեմայում։',
    options: [
      {
        es: 'El verso tiene ocho sílabas métricas y rima asonante con los demás versos marcados con «a».',
        hy: 'Տողն ունի ութ տաղաչափական վանկ և հանգում է «a» նշված մյուս տողերի հետ։',
        correct: true,
        explanationHy: 'Ճիշտ է։ 8-ը տողի վանկերի թիվն է, իսկ «a»-ն՝ հանգի նշանը (փոքրատառով, քանի որ arte menor է)։'
      },
      {
        es: 'El poema tiene exactamente ocho versos en total.',
        hy: 'Բանաստեղծությունը ընդհանուր ունի ճիշտ ութ տող։',
        correct: false,
        explanationHy: 'Սխալ է։ Ռոմանսի տողերի քանակը հաստատուն չէ, 8-ը վերաբերում է մեկ տողի վանկերին։'
      },
      {
        es: 'La letra «a» significa que la última palabra obligatoriamente termina en la letra «a».',
        hy: '«a» տառը նշանակում է, որ վերջին բառը պարտադիր ավարտվում է «a» տառով։',
        correct: false,
        explanationHy: 'Սխալ է։ «a»-ն պարզապես հանգի պիտակ է, բառը կարող է ավարտվել օրինակ camino/suspiro (i-o)-ով։'
      }
    ]
  },
  {
    id: 'q2',
    questionEs: 'En un romance tradicional, ¿cuáles versos riman y cuáles quedan sueltos?',
    questionHy: 'Ավանդական ռոմանսում ո՞ր տողերն են հանգավորվում և որո՞նք մնում անհանգ։',
    options: [
      {
        es: 'Los versos pares llevan rima asonante (8a), y los versos impares quedan sueltos (8–).',
        hy: 'Զույգ տողերն ունեն ձայնավորային հանգ (8a), իսկ կենտ տողերը մնում են անհանգ (8–)։',
        correct: true,
        explanationHy: 'Ճիշտ է։ Սխեման է՝ 8– / 8a / 8– / 8a / 8– / 8a…'
      },
      {
        es: 'Los versos impares riman y los pares quedan sueltos.',
        hy: 'Կենտ տողերն են հանգավորվում, իսկ զույգերը մնում են անհանգ։',
        correct: false,
        explanationHy: 'Սխալ է։ Ռոմանսում հենց զույգ տողերն են հանգավորվում։'
      },
      {
        es: 'Todos los versos riman de forma consonante cruzada (ABAB).',
        hy: 'Բոլոր տողերը հանգավորվում են խաչաձև լրիվ հանգով (ABAB)։',
        correct: false,
        explanationHy: 'Սխալ է։ Ռոմանսում կենտ տողերը անհանգ են, իսկ հանգը ձայնավորային (asonante) է։'
      }
    ]
  },
  {
    id: 'q3',
    questionEs: '¿Qué operación se aplica al cómputo métrico si la última palabra del verso es «aguda»?',
    questionHy: 'Ի՞նչ գործողություն է կատարվում, երբ տողի վերջին բառը «aguda» է (շեշտը վերջին վանկում)։',
    options: [
      {
        es: 'Se suma una sílaba (+1) al cómputo final.',
        hy: 'Ավելացվում է մեկ վանկ (+1) ընդհանուր հաշվարկին։',
        correct: true,
        explanationHy: 'Ճիշտ է։ Aguda բառի դեպքում (օրինակ՝ verdad) 7 + 1 = 8 sílabas métricas։'
      },
      {
        es: 'Se resta una sílaba (−1).',
        hy: 'Հանվում է մեկ վանկ (−1)։',
        correct: false,
        explanationHy: 'Սխալ է։ Մեկ վանկ հանվում է esdrújula-ի (վերջից երրորդ վանկ) դեպքում։'
      },
      {
        es: 'El número de sílabas se mantiene igual (0).',
        hy: 'Վանկերի թիվը մնում է նույնը (0)։',
        correct: false,
        explanationHy: 'Սխալ է։ 0 փոփոխություն լինում է llana / grave բառերի դեպքում։'
      }
    ]
  },
  {
    id: 'q4',
    questionEs: '¿La presencia de la letra «h» muda impide que se produzca una sinalefa (ej. «mi hijo»)?',
    questionHy: 'Արդյո՞ք չարտասանվող «h» տառը խանգարում է սինալեֆային (օրինակ՝ «mi hijo»)։',
    options: [
      {
        es: 'No, la «h» muda no impide la sinalefa porque se basa en sonidos vocálicos reales.',
        hy: 'Ո՛չ, չարտասանվող «h»-ը չի խանգարում սինալեֆային, քանի որ այն հիմնված է իրական հնչյունների վրա։',
        correct: true,
        explanationHy: 'Ճիշտ է։ «mi_hijo» կազմում է մեկ միավորված տաղաչափական վանկ։'
      },
      {
        es: 'Sí, la «h» siempre bloquea la unión métrica.',
        hy: 'Այո՛, «h»-ը միշտ արգելափակում է տաղաչափական միավորումը։',
        correct: false,
        explanationHy: 'Սխալ է։ Իսպաներենում «h»-ն անձայն է և չի խոչընդոտում սինալեֆային։'
      }
    ]
  },
  {
    id: 'q5',
    questionEs: '¿Qué diferencia hay entre el «Romancero viejo» y el «Romancero nuevo»?',
    questionHy: 'Ի՞նչ տարբերություն կա «Romancero viejo»-ի և «Romancero nuevo»-ի միջև։',
    options: [
      {
        es: 'El viejo es anónimo y de tradición medieval oral; el nuevo es de autores cultos conocidos desde fines del siglo XVI.',
        hy: 'Հինը անանուն է և միջնադարյան բանավոր ավանդույթից, իսկ նորը՝ հայտնի հեղինակների կողմից ստեղծված XVI դարի վերջից։',
        correct: true,
        explanationHy: 'Ճիշտ է։ Romancero nuevo-ն վերամշակում է ավանդական ձևը հայտնի հեղինակների գրչով (օր.՝ Լոպե դե Վեգա, Գոնգորա)։'
      },
      {
        es: 'El viejo tiene 11 sílabas y el nuevo tiene 8 sílabas.',
        hy: 'Հինն ունի 11 վանկ, իսկ նորը՝ 8 վանկ։',
        correct: false,
        explanationHy: 'Սխալ է։ Երկուսն էլ ավանդաբար օգտագործում են ութվանկանի (octosílabo) չափը։'
      }
    ]
  }
];
