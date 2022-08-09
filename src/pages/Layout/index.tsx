import Icon from "@/components/Icon";
import { TabBar } from "antd-mobile";
import styles from "./index.module.scss";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Home from "./Home";
import Question from "./Question";
import Video from "./Video";
import Profile from "./Profile";
// 标签页数据
const tabs = [
  { path: "/home", icon: "iconbtn_home", text: "首页" },
  { path: "/home/question", icon: "iconbtn_qa", text: "问答" },
  { path: "/home/video", icon: "iconbtn_video", text: "视频" },
  { path: "/home/profile", icon: "iconbtn_mine", text: "我的" },
];

const Layout = () => {
  const history = useHistory();
  const location = useLocation();
  const onTabChange = (key: string) => {
    history.push(key);
  };
  return (
    <div className={styles.root}>
      <TabBar
        className="tab-bar"
        onChange={onTabChange}
        activeKey={location.pathname}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            title={item.text}
            icon={(active: boolean) => {
              return (
                <Icon
                  type={item.icon + (active ? "_sel" : "")}
                  className="tab-bar-item-icon"
                />
              );
            }}
          />
        ))}
      </TabBar>
      <Switch>
        {/* 需要精确匹配 */}
        <Route path="/home" exact>
          <Home />
        </Route>

        <Route path="/home/question">
          <Question />
        </Route>

        <Route path="/home/video">
          <Video />
        </Route>

        <Route path="/home/profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
};

export default Layout;
