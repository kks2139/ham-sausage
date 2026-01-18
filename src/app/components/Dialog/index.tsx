"use client";

import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  isShow?: boolean;
  title?: string;
  subTitle?: string;
  buttonLable?: string;
  onButtonClick?: () => void;
}

export default function Dialog({
  isShow,
  title,
  subTitle,
  buttonLable = "확인",
  onButtonClick,
}: Props) {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          className={cn("Dialog")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <div className={cn("content")}>
            <h3 className={cn("title")}>{title}</h3>
            <h5 className={cn("sub-title")}>{subTitle}</h5>
            <button type="button" onClick={onButtonClick}>
              {buttonLable}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
