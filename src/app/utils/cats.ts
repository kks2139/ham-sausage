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

export interface CatInfo {
  name: string;
  description: string;
  img: StaticImageData;
  hp: number;
  punchPower: number;
}

export const catInfos: CatInfo[] = [
  {
    name: "김두한",
    description: "야옹~~",
    img: ImgCat1,
    hp: 10,
    punchPower: 1,
  },
  {
    name: "시라소니",
    description: "애오오옹~",
    img: ImgCat2,
    hp: 10,
    punchPower: 1,
  },
  { name: "마동석", description: "삐삡", img: ImgCat3, hp: 10, punchPower: 1 },
  {
    name: "가오가이",
    description: "골골골",
    img: ImgCat4,
    hp: 10,
    punchPower: 1,
  },
  { name: "개코", description: "키키", img: ImgCat5, hp: 10, punchPower: 1 },
  {
    name: "비너스",
    description: "드르렁",
    img: ImgCat6,
    hp: 10,
    punchPower: 1,
  },
  {
    name: "너구리형사",
    description: "크그그렁",
    img: ImgCat7,
    hp: 10,
    punchPower: 1,
  },
  {
    name: "구마적",
    description: "끼요용",
    img: ImgCat8,
    hp: 10,
    punchPower: 1,
  },
  {
    name: "비실이",
    description: "하아아암~",
    img: ImgCat9,
    hp: 10,
    punchPower: 1,
  },
  { name: "뭉치", description: "불싯", img: ImgCat10, hp: 10, punchPower: 1 },
];
