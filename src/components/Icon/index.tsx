import React from "react";
import classnames from "classnames";
interface IconProps {
  type: string;
  onClick?: () => void;
  className?: string;
}
export default function Icon({ type, onClick, className }: IconProps) {
  return (
    <svg
      className={classnames("icon", className)}
      aria-hidden="true"
      onClick={onClick}
    >
      {/* 使用时只需要将此处 iconbtn_like_sel 替换为你要的 icon 名称即可 */}
      {/* <use xlinkHref="#iconbtn_like_sel"></use> */}
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
}
