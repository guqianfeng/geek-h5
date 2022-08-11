import { getArticles } from "@/store/actions/home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ArticleItem from "../ArticleItem";

import styles from "./index.module.scss";

type ArticleListProps = {
  channelId: number;
};

const ArticleList = ({ channelId }: ArticleListProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticles(channelId));
  }, [dispatch, channelId]);
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <div className="article-item">
        <ArticleItem />
      </div>
    </div>
  );
};

export default ArticleList;
