import styles from "./index.module.scss";
import { NavBar, TextArea } from "antd-mobile";
import { useRef, useState } from "react";
import { TextAreaRef } from "antd-mobile/es/components/text-area";
import { useMount } from "@/utils/hooks";
type Props = {
  // 评论的作者的名字
  name?: string;
  onClose?: () => void;
  onPublish?: (content: string) => void;
};
export default function CommentInput({ name, onClose, onPublish }: Props) {
  const textAreaRef = useRef<TextAreaRef>(null);
  const [content, setContent] = useState("");
  useMount(() => {
    textAreaRef.current?.focus();
  });
  return (
    <div className={styles.root}>
      <NavBar
        right={
          <span
            onClick={() => {
              onPublish?.(content);
            }}
            className="publish"
          >
            发表
          </span>
        }
        onBack={onClose}
      >
        {name ? "回复评论" : "评论文章"}
      </NavBar>
      <div className="input-area">
        {/* 回复别人的评论时显示：@某某 */}
        {name && <div className="at">@{name}:</div>}

        {/* 评论内容输入框 */}
        <TextArea
          onChange={(val) => {
            setContent(val);
          }}
          value={content}
          placeholder="说点什么~"
          rows={10}
          ref={textAreaRef}
        />
      </div>
    </div>
  );
}
