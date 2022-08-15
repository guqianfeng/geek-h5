import { Comment } from "@/types/data";
import { NavBar } from "antd-mobile";
import CommentFooter from "../CommentFooter";
import CommentItem from "../CommentItem";
import NoComment from "../NoComment";
import styles from "./index.module.scss";
type CommentReplyProps = {
  comment: Comment;
  onClose?: () => void;
};
export default function CommentReply({ onClose, comment }: CommentReplyProps) {
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        {/* 顶部导航栏 */}
        <NavBar className="transparent-navbar" onBack={onClose}>
          <div>{comment.reply_count}条回复</div>
        </NavBar>

        {/* 原评论信息 */}
        <div className="origin-comment">
          <CommentItem type="origin" comment={comment}></CommentItem>
        </div>

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>

          <NoComment />
        </div>

        {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
        <CommentFooter />
      </div>
    </div>
  );
}
