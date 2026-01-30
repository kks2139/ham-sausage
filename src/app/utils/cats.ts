import { StaticImageData } from "next/image";

import ImgCat1 from "@/assets/img/cat_1.png";
import ImgCat2 from "@/assets/img/cat_2.png";
import ImgCat3 from "@/assets/img/cat_3.png";
import ImgCat4 from "@/assets/img/cat_4.png";
import ImgCat5 from "@/assets/img/cat_5.png";
import ImgCat6 from "@/assets/img/cat_6.png";
import ImgCat7 from "@/assets/img/cat_7.png";
import ImgCat8 from "@/assets/img/cat_8.png";
import ImgCat9 from "@/assets/img/cat_9.png";
import ImgCat10 from "@/assets/img/cat_10.png";
import ImgCat11 from "@/assets/img/cat_11.png";
import ImgCat12 from "@/assets/img/cat_12.png";
import ImgCat13 from "@/assets/img/cat_13.png";
import ImgCat14 from "@/assets/img/cat_14.png";
import ImgCatMe from "@/assets/img/cat_me.png";

export interface CatInfo {
  name: string;
  crying: string;
  img: StaticImageData;
  hp: number;
  punchPower: number;
  marker?: kakao.maps.Marker;
  // 상황별 대사
  dialog: {
    meet: string; // 시작
    win: string; // 승리
    lose: string; // 패배
    taunt: string; // 도발
    seduce: string; // 유혹공격
    punch: string; // 펀치공격
  };
}

export const myCat: CatInfo = {
  name: "나비",
  crying: "냐아앙! (끝까지 간다!)", // 패기 넘치는 울음소리
  img: ImgCatMe, // 주인공 전용 이미지
  hp: 12, // 주인공이라 체력이 다른 고양이보다 조금 높게 설정
  punchPower: 2, // 기본 공격력도 살짝 강력하게!
  dialog: {
    meet: "난 최고의 주먹왕이 될 고양이야!",
    win: "근성으로 이겨냈다!",
    lose: "포기하지 않아...",
    taunt: "진심으로 상대해주지!",
    seduce: "나랑... 같이 정의를 위해 싸우지 않을래?",
    punch: "나의 근성 펀치를 받아라! 냥냥냥냥!", // 소년만화식 기술명
  },
};

