"use client";

import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import { useCatStore } from "@/app/store/cat";
import { CatInfo, myCat } from "@/app/utils/cats";
import { wait } from "@/app/utils/helper";

import Dialog from "../Dialog";
import Control from "./Control";
import styles from "./index.module.scss";
import Player from "./Player";

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

  const [me] = useState(myCat);

  const [hpInfo, setHpInfo] = useState({
    myHp: 10,
    enemyHp: selectedCat?.hp || 0,
  });
  const [hitInfo, setHitInfo] = useState({ myHit: false, enemyHit: false });
  // const [temptInfo, setTemptInfo] = useState({
  //   myTempted: false,
  //   enemyTempted: false,
  // });

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

  const tepmt = () => {
    //
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
        <Player
          side="enemy"
          cat={selectedCat}
          hp={hpInfo.enemyHp}
          punched={hitInfo.enemyHit}
          punchDuraion={PUNCH_DURATION}
          introMotion={{
            initial: { opacity: 0, y: -50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.2, delay: 0.5 },
          }}
          catImgIntroMotion={{
            initial: { opacity: 0, x: 100 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.2 },
          }}
        />

        <Player
          side="me"
          cat={me}
          hp={hpInfo.myHp}
          punched={hitInfo.myHit}
          punchDuraion={PUNCH_DURATION}
          catImgIntroMotion={{
            initial: { opacity: 0, x: -100 },
            animate: { opacity: 1, x: 0 },
            transition: {
              duration: MY_MOTION_DURATION,
              delay: MY_MOTION_DELAY,
            },
          }}
          introMotion={{
            initial: { opacity: 0, y: -50 },
            animate: { opacity: 1, y: 0 },
            transition: {
              duration: 0.3,
              delay: MY_MOTION_DURATION + MY_MOTION_DELAY,
            },
          }}
        />
      </div>

      <Control
        isShowMenu={isShowMenu}
        onPunch={punch}
        onTempt={tepmt}
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
