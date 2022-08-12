import classnames from "classnames";
import { useHistory } from "react-router";
import { NavBar, SearchBar } from "antd-mobile";

import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import { useState } from "react";
import { useDebounceFn } from "ahooks";
import { useDispatch, useSelector } from "react-redux";
import { getSearchSuggestion } from "@/store/actions/search";
import { RootState } from "@/types/store";
import { Suggestion } from "@/types/data";
const SearchPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const suggestion = useSelector<RootState, Suggestion>(
    (state) => state.search.suggestion
  );
  const [keyword, setKeyword] = useState("");
  const { run } = useDebounceFn(
    (keyword: string) => {
      // console.log(keyword);
      setKeyword(keyword);
      dispatch(getSearchSuggestion(keyword));
    },
    {
      wait: 300,
    }
  );
  // const timerRef = useRef(-1);
  const onKeywordChange = (keyword: string) => {
    // clearTimeout(timerRef.current);
    // timerRef.current = window.setTimeout(() => {
    //   setKeyword(keyword);
    // }, 300);
    run(keyword);
    // flush();
  };

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={<span className="search-text">搜索</span>}
      >
        <SearchBar placeholder="请输入关键字搜索" onChange={onKeywordChange} />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: true ? "none" : "block",
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}

      <div className={classnames("search-result", true ? "show" : "")}>
        {suggestion.options.map((item, index) => (
          <div className="result-item" key={index}>
            <Icon className="icon-search" type="iconbtn_search" />
            <div
              className="result-value text-overflow"
              dangerouslySetInnerHTML={{
                __html: item.replace(
                  new RegExp(`${keyword}`, "gi"),
                  `<span>${keyword}</span>`
                ),
              }}
            >
              {/* <span>黑马</span>
              程序员 */}
              {/* {item.replace(
                new RegExp(`${keyword}`, "gi"),
                `<span>${keyword}</span>`
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
