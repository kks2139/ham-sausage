import classNames from "classnames/bind";
import styles from "./page.module.scss";

const cn = classNames.bind(styles);

export default function Test() {
  return (
    <div className={cn("Test")}>
      <h1>Test!!</h1>
    </div>
  );
}
