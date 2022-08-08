import Icon from "@/components/Icon";
import React from "react";

import styles from "./index.module.css";
// console.log(styles);
export default function Playground() {
  return (
    <div>
      <div className={styles["test-div"]}></div>
      <div className="test-div"></div>
      <svg className="icon" aria-hidden="true">
        {/* 使用时只需要将此处 iconbtn_like_sel 替换为你要的 icon 名称即可 */}
        <use xlinkHref="#iconbtn_like_sel"></use>
      </svg>
      <Icon
        className="abc"
        name="iconbtn_like_sel"
        onClick={() => {
          console.log("click");
        }}
      />
    </div>
  );
}
