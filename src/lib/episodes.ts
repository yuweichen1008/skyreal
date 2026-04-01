export interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  thumbnail: string;
  spotifyUrl: string;
  tags: string[];
  outline?: string[];
  transcript?: string;
}

export const episodes: Episode[] = [
  {
    id: "s1-ep3",
    title: "S1 EP3 赫茲共鳴 動物系戀人特輯",
    description: "每個人談戀愛，都像一種動物！有人高冷神秘、有人甜到發糖，有人理性到像行走的行事曆，有人捉摸不定像一場愛情心理戰。這集，我們邀請：🐱 貓系智囊團——理性卻傲嬌🐶 犬系甜心——黏人又真誠🦊 狐系軍師——神秘又充滿套路🐻 熊系指揮官——理性穩重、超有計劃一起帶你做「動物系戀人」小測驗，搞懂自己的戀愛屬性，看見最真實的自己，也順便了解你（或另一半）的可愛怪癖！",
    duration: "29 min",
    date: "Today",
    thumbnail: "/episodes/ep3-thumbnail.jpg",
    spotifyUrl: "https://open.spotify.com/show/0JcB27aIGgVEvdvfrBPaLw",
    tags: ["愛情", "心理測驗", "動物系", "戀愛"],
    outline: undefined,
    transcript: undefined,
  },
  {
    id: "s1-ep2",
    title: "S1 EP2 快問快答 輕鬆共鳴快問快答特輯",
    description: "🎙️ 《520赫茲共鳴》輕鬆共鳴快問快答特輯這一集，我們要放下嚴肅，來一場最真誠、最有趣的「快問快答」！專屬 25–45 歲的我們，一邊笑、一邊想，重新認識那個正在努力生活、偶爾迷路但依然很可愛的自己。",
    duration: "23 min",
    date: "Today",
    thumbnail: "/episodes/ep2-thumbnail.jpg",
    spotifyUrl: "https://open.spotify.com/show/0JcB27aIGgVEvdvfrBPaLw",
    tags: ["快問快答", "生活", "自我認識", "輕鬆"],
    outline: undefined,
    transcript: undefined,
  },
  {
    id: "s1-ep1",
    title: "S1 EP1 矽谷：夢想的起點 感情的終點",
    description: "矽谷：夢想的起點，感情的終點「來到矽谷，是為了夢想；離開矽谷，是為了愛情？」我們正在灣區的心臟——San Jose。這裡，是全球科技人才追逐夢想的舞台，也是許多人戀愛夢碎的戰場。",
    duration: "40 min",
    date: "Thursday",
    thumbnail: "/episodes/ep1-thumbnail.jpg",
    spotifyUrl: "https://open.spotify.com/show/0JcB27aIGgVEvdvfrBPaLw",
    tags: ["矽谷", "愛情", "科技", "灣區"],
    outline: undefined,
    transcript: undefined,
  }
];

export const getEpisodeById = (id: string): Episode | undefined => {
  return episodes.find(episode => episode.id === id);
};
