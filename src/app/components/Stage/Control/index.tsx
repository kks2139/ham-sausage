import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { useViewStore } from "@/app/store/view";

import Button from "../../Button";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

const MOTION_DATA = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.2 },
};

interface Props {
  isShow: boolean;
  onPunch: () => void;
  onTempt: () => void;
  onRun: () => void;
}

export default function Control({ isShow, onPunch, onTempt, onRun }: Props) {
  const { addToastMessage } = useViewStore((s) => s.actions);

  const [isShowFightMenu, setIsShowFightMenu] = useState(false);

  return (
    <div className={cn("Control")}>
      <AnimatePresence>
        {isShow ? (
          <div className={cn("menu")}>
            {isShowFightMenu ? (
              <motion.ul key="fight" {...MOTION_DATA}>
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
                      // TODO: 장비창 open
                      addToastMessage({ message: "개발중" });
                    }}
                  >
                    장비
                  </Button>
                </li>
                <li>
                  <Button
                    size="large"
                    onClick={() => {
                      setIsShowFightMenu(false);
                    }}
                  >
                    뒤로
                  </Button>
                </li>
              </motion.ul>
            ) : (
              <motion.ul key="default" {...MOTION_DATA}>
                <li>
                  <Button
                    size="large"
                    onClick={() => {
                      setIsShowFightMenu(true);
                    }}
                  >
                    싸운다
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
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
