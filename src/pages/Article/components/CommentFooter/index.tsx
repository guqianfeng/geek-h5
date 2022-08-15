import Icon from "@/components/Icon";
import {
  articleCollectedHandler,
  articleLikingHandler,
} from "@/store/actions/article";
import { ArticleDetail } from "@/types/data";
import { useDispatch } from "react-redux";
import styles from "./index.module.scss";

type Props = {
  detail: ArticleDetail;
  // normal 普通评论
  // reply 回复评论
  type?: "normal" | "reply";
  onCommentClick?: () => void;
  onShowInput?: () => void;
};

const CommentFooter = ({
  type = "normal",
  detail,
  onCommentClick,
  onShowInput,
}: Props) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onShowInput}>
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === "normal" && (
        <>
          <div className="action-item" onClick={onCommentClick}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!detail.comm_count && (
              <span className="bage">{detail.comm_count}</span>
            )}
          </div>
          <div
            className="action-item"
            onClick={() => {
              dispatch(articleLikingHandler(detail.art_id, detail.attitude));
            }}
          >
            <Icon
              type={
                detail.attitude === 1 ? "iconbtn_like_sel" : "iconbtn_like2"
              }
            />
            <p>点赞</p>
          </div>
          <div
            className="action-item"
            onClick={() => {
              dispatch(
                articleCollectedHandler(detail.art_id, detail.is_collected)
              );
            }}
          >
            <Icon
              type={
                detail.is_collected ? "iconbtn_collect_sel" : "iconbtn_collect"
              }
            />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === "reply" && (
        <div className="action-item">
          <Icon
            type={detail.attitude === 1 ? "iconbtn_like_sel" : "iconbtn_like2"}
          />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  );
};

export default CommentFooter;
