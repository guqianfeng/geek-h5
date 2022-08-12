import { useHistory, useLocation } from "react-router-dom";
import { InfiniteScroll, NavBar } from "antd-mobile";

import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useMount } from "@/utils/hooks";
import { getSearchResult } from "@/store/actions/search";
import { RootState } from "@/types/store";
import { SearchResult } from "@/types/data";
import ArticleItem from "@/pages/Layout/Home/ArticleItem";

const Result = () => {
  const history = useHistory();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const searchResult = useSelector<RootState, SearchResult>(
    (state) => state.search.searchResult
  );
  const usp = new URLSearchParams(search);
  const q = usp.get("q");
  useMount(() => {
    // console.log(searchResult.page);
    searchResult.page === undefined && q && dispatch(getSearchResult(q));
  });

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        {searchResult?.results?.map((item) => (
          <div className="article-item" key={item.art_id}>
            <ArticleItem
              type={item.cover.type}
              article={item}
              onClick={() => {
                history.push(`/article/${item.art_id}`);
              }}
            />
          </div>
        ))}
        <InfiniteScroll
          hasMore={searchResult.page < 5}
          // hasMore={searchResult?.results?.length <= searchResult?.total_count}
          loadMore={async () => {
            // console.log(searchResult.page);
            await dispatch(getSearchResult(q!, +searchResult.page + 1));
          }}
        ></InfiniteScroll>
      </div>
    </div>
  );
};

export default Result;
