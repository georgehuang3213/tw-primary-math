import { ChineseLesson } from '../types';

export const HANLIN_G2_S2_CHINESE: ChineseLesson[] = [
  {
    id: 'hl-g2-s2-u1-seed',
    order: 1,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第一課：種子旅行真奇妙',
    titleBpmf: 'ㄉㄧˋ ㄧ ㄎㄜˋ ： ㄓㄨㄥˇ ㄗ˙ ㄌㄩˇ ㄒㄧㄥˊ ㄓㄣ ㄑㄧˊ ㄇㄧㄠˋ',
    subtitle: '乘著微風乘著水，搭乘動物去旅行',
    icon: '🌾',
    themeColor: 'from-amber-400 to-emerald-500',
    summary: '介紹蒲公英乘風、椰子隨水漂流、鬼針草搭動物便車等大自然植物種子的傳播智慧。',
    contentLines: [
      '植物媽媽真有辦法，',
      '送給種子奇妙的旅行裝備。',
      '蒲公英戴上小降落傘，乘著微風飛向遠方；',
      '椰子穿上不怕水的厚外衣，順著海浪去流浪；',
      '鬼針草長出小鉤子，悄悄勾在動物的皮毛上。',
      '種子們四處旅行，在新的土地上生根發芽！'
    ],
    contentAudioText: '植物媽媽真有辦法，送給種子奇妙的旅行裝備。蒲公英戴上小降落傘，乘著微風飛向遠方；椰子穿上不怕水的厚外衣，順著海浪去流浪；鬼針草長出小鉤子，悄悄勾在動物的皮毛上。種子們四處旅行，在新的土地上生根發芽！',
    vocabularies: [
      { char: '旅', bpmf: 'ㄌㄩˇ', radical: '方', strokeCount: 10, words: ['旅行', '旅遊', '旅客'], mnemonic: '方人氏，結伴外出遠行' },
      { char: '妙', bpmf: 'ㄇㄧㄠˋ', radical: '女', strokeCount: 7, words: ['奇妙', '巧妙', '絕妙'], mnemonic: '女字旁加「少」，精妙無比之境' },
      { char: '降', bpmf: 'ㄐㄧㄤˋ', radical: '阜（阝）', strokeCount: 10, words: ['降落', '下降', '降雨'], mnemonic: '左耳旁加「夅」，自高處徐徐落下' },
      { char: '鉤', bpmf: 'ㄍㄡ', radical: '金', strokeCount: 13, words: ['鉤子', '魚鉤', '掛鉤'], mnemonic: '金字旁加「勾」，彎曲能懸物之金屬' }
    ],
    questions: [
      {
        id: 'hl-s2-q1-1',
        type: 'word',
        title: '植物科學常識',
        prompt: '課文中提到哪一種植物種子像戴著「小降落傘」乘風飛行？',
        options: ['蒲公英', '椰子', '鬼針草', '西瓜'],
        answer: '蒲公英',
        explanation: '蒲公英種子上方帶有白色冠毛，就像降落傘能乘風遠播！'
      },
      {
        id: 'hl-s2-q1-2',
        type: 'sentence',
        title: '種子傳播途徑',
        prompt: '「鬼針草」是利用什麼方式進行長途旅行的呢？',
        options: ['利用小鉤子黏在動物或人的身上', '自己長出輪子跑', '用火箭發射', '挖地洞鑽過去'],
        answer: '利用小鉤子黏在動物或人的身上',
        explanation: '鬼針草果實頂端有倒鉤刺，容易附著在動物皮毛或衣物上！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u2-trip',
    order: 2,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第二課：第一次去旅行',
    titleBpmf: 'ㄉㄧˋ ㄦˋ ㄎㄜˋ ： ㄉㄧˋ ㄧ ㄘˋ ㄑㄩˋ ㄌㄩˇ ㄒㄧㄥˊ',
    subtitle: '揹起小背包，探索未知大世界',
    icon: '🎒',
    themeColor: 'from-sky-400 to-blue-500',
    summary: '記錄孩子第一次自己整理行囊、踏上戶外旅程的興奮與成長，體會獨立自主的成就感。',
    contentLines: [
      '這是我第一次自己去旅行！',
      '前一天晚上，我把水壺、雨傘和手冊整齊收進背包。',
      '坐上火車，窗外的稻田像綠色波浪向後跑。',
      '來到陌生的小鎮，看見新奇的花草與古老的房子，',
      '心中雖然有點緊張，但更多的是雀躍與期待。',
      '世界好大好美，我長大了！'
    ],
    contentAudioText: '這是我第一次自己去旅行！前一天晚上，我把水壺、雨傘和手冊整齊收進背包。坐上火車，窗外的稻田像綠色波浪向後跑。來到陌生的小鎮，看見新奇的花草與古老的房子，心中雖然有點緊張，但更多的是雀躍與期待。世界好大好美，我長大了！',
    vocabularies: [
      { char: '揹', bpmf: 'ㄅㄟ', radical: '手（扌）', strokeCount: 12, words: ['揹包', '揹著'], mnemonic: '提手旁加「背」，負物於脊背' },
      { char: '整', bpmf: 'ㄓㄥˇ', radical: '攴（攵）', strokeCount: 16, words: ['整齊', '整理', '整潔'], mnemonic: '束負攴正，整齊劃一' },
      { char: '鎮', bpmf: 'ㄓㄣˋ', radical: '金', strokeCount: 18, words: ['小鎮', '市鎮', '村鎮'], mnemonic: '金字旁加「真」，安定聚集之地' },
      { char: '雀', bpmf: 'ㄑㄩㄝˋ', radical: '隹', strokeCount: 11, words: ['雀躍', '麻雀', '歡雀'], mnemonic: '小鳥跳躍之態，引申為興奮欣喜' }
    ],
    questions: [
      {
        id: 'hl-s2-q2-1',
        type: 'word',
        title: '成語情緒體會',
        prompt: '「歡欣雀躍」中的「雀躍」，形容人表現出怎樣的情態？',
        options: ['像小鳥般興奮跳躍，極度高興', '很害怕躲起來', '躺在地上大哭', '非常生氣'],
        answer: '像小鳥般興奮跳躍，極度高興',
        explanation: '「雀躍」比喻像麻雀跳躍般歡欣鼓舞！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u3-adventure',
    order: 3,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第三課：不怕去探險',
    titleBpmf: 'ㄉㄧˋ ㄙㄢ ㄎㄜˋ ： ㄅㄨˋ ㄆㄚˋ ㄑㄩˋ ㄊㄢˋ ㄒㄧㄢˇ',
    subtitle: '鼓起勇氣向前邁，克服害怕變勇敢',
    icon: '🧭',
    themeColor: 'from-amber-500 to-orange-600',
    summary: '敘述面對陌生黑暗環境或未知挑戰時，如何克服恐懼、勇敢面對，培養堅毅品質。',
    contentLines: [
      '幽暗的森林小徑深處，',
      '傳來貓頭鷹咕嚕咕嚕的啼叫聲。',
      '我的心撲通撲通跳個不停，',
      '手心也微微冒著汗。',
      '但我深吸一口氣，打開手電筒向前照亮：',
      '「不要怕！勇敢是面對未知的勇氣！」',
      '每克服一次害怕，我就變得更加堅強！'
    ],
    contentAudioText: '幽暗的森林小徑深處，傳來貓頭鷹咕嚕咕嚕的啼叫聲。我的心撲通撲通跳個不停，手心也微微冒著汗。但我深吸一口氣，打開手電筒向前照亮：不要怕！勇敢是面對未知的勇氣！每克服一次害怕，我就變得更加堅強！',
    vocabularies: [
      { char: '探', bpmf: 'ㄊㄢˋ', radical: '手（扌）', strokeCount: 11, words: ['探險', '探索', '探測'], mnemonic: '提手旁加「罙」，伸手探尋未知深處' },
      { char: '險', bpmf: 'ㄒㄧㄢˇ', radical: '阜（阝）', strokeCount: 16, words: ['危險', '探險', '保險'], mnemonic: '左耳旁加「僉」，高峻阻隔之處' },
      { char: '鷹', bpmf: 'ㄧㄥ', radical: '鳥', strokeCount: 24, words: ['老鷹', '貓頭鷹', '雄鷹'], mnemonic: '廣人鳥，猛禽之首' },
      { char: '筒', bpmf: 'ㄊㄨㄥˇ', radical: '竹', strokeCount: 12, words: ['手電筒', '水筒', '筆筒'], mnemonic: '竹字頭加「同」，空心中空之管物' }
    ],
    questions: [
      {
        id: 'hl-s2-q3-1',
        type: 'sentence',
        title: '情境心理描摹',
        prompt: '「心撲通撲通跳個不停」通常是在形容人處於什麼心情？',
        options: ['緊張、害怕或極度激動', '很想睡覺', '肚子很餓', '非常無聊'],
        answer: '緊張、害怕或極度激動',
        explanation: '「撲通撲通」形容心跳加速，表現出面對冒險時的緊張感！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u4-rain',
    order: 4,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第四課：一場雨',
    titleBpmf: 'ㄉㄧˋ ㄙˋ ㄎㄜˋ ： ㄧ ㄔㄤˇ ㄩˇ',
    subtitle: '烏雲密布雷聲響，甘霖滋潤大地生',
    icon: '🌧️',
    themeColor: 'from-blue-500 to-cyan-600',
    summary: '記錄從驟雨初來烏雲密布、大雨傾盆到雨後初晴的完整歷程，體會大自然洗滌萬物之美。',
    contentLines: [
      '天色漸漸暗了下來，',
      '天邊滾過轟隆隆的悶雷聲。',
      '豆大的雨點劈啪劈啪砸在屋頂上，',
      '樹葉被洗得乾乾淨淨，青翠發亮。',
      '雨勢慢慢小了，空氣中飄散著泥土的清香，',
      '池塘裡的小青蛙高興得跳上荷葉合唱，',
      '這真是一場痛快又清涼的夏日及時雨！'
    ],
    contentAudioText: '天色漸漸暗了下來，天邊滾過轟隆隆的悶雷聲。豆大的雨點劈啪劈啪砸在屋頂上，樹葉被洗得乾乾淨淨，青翠發亮。雨勢慢慢小了，空氣中飄散著泥土的清香，池塘裡的小青蛙高興得跳上荷葉合唱，這真是一場痛快又清涼的夏日及時雨！',
    vocabularies: [
      { char: '雷', bpmf: 'ㄌㄟˊ', radical: '雨', strokeCount: 13, words: ['打雷', '雷雨', '雷聲'], mnemonic: '雨字頭加「田」，雲中震電之聲' },
      { char: '砸', bpmf: 'ㄗㄚˊ', radical: '石', strokeCount: 10, words: ['砸落', '砸破', '砸下'], mnemonic: '石字旁加「匝」，沈重下擊之勢' },
      { char: '翠', bpmf: 'ㄘㄨㄟˋ', radical: '羽', strokeCount: 14, words: ['青翠', '翠綠', '翡翠'], mnemonic: '羽加卒，鮮明潤澤之碧綠' },
      { char: '塘', bpmf: 'ㄊㄤˊ', radical: '土', strokeCount: 13, words: ['池塘', '水塘', '魚塘'], mnemonic: '土字旁加「唐」，蓄水之堤防凹池' }
    ],
    questions: [
      {
        id: 'hl-s2-q4-1',
        type: 'word',
        title: '擬聲詞運用',
        prompt: '「豆大的雨點____砸在屋頂上」，空格填入哪個擬聲詞最貼切？',
        options: ['劈啪劈啪', '輕輕悄悄', '嘰嘰喳喳', '喵喵汪汪'],
        answer: '劈啪劈啪',
        explanation: '大雨點撞擊屋瓦發出清脆急促的撞擊聲，形容為「劈啪劈啪」！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u5-smile',
    order: 5,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第五課：笑容回來了',
    titleBpmf: 'ㄉㄧˋ ㄨˇ ㄎㄜˋ ： ㄒㄧㄠˋ ㄖㄨㄥˊ ㄏㄨㄟˊ ㄌㄞˊ ㄌㄜ˙',
    subtitle: '關懷朋友解心結，真摯友情化冰霜',
    icon: '😄',
    themeColor: 'from-amber-400 to-yellow-500',
    summary: '看到生病或傷心的同學愁眉苦臉，大家主動遞卡片、送溫暖，讓久違的笑容重新綻放。',
    contentLines: [
      '小華這幾天生病請假回學校，',
      '整個人無精打采，臉上失去了笑容。',
      '同學們圍過來，送上親手寫滿祝福的卡片，',
      '大家講了逗趣的笑話，還幫他複習落下的課堂練習。',
      '小華看著一張張溫暖的笑臉，',
      '眼眶微濕，嘴角終於揚起了微笑：',
      '「謝謝大家，美麗的笑容又回到我的臉上了！」'
    ],
    contentAudioText: '小華這幾天生病請假回學校，整個人無精打采，臉上失去了笑容。同學們圍過來，送上親手寫滿祝福的卡片，大家講了逗趣的笑話，還幫他複習落下的課堂練習。小華看著一張張溫暖的笑臉，眼眶微濕，嘴角終於揚起了微笑：「謝謝大家，美麗的笑容又回到我的臉上了！」',
    vocabularies: [
      { char: '容', bpmf: 'ㄖㄨㄥˊ', radical: '宀', strokeCount: 10, words: ['笑容', '容貌', '面容'], mnemonic: '宀谷相合，面龐儀容' },
      { char: '眶', bpmf: 'ㄎㄨㄤˋ', radical: '目', strokeCount: 11, words: ['眼眶', '熱淚盈眶'], mnemonic: '目字旁加「匡」，眼球周圍之邊際' },
      { char: '慰', bpmf: 'ㄨㄟˋ', radical: '心', strokeCount: 15, words: ['安慰', '欣慰', '撫慰'], mnemonic: '尉加心，安撫撫平內心創傷' },
      { char: '福', bpmf: 'ㄈㄨˊ', radical: '示（礻）', strokeCount: 14, words: ['祝福', '幸福', '福氣'], mnemonic: '示字旁加「畐」，神靈保佑生活豐足' }
    ],
    questions: [
      {
        id: 'hl-s2-q5-1',
        type: 'word',
        title: '成語意境理解',
        prompt: '「無精打采」是用來形容一個人什麼樣的精神狀態？',
        options: ['精神萎靡不振、提不起勁來', '活力滿滿很有精神', '吃得很飽很開心', '高聲歡呼跑跳'],
        answer: '精神萎靡不振、提不起勁來',
        explanation: '「無精打采」形容疲倦、不舒服或傷心時毫無精神的樣子！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u6-talk',
    order: 6,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第六課：好好的說話',
    titleBpmf: 'ㄉㄧˋ ㄌㄧㄡˋ ㄎㄜˋ ： ㄏㄠˇ ㄏㄠˇ ㄉㄜ˙ ㄕㄨㄛ ㄏㄨㄚˋ',
    subtitle: '心平氣和講道理，溫和言語暖人心',
    icon: '🗣️',
    themeColor: 'from-teal-400 to-emerald-500',
    summary: '學習溝通技巧，在生氣或有不同意見時不要大吼大叫，學會心平氣和「好好說話」。',
    contentLines: [
      '話要好好說，事情才能講清楚。',
      '生氣時大吼大叫，就像刺蝟立起尖刺，',
      '只會把身邊的人推得遠遠的。',
      '先停下三秒鐘深呼吸，',
      '用溫柔平和的語氣表達自己的想法：',
      '「這件事讓我很難過，我們能不能一起想想辦法？」',
      '良言一句暖三冬，好好的說話讓友誼長長久久！'
    ],
    contentAudioText: '話要好好說，事情才能講清楚。生氣時大吼大叫，就像刺蝟立起尖刺，只會把身邊的人推得遠遠的。先停下三秒鐘深呼吸，用溫柔平和的語氣表達自己的想法：「這件事讓我很難過，我們能不能一起想想辦法？」良言一句暖三冬，好好的說話讓友誼長長久久！',
    vocabularies: [
      { char: '理', bpmf: 'ㄌㄧˇ', radical: '玉（王）', strokeCount: 11, words: ['道理', '理解', '理智'], mnemonic: '王加里，琢磨璞玉順其紋理' },
      { char: '刺', bpmf: 'ㄘˋ', radical: '刀（刂）', strokeCount: 8, words: ['尖刺', '刺猬', '刺激'], mnemonic: '朿加刂，尖銳芒刺之利刃' },
      { char: '溫', bpmf: 'ㄨㄣ', radical: '水（氵）', strokeCount: 12, words: ['溫柔', '溫暖', '溫度'], mnemonic: '三點水加「昷」，和煦適宜之水溫' },
      { char: '誼', bpmf: 'ㄧˋ', radical: '言', strokeCount: 15, words: ['友誼', '情誼'], mnemonic: '言加宜，合情合理深厚交誼' }
    ],
    questions: [
      {
        id: 'hl-s2-q6-1',
        type: 'sentence',
        title: '情緒溝通技巧',
        prompt: '當跟同伴發生爭執吵架時，最好的溝通方式是？',
        options: ['先冷靜深呼吸，用溫和的語氣好好說出想法', '比對方叫得更大聲', '在地上打滾生氣', '永遠不跟任何人說話'],
        answer: '先冷靜深呼吸，用溫和的語氣好好說出想法',
        explanation: '生氣時大吼只會激化衝突，冷靜平和的表達才能真正解決問題！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u7-edison',
    order: 7,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第七課：孵蛋的男孩',
    titleBpmf: 'ㄉㄧˋ ㄑㄧ ㄎㄜˋ ： ㄈㄨ ㄉㄢˋ ㄉㄜ˙ ㄋㄢˊ ㄏㄞˊ',
    subtitle: '好奇探索打破沙鍋，發明大王愛迪生',
    icon: '🥚',
    themeColor: 'from-amber-500 to-yellow-600',
    summary: '講述發明大王愛迪生小時候好奇蹲在草堆裡「孵雞蛋」的趣味故事，肯定好奇心是科學探索的起點。',
    contentLines: [
      '穀倉的草堆裡，蹲著一個專注的小男孩。',
      '他小心翼翼把母雞生下的雞蛋抱在胸口，',
      '媽媽走過來好奇問：「你在做什麼呀？」',
      '小愛迪生眨眨眼睛認真回答：',
      '「母雞能用體溫孵出小雞，我也想試試看能不能孵出來！」',
      '這股永不熄滅的好奇心，',
      '引領著他長大後成為造福世界的發明大王！'
    ],
    contentAudioText: '穀倉的草堆裡，蹲著一個專注的小男孩。他小心翼翼把母雞生下的雞蛋抱在胸口，媽媽走過來好奇問：「你在做什麼呀？」小愛迪生眨眨眼睛認真回答：「母雞能用體溫孵出小雞，我也想試試看能不能孵出來！」這股永不熄滅的好奇心，引領著他長大後成為造福世界的發明大王！',
    vocabularies: [
      { char: '孵', bpmf: 'ㄈㄨ', radical: '卵', strokeCount: 14, words: ['孵蛋', '孵化', '孵小雞'], mnemonic: '卵加爫加子，鳥禽伏卵以溫出雛' },
      { char: '倉', bpmf: 'ㄘㄤ', radical: '人', strokeCount: 10, words: ['穀倉', '倉庫', '倉儲'], mnemonic: '食官之所，貯存糧食之庫屋' },
      { char: '明', bpmf: 'ㄇㄧㄥˊ', radical: '日', strokeCount: 8, words: ['發明', '光明', '聰明'], mnemonic: '日加月，日月交映照徹天地' },
      { char: '滅', bpmf: 'ㄇㄧㄝˋ', radical: '水（氵）', strokeCount: 13, words: ['熄滅', '撲滅', '滅火'], mnemonic: '水加烕，水澆火熄' }
    ],
    questions: [
      {
        id: 'hl-s2-q7-1',
        type: 'word',
        title: '名人故事探索',
        prompt: '課文中小時候自己蹲在草堆裡認真「孵雞蛋」的小男孩是誰？',
        options: ['愛迪生', '牛頓', '愛因斯坦', '達爾文'],
        answer: '愛迪生',
        explanation: '愛迪生童年時充滿好奇心，曾親身嘗試模仿母雞孵蛋！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u8-light',
    order: 8,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第八課：點亮世界的人',
    titleBpmf: 'ㄉㄧˋ ㄅㄚ ㄎㄜˋ ： ㄉㄧㄢˇ ㄌㄧㄤˋ ㄕˋ ㄐㄧㄝˋ ㄉㄜ˙ ㄖㄣˊ',
    subtitle: '千次實驗不氣餒，電燈發明照千家',
    icon: '💡',
    themeColor: 'from-yellow-400 to-amber-500',
    summary: '敘述愛迪生歷經上千次材料試驗、不屈不撓發明耐用白熾燈泡，為人類黑夜帶來光明的偉大貢獻。',
    contentLines: [
      '在電燈發明之前，夜晚的人們只能依靠昏暗跳動的蠟燭。',
      '愛迪生決心要為夜晚帶來持久的光明！',
      '他試驗了一千多種不同的燈絲材料，',
      '面對每一次的失敗，他總是笑著說：',
      '「我又發現了一種不能當燈絲的材料，這也是巨大的進步！」',
      '終於，碳化竹絲發出了耀眼恆久的光芒，',
      '他的毅力點亮了整座地球的黑夜！'
    ],
    contentAudioText: '在電燈發明之前，夜晚的人們只能依靠昏暗跳動的蠟燭。愛迪生決心要為夜晚帶來持久的光明！他試驗了一千多種不同的燈絲材料，面對每一次的失敗，他總是笑著說：「我又發現了一種不能當燈絲的材料，這也是巨大的進步！」終於，碳化竹絲發出了耀眼恆久的光芒，他的毅力點亮了整座地球的黑夜！',
    vocabularies: [
      { char: '點', bpmf: 'ㄉㄧㄢˇ', radical: '黑', strokeCount: 17, words: ['點亮', '點燃', '優點'], mnemonic: '黑加占，以火引燃光亮' },
      { char: '耐', bpmf: 'ㄋㄞˋ', radical: '而', strokeCount: 9, words: ['耐用', '耐心', '忍耐'], mnemonic: '而加寸，能長久支撐抗持' },
      { char: '燈', bpmf: 'ㄉㄥ', radical: '火', strokeCount: 16, words: ['電燈', '路燈', '燈泡'], mnemonic: '火字旁加「登」，以油火引燃照明之器' },
      { char: '恆', bpmf: 'ㄏㄥˊ', radical: '心（忄）', strokeCount: 9, words: ['恆久', '永恆', '恆心'], mnemonic: '豎心旁加「亙」，月升長照持之以恆' }
    ],
    questions: [
      {
        id: 'hl-s2-q8-1',
        type: 'sentence',
        title: '科學家精神學習',
        prompt: '愛迪生在發明電燈的過程中，面對上千次的失敗抱持著什麼樣的態度？',
        options: ['不氣餒，把每次失敗當作排除錯誤的進步', '馬上放棄再也不做了', '大發雷霆怪別人', '把實驗室砸爛'],
        answer: '不氣餒，把每次失敗當作排除錯誤的進步',
        explanation: '「失敗為成功之母」，愛迪生把每一次挫折視為邁向成功的階梯！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u9-color',
    order: 9,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第九課：色彩變變變',
    titleBpmf: 'ㄉㄧˋ ㄐㄧㄡˇ ㄎㄜˋ ： ㄙㄜˋ ㄘㄞˇ ㄅㄧㄢˋ ㄅㄧㄢˋ ㄅㄧㄢˋ',
    subtitle: '三原色調色盤，魔法變出新色彩',
    icon: '🎨',
    themeColor: 'from-pink-500 to-purple-600',
    summary: '透過紅、黃、藍三原色的混合實驗，探索調色魔術與美術色彩原理。',
    contentLines: [
      '調色盤上擠出紅、黃、藍三種神奇的顏料。',
      '紅色遇見黃色，變成了溫暖誘人的大橘子；',
      '黃色親親藍色，化成了生機盎然的翠綠樹葉；',
      '藍色擁抱紅色，調出了高貴典雅的紫色小葡萄。',
      '拿起神奇的畫筆輕輕調和，',
      '你就是創造繽紛世界的大魔法師！'
    ],
    contentAudioText: '調色盤上擠出紅、黃、藍三種神奇的顏料。紅色遇見黃色，變成了溫暖誘人的大橘子；黃色親親藍色，化成了生機盎然的翠綠樹葉；藍色擁抱紅色，調出了高貴典雅的紫色小葡萄。拿起神奇的畫筆輕輕調和，你就是創造繽紛世界的大魔法師！',
    vocabularies: [
      { char: '調', bpmf: 'ㄊㄧㄠˊ', radical: '言', strokeCount: 15, words: ['調色', '調和', '調整'], mnemonic: '言字旁加「周」，配合均勻和諧' },
      { char: '盤', bpmf: 'ㄆㄢˊ', radical: '皿', strokeCount: 15, words: ['調色盤', '盤子', '圓盤'], mnemonic: '般加皿，盛放調和物體之器皿' },
      { char: '橘', bpmf: 'ㄐㄩˊ', radical: '木', strokeCount: 16, words: ['橘子', '橘色', '柑橘'], mnemonic: '木字旁加「矞」，甘酸多汁之木本果實' },
      { char: '繽', bpmf: 'ㄅㄧㄣ', radical: '糸（纟）', strokeCount: 20, words: ['繽紛', '繽亂'], mnemonic: '絞絲旁加「賓」，繁盛斑斕交錯' }
    ],
    questions: [
      {
        id: 'hl-s2-q9-1',
        type: 'word',
        title: '色彩調合原理',
        prompt: '在色彩學中，把「黃色」與「藍色」顏料均勻混在一起，會變成什麼顏色？',
        options: ['綠色', '紫色', '黑色', '粉紅色'],
        answer: '綠色',
        explanation: '黃色＋藍色＝綠色，這是三原色調色最基礎的神奇魔術！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u10-duckling',
    order: 10,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第十課：醜小鴨',
    titleBpmf: 'ㄉㄧˋ ㄕˊ ㄎㄜˋ ： ㄔㄡˇ ㄒㄧㄠˇ ㄧㄚ',
    subtitle: '歷經風霜不自卑，展翅蛻變白天鵝',
    icon: '🦢',
    themeColor: 'from-sky-500 to-indigo-600',
    summary: '安徒生經典童話，學習不以貌取人、堅持本善，終將發現自己與生俱來的光芒。',
    contentLines: [
      '灰撲撲的大個子走在鴨群中，總是被大家嘲笑欺負。',
      '「你長得太奇怪了，真是隻醜小鴨！」',
      '寒冷的冬天裡，他受盡風雪飢寒，但心中始終保有善良。',
      '春天回暖時，他游到清澈的湖水邊，',
      '水中倒映出的不再是可憐的灰色雛鳥，',
      '而是一隻擁有潔白羽翼、優雅美麗的白天鵝！'
    ],
    contentAudioText: '灰撲撲的大個子走在鴨群中，總是被大家嘲笑欺負。「你長得太奇怪了，真是隻醜小鴨！」寒冷的冬天裡，他受盡風雪飢寒，但心中始終保有善良。春天回暖時，他游到清澈的湖水邊，水中倒映出的不再是可憐的灰色雛鳥，而是一隻擁有潔白羽翼、優雅美麗的白天鵝！',
    vocabularies: [
      { char: '醜', bpmf: 'ㄔㄡˇ', radical: '酉', strokeCount: 17, words: ['醜小鴨', '醜陋', '美醜'], mnemonic: '酉加鬼，外貌形貌不雅觀' },
      { char: '欺', bpmf: 'ㄑㄧ', radical: '欠', strokeCount: 12, words: ['欺負', '欺騙'], mnemonic: '其加欠，以強凌弱妄圖加害' },
      { char: '澈', bpmf: 'ㄔㄜˋ', radical: '水（氵）', strokeCount: 15, words: ['清澈', '澈底', '澄澈'], mnemonic: '三點水加「育」加「攵」，水清見底明瑩澄澈' },
      { char: '鵝', bpmf: 'ㄜˊ', radical: '鳥', strokeCount: 18, words: ['天鵝', '白鵝', '鵝毛'], mnemonic: '我字旁加「鳥」，優雅長頸之大型水禽' }
    ],
    questions: [
      {
        id: 'hl-s2-q10-1',
        type: 'sentence',
        title: '童話寓意品德',
        prompt: '《醜小鴨》的故事告訴我們什麼最重要的做人道理？',
        options: ['不要以貌取人，每個人都有自己獨特的美與天賦', '長得不好看就不能出門', '應該嘲笑別人', '鴨子永遠不能游泳'],
        answer: '不要以貌取人，每個人都有自己獨特的美與天賦',
        explanation: '醜小鴨其實本來就是高貴的白天鵝，時間與成長會讓每個人的潛力綻放！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u11-spider',
    order: 11,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第十一課：蜘蛛救蛋',
    titleBpmf: 'ㄉㄧˋ ㄕˊ ㄧ ㄎㄜˋ ： ㄓㄧ ㄓㄨ ㄐㄧㄡˋ ㄉㄢˋ',
    subtitle: '急中生智織天網，團結互助救鳥蛋',
    icon: '🕸️',
    themeColor: 'from-emerald-500 to-teal-600',
    summary: '童話寓言故事，小鳥蛋不慎從巢中跌落，小蜘蛛急中生智快速結網接住，展現愛心與智慧。',
    contentLines: [
      '狂風猛烈吹拂，鳥巢裡的一枚小鳥蛋骨碌碌滾出邊緣！',
      '「危險！快掉下來了！」樹下的同伴大聲驚呼。',
      '枝頭上的小蜘蛛眼明手快，',
      '從腹部吐出最強韌的黏絲，在樹枝間飛快穿梭來回織網。',
      '撲通一聲！柔韌的蜘蛛網像一張彈簧床，',
      '穩穩接住了跌落的鳥蛋，大家都為小蜘蛛的機智歡呼喝采！'
    ],
    contentAudioText: '狂風猛烈吹拂，鳥巢裡的一枚小鳥蛋骨碌碌滾出邊緣！「危險！快掉下來了！」樹下的同伴大聲驚呼。枝頭上的小蜘蛛眼明手快，從腹部吐出最強韌的黏絲，在樹枝間飛快穿梭來回織網。撲通一聲！柔韌的蜘蛛網像一張彈簧床，穩穩接住了跌落的鳥蛋，大家都為小蜘蛛的機智歡呼喝采！',
    vocabularies: [
      { char: '救', bpmf: 'ㄐㄧㄡˋ', radical: '攴（攵）', strokeCount: 11, words: ['救人', '救助', '援救'], mnemonic: '求加攴，助人脫離危難' },
      { char: '韌', bpmf: 'ㄖㄣˋ', radical: '韋', strokeCount: 12, words: ['強韌', '柔韌', '堅韌'], mnemonic: '韋加刃，柔軟堅固有延展力' },
      { char: '梭', bpmf: 'ㄙㄨㄛ', radical: '木', strokeCount: 11, words: ['穿梭', '日月如梭'], mnemonic: '木字旁加「畯」，織布機上往來牽線之梭子' },
      { char: '采', bpmf: 'ㄘㄞˇ', radical: '釆', strokeCount: 8, words: ['喝采', '采風', '神采'], mnemonic: '爪加木，採集掌聲讚譽' }
    ],
    questions: [
      {
        id: 'hl-s2-q11-1',
        type: 'word',
        title: '成語意境體會',
        prompt: '「眼明手快」是形容一個人在危急時刻表現出怎樣的特質？',
        options: ['反應非常迅速、動作敏捷', '眼睛很大但看不清楚', '跑得非常慢', '大喊救命'],
        answer: '反應非常迅速、動作敏捷',
        explanation: '「眼明手快」形容看準時機、動作極其敏捷迅速！'
      }
    ]
  },
  {
    id: 'hl-g2-s2-u12-hero',
    order: 12,
    grade: 2,
    semester: 2,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第十二課：主角選拔',
    titleBpmf: 'ㄉㄧˋ ㄕˊ ㄦˋ ㄎㄜˋ ： ㄓㄨˇ ㄐㄧㄠˇ ㄒㄩㄢˇ ㄅㄚˊ',
    subtitle: '每個人都有閃光點，同心協力演好戲',
    icon: '🎭',
    themeColor: 'from-purple-500 to-rose-500',
    summary: '班級排練戲劇選角，學會不爭搶光芒，深知舞台上每個角色、甚至幕後音效與道具都同樣無可替代。',
    contentLines: [
      '學校的兒童劇展即將舉行，全班熱烈討論選角。',
      '大家都想扮演威風的大英雄，主角只有一個，怎麼辦呢？',
      '老師笑著說：「一齣精采的好戲，除了台前的主角，',
      '幕後的配音、道具的繪製、燈光的切換，每個人都缺一不可！」',
      '大家各展所長，有人扮大樹、有人操控雨聲筒。',
      '布幕升起，我們共同贏得了全校最熱烈的掌聲！'
    ],
    contentAudioText: '學校的兒童劇展即將舉行，全班熱烈討論選角。大家都想扮演威風的大英雄，主角只有一個，怎麼辦呢？老師笑著說：「一齣精采的好戲，除了台前的主角，幕後的配音、道具的繪製、燈光的切換，每個人都缺一不可！」大家各展所長，有人扮大樹、有人操控雨聲筒。布幕升起，我們共同贏得了全校最熱烈的掌聲！',
    vocabularies: [
      { char: '拔', bpmf: 'ㄅㄚˊ', radical: '手（扌）', strokeCount: 8, words: ['選拔', '拔擢', '出類拔萃'], mnemonic: '提手旁加「犮」，自眾人中挑選出優秀者' },
      { char: '劇', bpmf: 'ㄐㄩˋ', radical: '刀（刂）', strokeCount: 15, words: ['戲劇', '話劇', '劇院'], mnemonic: '豦加刂，搬演故事之舞台藝術' },
      { char: '幕', bpmf: 'ㄇㄨˋ', radical: '巾', strokeCount: 15, words: ['布幕', '螢幕', '幕後'], mnemonic: '莫加巾，遮蔽舞台之大布幔' },
      { char: '缺', bpmf: 'ㄑㄩㄝ', radical: '缶', strokeCount: 10, words: ['缺乏', '缺少', '不可或缺'], mnemonic: '缶加夬，破損器皿不完整' }
    ],
    questions: [
      {
        id: 'hl-s2-q12-1',
        type: 'sentence',
        title: '團體合作智慧',
        prompt: '排練舞台劇時，為什麼說「每個人都缺一不可」？',
        options: ['因為每個角色和幕後工作都一樣重要，共同合作才能成就精彩好戲', '因為只有主角能說話', '因為別人不用演', '因為戲劇很無聊'],
        answer: '因為每個角色和幕後工作都一樣重要，共同合作才能成就精彩好戲',
        explanation: '團隊合作就像拼圖，任何一塊拼圖都具有無可替代的價值！'
      }
    ]
  }
];
