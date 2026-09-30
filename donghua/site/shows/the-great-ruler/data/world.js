// Hand-curated guide. `ep` is the continuous iQIYI episode (season 1 is 1–52, season 2 starts at 53).
// NOVEL means the donghua has not reached it. Wiki titles in `wiki` open the library once it is built.
(function () {
const NOVEL = 9999;

window.WORLD = {
  NOVEL,
  maxEp: 92,

  realms: [
    {
      id: "sensing", name: "Sensing", subs: "Sensing", zh: "感应境", body: "world",
      where: "The spiritual energy outside the body", lifespan: "—",
      wiki: "Sensing Stage", heroEp: 1,
      gist: "You can feel the world's spiritual energy and you are trying to pull it in. Nothing about this stage is a fight yet.",
      stages: [
        { name: "No phases", zh: "感应", ep: 1, text: "Most children in a cultivation clan pass this without anyone bothering to count it." },
      ],
    },
    {
      id: "movement", name: "Spiritual Movement", subs: "Spiritual Movement", zh: "灵动境", body: "body",
      where: "Spiritual energy inside the body", lifespan: "—",
      wiki: "Spiritual Movement Stage", heroEp: 1,
      gist: "Energy stays in the body instead of slipping away. From here you can learn spiritual arts. Mu Chen starts the donghua already at the initial phase.",
      stages: [
        { name: "Initial", zh: "初期", ep: 1, text: "Energy can be held, and the simplest spiritual arts become possible." },
        { name: "Middle", zh: "中期", ep: 3, text: "Same realm, a deeper store of energy." },
        { name: "Late", zh: "后期", ep: 10, text: "The last phase before that energy can be spun into a wheel." },
      ],
    },
    {
      id: "rotation", name: "Spiritual Rotation", subs: "Spiritual Wheel", zh: "灵轮境", body: "core",
      where: "A wheel of energy in the body", lifespan: "—",
      wiki: "Spiritual Rotation Stage", heroEp: 13,
      gist: "The energy in the body is compressed into a turning wheel, so it gets denser and cleaner. This is also the rough floor for a Rank 1 Spiritual Array Master.",
      stages: [
        { name: "Initial", zh: "初期", ep: 13, text: "The wheel exists. Density and purity both jump." },
        { name: "Middle", zh: "中期", ep: NOVEL, text: "Not every cultivator bothers to name the middle phase." },
        { name: "Late", zh: "后期", ep: 21, text: "Fights at this phase often look like the next realm already." },
      ],
    },
    {
      id: "spirit", name: "Spirit", subs: "Divine Soul", zh: "神魄境", body: "soul",
      where: "A divine soul in the Aura Sea", lifespan: "—",
      wiki: "Spirit Stage", heroEp: 28,
      gist: "The first real dividing line. You condense your own divine soul, and you can swallow a beast's soul essence and use its ability later.",
      stages: [
        { name: "Initial", zh: "初期", ep: 28, text: "The divine soul condenses. Beast souls can be taken in." },
        { name: "Middle", zh: "中期", ep: 31, text: "A swallowed soul starts to answer." },
        { name: "Late", zh: "后期", ep: 34, text: "The soul is stable enough to carry into the Three Heavens." },
      ],
    },
    {
      id: "fusion", name: "Heavenly Fusion", subs: "Heavenly Fusion", zh: "融天境", body: "world",
      where: "The dense energy of the outside world", lifespan: "—",
      wiki: "Heavenly Fusion Stage", heroEp: 40,
      gist: "First of the Three Heavens. You can move the thick spiritual energy of the world itself, and a swallowed beast soul finally shows its real ability.",
      stages: [
        { name: "Initial", zh: "初期", ep: 40, text: "The world's dense energy can be moved, not just your own." },
        { name: "Middle", zh: "中期", ep: 46, text: "A beast soul taken in earlier finally shows its real ability." },
        { name: "Late", zh: "后期", ep: NOVEL, text: "People at this phase are often already fighting like the next Heaven." },
      ],
    },
    {
      id: "transform", name: "Heavenly Transformation", subs: "Heavenly Transformation", zh: "化天境", body: "world",
      where: "The divine soul, blended into the world", lifespan: "—",
      wiki: "Heavenly Transformation Stage", heroEp: 54,
      gist: "Second Heaven. The divine soul sinks into the surroundings and borrows them as a shield, so part of an attack never lands.",
      stages: [
        { name: "Initial", zh: "初期", ep: 54, text: "The divine soul can sink into the surroundings and borrow them as a shield." },
        { name: "Late", zh: "后期", ep: 59, text: "Part of an incoming attack never quite lands." },
      ],
    },
    {
      id: "complete", name: "Heavenly Completion", subs: "Heavenly Completion", zh: "通天境", body: "soul",
      where: "A divine soul that can travel", lifespan: "—",
      wiki: "Heavenly Completion Stage", heroEp: 70,
      gist: "Third Heaven. The divine soul is tough enough to leave the body and cross a long distance without dying. This is the last realm before the three disasters that gate Sovereign.",
      stages: [
        { name: "Initial", zh: "初期", ep: 70, text: "The divine soul can leave the body and travel." },
        { name: "Late", zh: "后期", ep: 79, text: "The last stretch before the three disasters." },
      ],
    },
    {
      id: "disasters", name: "Three Sovereign Disasters", subs: "Three Disasters", zh: "至尊小三难", body: "all",
      where: "Body, energy, then soul", lifespan: "—",
      wiki: "Three Sovereign Disasters Stage", heroEp: 88,
      gist: "Three trials that kill a lot of geniuses. Pass all three and the Sovereign Sea can form. Fail and that is the end of the road.",
      stages: [
        { name: "Human Body Disaster", zh: "肉身难", ep: 88, text: "The body is tempered. Fail it and the road ends." },
        { name: "Spiritual Energy Disaster", zh: "灵力难", ep: NOVEL, text: "The energy itself is tempered. Not yet in the aired episodes." },
        { name: "Spirit Disaster", zh: "神魄难", ep: NOVEL, text: "Three grades of spirit fire. Only the last one opens the Sovereign Stage." },
      ],
    },
  ],

  beyond: [
    { name: "Sovereign", zh: "至尊境", wiki: "Sovereign Stage", text: "Nine grades. The old sea of energy shatters and a Sovereign Sea replaces it: a small world hidden in the body, so the soul can live on if the flesh is destroyed. From the 5th grade, space itself starts to answer. A Sovereign Celestial Body is refined here. The deans of the Five Great Academies sit in this realm." },
    { name: "Earth Sovereign", zh: "地至尊", wiki: "Earth Sovereign Stage", text: "Lesser, Greater, then Perfected. Spiritual energy crystallises. A gesture can raise a mountain. At the peak, a touch of Heavenly Sovereign, still nowhere near the real thing." },
    { name: "Heavenly Sovereign", zh: "天至尊", wiki: "Heavenly Sovereign Stage", text: "Spirit, Immortal, then Saint grade, each with initial, middle and late. The flesh can become a spiritual body. Saint grade can command the world's energy inside a domain. This is what people mean by a peak expert, until the story proves there is something past it." },
    { name: "Ruler", zh: "主宰境", wiki: "Ruler Stage", text: "The World's Will has to acknowledge you. You summon the Firmament Board and force your surname onto it. That grants a share of the world's power." },
    { name: "Great Ruler", zh: "大主宰境", wiki: "The Great Ruler Stage", text: "The same board, but the given name, which is much harder. Full authority over the world's power. The title of the book. One person reaches it." },
  ],

  weaponGrades: [
    "Preliminary — under 15 Spiritual Seals, tiny arrays, below Spiritual Rotation",
    "Rank 1 Spiritual Array Master — 15 seals, about Spiritual Rotation",
    "Rank 2 — 21 seals, about Spirit Stage",
    "Rank 3 — about Heavenly Fusion",
    "Rank 4 — 100 seals, about Heavenly Transformation",
    "Rank 5 — 201 seals, Heavenly Completion up through the three disasters",
    "Spiritual Array Grandmaster — Human, Earth, then Heaven, across the nine Sovereign grades",
    "Spiritual Array Scholar — Human, Earth, Heaven, across Earth Sovereign",
    "Spiritual Array Ancestor — Spirit, Immortal, Saint, across Heavenly Sovereign",
  ],

  paths: [
    { name: "Ten-Thousand Runes", zh: "万纹", eq: "around 7th grade Sovereign", text: "The first real Battle Formation Master. Ten thousand runes in the Spirit of Battle Will." },
    { name: "Hundred-Thousand Runes", zh: "十万纹", eq: "around 9th grade Sovereign", text: "A formation that can carry a real army." },
    { name: "Million Runes", zh: "百万纹", eq: "Earth Sovereign", text: "Continent-scale warfare." },
    { name: "Ten-Million Runes", zh: "千万纹", eq: "Heavenly Sovereign", text: "The rank that decides wars between the great clans." },
    { name: "The whole world", zh: "大千", eq: "Great Ruler, and a formation master", text: "Gather the battle will of every living thing in the Great Thousand World. The novel's last fight turns on this. The donghua is nowhere near it." },
  ],

  tiers: [
    { n: 6, name: "Acknowledged by the world", zh: "主宰", top: "Ruler and Great Ruler. The Firmament Board has their names.", examples: ["The Great Ruler"], ep: NOVEL },
    { n: 5, name: "Heavenly Sovereign clans", zh: "天至尊", top: "Saint-grade Heavenly Sovereigns, the clans that outrank whole continents.", examples: ["Luo God Clan", "Ancient Buddha Clan"], ep: 62 },
    { n: 4, name: "Five Great Academies", zh: "五大院", top: "Deans at Sovereign. Each academy is guarded by an ancient divine beast.", examples: ["Northern Heavens Spiritual Academy", "Myriad Phoenix Spiritual Academy"], ep: 15 },
    { n: 3, name: "Continent powers", zh: "大陆霸主", top: "Sovereigns, or a force that can threaten an academy.", examples: ["Demonic Dragon Palace", "Western Extreme Palace"], ep: 44 },
    { n: 2, name: "A realm's academies and overlords", zh: "一境之主", top: "Spirit Stage up to Heavenly Fusion. They look huge until you leave the realm.", examples: ["Northern Spiritual Academy", "Nine Territories"], ep: 1 },
    { n: 1, name: "Cities under a territory", zh: "城主", top: "Spiritual Movement to Spiritual Rotation.", examples: ["Mu City"], ep: 2 },
  ],

  regions: [
    { id: "lower", name: "Lower Planes", zh: "下位面", ep: 53, blurb: "Smaller worlds under the Great Thousand World, poorer in spiritual energy. The strongest person in one can break out and ascend. Two who did are still the measuring stick up here.", wiki: "Great Thousand World" },
    { id: "gtw", name: "Great Thousand World", zh: "大千世界", ep: 1, blurb: "The upper plane. The donghua's English subs often say Great World. Continents without number, and Sovereigns are common enough that they are not the ceiling.", wiki: "Great Thousand World" },
    { id: "nsr", name: "Northern Spiritual Realm", zh: "北灵境", ep: 1, blurb: "Where Mu Chen was born. The donghua also calls the wider area the North Spiritual Territory. Nine territories keep a balance, and one neutral academy sits above their squabbles.", wiki: "Northern Spiritual Realm" },
    { id: "hundred", name: "Hundred Spirit Continent", zh: "百灵大陆", ep: 1, blurb: "An ordinary continent. The Northern Spiritual Realm is one realm on it, easy to forget once the academies are in view.", wiki: "Hundred Spirit Continent" },
    { id: "northheavens", name: "Northern Heavens Continent", zh: "北苍大陆", ep: 25, blurb: "Home of the Northern Heavens Spiritual Academy. The donghua's season 2 trailers call the struggle here the honor of North Cang. Demonic Dragon Palace has wanted the continent for a long time.", wiki: "Northern Heavens Continent" },
  ],

  factions: [
    { name: "Mu Territory", subs: "Mu Realm", zh: "牧域", region: "nsr", tier: 2, ep: 2, wiki: "Mu Territory",
      top: "Mu Feng, Mu Chen's father. A territory lord. He later reaches Heavenly Fusion and pulls the nine territories into one alliance.",
      signature: "One of the Nine Territories", with: "Home. Zhou Ye is his father's right hand. Wen Ling, their array master, is the one who tests whether Mu Chen can condense Spiritual Seals." },
    { name: "Liu Territory", zh: "柳域", region: "nsr", tier: 2, ep: 3, wiki: "Liu Territory",
      top: "Liu Qingtian", signature: "The rival territory", with: "Liu Yang is the classmate Mu Chen breaks through against. The two territories both enter the swamp." },
    { name: "Northern Spiritual Academy", subs: "North Spiritual Academy", zh: "北灵院", region: "nsr", tier: 2, ep: 1, wiki: "Northern Spiritual Academy",
      top: "Principal Xiao. Students top out around Spiritual Rotation.", signature: "Neutral, and it holds the quotas for the Five Great Academies", with: "His first school. East and West branches, each with an Earth Class and a Heaven Class." },
    { name: "Nine Territories", zh: "九域", region: "nsr", tier: 2, ep: 2, wiki: "Nine Territories",
      top: "Nine lords in a deliberate balance", signature: "Mu, Liu, Tang, Hong, Lie, Luo, and a Bai Territory the donghua names", with: "The whole political map of the opening. They only matter until he leaves." },
    { name: "Five Great Academies", zh: "五大院", region: "gtw", tier: 4, ep: 15, wiki: "Five Great Academies",
      top: "Five Sovereign deans: Tai Cang, Tang Qiu, Tian Sheng, Wu Tianwang, Tian Song", signature: "Each named for, and guarded by, an ancient divine beast", with: "The prize everyone in the Northern Spiritual Realm is studying toward. They also run the Spiritual Road." },
    { name: "Northern Heavens Spiritual Academy", zh: "北苍灵院", region: "northheavens", tier: 4, ep: 25, wiki: "Northern Heavens Spiritual Academy",
      top: "Dean Tai Cang, a Sovereign. Guardian: the Northern Sea Dragon.", signature: "Spirit Convergence Arrays, the Lightning Territory, the Heavenly Rankings", with: "Where season 1's second half and all of season 2 take place. Luo Li, Shen Cangsheng, Li Xuantong and Ji Xuan are all here." },
    { name: "Demonic Dragon Palace", zh: "魔龙殿", region: "northheavens", tier: 3, ep: 68, wiki: "Demonic Dragon Palace",
      top: "Black Dragon Sovereign", signature: "A stolen treasure and a grudge against the academy", with: "They come for the Great Meru Demonic Pillar and later put the academy under siege." },
    { name: "Luo God Clan", zh: "洛神族", region: "gtw", tier: 5, ep: 62, wiki: "Luo God Clan",
      top: "A clan at the Heavenly Sovereign tier", signature: "Luo Li is its princess", with: "Her real backing. Xiao Xiao is sent to guard her. The clan's marriage politics show up in the tournament." },
    { name: "Ancient Buddha Clan", zh: "古佛族", region: "gtw", tier: 5, ep: 70, wiki: "Ancient Buddha Clan",
      top: "Qing Yanjing, Mu Chen's mother, near the top of the clan", signature: "The Great Pagoda Art and sealing power", with: "She left when he was a child. A painting, then a spiritual body, are all the donghua has given him of her so far." },
  ],

  journey: [
    { stage: "The Spiritual Road and the academy", realm: "movement", eps: [1, 13], items: [
      { name: "A sealed spiritual pulse", zh: "灵脉", ep: 1, wiki: "Spiritual Pulse", text: "He looked talentless because the pulse that draws in spiritual energy was sealed. How many pulses he actually has is a later reveal. Nine is the legendary number. Most people have one." },
      { name: "Spiritual Road empowerment", zh: "灵路", ep: 1, wiki: "Spiritual Road", text: "The donghua calls the trial the Spiritual Land. No energy of any kind works inside it. He was expelled after a year, called the Blood Calamity, and still came home with the empowerment the survivors get." },
      { name: "Great Pagoda Art", zh: "大浮屠诀", ep: 2, wiki: "Great Pagoda Art", text: "Called the Great Buddha Art in this donghua. The yang half, left by his mother Qing Yanjing. It cultivates, attacks and defends. The yin half comes much later." },
      { name: "Spiritual Seals", zh: "灵印", ep: 6, wiki: "Spiritual Seal", text: "Wen Ling tests whether he can condense them. That is the door into Spiritual Arrays, his mother's other inheritance. The exact episode of the test sits in the field-training stretch." },
      { name: "Nine Netherbird", zh: "九幽", ep: 13, wiki: "Jiu You", text: "The Jiuyou Bird. A Spiritual Beast bound into his body in the swamp. She wants the body. He wants her strength. The bond is the cheat that lets him punch above his realm for the entire series." },
    ] },
    { stage: "Leaving the Northern Spiritual Realm", realm: "spirit", eps: [15, 52], items: [
      { name: "A seat at Northern Heavens", zh: "北苍灵院", ep: 18, wiki: "Five Great Academies’ Entry Competition", text: "The quota is the whole point of the small academy. Winning it is how he and Luo Li get out." },
      { name: "Beast souls, used for real", zh: "兽魂", ep: 31, wiki: "Spirit Stage", text: "Spirit Stage is when a swallowed beast soul becomes a technique instead of a meal. The bird had already eaten two Heaven-rank souls for him." },
      { name: "White Dragon's treasury", zh: "白龙", ep: 44, wiki: "White Dragon Sovereign's Treasury", text: "A Heaven-rank mission that closes season 1. The White Dragon Spiritual Pearl is one of the things that pushes his cultivation while his realm label lags behind his fights." },
    ] },
    { stage: "Season 2, still at the academy", realm: "complete", eps: [53, 92], items: [
      { name: "Nine Netherworld Bird", zh: "九幽冥雀", ep: 57, wiki: "Jiu You", text: "The thunder tribulation promotes her from Spiritual Beast to Divine Beast. Human form, in the donghua, was already on screen before the promotion." },
      { name: "Ling Xi", zh: "凌溪", ep: 61, wiki: "Ling Xi", text: "She trains his arrays and later burns a month of her own effort to get him to Heavenly Completion in time. She knew his mother." },
      { name: "Great Meru Demonic Pillar", zh: "大须弥魔柱", ep: 68, wiki: "Great Meru Demonic Pillar", text: "Also translated Great Sumeru Demonic Pillar. He uses it to crush Mo Longzi. The Black Dragon Sovereign tries to take it, and the dean stops him." },
      { name: "Great Solar Undying Body", zh: "大日不灭身", ep: 73, wiki: "Great Solar Undying Body", text: "His first Sovereign Celestial Body, shown at the Holy Spirit Mountain trial, before he is actually a Sovereign. The novel has him refine it properly much later." },
      { name: "His mother, briefly", zh: "清衍静", ep: 78, wiki: "Qing Yanjing", text: "A spiritual body, not a reunion she can stay for. She shields him when Demonic Dragon Palace and its allies have the academy surrounded, and she kills the Black Dragon Sovereign in this adaptation." },
      { name: "Both halves of the Pagoda Art", zh: "阴阳", ep: 79, wiki: "Great Pagoda Art", text: "The yin half joins the yang half and he hits the late phase of Heavenly Completion." },
      { name: "The black paper", zh: "不死书", ep: 91, wiki: "Immortal Catalog", text: "A page he picked up in the Spiritual Road. In the tournament he uses it to purify fiend energy. Its real name and rank are a novel matter." },
    ] },
    { stage: "Not in the aired episodes", realm: "disasters", eps: [NOVEL, NOVEL], items: [
      { name: "Nine spiritual pulses", zh: "九灵脉", ep: NOVEL, wiki: "Spiritual Pulse", text: "Pulses are talent made physical. He was born looking like he had none. The number he ends with is the number people tell stories about." },
      { name: "Three Pures", zh: "三清", ep: NOVEL, wiki: "Three Pures", text: "Two more bodies, each able to cultivate, each able to take its own Sovereign Celestial Body. This is the reason he can walk three roads at once." },
      { name: "Battle formations", zh: "战阵", ep: NOVEL, wiki: "Battle Formation Master", text: "He only starts this path at the 1st grade of Sovereign. The donghua has not reached Sovereign." },
      { name: "The Firmament Board", zh: "天榜", ep: NOVEL, wiki: "Firmament Board", text: "Surname first, given name after. That second stroke is the Great Ruler stage." },
    ] },
  ],

  methods: [
    { realm: "From the start", method: "Great Pagoda Art (yang)", zh: "大浮屠诀", from: "Qing Yanjing, his mother", ep: 2 },
    { realm: "Spiritual Movement", method: "Spiritual Arrays", zh: "灵阵", from: "Wen Ling's test, then his mother's notes, then Ling Xi", ep: 6 },
    { realm: "Spiritual Rotation", method: "Bloodline bond with Jiu You", zh: "血脉契约", from: "The swamp", ep: 13 },
    { realm: "Heavenly Completion", method: "Great Pagoda Art (yin and yang)", zh: "阴阳", from: "Ling Xi, carrying his mother's other half", ep: 79 },
    { realm: "Sovereign", method: "Great Solar Undying Body", zh: "大日不灭身", from: "Shown early, refined for real later", ep: 73 },
    { realm: "Past Heavenly Sovereign", method: "Three Pures", zh: "三清", from: "The pagoda art, taken to its end", ep: NOVEL },
  ],

  secrets: [
    { ch: "印", name: "Spiritual Seal", gloss: "the unit", effect: "Arrays are priced in how many seals you can condense and hold at once.", ep: 6 },
    { ch: "一", name: "Rank 1", gloss: "15 seals", effect: "The title Spiritual Array Master starts here. Roughly Spiritual Rotation.", ep: 13 },
    { ch: "四", name: "Rank 4", gloss: "100 seals", effect: "Roughly Heavenly Transformation. A real weapon, not a student trick.", ep: 61 },
    { ch: "五", name: "Rank 5", gloss: "201 seals", effect: "Heavenly Completion through the three disasters. The top of this rank can scare a disaster-stage expert.", ep: 68 },
    { ch: "宗", name: "Ancestor", gloss: "tens of thousands", effect: "Saint grade matches a Saint Heavenly Sovereign. His mother is one. He is not, yet.", ep: NOVEL },
  ],

  terms: [
    ["Great Thousand World", "大千世界", "Great World", "Great Thousand Worlds (early novel translation)"],
    ["Spiritual Road", "灵路", "Spiritual Land", "Spiritual Road (novel, manhua, and the 2019 donghua)"],
    ["Spiritual Energy", "灵力", "spiritual energy", "Spiritual Qi, Ling Li"],
    ["Sensing Stage", "感应境", "Sensing", ""],
    ["Spiritual Movement", "灵动境", "Spiritual Movement", ""],
    ["Spiritual Rotation", "灵轮境", "Spiritual Wheel", "Spiritual Rotation Stage"],
    ["Spirit Stage", "神魄境", "Divine Soul", "Spirit Realm"],
    ["Three Heavens", "三天之境", "", "Heavenly Fusion, Transformation, Completion"],
    ["Heavenly Fusion", "融天境", "Heavenly Fusion", ""],
    ["Heavenly Transformation", "化天境", "Heavenly Transformation", ""],
    ["Heavenly Completion", "通天境", "Heavenly Completion", ""],
    ["Three Sovereign Disasters", "至尊小三难", "", "Human Body, Spiritual Energy, and Spirit disasters"],
    ["Sovereign", "至尊", "Sovereign", "Supreme, Monarch (avoid: those drift)"],
    ["Earth Sovereign", "地至尊", "", ""],
    ["Heavenly Sovereign", "天至尊", "", "Heavenly Supreme"],
    ["Ruler", "主宰", "", "Lord, Monarch"],
    ["Great Ruler", "大主宰", "The Great Ruler", "The title of the series"],
    ["Spiritual Pulse", "灵脉", "spiritual pulse", "More pulses, more talent. Nine is the myth."],
    ["Spiritual Array", "灵阵", "spiritual array", "Spirit Array"],
    ["Spiritual Seal", "灵印", "spiritual seal", "The bricks an array is built from"],
    ["Battle Will", "战意", "", "Willpower fused with spiritual energy"],
    ["Battle Formation", "战阵", "", "An army's will, commanded by one master"],
    ["Sovereign Celestial Body", "至尊法身", "", "A second body refined at Sovereign"],
    ["Great Pagoda Art", "大浮屠诀", "Great Buddha Art", "Great Pagoda Art (novel and manhua)"],
    ["Nine Netherbird", "九幽", "Jiuyou Bird", "Nine Nether Bird. The donghua also just calls her Black."],
    ["Bloodline Bond", "血脉契约", "", "The pact between Mu Chen and the bird"],
    ["Northern Spiritual Realm", "北灵境", "North Spiritual Territory", ""],
    ["Northern Spiritual Academy", "北灵院", "North Spiritual Academy", ""],
    ["Mu Territory", "牧域", "Mu Realm", ""],
    ["Black Eerie Swamp", "黑冥渊", "Dark Abyss", ""],
    ["Five Great Academies", "五大院", "", ""],
    ["Northern Heavens Continent", "北苍大陆", "North Cang", "Northern Heavens, Vast Northern Continent"],
    ["Divine Spiritual Mountain", "神灵山", "Holy Spirit Mountain", "Holy Spiritual Mountain"],
    ["Firmament Board", "天榜", "", "Where a Ruler writes a name"],
    ["Lower Plane", "下位面", "", "The small worlds under the Great Thousand World"],
    ["Fiend Clan", "魔族", "", "They eat spiritual energy out of a land until nothing can cultivate there"],
  ],


  arcs: [
    [1, 13, "Northern Spiritual Realm"],
    [15, 24, "A way out"],
    [25, 52, "Northern Heavens"],
    [53, 70, "Season 2: the academy"],
    [71, 80, "Holy Spirit Mountain"],
    [81, 92, "The tournament"],
  ],

  eras: [
    { name: "The Nine Territories", zh: "九域", note: "The politics of the opening. Lords, not emperors. They are enormous at home and small the moment a Sovereign is in the room.", emperors: [
      { name: "Mu Feng", zh: "牧锋", ep: 2, wiki: "Mu Feng", legacy: "Mu Chen's father, lord of Mu Territory. Later he reaches Heavenly Fusion and founds the Northern Spiritual Alliance. That unification is still ahead of the early episodes." },
      { name: "Liu Qingtian", zh: "柳擎天", ep: 10, wiki: "Liu Qingtian", legacy: "Lord of Liu Territory. He leads the other side into the swamp." },
    ] },
    { name: "Northern Heavens", zh: "北苍", note: "A continent with one of the five academies on it, and a palace that has never forgiven a theft.", emperors: [
      { name: "Tai Cang", zh: "太苍", ep: 32, wiki: "Tai Cang", legacy: "Dean of the Northern Heavens Spiritual Academy. A Sovereign. He is the reason the Black Dragon Sovereign does not simply take the pillar." },
      { name: "Northern Sea Dragon", zh: "北冥龙", ep: 59, wiki: "Northern Sea Dragon", legacy: "Ancient divine beast, guardian of the academy. Personally trains Mu Chen before the tournament." },
      { name: "Black Dragon Sovereign", zh: "黑龙至尊", ep: 68, wiki: "Black Dragon Sovereign", legacy: "Lord of Demonic Dragon Palace. In this donghua he dies to Qing Yanjing's spiritual body." },
    ] },
    { name: "Above the academies", zh: "天至尊", title: "Heavenly Sovereign", note: "Clans that treat a Five Great Academy as a school their children might attend, not a throne.", emperors: [
      { name: "Qing Yanjing", zh: "清衍静", ep: 70, wiki: "Qing Yanjing", legacy: "Mu Chen's mother. Ancient Buddha Clan. A Saint-grade Spiritual Array Ancestor. What the donghua has shown is a painting, a memory, and one spiritual body." },
      { name: "Luo Li", zh: "洛璃", ep: 1, wiki: "Luo Li", legacy: "Princess of the Luo God Clan. She spent half a year in the Spiritual Road trying to kill him. She is the other lead, not a sovereign of the realm, and her clan is the reason kings bother her." },
      { name: "The Flame Emperor", zh: "炎帝", ep: 53, wiki: "Xiao Yan", legacy: "Came up from a lower plane. Season 2 opens on him. His story is a different book." },
      { name: "The Martial Ancestor", zh: "武祖", ep: 59, wiki: "Lin Dong", legacy: "The other ascendant. A flashback in season 2. Also a different book." },
    ] },
  ],

  zones: [
    { name: "Spiritual Road", zh: "灵路", subs: "Spiritual Land", ep: 1, masterEp: 1, master: "Run by the Five Great Academies. The champion's title is the Spirit Crown.", text: "A fragment of a plane where every kind of energy is sealed, including Dou Qi and Yuan Li from the lower planes. You get through on your body and your nerve. Passing it is a ticket to the five academies, plus an empowerment." },
    { name: "Northern Spiritual Field", zh: "北灵原", ep: 5, masterEp: 5, master: "A training ground of the Northern Spiritual Academy.", text: "Heaven Class students are sent in. The threats are beasts and each other." },
    { name: "Black Eerie Swamp", zh: "黑冥渊", subs: "Dark Abyss", ep: 10, masterEp: 13, master: "The Nine Netherbird is what both territories came for.", text: "South of the Northern Spiritual Realm. Poison thick enough to be its own landmark. Episodes 10 to 13." },
    { name: "White Dragon Sovereign's treasury", zh: "白龙宝库", ep: 44, masterEp: 52, master: "What the White Dragon Sovereign left behind.", text: "The mission that finishes season 1. White Dragon City, and people who are not students." },
    { name: "Lightning Territory", zh: "雷域", ep: 34, masterEp: 59, master: "The Northern Sea Dragon oversees the deeper levels.", text: "Inside the academy. Good for the body and for anything that needs thunder. He uses the third level as a freshman and is trained by the dragon himself before the tournament." },
    { name: "Divine Spiritual Mountain", zh: "神灵山", subs: "Holy Spirit Mountain", ep: 71, masterEp: 76, master: "A dead Heavenly Sovereign's baptism, at the top of the Nine Heavenly Steps.", text: "The young experts of the whole continent. Spatial gales at the door. The reward cleans the body for the road toward Sovereign." },
    { name: "Great Spiritual Academy Tournament", zh: "灵院大赛", subs: "Spiritual Academy Competition", ep: 81, masterEp: 92, master: "The five academies, and everyone who wants them humiliated.", text: "Still airing. As of episode 92 the Wood God Mountain trial inside it has just finished." },
  ],
};
})();
