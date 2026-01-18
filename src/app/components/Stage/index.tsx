"use client";

import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useCatStore } from "@/app/store/cat";
import ImgCatMe from "@/assets/img/cat_me.png";

import Dialog from "../Dialog";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

const MY_MOTION_DELAY = 1;
const MY_MOTION_DURATION = 0.2;

interface Props {
  onClose?: () => void;
}

export default function Stage({ onClose }: Props) {
  const {
    img: catImg,
    name = "",
    description = "",
    hp = 0,
  } = useCatStore((s) => s.selectedCat) || {};

  const [hpInfo, setHpInfo] = useState({ myHp: 10, enemyHp: hp });
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [winner, setWinner] = useState<"me" | "enemy">();

  useEffect(() => {
    setTimeout(
      () => setIsShowMenu(true),
      (MY_MOTION_DURATION + MY_MOTION_DELAY + 0.3) * 1000
    );
  }, []);

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
              <strong>{name}</strong>
            </div>
            <div>
              <span>울음 : </span>
              <strong>{description}</strong>
            </div>
            <div>
              <span>HP : </span>
              <div className={cn("hp-bar")}>
                <div
                  className={cn("value")}
                  style={{ width: `${(hpInfo.enemyHp / hp) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Image
              className={cn("img")}
              src={catImg?.src || ""}
              alt={name}
              width={170}
              height={170}
            />
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
              className={cn("img")}
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
                  style={{ width: `${(hpInfo.myHp / hp) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className={cn("control")}>
        <AnimatePresence>
          {isShowMenu && (
            <motion.ul
              className={cn("menu")}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const enemyHp = hpInfo.enemyHp - 2;

                    if (enemyHp <= 0) {
                      setWinner("me");
                    }

                    setHpInfo({ ...hpInfo, enemyHp });
                  }}
                >
                  냥냥펀치
                </button>
              </li>
              <li>
                <button type="button">유혹</button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onClose?.();
                  }}
                >
                  튀자
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <Dialog
        isShow={!!winner}
        title="승리"
        subTitle={
          !!winner && winner === "me"
            ? "적을 쓰러뜨렸습니다."
            : "패배하였습니다."
        }
        onConfirm={() => {
          setWinner(undefined);
        }}
      />
    </div>
  );
}
