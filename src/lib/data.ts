import  { colors }  from "./colors";

export interface Playlist {
  id: string;
  albumId: number;
  title: string;
  color: (typeof colors)[keyof typeof colors];
  cover: string;
  artists: string[];
}

export const playlists: Playlist[] = [
  {
    id: '1',
    albumId: 1,
    title: "Chill Lo-Fi Music",
    color: colors.green,
    cover:
      "https://i.ytimg.com/vi/uirL96GVSX4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCEgZShRMA8=&rs=AOn4CLAtGFp5lXPWLU1tV0Scd03F3AzrUA",
    artists: ["NoSpirit", "Casiio"],
  },
  {
    id: '2',
    albumId: 2,
    title: "Lo-Fi Chill Session",
    color: colors.pink,
    cover:
      "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70070000025644/f508f2ce80cc06fb00bc51a902c9be371ee8f39a509300a13b3f3328bcf3afe0",
    artists: ["Kupla", "Blue Fox"],
  },
  {
    id: '3',
    albumId: 3,
    title: "Study Session",
    color: colors.rose,
    cover:
      "https://f4.bcbits.com/img/a1435058381_65.jpg",
    artists: ["Tenno", "xander", "Team Astro"],
  },
  {
    id: '4',
    albumId: 4,
    title: "Blue Note Study Time",
    color: colors.blue,
    cover:
      "https://f4.bcbits.com/img/a1962013209_16.jpg",
    artists: ["Raimu", "Yasumu"],
  },
  {
    id: '5',
    albumId: 5,
    title: "Chau Saura Session",
    color: colors.purple,
    cover:
      "https://f4.bcbits.com/img/a2793859494_16.jpg",
    artists: ["Chau Saura", "amies", "kyu"],
  },
  {
    id: '6',
    albumId: 6,
    title: "Like a Necessity",
    color: colors.orange,
    cover:
      "https://f4.bcbits.com/img/a0363730459_16.jpg",
    artists: ["WFS", "Nadav Cohen"],
  },
  {
    id: '7',
    albumId: 7,
    title: "Imagine Dragons Hits",
    color: colors.red,
    cover:
      "https://www.rollingstone.com/wp-content/uploads/2018/11/IMAGINE-DRAGONS-2019-by-Eric-Ray-Davidson.jpg",
    artists: ["Imagine Dragons"],
  },
];

export const morePlaylists = playlists.map((item) => ({
  ...item,
  id: item.id + "_more",
}))

export const sidebarPlaylists = playlists.map((item) => ({
  ...item,
  id: item.id + "_side",
}))

export const allPlaylists = [
  ...playlists,
  ...morePlaylists,
  ...sidebarPlaylists,
]

export interface Song {
  id: number;
  albumId: number;
  title: string;
  image: string;
  artists: string[];
  album: string;
  duration: string;
}

