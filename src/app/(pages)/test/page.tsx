"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";

import Map from "@/app/components/Map";

import styles from "./page.module.scss";

const cn = classNames.bind(styles);

export default function Test() {
  const [popupImg, setPopupImg] = useState<string | null>(null);

  return (
    <main className={cn("Test")}>
      <h1>Test!</h1>

      <Map
        className={cn("map")}
        onClickCatMarker={(catImg) => {
          setPopupImg(catImg);
        }}
      />

      {!!popupImg && (
        <div
          className={cn("img-popup")}
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName.toLowerCase() !== "img") {
              setPopupImg(null);
            }
          }}
        >
          <div className={cn("content")}>
            <button
              className={cn("close-btn")}
              onClick={() => {
                setPopupImg(null);
              }}
            >
              닫기
            </button>

            <Image
              className={cn("img")}
              src={popupImg}
              alt=""
              width={300}
              height={300}
            />
          </div>
        </div>
      )}
    </main>
  );
}
