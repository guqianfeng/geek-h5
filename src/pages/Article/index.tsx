import { NavBar, InfiniteScroll } from "antd-mobile";
import { useHistory, useParams } from "react-router-dom";
import classNames from "classnames";
import styles from "./index.module.scss";

import Icon from "@/components/Icon";
import CommentItem from "./components/CommentItem";
import CommentFooter from "./components/CommentFooter";
import { useDispatch, useSelector } from "react-redux";
import { useMount } from "@/utils/hooks";
import { getArticleDetil } from "@/store/actions/article";
import { RootState } from "@/types/store";
import { ArticleDetail } from "@/types/data";
import Dompurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/base16/default-dark.css";

const Article = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useMount(() => {
    dispatch(getArticleDetil(id));
    hljs.configure({ ignoreUnescapedHTML: true });
    document.querySelectorAll(".dg-html pre code").forEach((el) => {
      // console.log(el);
      hljs.highlightElement(el as HTMLElement);
    });
  });

  const articleDetail = useSelector<RootState, ArticleDetail>(
    (state) => state.article.articleDetail
  );

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{articleDetail.title}</h1>

            <div className="info">
              <span>{articleDetail.pubdate}</span>
              <span>{articleDetail.read_count} 阅读</span>
              <span>{articleDetail.comm_count} 评论</span>
            </div>

            <div className="author">
              <img src={articleDetail.aut_photo} alt="" />
              <span className="name">{articleDetail.aut_name}</span>
              {/* followed标记是否已关注 */}
              <span
                className={classNames("follow", {
                  followed: articleDetail.is_followed,
                })}
              >
                {articleDetail.is_followed ? "已关注" : "关注"}
              </span>
            </div>
          </div>

          <div className="content">
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: Dompurify.sanitize(
                  articleDetail.content +
                    '<script>console.log("我是天才攻击你丫的")</script>'
                ),
                // __html: articleDetail.content,
              }}
            />
            <div className="date">发布文章时间：{articleDetail.pubdate}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（{articleDetail.comm_count}）</span>
            <span>{articleDetail.like_count} 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll
              hasMore={false}
              loadMore={async () => {
                console.log(1);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {true && (
            <div className="nav-author">
              <img src={articleDetail.aut_photo} alt="" />
              <span className="name">{articleDetail.aut_name}</span>
              {/* followed */}
              <span
                className={classNames("follow", {
                  followed: articleDetail.is_followed,
                })}
              >
                {articleDetail.is_followed ? "已关注" : "关注"}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  );
};

export default Article;
