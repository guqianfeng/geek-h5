import { getArticles } from "@/store/actions/home";
import { ArticlePage } from "@/types/data";
import { RootState } from "@/types/store";
import { InfiniteScroll } from "antd-mobile";
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
    <div
      className={styles.root}
      onScroll={(e) => {
        const divEl = e.target as HTMLDivElement;
        // console.log(divEl.scrollHeight, divEl.scrollTop, divEl.offsetHeight);
        if (divEl.offsetHeight + divEl.scrollTop + 200 >= divEl.scrollHeight) {
          // console.log("触底了");
        }
      }}
    >
      {articlePage?.results?.map((item) => (
        <div className="article-item" key={item.art_id}>
          <ArticleItem article={item} type={item.cover.type} />
        </div>
      ))}
      <InfiniteScroll
        hasMore={!!articlePage?.pre_timestamp}
        loadMore={async () => {
          await dispatch(getArticles(channelId, +articlePage?.pre_timestamp));
        }}
      ></InfiniteScroll>
    </div>
  );
};

export default ArticleList;
