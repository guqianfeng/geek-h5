import Icon from "@/components/Icon";
import { TabBar } from "antd-mobile";
import styles from "./index.module.scss";

// 标签页数据
const tabs = [
  { path: "/home", icon: "iconbtn_home", text: "首页" },
  { path: "/home/question", icon: "iconbtn_qa", text: "问答" },
  { path: "/home/video", icon: "iconbtn_video", text: "视频" },
  { path: "/home/profile", icon: "iconbtn_mine", text: "我的" },
];

//<Icon name={item.icon + "_sel"} className="tab-bar-item-icon" />
const Layout = () => {
  return (
    <div className={styles.root}>
      <TabBar className="tab-bar">
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            title={item.text}
            icon={(active: boolean) => {
              return (
                <Icon
                  name={item.icon + (active ? "_sel" : "")}
                  className="tab-bar-item-icon"
                />
              );
            }}
          />
        ))}
      </TabBar>
    </div>
  );
};

export default Layout;
