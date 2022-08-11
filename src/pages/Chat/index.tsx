import Icon from "@/components/Icon";
import { Message, Profile } from "@/types/data";
import { NavBar, Input } from "antd-mobile";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store";

const Chat = () => {
  const history = useHistory();

  const [messages, setMessages] = useState<Message[]>([
    { type: "robot", text: "亲爱的用户您好，小智同学为您服务。" },
    { type: "user", text: "你好" },
  ]);
  const profile = useSelector<RootState, Profile>(
    (state) => state.profile.profile
  );
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list">
        {/* 机器人的消息 */}
        {/* <div className="chat-item">
          <Icon type="iconbtn_xiaozhitongxue" />
          <div className="message">你好！</div>
        </div> */}

        {/* 用户的消息 */}
        {/* <div className="chat-item user">
          <img src={"http://toutiao.itheima.net/images/user_head.jpg"} alt="" />
          <div className="message">你好？</div>
        </div> */}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={classnames("chat-item", {
              user: msg.type === "user",
            })}
          >
            {msg.type === "robot" ? (
              <Icon type="iconbtn_xiaozhitongxue" />
            ) : (
              <img src={profile.photo} alt="" />
            )}
            <div className="message">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input className="no-border input" placeholder="请描述您的问题" />
        <Icon type="iconbianji" />
      </div>
    </div>
  );
};

export default Chat;
