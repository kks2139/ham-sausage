import classNames from "classnames/bind";

import styles from "./page.module.scss";

const cn = classNames.bind(styles);

export default function Main() {
  return (
    <main className={cn("Main")}>
      <h1>메인</h1>
    </main>
  );
}
