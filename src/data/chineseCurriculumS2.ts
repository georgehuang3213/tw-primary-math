import { ChineseLesson } from '../types';

export const KANG_HSUAN_G1_S2_CHINESE: ChineseLesson[] = [
  {
    id: 'zh-g1-s2-u1-spring',
    order: 1,
    semester: 2,
    title: '第一課：春',
    titleBpmf: 'ㄉㄧˋ ㄧ ㄎㄜˋ ： ㄔㄨㄣ',
    subtitle: '春風輕輕吹，大地穿新衣',
    icon: '🌸',
    themeColor: 'from-pink-400 to-rose-500',
    summary: '感受春天萬物復甦的生機，學習大自然景物變化與描繪色彩的語句。',
    contentLines: [
      '春風輕輕吹，',
      '小草鑽出泥土來。',
      '桃花開了，臉紅紅；',
      '柳樹綠了，招招手。',
      '小鳥在枝頭唱著歌：',
      '「春天來了！春天來了！」'
    ],
    contentAudioText: '春風輕輕吹，小草鑽出泥土來。桃花開了，臉紅紅；柳樹綠了，招招手。小鳥在枝頭唱著歌：「春天來了！春天來了！」',
    vocabularies: [
      { char: '春', bpmf: 'ㄔㄨㄣ', radical: '日', strokeCount: 9, words: ['春天', '春風', '春天來了'], mnemonic: '三人看日出，大地逢春暖' },
      { char: '草', bpmf: 'ㄘㄠˇ', radical: '艸（艹）', strokeCount: 10, words: ['小草', '青草', '草地'], mnemonic: '草字頭加一個「早」' },
      { char: '桃', bpmf: 'ㄊㄠˊ', radical: '木', strokeCount: 10, words: ['桃花', '桃子', '櫻桃'], mnemonic: '木字旁加一個「兆」' },
      { char: '風', bpmf: 'ㄈㄥ', radical: '風', strokeCount: 9, words: ['春風', '微風', '大風'], mnemonic: '風動蟲生，空氣流動' }
    ],
    questions: [
      {
        id: 'zh-s2-q1-1',
        type: 'word',
        title: '課文景物理解',
        prompt: '春天來的時候，課文中說誰在泥土裡鑽出來了？',
        options: ['小草', '青蛙', '雪人', '落葉'],
        answer: '小草',
        explanation: '課文說：「春風輕輕吹，小草鑽出泥土來。」'
      },
      {
        id: 'zh-s2-q1-2',
        type: 'sentence',
        title: '疊字擬人修辭',
        prompt: '課文用「臉紅紅」來描寫哪一種花朵盛開？',
        options: ['桃花', '荷花', '菊花', '梅花'],
        answer: '桃花',
        explanation: '桃花開了粉粉嫩嫩的，就像害羞臉紅紅一樣！'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u2-garden',
    order: 2,
    semester: 2,
    title: '第二課：花園裡有什麼？',
    titleBpmf: 'ㄉㄧˋ ㄦˋ ㄎㄜˋ ： ㄏㄨㄚ ㄩㄢˊ ㄌㄧˇ ㄧㄡˇ ㄕㄣˊ ˙ㄇㄜ ？',
    subtitle: '花園裡，有紅花，有綠葉，還有忙碌的蜜蜂',
    icon: '🌺',
    themeColor: 'from-amber-400 to-emerald-500',
    summary: '引導孩子細心觀察校園或社區花園，運用排比問答句型探索生態美。',
    contentLines: [
      '花園裡有什麼？',
      '有紅紅的花，有綠綠的葉。',
      '花園裡還有什麼？',
      '有嗡嗡嗡的蜜蜂採花蜜，',
      '有飛呀飛的蝴蝶跳舞。',
      '花園是大家的大客廳，熱鬧又美麗！'
    ],
    contentAudioText: '花園裡有什麼？有紅紅的花，有綠綠的葉。花園裡還有什麼？有嗡嗡嗡的蜜蜂採花蜜，有飛呀飛的蝴蝶跳舞。花園是大家的大客廳，熱鬧又美麗！',
    vocabularies: [
      { char: '園', bpmf: 'ㄩㄢˊ', radical: '囗', strokeCount: 13, words: ['花園', '公園', '果園'], mnemonic: '大口框（囗）裡面一個「袁」，圍起來的地方' },
      { char: '葉', bpmf: 'ㄧㄝˋ', radical: '艸（艹）', strokeCount: 13, words: ['綠葉', '樹葉', '落葉'], mnemonic: '草字頭加「枼」' },
      { char: '蜂', bpmf: 'ㄈㄥ', radical: '虫', strokeCount: 13, words: ['蜜蜂', '蜂鳥', '蜂蜜'], mnemonic: '虫字旁加一個「夆」' },
      { char: '蝶', bpmf: 'ㄉㄧㄝˊ', radical: '虫', strokeCount: 15, words: ['蝴蝶', '蝶豆花'], mnemonic: '虫字旁加一個「枼」' }
    ],
    questions: [
      {
        id: 'zh-s2-q2-1',
        type: 'word',
        title: '擬聲詞辨識',
        prompt: '課文中形容蜜蜂飛行採蜜發出的聲音是？',
        options: ['嗡嗡嗡', '呱呱呱', '汪汪汪', '喵喵喵'],
        answer: '嗡嗡嗡',
        explanation: '蜜蜂拍動翅膀的聲音通常寫作「嗡嗡嗡」！'
      },
      {
        id: 'zh-s2-q2-2',
        type: 'stroke',
        title: '昆蟲部首認識',
        prompt: '「蜜蜂」和「蝴蝶」都是小昆蟲，它們的部首是什麼？',
        options: ['虫部', '鳥部', '魚部', '木部'],
        answer: '虫部',
        explanation: '多數昆蟲與小爬蟲類字的部首都是「虫」字旁！'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u3-concert',
    order: 3,
    semester: 2,
    title: '第三課：媽媽的音樂會',
    titleBpmf: 'ㄉㄧˋ ㄙㄢ ㄎㄜˋ ： ㄇㄚ ˙ㄇㄚ ㄉㄜ˙ ㄧㄣ ㄩㄝˋ ㄏㄨㄟˋ',
    subtitle: '廚房鍋碗瓢盆叮咚響，奏出愛的交響曲',
    icon: '🎵',
    themeColor: 'from-orange-400 to-amber-500',
    summary: '將媽媽在廚房做飯的聲響轉化為美妙音樂會，體會親情與生活創意。',
    contentLines: [
      '媽媽走進廚房裡，',
      '美妙的音樂會開始了！',
      '水龍頭嘩啦嘩啦洗青菜，',
      '菜刀在砧板上叩叩叩。',
      '鍋鏟在油鍋裡滋滋滋，',
      '香噴噴的晚餐煮好囉，',
      '這是最幸福的交響樂！'
    ],
    contentAudioText: '媽媽走進廚房裡，美妙的音樂會開始了！水龍頭嘩啦嘩啦洗青菜，菜刀在砧板上叩叩叩。鍋鏟在油鍋裡滋滋滋，香噴噴的晚餐煮好囉，這是最幸福的交響樂！',
    vocabularies: [
      { char: '音', bpmf: 'ㄧㄣ', radical: '音', strokeCount: 9, words: ['音樂', '聲音', '音符'], mnemonic: '立字加日，發出聲響' },
      { char: '樂', bpmf: 'ㄩㄝˋ', radical: '木', strokeCount: 15, words: ['音樂', '樂曲', '樂器'], mnemonic: '絲竹架於木上作樂' },
      { char: '菜', bpmf: 'ㄘㄞˋ', radical: '艸（艹）', strokeCount: 12, words: ['青菜', '做菜', '買菜'], mnemonic: '草字頭加「采」' },
      { char: '香', bpmf: 'ㄒㄧㄤ', radical: '香', strokeCount: 9, words: ['香氣', '香水', '香噴噴'], mnemonic: '禾穀日曬散發香氣' }
    ],
    questions: [
      {
        id: 'zh-s2-q3-1',
        type: 'sentence',
        title: '生活聲響聯想',
        prompt: '課文中「叩叩叩」的聲音，是媽媽在做什麼動作呢？',
        options: ['切菜', '洗菜', '喝水', '炒蛋'],
        answer: '切菜',
        explanation: '課文寫：「菜刀在砧板上叩叩叩。」'
      },
      {
        id: 'zh-s2-q3-2',
        type: 'word',
        title: '多音字讀音',
        prompt: '「音樂會」的「樂」，在這邊讀作什麼呢？',
        options: ['ㄩㄝˋ（音樂）', 'ㄌㄜˋ（快樂）'],
        answer: 'ㄩㄝˋ（音樂）',
        explanation: '「樂」有兩種讀音：音樂讀「ㄩㄝˋ」，快樂讀「ㄌㄜˋ」！'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u4-shoes',
    order: 4,
    semester: 2,
    title: '第四課：鞋',
    titleBpmf: 'ㄉㄧˋ ㄙˋ ㄎㄜˋ ： ㄒㄧㄝˊ',
    subtitle: '大鞋小鞋排排站，一家人相親相愛',
    icon: '👟',
    themeColor: 'from-blue-400 to-indigo-500',
    summary: '透過門口玄關擺放的大小鞋子，體察家人回到家的溫暖與親密情感。',
    contentLines: [
      '門口玄關前，',
      '鞋子排成整齊的一行。',
      '大大的皮鞋是爸爸的，',
      '漂亮的包鞋是媽媽的，',
      '小巧的球鞋是我的。',
      '鞋子靠在一起休息，',
      '我們一家人快樂在一起。'
    ],
    contentAudioText: '門口玄關前，鞋子排成整齊的一行。大大的皮鞋是爸爸的，漂亮的包鞋是媽媽的，小巧的球鞋是我的。鞋子靠在一起休息，我們一家人快樂在一起。',
    vocabularies: [
      { char: '鞋', bpmf: 'ㄒㄧㄝˊ', radical: '革', strokeCount: 15, words: ['鞋子', '球鞋', '皮鞋'], mnemonic: '皮革（革）做成圭字鞋面' },
      { char: '門', bpmf: 'ㄇㄣˊ', radical: '門', strokeCount: 8, words: ['門口', '大門', '開門'], mnemonic: '象形字，兩扇門板' },
      { char: '整', bpmf: 'ㄓㄥˇ', radical: '攴（攵）', strokeCount: 16, words: ['整齊', '整理', '完整'], mnemonic: '束負攴正，整飭整齊' },
      { char: '休', bpmf: 'ㄒㄧㄡ', radical: '人（亻）', strokeCount: 6, words: ['休息', '休假', '休養'], mnemonic: '人靠在樹木（木）旁休息' }
    ],
    questions: [
      {
        id: 'zh-s2-q4-1',
        type: 'word',
        title: '文字部件聯想',
        prompt: '「休」這個字是一個人靠在樹木旁，代表什麼意思？',
        options: ['休息', '跑步', '生氣', '吃東西'],
        answer: '休息',
        explanation: '「亻（人）」靠著「木（樹木）」，古人勞動後靠樹納涼，就是「休息」！'
      },
      {
        id: 'zh-s2-q4-2',
        type: 'sentence',
        title: '家庭物品歸屬',
        prompt: '課文中說大大的皮鞋是屬於誰的？',
        options: ['爸爸的', '媽媽的', '我的', '小狗的'],
        answer: '爸爸的',
        explanation: '課文提到：「大大的皮鞋是爸爸的。」'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u5-seed',
    order: 5,
    semester: 2,
    title: '第五課：小種子快長大',
    titleBpmf: 'ㄉㄧˋ ㄨˇ ㄎㄜˋ ： ㄒㄧㄠˇ ㄓㄨㄥˇ ㄗ˙ ㄎㄨㄞˋ ㄓㄤˇ ㄉㄚˋ',
    subtitle: '喝飽水，曬太陽，綠芽伸伸小懶腰',
    icon: '🌱',
    themeColor: 'from-emerald-400 to-green-600',
    summary: '記錄播種、發芽到長大的生命歷程，學習耐心呵護大自然植物。',
    contentLines: [
      '泥土軟軟，被窩暖暖，',
      '小種子在土裡睡大覺。',
      '雨水滴答滴答給它喝水，',
      '太陽公公叫它起床。',
      '小種子伸伸懶腰鑽出土，',
      '長出一片嫩嫩的綠葉！'
    ],
    contentAudioText: '泥土軟軟，被窩暖暖，小種子在土裡睡大覺。雨水滴答滴答給它喝水，太陽公公叫它起床。小種子伸伸懶腰鑽出土，長出一片嫩嫩的綠葉！',
    vocabularies: [
      { char: '種', bpmf: 'ㄓㄨㄥˇ', radical: '禾', strokeCount: 14, words: ['種子', '種花', '品種'], mnemonic: '禾字旁加一個「重」' },
      { char: '土', bpmf: 'ㄊㄨˇ', radical: '土', strokeCount: 3, words: ['泥土', '土地', '泥巴'], mnemonic: '地吐生萬物之形' },
      { char: '雨', bpmf: 'ㄩˇ', radical: '雨', strokeCount: 8, words: ['雨水', '下雨', '大雨'], mnemonic: '雲層下落下四滴雨點' },
      { char: '長', bpmf: 'ㄓㄤˇ', radical: '長', strokeCount: 8, words: ['長大', '生長', '長高'], mnemonic: '幼苗長大生長' }
    ],
    questions: [
      {
        id: 'zh-s2-q5-1',
        type: 'sentence',
        title: '植物生長要素',
        prompt: '小種子要發芽長大，需要泥土、太陽和什麼呢？',
        options: ['雨水（水分）', '可樂', '冰塊', '糖果'],
        answer: '雨水（水分）',
        explanation: '植物種子需要陽光、空氣、水和肥沃的土壤才能茁壯長大！'
      },
      {
        id: 'zh-s2-q5-2',
        type: 'word',
        title: '破音字辨析',
        prompt: '「小種子快長大」的「長」，在這裡讀作什麼？',
        options: ['ㄓㄤˇ（生長、長高）', 'ㄔㄤˊ（長度很長）'],
        answer: 'ㄓㄤˇ（生長、長高）',
        explanation: '表示植物生長或年齡增長時，讀作「ㄓㄤˇ」！'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u6-grandma',
    order: 6,
    semester: 2,
    title: '第六課：奶奶的小跟班',
    titleBpmf: 'ㄉㄧˋ ㄌㄧㄡˋ ㄎㄜˋ ： ㄋㄞˇ ㄋㄞ˙ ㄉㄜ˙ ㄒㄧㄠˇ ㄍㄣ ㄅㄢ',
    subtitle: '奶奶去菜市場，我當貼心小跟班',
    icon: '👵',
    themeColor: 'from-amber-500 to-rose-400',
    summary: '溫馨描寫祖孫溫暖互動，祖孫逛市場、提菜籃的生活情趣。',
    contentLines: [
      '奶奶走到哪裡，我就跟到哪裡，',
      '我是奶奶的小跟班！',
      '奶奶去菜市場買蘿蔔，我幫忙提籃子；',
      '奶奶在公園散步，我陪她說說話。',
      '奶奶笑咪咪摸摸我的頭：',
      '「你真是我的乖寶貝！」'
    ],
    contentAudioText: '奶奶走到哪裡，我就跟到哪裡，我是奶奶的小跟班！奶奶去菜市場買蘿蔔，我幫忙提籃子；奶奶在公園散步，我陪她說說話。奶奶笑咪咪摸摸我的頭：「你真是我的乖寶貝！」',
    vocabularies: [
      { char: '奶', bpmf: 'ㄋㄞˇ', radical: '女', strokeCount: 5, words: ['奶奶', '牛奶'], mnemonic: '女字旁加「乃」' },
      { char: '跟', bpmf: 'ㄍㄣ', radical: '足', strokeCount: 13, words: ['跟著', '小跟班', '腳跟'], mnemonic: '足字旁加「艮」，跟在腳步後面' },
      { char: '提', bpmf: 'ㄊㄧˊ', radical: '手（扌）', strokeCount: 12, words: ['提著', '提早', '提出'], mnemonic: '提手旁加「是」，用手提起來' },
      { char: '笑', bpmf: 'ㄒㄧㄠˋ', radical: '竹', strokeCount: 10, words: ['笑咪咪', '微笑', '笑聲'], mnemonic: '竹字頭微彎如人笑眼' }
    ],
    questions: [
      {
        id: 'zh-s2-q6-1',
        type: 'word',
        title: '詞語涵義理解',
        prompt: '「小跟班」是指什麼意思呢？',
        options: ['形影不離、喜歡跟在身邊幫忙的人', '討厭別人的敵人', '班級的班長', '玩具小熊'],
        answer: '形影不離、喜歡跟在身邊幫忙的人',
        explanation: '「小跟班」在這裡形容孩子很愛奶奶，喜歡黏著奶奶一起行動！'
      },
      {
        id: 'zh-s2-q6-2',
        type: 'sentence',
        title: '祖孫敬老美德',
        prompt: '課文中小朋友陪奶奶逛市場時，主動幫忙做了什麼事？',
        options: ['幫忙提菜籃子', '在地上打滾', '買好多糖果吃', '自己跑去玩溜滑梯'],
        answer: '幫忙提菜籃子',
        explanation: '課文說：「奶奶去菜市場買蘿蔔，我幫忙提籃子。」'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u7-cloud',
    order: 7,
    semester: 2,
    title: '第七課：作夢的雲',
    titleBpmf: 'ㄉㄧˋ ㄑㄧ ㄎㄜˋ ： ㄗㄨㄛˋ ㄇㄥˋ ㄉㄜ˙ ㄩㄣˊ',
    subtitle: '天上的雲朵變綿羊，變小船，多神奇',
    icon: '☁️',
    themeColor: 'from-sky-300 to-blue-400',
    summary: '展開無邊無際的童真想像，觀察天空中千變萬化的白雲形狀。',
    contentLines: [
      '天上的白雲在作夢，',
      '一會兒變成大白鯨在海裡游，',
      '一會兒變成綿羊在山坡吃草。',
      '風兒吹過來，',
      '白雲又變成棉花糖。',
      '雲朵的夢想多美麗！'
    ],
    contentAudioText: '天上的白雲在作夢，一會兒變成大白鯨在海裡游，一會兒變成綿羊在山坡吃草。風兒吹過來，白雲又變成棉花糖。雲朵的夢想多美麗！',
    vocabularies: [
      { char: '夢', bpmf: 'ㄇㄥˋ', radical: '夕', strokeCount: 14, words: ['做夢', '夢想', '作夢'], mnemonic: '草木夜夕入夢' },
      { char: '雲', bpmf: 'ㄩㄣˊ', radical: '雨', strokeCount: 12, words: ['白雲', '烏雲', '雲朵'], mnemonic: '雨字頭加「云」' },
      { char: '變', bpmf: 'ㄅㄧㄢˋ', radical: '言', strokeCount: 23, words: ['變成', '變化', '變魔術'], mnemonic: '左右系言攴，萬物變化' },
      { char: '羊', bpmf: 'ㄧㄤˊ', radical: '羊', strokeCount: 6, words: ['綿羊', '山羊', '小羊'], mnemonic: '象形字，雙角向下之獸' }
    ],
    questions: [
      {
        id: 'zh-s2-q7-1',
        type: 'word',
        title: '句型理解',
        prompt: '「一會兒……一會兒……」是用來描寫什麼？',
        options: ['短時間內連續變換不同的形態動作', '永遠都不改變', '慢慢停下來', '睡覺做夢'],
        answer: '短時間內連續變換不同的形態動作',
        explanation: '「一會兒變成大白鯨，一會兒變成綿羊」表示變化非常快！'
      },
      {
        id: 'zh-s2-q7-2',
        type: 'stroke',
        title: '天氣相關部首',
        prompt: '「雲、雪、雷」這幾個跟天空氣象有關的字，部首都是什麼？',
        options: ['雨部', '日部', '月部', '木部'],
        answer: '雨部',
        explanation: '天空中的降水、雲霧與雷電，大部分都是「雨」部喔！'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u8-boots',
    order: 8,
    semester: 2,
    title: '第八課：妹妹的紅雨鞋',
    titleBpmf: 'ㄉㄧˋ ㄅㄚ ㄎㄜˋ ： ㄇㄟˋ ㄇㄟ˙ ㄉㄜ˙ ㄏㄨㄥˊ ㄩˇ ㄒㄧㄝˊ',
    subtitle: '下雨天，紅雨鞋，水窪踩出小水花',
    icon: '👢',
    themeColor: 'from-rose-500 to-red-600',
    summary: '體會下雨天穿著亮紅雨鞋踩水窪的童趣，用色彩和聲音感染讀者。',
    contentLines: [
      '下雨了，淅瀝瀝，嘩啦啦！',
      '妹妹穿上最愛的紅雨鞋。',
      '紅雨鞋像兩隻紅色小金魚，',
      '在小水窪裡游過來，游過去。',
      '啪嗒啪嗒踩水花，',
      '妹妹笑得眼睛像月牙！'
    ],
    contentAudioText: '下雨了，淅瀝瀝，嘩啦啦！妹妹穿上最愛的紅雨鞋。紅雨鞋像兩隻紅色小金魚，在小水窪裡游過來，游過去。啪嗒啪嗒踩水花，妹妹笑得眼睛像月牙！',
    vocabularies: [
      { char: '妹', bpmf: 'ㄇㄟˋ', radical: '女', strokeCount: 8, words: ['妹妹', '姊妹', '表妹'], mnemonic: '女字旁加「未」' },
      { char: '紅', bpmf: 'ㄏㄨㄥˊ', radical: '糸（纟）', strokeCount: 9, words: ['紅色', '紅花', '火紅'], mnemonic: '絞絲旁加「工」，織染之紅' },
      { char: '魚', bpmf: 'ㄩˊ', radical: '魚', strokeCount: 11, words: ['小魚', '金魚', '魚兒'], mnemonic: '象形字，魚頭魚身魚尾' },
      { char: '踩', bpmf: 'ㄘㄞˇ', radical: '足', strokeCount: 15, words: ['踩水', '踩踏', '踩著'], mnemonic: '足字旁加「采」，用腳踏上' }
    ],
    questions: [
      {
        id: 'zh-s2-q8-1',
        type: 'sentence',
        title: '譬喻修辭體會',
        prompt: '課文把妹妹在水窪裡的紅雨鞋比喻成什麼？',
        options: ['紅色小金魚', '大輪船', '小西瓜', '小青蛙'],
        answer: '紅色小金魚',
        explanation: '課文說：「紅雨鞋像兩隻紅色小金魚，在水窪裡游過來，游過去。」'
      },
      {
        id: 'zh-s2-q8-2',
        type: 'word',
        title: '踩水聲擬聲詞',
        prompt: '走在水窪裡濺起水花，發出的聲音是？',
        options: ['啪嗒啪嗒', '呼嚕呼嚕', '嘰嘰喳喳', '滴答滴答'],
        answer: '啪嗒啪嗒',
        explanation: '穿雨鞋踩水的聲音常常用「啪嗒啪嗒」來描寫！'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u9-rainbow',
    order: 9,
    semester: 2,
    title: '第九課：七彩的虹',
    titleBpmf: 'ㄉㄧˋ ㄐㄧㄡˇ ㄎㄜˋ ： ㄑㄧ ㄘㄞˇ ㄉㄜ˙ ㄏㄨㄥˊ',
    subtitle: '雨過天晴架彩橋，紅橙黃綠藍靛紫',
    icon: '🌈',
    themeColor: 'from-violet-500 to-pink-500',
    summary: '欣賞雨後初晴的彩虹美景，認識七種光譜色彩，激發美感探索。',
    contentLines: [
      '大雨停了，太陽出來了！',
      '天空架起一座彎彎的彩虹橋。',
      '紅、橙、黃、綠、藍、靛、紫，',
      '七種顏色織成最美的衣裳。',
      '小鳥想飛過彩虹橋，',
      '微風也想在彩虹上滑梯！'
    ],
    contentAudioText: '大雨停了，太陽出來了！天空架起一座彎彎的彩虹橋。紅、橙、黃、綠、藍、靛、紫，七種顏色織成最美的衣裳。小鳥想飛過彩虹橋，微風也想在彩虹上滑梯！',
    vocabularies: [
      { char: '虹', bpmf: 'ㄏㄨㄥˊ', radical: '虫', strokeCount: 9, words: ['彩虹', '虹橋', '長虹'], mnemonic: '虫字旁加「工」，古人視虹為吸水之大蟲' },
      { char: '彩', bpmf: 'ㄘㄞˇ', radical: '彡', strokeCount: 11, words: ['七彩', '彩色', '彩虹'], mnemonic: '采加彡，光澤色彩' },
      { char: '陽', bpmf: 'ㄧㄤˊ', radical: '阜（阝）', strokeCount: 12, words: ['太陽', '陽光', '朝陽'], mnemonic: '左耳旁加「昜」，高照暖陽' },
      { char: '停', bpmf: 'ㄊㄧㄥˊ', radical: '人（亻）', strokeCount: 11, words: ['停止', '雨停', '停步'], mnemonic: '人字旁加「亭」，暫歇止步' }
    ],
    questions: [
      {
        id: 'zh-s2-q9-1',
        type: 'word',
        title: '科學常識理解',
        prompt: '美麗的彩虹通常在什麼時候會出現在天空中呢？',
        options: ['大雨過後出太陽時', '大雪紛飛的半夜', '起大霧時', '全黑的晚上'],
        answer: '大雨過後出太陽時',
        explanation: '陽光照在空氣中的小水滴上產生折射與反射，就會形成美麗的七色彩虹！'
      },
      {
        id: 'zh-s2-q9-2',
        type: 'sentence',
        title: '色彩順序',
        prompt: '彩虹最外層通常是什麼顏色？',
        options: ['紅色', '黑色', '灰色', '白色'],
        answer: '紅色',
        explanation: '彩虹的七種順序是紅、橙、黃、綠、藍、靛、紫！'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u10-withyou',
    order: 10,
    semester: 2,
    title: '第十課：和你在一起',
    titleBpmf: 'ㄉㄧˋ ㄕˊ ㄎㄜˋ ： ㄏㄢˋ ㄋㄧˇ ㄗㄞˋ ㄧ ㄑㄧˇ',
    subtitle: '分享玩具笑聲多，手拉手是好朋友',
    icon: '🤝',
    themeColor: 'from-amber-400 to-orange-400',
    summary: '體會友誼的溫馨可貴，學會傾聽、分享與同伴互相關懷。',
    contentLines: [
      '和你在一起，',
      '堆積木更好玩，盪秋千更高興。',
      '有了一本書，我們一起讀；',
      '有了一塊蛋糕，我們一人一半。',
      '分享是甜甜的糖果，',
      '和你在一起，每一天都充滿陽光！'
    ],
    contentAudioText: '和你在一起，堆積木更好玩，盪秋千更高興。有了一本書，我們一起讀；有了一塊蛋糕，我們一人一半。分享是甜甜的糖果，和你在一起，每一天都充滿陽光！',
    vocabularies: [
      { char: '起', bpmf: 'ㄑㄧˇ', radical: '走', strokeCount: 10, words: ['一起', '起來', '起立'], mnemonic: '走字旁加「己」，邁步站起' },
      { char: '書', bpmf: 'ㄕㄨ', radical: '曰', strokeCount: 10, words: ['讀書', '書本', '圖書'], mnemonic: '手持筆著於簡冊' },
      { char: '半', bpmf: 'ㄅㄢˋ', radical: '十', strokeCount: 5, words: ['一半', '半天', '半個'], mnemonic: '八分解牛為半' },
      { char: '甜', bpmf: 'ㄊㄧㄢˊ', radical: '甘', strokeCount: 11, words: ['甜甜的', '香甜', '甜美'], mnemonic: '舌加甘，口中甘美滋味' }
    ],
    questions: [
      {
        id: 'zh-s2-q10-1',
        type: 'sentence',
        title: '同伴分享美德',
        prompt: '課文說「分享是甜甜的____」？',
        options: ['糖果', '苦瓜', '冰水', '石頭'],
        answer: '糖果',
        explanation: '分享能帶來喜悅與幸福感，就像吃到甜甜的糖果一樣！'
      },
      {
        id: 'zh-s2-q10-2',
        type: 'word',
        title: '詞語配搭',
        prompt: '「一塊蛋糕，一人____」，空格填什麼最通順？',
        options: ['一半', '一隻', '一頭', '一顆'],
        answer: '一半',
        explanation: '兩個人平分一塊蛋糕，一人分得「一半」！'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u11-birthday',
    order: 11,
    semester: 2,
    title: '第十一課：生日快樂',
    titleBpmf: 'ㄉㄧˋ ㄕˊ ㄧ ㄎㄜˋ ： ㄕㄥ ㄖˋ ㄎㄨㄞˋ ㄌㄜˋ',
    subtitle: '吹蠟燭，許個願，感謝爸爸媽媽',
    icon: '🎂',
    themeColor: 'from-pink-500 to-rose-400',
    summary: '透過慶祝生日感恩父母的付出，學習成長的喜悅與表達感謝。',
    contentLines: [
      '桌上擺著草莓大蛋糕，',
      '點燃一根長長的蠟燭。',
      '「祝你生日快樂！祝你生日快樂！」',
      '大家拍拍手唱生日歌。',
      '我吹熄蠟燭許了願望：',
      '「謝謝爸爸媽媽，我今天又長大一歲囉！」'
    ],
    contentAudioText: '桌上擺著草莓大蛋糕，點燃一根長長的蠟燭。「祝你生日快樂！祝你生日快樂！」大家拍拍手唱生日歌。我吹熄蠟燭許了願望：「謝謝爸爸媽媽，我今天又長大一歲囉！」',
    vocabularies: [
      { char: '生', bpmf: 'ㄕㄥ', radical: '生', strokeCount: 5, words: ['生日', '出生', '學生'], mnemonic: '象形字，草木生出地面' },
      { char: '日', bpmf: 'ㄖˋ', radical: '日', strokeCount: 4, words: ['日子', '日曆', '生日'], mnemonic: '象形字，太陽之形' },
      { char: '謝', bpmf: 'ㄒㄧㄝˋ', radical: '言', strokeCount: 17, words: ['謝謝', '感謝', '謝意'], mnemonic: '言字旁加「射」，言詞表達感激' },
      { char: '歲', bpmf: 'ㄙㄨㄟˋ', radical: '止', strokeCount: 13, words: ['幾歲', '歲月', '長一歲'], mnemonic: '止加戌，一年光陰之循環' }
    ],
    questions: [
      {
        id: 'zh-s2-q11-1',
        type: 'sentence',
        title: '生活感恩禮貌',
        prompt: '過生日吹蠟燭的時候，最應該感謝誰的養育與照顧？',
        options: ['爸爸媽媽', '電視機', '路邊小狗', '電腦螢幕'],
        answer: '爸爸媽媽',
        explanation: '生日也是母難日，小朋友長大一歲最該向辛勞的父母說聲謝謝！'
      },
      {
        id: 'zh-s2-q11-2',
        type: 'word',
        title: '多音字辨析',
        prompt: '「祝你生日快樂」的「樂」，在這裡讀作什麼？',
        options: ['ㄌㄜˋ（快樂）', 'ㄩㄝˋ（音樂）'],
        answer: 'ㄌㄜˋ（快樂）',
        explanation: '表示開朗高興時讀作「ㄌㄜˋ」！'
      }
    ]
  },
  {
    id: 'zh-g1-s2-u12-ding',
    order: 12,
    semester: 2,
    title: '第十二課：小鼎',
    titleBpmf: 'ㄉㄧˋ ㄕˊ ㄦˋ ㄎㄜˋ ： ㄒㄧㄠˇ ㄉㄧㄥˇ',
    subtitle: '古老的寶貝，三隻腳穩穩立',
    icon: '🏺',
    themeColor: 'from-amber-600 to-yellow-600',
    summary: '藉由博物館文物與造字故事，引導孩子欣賞中國漢字三足鼎立的造字之美。',
    contentLines: [
      '博物館裡住著一個小鼎，',
      '圓圓的肚子，三隻穩穩的腳。',
      '很久很久以前，',
      '人們用它煮出熱騰騰的飯菜。',
      '看著古老的小鼎，',
      '就像翻開了一本神奇的歷史書！'
    ],
    contentAudioText: '博物館裡住著一個小鼎，圓圓的肚子，三隻穩穩的腳。很久很久以前，人們用它煮出熱騰騰的飯菜。看著古老的小鼎，就像翻開了一本神奇的歷史書！',
    vocabularies: [
      { char: '鼎', bpmf: 'ㄉㄧㄥˇ', radical: '鼎', strokeCount: 13, words: ['小鼎', '一言九鼎', '三足鼎立'], mnemonic: '象形字，兩耳三足之古代器物' },
      { char: '古', bpmf: 'ㄍㄨˇ', radical: '口', strokeCount: 5, words: ['古老', '古代', '古人'], mnemonic: '十代口口相傳為古' },
      { char: '肚', bpmf: 'ㄉㄨˋ', radical: '肉（月）', strokeCount: 7, words: ['肚子', '肚皮'], mnemonic: '月（肉）字旁加「土」' },
      { char: '穩', bpmf: 'ㄨㄣˇ', radical: '禾', strokeCount: 19, words: ['穩穩的', '穩定', '穩重'], mnemonic: '禾加急，禾穀安妥平穩' }
    ],
    questions: [
      {
        id: 'zh-s2-q12-1',
        type: 'word',
        title: '古代器物特徵',
        prompt: '「小鼎」最經典的特徵是有幾隻穩穩站立的腳呢？',
        options: ['三隻腳', '一隻腳', '五隻腳', '一百隻腳'],
        answer: '三隻腳',
        explanation: '古鼎經典造型多為三隻腳，站立得特別平穩，這也是「三足鼎立」成語的由來！'
      },
      {
        id: 'zh-s2-q12-2',
        type: 'sentence',
        title: '器官部首歸類',
        prompt: '「肚、腿、臂、臉」這些身體器官部位的字，部首多半是什麼？',
        options: ['肉（月）部', '木部', '水部', '金部'],
        answer: '肉（月）部',
        explanation: '漢字中的肉字旁通常寫作「月」，多與身體器官部位有關！'
      }
    ]
  }
];
