import classnames from "classnames";

import Icon from "@/components/Icon";

import styles from "./index.module.scss";
import { Article } from "@/types/data";

import dayjs from "dayjs";
import releativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import Image from "../Img";

dayjs.locale("zh-cn");
dayjs.extend(releativeTime);

type Props = {
  article: Article;
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type?: 0 | 1 | 3;
};

const ArticleItem = ({ article, type = 0 }: Props) => {
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          "article-content",
          type === 3 && "t3",
          type === 0 && "none-mt"
        )}
      >
        <h3>{article.title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {article.cover?.images?.map((item, index) => (
              <div className="article-img-wrapper" key={index}>
                {/* <img src={item} alt="" /> */}
                <Image src={item} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames("article-info", type === 0 && "none-mt")}>
        <span>{article.aut_name}</span>
        <span>{article.comm_count} 评论</span>
        <span>{dayjs(article.pubdate).fromNow()}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  );
};

export default ArticleItem;