export const catCharacters = [
  {
    name: "김두한",
    crying: "야옹! (4달라!!)",
    img: ImgCat1,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "사딸라로 협상해주지.",
      win: "개소리 집어쳐! 나 김두한이다!",
      lose: "내가... 무릎을 꿇다니...",
      taunt: "오늘 여기서 넌 종로를 떠나게 될 거다.",
      seduce: "나랑 같이... 설렁탕 한 그릇 하러 가겠나?",
      punch: "이건 10원짜리 하나 안 틀린 종로의 매운맛이다!", // 묵직한 한 방
    },
  },
  {
    name: "시라소니",
    crying: "애오오오옹~ (이 간나새끼야!)",
    img: ImgCat2,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "내래 이북에서 온 시라소니야.",
      win: "내 주먹 맛이 좀 매울 기야.",
      lose: "기다리라우, 내 다시 오갔어.",
      taunt: "함 붙어보자우, 누가 진짜 호랭이인지!",
      seduce: "임자, 내 눈 똑바로 보라우. 내래 맘에 드나?",
      punch: "내 주먹은 눈보다 빠르단 말이야! 콰악!", // 날렵한 연속 공격
    },
  },
  {
    name: "마동석",
    crying: "끄응.. (진실의 방으로..)",
    img: ImgCat3,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "어, 왔니? 진실의 방으로 갈까?",
      win: "사람 치는 게 취미는 아닌데, 어쩌다 보니.",
      lose: "아이씨... 팔뚝이 너무 굵어서 졌네.",
      taunt: "야, 숨 쉬어. 안 죽어.",
      seduce: "아트박스 사장인데, 너 귀엽게 생겼다?",
      punch: "어이, 한 대만 맞자. 금방 끝낼게.", // 묵직한 압박
    },
  },
  {
    name: "가오가이",
    crying: "가오! 가오오옹!",
    img: ImgCat4,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "어이, 가오가이가 왔다. 쫄았냐?",
      win: "봤지? 이게 진짜 상남자의 펀치다.",
      lose: "가오 떨어지게... 오늘만 봐준다.",
      taunt: "니 실력, 그거 밖에 안 되나?",
      seduce: "가오 있게 말한다. 오늘 나랑 차 한 잔 하지?",
      punch: "가오로 때린다! 아뵤오오오오!",
    },
  },
  {
    name: "개코",
    crying: " rrr... 왈라왈라!",
    img: ImgCat5,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "리듬 타기 전에 한 대 맞을래?",
      win: "내 주먹은 엇박으로 들어가지.",
      lose: "비트가 좀 안 맞았네.",
      taunt: "넌 존재 자체가 오토튠이야, 가짜라고.",
      seduce: "너만을 위한 랩을 써왔어. 들어볼래?",
      punch: "원, 투! 이건 엇박자 펀치다, 리듬 타!", // 박자 쪼개기 공격
    },
  },
  {
    name: "비너스",
    crying: "크어어어- 냥!",
    img: ImgCat6,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "아... 졸린데 그냥 가면 안 돼?",
      win: "자면서 해도 이기네, 하암.",
      lose: "더 잘 수 있어서 좋다...",
      taunt: "니 주먹질, 자장가로 딱이다 얘.",
      seduce: "내 꿈속에 너 나오더라... 같이 잘래?",
      punch: "(잠꼬대하며) 저리 가... 냥냥!", // 무의식의 공격
    },
  },
  {
    name: "너구리형사",
    crying: "크르릉.. (너 굴희냐?)",
    img: ImgCat7,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "잠깐, 검문 좀 하겠습니다. 수상하구먼.",
      win: "현행범으로 체포한다!",
      lose: "강력반 지원군을 불러야겠어...",
      taunt: "너, 꼬리가 길면 잡히는 법이야.",
      seduce: "당신을 내 마음속에 긴급 체포합니다.",
      punch: "공무집행 방해다! 주먹 맛 좀 봐라!",
    },
  },
  {
    name: "구마적",
    crying: "끄아아아앙! (우미관!)",
    img: ImgCat8,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "여기가 어디라고 발을 들여?",
      win: "역시 종로의 주먹은 나다.",
      lose: "나의 시대가 가는 것인가...",
      taunt: "단 한 방이면 끝날 거다.",
      seduce: "우미관을 통째로 빌렸네. 나랑 춤추겠나?",
      punch: "우미관의 위엄을 보여주지! 받으라!",
    },
  },
  {
    name: "소시지",
    crying: "뇸뇸뇸뇸!",
    img: ImgCat9,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "맛있는 냄새 나는데? 너 혹시 간식 있니?",
      win: "이긴 기념으로 츄르 한 접시!",
      lose: "배고파서 힘이 안 나...",
      taunt: "너, 핫바처럼 만들어줄까?",
      seduce: "츄르 하나 있는데... 반씩 나눠 먹을래?",
      punch: "간식 내놔! 내놔! 냥냥냥냥!", // 떼쓰기 펀치
    },
  },
  {
    name: "뭉치",
    crying: "불-쉿! 냥!",
    img: ImgCat10,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "Bullsh*t! 다 비켜, 뭉치가 간다!",
      win: "그럴 줄 알았어, 넌 내 상대가 아냐.",
      lose: "이건 말도 안 돼, 운이 좋았군.",
      taunt: "닥치고 주먹이나 받아!",
      seduce: "이런 Bullsh*t! 너 왜 이렇게 예뻐?",
      punch: "에라이! 다 불-쉿이다! 처먹어라!",
    },
  },
  {
    name: "킬라그램",
    crying: "푸르르르 갓-댐!",
    img: ImgCat11,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "Yo, I'm 죽이는 무게! Killagram! 느낌 좀 있나?",
      win: "너무 쉽지, 이건 껌이야!",
      lose: "Oh my god... 내 페이스를 잃었어.",
      taunt: "네 실력은 그냥 노이즈일 뿐이야.",
      seduce: "너의 실루엣은 예술이야, God Damn!",
      punch: "Boom Bap보다 강력한 냥냥 탭!",
    },
  },
  {
    name: "내란 우두머리",
    crying: "애애오오옹! (일어서라!)",
    img: ImgCat12,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "모든 고양이여, 나를 따르라!",
      win: "역사는 승리자의 기록이지.",
      lose: "반역이다... 이건 반역이야!",
      taunt: "감히 내 권위에 도전하려느냐?",
      seduce: "나의 왕비(혹은 왕)가 되어 이 구역을 다스리자.",
      punch: "반역자의 최후다! 대의를 위해 죽어라!",
    },
  },
  {
    name: "소금빵",
    crying: "바삭- 냥!",
    img: ImgCat13,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "겉은 바삭하고 속은 촉촉한 무서움 맛을 보여주지.",
      win: "고소한 승리의 냄새!",
      lose: "눅눅해졌어... 분하다.",
      taunt: "넌 우유 없으면 상대도 안 돼.",
      seduce: "나처럼 고소하고 짭짤한 고양이 본 적 있어?",
      punch: "매운맛 소금빵 맛 좀 볼래? 얍!",
    },
  },
  {
    name: "창모",
    crying: "메-에스트로 냐앙~",
    img: ImgCat14,
    hp: 10,
    punchPower: 1,
    dialog: {
      meet: "덕소에서 여기까지 왔다. 리듬 타볼까?",
      win: "이건 내 마에스트로의 지휘봉이다!",
      lose: "박자가... 꼬였어.",
      taunt: "내 가사 한 줄보다 가벼운 놈.",
      seduce: "덕소 리의 별빛 아래서 함께 노래할래?",
      punch: "지휘 시작한다. 박자 맞춰서 한 대 맞자!",
    },
  },
];
