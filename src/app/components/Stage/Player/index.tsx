import NumberFlow from "@number-flow/react";
import classNames from "classnames/bind";
import { motion, MotionNodeAnimationOptions } from "framer-motion";
import Image from "next/image";

import { CatInfo } from "@/app/utils/cats";

import Effects from "../Effects";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface IntroduceProps {
  isMe?: boolean;
  cat?: CatInfo;
  introMotion?: MotionNodeAnimationOptions;
  hp: number;
}

function Introduce({ isMe, cat, introMotion, hp }: IntroduceProps) {
  return (
    <motion.ul className={cn("introduce", { me: isMe })} {...introMotion}>
      <li>
        <div className={cn("label")}>이름</div>
        <strong>{cat?.name}</strong>
      </li>
      <li>
        <div className={cn("label")}>울음</div>
        <strong>{cat?.crying}</strong>
      </li>
      <li className={cn("hp")}>
        <div className={cn("label")}>HP</div>
        <div className={cn("hp-bar")}>
          <div
            className={cn("bar")}
            style={{
              width: `${(hp / (cat?.hp || 0)) * 100}%`,
            }}
          ></div>
        </div>
        <NumberFlow className={cn("value")} value={hp} />
      </li>
    </motion.ul>
  );
}

interface CatVisualProps {
  cat?: CatInfo;
  punched?: boolean;
  punchDuraion?: number;
  catImgIntroMotion?: MotionNodeAnimationOptions;
  children?: React.ReactNode;
}

function CatVisual({
  cat,
  punched,
  catImgIntroMotion,
  children,
}: CatVisualProps) {
  return (
    <motion.div className={cn("imgs")} {...catImgIntroMotion}>
      <Image
        className={cn("cat-img", { hit: punched })}
        src={cat?.img.src || ""}
        alt={cat?.name || ""}
        width={170}
        height={170}
      />
      {children}
    </motion.div>
  );
}

interface Props extends IntroduceProps, CatVisualProps {
  side: "me" | "enemy";
}

export default function Player({
  side,
  cat,
  hp,
  introMotion,
  punched,
  punchDuraion = 1,
  catImgIntroMotion,
}: Props) {
  const isMe = side === "me";

  return (
    <div className={cn("Player", { "align-right": !isMe })}>
      {!isMe && <Introduce cat={cat} hp={hp} introMotion={introMotion} />}

      <CatVisual
        cat={cat}
        punched={punched}
        punchDuraion={punchDuraion}
        catImgIntroMotion={catImgIntroMotion}
      >
        <Effects
          enabled={!!punched}
          effectType="punch"
          effectDuration={punchDuraion}
        />
      </CatVisual>

      {isMe && <Introduce isMe cat={cat} hp={hp} introMotion={introMotion} />}
    </div>
  );
}
