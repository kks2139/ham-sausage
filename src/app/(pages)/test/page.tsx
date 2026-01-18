"use client";

import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Map from "@/app/components/Map";
import Stage from "@/app/components/Stage";
import { useCatStore } from "@/app/store/cat";

import styles from "./page.module.scss";

const cn = classNames.bind(styles);

export default function Test() {
  const { setSelectedCat } = useCatStore((s) => s.actions);
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <main className={cn("Test")}>
      <h1>Test!</h1>

      <Map
        className={cn("map")}
        onClickCatMarker={() => {
          setIsShowPopup(true);
        }}
      />

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
                  cat.marker?.setMap(null);
                  setSelectedCat(undefined);
                }, 1000);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
