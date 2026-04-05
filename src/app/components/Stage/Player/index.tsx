import NumberFlow from "@number-flow/react";
import classNames from "classnames/bind";
import { motion, MotionNodeAnimationOptions } from "framer-motion";
import Image from "next/image";

import { CatInfo } from "@/app/utils/cats";

import { EffectType } from "../Effects";
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
          <div className={cn("value")}>
            <NumberFlow value={hp} />
            {` / ${cat?.hp}`}
          </div>
        </div>
      </li>
    </motion.ul>
  );
}

interface CatVisualProps {
  cat?: CatInfo;
  effectType?: EffectType;
  punchDuraion?: number;
  seduceDuraion?: number;
  catImgIntroMotion?: MotionNodeAnimationOptions;
  children?: React.ReactNode;
}

function CatVisual({
  cat,
  effectType,
  catImgIntroMotion,
  children,
}: CatVisualProps) {
  return (
    <motion.div className={cn("imgs")} {...catImgIntroMotion}>
      <Image
        className={cn("cat-img", {
          hit: effectType === "punch",
        })}
        src={cat?.img.src || ""}
        alt={cat?.name || ""}
        width={100}
        height={100}
      />
      {children}
    </motion.div>
  );
}

interface Props extends IntroduceProps, CatVisualProps {
  side: "me" | "enemy";
  children?: React.ReactNode;
}

export default function Player({
  side,
  cat,
  hp,
  introMotion,
  punchDuraion = 1,
  seduceDuraion = 1,
  effectType,
  catImgIntroMotion,
  children,
}: Props) {
  const isMe = side === "me";

  return (
    <div className={cn("Player")}>
      {!isMe && <Introduce cat={cat} hp={hp} introMotion={introMotion} />}

      <div className={cn("cat")}>
        <CatVisual
          cat={cat}
          effectType={effectType}
          punchDuraion={punchDuraion}
          seduceDuraion={seduceDuraion}
          catImgIntroMotion={catImgIntroMotion}
        />
        {children}
      </div>

      {isMe && <Introduce isMe cat={cat} hp={hp} introMotion={introMotion} />}
    </div>
  );
}
