import { Unit } from '../types';

export const CURRICULUM_UNITS: Unit[] = [
  // =========================================================================
  // 一年級上學期 (1上) - 均一標準 9 個單元 (https://www.junyiacademy.org/topics/h-m1a)
  // =========================================================================
  {
    id: 'g1-u1-num10',
    grade: 1,
    semester: 1,
    category: 'numbers',
    order: 1,
    title: '第一單元 10以內的數',
    titleBpmf: '[第|ㄉㄧˋ][一|ㄧ][單|ㄉㄢ][元|ㄩㄢˊ] 10 [以|ㄧˇ][內|ㄋㄟˋ][的|˙ㄉㄜ][數|ㄕㄨˋ]',
    subtitle: '點數 1~10、數字讀寫與比多少',
    description: '學習 1 到 10 的點數、正確讀寫數字，透過一一對應比較兩堆東西誰多誰少！',
    icon: '🔢',
    themeColor: 'from-amber-400 to-orange-400',
    manipulativeType: 'animal_counter',
    keyConcepts: ['1~10聽讀寫做', '手口相應點數', '0的意義與使用', '一一對應比多少'],
    learningGoals: [
      '掌握「聽、讀、寫、做」能力，精確唱數與筆順書寫 0~10',
      '學會手指點數「手口相應不重複」，最後數出的數字即為總數',
      '理解「0」代表完全沒有東西或全吃光剩下來的狀態',
      '運用「一一對應連線法」比較兩組物體的多少與一樣多'
    ],
    story: {
      character: '🦁 森林動物點點名',
      scene: '小動物們在草地上集合，獅子隊長開始點名。',
      dialogue: '獅子隊長說：「大家排好隊！我們來玩聽、讀、寫、做四合一遊戲，數數看草地上有幾隻小動物？」',
      task: '動手點數草地上的小動物，練習從 0 數到 10！'
    },
    rhyme: {
      title: '10以內聽讀寫做兒歌',
      lines: [
        '耳朵聽清楚，眼睛看仔細，',
        '手指點數不重複，口中唱數真輕鬆！',
        '盤子空空記為零，一到十數得呱呱叫！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '聽與讀 — 1到10唱數與點名',
        stepDesc: '耳朵聽到數字發音，眼睛看著數字符號，用手指按順序指著物品一邊唱數「1、2、3...」，數到的最後一個數字就是總數量。'
      },
      {
        stepNum: 2,
        stepTitle: '做與寫 — 0的意義與手口相應',
        stepDesc: '當盤子裡的草莓全部吃光光、一個也不剩時，用數字「0」來表示！練習按順序寫出漂亮的 0 到 10。'
      },
      {
        stepNum: 3,
        stepTitle: '一一對應 — 連線比多少',
        stepDesc: '把一隻小兔子和一根蘿蔔一對一畫線連起來，沒有連到的那一方就是比較多，剛好都連完代表一樣多！'
      }
    ],
    warmup: {
      question: '盤子裡原本有 5 顆草莓，小熊把它們全部吃光光了，盤子裡現在有幾顆草莓？',
      options: ['0 顆', '5 顆', '1 顆'],
      answerIndex: 0,
      explanation: '全部吃完、一個也不剩的時候，用「0」來表示數量！'
    }
  },
  {
    id: 'g1-u2-length-compare',
    grade: 1,
    semester: 1,
    category: 'measurement',
    order: 2,
    title: '第二單元 比長短',
    titleBpmf: '[第|ㄉㄧˋ][二|ㄦˋ][單|ㄉㄢ][元|ㄩㄢˊ] [比|ㄅㄧˇ][長|ㄔㄤˊ][短|ㄉㄨㄢˇ]',
    subtitle: '起點對齊，比比看誰長誰短誰高',
    description: '學習把物體的一端對齊再來比長短、比高矮和比厚薄，掌握長度比較的黃金準則。',
    icon: '📏',
    themeColor: 'from-purple-400 to-indigo-500',
    manipulativeType: 'unit_length',
    keyConcepts: ['起點對齊', '長短直接比較', '高矮與厚薄'],
    learningGoals: [
      '掌握長度比較必須「起點端對齊」的規則',
      '能正確比較兩支鉛筆的長短與兩棵樹的高矮',
      '理解彎曲的繩子拉直後才能比長短'
    ],
    story: {
      character: '🦒 長頸鹿與小斑馬比身高',
      scene: '小斑馬站在小土丘上說：「我比長頸鹿還要高！」',
      dialogue: '大象裁判說：「不可以站在土丘上喔！大家都要站在平地上，腳底對齊才能比身高！」',
      task: '將兩支筆的一端靠齊基準線，觀察哪一支伸得比較長！'
    },
    rhyme: {
      title: '比長短口訣',
      lines: [
        '比長短，比高矮，起點對齊最重要！',
        '不能墊腳尖，不能往前站，',
        '伸得比較長，就是長度王！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '對齊基準線',
        stepDesc: '把要比較的物品一端靠在桌緣或同一條直線上。'
      },
      {
        stepNum: 2,
        stepTitle: '觀察另一端',
        stepDesc: '看另一端誰伸得比較遠，伸得遠的比較長，伸得近的比較短。'
      }
    ],
    warmup: {
      question: '比比看兩條彩帶誰比較長，第一步應該怎麼做？',
      options: ['把其中一端先對齊', '隨便放在桌上看', '用剪刀剪成一樣長'],
      answerIndex: 0,
      explanation: '比較長短時，起點必須先對齊基準線！'
    }
  },
  {
    id: 'g1-u3-order',
    grade: 1,
    semester: 1,
    category: 'numbers',
    order: 3,
    title: '第三單元 順序與多少',
    titleBpmf: '[第|ㄉㄧˋ][三|ㄙㄢ][單|ㄉㄢ][元|ㄩㄢˊ] [順|ㄕㄨㄣˋ][序|ㄒㄩˋ][與|ㄩˇ][多|ㄉㄨㄛ][少|ㄕㄠˇ]',
    subtitle: '從前面數、從後面數、第幾個',
    description: '區分「有幾個」和「第幾個」的差別，學習從前數、從後數、前後左右的位置與排隊順序。',
    icon: '🚩',
    themeColor: 'from-teal-400 to-emerald-500',
    manipulativeType: 'animal_counter',
    keyConcepts: ['前後順序', '序數（第幾個）', '基數與序數的區別'],
    learningGoals: [
      '能從指定方向（前/後/左/右）數出物件的序數',
      '能清楚分辨「買 3 個包子」和「排在第 3 個」的不同',
      '能解決排隊情境的順序問題'
    ],
    story: {
      character: '🐻 小熊排隊買冰淇淋',
      scene: '冰淇淋店門口排了一長排動物朋友。',
      dialogue: '小熊說：「我前面有 3 個人，那我排在第幾個呢？」',
      task: '動手數數看排隊隊伍，找出第 1 個、第 2 個是誰！'
    },
    rhyme: {
      title: '排隊歌',
      lines: [
        '排隊買票有禮貌，從前往後一個個。',
        '第幾是位置，幾個是數量，',
        '前面有三人，我排第四個！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '找準起點方向',
        stepDesc: '看清楚題目是「從前面數」還是「從後面數」。'
      },
      {
        stepNum: 2,
        stepTitle: '分清幾個與第幾',
        stepDesc: '「第 4 個」只有 1 個人；「4 個人」是一整群共有 4 個人。'
      }
    ],
    warmup: {
      question: '小兔排隊買早餐，從前面數牠排在第 4 個，表示牠前面有幾隻小動物？',
      options: ['3 隻', '4 隻', '5 隻'],
      answerIndex: 0,
      explanation: '排在第 4 個，表示牠前面有 1、2、3 共 3 隻動物！'
    }
  },
  {
    id: 'g1-u9-review',
    grade: 1,
    semester: 1,
    category: 'operations',
    order: 4,
    title: '第四單元 分與合',
    titleBpmf: '[第|ㄉㄧˋ][四|ㄙˋ][單|ㄉㄢ][元|ㄩㄢˊ] [分|ㄈㄣ][與|ㄩˇ][合|ㄏㄜˊ]',
    subtitle: '5的分合、10的分合、合十好朋友',
    description: '透過雙色花片操作，熟練 5 的分合與 10 的分合，建立加法與減法的心算核心基石！',
    icon: '🔴',
    themeColor: 'from-rose-400 to-amber-400',
    manipulativeType: 'ten_split',
    keyConcepts: ['5的分與合', '10的分與合', '合十好朋友'],
    learningGoals: [
      '熟練 10 以內各數的所有分合組合',
      '能快速說出合十配對（如 3 配 7、6 配 4）',
      '為進位加法與退位減法打下具體基礎'
    ],
    story: {
      character: '🐰 兔兔與小熊的烘焙坊',
      scene: '烤盤裡烤了 10 顆草莓餅乾。',
      dialogue: '兔兔說：「我拿 4 顆，剩下的 6 顆全部留給小熊吃！」',
      task: '在十格陣翻轉雙色花片，看看 10 還能分成幾和幾！'
    },
    rhyme: {
      title: '合十好朋友歌',
      lines: [
        '一九一九好朋友，二八二八手拉手，',
        '三七三七真親密，四六四六一起走，',
        '五五湊成一雙手，合在一起剛好十！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '觀察總數不變',
        stepDesc: '10 顆花片分成兩堆，一堆變多另一堆就會變少，加起來都是 10。'
      },
      {
        stepNum: 2,
        stepTitle: '背熟合十拍檔',
        stepDesc: '記住 1-9, 2-8, 3-7, 4-6, 5-5 五組好朋友。'
      }
    ],
    warmup: {
      question: '誰是 8 的合十好朋友？（8 和誰合起來剛好是 10？）',
      options: ['2', '3', '4'],
      answerIndex: 0,
      explanation: '8 + 2 = 10，8 的合十好朋友是 2！'
    }
  },
  {
    id: 'g1-u5-shapes',
    grade: 1,
    semester: 1,
    category: 'geometry',
    order: 5,
    title: '第五單元 認識形狀',
    titleBpmf: '[第|ㄉㄧˋ][五|ㄨˇ][單|ㄉㄢ][元|ㄩㄢˊ] [認|ㄖㄣˋ][識|ㄕˋ][形|ㄒㄧㄥˊ][狀|ㄓㄨㄤˋ]',
    subtitle: '正方形、長方形、三角形、圓形',
    description: '從積木拓印、找生活中的形狀，認識正方形、長方形、三角形和圓形的外觀特徵與滾動特性。',
    icon: '🔺',
    themeColor: 'from-blue-400 to-indigo-500',
    manipulativeType: 'shape_lab',
    keyConcepts: ['正方形與長方形', '三角形三條邊三個角', '圓形圓滾滾'],
    learningGoals: [
      '能辨識正方形、長方形、三角形與圓形',
      '能將形狀與生活周遭物品做聯結（如車輪是圓形）',
      '體驗哪些形狀可以堆疊、哪些容易滾動'
    ],
    story: {
      character: '🚗 玩具王國的小工程師',
      scene: '小熊正在用積木造一輛小汽車。',
      dialogue: '小熊說：「車身要用長方形積木，車輪要用圓形積木，車頂裝一個三角形旗幟！」',
      task: '動手辨識不同積木的面，找出生活中的四種形狀！'
    },
    rhyme: {
      title: '形狀兒歌',
      lines: [
        '圓形圓圓像皮球，滾來滾去停不住；',
        '三角形三條邊，三個尖角刺刺的；',
        '正方形四邊一樣長，長方形兩邊長兩邊短！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '摸摸看邊和角',
        stepDesc: '三角形有 3 條直直的邊和 3 個尖尖的角；圓形是彎彎的平滑曲線，沒有角。'
      },
      {
        stepNum: 2,
        stepTitle: '比比看正方形與長方形',
        stepDesc: '正方形 4 條邊一模一樣長；長方形對面的兩條邊一樣長。'
      }
    ],
    warmup: {
      question: '時鐘的鐘面通常是哪一種形狀？',
      options: ['圓形', '三角形', '長方形'],
      answerIndex: 0,
      explanation: '時鐘的鐘面是圓形的，圓圓平滑沒有尖角！'
    }
  },
  {
    id: 'g1-u4-add10',
    grade: 1,
    semester: 1,
    category: 'operations',
    order: 6,
    title: '第六單元 10以內的加法',
    titleBpmf: '[第|ㄉㄧˋ][六|ㄌㄧㄡˋ][單|ㄉㄢ][元|ㄩㄢˊ] 10 [以|ㄧˇ][內|ㄋㄟˋ][的|˙ㄉㄜ][加|ㄐㄧㄚ][法|ㄈㄚˇ]',
    subtitle: '加號「+」與等號「=」，合起來是多少',
    description: '理解「併加」（兩堆合起來）與「添加」（又來了幾個）的情境，學習加法算式的記作與讀作。',
    icon: '➕',
    themeColor: 'from-emerald-400 to-green-500',
    manipulativeType: 'ten_split',
    keyConcepts: ['併加與添加', '加號(+)與等號(=)', '加法算式讀作與記作'],
    learningGoals: [
      '能理解加法代表「合起來」或「增加」的意義',
      '能依據題意寫出正確的加法算式（如 3+4=7）',
      '能熟練計算 10 以內的加法運算'
    ],
    story: {
      character: '🍎 果園採蘋果',
      scene: '樹上有 4 顆紅蘋果，地上有 3 顆青蘋果。',
      dialogue: '小松鼠說：「把紅蘋果和青蘋果合起來，算式記作 4 + 3 = 7，一共有 7 顆蘋果！」',
      task: '動手把兩堆花片合在一起，數出全部的數量！'
    },
    rhyme: {
      title: '加法兒歌',
      lines: [
        '加號像十字，代表合起來；',
        '左邊加右邊，等號排後面；',
        '三加二等於五，加法真好玩！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '認識加號與等號',
        stepDesc: '「+」表示把兩堆東西合在一起，「=」表示算出來的結果是多少。'
      },
      {
        stepNum: 2,
        stepTitle: '向上數算法',
        stepDesc: '算 5 + 3：從 5 開始往後數 3 個（6、7、8），答案就是 8。'
      }
    ],
    warmup: {
      question: '小明有 5 枝鉛筆，媽媽又買給他 3 枝，小明現在一共有幾枝鉛筆？',
      options: ['8 枝', '7 枝', '2 枝'],
      answerIndex: 0,
      explanation: '5 + 3 = 8，一共有 8 枝鉛筆！'
    }
  },
  {
    id: 'g1-u6-sub10',
    grade: 1,
    semester: 1,
    category: 'operations',
    order: 7,
    title: '第七單元 10以內的減法',
    titleBpmf: '[第|ㄉㄧˋ][七|ㄑㄧ][單|ㄉㄢ][元|ㄩㄢˊ] 10 [以|ㄧˇ][內|ㄋㄟˋ][的|˙ㄉㄜ][減|ㄐㄧㄢˇ][法|ㄈㄚˇ]',
    subtitle: '減號「-」，拿走剩下幾個與多多少少多少',
    description: '理解「拿走剩下多少」與「兩數相差多少」的減法意義，熟練 10 以內的減法算式。',
    icon: '➖',
    themeColor: 'from-pink-400 to-rose-500',
    manipulativeType: 'ten_split',
    keyConcepts: ['拿走剩下（拿走型）', '比較差額（比較型）', '減號(-)與減法算式'],
    learningGoals: [
      '能理解減法代表「拿走/吃掉」或「比較差額」的意義',
      '能正確寫出減法算式（如 8-3=5）',
      '能熟練計算 10 以內的減法生活問題'
    ],
    story: {
      character: '🎈 賣氣球的小丑叔叔',
      scene: '小丑叔叔手上有 8 顆彩球，被風吹走了 3 顆。',
      dialogue: '小丑說：「算式記作 8 - 3 = 5，我手上還剩下 5 顆彩球！」',
      task: '從花片堆中拿走幾顆，數數看剩下的數量！'
    },
    rhyme: {
      title: '減法兒歌',
      lines: [
        '減號像條線，代表拿走了；',
        '被減數在前，減掉放中間；',
        '八減三等於五，算算剩下幾！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '拿走情境（剩下多少）',
        stepDesc: '原本有 7 顆糖果，吃掉 2 顆，算式是 7 - 2 = 5。'
      },
      {
        stepNum: 2,
        stepTitle: '比較情境（多幾個少幾個）',
        stepDesc: '小狗有 6 隻，小貓有 4 隻，小狗比小貓多幾隻？算式也是 6 - 4 = 2。'
      }
    ],
    warmup: {
      question: '樹上有 9 隻小鳥，飛走了 4 隻，樹上還剩下幾隻小鳥？',
      options: ['5 隻', '6 隻', '13 隻'],
      answerIndex: 0,
      explanation: '9 - 4 = 5，樹上還剩下 5 隻小鳥！'
    }
  },
  {
    id: 'g1-u8-num30',
    grade: 1,
    semester: 1,
    category: 'numbers',
    order: 8,
    title: '第八單元 30以內的數',
    titleBpmf: '[第|ㄉㄧˋ][八|ㄅㄚ][單|ㄉㄢ][元|ㄩㄢˊ] 30 [以|ㄧˇ][內|ㄋㄟˋ][的|˙ㄉㄜ][數|ㄕㄨˋ]',
    subtitle: '十個一數、二個一數、位值板初步',
    description: '將數數範圍擴展到 30，認識 10 個一捆的十位概念，練習 2 個一數、5 個一數和 10 個一數。',
    icon: '📦',
    themeColor: 'from-cyan-400 to-blue-500',
    manipulativeType: 'base10',
    keyConcepts: ['11~30的讀寫', '10個裝一捆', '十位與個位初步'],
    learningGoals: [
      '能順暢點數 11 到 30 的物件',
      '理解 24 是「2 個十」和「4 個一」合起來',
      '能進行 2個一數、5個一數的跳數'
    ],
    story: {
      character: '🥚 養雞場撿雞蛋',
      scene: '母雞今天下了 25 顆雞蛋，每 10 顆裝滿一盒。',
      dialogue: '農夫伯伯說：「裝滿了 2 盒，還剩下 5 顆單獨的，合起來就是二十五顆！」',
      task: '動手把 10 顆積木拼成一條十，數數看有幾個十和幾個一！'
    },
    rhyme: {
      title: '數數兒歌',
      lines: [
        '十個十個裝一盒，剩下散的叫個位；',
        '二個十和三個一，合在一起二十三；',
        '整整齊齊排好隊，數到三十真簡單！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '滿十裝成一捆',
        stepDesc: '每數滿 10 個就綁成一捆，數幾捆就是幾個十。'
      },
      {
        stepNum: 2,
        stepTitle: '位值板記作',
        stepDesc: '十位寫幾捆（如 2），個位寫散的幾個（如 8），讀作二十八（28）。'
      }
    ],
    warmup: {
      question: '2 個十和 7 個一合起來是哪一個數字？',
      options: ['27', '72', '207'],
      answerIndex: 0,
      explanation: '2 個十是 20，加上 7 個一是 27！'
    }
  },
  {
    id: 'g1-u7-time-clock',
    grade: 1,
    semester: 1,
    category: 'measurement',
    order: 9,
    title: '第九單元 時間（時鐘）',
    titleBpmf: '[第|ㄉㄧˋ][九|ㄐㄧㄡˇ][單|ㄉㄢ][元|ㄩㄢˊ] [時|ㄕˊ][間|ㄐㄧㄢ]（[時|ㄕˊ][鐘|ㄓㄨㄥ]）',
    subtitle: '長針短針、幾點整、幾點半與一日作息',
    description: '認識鐘面結構，時針短負責看點鐘、分針長負責看分鐘，精熟整點與半點的判讀與作息對應。',
    icon: '⏰',
    themeColor: 'from-sky-400 to-blue-600',
    manipulativeType: 'clock',
    keyConcepts: ['時針與分針', '幾點整（長針指12）', '幾點半（長針指6）'],
    learningGoals: [
      '能分辨時鐘上的長針（分針）與短針（時針）',
      '能精確判讀整點（如 8:00）與半點（如 12:30）',
      '能將時間與生活作息（上學、吃午餐、睡覺）結合'
    ],
    story: {
      character: '🦉 貓頭鷹校長的鐘樓',
      scene: '早晨 8 點整，鐘樓發出清脆的鐘聲。',
      dialogue: '貓頭鷹校長說：「長針指在 12，短針指在 8，早自習時間到囉！」',
      task: '撥動時鐘模擬器，撥出中午 12 點半和下午 4 點整！'
    },
    rhyme: {
      title: '時鐘口訣',
      lines: [
        '長針指在十二上，短針指幾就幾點；',
        '長針指在六上面，半點時間在眼前；',
        '早睡早起身體好，看準時間不遲到！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '整點看短針',
        stepDesc: '長針只要指在 12，看短針指著數字幾就是幾點整。'
      },
      {
        stepNum: 2,
        stepTitle: '半點長針指6',
        stepDesc: '長針指在 6，短針剛好走到兩個數字正中間，讀作前一個數字的幾點半。'
      }
    ],
    warmup: {
      question: '中午 12 點半吃午餐時，長針（分針）會指在哪一個數字上？',
      options: ['6', '12', '3'],
      answerIndex: 0,
      explanation: '「半點」時長針一定指在 6！'
    }
  },

  // =========================================================================
  // 一年級下學期 (1下) - 均一標準 9 個單元 (https://www.junyiacademy.org/topics/h-m1a)
  // =========================================================================
  {
    id: 'g1-u10-add20',
    grade: 1,
    semester: 2,
    category: 'operations',
    order: 1,
    title: '第一單元 20以內的加法',
    titleBpmf: '[第|ㄉㄧˋ][一|ㄧ][單|ㄉㄢ][元|ㄩㄢˊ] 20 [以|ㄧˇ][內|ㄋㄟˋ][的|˙ㄉㄜ][加|ㄐㄧㄚ][法|ㄈㄚˇ]',
    subtitle: '湊十法進位加法、8+5=13拆解心算',
    description: '學習「湊十法」進位計算：把一個加數拆開，先和另一個數湊成 10，再算 10 加幾！',
    icon: '🧮',
    themeColor: 'from-orange-400 to-amber-500',
    manipulativeType: 'ten_split',
    keyConcepts: ['湊十法原理', '拆數湊成10', '20以內進位加法心算'],
    learningGoals: [
      '理解湊十法（如 8+5，把5拆成2和3，8+2=10，10+3=13）',
      '能熟練計算 9+幾、8+幾、7+幾的進位加法',
      '能運用加法解決生活應用問題'
    ],
    story: {
      character: '🐿️ 小松鼠湊十裝袋',
      scene: '小松鼠有 8 顆橡實，小鳥又送給牠 5 顆。',
      dialogue: '松鼠說：「從 5 顆裡拿 2 顆過來，8 + 2 先湊成 10 顆裝一滿袋，剩下 3 顆，一共是 13 顆！」',
      task: '動手把第二堆的花片移過去湊成 10，觀察總數！'
    },
    rhyme: {
      title: '湊十歌',
      lines: [
        '看大數，分小數，湊成十，加剩數。',
        '九加幾，分出一；八加幾，分出二；',
        '七加幾，分出三，湊滿十個算得快！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '找出要湊幾',
        stepDesc: '算 8 + 5：8 的好朋友是 2，所以把 5 拆成 2 和 3。'
      },
      {
        stepNum: 2,
        stepTitle: '湊成十再加剩數',
        stepDesc: '8 + 2 = 10，10 + 3 = 13，答案就是 13！'
      }
    ],
    warmup: {
      question: '計算 9 + 4 時，用湊十法把 4 拆成 1 和幾？',
      options: ['3', '2', '1'],
      answerIndex: 0,
      explanation: '9 配 1 湊成 10，所以把 4 拆成 1 和 3，9 + 1 = 10，10 + 3 = 13！'
    }
  },
  {
    id: 'g1-u11-length',
    grade: 1,
    semester: 2,
    category: 'measurement',
    order: 2,
    title: '第二單元 長度',
    titleBpmf: '[第|ㄉㄧˋ][二|ㄦˋ][單|ㄉㄢ][元|ㄩㄢˊ] [長|ㄔㄤˊ][度|ㄉㄨˋ]',
    subtitle: '個別單位、用迴紋針與方格量長度',
    description: '體驗非標準個別單位測量，用相同大小的迴紋針、方格或橡皮擦排排看，比較物體長度。',
    icon: '📎',
    themeColor: 'from-teal-400 to-cyan-500',
    manipulativeType: 'unit_length',
    keyConcepts: ['個別單位測量', '一個接一個不留空隙', '數量越多代表越長'],
    learningGoals: [
      '能使用相同規格的小道具（如迴紋針）測量長度',
      '掌握測量時「緊密相連、不重疊、不留空隙」的規則',
      '能比較不同物體所佔方格數的多寡'
    ],
    story: {
      character: '📐 森林木匠熊師傅',
      scene: '熊師傅要量一塊木板有多長。',
      dialogue: '熊師傅說：「我們用一模一樣大的迴紋針一個接一個排好，數數看一共用了幾個！」',
      task: '拖曳方格與迴紋針排列，測量鉛筆和剪刀的長度！'
    },
    rhyme: {
      title: '量長度口訣',
      lines: [
        '小道具，量長度，一個接一個排整齊；',
        '不能重疊留空隙，起點終點要對齊；',
        '用了幾個就是長，比比誰的數量多！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '規格要相同',
        stepDesc: '測量時使用的每個迴紋針或積木必須一樣大，才能準確比較。'
      },
      {
        stepNum: 2,
        stepTitle: '排齊不空隙',
        stepDesc: '從頭排到尾，中間不重疊、不空隙。'
      }
    ],
    warmup: {
      question: '用迴紋針量文具：彩色筆長 7 個迴紋針，膠水長 4 個迴紋針，哪一個比較長？',
      options: ['彩色筆', '膠水', '一樣長'],
      answerIndex: 0,
      explanation: '7 個迴紋針比 4 個多，所以彩色筆比較長！'
    }
  },
  {
    id: 'g1-u12-sub20',
    grade: 1,
    semester: 2,
    category: 'operations',
    order: 3,
    title: '第三單元 20以內的減法',
    titleBpmf: '[第|ㄉㄧˋ][三|ㄙㄢ][單|ㄉㄢ][元|ㄩㄢˊ] 20 [以|ㄧˇ][內|ㄋㄟˋ][的|˙ㄉㄜ][減|ㄐㄧㄢˇ][法|ㄈㄚˇ]',
    subtitle: '破十法退位減法、13-5=8拆解心算',
    description: '學習「破十法」退位減法：個位不夠減時，把十位的一整包 10 拆開來減，再把剩下的加回去！',
    icon: '💡',
    themeColor: 'from-rose-500 to-pink-600',
    manipulativeType: 'ten_split',
    keyConcepts: ["破十法原理", "十位拆開減", "20以內退位減法心算"],
    learningGoals: [
      '理解破十法（如 13-5，把13拆成10和3，10-5=5，5+3=8）',
      '熟練十幾減幾的退位減法心算',
      '能解決生活中的退位減法應用題'
    ],
    story: {
      character: '🍓 猴子分草莓',
      scene: '猴子有 13 顆草莓（一盒10顆 + 散裝3顆），要送給小兔子 5 顆。',
      dialogue: '小猴子說：「散裝的 3 顆不夠扣 5 顆，我把一整盒（10顆）打開扣掉 5 顆剩下 5 顆，再加上原本散裝的 3 顆，總共剩下 8 顆！」',
      task: '動手把十格陣打開，練習破十扣減法！'
    },
    rhyme: {
      title: '破十歌',
      lines: [
        '個位不夠減，請出十來幫。',
        '十減減數得差數，差數再把個位加。',
        '十三減五：十減五得五，五加三得八！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '拆開成 10 和個位',
        stepDesc: '算 14 - 6：把 14 拆成 10 和 4。'
      },
      {
        stepNum: 2,
        stepTitle: '用 10 去扣再加個位',
        stepDesc: '10 - 6 = 4，再把 4 + 4 = 8，答案就是 8！'
      }
    ],
    warmup: {
      question: '算算看 15 - 8：用 10 減 8 得到 2，再用 2 加上原本個位的 5，答案是多少？',
      options: ['7', '6', '8'],
      answerIndex: 0,
      explanation: '10 - 8 = 2，2 + 5 = 7，所以 15 - 8 = 7！'
    }
  },
  {
    id: 'g1-u13-num100',
    grade: 1,
    semester: 2,
    category: 'numbers',
    order: 4,
    title: '第四單元 100以內的數',
    titleBpmf: '[第|ㄉㄧˋ][四|ㄙˋ][單|ㄉㄢ][元|ㄩㄢˊ] 100 [以|ㄧˇ][內|ㄋㄟˋ][的|˙ㄉㄜ][數|ㄕㄨˋ]',
    subtitle: '十位與個位、百數表看規律、比大小',
    description: '學習 100 以內的數，掌握百數表的左右相差 1、上下相差 10 規律，熟練兩位數比大小。',
    icon: '🧱',
    themeColor: 'from-emerald-400 to-teal-500',
    manipulativeType: 'base10',
    keyConcepts: ['10個十是一百', '百數表規律', '兩位數比大小看十位'],
    learningGoals: [
      '理解 10 個「10」等於 100',
      '能在百數表上找出相鄰數字與上下左右關係',
      '熟練比較 100 以內兩數的大小'
    ],
    story: {
      character: '🏰 百數神奇城堡',
      scene: '百數表上有 100 個小房間，從 1 排到 100。',
      dialogue: '國王說：「往右走一格加 1，往下走一格加 10，看誰能最快找到 56 號房間！」',
      task: '操作十位條與個位粒積木，拼出 100 以內的任意數字！'
    },
    rhyme: {
      title: '百數表歌謠',
      lines: [
        '百數表，真奇妙，橫排直列有規律：',
        '向右加一向左減一，向下加十向上減十；',
        '比大小先看十位，十位大來它就大！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '百數表十字探索',
        stepDesc: '45 的左邊是 44、右邊是 46、上面是 35、下面是 55。'
      },
      {
        stepNum: 2,
        stepTitle: '比大小看十位',
        stepDesc: '比較 72 和 68：7 個十比 6 個十多，所以 72 > 68。'
      }
    ],
    warmup: {
      question: '在百數表上，數字 38 的正下方一個格子是哪一個數字？',
      options: ['48', '39', '28'],
      answerIndex: 0,
      explanation: '百數表往下走一格是加上 10，38 + 10 = 48！'
    }
  },
  {
    id: 'g1-u14-geometry',
    grade: 1,
    semester: 2,
    category: 'geometry',
    order: 5,
    title: '第五單元 形狀與形體',
    titleBpmf: '[第|ㄉㄧˋ][五|ㄨˇ][單|ㄉㄢ][元|ㄩㄢˊ] [形|ㄒㄧㄥˊ][狀|ㄓㄨㄤˋ][與|ㄩˇ][形|ㄒㄧㄥˊ][體|ㄊㄧˇ]',
    subtitle: '平面圖形與立體形體滾動堆疊',
    description: '從正方體、長方體、圓柱和球體等立體形體，觀察它們的平平的面、滾動或堆疊特性，並拓印出平面圖形。',
    icon: '📦',
    themeColor: 'from-blue-500 to-indigo-600',
    manipulativeType: 'shape_lab',
    keyConcepts: ['立體形體與平面圖形', '滾動（圓圓的面）', '堆疊（平平的面）'],
    learningGoals: [
      '分辨球體、圓柱體、正方體與長方體',
      '理解有平平的面才能堆高，圓圓的面可以滾動',
      '能用積木描出正方形、長方形和圓形'
    ],
    story: {
      character: '🎪 馬戲團積木雜技',
      scene: '小丑要把積木疊高高表演雜技。',
      dialogue: '小丑說：「球體會滾來滾去不能疊在底層，要選有平平面長方體和正方體才能穩穩疊高喔！」',
      task: '動手分類哪些形體可以滾動、哪些形體可以堆疊！'
    },
    rhyme: {
      title: '形體特性歌',
      lines: [
        '球體圓滾滾，四面八方滾得快；',
        '圓柱兩頭平，放倒能滾立能疊；',
        '正方長方平平穩，高高堆疊不倒塌！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '平平的面 vs 圓彎的面',
        stepDesc: '平平的面（如正方體）容易堆疊；彎曲的面（如球體）容易滾動。'
      },
      {
        stepNum: 2,
        stepTitle: '立體描平面',
        stepDesc: '把圓柱放紙上描一圈得到圓形；把正方體放紙上描一圈得到正方形。'
      }
    ],
    warmup: {
      question: '下面哪一種形體放在斜坡上最容易滾動？',
      options: ['球體（皮球）', '正方體積木', '長方體鉛筆盒'],
      answerIndex: 0,
      explanation: '球體全身都是圓滑曲面，放在斜坡上最容易滾動！'
    }
  },
  {
    id: 'g1-u15-coins',
    grade: 1,
    semester: 2,
    category: 'numbers',
    order: 6,
    title: '第六單元 數數看有多少元',
    titleBpmf: '[第|ㄉㄧˋ][六|ㄌㄧㄡˋ][單|ㄉㄢ][元|ㄩㄢˊ] [數|ㄕㄨˇ][數|ㄕㄨˇ][看|ㄎㄢˋ][有|ㄧㄡˇ][多|ㄉㄨㄛ][少|ㄕㄠˇ][元|ㄩㄢˊ]',
    subtitle: '1元、5元、10元、50元、付錢與找錢',
    description: '認識新台幣硬幣，學會等值兌換（5個1元換5元、2個5元換10元、5個10元換50元），買東西付錢剛剛好與找錢。',
    icon: '🪙',
    themeColor: 'from-amber-400 to-orange-500',
    manipulativeType: 'coins',
    keyConcepts: ['1元/5元/10元/50元', '等值換幣', '付錢與簡易找錢'],
    learningGoals: [
      '能辨識 1元、5元、10元、50元 硬幣',
      '能熟練計算錢包裡的零錢總金額',
      '能依商品售價付錢並計算找回的零錢'
    ],
    story: {
      character: '🐱 招財貓文具店',
      scene: '小明想買一本 18 元的畫冊。',
      dialogue: '店長說：「你可以拿 1 個 10 元、1 個 5 元和 3 個 1 元，剛好付 18 元喔！」',
      task: '在收銀盤中拖曳銅板，練習多元付錢與找零！'
    },
    rhyme: {
      title: '錢幣歌',
      lines: [
        '一元小銅板，五個換五元；',
        '兩個五元十塊錢，五個十元變五十；',
        '買文具算價錢，付錢找錢我最行！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '先大後小算總錢數',
        stepDesc: '先數 50 元、再數 10 元、再數 5 元、最後數 1 元，數起來又快又準。'
      },
      {
        stepNum: 2,
        stepTitle: '付錢剛剛好',
        stepDesc: '買 25 元的東西：付 2 個 10 元和 1 個 5 元。'
      }
    ],
    warmup: {
      question: '小明買了一支 8 元的棒棒糖，付了一個 10 元硬幣，老闆要找給他多少錢？',
      options: ['2 元', '3 元', '1 元'],
      answerIndex: 0,
      explanation: '10 - 8 = 2，老闆要找回 2 元！'
    }
  },
  {
    id: 'g1-u16-calendar',
    grade: 1,
    semester: 2,
    category: 'measurement',
    order: 7,
    title: '第七單元 幾月幾日星期幾',
    titleBpmf: '[第|ㄉㄧˋ][七|ㄑㄧ][單|ㄉㄢ][元|ㄩㄢˊ] [幾|ㄐㄧˇ][月|ㄩㄝˋ][幾|ㄐㄧˇ][日|ㄖˋ][星|ㄒㄧㄥ][期|ㄑㄧˊ][幾|ㄐㄧˇ]',
    subtitle: '看月曆、日曆、昨天今天明天',
    description: '學習看月曆與日曆，認識一個星期有 7 天，學會查閱國定假日、生日，並分清昨天、今天與明天的先後順序。',
    icon: '📅',
    themeColor: 'from-cyan-500 to-blue-600',
    manipulativeType: 'calendar_lab',
    keyConcepts: ['月曆與日曆判讀', '一個星期7天（日~六）', '昨天今天明天'],
    learningGoals: [
      '能在月曆上查出指定日期的星期幾',
      '理解一個星期從星期日開始到星期六結束，共 7 天',
      '能推算昨天、今天與明天的日期'
    ],
    story: {
      character: '🎂 小兔子的生日派對倒數',
      scene: '小兔子在日曆上用紅筆圈起 5 月 12 日。',
      dialogue: '兔媽媽說：「今天是 5 月 10 日星期五，再過兩天就是 5 月 12 日星期日，你的生日派對就要到了！」',
      task: '查查月曆，看看今天是幾月幾日星期幾！'
    },
    rhyme: {
      title: '星期歌',
      lines: [
        '一週七天排排坐，星期日到星期六。',
        '今天過完是明天，今天之前叫昨天。',
        '翻開月曆查日子，天天快樂好時光！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '月曆對齊看星期',
        stepDesc: '在月曆上找到數字幾日，往上直直看對應的就是「星期幾」。'
      },
      {
        stepNum: 2,
        stepTitle: '昨天、今天與明天',
        stepDesc: '今天是 5 號，昨天是前一天（4 號），明天是後一天（6 號）。'
      }
    ],
    warmup: {
      question: '如果今天是 3 月 8 日星期二，那麼明天是幾月幾日星期幾？',
      options: ['3月9日星期三', '3月7日星期一', '3月9日星期二'],
      answerIndex: 0,
      explanation: '明天的日期加 1（3月9日），星期也往後一天（星期三）！'
    }
  },
  {
    id: 'g1-u17-two-digit-add-sub',
    grade: 1,
    semester: 2,
    category: 'operations',
    order: 8,
    title: '第八單元 兩位數的加減法',
    titleBpmf: '[第|ㄉㄧˋ][八|ㄅㄚ][單|ㄉㄢ][元|ㄩㄢˊ] [兩|ㄌㄧㄤˇ][位|ㄨㄟˋ][數|ㄕㄨˋ][的|˙ㄉㄜ][加|ㄐㄧㄚ][減|ㄐㄧㄢˇ][法|ㄈㄚˇ]',
    subtitle: '不進退位兩位數加減、整十加減法',
    description: '學習兩位數不進位加法與不退位減法（如 23+4=27, 35-12=23），掌握「十位加減十位、個位加減個位」的口算與橫式算則。',
    icon: '➕',
    themeColor: 'from-orange-400 to-amber-500',
    manipulativeType: 'vertical_arithmetic',
    keyConcepts: ['整十加減（30+20）', '兩位數加減一位數', '十位與個位分開算'],
    learningGoals: [
      '能熟練計算整十加減法（如 40+20=60, 50-30=20）',
      '能計算兩位數不進位加法與不退位減法',
      '能解決兩位數生活應用題'
    ],
    story: {
      character: '🍊 採果農場收穫大計',
      scene: '上午採了 30 顆橘子，下午採了 25 顆橘子。',
      dialogue: '小熊農夫說：「30 + 25：十位 3 個十加 2 個十是 5 個十（50），個位是 5，合起來就是 55 顆！」',
      task: '操作十位條與個位粒積木，分開計算十位與個位！'
    },
    rhyme: {
      title: '兩位數加減口訣',
      lines: [
        '兩位數加減真容易，十位個位分分清。',
        '十位加十位，個位加個位，',
        '合在一起寫答案，算得又快又準確！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '整十相加看十位',
        stepDesc: '40 + 30：4 個十 + 3 個十 = 7 個十（70）。'
      },
      {
        stepNum: 2,
        stepTitle: '兩位數加減一位數',
        stepDesc: '23 + 5：十位依然是 20，個位 3 + 5 = 8，合起來是 28。'
      }
    ],
    warmup: {
      question: '算算看：34 + 12 = ？',
      options: ['46', '45', '36'],
      answerIndex: 0,
      explanation: '十位 3 + 1 = 4（40），個位 4 + 2 = 6，答案是 46！'
    }
  },
  {
    id: 'g1-u18-classify',
    grade: 1,
    semester: 2,
    category: 'measurement',
    order: 9,
    title: '第九單元 分類整理',
    titleBpmf: '[第|ㄉㄧˋ][九|ㄐㄧㄡˇ][單|ㄉㄢ][元|ㄩㄢˊ] [分|ㄈㄣ][類|ㄌㄟˋ][整|ㄓㄥˇ][理|ㄌㄧˇ]',
    subtitle: '依顏色/形狀分類、畫記與統計表',
    description: '學習根據單一或多個特徵（顏色、形狀、種類）將物品分類，用「正」字記號或劃圈統計數量，填寫簡易統計表。',
    icon: '📊',
    themeColor: 'from-purple-500 to-indigo-600',
    manipulativeType: 'data_graph',
    keyConcepts: ['依特徵分類', '畫「正」字計數', '簡易統計表格整理'],
    learningGoals: [
      '能依顏色、形狀或功能將物品分類',
      '學會用畫圈或畫「正」字記錄次數',
      '能看懂簡易統計表並回答問題（哪種最多、相差幾個）'
    ],
    story: {
      character: '🧸 玩具整理大作戰',
      scene: '客廳地毯上散落著玩具車、積木和洋娃娃。',
      dialogue: '媽媽說：「我們先把玩具分類放進箱子，再來數數看每一種玩具有幾個！」',
      task: '動手把相同種類的玩具歸類在一起，統計數量！'
    },
    rhyme: {
      title: '分類歌',
      lines: [
        '玩具雜物排整齊，相同特徵放一起；',
        '畫個「正」字來記數，一筆一畫共五畫；',
        '填進表格看得清，分類整理好本領！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '選定分類標準',
        stepDesc: '可以按「顏色」（紅/黃/藍）分，也可以按「種類」（車子/積木/布偶）分。'
      },
      {
        stepNum: 2,
        stepTitle: '畫記不遺漏',
        stepDesc: '數一個就在紙上畫一筆，「正」字剛好有 5 筆，滿一個正字代表 5 個。'
      }
    ],
    warmup: {
      question: '用「正」字記錄水果數量，如果蘋果記了「正 ┬」（一個完整的正字再加 2 畫），代表有幾顆蘋果？',
      options: ['7 顆', '6 顆', '8 顆'],
      answerIndex: 0,
      explanation: '一個完整的「正」字是 5 畫，再加上 2 畫：5 + 2 = 7 顆！'
    }
  },

  // =========================================================================
  // 二年級上學期 (2上) - 均一標準 10 個單元 (https://www.junyiacademy.org/topics/h-m2a)
  // =========================================================================
  {
    id: 'g2-u1-num200',
    grade: 2,
    semester: 1,
    category: 'numbers',
    order: 1,
    title: '第一單元 200以內的數',
    titleBpmf: '[第|ㄉㄧˋ][一|ㄧ][單|ㄉㄢ][元|ㄩㄢˊ] 200 [以|ㄧˇ][內|ㄋㄟˋ][的|˙ㄉㄜ][數|ㄕㄨˋ]',
    subtitle: '認識百位、十位與個位，百數積木與數線',
    description: '學習 200 以內的數，認識百位定位板，10 個十換成 1 個百，掌握三位數讀寫與比大小。',
    icon: '🧱',
    themeColor: 'from-teal-400 to-emerald-500',
    manipulativeType: 'base10',
    keyConcepts: ['百位板概念', '10個十是一百', '200以內讀寫與比大小'],
    learningGoals: [
      '認識百位定位板（百位、十位、個位）',
      '能正確讀寫 101~200 的三位數',
      '能用百格板、十格條與個位粒積木表示數'
    ],
    story: {
      character: '🏰 百數積木大城堡',
      scene: '積木大師正在搭建一座 156 塊積木的城堡。',
      dialogue: '大師說：「1 塊百位大板（100）、5 條十位長條（50）和 6 顆個位顆粒（6），合起來就是 156！」',
      task: '操作百位板與十位條，組裝出 183 積木！'
    },
    rhyme: {
      title: '百位定位歌',
      lines: [
        '個位在右邊，十位在中間，百位排左邊；',
        '十個一換一個十，十個十換一個百；',
        '三位數排排坐，百十個位清清楚楚！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '認識三位數位置',
        stepDesc: '最左邊是百位、中間是十位、最右邊是個位。'
      },
      {
        stepNum: 2,
        stepTitle: '讀寫三位數',
        stepDesc: '1 個百、0 個十、8 個一，記作 108，讀作一百零八。'
      }
    ],
    warmup: {
      question: '1 個百、4 個十和 7 個一合起來是哪一個數字？',
      options: ['147', '174', '471'],
      answerIndex: 0,
      explanation: '百位寫 1，十位寫 4，個位寫 7，合起來是 147！'
    }
  },
  {
    id: 'g2-u2-add-sub-vertical',
    grade: 2,
    semester: 1,
    category: 'operations',
    order: 2,
    title: '第二單元 二位數的加減法',
    titleBpmf: '[第|ㄉㄧˋ][二|ㄦˋ][單|ㄉㄢ][元|ㄩㄢˊ] [二|ㄦˋ][位|ㄨㄟˋ][數|ㄕㄨˋ][的|˙ㄉㄜ][加|ㄐㄧㄚ][減|ㄐㄧㄢˇ][法|ㄈㄚˇ]',
    subtitle: '直式進位加法、直式借位減法算則',
    description: '掌握標準直式算則：加法個位滿十向十位進 1（頭頂寫小1）；減法個位不夠減向十位借 1 變 10（十位劃掉少1）。',
    icon: '➕',
    themeColor: 'from-orange-400 to-amber-500',
    manipulativeType: 'vertical_arithmetic',
    keyConcepts: ['直式位值對齊', '滿十進一算則', '退位借一當十算則'],
    learningGoals: [
      '熟練二位數直式進位加法的排列與計算',
      '熟練二位數直式借位減法的劃記與計算',
      '能解決生活加減運算與驗算'
    ],
    story: {
      character: '🦁 森林運動會計分板',
      scene: '紅隊 38 分加上 27 分，藍隊 52 分扣掉 18 分。',
      dialogue: '裁判說：「直式算則要對齊，個位滿十進位到十位，個位不夠減敲敲十位借一變十！」',
      task: '動手在直式算則器中，完成進位與退位的步驟操作！'
    },
    rhyme: {
      title: '直式加減歌',
      lines: [
        '直式排好隊，個位十位對齊齊；',
        '加法個位滿了十，十位頭頂加個一；',
        '減法個位不夠減，十位借一變成十！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '加法滿十進一',
        stepDesc: '38 + 27：個位 8+7=15（寫5進1），十位 3+2+1=6，答案 65。'
      },
      {
        stepNum: 2,
        stepTitle: '減法退位借一',
        stepDesc: '52 - 18：個位 2 不夠減 8，向十位借 1 變 4，12-8=4，十位 4-1=3，答案 34。'
      }
    ],
    warmup: {
      question: '計算直式加法 46 + 28，十位相加時除了 4 和 2，還要加上什麼？',
      options: ['個位進位的 1', '不需要加任何東西', '加上 10'],
      answerIndex: 0,
      explanation: '個位 6 + 8 = 14 滿十進 1，十位相加時一定要算上進位的 1！'
    }
  },
  {
    id: 'g2-u3-cm',
    grade: 2,
    semester: 1,
    category: 'measurement',
    order: 3,
    title: '第三單元 認識公分',
    titleBpmf: '[第|ㄉㄧˋ][三|ㄙㄢ][單|ㄉㄢ][元|ㄩㄢˊ] [認|ㄖㄣˋ][識|ㄕˋ][公|ㄍㄨㄥ][分|ㄈㄣ]',
    subtitle: '公分(cm)、刻度0對齊、直尺畫線與斷尺',
    description: '認識標準長度單位公分（cm），學習直尺刻度 0 對齊測量、畫出指定長度線段，以及斷尺偵探題計算。',
    icon: '📐',
    themeColor: 'from-emerald-500 to-green-600',
    manipulativeType: 'ruler',
    keyConcepts: ['1公分(cm)概念', '刻度0對齊測量', '斷尺計算（終點－起點）'],
    learningGoals: [
      '認識「公分」（記作 cm）的長度感',
      '能正確使用直尺測量長度與畫出指定長度的直線',
      '能計算斷尺或非從 0 開始的長度'
    ],
    story: {
      character: '🔍 柯南的測量筆記',
      scene: '桌上有一把斷尺正在量鉛筆長度。',
      dialogue: '柯南說：「鉛筆左邊對齊刻度 3，右邊指在刻度 11，用 11 - 3 就能算出長度是 8 公分！」',
      task: '操作虛擬直尺，對齊刻度 0 測量文具長度！'
    },
    rhyme: {
      title: '直尺量測歌',
      lines: [
        '拿好直尺平平放，刻度零對齊左端；',
        '右端停在幾就是幾公分；',
        '若是斷尺沒了零，終點減起點算長度！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '認識 1 公分',
        stepDesc: '兩個數字之間的一大格就是 1 公分（約食指指甲的寬度）。'
      },
      {
        stepNum: 2,
        stepTitle: '斷尺計算公式',
        stepDesc: '長度 ＝ 右端終點刻度 － 左端起點刻度。'
      }
    ],
    warmup: {
      question: '一把尺從刻度 4 量到刻度 12，這支彩筆有多長？',
      options: ['8 公分', '12 公分', '4 公分'],
      answerIndex: 0,
      explanation: '12 - 4 = 8，彩筆長度是 8 公分！'
    }
  },
  {
    id: 'g2-u4-app-add-sub',
    grade: 2,
    semester: 1,
    category: 'operations',
    order: 4,
    title: '第四單元 加減應用',
    titleBpmf: '[第|ㄉㄧˋ][四|ㄙˋ][單|ㄉㄢ][元|ㄩㄢˊ] [加|ㄐㄧㄚ][減|ㄐㄧㄢˇ][應|ㄧㄥˋ][用|ㄩㄥˋ]',
    subtitle: '比較問題「多多少少多少」、倒推題型',
    description: '解決生活中的加減素養題，學習用線段圖分析「誰比誰多幾元」、「原來有多少」等逆思考問題。',
    icon: '💡',
    themeColor: 'from-amber-500 to-yellow-600',
    manipulativeType: 'vertical_arithmetic',
    keyConcepts: ['多多少與少多少', '原來有多少（倒推題）', '畫線段圖解題'],
    learningGoals: [
      '能用線段圖表示兩數的差距與總和',
      '能正確列出「比多/比少」問題的算式',
      '能解決「用去...還剩下...原來有多少」的加法逆思考題'
    ],
    story: {
      character: '👛 存錢筒倒推記',
      scene: '小明買了 35 元的鉛筆盒後，存錢筒裡還剩下 48 元。',
      dialogue: '小明說：「把花掉的 35 元和剩下的 48 元加起來，算式 35 + 48 = 83，原來存錢筒有 83 元！」',
      task: '動手拖曳線段圖，分析誰多誰少！'
    },
    rhyme: {
      title: '加減應用歌',
      lines: [
        '比多比少用減法，大的減去小的數；',
        '求原來有多少，花掉加上剩下的；',
        '畫個線段比一比，題意清清楚楚明！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '求差距用減法',
        stepDesc: '哥哥有 80 元，弟弟有 55 元，哥哥比弟弟多 80 - 55 = 25 元。'
      },
      {
        stepNum: 2,
        stepTitle: '求原來用加法',
        stepDesc: '吃了 6 顆糖剩下 9 顆，原來有 6 + 9 = 15 顆。'
      }
    ],
    warmup: {
      question: '小華買早餐花了 32 元，口袋裡還剩下 28 元，小華原來有多少元？',
      options: ['60 元', '4 元', '50 元'],
      answerIndex: 0,
      explanation: '32 + 28 = 60，小華原來有 60 元！'
    }
  },
  {
    id: 'g2-u5-capacity',
    grade: 2,
    semester: 1,
    category: 'measurement',
    order: 5,
    title: '第五單元 容量',
    titleBpmf: '[第|ㄉㄧˋ][五|ㄨˇ][單|ㄉㄢ][元|ㄩㄢˊ] [容|ㄖㄨㄥˊ][量|ㄌㄧㄤˋ]',
    subtitle: '水杯容器直接比較與間接比較',
    description: '認識容器的容量，透過把水倒進相同大小的小量杯，比較兩個不同形狀的水瓶誰裝的水比較多。',
    icon: '🥛',
    themeColor: 'from-blue-400 to-cyan-500',
    manipulativeType: 'capacity_lab',
    keyConcepts: ['容量概念', '倒水直接比較', '用相同小杯間接比較'],
    learningGoals: [
      '理解容器裝滿水時的「容量」意義',
      '能用互相倒入的方法直接比較兩容器容量',
      '能用數小杯數的方法間接比較不同容器的容量'
    ],
    story: {
      character: '🥤 水果茶派對',
      scene: '高高的細水瓶和胖胖的矮水瓶在比賽誰裝的水多。',
      dialogue: '小熊說：「我們把水倒進一模一樣的小水杯裡數數看，高水瓶裝了 5 杯，胖水瓶裝了 7 杯，胖水瓶容量比較大！」',
      task: '動手把大水壺裡的水分裝到小水杯中比較！'
    },
    rhyme: {
      title: '容量比一比歌',
      lines: [
        '容器容量大與小，不能只看高和矮；',
        '倒進相同小杯子，杯數越多容量大；',
        '一杯一杯排整齊，容量大小看得清！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '高矮不代表容量',
        stepDesc: '細細高高的杯子，容量不一定比矮矮胖胖的碗大。'
      },
      {
        stepNum: 2,
        stepTitle: '量杯計數法',
        stepDesc: '用相同的小杯子分裝，裝滿較多小杯的容器容量較大。'
      }
    ],
    warmup: {
      question: '甲壺的水可以倒滿 6 杯，乙壺的水可以倒滿 9 杯（杯子大小一樣），哪一個壺的容量比較大？',
      options: ['乙壺比較大', '甲壺比較大', '一樣大'],
      answerIndex: 0,
      explanation: '乙壺能倒滿 9 杯，9 > 6，所以乙壺容量比較大！'
    }
  },
  {
    id: 'g2-u6-two-steps-add-sub',
    grade: 2,
    semester: 1,
    category: 'operations',
    order: 6,
    title: '第六單元 加減兩步驟',
    titleBpmf: '[第|ㄉㄧˋ][六|ㄌㄧㄡˋ][單|ㄉㄢ][元|ㄩㄢˊ] [加|ㄐㄧㄚ][減|ㄐㄧㄢˇ][兩|ㄌㄧㄤˇ][步|ㄅㄨˋ][驟|ㄗㄡˋ]',
    subtitle: '先加後減、連加連減兩步驟問題',
    description: '解決日常生活中的兩步驟複合運算（如公車上有人上車又有人下車），分步列式並學會綜合算式。',
    icon: '🚌',
    themeColor: 'from-orange-500 to-rose-500',
    manipulativeType: 'vertical_arithmetic',
    keyConcepts: ['連加與連減', '先加後減與先減後加', '兩步驟分步列式'],
    learningGoals: [
      '能按事情發生順序分兩步驟列式解答',
      '熟練連加（如 25+18+12）與連減（如 50-15-20）計算',
      '能解決「原有＋上車－下車＝現在」等複合情境題'
    ],
    story: {
      character: '🚌 動物小公車出發囉',
      scene: '公車上原本有 15 隻動物，到了第一站上車 8 隻，第二站下車 5 隻。',
      dialogue: '司機熊貓說：「第一步先算上車：15 + 8 = 23；第二步再算下車：23 - 5 = 18，現在車上有 18 隻動物！」',
      task: '依序操作兩步驟直式，分步求出最後答案！'
    },
    rhyme: {
      title: '兩步驟解題歌',
      lines: [
        '題目長長別心慌，分成兩步慢慢算；',
        '第一步算出來，答案帶到第二步；',
        '先加後減理路順，兩步驟題難不倒！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '第一步驟找關鍵',
        stepDesc: '先算出第一個變化的結果（如上車後共有幾人）。'
      },
      {
        stepNum: 2,
        stepTitle: '第二步驟接下去',
        stepDesc: '用第一步算出的答案，繼續進行第二個運算。'
      }
    ],
    warmup: {
      question: '公車上原有 20 人，到站後上車 5 人，又下車 3 人，現在車上有幾人？',
      options: ['22 人', '28 人', '18 人'],
      answerIndex: 0,
      explanation: '第一步 20 + 5 = 25，第二步 25 - 3 = 22 人！'
    }
  },
  {
    id: 'g2-u7-mult-part1',
    grade: 2,
    semester: 1,
    category: 'multiplication',
    order: 7,
    title: '第七單元 乘法（一）',
    titleBpmf: '[第|ㄉㄧˋ][七|ㄑㄧ][單|ㄉㄢ][元|ㄩㄢˊ] [乘|ㄔㄥˊ][法|ㄈㄚˇ]（[一|ㄧ]）',
    subtitle: '連加變乘法、2、5、4、8 口訣矩陣',
    description: '理解乘法意義「幾個幾」，認識被乘數與乘數，熟練 2、5、4、8 的乘法口訣與點陣矩陣排列。',
    icon: '✖️',
    themeColor: 'from-violet-500 to-purple-600',
    manipulativeType: 'mult_grid',
    keyConcepts: ['幾個幾的意義', '被乘數×乘數＝積', '2、5、4、8乘法口訣'],
    learningGoals: [
      '能將同數連加寫成乘法算式（如 5+5+5 = 5×3 = 15）',
      '分清被乘數（每份多少）與乘數（有幾份）',
      '熟記 2、5、4、8 九九乘法口訣'
    ],
    story: {
      character: '🐙 夜市章魚燒達人',
      scene: '一盒章魚燒有 6 顆，客人買了 4 盒。',
      dialogue: '老闆說：「4 個 6 記作 6 × 4，口訣六四二十四，總共有 24 顆章魚燒！」',
      task: '拉動九九乘法矩陣點陣圖，觀察乘法點點的倍數擴展！'
    },
    rhyme: {
      title: '乘法好幫手歌',
      lines: [
        '同數連加變乘法，幾個幾來算得快；',
        '每份數量排前面，有幾份來排後面；',
        '二五一十、四八三十二，乘法口訣記心懷！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '連加轉乘法',
        stepDesc: '4 + 4 + 4 是 3 個 4，記作 4 × 3 = 12。'
      },
      {
        stepNum: 2,
        stepTitle: '被乘數與乘數',
        stepDesc: '4（每盤個數）是被乘數，3（盤數）是乘數，12 是積。'
      }
    ],
    warmup: {
      question: '一隻青蛙有 4 條腿，6 隻青蛙一共有幾條腿？乘法算式怎麼寫？',
      options: ['4 × 6 = 24', '4 + 6 = 10', '6 × 4 = 24（被乘數位置相反）'],
      answerIndex: 0,
      explanation: '每隻有 4 條腿（被乘數），共有 6 隻（乘數），記作 4 × 6 = 24 條腿！'
    }
  },
  {
    id: 'g2-u8-time-detail',
    grade: 2,
    semester: 1,
    category: 'measurement',
    order: 8,
    title: '第八單元 時間（幾點幾分）',
    titleBpmf: '[第|ㄉㄧˋ][八|ㄅㄚ][單|ㄉㄢ][元|ㄩㄢˊ] [時|ㄕˊ][間|ㄐㄧㄢ]（[幾|ㄐㄧˇ][點|ㄉㄧㄢˇ][幾|ㄐㄧˇ][分|ㄈㄣ]）',
    subtitle: '一大格5分鐘、經過時間計算',
    description: '鐘面上有 12 大格與 60 小格，分針走 1 大格是 5 分鐘，學習精確判讀時間與計算活動經過時間。',
    icon: '⏱️',
    themeColor: 'from-cyan-500 to-blue-600',
    manipulativeType: 'clock',
    keyConcepts: ['一大格5分鐘', '1小時=60分鐘', '開始時間+經過時間=結束時間'],
    learningGoals: [
      '能以 5 分鐘為單位讀出幾點幾分（如 3:25）',
      '理解分針走一圈是 60 分鐘＝1 小時',
      '能計算簡單的經過時間生活問題'
    ],
    story: {
      character: '🚂 森林小火車時刻表',
      scene: '火車 2 點 10 分發車，行駛 25 分鐘抵達彩虹站。',
      dialogue: '列車長說：「分針指在 2 是 10 分，再走 25 分鐘（5大格），指在 7 就是 35 分，抵達時間是 2 點 35 分！」',
      task: '撥動時鐘分針，觀察分針每走一大格等於 5 分鐘！'
    },
    rhyme: {
      title: '看分針口訣',
      lines: [
        '分針走一大格是五分鐘，五個五個數分針：',
        '指 1 是五分、指 2 是十分，',
        '指到 6 就是三十分，時針過了幾就是幾點鐘！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '分針五的乘法',
        stepDesc: '分針指在數字幾，就乘以 5（如指在 7，7 × 5 = 35 分）。'
      },
      {
        stepNum: 2,
        stepTitle: '計算經過時間',
        stepDesc: '4 點 15 分開始看書，看了 30 分鐘，結束是 4 點 45 分。'
      }
    ],
    warmup: {
      question: '時針剛走過 4 還沒到 5，分針指在數字 7 上，現在是幾點幾分？',
      options: ['4 點 35 分', '5 點 35 分', '4 點 7 分'],
      answerIndex: 0,
      explanation: '時針剛過 4 是 4 點，分針指在 7 是 7 × 5 = 35 分，所以是 4 點 35 分！'
    }
  },
  {
    id: 'g2-u9-mult-part2',
    grade: 2,
    semester: 1,
    category: 'multiplication',
    order: 9,
    title: '第九單元 乘法（二）',
    titleBpmf: '[第|ㄉㄧˋ][九|ㄐㄧㄡˇ][單|ㄉㄢ][元|ㄩㄢˊ] [乘|ㄔㄥˊ][法|ㄈㄚˇ]（[二|ㄦˋ]）',
    subtitle: '3、6、9、7 乘法與 0、1 乘法特性',
    description: '完成九九乘法表全圖拼圖！熟記 3、6、9、7 口訣，理解 0 乘以任何數都是 0、1 乘以任何數都是原本的數。',
    icon: '✖️',
    themeColor: 'from-purple-600 to-pink-600',
    manipulativeType: 'mult_grid',
    keyConcepts: ['3/6/9/7乘法口訣', '0和1的乘法特性', '九九乘法表全表精熟'],
    learningGoals: [
      '熟練背誦 3、6、9、7 的乘法口訣',
      '理解 0×任何數＝0，1×任何數＝原本數',
      '能靈活運用乘法解決生活多樣問題'
    ],
    story: {
      character: '🧙‍♂️ 乘法魔法學院',
      scene: '魔法師正在調配 9 顆星的魔法藥水。',
      dialogue: '魔法師說：「口訣七九六十三，九個星陣乘上七倍就是六十三點魔法能量！」',
      task: '在九九乘法表點陣中點擊不同倍數，挑戰心算速度！'
    },
    rhyme: {
      title: '九九乘法大總結歌',
      lines: [
        '三六九七連珠砲，三三得九六六三十六；',
        '七七四十九、九九八十一；',
        '零乘任何數都是零，一乘任何數不改變！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '乘法交換律概念',
        stepDesc: '3 × 6 和 6 × 3 算出來的總數都是 18。'
      },
      {
        stepNum: 2,
        stepTitle: '0 的神奇魔法',
        stepDesc: '0 個盤子每盤 5 顆，或是 5 個盤子每盤 0 顆，總共都是 0 顆。'
      }
    ],
    warmup: {
      question: '算算看：0 × 8 ＝ ？',
      options: ['0', '8', '80'],
      answerIndex: 0,
      explanation: '0 乘以任何數字，結果都是 0！'
    }
  },
  {
    id: 'g2-u10-area-compare',
    grade: 2,
    semester: 1,
    category: 'geometry',
    order: 10,
    title: '第十單元 面的大小比較',
    titleBpmf: '[第|ㄉㄧˋ][十|ㄕˊ][單|ㄉㄢ][元|ㄩㄢˊ] [面|ㄇㄧㄢˋ][的|˙ㄉㄜ][大|ㄉㄚˋ][小|ㄒㄧㄠˇ][比|ㄅㄧˇ][較|ㄐㄧㄠˋ]',
    subtitle: '直接重疊、方格覆蓋比較面積大小',
    description: '認識平面圖形「面」的概念，學習將兩張色紙重疊比大小，或用相同小方格鋪滿計算方格數（面積初步）。',
    icon: '🟩',
    themeColor: 'from-emerald-500 to-green-600',
    manipulativeType: 'area_grid',
    keyConcepts: ['面的概念', '重疊直接比較', '方格覆蓋間接比較'],
    learningGoals: [
      '能分辨周長（線）與面積（面）的差別',
      '能將兩平面圖形重疊比較面的大小',
      '能透過數方格個數比較面的大小'
    ],
    story: {
      character: '🎨 色紙拼貼畫大賽',
      scene: '小貓和小狗在比誰剪出來的色紙面比較大。',
      dialogue: '評審說：「把兩張色紙疊在一起，多出來露在外面的一張，面就比較大！」',
      task: '動手拖曳方格覆蓋在色紙上，數數看一共佔了幾格！'
    },
    rhyme: {
      title: '比面積歌',
      lines: [
        '面的大小比一比，重疊對齊看分明；',
        '無法重疊數格子，方格數量代表面；',
        '格子越多面越大，我是面積小行家！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '重疊法',
        stepDesc: '把圖形 A 放在圖形 B 上面，若圖形 B 還露出邊緣，表示 B 的面比 A 大。'
      },
      {
        stepNum: 2,
        stepTitle: '數方格法',
        stepDesc: '圖形甲佔了 12 個方格，圖形乙佔了 9 個方格，甲的面比乙大。'
      }
    ],
    warmup: {
      question: '紅色彩紙鋪滿了 15 個小方格，藍色彩紙鋪滿了 18 個小方格，哪一張彩紙的面比較大？',
      options: ['藍色彩紙比較大', '紅色彩紙比較大', '一樣大'],
      answerIndex: 0,
      explanation: '18 個方格比 15 個多，所以藍色彩紙的面比較大！'
    }
  },

  // =========================================================================
  // 二年級下學期 (2下) - 均一標準 10 個單元 (https://www.junyiacademy.org/topics/h-m2a)
  // =========================================================================
  {
    id: 'g2-s2-u2-three-digit-add-sub',
    grade: 2,
    semester: 2,
    category: 'operations',
    order: 2,
    title: '第二單元 三位數的加減法',
    titleBpmf: '[第|ㄉㄧˋ][二|ㄦˋ][單|ㄉㄢ][元|ㄩㄢˊ] [三|ㄙㄢ][位|ㄨㄟˋ][數|ㄕㄨˋ][的|˙ㄉㄜ][加|ㄐㄧㄚ][減|ㄐㄧㄢˇ][法|ㄈㄚˇ]',
    subtitle: '三位數直式加減（含進位與退位）',
    description: '將二位數加減法延伸到三位數，學習百位、十位、個位的進位與退位計算，使用直式標準算則。',
    icon: '🔢',
    themeColor: 'from-indigo-400 to-blue-500',
    manipulativeType: 'vertical_arithmetic',
    keyConcepts: ['三位數直式加法（進位）', '三位數直式減法（退位）', '檢驗加減互逆關係'],
    learningGoals: [
      '能利用直式算則進行三位數的加法（含百位進位）',
      '能利用直式算則進行三位數的減法（含百位退位）',
      '能驗算加減計算結果的合理性'
    ],
    story: {
      character: '🏪 文具店收銀機',
      scene: '文具店老闆在算今天的收入和支出。',
      dialogue: '老闆說：「上午賣了 356 元，下午又賣了 275 元，一天共賺多少元呢？」',
      task: '幫老闆操作直式算出三位數加減法的答案！'
    },
    rhyme: {
      title: '三位數加減歌',
      lines: [
        '個位對個位，十位對十位，百位對百位；',
        '加法滿十進一位，減法不夠向前借；',
        '借來十個還給個，直式計算不出錯！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '三位數直式加法',
        stepDesc: '356 + 275：個位 6+5=11，寫 1 進 1；十位 5+7+1=13，寫 3 進 1；百位 3+2+1=6。答案 631。'
      },
      {
        stepNum: 2,
        stepTitle: '三位數直式減法',
        stepDesc: '423 - 186：個位 3 不夠減 6，借 10 變 13-6=7；十位 1 不夠減 8，再借 10，11-8=3；百位 4-1-1=2。答案 237。'
      }
    ],
    warmup: {
      question: '直式算 247 + 158，個位 7+8=15，個位寫 5，向十位進多少？',
      options: ['進 1', '進 5', '不進位'],
      answerIndex: 0,
      explanation: '個位 7+8=15，超過 10，寫 5 並向十位進 1！'
    }
  },
  {
    id: 'g2-s2-u3-multiply-applications',
    grade: 2,
    semester: 2,
    category: 'multiplication',
    order: 3,
    title: '第三單元 乘法應用',
    titleBpmf: '[第|ㄉㄧˋ][三|ㄙㄢ][單|ㄉㄢ][元|ㄩㄢˊ] [乘|ㄔㄥˊ][法|ㄈㄚˇ][應|ㄧㄥ][用|ㄩㄥˋ]',
    subtitle: '乘法文字題、連加改乘與生活應用',
    description: '運用二上學習的九九乘法，解決生活中的乘法應用問題，包含比較型、倍數型與多步驟乘法情境。',
    icon: '✖️',
    themeColor: 'from-orange-400 to-red-500',
    manipulativeType: 'mult_grid',
    keyConcepts: ['乘法文字應用', '倍數關係（是...的幾倍）', '乘加混合計算'],
    learningGoals: [
      '能運用九九乘法解決生活情境問題',
      '能判斷哪種情境可用乘法計算',
      '能解讀「是...的幾倍」的倍數關係'
    ],
    story: {
      character: '🛒 超市特賣日',
      scene: '超市舉辦每排放 6 個共 8 排的蘋果堆疊大賽。',
      dialogue: '超市員工說：「每排 6 顆蘋果，放了 8 排，共有幾顆蘋果呢？」',
      task: '用九九乘法表找出正確答案！'
    },
    rhyme: {
      title: '乘法應用歌',
      lines: [
        '幾個幾個加起來，可以換成乘法算；',
        '是誰的幾倍表示多，乘法幫忙快又準；',
        '生活處處用乘法，九九表格要記牢！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '倍數型題目',
        stepDesc: '小明存了 24 元，小華存的是小明的 3 倍，小華存了 24 × 3 = 72 元。'
      },
      {
        stepNum: 2,
        stepTitle: '連加改乘法',
        stepDesc: '8 + 8 + 8 + 8 + 8 = 5 個 8 = 8 × 5 = 40。乘法比連加快多了！'
      }
    ],
    warmup: {
      question: '小明跳繩每次跳 9 下，跳了 7 次共跳幾下？',
      options: ['63 下', '54 下', '72 下'],
      answerIndex: 0,
      explanation: '9 × 7 = 63 下！九七六十三！'
    }
  },
  {
    id: 'g2-s2-u4-weight',
    grade: 2,
    semester: 2,
    category: 'measurement',
    order: 4,
    title: '第四單元 重量',
    titleBpmf: '[第|ㄉㄧˋ][四|ㄙˋ][單|ㄉㄢ][元|ㄩㄢˊ] [重|ㄓㄨㄥˋ][量|ㄌㄧㄤˋ]',
    subtitle: '輕重比較、公克(g)、公斤(kg)與天平',
    description: '學習用天平比較輕重，認識重量單位「公克(g)」與「公斤(kg)」，掌握 1 公斤 = 1000 公克的換算關係。',
    icon: '⚖️',
    themeColor: 'from-teal-400 to-cyan-500',
    manipulativeType: 'balance_scale',
    keyConcepts: ['公克(g)與公斤(kg)', '1公斤=1000公克', '天平平衡比重量'],
    learningGoals: [
      '認識重量單位公克（g）與公斤（kg）',
      '理解 1 公斤 = 1000 公克的換算',
      '能估測生活物品的重量（如一顆蘋果約 200g）'
    ],
    story: {
      character: '🍎 果園秤重比賽',
      scene: '果農用磅秤比較哪一箱水果比較重。',
      dialogue: '果農說：「1 公斤的蘋果比 800 公克的橘子重，因為 1 公斤 = 1000 公克！」',
      task: '動手操作天平，比較不同水果的重量！'
    },
    rhyme: {
      title: '重量換算歌',
      lines: [
        '輕輕羽毛飛上天，重重鉛球沉入底；',
        '公克測量小東西，公斤測量大物品；',
        '一千公克一公斤，換算簡單記心裡！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '認識公克',
        stepDesc: '一元硬幣大約重 3.5 公克，一塊橡皮擦約 10 公克，用「g」記錄。'
      },
      {
        stepNum: 2,
        stepTitle: '1公斤=1000公克',
        stepDesc: '一瓶 600ml 礦泉水約重 600 公克，不足 1 公斤（1000 公克）。'
      }
    ],
    warmup: {
      question: '1 公斤等於多少公克？',
      options: ['1000 公克', '100 公克', '10 公克'],
      answerIndex: 0,
      explanation: '1 公斤 = 1000 公克！'
    }
  },
  {
    id: 'g2-s2-u5-time-calendar',
    grade: 2,
    semester: 2,
    category: 'measurement',
    order: 5,
    title: '第五單元 時間日曆',
    titleBpmf: '[第|ㄉㄧˋ][五|ㄨˇ][單|ㄉㄢ][元|ㄩㄢˊ] [時|ㄕˊ][間|ㄐㄧㄢ][日|ㄖˋ][曆|ㄌㄧˋ]',
    subtitle: '月份天數、日曆閱讀與時間計算',
    description: '深入學習月份天數（大月31天、小月30天、2月28天），以及日期計算與跨日時間問題。',
    icon: '📅',
    themeColor: 'from-violet-400 to-purple-500',
    manipulativeType: 'calendar_lab',
    keyConcepts: ['大月小月與2月', '日曆閱讀', '跨日時間計算'],
    learningGoals: [
      '能記住各月份天數（大月31天、小月30天）',
      '能在日曆上找到指定的日期與星期',
      '能計算跨日或跨月的時間間隔'
    ],
    story: {
      character: '📆 生日倒數計時器',
      scene: '小明在日曆上數著距離生日還有幾天。',
      dialogue: '媽媽說：「今天是 3 月 18 日，生日是 4 月 6 日，再等幾天就到囉！」',
      task: '在日曆上數出間隔天數，計算還有幾天到生日！'
    },
    rhyme: {
      title: '月份歌',
      lines: [
        '一三五七八十十二，這些月份有三十一；',
        '四六九十一月份，各有三十天整齊；',
        '二月特別只二十八，閏年二月二十九！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '大月與小月',
        stepDesc: '1、3、5、7、8、10、12 月有 31 天（大月）；4、6、9、11 月有 30 天（小月）；2 月通常有 28 天。'
      },
      {
        stepNum: 2,
        stepTitle: '計算間隔天數',
        stepDesc: '從 3 月 18 日到 4 月 6 日：3 月 18 到 31 日還有 13 天，4 月 1 到 6 日有 6 天，共 19 天。'
      }
    ],
    warmup: {
      question: '5 月有幾天？',
      options: ['31 天', '30 天', '28 天'],
      answerIndex: 0,
      explanation: '5 月是大月，有 31 天！'
    }
  },
  {
    id: 'g2-s2-u7-add-sub-estimate',
    grade: 2,
    semester: 2,
    category: 'operations',
    order: 7,
    title: '第七單元 加減估算',
    titleBpmf: '[第|ㄉㄧˋ][七|ㄑㄧ][單|ㄉㄢ][元|ㄩㄢˊ] [加|ㄐㄧㄚ][減|ㄐㄧㄢˇ][估|ㄍㄨ][算|ㄙㄨㄢˋ]',
    subtitle: '四捨五入與大數加減估算',
    description: '學習用「四捨五入」取近似值，估算三位數加減的大約答案，培養數感與估算能力。',
    icon: '🎯',
    themeColor: 'from-sky-400 to-blue-500',
    manipulativeType: 'base10',
    keyConcepts: ['四捨五入', '估算概念', '估算與精算的比較'],
    learningGoals: [
      '能用四捨五入將數字取近似值（到十位或百位）',
      '能利用估算判斷答案的合理範圍',
      '能比較估算值與精算值的差異'
    ],
    story: {
      character: '🛒 超市購物估算',
      scene: '小美推著購物車，邊走邊估算購物金額。',
      dialogue: '小美說：「麵包 28 元大約是 30 元，果汁 45 元大約是 50 元，一共大約 80 元！」',
      task: '用估算判斷帶的錢夠不夠買東西！'
    },
    rhyme: {
      title: '四捨五入歌',
      lines: [
        '個位 0 到 4，往下捨去變整十；',
        '個位 5 到 9，往上進入加一十；',
        '估算結果差不多，生活購物真方便！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '四捨五入到十位',
        stepDesc: '47 → 看個位 7 大於等於 5，進位 → 50；43 → 看個位 3 小於 5，捨去 → 40。'
      },
      {
        stepNum: 2,
        stepTitle: '估算應用',
        stepDesc: '352 + 468，用估算：350 + 470 = 820，精算 = 820，兩者相近！'
      }
    ],
    warmup: {
      question: '用四捨五入法，把 76 四捨五入到十位是多少？',
      options: ['80', '70', '75'],
      answerIndex: 0,
      explanation: '76 的個位是 6，大於等於 5，向上進位，結果是 80！'
    }
  },
  {
    id: 'g2-s2-u8-data-graph',
    grade: 2,
    semester: 2,
    category: 'numbers',
    order: 8,
    title: '第八單元 資料整理',
    titleBpmf: '[第|ㄉㄧˋ][八|ㄅㄚ][單|ㄉㄢ][元|ㄩㄢˊ] [資|ㄗ][料|ㄌㄧㄠˋ][整|ㄓㄥˇ][理|ㄌㄧˇ]',
    subtitle: '統計圖表閱讀與簡單資料分析',
    description: '學習閱讀長條圖、象形圖與統計表，從圖表中找出最多、最少、差額等資訊，進行簡單資料分析。',
    icon: '📊',
    themeColor: 'from-emerald-400 to-teal-500',
    manipulativeType: 'data_graph',
    keyConcepts: ['長條圖閱讀', '統計表整理', '資料的最大最小與差額'],
    learningGoals: [
      '能閱讀長條圖，找出各類別的數量',
      '能整理資料到統計表中',
      '能計算資料中的最多、最少與差額'
    ],
    story: {
      character: '📊 班級投票統計員',
      scene: '班長統計全班最喜歡的水果，用長條圖展示結果。',
      dialogue: '班長說：「草莓 18 票、西瓜 12 票、芒果 15 票，最受歡迎的是草莓！」',
      task: '閱讀長條圖，回答老師的問題！'
    },
    rhyme: {
      title: '統計圖表歌',
      lines: [
        '數數票數看格子，長條越高數量多；',
        '最多最少找差額，用減法算差幾個；',
        '統計圖表告訴我，資料分析真有趣！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '讀長條圖',
        stepDesc: '先看橫軸（類別）和縱軸（數量），找到每個類別的長條高度即是數量。'
      },
      {
        stepNum: 2,
        stepTitle: '計算差額',
        stepDesc: '草莓 18 票，西瓜 12 票，差額 = 18 - 12 = 6 票，草莓比西瓜多 6 票。'
      }
    ],
    warmup: {
      question: '長條圖中草莓有 18 票、西瓜有 12 票，草莓比西瓜多幾票？',
      options: ['6 票', '8 票', '30 票'],
      answerIndex: 0,
      explanation: '18 - 12 = 6 票，草莓比西瓜多 6 票！'
    }
  },
  {
    id: 'g2-s2-u9-geometry2d',
    grade: 2,
    semester: 2,
    category: 'geometry',
    order: 9,
    title: '第九單元 平面圖形',
    titleBpmf: '[第|ㄉㄧˋ][九|ㄐㄧㄡˇ][單|ㄉㄢ][元|ㄩㄢˊ] [平|ㄆㄧㄥˊ][面|ㄇㄧㄢˋ][圖|ㄊㄨˊ][形|ㄒㄧㄥˊ]',
    subtitle: '角的認識、正三角形與正多邊形',
    description: '認識角的概念（大於/等於/小於直角），以及正三角形、長方形、正方形的特徵，學習圖形拼貼的規律。',
    icon: '🔺',
    themeColor: 'from-amber-400 to-yellow-500',
    manipulativeType: 'shape_lab',
    keyConcepts: ['直角概念', '三角形與四邊形特徵', '圖形拼貼規律'],
    learningGoals: [
      '能辨別直角、銳角、鈍角的大小',
      '能說明正三角形、長方形、正方形的邊角特徵',
      '能用基本圖形拼出複合圖形'
    ],
    story: {
      character: '🔺 幾何形狀設計師',
      scene: '設計師用各種平面圖形設計美麗的拼貼壁紙。',
      dialogue: '設計師說：「四個正三角形可以拼成一個大正三角形！」',
      task: '用積木圖形拼出美麗的幾何圖案！'
    },
    rhyme: {
      title: '圖形特徵歌',
      lines: [
        '三角形有三個角，三條邊三個頂點；',
        '正方形四邊等長，四個角都是直角；',
        '長方形對邊等長，四個角都是直角！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '認識角的大小',
        stepDesc: '用三角板的直角（90°）比較：角比直角小是銳角，角比直角大是鈍角。'
      },
      {
        stepNum: 2,
        stepTitle: '正三角形特徵',
        stepDesc: '正三角形三條邊一樣長，三個角也一樣大（各 60°）。'
      }
    ],
    warmup: {
      question: '正方形有幾個角？每個角是什麼角？',
      options: ['4 個直角', '3 個銳角', '4 個鈍角'],
      answerIndex: 0,
      explanation: '正方形有 4 個角，而且每個角都是直角（90°）！'
    }
  },
  // 二年級下學期 第一單元（錢幣與千位數）
  {
    id: 'g2-u11-num1000',
    grade: 2,
    semester: 2,
    category: 'numbers',
    order: 1,
    title: '第一單元 1000以內的數',
    titleBpmf: '[第|ㄉㄧˋ][一|ㄧ][單|ㄉㄢ][元|ㄩㄢˊ] 1000 [以|ㄧˇ][內|ㄋㄟˋ][的|˙ㄉㄜ][數|ㄕㄨˋ]',
    subtitle: '千位定位板、100元鈔票與錢幣換算',
    description: '認識 1000 以內的數與紅色 100 元鈔票，掌握 10 個百是一千，熟練三位數大小比較與千位換算。',
    icon: '💵',
    themeColor: 'from-red-500 to-rose-600',
    manipulativeType: 'coins',
    keyConcepts: ['千位定位板', '10個百是一千', '100元鈔票換算'],
    learningGoals: [
      '認識千位定位板（千位、百位、十位、個位）',
      '理解 10 個 100 元是一千元',
      '熟練 1000 以內三位數的比大小與讀寫'
    ],
    story: {
      character: '👛 存錢大富翁',
      scene: '小明把過年存下的 10 張 100 元大鈔排在桌上。',
      dialogue: '爸爸說：「10 張 100 元剛好可以換成 1 張千元大鈔，讀作一千元！」',
      task: '在收銀機模擬器中操作 100 元鈔票與銅板，練習大額換幣！'
    },
    rhyme: {
      title: '千位定位歌',
      lines: [
        '個十百千四兄弟，個位右邊千位左；',
        '十個一百成一千，一千記作一零零零；',
        '數到一千真高興，數學本領步步高！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '千位定位板',
        stepDesc: '3 個百、5 個十和 8 個一，記作 358，讀作三百五十八。'
      },
      {
        stepNum: 2,
        stepTitle: '比大小看百位',
        stepDesc: '比較 420 和 390：4 個百比 3 個百多，所以 420 > 390。'
      }
    ],
    warmup: {
      question: '5 個百、0 個十和 9 個一合起來是哪一個數字？',
      options: ['509', '590', '59'],
      answerIndex: 0,
      explanation: '百位 5、十位 0、個位 9，合起來是 509！'
    }
  },
  {
    id: 'g2-u12-meter-cm',
    grade: 2,
    semester: 2,
    category: 'measurement',
    order: 6,
    title: '第六單元 公尺與公分',
    titleBpmf: '[第|ㄉㄧˋ][六|ㄌㄧㄡˋ][單|ㄉㄢ][元|ㄩㄢˊ] [公|ㄍㄨㄥ][尺|ㄔˇ][與|ㄩˇ][公|ㄍㄨㄥ][分|ㄈㄣ]',
    subtitle: '1公尺(m)=100公分(cm)、長度換算與加減',
    description: '認識較長長度單位「公尺」（m），掌握 1 公尺 ＝ 100 公分，學習教室黑板、身高與跑步距離的換算。',
    icon: '📏',
    themeColor: 'from-emerald-500 to-teal-600',
    manipulativeType: 'ruler',
    keyConcepts: ['1公尺(m)=100公分(cm)', '長度單位換算', '公尺與公分加減'],
    learningGoals: [
      '認識長度單位「公尺」（記作 m）',
      '熟練公尺與公分的等值換算（如 1m 20cm = 120cm）',
      '能估測生活長度（如黑板長約 3 公尺）'
    ],
    story: {
      character: '🦒 量測體育館跑道',
      scene: '長頸鹿老師拿著 1 公尺大木尺量跳遠沙坑。',
      dialogue: '老師說：「1 公尺剛好是 100 公分！跳了 1 公尺 30 公分，就是 130 公分！」',
      task: '動手把公尺與公分進行換算，計算長度相加！'
    },
    rhyme: {
      title: '公尺公分歌',
      lines: [
        '一公尺，一百公分，伸開雙臂差不多；',
        '短的長度用公分，長的距離用公尺；',
        '一公尺加五十公分，等於一百五十公分！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '1公尺的長度感',
        stepDesc: '1 公尺是 100 個 1 公分連起來，大約是小學生張開雙臂的長度。'
      },
      {
        stepNum: 2,
        stepTitle: '複名數換算',
        stepDesc: '2 公尺 45 公分 ＝ 200 公分 ＋ 45 公分 ＝ 245 公分。'
      }
    ],
    warmup: {
      question: '小華身高 1 公尺 28 公分，換算成「公分」是多少公分？',
      options: ['128 公分', '1028 公分', '28 公分'],
      answerIndex: 0,
      explanation: '1 公尺 = 100 公分，100 + 28 = 128 公分！'
    }
  },
  {
    id: 'g2-u13-fraction-intro',
    grade: 2,
    semester: 2,
    category: 'numbers',
    order: 10,
    title: '第十單元 認識分數',
    titleBpmf: '[第|ㄉㄧˋ][十|ㄕˊ][單|ㄉㄢ][元|ㄩㄢˊ] [認|ㄖㄣˋ][識|ㄕˋ][分|ㄈㄣ][數|ㄕㄨˋ]',
    subtitle: '平分、二分之一、四分之一',
    description: '從分蛋糕、切披薩體驗「平分」（每一份一樣大），認識二分之一、四分之一等幾分之幾的分數概念。',
    icon: '🍕',
    themeColor: 'from-amber-500 to-orange-600',
    manipulativeType: 'fraction_pie',
    keyConcepts: ['平分概念（一樣大）', '幾分之一的讀寫', '分子與分母初步'],
    learningGoals: [
      '理解「平分」是分成大小一樣的份數',
      '能認識 1/2（二分之一）、1/4（四分之一）的具體意義',
      '能塗色表示一個圖形的幾分之幾'
    ],
    story: {
      character: '🍕 披薩派對平分樂',
      scene: '一張大披薩切成大小一樣的 4 塊。',
      dialogue: '廚師說：「平分成 4 塊，其中的 1 塊叫做四分之一，記作 1/4！」',
      task: '動手把圓形或正方形平分成 2 份或 4 份！'
    },
    rhyme: {
      title: '分數兒歌',
      lines: [
        '分薄餅，平分它，每塊都要一樣大；',
        '平分兩份叫二分之一，平分四份叫四分之一；',
        '橫線上面寫一份，橫線下面寫總份！'
      ]
    },
    lessonSteps: [
      {
        stepNum: 1,
        stepTitle: '一定要「平分」',
        stepDesc: '只有每一塊大小一模一樣，才能叫二分之一或四分之一。'
      },
      {
        stepNum: 2,
        stepTitle: '認識分數記法',
        stepDesc: '下面寫平分成幾份（分母），上面寫拿了幾份（分子）。'
      }
    ],
    warmup: {
      question: '把一個圓形蛋糕平分成 2 塊，其中的 1 塊是全部的多少？',
      options: ['二分之一（1/2）', '四分之一（1/4）', '2 塊'],
      answerIndex: 0,
      explanation: '平分成 2 份中的 1 份，讀作二分之一，記作 1/2！'
    }
  }
];
