import { ChineseLesson } from '../types';

export const HANLIN_G2_S1_CHINESE: ChineseLesson[] = [
  {
    id: 'hl-g2-s1-u1-mood',
    order: 1,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第一課：好心情',
    titleBpmf: 'ㄉㄧˋ ㄧ ㄎㄜˋ ： ㄏㄠˇ ㄒㄧㄣ ㄑㄧㄥˊ',
    subtitle: '微笑掛臉上，天天好心情',
    icon: '😊',
    themeColor: 'from-amber-400 to-orange-500',
    summary: '從早晨起床拉開窗簾出發，感受微笑與好心情帶來的美好一天，學習情緒表達與正向詞彙。',
    contentLines: [
      '清晨早起推開窗，',
      '金黃色的陽光照在我的臉上。',
      '跟小鳥說聲早安，',
      '跟鏡子裡的自己微微笑。',
      '嘴角揚起一道小彩虹，',
      '今天的心情就像飛上藍天的氣球，',
      '輕飄飄，真快樂！'
    ],
    contentAudioText: '清晨早起推開窗，金黃色的陽光照在我的臉上。跟小鳥說聲早安，跟鏡子裡的自己微微笑。嘴角揚起一道小彩虹，今天的心情就像飛上藍天的氣球，輕飄飄，真快樂！',
    vocabularies: [
      { char: '情', bpmf: 'ㄑㄧㄥˊ', radical: '心（忄）', strokeCount: 11, words: ['心情', '事情', '熱情'], mnemonic: '豎心旁（忄）加一個「青」' },
      { char: '窗', bpmf: 'ㄔㄨㄤ', radical: '穴', strokeCount: 12, words: ['窗戶', '窗外', '開窗'], mnemonic: '穴字頭下煙囪形，通風採光之口' },
      { char: '晨', bpmf: 'ㄔㄣˊ', radical: '日', strokeCount: 11, words: ['清晨', '早晨', '晨光'], mnemonic: '日字頭加「辰」，朝陽初升之時' },
      { char: '球', bpmf: 'ㄑㄧㄡˊ', radical: '玉（王）', strokeCount: 11, words: ['氣球', '皮球', '足球'], mnemonic: '玉字旁加一個「求」，圓美如玉之物' }
    ],
    questions: [
      {
        id: 'hl-q1-1',
        type: 'word',
        title: '情緒詞語運用',
        prompt: '課文中說把「嘴角揚起一道小彩虹」是什麼意思？',
        options: ['露出燦爛美麗的微笑', '在臉上塗顏料', '嘴巴張得很大吃東西', '生氣嘟嘴'],
        answer: '露出燦爛美麗的微笑',
        explanation: '彎彎的嘴角笑起來就像彩虹一樣，代表心情很好、露出微笑！'
      },
      {
        id: 'hl-q1-2',
        type: 'stroke',
        title: '心情與心理部首',
        prompt: '「情、懷、快」這些跟人的心情感受有關的字，部首是什麼？',
        options: ['心（忄）部', '手部', '口部', '木部'],
        answer: '心（忄）部',
        explanation: '表達內心情緒、感受與心理活動的漢字，大多屬於「心（忄）」部！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u2-shadow',
    order: 2,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第二課：踩影子',
    titleBpmf: 'ㄉㄧˋ ㄦˋ ㄎㄜˋ ： ㄘㄞˇ ㄧㄥˇ ㄗ˙',
    subtitle: '陽光下追影子，形影不離真好玩',
    icon: '🏃',
    themeColor: 'from-sky-400 to-blue-600',
    summary: '透過課間操場上踩影子的遊戲，觀察光線與影子的方向長短變化，結合科學常識與同伴互動。',
    contentLines: [
      '太陽公公在天空中照耀，',
      '操場上跑著許多黑黑色的小影子。',
      '我向前跑，影子在後面追；',
      '我停下腳步，影子也乖乖立正。',
      '「快來踩我的影子！」',
      '大家笑著轉圈跳躍，',
      '影子是我們形影不離的大玩伴！'
    ],
    contentAudioText: '太陽公公在天空中照耀，操場上跑著許多黑黑色的小影子。我向前跑，影子在後面追；我停下腳步，影子也乖乖立正。「快來踩我的影子！」大家笑著轉圈跳躍，影子是我們形影不離的大玩伴！',
    vocabularies: [
      { char: '影', bpmf: 'ㄧㄥˇ', radical: '彡', strokeCount: 15, words: ['影子', '身影', '電影'], mnemonic: '日京加彡，陽光照射下的人形黑影' },
      { char: '場', bpmf: 'ㄔㄤˊ', radical: '土', strokeCount: 12, words: ['操場', '廣場', '場地'], mnemonic: '土字旁加「昜」，寬敞平坦的地面' },
      { char: '追', bpmf: 'ㄓㄨㄟ', radical: '辵（辶）', strokeCount: 10, words: ['追趕', '追逐', '追求'], mnemonic: '走之底（辶）加「𠂤」，快步跟上' },
      { char: '步', bpmf: 'ㄅㄨˋ', radical: '止', strokeCount: 7, words: ['腳步', '步伐', '跑步'], mnemonic: '雙腳交替向前邁進' }
    ],
    questions: [
      {
        id: 'hl-q2-1',
        type: 'word',
        title: '成語意境理解',
        prompt: '課文說影子像「形影不離」的玩伴，「形影不離」的意思是？',
        options: ['關係非常親密，隨時陪伴在身邊', '常常吵架分開', '看不到影子', '跑到很遠的地方'],
        answer: '關係非常親密，隨時陪伴在身邊',
        explanation: '「形影不離」形容人與人之間關係緊密，像身體跟影子一樣分不開！'
      },
      {
        id: 'hl-q2-2',
        type: 'sentence',
        title: '科學生活觀察',
        prompt: '當我們背對著太陽向前跑時，影子通常會落在我們的？',
        options: ['正前方', '正後方', '頭頂正上方', '地底下'],
        answer: '正前方',
        explanation: '光線被身體擋住時，影子會出現在背光的那一側（背對太陽跑時影子在前方）！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u3-friend',
    order: 3,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第三課：謝謝好朋友',
    titleBpmf: 'ㄉㄧˋ ㄙㄢ ㄎㄜˋ ： ㄒㄧㄝˋ ㄒㄧㄝ˙ ㄏㄠˇ ㄆㄥˊ ㄧㄡˇ',
    subtitle: '借我蠟筆教我題，真心說聲謝謝你',
    icon: '🎁',
    themeColor: 'from-pink-400 to-rose-500',
    summary: '體會校園中同學之間的互相扶持與互助美德，學習真誠表達謝意與同理心。',
    contentLines: [
      '下雨天，你跟我共撐一把傘；',
      '畫畫時，你大方借我藍色彩筆。',
      '當我跑步跌倒時，',
      '你輕輕扶起我，拍拍我身上的泥土。',
      '好朋友就像溫暖的小太陽，',
      '我要在卡片上寫下真心話：',
      '「謝謝你，有你真好！」'
    ],
    contentAudioText: '下雨天，你跟我共撐一把傘；畫畫時，你大方借我藍色彩筆。當我跑步跌倒時，你輕輕扶起我，拍拍我身上的泥土。好朋友就像溫暖的小太陽，我要在卡片上寫下真心話：「謝謝你，有你真好！」',
    vocabularies: [
      { char: '傘', bpmf: 'ㄙㄢˇ', radical: '人', strokeCount: 12, words: ['雨傘', '洋傘', '撐傘'], mnemonic: '象形字，張開之布頂下有人有骨架' },
      { char: '借', bpmf: 'ㄐㄧㄝˋ', radical: '人（亻）', strokeCount: 10, words: ['借用', '借書', '借給'], mnemonic: '人字旁加「昔」，互相支援借調' },
      { char: '跌', bpmf: 'ㄉㄧㄝˊ', radical: '足', strokeCount: 12, words: ['跌倒', '摔跌'], mnemonic: '足字旁加「失」，腳失足絆倒' },
      { char: '扶', bpmf: 'ㄈㄨˊ', radical: '手（扌）', strokeCount: 7, words: ['扶手', '扶起', '攙扶'], mnemonic: '提手旁加「夫」，用手給予支撐' }
    ],
    questions: [
      {
        id: 'hl-q3-1',
        type: 'sentence',
        title: '同伴互助美德',
        prompt: '當看見同伴跑步不小心跌倒時，最貼心的做法是？',
        options: ['主動扶他起來並關心他', '在旁邊大聲嘲笑', '假裝沒看見跑走', '搶走他的帽子'],
        answer: '主動扶他起來並關心他',
        explanation: '友愛互助是好朋友最重要的美德，及時扶起同伴並給予安慰最貼心！'
      },
      {
        id: 'hl-q3-2',
        type: 'word',
        title: '字義理解',
        prompt: '「共撐一把傘」的「共」字是什麼意思？',
        options: ['共同、一起', '分開', '丟掉', '打破'],
        answer: '共同、一起',
        explanation: '「共」是指兩個人一起分享、共同使用！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-rev1',
    order: 3.5,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'review',
    title: '統整活動一：生活好情誼',
    titleBpmf: 'ㄊㄨㄥˇ ㄓㄥˇ ㄏㄨㄛˊ ㄉㄨㄥˋ ㄧ ： ㄕㄥ ㄏㄨㄛˊ ㄏㄠˇ ㄑㄧㄥˊ ㄧˊ',
    subtitle: '第一單元複習：詞語搭配與情緒標點符號',
    icon: '🌟',
    themeColor: 'from-amber-500 to-yellow-600',
    summary: '統整第一至第三課的心理情緒動詞、感嘆句（！）、禮貌應對與生字部首。',
    contentLines: [
      '第一單元回顧：',
      '1. 認識「心（忄）部」漢字：情、快、憶、忙。',
      '2. 練習完整句子：因為……所以……，心情真好！',
      '3. 禮貌魔術話語：請、謝謝、對不起、沒關係。'
    ],
    contentAudioText: '第一單元回顧：認識心字旁漢字：情、快、憶、忙。練習完整句子：因為、所以、心情真好！禮貌魔術話語：請、謝謝、對不起、沒關係。',
    vocabularies: [
      { char: '禮', bpmf: 'ㄌㄧˇ', radical: '示（礻）', strokeCount: 18, words: ['禮貌', '禮物', '典禮'], mnemonic: '示字旁加「豊」，虔敬祭拜待人之儀' },
      { char: '貌', bpmf: 'ㄇㄠˋ', radical: '豸', strokeCount: 14, words: ['禮貌', '面貌', '相貌'], mnemonic: '容貌儀態端正' }
    ],
    questions: [
      {
        id: 'hl-qr1-1',
        type: 'sentence',
        title: '標點符號運用',
        prompt: '表示心中強烈的情緒驚訝、讚嘆或感謝時，句尾通常使用什麼標點？',
        options: ['驚嘆號（！）', '問號（？）', '逗號（，）', '頓號（、）'],
        answer: '驚嘆號（！）',
        explanation: '驚嘆號（！）表示強烈的感嘆、喜悅或感謝語氣！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u4-umbrella',
    order: 4,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第四課：水墨下的城堡',
    titleBpmf: 'ㄉㄧˋ ㄙˋ ㄎㄜˋ ： ㄕㄨㄟˇ ㄇㄛˋ ㄒㄧㄚˋ ㄉㄜ˙ ㄔㄥˊ ㄅㄠˇ',
    subtitle: '濃墨淡墨暈染開，畫出奇妙古城堡',
    icon: '🏰',
    themeColor: 'from-slate-600 to-slate-800',
    summary: '結合傳統水墨畫的濃淡乾濕技法，發揮豐富想像力描繪心中的幻想城堡，領略藝術美感。',
    contentLines: [
      '毛筆沾飽黑墨汁，',
      '在宣紙上輕輕一點、慢慢畫開。',
      '墨色有濃有淡，',
      '淡墨化成了高聳的山峰與雲霧，',
      '濃墨勾勒出雄偉的城堡大門。',
      '這座水墨畫裡的城堡，',
      '正等著我們去探險呢！'
    ],
    contentAudioText: '毛筆沾飽黑墨汁，在宣紙上輕輕一點、慢慢畫開。墨色有濃有淡，淡墨化成了高聳的山峰與雲霧，濃墨勾勒出雄偉的城堡大門。這座水墨畫裡的城堡，正等著我們去探險呢！',
    vocabularies: [
      { char: '墨', bpmf: 'ㄇㄛˋ', radical: '土', strokeCount: 15, words: ['水墨', '墨汁', '墨水'], mnemonic: '黑加土，研磨黑粉為墨' },
      { char: '城', bpmf: 'ㄔㄥˊ', radical: '土', strokeCount: 9, words: ['城堡', '城市', '長城'], mnemonic: '土字旁加「成」，築土築磚而成堡壘' },
      { char: '堡', bpmf: 'ㄅㄠˇ', radical: '土', strokeCount: 12, words: ['城堡', '堡壘', '漢堡'], mnemonic: '保加土，防守安保之土石建築' },
      { char: '濃', bpmf: 'ㄋㄨㄥˊ', radical: '水（氵）', strokeCount: 16, words: ['濃淡', '濃稠', '濃密'], mnemonic: '三點水加「農」，水色厚重' }
    ],
    questions: [
      {
        id: 'hl-q4-1',
        type: 'word',
        title: '水墨技法特點',
        prompt: '國畫水墨中最神奇的視覺效果是墨色的什麼變化？',
        options: ['有濃有淡，層次分明', '全部塗成一樣黑', '用螢光筆染色', '用彩紙撕貼'],
        answer: '有濃有淡，層次分明',
        explanation: '水墨畫透過水分與墨汁比例調配，能表現出濃、淡、乾、濕的千變萬化！'
      },
      {
        id: 'hl-q4-2',
        type: 'stroke',
        title: '建築地貌部首',
        prompt: '「城、堡、地、培」這些跟泥土磚石建築有關的字，部首多為？',
        options: ['土部', '金部', '水部', '木部'],
        answer: '土部',
        explanation: '古城堡多為壘土起造，因此「城」與「堡」皆屬於「土」部！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u5-beach',
    order: 5,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第五課：沙灘上的畫',
    titleBpmf: 'ㄉㄧˋ ㄨˇ ㄎㄜˋ ： ㄕㄚ ㄊㄢ ㄕㄤˋ ㄉㄜ˙ ㄏㄨㄚˋ',
    subtitle: '海浪是擦布，沙灘是畫紙',
    icon: '🏖️',
    themeColor: 'from-amber-400 to-teal-500',
    summary: '描寫海邊拾貝、用樹枝在金色沙灘作畫的樂趣，體會浪花自然撫平畫面的無窮生命律動。',
    contentLines: [
      '金黃色的沙灘，',
      '是大自然最遼闊的畫布。',
      '我拿起小樹枝，',
      '畫了一隻大螃蟹，畫了一艘大帆船。',
      '嘩啦！嘩啦！海浪跑過來，',
      '調皮的浪花像一把大擦布，',
      '把畫帶回大海裡，留下亮晶晶的貝殼！'
    ],
    contentAudioText: '金黃色的沙灘，是大自然最遼闊的畫布。我拿起小樹枝，畫了一隻大螃蟹，畫了一艘大帆船。嘩啦！嘩啦！海浪跑過來，調皮的浪花像一把大擦布，把畫帶回大海裡，留下亮晶晶的貝殼！',
    vocabularies: [
      { char: '沙', bpmf: 'ㄕㄚ', radical: '水（氵）', strokeCount: 7, words: ['沙灘', '細沙', '沙漠'], mnemonic: '三點水加「少」，水邊細碎微小之石粒' },
      { char: '灘', bpmf: 'ㄊㄢ', radical: '水（氵）', strokeCount: 22, words: ['海灘', '沙灘', '河灘'], mnemonic: '三點水加「難」，水邊平坦之石灘' },
      { char: '浪', bpmf: 'ㄌㄤˋ', radical: '水（氵）', strokeCount: 10, words: ['海浪', '浪花', '風浪'], mnemonic: '三點水加「良」，水波翻湧' },
      { char: '殼', bpmf: 'ㄎㄜˊ', radical: '殳', strokeCount: 12, words: ['貝殼', '蛋殼', '外殼'], mnemonic: '士冖一几殳，硬甲外皮' }
    ],
    questions: [
      {
        id: 'hl-q5-1',
        type: 'sentence',
        title: '譬喻修辭觀察',
        prompt: '作者把沖上沙灘抹平圖畫的「海浪」比喻成什麼？',
        options: ['一把神奇的大擦布', '一把剪刀', '一輛卡車', '一隻小鳥'],
        answer: '一把神奇的大擦布',
        explanation: '海浪一波波沖刷把沙灘畫撫平，就像橡皮擦擦掉圖畫一樣！'
      },
      {
        id: 'hl-q5-2',
        type: 'word',
        title: '水系部首辨識',
        prompt: '「沙、灘、浪、海」這些跟海濱景物有關的字，共同的部首是？',
        options: ['水（氵）部', '木部', '石部', '土部'],
        answer: '水（氵）部',
        explanation: '海灘、沙粒與浪花皆與水域活動密不可分，都是三點水「氵」部！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u6-starry',
    order: 6,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第六課：落葉裡的星星',
    titleBpmf: 'ㄉㄧˋ ㄌㄧㄡˋ ㄎㄜˋ ： ㄌㄨㄛˋ ㄧㄝˋ ㄌㄧˇ ㄉㄜ˙ ㄒㄧㄥ ㄒㄧㄥ',
    subtitle: '秋風吹落葉，踩出沙沙歌',
    icon: '🍂',
    themeColor: 'from-amber-600 to-orange-700',
    summary: '走在秋意濃郁的林蔭道上，撿拾形如五角星的楓香落葉，欣賞季節交替的大自然之美。',
    contentLines: [
      '秋天的風一陣陣吹過樹梢，',
      '紅的、黃的落葉像蝴蝶一樣跳舞飄落。',
      '我蹲在樹下一片一片細細看，',
      '瞧！這片紅紅的楓葉有五個角，',
      '多像天空中閃爍的小星星！',
      '我把它夾進故事書裡，',
      '留住了秋天最美好的記憶。'
    ],
    contentAudioText: '秋天的風一陣陣吹過樹梢，紅的、黃的落葉像蝴蝶一樣跳舞飄落。我蹲在樹下一片一片細細看，瞧！這片紅紅的楓葉有五個角，多像天空中閃爍的小星星！我把它夾進故事書裡，留住了秋天最美好的記憶。',
    vocabularies: [
      { char: '落', bpmf: 'ㄌㄨㄛˋ', radical: '艸（艹）', strokeCount: 12, words: ['落葉', '降落', '掉落'], mnemonic: '草字頭加「洛」，草木凋零自高而下' },
      { char: '秋', bpmf: 'ㄑㄧㄡ', radical: '禾', strokeCount: 9, words: ['秋天', '秋風', '秋季'], mnemonic: '禾加火，禾穀成熟之秋收季節' },
      { char: '楓', bpmf: 'ㄈㄥ', radical: '木', strokeCount: 13, words: ['楓葉', '楓樹', '楓香'], mnemonic: '木字旁加「風」，隨秋風染紅之樹' },
      { char: '記', bpmf: 'ㄐㄧˋ', radical: '言', strokeCount: 10, words: ['記憶', '日記', '記住'], mnemonic: '言字旁加「己」，文字言語留存於心' }
    ],
    questions: [
      {
        id: 'hl-q6-1',
        type: 'word',
        title: '季節植物聯想',
        prompt: '課文中五個角、像小星星一樣被撿起來夾進書裡的落葉是哪種葉子？',
        options: ['楓葉', '荷花葉', '竹葉', '松樹針'],
        answer: '楓葉',
        explanation: '楓樹的葉子具有掌狀裂片，形狀就像小星星一樣美麗！'
      },
      {
        id: 'hl-q6-2',
        type: 'sentence',
        title: '疊字修辭感悟',
        prompt: '「一片一片細細看」的疊字用法，傳達出什麼樣的動作情態？',
        options: ['觀察得非常專心、認真且不著急', '匆匆忙忙跑過去', '很生氣把葉子踩爛', '閉著眼睛不看'],
        answer: '觀察得非常專心、認真且不著急',
        explanation: '「細細看」表示觀察非常仔細、心態悠閒專注！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-read1',
    order: 6.5,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'reading',
    title: '閱讀開門一：小蜘蛛的吊床',
    titleBpmf: 'ㄩㄝˋ ㄉㄨˊ ㄎㄞ ㄇㄣˊ ㄧ ： ㄒㄧㄠˇ ㄓㄧ ㄓㄨ ㄉㄜ˙ ㄉㄧㄠˋ ㄔㄨㄤˊ',
    subtitle: '八隻長長腿，吐絲織銀網',
    icon: '🕸️',
    themeColor: 'from-violet-500 to-indigo-600',
    summary: '科普童話故事，引導孩子細緻觀察小蜘蛛吐絲結網的堅毅專注與工程智慧。',
    contentLines: [
      '花園的樹枝間，',
      '住著一隻勤勞的小蜘蛛。',
      '它從肚子裡吐出一根細細閃亮的銀絲，',
      '一圈又一圈，結成一張美麗的網。',
      '微風吹過，露水像珍珠一樣掛在網上，',
      '小蜘蛛躺在自己的吊床上，',
      '隨風輕輕搖擺，真愜意！'
    ],
    contentAudioText: '花園的樹枝間，住著一隻勤勞的小蜘蛛。它從肚子裡吐出一根細細閃亮的銀絲，一圈又一圈，結成一張美麗的網。微風吹過，露水像珍珠一樣掛在網上，小蜘蛛躺在自己的吊床上，隨風輕輕搖擺，真愜意！',
    vocabularies: [
      { char: '蛛', bpmf: 'ㄓㄨ', radical: '虫', strokeCount: 12, words: ['蜘蛛', '蛛網'], mnemonic: '虫字旁加「朱」' },
      { char: '絲', bpmf: 'ㄙ', radical: '糸', strokeCount: 12, words: ['銀絲', '絲線', '雨絲'], mnemonic: '兩個糸相聯結，細微之線條' }
    ],
    questions: [
      {
        id: 'hl-qr1-read',
        type: 'word',
        title: '比喻修辭理解',
        prompt: '課文中把掛在蜘蛛網上的晶瑩露珠比喻成什麼？',
        options: ['珍珠', '糖果', '小石子', '鉛筆'],
        answer: '珍珠',
        explanation: '圓潤亮晶晶的露珠在晨光照射下，就像一串串漂亮的珍珠！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u7-story',
    order: 7,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第七課：不一樣的故事',
    titleBpmf: 'ㄉㄧˋ ㄑㄧ ㄎㄜˋ ： ㄅㄨˋ ㄧ ㄧㄤˋ ㄉㄜ˙ ㄍㄨˋ ㄕˋ',
    subtitle: '同一個情節，不同的結局',
    icon: '📖',
    themeColor: 'from-teal-500 to-cyan-600',
    summary: '引導學生從不同角色的視角看世界，激發創意思維與故事改寫樂趣。',
    contentLines: [
      '大家都聽過大野狼與三隻小豬的故事，',
      '但如果大野狼只是想借一杯糖呢？',
      '如果三隻小豬蓋了堅固的環保磚房？',
      '同一個故事，換一個角度想想看，',
      '想像力就像一把神奇的金鑰匙，',
      '能為我們打開成千上萬個奇妙的結局！'
    ],
    contentAudioText: '大家都聽過大野狼與三隻小豬的故事，但如果大野狼只是想借一杯糖呢？如果三隻小豬蓋了堅固的環保磚房？同一個故事，換一個角度想想看，想像力就像一把神奇的金鑰匙，能為我們打開成千上萬個奇妙的結局！',
    vocabularies: [
      { char: '故', bpmf: 'ㄍㄨˋ', radical: '攴（攵）', strokeCount: 9, words: ['故事', '故鄉', '故人'], mnemonic: '古加攴，陳年傳述之事' },
      { char: '換', bpmf: 'ㄏㄨㄢˋ', radical: '手（扌）', strokeCount: 12, words: ['更換', '換位', '交換'], mnemonic: '提手旁加「奐」，以物易物移轉' },
      { char: '角', bpmf: 'ㄐㄧㄠˇ', radical: '角', strokeCount: 7, words: ['角度', '角落', '三角'], mnemonic: '獸角斜向，引申為觀點切入之視角' },
      { char: '匙', bpmf: 'ㄔˊ', radical: '匕', strokeCount: 11, words: ['鑰匙', '湯匙'], mnemonic: '是加匕，開啟門鎖之工具' }
    ],
    questions: [
      {
        id: 'hl-q7-1',
        type: 'sentence',
        title: '創造性思維',
        prompt: '「換一個角度想想看」能帶給我們什麼好處？',
        options: ['發現不同的解決方法與有趣的結局', '讓大家都生氣', '把故事全部忘記', '永遠寫不出作業'],
        answer: '發現不同的解決方法與有趣的結局',
        explanation: '換位思考能打破刻板印象，看見更豐富包容的世界！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u8-share',
    order: 8,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第八課：黃金分享日',
    titleBpmf: 'ㄉㄧˋ ㄅㄚ ㄎㄜˋ ： ㄏㄨㄤˊ ㄐㄧㄣ ㄈㄣ ㄒㄧㄤˇ ㄖˋ',
    subtitle: '帶來最愛藏寶盒，分享讓快樂加倍',
    icon: '⭐',
    themeColor: 'from-amber-400 to-yellow-500',
    summary: '記錄班級「分享日」活動，小朋友帶來心愛的玩具或書籍上台介紹，學會傾聽與欣賞同伴。',
    contentLines: [
      '今天是全班最期待的黃金分享日！',
      '小明帶來了他親手拼裝的高鐵模型，',
      '小美帶來了會唱生日歌的音樂盒。',
      '輪到我上台時，',
      '我小心翼翼打開裝滿各國郵票的寶盒。',
      '大家專注聆聽，掌聲不斷，',
      '分享讓原本一份的快樂，變成了三十份！'
    ],
    contentAudioText: '今天是全班最期待的黃金分享日！小明帶來了他親手拼裝的高鐵模型，小美帶來了會唱生日歌的音樂盒。輪到我上台時，我小心翼翼打開裝滿各國郵票的寶盒。大家專注聆聽，掌聲不斷，分享讓原本一份的快樂，變成了三十份！',
    vocabularies: [
      { char: '享', bpmf: 'ㄒㄧㄤˇ', radical: '亠', strokeCount: 8, words: ['分享', '享受', '享有'], mnemonic: '享奉祖先，共享福澤' },
      { char: '盒', bpmf: 'ㄏㄜˊ', radical: '皿', strokeCount: 11, words: ['盒子', '寶盒', '紙盒'], mnemonic: '合加皿，上下密合之容器' },
      { char: '票', bpmf: 'ㄆㄧㄠˋ', radical: '示', strokeCount: 11, words: ['郵票', '門票', '車票'], mnemonic: '西加示，憑信之紙券' },
      { char: '翼', bpmf: 'ㄧˋ', radical: '羽', strokeCount: 17, words: ['小心翼翼', '雙翼', '機翼'], mnemonic: '羽加異，如鳥翅輕展謹慎端整' }
    ],
    questions: [
      {
        id: 'hl-q8-1',
        type: 'word',
        title: '成語情態理解',
        prompt: '「小心翼翼」是形容怎樣的動作和態度？',
        options: ['非常謹慎細心，不敢有一點疏忽', '蹦蹦跳跳很隨便', '大搖大擺很用力', '閉上眼睛亂摸'],
        answer: '非常謹慎細心，不敢有一點疏忽',
        explanation: '「小心翼翼」形容舉動謹慎細緻，特別珍視手上的物品！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u9-flavor',
    order: 9,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第九課：好味道',
    titleBpmf: 'ㄉㄧˋ ㄐㄧㄡˇ ㄎㄜˋ ： ㄏㄠˇ ㄨㄟˋ ㄉㄠˋ',
    subtitle: '酸甜苦辣鹹，舌尖上的旅行',
    icon: '🍲',
    themeColor: 'from-orange-500 to-red-500',
    summary: '探索飲食文化與五味感知，體會家人用心料理的溫暖滋味與愛。',
    contentLines: [
      '廚房飄來陣陣誘人的香氣，',
      '那是奶奶拿手的香菇滷肉汁。',
      '檸檬酸酸的，蜂蜜甜甜的，',
      '苦瓜雖然帶點苦，炒蛋後卻甘美回味。',
      '在滿桌豐盛的菜餚裡，',
      '最難忘的好味道，',
      '正是全家人圍坐在一起的幸福滋味！'
    ],
    contentAudioText: '廚房飄來陣陣誘人的香氣，那是奶奶拿手的香菇滷肉汁。檸檬酸酸的，蜂蜜甜甜的，苦瓜雖然帶點苦，炒蛋後卻甘美回味。在滿桌豐盛的菜餚裡，最難忘的好味道，正是全家人圍坐在一起的幸福滋味！',
    vocabularies: [
      { char: '味', bpmf: 'ㄨㄟˋ', radical: '口', strokeCount: 8, words: ['味道', '氣味', '美味'], mnemonic: '口加未，舌品甘美滋味' },
      { char: '酸', bpmf: 'ㄙㄨㄢ', radical: '酉', strokeCount: 14, words: ['酸甜', '微酸', '心酸'], mnemonic: '酉加夋，酒酸醋酵之味' },
      { char: '甜', bpmf: 'ㄊㄧㄢˊ', radical: '甘', strokeCount: 11, words: ['甜蜜', '甘甜', '香甜'], mnemonic: '舌加甘，口嘗甘味' },
      { char: '餚', bpmf: 'ㄧㄠˊ', radical: '肉（月）', strokeCount: 17, words: ['佳餚', '菜餚'], mnemonic: '肴加肉，精心烹調之肉蔬名菜' }
    ],
    questions: [
      {
        id: 'hl-q9-1',
        type: 'sentence',
        title: '情感深層體會',
        prompt: '課文說世界上「最難忘的好味道」到底是指什麼？',
        options: ['全家人圍坐在一起的幸福滋味', '超商買的洋芋片', '冰淇淋店的巧克力', '很貴的大飯店'],
        answer: '全家人圍坐在一起的幸福滋味',
        explanation: '真正最棒的味道，是凝聚著親情愛意與家人共享的天倫滋味！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-rev3',
    order: 9.5,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'review',
    title: '統整活動三：味覺與生活表達',
    titleBpmf: 'ㄊㄨㄥˇ ㄓㄥˇ ㄏㄨㄛˊ ㄉㄨㄥˋ ㄙㄢ ： ㄨㄟˋ ㄐㄩㄝˊ ㄩˇ ㄕㄥ ㄏㄨㄛˊ ㄅㄧㄠˇ ㄉㄚˊ',
    subtitle: '感官形容詞與比喻造句練習',
    icon: '✨',
    themeColor: 'from-orange-400 to-amber-600',
    summary: '複習視覺、味覺、聽覺等多感官摹寫句型，練習「像……一樣」的比喻修辭。',
    contentLines: [
      '第三單元複習：',
      '1. 感官摹寫：紅通通、酸溜溜、香噴噴、亮晶晶。',
      '2. 比喻句練習：幸福就像……，甜在每個人的心坎裡。',
      '3. 同部首歸納：「口」字旁字：味、吃、喝、叫、喊。'
    ],
    contentAudioText: '第三單元複習：感官摹寫：紅通通、酸溜溜、香噴噴、亮晶晶。比喻句練習：幸福就像什麼，甜在心坎裡。同部首歸納：口字旁字：味、吃、喝、叫、喊。',
    vocabularies: [
      { char: '覺', bpmf: 'ㄐㄩㄝˊ', radical: '見', strokeCount: 20, words: ['感覺', '自覺', '知覺'], mnemonic: '臼冖爻見，感悟明瞭' }
    ],
    questions: [
      {
        id: 'hl-qr3-1',
        type: 'word',
        title: '感官摹寫辨識',
        prompt: '「香噴噴」是用哪一種感官所體會到的感受？',
        options: ['嗅覺（鼻子聞到的）', '聽覺（耳朵聽到的）', '觸覺（手摸到的）', '視覺（眼睛看到的）'],
        answer: '嗅覺（鼻子聞到的）',
        explanation: '用鼻子聞到飯菜的香氣，寫作「香噴噴」！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u10-bridge',
    order: 10,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第十課：過城門',
    titleBpmf: 'ㄉㄧˋ ㄕˊ ㄎㄜˋ ： ㄍㄨㄛˋ ㄔㄥˊ ㄇㄣˊ',
    subtitle: '城門城門幾丈高？三十六丈高！',
    icon: '🏮',
    themeColor: 'from-rose-500 to-red-600',
    summary: '結合台灣本土經典童謠「過城門」，體會傳統遊戲的節奏律動與同儕合作之樂。',
    contentLines: [
      '「城門城門幾丈高？三十六丈高！」',
      '「騎白馬，帶把刀，走進城門瞧一瞧！」',
      '兩個人雙手搭成一座高拱門，',
      '一隊隊小朋友低頭穿過笑聲高。',
      '鐘聲響了門落下一網打盡，',
      '被圈住的伙伴成了新的守門員，',
      '童謠唱不停，歡樂滿校園！'
    ],
    contentAudioText: '城門城門幾丈高？三十六丈高！騎白馬，帶把刀，走進城門瞧一瞧！兩個人雙手搭成一座高拱門，一隊隊小朋友低頭穿過笑聲高。鐘聲響了門落下一網打盡，被圈住的伙伴成了新的守門員，童謠唱不停，歡樂滿校園！',
    vocabularies: [
      { char: '過', bpmf: 'ㄍㄨㄛˋ', radical: '辵（辶）', strokeCount: 13, words: ['過去', '經過', '通過'], mnemonic: '走之底加「咼」，從此處走向彼處' },
      { char: '丈', bpmf: 'ㄓㄤˋ', radical: '一', strokeCount: 3, words: ['幾丈', '丈夫', '尺丈'], mnemonic: '古代長度單位，十尺為一丈' },
      { char: '騎', bpmf: 'ㄑㄧˊ', radical: '馬', strokeCount: 18, words: ['騎馬', '騎車', '跨騎'], mnemonic: '馬字旁加「奇」，跨於獸背之上' },
      { char: '刀', bpmf: 'ㄉㄠ', radical: '刀', strokeCount: 2, words: ['小刀', '菜刀', '帶刀'], mnemonic: '象形字，鋒利單刃兵器' }
    ],
    questions: [
      {
        id: 'hl-q10-1',
        type: 'word',
        title: '傳統童謠理解',
        prompt: '「城門城門幾丈高？」在傳統童謠中的回答是幾丈高？',
        options: ['三十六丈高', '一百丈高', '五丈高', '一千丈高'],
        answer: '三十六丈高',
        explanation: '童謠唱道：「城門城門幾丈高？三十六丈高！」'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u11-grandpa',
    order: 11,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第十一課：爺爺的門',
    titleBpmf: 'ㄉㄧˋ ㄕˊ ㄧ ㄎㄜˋ ： ㄧㄝˊ ㄧㄝ˙ ㄉㄜ˙ ㄇㄣˊ',
    subtitle: '木門推開吱呀呀，溫暖懷抱迎孫回',
    icon: '🚪',
    themeColor: 'from-amber-600 to-yellow-700',
    summary: '藉由鄉下老家古樸木門的吱呀聲，連結爺爺親切和藹的笑容與代際深情。',
    contentLines: [
      '鄉下老家有一扇厚厚的檜木門，',
      '每次輕輕一推，',
      '就會發出長長的「吱——呀——」聲。',
      '那是全世界最親切的門鈴，',
      '爺爺一聽到，就會笑瞇瞇走出來，',
      '張開雙臂把我摟進溫暖的懷抱裡。',
      '爺爺的門，永遠為我敞開！'
    ],
    contentAudioText: '鄉下老家有一扇厚厚的檜木門，每次輕輕一推，就會發出長長的吱呀聲。那是全世界最親切的門鈴，爺爺一聽到，就會笑瞇瞇走出來，張開雙臂把我摟進溫暖的懷抱裡。爺爺的門，永遠為我敞開！',
    vocabularies: [
      { char: '爺', bpmf: 'ㄧㄝˊ', radical: '父', strokeCount: 13, words: ['爺爺', '老爺', '大爺'], mnemonic: '父字頭加「耶」，尊稱祖父之長輩' },
      { char: '厚', bpmf: 'ㄏㄡˋ', radical: '厂', strokeCount: 9, words: ['厚實', '厚重', '寬厚'], mnemonic: '山石層疊厚重' },
      { char: '臂', bpmf: 'ㄅㄧˋ', radical: '肉（月）', strokeCount: 17, words: ['雙臂', '手臂', '臂膀'], mnemonic: '辟加月（肉），人上肢肘骨肌肉' },
      { char: '敞', bpmf: 'ㄔㄤˇ', radical: '攴（攵）', strokeCount: 12, words: ['敞開', '寬敞'], mnemonic: '尚加攴，洞開通達無遮攔' }
    ],
    questions: [
      {
        id: 'hl-q11-1',
        type: 'sentence',
        title: '聲音形象化理解',
        prompt: '木門發出的「吱——呀——」聲，在作者心中就像什麼？',
        options: ['全世界最親切的門鈴', '恐怖的怪獸叫聲', '救護車警報器', '鬧鐘大響'],
        answer: '全世界最親切的門鈴',
        explanation: '門聲一響爺爺就知道孫子回來了，是充滿愛意與歡迎的親切門鈴！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-u12-night',
    order: 12,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'lesson',
    title: '第十二課：詠景',
    titleBpmf: 'ㄉㄧˋ ㄕˊ ㄦˋ ㄎㄜˋ ： ㄩㄥˇ ㄐㄧㄥˇ',
    subtitle: '詩情畫意描山水，吟詠天地大自然',
    icon: '⛰️',
    themeColor: 'from-emerald-600 to-teal-700',
    summary: '學習兒童古詩與現代韻律詩的寫作意趣，觀察山嵐、流水與晚霞的壯麗意境。',
    contentLines: [
      '遠看山有色，近聽水無聲。',
      '春去花還在，人來鳥不驚。',
      '夕陽染紅了半邊天，',
      '晚霞像彩錦鋪在江面上。',
      '大自然是一首讀不完的長詩，',
      '字字句句，都是無盡的美麗！'
    ],
    contentAudioText: '遠看山有色，近聽水無聲。春去花還在，人來鳥不驚。夕陽染紅了半邊天，晚霞像彩錦鋪在江面上。大自然是一首讀不完的長詩，字字句句，都是無盡的美麗！',
    vocabularies: [
      { char: '詠', bpmf: 'ㄩㄥˇ', radical: '言', strokeCount: 12, words: ['吟詠', '歌詠', '詠唱'], mnemonic: '言字旁加「永」，聲律悠長之歌詠' },
      { char: '景', bpmf: 'ㄐㄧㄥˇ', radical: '日', strokeCount: 12, words: ['景色', '風景', '景物'], mnemonic: '日加京，高處向陽之大好風光' },
      { char: '染', bpmf: 'ㄖㄢˇ', radical: '木', strokeCount: 9, words: ['染紅', '染色', '染布'], mnemonic: '水九木，用草木汁液浸染上色' },
      { char: '詩', bpmf: 'ㄕ', radical: '言', strokeCount: 13, words: ['詩歌', '古詩', '詩意'], mnemonic: '言字旁加「寺」，由心而發之美好韻語' }
    ],
    questions: [
      {
        id: 'hl-q12-1',
        type: 'word',
        title: '古典詩謎探索',
        prompt: '「遠看山有色，近聽水無聲。春去花還在，人來鳥不驚。」描寫的是什麼？',
        options: ['一幅畫（畫中之景）', '真的花園', '電影院', '遊樂園'],
        answer: '一幅畫（畫中之景）',
        explanation: '水無聲、花不謝、鳥不飛，正是描寫一幅精美畫作上的景象！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-rev4',
    order: 12.5,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'review',
    title: '統整活動四：詞句精煉大閱兵',
    titleBpmf: 'ㄊㄨㄥˇ ㄓㄥˇ ㄏㄨㄛˊ ㄉㄨㄥˋ ㄙˋ ： ㄘˊ ㄐㄩˋ ㄐㄧㄥ ㄌㄧㄢˋ ㄉㄚˋ ㄩㄝˋ ㄅㄧㄥ',
    subtitle: '詩韻節奏與生活故事寫作總結',
    icon: '🎖️',
    themeColor: 'from-purple-500 to-indigo-600',
    summary: '全學期期末總複習：部首歸類、短語擴寫、標點符號與小小作家成果驗收。',
    contentLines: [
      '第四單元總結：',
      '1. 句子長大：我走過門 ➔ 我輕輕推開爺爺那扇厚厚的檜木門。',
      '2. 近義詞與反義詞對照：高與矮、深與淺、濃與淡。',
      '3. 期末榮譽：恭喜小勇士完成二年級上學期國語全部課程！'
    ],
    contentAudioText: '第四單元總結：句子長大：我走過門，變成我輕輕推開爺爺那扇厚厚的檜木門。近義詞與反義詞對照：高與矮、深與淺、濃與淡。期末榮譽：恭喜小勇士完成二年級上學期國語全部課程！',
    vocabularies: [
      { char: '練', bpmf: 'ㄌㄧㄢˋ', radical: '糸', strokeCount: 15, words: ['練習', '訓練', '操練'], mnemonic: '糸加柬，反覆漂洗修飾精純' }
    ],
    questions: [
      {
        id: 'hl-qr4-1',
        type: 'sentence',
        title: '短語擴寫技巧',
        prompt: '想要讓「小貓走過來」的句子更生動，可以擴寫成？',
        options: ['可愛的小白貓悄悄的走過來', '貓', '走', '過來'],
        answer: '可愛的小白貓悄悄的走過來',
        explanation: '加入形容詞「可愛的小白」與副詞「悄悄的」，讓情境更具體鮮明！'
      }
    ]
  },
  {
    id: 'hl-g2-s1-read2',
    order: 13,
    grade: 2,
    semester: 1,
    publisher: 'hanlin',
    type: 'reading',
    title: '閱讀開門二：不會寫字的獅子',
    titleBpmf: 'ㄩㄝˋ ㄉㄨˊ ㄎㄞ ㄇㄣˊ ㄦˋ ： ㄅㄨˋ ㄏㄨㄟˋ ㄒㄧㄝˇ ㄗˋ ㄉㄜ˙ ㄕ ㄗ˙',
    subtitle: '真心話最動人，學習寫字真重要',
    icon: '🦁',
    themeColor: 'from-amber-500 to-yellow-600',
    summary: '改編自世界知名繪本童話，讓孩子體會識字、寫字與真誠溝通的重要性。',
    contentLines: [
      '森林之王大獅子威風凜凜，',
      '可是他不會寫字。',
      '他想寫一封情書給美麗的母獅子，',
      '猴子幫他寫：「我們一起去爬樹吃香蕉吧！」',
      '河馬幫他寫：「我們一起泡在泥巴池裡吃水草吧！」',
      '獅子氣得大聲吼叫：「這不是我想說的話！」',
      '最後，美麗的母獅子笑著走過來：',
      '「別著急，我來教你從第一個字開始學寫字吧！」'
    ],
    contentAudioText: '森林之王大獅子威風凜凜，可是他不會寫字。他想寫一封情書給美麗的母獅子，猴子幫他寫：我們一起去爬樹吃香蕉吧！河馬幫他寫：我們一起泡在泥巴池裡吃水草吧！獅子氣得大聲吼叫：這不是我想說的話！最後，美麗的母獅子笑著走過來：別著急，我來教你從第一個字開始學寫字吧！',
    vocabularies: [
      { char: '吼', bpmf: 'ㄏㄡˇ', radical: '口', strokeCount: 7, words: ['吼叫', '大吼', '咆哮'], mnemonic: '口加孔，大張其口發出巨響' },
      { char: '信', bpmf: 'ㄒㄧㄣˋ', radical: '人（亻）', strokeCount: 9, words: ['信件', '書信', '相信'], mnemonic: '人加言，人言真實有信' }
    ],
    questions: [
      {
        id: 'hl-qread2-1',
        type: 'sentence',
        title: '故事寓意啟發',
        prompt: '為什麼大獅子最後決定要跟母獅子學寫字？',
        options: ['因為自己的真心話只有自己學會寫才能最真實表達', '因為他想當老師', '因為香蕉不好吃', '因為想去睡覺'],
        answer: '因為自己的真心話只有自己學會寫才能最真實表達',
        explanation: '別人的話無法代表自己，自己學會識字寫字才能表達內心真正的想法！'
      }
    ]
  }
];
