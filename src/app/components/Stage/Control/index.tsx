"use client";

import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useViewStore } from "@/app/store/view";
import { CatInfo } from "@/app/utils/cats";

import Button from "../../Button";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

const MOTION_DATA = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.2 },
};

const Typing = ({ text, speed = 60 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText("");

    let currentIndex = 0;

    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        const nextChar = text.charAt(currentIndex);

        setDisplayText((prev) => prev + nextChar);
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className={cn("text")}>
      <p>{displayText}</p>
    </div>
  );
};

type DialogType = keyof CatInfo["dialog"];

export type Side = "me" | "enemy";

export interface DialogInfo {
  side?: Side;
  type: DialogType;
  speaker: string;
  text: string;
}

interface Props {
  isShow: boolean;
  onPunch: () => void;
  onTaunt: () => void;
  onSeduce: () => void;
  onRun: () => void;
  dialogInfo?: DialogInfo;
  onConfirmDialog: (info: { type?: DialogType; side: Side }) => void;
}

export default function Control({
  isShow,
  onPunch,
  onTaunt,
  onSeduce,
  onRun,
  dialogInfo,
  onConfirmDialog,
}: Props) {
  const { addToastMessage } = useViewStore((s) => s.actions);

  const [menuType, setMenuType] = useState<"default" | "battle">();

  return (
    <div className={cn("Control")}>
      <AnimatePresence>
        {isShow ? (
          dialogInfo ? (
            <motion.div
              key="dialog"
              {...MOTION_DATA}
              className={cn("dialog")}
              onClick={() => {
                onConfirmDialog({
                  type: dialogInfo.type,
                  side: dialogInfo.side || "me",
                });
              }}
            >
              <div className={cn("guide-text")}>click {"→"} 넘기기</div>
              <div className={cn("speaker")}>{`${dialogInfo.speaker}`}</div>
              <Typing text={dialogInfo.text} />
            </motion.div>
          ) : (
            <div className={cn("menu")}>
              {menuType === "battle" ? (
                <motion.ul key="fight" {...MOTION_DATA}>
                  <li>
                    <Button
                      size="large"
                      onClick={() => {
                        onPunch();
                      }}
                    >
                      냥냥펀치
                    </Button>
                  </li>
                  <li>
                    <Button
                      size="large"
                      onClick={() => {
                        onSeduce();
                      }}
                    >
                      유혹
                    </Button>
                  </li>
                  <li>
                    <Button
                      size="large"
                      onClick={() => {
                        onTaunt();
                      }}
                    >
                      도발
                    </Button>
                  </li>
                  <li>
                    <Button
                      size="large"
                      onClick={() => {
                        // TODO: 장비창 open
                        addToastMessage({ message: "개발중" });
                      }}
                    >
                      장비
                    </Button>
                  </li>
                  <li>
                    <Button
                      size="large"
                      onClick={() => {
                        setMenuType("default");
                      }}
                    >
                      뒤로
                    </Button>
                  </li>
                </motion.ul>
              ) : (
                <motion.ul key="default" {...MOTION_DATA}>
                  <li>
                    <Button
                      size="large"
                      onClick={() => {
                        setMenuType("battle");
                      }}
                    >
                      싸운다
                    </Button>
                  </li>
                  <li>
                    <Button
                      size="large"
                      onClick={() => {
                        onRun();
                      }}
                    >
                      튄다
                    </Button>
                  </li>
                </motion.ul>
              )}
            </div>
          )
        ) : null}
      </AnimatePresence>
    </div>
  );
}
