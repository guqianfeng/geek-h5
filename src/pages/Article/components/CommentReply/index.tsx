import { getReplyList } from "@/store/actions/article";
import { Comment, CommentPage } from "@/types/data";
import { RootState } from "@/types/store";
import { useMount } from "@/utils/hooks";
import { NavBar } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import CommentFooter from "../CommentFooter";
import CommentItem from "../CommentItem";
import NoComment from "../NoComment";
import styles from "./index.module.scss";
type CommentReplyProps = {
  comment: Comment;
  onClose?: () => void;
};
export default function CommentReply({ onClose, comment }: CommentReplyProps) {
  const dispatch = useDispatch();
  const replyPage = useSelector<RootState, CommentPage>(
    (state) => state.article.replyPage
  );
  useMount(() => {
    dispatch(getReplyList(comment.com_id, ""));
  });
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
          {replyPage?.results?.length ? (
            replyPage.results.map((item) => (
              <CommentItem
                type="reply"
                key={item.com_id}
                comment={item}
              ></CommentItem>
            ))
          ) : (
            <NoComment />
          )}
        </div>

        {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
        <CommentFooter />
      </div>
    </div>
  );
}
