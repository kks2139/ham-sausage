import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import ImgCatFoot from "@/assets/img/cat_foot.png";
import ImgHeart from "@/assets/img/heart.png";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

export type EffectType = "punch" | "seduce" | "tempt";

interface Props {
  className?: string;
  effectType?: EffectType;
  punchDuration: number;
  enabled: boolean;
  side?: "me" | "enemy";
}

export default function Effects({
  className,
  effectType,
  punchDuration,
  enabled,
  side,
}: Props) {
  return (
    <AnimatePresence>
      {effectType === "punch" &&
        enabled &&
        Array.from({ length: 2 }, (_, i) => {
          const isFirst = i === 0;
          const moveX = 30;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isFirst ? -moveX : 0 }}
              animate={{ opacity: 1, x: isFirst ? 0 : moveX }}
              transition={{
                duration: punchDuration,
                delay: isFirst ? 0 : 0.2,
              }}
            >
              <Image
                className={cn("punch-img", className)}
                src={ImgCatFoot.src}
                alt=""
                width={30}
                height={60}
              />
            </motion.div>
          );
        })}

      {effectType === "seduce" && enabled && (
        <div className={cn(className)}>
          <Image
            className={cn("heart-img", className, { enemy: side === "enemy" })}
            src={ImgHeart.src}
            alt=""
            width={30}
            height={30}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
