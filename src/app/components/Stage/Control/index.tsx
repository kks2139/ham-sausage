import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../../Button";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  isShowMenu: boolean;
  onPunch: () => void;
  onRun: () => void;
}

export default function Control({ isShowMenu, onPunch, onRun }: Props) {
  return (
    <div className={cn("Control")}>
      <AnimatePresence>
        {isShowMenu && (
          <motion.ul
            className={cn("menu")}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <li>
              <Button
                size="large"
                onClick={() => {
                  onPunch();
                }}
              >
                냥냥펀치
              </Button>
            </li>
            <li>
              <Button
                size="large"
                onClick={() => {
                  // TODO: 고양이밥
                }}
              >
                유혹
              </Button>
            </li>
            <li>
              <Button
                size="large"
                onClick={() => {
                  onRun();
                }}
              >
                튀자
              </Button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
