import { getArticles } from "@/store/actions/home";
import { ArticlePage } from "@/types/data";
import { RootState } from "@/types/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const articlePage = useSelector<RootState, ArticlePage>(
    (state) => state.home.articleMap[channelId]
  );
  return (
    <div className={styles.root}>
      {articlePage?.results?.map((item) => (
        <div className="article-item" key={item.art_id}>
          <ArticleItem article={item} type={item.cover.type} />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
