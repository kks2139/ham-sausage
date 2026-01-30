import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../../Button";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  isShowMenu: boolean;
  onPunch: () => void;
  onTempt: () => void;
  onRun: () => void;
}

export default function Control({
  isShowMenu,
  onPunch,
  onTempt,
  onRun,
}: Props) {
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
                  onTempt();
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
                튄다
              </Button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