export const songs: Song[] = [
  {
    "id": 1,
    "albumId": 1,
    "title": "Moonlit Walk",
    "image": `https://i.ytimg.com/vi/uirL96GVSX4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCEgZShRMA8=&rs=AOn4CLAtGFp5lXPWLU1tV0Scd03F3AzrUA`,
    "artists": ["LoFi Dreamer"],
    "album": "Chill Lo-Fi Music",
    "duration": "2:57"
  },
  {
    "id": 2,
    "albumId": 1,
    "title": "Coffee Daze",
    "image": `https://i.ytimg.com/vi/uirL96GVSX4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCEgZShRMA8=&rs=AOn4CLAtGFp5lXPWLU1tV0Scd03F3AzrUA`,
    "artists": ["LoFi Dreamer"],
    "album": "Chill Lo-Fi Music",
    "duration": "3:40"
  },
  {
    "id": 3,
    "albumId": 1,
    "title": "Skyline Serenade",
    "image": `https://i.ytimg.com/vi/uirL96GVSX4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCEgZShRMA8=&rs=AOn4CLAtGFp5lXPWLU1tV0Scd03F3AzrUA`,
    "artists": ["LoFi Dreamer"],
    "album": "Chill Lo-Fi Music",
    "duration": "3:29"
  },
  {
    "id": 4,
    "albumId": 1,
    "title": "Urban Echoes",
    "image": `https://i.ytimg.com/vi/uirL96GVSX4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCEgZShRMA8=&rs=AOn4CLAtGFp5lXPWLU1tV0Scd03F3AzrUA`,
    "artists": ["LoFi Dreamer"],
    "album": "Chill Lo-Fi Music",
    "duration": "2:11"
  },
  {
    "id": 5,
    "albumId": 1,
    "title": "Night's End",
    "image": `https://i.ytimg.com/vi/uirL96GVSX4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCEgZShRMA8=&rs=AOn4CLAtGFp5lXPWLU1tV0Scd03F3AzrUA`,
    "artists": ["LoFi Dreamer"],
    "album": "Chill Lo-Fi Music",
    "duration": "2:26"
  },
  {
    "id": 1,
    "albumId": 2,
    "title": "Silent Rain",
    "image": `https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70070000025644/f508f2ce80cc06fb00bc51a902c9be371ee8f39a509300a13b3f3328bcf3afe0`,
    "artists": ["Urban Nocturne"],
    "album": "Midnight Tales",
    "duration": "2:38"
  },
  {
    "id": 2,
    "albumId": 2,
    "title": "Lost Pages",
    "image": `https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70070000025644/f508f2ce80cc06fb00bc51a902c9be371ee8f39a509300a13b3f3328bcf3afe0`,
    "artists": ["Urban Nocturne"],
    "album": "Midnight Tales",
    "duration": "2:40"
  },
  {
    "id": 3,
    "albumId": 2,
    "title": "Midnight Tales",
    "image": `https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70070000025644/f508f2ce80cc06fb00bc51a902c9be371ee8f39a509300a13b3f3328bcf3afe0`,
    "artists": ["Urban Nocturne"],
    "album": "Midnight Tales",
    "duration": "2:53"
  },
  {
    "id": 4,
    "albumId": 2,
    "title": "City Lights",
    "image": `https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70070000025644/f508f2ce80cc06fb00bc51a902c9be371ee8f39a509300a13b3f3328bcf3afe0`,
    "artists": ["Urban Nocturne"],
    "album": "Midnight Tales",
    "duration": "3:11"
  },
  {
    "id": 5,
    "albumId": 2,
    "title": "Night Drive",
    "image": `https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70070000025644/f508f2ce80cc06fb00bc51a902c9be371ee8f39a509300a13b3f3328bcf3afe0`,
    "artists": ["Urban Nocturne"],
    "album": "Midnight Tales",
    "duration": "2:58"
  },
  {
    "id": 1,
    "albumId": 3,
    "title": "Lunar",
    "image": `https://f4.bcbits.com/img/a1435058381_65.jpg`,
    "artists": ["Tenno"],
    "album": "Study Session",
    "duration": "3:06"
  },
  {
    "id": 2,
    "albumId": 3,
    "title": "Go go go!",
    "image": `https://f4.bcbits.com/img/a1435058381_65.jpg`,
    "artists": ["Tenno"],
    "album": "Study Session",
    "duration": "1:30"
  },
  {
    "id": 3,
    "albumId": 3,
    "title": "Keep focus!",
    "image": `https://f4.bcbits.com/img/a1435058381_65.jpg`,
    "artists": ["Tenno"],
    "album": "Study Session",
    "duration": "1:59"
  },
  {
    "id": 4,
    "albumId": 3,
    "title": "JavaScript is the way",
    "image": `https://f4.bcbits.com/img/a1435058381_65.jpg`,
    "artists": ["Tenno"],
    "album": "Study Session",
    "duration": "3:56"
  },
  {
    "id": 5,
    "albumId": 3,
    "title": "No more TypeScript for me",
    "image": `https://f4.bcbits.com/img/a1435058381_65.jpg`,
    "artists": ["Tenno"],
    "album": "Study Session",
    "duration": "2:30"
  },
  {
    "id": 1,
    "albumId": 4,
    "title": "Lunar",
    "image": "https://f4.bcbits.com/img/a1962013209_16.jpg",
    "artists": ["Tenno"],
    "album": "Study Session",
    "duration": "2:59"
  },
  {
    "id": 2,
    "albumId": 4,
    "title": "Go go go!",
    "image": "https://f4.bcbits.com/img/a1962013209_16.jpg",
    "artists": ["Tenno"],
    "album": "Study Session",
    "duration": "2:12"
  },
  {
    "id": 3,
    "albumId": 4,
    "title": "Keep focus!",
    "image": "https://f4.bcbits.com/img/a1962013209_16.jpg",
    "artists": ["Tenno"],
    "album": "Study Session",
    "duration": "3:02"
  },
  {
    "id": 4,
    "albumId": 4,
    "title": "JavaScript is the way",
    "image": "https://f4.bcbits.com/img/a1962013209_16.jpg",
    "artists": ["Tenno"],
    "album": "Study Session",
    "duration": "2:29"
  },
  {
    "id": 5,
    "albumId": 4,
    "title": "No more TypeScript for me",
    "image": "https://f4.bcbits.com/img/a1962013209_16.jpg",
    "artists": ["Tenno"],
    "album": "Study Session",
    "duration": "2:29"
  },
  {
    "id": 1,
    "albumId": 5,
    "title": "Moonlit Walk",
    "image": "https://f4.bcbits.com/img/a2793859494_16.jpg",
    "artists": ["LoFi Dreamer"],
    "album": "Chill Lo-Fi Music",
    "duration": "3:49"
  },
  {
    "id": 2,
    "albumId": 5,
    "title": "Coffee Daze",
    "image": "https://f4.bcbits.com/img/a2793859494_16.jpg",
    "artists": ["LoFi Dreamer"],
    "album": "Chill Lo-Fi Music",
    "duration": "1:52"
  },
  {
    "id": 3,
    "albumId": 5,
    "title": "Skyline Serenade",
    "image": "https://f4.bcbits.com/img/a2793859494_16.jpg",
    "artists": ["LoFi Dreamer"],
    "album": "Chill Lo-Fi Music",
    "duration": "2:15"
  },
  {
    "id": 4,
    "albumId": 5,
    "title": "Urban Echoes",
    "image": "https://f4.bcbits.com/img/a2793859494_16.jpg",
    "artists": ["LoFi Dreamer"],
    "album": "Chill Lo-Fi Music",
    "duration": "4:06"
  },
  {
    "id": 5,
    "albumId": 5,
    "title": "Night's End",
    "image": "https://f4.bcbits.com/img/a2793859494_16.jpg",
    "artists": ["LoFi Dreamer"],
    "album": "Chill Lo-Fi Music",
    "duration": "2:54"
  },
  {
    "id": 1,
    "albumId": 6,
    "title": "First world",
    "image": "https://f4.bcbits.com/img/a0363730459_16.jpg",
    "artists": ["WFS, Nadav Cohen"],
    "album": "Like a Necessity",
    "duration": "1:57"
  },{
    "id": 2,
    "albumId": 6,
    "title": "Sword and shield",
    "image": "https://f4.bcbits.com/img/a0363730459_16.jpg",
    "artists": ["WFS, Nadav Cohen"],
    "album": "Like a Necessity",
    "duration": "1:49"
  },{
    "id": 3,
    "albumId": 6,
    "title": "Heart's of Lady Furina",
    "image": "https://f4.bcbits.com/img/a0363730459_16.jpg",
    "artists": ["WFS, Nadav Cohen"],
    "album": "Like a Necessity",
    "duration": "2:35"
  },{
    "id": 4,
    "albumId": 6,
    "title": "Kitties Cats",
    "image": "https://f4.bcbits.com/img/a0363730459_16.jpg",
    "artists": ["WFS, Nadav Cohen"],
    "album": "Like a Necessity",
    "duration": "2:49"
  },{
    "id": 1,
    "albumId": 6,
    "title": "Esmerald",
    "image": "https://f4.bcbits.com/img/a0363730459_16.jpg",
    "artists": ["WFS, Nadav Cohen"],
    "album": "Like a Necessity",
    "duration": "2:29"
  },
  
  // Imagine Dragons Songs - Album ID 7
  {
    "id": 1,
    "albumId": 7,
    "title": "Radioactive",
    "image": "https://uke-can-do-it.com/wp-content/uploads/2015/01/radioactive-by-imagine-dragons.jpg",
    "artists": ["Imagine Dragons"],
    "album": "Night Visions",
    "duration": "3:06"
  },
  {
    "id": 2,
    "albumId": 7,
    "title": "Demons",
    "image": "https://song-lyric.ru/wp-content/uploads/2018/09/imagine-dragons-demons.jpg",
    "artists": ["Imagine Dragons"],
    "album": "Night Visions",
    "duration": "2:57"
  },
  {
    "id": 3,
    "albumId": 7,
    "title": "Believer",
    "image": "https://cdn.dribbble.com/users/1333652/screenshots/4404167/posterrrr.png",
    "artists": ["Imagine Dragons"],
    "album": "Evolve",
    "duration": "3:24"
  },
  {
    "id": 4,
    "albumId": 7,
    "title": "Thunder",
    "image": "https://th.bing.com/th/id/R.dc9fd88ca7198d6ba83c711125c312e3?rik=na5JcqGxL%2fnKow&pid=ImgRaw&r=0",
    "artists": ["Imagine Dragons"],
    "album": "Evolve",
    "duration": "3:07"
  },
  {
    "id": 5,
    "albumId": 7,
    "title": "Whatever It Takes",
    "image": "https://th.bing.com/th/id/R.26829f99ceb8aa82c3ffb8c89dc077ff?rik=iJASJQoW%2fUkd2A&pid=ImgRaw&r=0",
    "artists": ["Imagine Dragons"],
    "album": "Evolve",
    "duration": "3:21"
  },
  {
    "id": 6,
    "albumId": 7,
    "title": "Natural",
    "image": "https://images.genius.com/46f01cddf9900d0e67b7dd17b12a65da.960x960x1.jpg",
    "artists": ["Imagine Dragons"],
    "album": "Origins",
    "duration": "3:09"
  },
  {
    "id": 7,
    "albumId": 7,
    "title": "Bad Liar",
    "image": "https://tse3.mm.bing.net/th/id/OIP.IB_v7lxpGQfGzCj8937gjgHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "artists": ["Imagine Dragons"],
    "album": "Origins",
    "duration": "4:20"
  },
  {
    "id": 8,
    "albumId": 7,
    "title": "Bones",
    "image": "https://is2-ssl.mzstatic.com/image/thumb/Music116/v4/33/87/c8/3387c827-adaa-681d-bd10-ce7d8e888b9c/22UMGIM21054.rgb.jpg/1200x1200bf-60.jpg",
    "artists": ["Imagine Dragons"],
    "album": "Mercury - Acts 1 & 2",
    "duration": "2:45"
  },
  {
    "id": 9,
    "albumId": 7,
    "title": "Enemy",
    "image": "https://i.pinimg.com/originals/45/8e/97/458e97a91ba7a240d96fd390b3c5c422.jpg",
    "artists": ["Imagine Dragons", "JID"],
    "album": "Mercury - Acts 1 & 2",
    "duration": "2:53"
  },
  {
    "id": 10,
    "albumId": 7,
    "title": "It's Time",
    "image": "https://images.genius.com/422d2f9339593d6a7cb040a561ed7dd5.500x500x1.jpg",
    "artists": ["Imagine Dragons"],
    "album": "Night Visions",
    "duration": "4:00"
  }

  
]