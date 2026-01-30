"use client";

import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/app/components/Button";
import Dialog from "@/app/components/Dialog";
import Map from "@/app/components/Map";
import Stage from "@/app/components/Stage";
import { useCatStore } from "@/app/store/cat";
import { CatInfo, catInfos } from "@/app/utils/cats";
import ImgWinningFlag from "@/assets/img/winning_flag.png";

import styles from "./page.module.scss";

const cn = classNames.bind(styles);

export default function FindCat() {
  const router = useRouter();

  const { setSelectedCat, addCatchedCat } = useCatStore((s) => s.actions);
  const catchedCats = useCatStore((s) => s.catchedCats);

  const [isShowPopup, setIsShowPopup] = useState(false);
  const [catchedCat, setCatchedCat] = useState<CatInfo>();
  const [selectedMenu, setSelectedMenu] = useState<"catched" | "all">();

  return (
    <main className={cn("FindCat")}>
      <Map
        className={cn("map")}
        onClickCatMarker={() => {
          setIsShowPopup(true);
          setSelectedMenu(undefined);
        }}
      />

      <div className={cn("menu")}>
        <div className={cn("buttons")}>
          <Button
            onClick={() => {
              setSelectedMenu("catched");
            }}
          >
            내 조직원
          </Button>
          <Button
            onClick={() => {
              setSelectedMenu("all");
            }}
          >
            냥아치 목록
          </Button>
          <Button
            onClick={() => {
              router.back();
            }}
          >
            나가기
          </Button>
        </div>

        <AnimatePresence>
          {!!selectedMenu && (
            <motion.div
              className={cn("content")}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className={cn("close-button")}
                type="button"
                onClick={() => {
                  setSelectedMenu(undefined);
                }}
              >
                닫기
              </button>

              <div className={cn("wrapper")}>
                {selectedMenu === "catched" &&
                  (catchedCats.length > 0 ? (
                    <ul>
                      {catchedCats.map(({ name, img, description }) => (
                        <li key={name}>
                          <Image
                            src={img.src}
                            alt={name}
                            width={50}
                            height={50}
                          />
                          <span>{name} :</span>
                          <span>{description}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className={cn("empty")}>
                      크흡.. 부하가 하나도 없다니
                    </div>
                  ))}
                {selectedMenu === "all" && (
                  <ul>
                    {catInfos.map(({ name, img, description }) => (
                      <li key={name}>
                        <Image
                          src={img.src}
                          alt={name}
                          width={50}
                          height={50}
                        />
                        <span>{name} :</span>
                        <span>{description}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!!isShowPopup && (
          <motion.div
            className={cn("img-popup")}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.2 }}
          >
            <Stage
              onClose={() => {
                setIsShowPopup(false);
              }}
              onWin={(cat) => {
                setIsShowPopup(false);

                setTimeout(() => {
                  cat.marker?.setImage(
                    new kakao.maps.MarkerImage(
                      ImgWinningFlag.src,
                      new kakao.maps.Size(30, 30),
                      { offset: new kakao.maps.Point(0, 0) }
                    )
                  );

                  setSelectedCat(undefined);
                  setCatchedCat(cat);
                }, 1000);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        isShow={!!catchedCat}
        title="승리"
        subTitle={
          <>
            <strong>{catchedCat?.name}</strong>를 손에 넣었습니다.{"\n"}
            이제 <strong>{catchedCat?.name}</strong>와 그의 영역은{"\n"}
            당신이 가지게 됩니다.
          </>
        }
        buttonLable="확인"
        onButtonClick={() => {
          if (catchedCat) {
            addCatchedCat(catchedCat);

            // TODO: 잡은 고양이목록 디비저장
          }

          setCatchedCat(undefined);
        }}
      />
    </main>
  );
}
