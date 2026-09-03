import { ChineseLesson } from '../types';

export const KANG_HSUAN_G1_CHINESE: ChineseLesson[] = [
  {
    id: 'zh-g1-u0-bopomofo',
    order: 0,
    title: '首冊：注音符號大探險',
    titleBpmf: 'ㄕㄡˇ ㄘㄜˋ ： ㄓㄨˋ ㄧㄣ ㄈㄨˊ ㄏㄠˋ ㄉㄚˋ ㄊㄢˋ ㄒㄧㄢˇ',
    subtitle: '37個聲母韻母與四個聲調好好玩',
    icon: '🔤',
    themeColor: 'from-amber-400 to-orange-500',
    summary: '認識注音符號（ㄅㄆㄇㄈ…）、結合韻與一二三四聲與輕聲，打好國語朗讀與識字基礎！',
    contentLines: [
      'ㄅ ㄆ ㄇ ㄈ，小手拍拍唱兒歌；',
      'ㄉ ㄊ ㄋ ㄌ，快樂學習上學去；',
      'ㄍ ㄎ ㄏ，開開心心交朋友；',
      'ㄐ ㄑ ㄒ，天天早起身體好；',
      'ㄓ ㄔ ㄕ ㄖ，ㄗ ㄘ ㄙ，讀書認真得第一；',
      'ㄧ ㄨ ㄩ，ㄚ ㄛ ㄜ ㄝ，',
      'ㄞ ㄟ ㄠ ㄡ，ㄢ ㄣ ㄤ ㄥ ㄦ。',
      '一聲平平高，二聲向上揚，三聲打個勾，四聲往下落，輕聲圓圓像彈珠！'
    ],
    contentAudioText: 'ㄅㄆㄇㄈ，小手拍拍唱兒歌；ㄉㄊㄋㄌ，快樂學習上學去；ㄍㄎㄏ，開開心心交朋友；ㄐㄑㄒ，天天早起身體好；ㄓㄔㄕㄖ，ㄗㄘㄙ，讀書認真得第一；ㄧㄨㄩ，ㄚㄛㄜㄝ，ㄞㄟㄠㄡ，ㄢㄣㄤㄥㄦ。一聲平平高，二聲向上揚，三聲打個勾，四聲往下落，輕聲圓圓像彈珠！',
    vocabularies: [
      { char: '爸', bpmf: 'ㄅㄚˋ', radical: '父', strokeCount: 8, words: ['爸爸', '老爸'], mnemonic: '父字頭下一個巴' },
      { char: '媽', bpmf: 'ㄇㄚ', radical: '女', strokeCount: 13, words: ['媽媽', '姑媽'], mnemonic: '女字旁加一個馬' },
      { char: '我', bpmf: 'ㄨㄛˇ', radical: '戈', strokeCount: 7, words: ['我們', '我的'], mnemonic: '一撇一橫豎鉤提，斜鉤撇點' }
    ],
    questions: [
      {
        id: 'zh-q0-1',
        type: 'bpmf',
        title: '聲調判斷',
        prompt: '「爸爸」的第一個字「爸」，是哪一個聲調呢？',
        options: ['第一聲（平聲）', '第二聲（揚聲 ˊ）', '第三聲（降升聲 ˇ）', '第四聲（去聲 ˋ）'],
        answer: '第四聲（去聲 ˋ）',
        explanation: '「爸」的注音是 ㄅㄚˋ，右上角有向下的去聲符號，是第四聲！'
      },
      {
        id: 'zh-q0-2',
        type: 'word',
        title: '注音拼音',
        prompt: '「ㄇ」加上「ㄚ」加上第一聲，會拼成什麼字呢？',
        options: ['媽', '爸', '大', '花'],
        answer: '媽',
        explanation: 'ㄇ-ㄚ 拼出來就是「媽」！'
      }
    ]
  },
  {
    id: 'zh-g1-u1-clap',
    order: 1,
    title: '第一課：拍拍手',
    titleBpmf: 'ㄉㄧˋ ㄧ ㄎㄜˋ ： ㄆㄞ ㄆㄞ ㄕㄡˇ',
    subtitle: '一隻手，拍拍手；兩隻手，拉拉手',
    icon: '👏',
    themeColor: 'from-sky-400 to-blue-500',
    summary: '透過肢體律動兒歌，認識手部動作、左右方位與「手（扌）」部首漢字。',
    contentLines: [
      '一隻手，拍拍手；',
      '兩隻手，拉拉手。',
      '左拍拍，右拍拍，',
      '上拍拍，下拍拍，',
      '大家一起拍拍手，',
      '開開心心好朋友。'
    ],
    contentAudioText: '一隻手，拍拍手；兩隻手，拉拉手。左拍拍，右拍拍，上拍拍，下拍拍，大家一起拍拍手，開開心心好朋友。',
    vocabularies: [
      { char: '拍', bpmf: 'ㄆㄞ', radical: '手（扌）', strokeCount: 8, words: ['拍手', '拍照', '拍球'], mnemonic: '提手旁（扌）加一個「白」' },
      { char: '拉', bpmf: 'ㄌㄚ', radical: '手（扌）', strokeCount: 8, words: ['拉手', '拉車', '拉開'], mnemonic: '提手旁（扌）加一個「立」' },
      { char: '手', bpmf: 'ㄕㄡˇ', radical: '手', strokeCount: 4, words: ['小手', '雙手', '拍手'], mnemonic: '像五根手指伸開的形狀' },
      { char: '左', bpmf: 'ㄗㄨㄛˇ', radical: '工', strokeCount: 5, words: ['左手', '左邊', '左右'], mnemonic: '橫撇下面一個「工」' },
      { char: '右', bpmf: 'ㄧㄡˋ', radical: '口', strokeCount: 5, words: ['右手', '右邊', '右轉'], mnemonic: '橫撇下面一個「口」' }
    ],
    questions: [
      {
        id: 'zh-q1-1',
        type: 'word',
        title: '課文理解',
        prompt: '課文中提到「兩隻手」在做什麼動作呢？',
        options: ['拉拉手', '拍拍手', '揮揮手', '洗洗手'],
        answer: '拉拉手',
        explanation: '課文說：「一隻手，拍拍手；兩隻手，拉拉手。」'
      },
      {
        id: 'zh-q1-2',
        type: 'stroke',
        title: '部首認識',
        prompt: '「拍」和「拉」都是用手做的動作，它們的部首都是什麼呢？',
        options: ['手（扌）部', '木部', '口部', '人部'],
        answer: '手（扌）部',
        explanation: '「拍」和「拉」都和手部的動作有關，所以都是提手旁「扌」部！'
      },
      {
        id: 'zh-q1-3',
        type: 'sentence',
        title: '方位詞配對',
        prompt: '「左」的反義詞是什麼？（例如：左手對應哪隻手？）',
        options: ['右', '上', '下', '前'],
        answer: '右',
        explanation: '「左」和「右」是一對方向相反的詞喔！'
      }
    ]
  },
  {
    id: 'zh-g1-u2-whose',
    order: 2,
    title: '第二課：這是誰的',
    titleBpmf: 'ㄉㄧˋ ㄦˋ ㄎㄜˋ ： ㄓㄜˋ ㄕˋ ㄕㄟˊ ㄉㄜ˙',
    subtitle: '一二三，數一數，桌上有積木',
    icon: '🧩',
    themeColor: 'from-emerald-400 to-teal-500',
    summary: '透過觀察桌上的幾何積木與校園生活文具，學習代名詞與禮貌應對。',
    contentLines: [
      '一二三，數一數，',
      '桌上有積木。',
      '長長的是誰的？',
      '圓圓的是誰的？',
      '這是我的積木，',
      '那是你的積木。',
      '大家一起拼出城堡來！'
    ],
    contentAudioText: '一二三，數一數，桌上有積木。長長的是誰的？圓圓的是誰的？這是我的積木，那是你的積木。大家一起拼出城堡來！',
    vocabularies: [
      { char: '這', bpmf: 'ㄓㄜˋ', radical: '辵（辶）', strokeCount: 11, words: ['這是', '這個', '這裡'], mnemonic: '言＋辶，靠近自己的人事物' },
      { char: '那', bpmf: 'ㄋㄚˋ', radical: '邑（阝）', strokeCount: 7, words: ['那是', '那個', '那裡'], mnemonic: '遠處的人事物' },
      { char: '誰', bpmf: 'ㄕㄟˊ', radical: '言（讠）', strokeCount: 15, words: ['誰的', '是誰'], mnemonic: '言字旁加一個「隹」' },
      { char: '我', bpmf: 'ㄨㄛˇ', radical: '戈', strokeCount: 7, words: ['我們', '我的'], mnemonic: '自己' },
      { char: '你', bpmf: 'ㄋㄧˇ', radical: '人（亻）', strokeCount: 7, words: ['你們', '你的'], mnemonic: '單人旁加一個「爾」' }
    ],
    questions: [
      {
        id: 'zh-q2-1',
        type: 'word',
        title: '代名詞運用',
        prompt: '離自己比較近的物品，我們會說「____是我的積木」？',
        options: ['這', '那', '誰', '哪'],
        answer: '這',
        explanation: '靠近說話者用「這」，距離較遠用「那」！'
      },
      {
        id: 'zh-q2-2',
        type: 'sentence',
        title: '疊字詞形容',
        prompt: '課文中用什麼疊字詞來形容球形積木呢？',
        options: ['圓圓的', '長長的', '方方的', '高高的'],
        answer: '圓圓的',
        explanation: '課文中寫到「長長的是誰的？圓圓的是誰的？」'
      }
    ]
  },
  {
    id: 'zh-g1-u3-swing',
    order: 3,
    title: '第三課：秋千',
    titleBpmf: 'ㄉㄧˋ ㄙㄢ ㄎㄜˋ ： ㄑㄧㄡ ㄑㄧㄢ',
    subtitle: '高高盪上去，看見遠方的山',
    icon: '🎪',
    themeColor: 'from-purple-400 to-indigo-500',
    summary: '描寫公園裡盪秋千的快樂節奏，高低起伏的視野與童趣想像。',
    contentLines: [
      '盪秋千，盪秋千，',
      '高高盪上去，看見遠方的山；',
      '輕輕盪下來，看見地上的花。',
      '風兒在耳邊唱歌，',
      '秋千是我的好朋友，',
      '陪我飛上藍天！'
    ],
    contentAudioText: '盪秋千，盪秋千，高高盪上去，看見遠方的山；輕輕盪下來，看見地上的花。風兒在耳邊唱歌，秋千是我的好朋友，陪我飛上藍天！',
    vocabularies: [
      { char: '高', bpmf: 'ㄍㄠ', radical: '高', strokeCount: 10, words: ['高山', '高興', '高大'], mnemonic: '一點一橫一小口，下面高樓立起來' },
      { char: '上', bpmf: 'ㄕㄤˋ', radical: '一', strokeCount: 3, words: ['上面', '上學', '上來'], mnemonic: '指事字，一橫上面標記一豎' },
      { char: '下', bpmf: 'ㄒㄧㄚˋ', radical: '一', strokeCount: 3, words: ['下面', '下午', '下來'], mnemonic: '指事字，一橫下面標記一豎' },
      { char: '山', bpmf: 'ㄕㄢ', radical: '山', strokeCount: 3, words: ['高山', '山羊', '山頂'], mnemonic: '象形字，像三座起伏的山峰' },
      { char: '花', bpmf: 'ㄏㄨㄚ', radical: '艸（艹）', strokeCount: 8, words: ['花朵', '開花', '花園'], mnemonic: '草字頭加一個「化」' }
    ],
    questions: [
      {
        id: 'zh-q3-1',
        type: 'word',
        title: '課文細節',
        prompt: '秋千高高盪上去的時候，會看見什麼呢？',
        options: ['遠方的山', '地上的花', '水裡的小魚', '天上的星星'],
        answer: '遠方的山',
        explanation: '課文說：「高高盪上去，看見遠方的山；輕輕盪下來，看見地上的花。」'
      },
      {
        id: 'zh-q3-2',
        type: 'sentence',
        title: '反義詞配對',
        prompt: '「高高盪上去」的「上」，相反詞是哪一個字？',
        options: ['下', '前', '後', '左'],
        answer: '下',
        explanation: '「上」與「下」是一對相反詞喔！'
      }
    ]
  },
  {
    id: 'zh-g1-u4-size',
    order: 4,
    title: '第四課：大個子，小個子',
    titleBpmf: 'ㄉㄧˋ ㄙˋ ㄎㄜˋ ： ㄉㄚˋ ㄍㄜ˙ ㄗ˙ ， ㄒㄧㄠˇ ㄍㄜ˙ ㄗ˙',
    subtitle: '高高的大樹，矮矮的花草，都是好朋友',
    icon: '🦒',
    themeColor: 'from-amber-500 to-rose-400',
    summary: '描寫高矮身材不同的動物與同伴，尊重彼此差異並互助合作。',
    contentLines: [
      '大個子，步子大；',
      '小個子，步子小。',
      '大個子看遠方，',
      '小個子看花草。',
      '大個子，小個子，',
      '手拉手，一起走，',
      '大家都是好朋友！'
    ],
    contentAudioText: '大個子，步子大；小個子，步子小。大個子看遠方，小個子看花草。大個子，小個子，手拉手，一起走，大家都是好朋友！',
    vocabularies: [
      { char: '大', bpmf: 'ㄉㄚˋ', radical: '大', strokeCount: 3, words: ['大人', '大樹', '大象'], mnemonic: '一人伸展雙臂成「大」' },
      { char: '小', bpmf: 'ㄒㄧㄠˇ', radical: '小', strokeCount: 3, words: ['小孩', '小鳥', '小心'], mnemonic: '中豎左右各一點' },
      { char: '個', bpmf: 'ㄍㄜ˙', radical: '人（亻）', strokeCount: 10, words: ['一個', '個子', '每個'], mnemonic: '人字旁加一個「固」' },
      { char: '朋', bpmf: 'ㄆㄥˊ', radical: '月', strokeCount: 8, words: ['朋友', '朋黨'], mnemonic: '兩個月亮排在一起' },
      { char: '友', bpmf: 'ㄧㄡˇ', radical: '又', strokeCount: 4, words: ['朋友', '友情', '友愛'], mnemonic: '兩隻右手相握，象徵友好' }
    ],
    questions: [
      {
        id: 'zh-q4-1',
        type: 'word',
        title: '詞彙特徵',
        prompt: '「朋」和「友」組合起來，是什麼意思呢？',
        options: ['好朋友（夥伴）', '敵人', '玩具', '植物'],
        answer: '好朋友（夥伴）',
        explanation: '「朋友」是指感情很好、一起玩耍學習的同伴！'
      },
      {
        id: 'zh-q4-2',
        type: 'sentence',
        title: '反義詞認識',
        prompt: '「大」個子的「大」，相反的字是？',
        options: ['小', '多', '少', '長'],
        answer: '小',
        explanation: '「大」與「小」是一對大小相反詞！'
      }
    ]
  },
  {
    id: 'zh-g1-u5-compare',
    order: 5,
    title: '第五課：比一比',
    titleBpmf: 'ㄉㄧˋ ㄨˇ ㄎㄜˋ ： ㄅㄧˇ ㄧ ㄅㄧˇ',
    subtitle: '比長短，比大小，比一比真有趣',
    icon: '⚖️',
    themeColor: 'from-pink-400 to-rose-500',
    summary: '透過具體生活物品的長度、重量與數量比較，掌握形容詞疊字與比較句型。',
    contentLines: [
      '比一比，看一看。',
      '西瓜大，蘋果小；',
      '毛筆長，橡皮擦短。',
      '大象重，小鳥輕；',
      '動動腦，比一比，',
      '自然世界的祕密真不少！'
    ],
    contentAudioText: '比一比，看一看。西瓜大，蘋果小；毛筆長，橡皮擦短。大象重，小鳥輕；動動腦，比一比，自然世界的祕密真不少！',
    vocabularies: [
      { char: '比', bpmf: 'ㄅㄧˇ', radical: '比', strokeCount: 4, words: ['比較', '比賽', '相比'], mnemonic: '兩個人並肩站在一起相比' },
      { char: '長', bpmf: 'ㄔㄤˊ', radical: '長', strokeCount: 8, words: ['長短', '長大', '長頸鹿'], mnemonic: '像長髮飄飄的樣子' },
      { char: '短', bpmf: 'ㄉㄨㄢˇ', radical: '矢', strokeCount: 12, words: ['長短', '短處', '短暫'], mnemonic: '矢字旁加一個「豆」' },
      { char: '多', bpmf: 'ㄉㄨㄛ', radical: '夕', strokeCount: 6, words: ['多少', '很多', '多數'], mnemonic: '兩個「夕」疊加，表示很多' },
      { char: '少', bpmf: 'ㄕㄠˇ', radical: '小', strokeCount: 4, words: ['多少', '很少', '少年'], mnemonic: '「小」字加一撇，表示微少' }
    ],
    questions: [
      {
        id: 'zh-q5-1',
        type: 'sentence',
        title: '生活常識比較',
        prompt: '「西瓜大，蘋果小」這句話在比什麼呢？',
        options: ['大小', '長短', '顏色', '味道'],
        answer: '大小',
        explanation: '西瓜大、蘋果小，是在比較水果的大小體積！'
      },
      {
        id: 'zh-q5-2',
        type: 'word',
        title: '相反詞配對',
        prompt: '「多」的相反詞是哪一個字？',
        options: ['少', '大', '短', '輕'],
        answer: '少',
        explanation: '「多」與「少」是一對數量相反詞！'
      }
    ]
  },
  {
    id: 'zh-g1-u6-path',
    order: 6,
    title: '第六課：小路',
    titleBpmf: 'ㄉㄧˋ ㄌㄧㄡˋ ㄎㄜˋ ： ㄒㄧㄠˇ ㄌㄨˋ',
    subtitle: '小路彎彎，通往綠色森林',
    icon: '🛤️',
    themeColor: 'from-emerald-500 to-green-600',
    summary: '描寫彎彎曲曲的林間步道，通往公園、學校與溫暖的家。',
    contentLines: [
      '小路小路彎彎曲曲，',
      '走過草地，走過大樹。',
      '小路向前伸，',
      '帶我們到學校讀書，',
      '帶我們回家喝熱湯。',
      '走在小路上，處處有歡笑！'
    ],
    contentAudioText: '小路小路彎彎曲曲，走過草地，走過大樹。小路向前伸，帶我們到學校讀書，帶我們回家喝熱湯。走在小路上，處處有歡笑！',
    vocabularies: [
      { char: '路', bpmf: 'ㄌㄨˋ', radical: '足', strokeCount: 13, words: ['馬路', '小路', '道路'], mnemonic: '足字旁加一個「各」，腳走出來的途徑' },
      { char: '走', bpmf: 'ㄗㄡˇ', radical: '走', strokeCount: 7, words: ['走路', '走開', '行走'], mnemonic: '上面一人擺臂，下面止步奔跑' },
      { char: '家', bpmf: 'ㄐㄧㄚ', radical: '宀', strokeCount: 10, words: ['家人', '回家', '家庭'], mnemonic: '寶蓋頭（宀房屋）下面養了一頭豬（豕）' },
      { char: '樹', bpmf: 'ㄕㄨˋ', radical: '木', strokeCount: 16, words: ['大樹', '樹木', '樹葉'], mnemonic: '木字旁加「壴」加「寸」' }
    ],
    questions: [
      {
        id: 'zh-q6-1',
        type: 'word',
        title: '部首特徵',
        prompt: '「路」和「跳」都需要用腳，它們的部首都是什麼呢？',
        options: ['足（𧾷）部', '木部', '手部', '水部'],
        answer: '足（𧾷）部',
        explanation: '和腳部動作或路徑有關的字，常常是「足」部！'
      },
      {
        id: 'zh-q6-2',
        type: 'sentence',
        title: '疊字詞描摹',
        prompt: '課文中用什麼疊字詞來形容小路的形狀？',
        options: ['彎彎曲曲', '平平坦坦', '方方正正', '圓圓滾滾'],
        answer: '彎彎曲曲',
        explanation: '課文說：「小路小路彎彎曲曲，走過草地，走過大樹。」'
      }
    ]
  },
  {
    id: 'zh-g1-u7-race',
    order: 7,
    title: '第七課：龜兔賽跑',
    titleBpmf: 'ㄉㄧˋ ㄑㄧ ㄎㄜˋ ： ㄍㄨㄟ ㄊㄨˋ ㄙㄞˋ ㄆㄠˇ',
    subtitle: '烏龜一步一步走，堅持到底不放棄',
    icon: '🐢',
    themeColor: 'from-amber-600 to-yellow-500',
    summary: '經典寓言故事改寫，學習順序連接詞與堅持到底的美德。',
    contentLines: [
      '小兔子跑得快，',
      '烏龜慢慢爬。',
      '小兔子驕傲睡大覺，',
      '烏龜一步一步向前走。',
      '一二三，堅持到底，',
      '烏龜贏得了第一名！',
      '做事情有耐心，大家來誇獎。'
    ],
    contentAudioText: '小兔子跑得快，烏龜慢慢爬。小兔子驕傲睡大覺，烏龜一步一步向前走。一二三，堅持到底，烏龜贏得了第一名！做事情有耐心，大家來誇獎。',
    vocabularies: [
      { char: '兔', bpmf: 'ㄊㄨˋ', radical: '儿', strokeCount: 8, words: ['兔子', '小白兔', '兔年'], mnemonic: '象形字，長耳朵短尾巴' },
      { char: '快', bpmf: 'ㄎㄨㄞˋ', radical: '心（忄）', strokeCount: 7, words: ['快樂', '快慢', '飛快'], mnemonic: '豎心旁（忄）加一個「夬」' },
      { char: '慢', bpmf: 'ㄇㄢˋ', radical: '心（忄）', strokeCount: 14, words: ['慢跑', '緩慢', '慢慢走'], mnemonic: '豎心旁（忄）加一個「曼」' },
      { char: '步', bpmf: 'ㄅㄨˋ', radical: '止', strokeCount: 7, words: ['跑步', '步子', '進步'], mnemonic: '一前一後邁開雙足' }
    ],
    questions: [
      {
        id: 'zh-q7-1',
        type: 'sentence',
        title: '故事寓意',
        prompt: '為什麼慢慢爬的烏龜最後會拿到第一名呢？',
        options: ['因為烏龜堅持到底不放棄', '因為兔子腳痛', '因為烏龜會飛', '因為路線很短'],
        answer: '因為烏龜堅持到底不放棄',
        explanation: '烏龜很有耐心、一步一步向前走不放棄，所以獲得勝利！'
      },
      {
        id: 'zh-q7-2',
        type: 'word',
        title: '速度反義詞',
        prompt: '「兔子跑得快」的「快」，相反的字是？',
        options: ['慢', '早', '晚', '停'],
        answer: '慢',
        explanation: '「快」和「慢」是一對形容速度的相反詞！'
      }
    ]
  },
  {
    id: 'zh-g1-u8-radish',
    order: 8,
    title: '第八課：拔蘿蔔',
    titleBpmf: 'ㄉㄧˋ ㄅㄚ ㄎㄜˋ ： ㄅㄚˊ ㄌㄨㄛˊ ㄅㄛ˙',
    subtitle: '拔蘿蔔，拔蘿蔔，大家一起來幫忙',
    icon: '🥕',
    themeColor: 'from-orange-500 to-amber-600',
    summary: '節奏明快的兒歌故事，學習團結合作、動詞疊唱與家庭互動。',
    contentLines: [
      '拔蘿蔔，拔蘿蔔，',
      '嗨唷嗨唷拔蘿蔔，嗨唷嗨唷拔不動！',
      '老爺爺，拉著大蘿蔔；',
      '老奶奶，拉著老爺爺；',
      '小花貓，小黃狗，大家快快來！',
      '一二三，齊用力，',
      '大蘿蔔，拔出來囉！'
    ],
    contentAudioText: '拔蘿蔔，拔蘿蔔，嗨唷嗨唷拔蘿蔔，嗨唷嗨唷拔不動！老爺爺，拉著大蘿蔔；老奶奶，拉著老爺爺；小花貓，小黃狗，大家快快來！一二三，齊用力，大蘿蔔，拔出來囉！',
    vocabularies: [
      { char: '拔', bpmf: 'ㄅㄚˊ', radical: '手（扌）', strokeCount: 8, words: ['拔草', '拔河', '拔出來'], mnemonic: '提手旁加「犮」' },
      { char: '力', bpmf: 'ㄌㄧˋ', radical: '力', strokeCount: 2, words: ['用力', '力量', '力氣'], mnemonic: '像手臂筋骨肌肉用力的形狀' },
      { char: '老', bpmf: 'ㄌㄠˇ', radical: '老', strokeCount: 6, words: ['老人', '老師', '老爺爺'], mnemonic: '長者拄拐杖' },
      { char: '動', bpmf: 'ㄉㄨㄥˋ', radical: '力', strokeCount: 11, words: ['動作', '活動', '動手'], mnemonic: '重加力，付出力量才能移動' }
    ],
    questions: [
      {
        id: 'zh-q8-1',
        type: 'word',
        title: '部首特徵',
        prompt: '「力」和「動」字中都有一個共通的部首，代表什麼呢？',
        options: ['力部（代表力量、力氣）', '水部', '木部', '日部'],
        answer: '力部（代表力量、力氣）',
        explanation: '「力」字本身就是部首，代表出力氣的動作！'
      },
      {
        id: 'zh-q8-2',
        type: 'sentence',
        title: '故事核心精神',
        prompt: '原本一個人拔不動的大蘿蔔，最後是靠什麼拔出來的？',
        options: ['大家同心協力一起幫忙', '找大吊車來', '把蘿蔔切碎', '等蘿蔔自己跳出來'],
        answer: '大家同心協力一起幫忙',
        explanation: '老爺爺、老奶奶和小動物們團結一心，終於把大蘿蔔拔了出來！'
      }
    ]
  }
];
