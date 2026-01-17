import classNames from "classnames/bind";
import Link from "next/link";

import styles from "./page.module.scss";

const cn = classNames.bind(styles);

export default function Main() {
  return (
    <main className={cn("Main")}>
      <Link href="/test">테스트 페이지로 이동</Link>
    </main>
  );
}
