import Icon from "@/components/Icon";
import { getAllChannels, getUserChennels } from "@/store/actions/home";
import { Channel } from "@/types/data";
import { RootAction, RootState } from "@/types/store";
import { Popup, Tabs } from "antd-mobile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArticleList from "./ArticleList";
import Channels from "./Channels";

import styles from "./index.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getUserChennels());
    dispatch(getAllChannels());
  }, [dispatch]);
  const userChannels = useSelector<RootState, Channel[]>(
    (state) => state.home.userChannels
  );
  const [popupVisible, setPopupVisible] = useState(false);
  const activeChannelId = useSelector<RootState, number>(
    (state) => state.home.activeChannelId
  );
  useEffect(() => {
    dispatch({
      type: "home/set_active_channel_id",
      payload: userChannels[0]?.id,
    } as RootAction);
  }, [dispatch, userChannels]);
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      <Tabs
        className="tabs"
        activeLineMode="fixed"
        onChange={(value) => {
          // console.log(value);
          dispatch({
            type: "home/set_active_channel_id",
            payload: +value,
          } as RootAction);
        }}
        activeKey={activeChannelId + ""}
      >
        {/* <Tabs.Tab title="推荐" key="1">
          推荐频道的内容
        </Tabs.Tab>

        <Tabs.Tab title="html" key="2">
          html频道的内容
        </Tabs.Tab>

        <Tabs.Tab title="开发者资讯" key="3">
          开发者资讯频道的内容
        </Tabs.Tab>

        <Tabs.Tab title="c++" key="4">
          c++频道的内容
        </Tabs.Tab>

        <Tabs.Tab title="css" key="5">
          css频道的内容
        </Tabs.Tab> */}
        {userChannels.map((channel) => (
          <Tabs.Tab title={channel.name} key={channel.id}>
            <ArticleList channelId={channel.id} />
          </Tabs.Tab>
        ))}
      </Tabs>

      <div className="tabs-opration">
        <Icon
          type="iconbtn_search"
          onClick={() => {
            history.push("/search");
          }}
        />
        <Icon
          type="iconbtn_channel"
          onClick={() => {
            setPopupVisible(true);
          }}
        />
      </div>
      <Popup
        visible={popupVisible}
        bodyStyle={{ height: "100vh" }}
        position="left"
      >
        <Channels
          onClose={() => {
            setPopupVisible(false);
          }}
        />
      </Popup>
    </div>
  );
};

export default Home;
