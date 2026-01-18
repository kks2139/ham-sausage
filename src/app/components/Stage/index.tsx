"use client";

import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useCatStore } from "@/app/store/cat";
import { CatInfo } from "@/app/utils/cats";
import { wait } from "@/app/utils/helper";
import ImgCatFoot from "@/assets/img/cat_foot.png";
import ImgCatMe from "@/assets/img/cat_me.png";

import Dialog from "../Dialog";
import Control from "./Control";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

const MY_MOTION_DELAY = 1;
const MY_MOTION_DURATION = 0.2;
const PUNCH_DURATION = 0.2;

interface Props {
  onClose?: () => void;
  onWin: (cat: CatInfo) => void;
}

export default function Stage({ onClose, onWin }: Props) {
  const selectedCat = useCatStore((s) => s.selectedCat);

  const [hpInfo, setHpInfo] = useState({
    myHp: 10,
    enemyHp: selectedCat?.hp || 0,
  });
  const [hitInfo, setHitInfo] = useState({ myHit: false, enemyHit: false });

  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [winner, setWinner] = useState<"me" | "enemy">();

  const isVictory = !!winner && winner === "me";

  const punch = async () => {
    const enemyHp = hpInfo.enemyHp - 2;
    const isMyWin = enemyHp <= 0;

    if (isMyWin) {
      setWinner("me");
    }

    setHitInfo({ ...hitInfo, enemyHit: true });
    setTimeout(() => setHitInfo({ ...hitInfo, enemyHit: false }), 1000);

    await wait((PUNCH_DURATION + 0.2) * 1000);

    setHpInfo({ ...hpInfo, enemyHp });

    if (isMyWin) {
      await wait(300);

      setIsShowDialog(true);
    }
  };

  useEffect(() => {
    setTimeout(
      () => setIsShowMenu(true),
      (MY_MOTION_DURATION + MY_MOTION_DELAY + 0.3) * 1000
    );
  }, [setIsShowMenu]);

  return (
    <div className={cn("Stage")}>
      <div className={cn("view")}>
        <div className={cn("staus-row", { "align-right": true })}>
          <motion.div
            className={cn("introduce")}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.5 }}
          >
            <div>
              <span>이름 : </span>
              <strong>{selectedCat?.name}</strong>
            </div>
            <div>
              <span>울음 : </span>
              <strong>{selectedCat?.description}</strong>
            </div>
            <div>
              <span>HP : </span>
              <div className={cn("hp-bar")}>
                <div
                  className={cn("value")}
                  style={{
                    width: `${
                      (hpInfo.enemyHp / (selectedCat?.hp || 0)) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={cn("imgs")}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Image
              className={cn("cat-img", { hit: hitInfo.enemyHit })}
              src={selectedCat?.img.src || ""}
              alt={selectedCat?.name || ""}
              width={170}
              height={170}
            />

            <AnimatePresence>
              {hitInfo.enemyHit &&
                Array.from({ length: 2 }, (_, i) => {
                  const isFirst = i === 0;
                  const moveX = 30;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: isFirst ? -moveX : 0 }}
                      animate={{ opacity: 1, x: isFirst ? 0 : moveX }}
                      transition={{
                        duration: PUNCH_DURATION,
                        delay: isFirst ? 0 : 0.2,
                      }}
                    >
                      <Image
                        className={cn("punch-img", { hit: hitInfo.enemyHit })}
                        src={ImgCatFoot.src}
                        alt=""
                        width={30}
                        height={60}
                      />
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className={cn("staus-row")}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: MY_MOTION_DURATION,
              delay: MY_MOTION_DELAY,
            }}
          >
            <Image
              className={cn("cat-img")}
              src={ImgCatMe}
              alt=""
              width={150}
              height={150}
            />
          </motion.div>

          <motion.div
            className={cn("introduce")}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: MY_MOTION_DURATION + MY_MOTION_DELAY,
            }}
          >
            <div>
              <span>나</span>
            </div>
            <div>
              <span>울음 : </span>
              <strong>키야오오오</strong>
            </div>
            <div>
              <span>HP : </span>
              <div className={cn("hp-bar")}>
                <div
                  className={cn("value")}
                  style={{
                    width: `${(hpInfo.myHp / (selectedCat?.hp || 0)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Control
        isShowMenu={isShowMenu}
        onPunch={punch}
        onRun={() => onClose?.()}
      />

      <Dialog
        isShow={isShowDialog}
        title={isVictory ? "승리" : "패배배"}
        subTitle={isVictory ? "적을 쓰러뜨렸습니다." : "패배하였습니다."}
        buttonLable={isVictory ? "좋은 싸움이었다" : "도망가자"}
        onButtonClick={() => {
          if (isVictory && selectedCat) {
            onWin(selectedCat);
          } else {
            onClose?.();
          }
        }}
      />
    </div>
  );
}
