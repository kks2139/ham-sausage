"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ImgCatGang from "@/assets/img/cat_gang.png";

import styles from "./page.module.scss";

const cn = classNames.bind(styles);

export default function Entry() {
  const router = useRouter();

  return (
    <main className={cn("Entry")}>
      <Image
        src={ImgCatGang}
        alt="Background"
        placeholder="blur"
        fill
        style={{
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      <button
        className={cn("start-button")}
        type="button"
        onClick={() => {
          router.push("/test");
        }}
      >
        시작하기
      </button>
    </main>
  );
}
