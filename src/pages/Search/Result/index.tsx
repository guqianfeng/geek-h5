import { useHistory, useLocation } from "react-router-dom";
import { NavBar } from "antd-mobile";

import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { useMount } from "@/utils/hooks";
import { getSearchResult } from "@/store/actions/search";

const Result = () => {
  const history = useHistory();
  const { search } = useLocation();
  const dispatch = useDispatch();
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
        <div className="article-item">文章列表</div>
      </div>
    </div>
  );
};

export default Result;
