import { useHistory, useLocation } from "react-router-dom";
import { NavBar } from "antd-mobile";

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
  useMount(() => {
    const usp = new URLSearchParams(search);
    console.log(usp.get("q"));
    const q = usp.get("q");
    q && dispatch(getSearchResult(q));
  });

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        {searchResult?.results?.map((item) => (
          <div className="article-item">
            <ArticleItem type={item.cover.type} article={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
