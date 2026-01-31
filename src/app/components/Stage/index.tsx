"use client";

import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import { useCatStore } from "@/app/store/cat";
import { CatInfo, myCat } from "@/app/utils/cats";
import { wait } from "@/app/utils/helper";

import Dialog from "../Dialog";
import Control, { DialogInfo, Side } from "./Control";
import styles from "./index.module.scss";
import Player from "./Player";

const cn = classNames.bind(styles);

const MY_MOTION_DELAY = 1;
const MY_MOTION_DURATION = 0.2;
const PUNCH_DURATION = 0.2;
const SEDUCE_DURATION = 2;

interface Props {
  onClose?: () => void;
  onWin: (cat: CatInfo) => void;
}

export default function Stage({ onClose, onWin }: Props) {
  const selectedCat = useCatStore((s) => s.selectedCat);

  const [me] = useState(myCat);

  const [hpInfo, setHpInfo] = useState({
    myHp: myCat.hp,
    enemyHp: selectedCat?.hp || 0,
  });
  const [hitInfo, setHitInfo] = useState({ myHit: false, enemyHit: false });
  const [seduceInfo, setSeduceInfo] = useState({
    mySeduce: false,
    enemySeduce: false,
  });

  const [dialogInfo, setDialogInfo] = useState<DialogInfo | undefined>({
    type: "meet",
    speaker: selectedCat?.name || "",
    text: selectedCat?.dialog.meet || "",
  });

  const [dialogConfirmCount, setDialogConfirmCount] = useState(0);
  const [isShowControl, setIsShowControl] = useState(false);
  const [isShowFinishPopup, setIsShowFinishPopup] = useState(false);
  const [winner, setWinner] = useState<Side>();

  const isVictory = !!winner && winner === "me";

  // return: 승리한 사이드
  const punch = async (side: Side): Promise<Side | void> => {
    let winnerSide: Side | undefined;

    if (side === "me") {
      const enemyHp = Math.max(hpInfo.enemyHp - myCat.punchPower, 0);

      if (enemyHp === 0) {
        winnerSide = "me";
      }

      setHitInfo({ ...hitInfo, enemyHit: true });
      setTimeout(() => setHitInfo({ ...hitInfo, enemyHit: false }), 1000);

      await wait((PUNCH_DURATION + 0.2) * 1000);

      setHpInfo({ ...hpInfo, enemyHp });
    } else {
      const myHp = Math.max(hpInfo.myHp - selectedCat!.punchPower, 0);

      if (myHp === 0) {
        winnerSide = "enemy";
      }

      setHitInfo({ ...hitInfo, myHit: true });
      setTimeout(() => setHitInfo({ ...hitInfo, myHit: false }), 1000);

      await wait((PUNCH_DURATION + 0.2) * 1000);

      setHpInfo({ ...hpInfo, myHp });
    }

    return winnerSide;
  };

  const seduce = async (side: Side) => {
    if (side === "me") {
      setSeduceInfo({ ...seduceInfo, enemySeduce: true });
      setTimeout(
        () => setSeduceInfo({ ...seduceInfo, enemySeduce: false }),
        1000
      );
    } else {
      setSeduceInfo({ ...seduceInfo, mySeduce: true });
      setTimeout(() => setSeduceInfo({ ...seduceInfo, mySeduce: false }), 1000);
    }

    await wait((SEDUCE_DURATION + 0.2) * 1000);
  };

  const enemyAction = () => {
    // 적은 랜덤 확률로 액션을 취한다
    const action = Math.floor(Math.random() * 10) % 3;
    const side = "enemy";

    setDialogInfo({
      side,
      type: "seduce",
      speaker: selectedCat!.name,
      text: selectedCat!.dialog.seduce,
    });
    setIsShowControl(true);

    return;

    switch (action) {
      case 0: // 냥냥펀치
        setDialogInfo({
          side,
          type: "punch",
          speaker: selectedCat!.name,
          text: selectedCat!.dialog.punch,
        });
        break;
      case 1: // 도발
        setDialogInfo({
          side,
          type: "taunt",
          speaker: selectedCat!.name,
          text: selectedCat!.dialog.taunt,
        });
        break;
      case 2: // 유혹
        setDialogInfo({
          side,
          type: "seduce",
          speaker: selectedCat!.name,
          text: selectedCat!.dialog.seduce,
        });
        break;
    }

    setIsShowControl(true);
  };

  useEffect(() => {
    setTimeout(
      () => setIsShowControl(true),
      (MY_MOTION_DURATION + MY_MOTION_DELAY + 0.3) * 1000
    );
  }, []);

  return (
    <div className={cn("Stage")}>
      <div className={cn("view")}>
        <Player
          side="enemy"
          cat={selectedCat}
          hp={hpInfo.enemyHp}
          effectType={
            seduceInfo.enemySeduce
              ? "seduce"
              : hitInfo.enemyHit
              ? "punch"
              : undefined
          }
          punchDuraion={PUNCH_DURATION}
          seduceDuraion={SEDUCE_DURATION}
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
          effectType={
            seduceInfo.mySeduce ? "seduce" : hitInfo.myHit ? "punch" : undefined
          }
          punchDuraion={PUNCH_DURATION}
          seduceDuraion={SEDUCE_DURATION}
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
        isShow={isShowControl}
        onPunch={() => {
          setDialogInfo({
            type: "punch",
            speaker: myCat.name,
            text: myCat.dialog.punch,
          });
        }}
        onTaunt={() => {
          setDialogInfo({
            type: "taunt",
            speaker: myCat.name,
            text: myCat.dialog.taunt,
          });
        }}
        onSeduce={() => {
          setDialogInfo({
            type: "seduce",
            speaker: myCat.name,
            text: myCat.dialog.seduce,
          });
        }}
        onRun={() => onClose?.()}
        dialogInfo={dialogInfo}
        onConfirmDialog={async ({ type, side }) => {
          if (dialogConfirmCount === 0) {
            setDialogInfo({
              type: "meet",
              speaker: myCat.name,
              text: myCat.dialog.meet,
            });
          } else if (dialogConfirmCount === 1) {
            setDialogInfo(undefined);
          } else {
            setDialogInfo(undefined);
            setIsShowControl(false);

            if (side === "me") {
              switch (type) {
                case "punch":
                  const winner = await punch("me");

                  await wait(1000);

                  if (winner === "me") {
                    setDialogInfo({
                      type: "win",
                      speaker: myCat.name,
                      text: myCat.dialog.win,
                    });
                  } else if (winner === "enemy") {
                    setDialogInfo({
                      side: "enemy",
                      type: "win",
                      speaker: selectedCat!.name,
                      text: selectedCat!.dialog.win,
                    });
                  } else {
                    enemyAction();
                  }

                  break;
                case "taunt":
                  setIsShowControl(true);
                  break;
                case "seduce":
                  seduce("me");

                  await wait(1500);

                  enemyAction();

                  break;
                case "win":
                  setWinner("me");

                  setDialogInfo({
                    side: "enemy",
                    type: "lose",
                    speaker: selectedCat!.name,
                    text: selectedCat!.dialog.lose,
                  });
                  break;
                case "lose":
                  setIsShowFinishPopup(true);
                  break;
              }

              if (type !== "lose") {
                setIsShowControl(true);
              }
            } else if (side === "enemy") {
              switch (type) {
                case "punch":
                  punch("enemy");
                  break;
                case "seduce":
                  seduce("enemy");

                  break;
                case "taunt":
                  break;
                case "win":
                  setWinner("enemy");

                  setDialogInfo({
                    side: "me",
                    type: "lose",
                    speaker: myCat.name,
                    text: myCat.dialog.lose,
                  });
                  break;
                case "lose":
                  setIsShowFinishPopup(true);
                  break;
              }

              await wait(1000);

              if (type !== "lose") {
                setIsShowControl(true);
              }
            }
          }

          setDialogConfirmCount((pre) => pre + 1);
        }}
      />

      <Dialog
        isShow={isShowFinishPopup}
        title={isVictory ? "승리" : "패배"}
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
