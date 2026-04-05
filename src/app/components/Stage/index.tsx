"use client";

import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import { useCatStore } from "@/app/store/cat";
import { CatInfo, myCat } from "@/app/utils/cats";
import { wait } from "@/app/utils/helper";

import Dialog from "../Dialog";
import Control, { DialogInfo, Side } from "./Control";
import Effects, { EffectType } from "./Effects";
import styles from "./index.module.scss";
import Player from "./Player";

const cn = classNames.bind(styles);

// 모션 duration(초) 정의
const MY_MOTION_DELAY = 1;
const MY_MOTION_DURATION = 0.2;
const PUNCH_DURATION = 0.2;
const SEDUCE_DURATION = 2;
const PROVOKE_DURATION = 1;
// 행동 후 딜레이
const DELAY_OF_ACTIONS = 0.5;

interface Props {
  onClose?: () => void;
  onWin: (cat: CatInfo) => void;
}

export default function Stage({ onClose, onWin }: Props) {
  const selectedCat = useCatStore((s) => s.selectedCat);

  const [me] = useState(myCat);

  const [dialogInfo, setDialogInfo] = useState<DialogInfo | undefined>({
    type: "meet",
    speaker: selectedCat?.name || "",
    text: selectedCat?.dialog.meet || "",
  });

  const [dialogConfirmCount, setDialogConfirmCount] = useState(0);
  const [isShowControl, setIsShowControl] = useState(false);
  const [isShowFinishPopup, setIsShowFinishPopup] = useState(false);
  const [winner, setWinner] = useState<Side>();

  // 전투진행관련 상태들
  const [hpInfo, setHpInfo] = useState({
    myHp: myCat.hp,
    enemyHp: selectedCat?.hp || 0,
  });
  const [punchedBy, setPunchedBy] = useState<Side>();
  const [seducedBy, setSeducedBy] = useState<Side>();
  const [provokedBy, setProvokedBy] = useState<Side>();

  const enemyEffect: EffectType | undefined =
    provokedBy === "me"
      ? "provoke"
      : seducedBy === "me"
      ? "seduce"
      : punchedBy === "me"
      ? "punch"
      : undefined;

  const myEffect: EffectType | undefined =
    provokedBy === "enemy"
      ? "provoke"
      : seducedBy === "enemy"
      ? "seduce"
      : punchedBy === "enemy"
      ? "punch"
      : undefined;

  const isVictory = !!winner && winner === "me";

  // return: 승리한 사이드
  const punch = async (side: Side): Promise<Side | void> => {
    let winnerSide: Side | undefined;

    if (side === "me") {
      const enemyHp = Math.max(hpInfo.enemyHp - myCat.punchPower, 0);

      if (enemyHp === 0) {
        winnerSide = "me";
      }

      setPunchedBy("me");
      setTimeout(() => setPunchedBy(undefined), 1000);

      await wait((PUNCH_DURATION + DELAY_OF_ACTIONS) * 1000);

      setHpInfo({ ...hpInfo, enemyHp });
    } else {
      const myHp = Math.max(hpInfo.myHp - selectedCat!.punchPower, 0);

      if (myHp === 0) {
        winnerSide = "enemy";
      }

      setPunchedBy("enemy");
      setTimeout(() => setPunchedBy(undefined), 1000);

      await wait((PUNCH_DURATION + DELAY_OF_ACTIONS) * 1000);

      setHpInfo({ ...hpInfo, myHp });
    }

    return winnerSide;
  };

  const seduce = async (side: Side) => {
    if (side === "me") {
      setSeducedBy("enemy");
      setTimeout(() => setSeducedBy(undefined), SEDUCE_DURATION * 1000);
    } else {
      setSeducedBy("me");
      setTimeout(() => setSeducedBy(undefined), SEDUCE_DURATION * 1000);
    }

    await wait((SEDUCE_DURATION + DELAY_OF_ACTIONS) * 1000);
  };

  const provoke = async (side: Side) => {
    if (side === "me") {
      setProvokedBy("enemy");
      setTimeout(() => setProvokedBy(undefined), PROVOKE_DURATION * 1000);
    } else {
      setProvokedBy("me");
      setTimeout(() => setProvokedBy(undefined), PROVOKE_DURATION * 1000);
    }

    await wait((PROVOKE_DURATION + DELAY_OF_ACTIONS) * 1000);
  };

  const enemyAction = () => {
    // 상대는 랜덤으로 액션을 취한다
    const action = Math.floor(Math.random() * 10) % 3;
    const side = "enemy";

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
          type: "provoke",
          speaker: selectedCat!.name,
          text: selectedCat!.dialog.provoke,
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
          effectType={enemyEffect}
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
        >
          <Effects
            target="enemy"
            enabled={!!enemyEffect}
            effectType={enemyEffect}
            punchDuration={PUNCH_DURATION}
          />
        </Player>

        <Player
          side="me"
          cat={me}
          hp={hpInfo.myHp}
          effectType={myEffect}
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
        >
          <Effects
            enabled={!!myEffect}
            effectType={myEffect}
            punchDuration={PUNCH_DURATION}
          />
        </Player>
      </div>

      <Control
        isShow={isShowControl}
        dialogInfo={dialogInfo}
        onPunch={() => {
          setDialogInfo({
            type: "punch",
            speaker: myCat.name,
            text: myCat.dialog.punch,
          });
        }}
        onProvoke={() => {
          setDialogInfo({
            type: "provoke",
            speaker: myCat.name,
            text: myCat.dialog.provoke,
          });
        }}
        onSeduce={() => {
          setDialogInfo({
            type: "seduce",
            speaker: myCat.name,
            text: myCat.dialog.seduce,
          });
        }}
        onRun={() => {
          setDialogInfo({
            type: "run",
            speaker: myCat.name,
            text: myCat.dialog.run,
          });
        }}
        onDialogConfirmClick={async ({ type, causedBy }) => {
          // 대화상자 클릭 후 할것들 정의

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

            if (causedBy === "me") {
              switch (type) {
                case "punch":
                  const winner = await punch("me");

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
                case "provoke":
                  await provoke("me");

                  enemyAction();
                  break;
                case "seduce":
                  await seduce("me");

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
                case "run":
                  setDialogInfo({
                    side: "enemy",
                    type: "run",
                    speaker: selectedCat!.name,
                    text: selectedCat!.dialog.run,
                  });

                  break;
              }

              if (type !== "lose") {
                setIsShowControl(true);
              }
            }

            if (causedBy === "enemy") {
              switch (type) {
                case "punch":
                  await punch("enemy");

                  break;
                case "seduce":
                  await seduce("enemy");

                  break;
                case "provoke":
                  await provoke("enemy");

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
                case "run":
                  onClose?.();
                  break;
              }

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
