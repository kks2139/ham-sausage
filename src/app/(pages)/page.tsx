"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ImgCatGang from "@/assets/img/cat_gang.png";

import Button from "../components/Button";
import { useViewStore } from "../store/view";
import styles from "./page.module.scss";

const cn = classNames.bind(styles);

export default function Entry() {
  const { addToastMessage } = useViewStore((s) => s.actions);
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

      <div className={cn("menu")}>
        <Button
          className={cn("start")}
          onClick={() => {
            router.push("/find-cat");
          }}
        >
          시작하기
        </Button>
        <Button
          className={cn("purpose")}
          onClick={() => {
            // TODO: 사용자별 모은 냥아치, 레벨 순위화면

            addToastMessage({ message: "개발중" });
          }}
        >
          랭킹
        </Button>
      </div>
    </main>
  );
}
