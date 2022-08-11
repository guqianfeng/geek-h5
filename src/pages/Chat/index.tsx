import Icon from "@/components/Icon";
import { Message, Profile } from "@/types/data";
import { NavBar, Input } from "antd-mobile";
import { useEffect, useState, KeyboardEvent, useRef } from "react";
import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store";
import io, { Socket } from "socket.io-client";
import { getToken } from "@/utils/token";

// http://toutiao.itheima.net

const Chat = () => {
  const history = useHistory();

  const [messages, setMessages] = useState<Message[]>([
    { type: "robot", text: "亲爱的用户您好，小智同学为您服务。" },
    { type: "user", text: "你好" },
  ]);
  const [newMsg, setNewMsg] = useState<string>("");
  const clientRef = useRef<Socket>();
  const profile = useSelector<RootState, Profile>(
    (state) => state.profile.profile
  );
  const sendMessageToRobot = (e: KeyboardEvent) => {
    // console.log(e.key);
  };

  const enterPressFn = () => {
    console.log("按下enter", newMsg);
    const trimMsg = newMsg.trim();
    if (trimMsg) {
      clientRef.current!.emit("message", {
        msg: trimMsg,
        timstamp: +new Date(),
      });
      setMessages([
        ...messages,
        {
          type: "user",
          text: trimMsg,
        },
      ]);
      setNewMsg("");
    }
  };
  useEffect(() => {
    const client = io("http://toutiao.itheima.net", {
      transports: ["websocket"],
      query: {
        token: getToken(),
      },
    });
    client.on("connect", () => {
      console.log("建立连接");
      setMessages([
        ...messages,
        {
          type: "robot",
          text: "小智同学很高兴为您服务！！！",
        },
      ]);
    });
    client.on("disconnect", () => {
      console.log("断开连接");
    });
    client.on("message", (data) => {
      setMessages((messages) => [
        ...messages,
        {
          type: "robot",
          text: data.msg,
        },
      ]);
    });
    clientRef.current = client;
    return () => {
      client.close();
    };
  }, []);

  const chatListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = chatListRef.current;
    el!.scrollTop = el!.scrollHeight - el!.offsetHeight;
  }, [messages]);
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={chatListRef}>
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
        <Input
          className="no-border input"
          placeholder="请描述您的问题"
          value={newMsg}
          onKeyUp={sendMessageToRobot}
          onEnterPress={enterPressFn}
          onChange={(value) => {
            setNewMsg(value);
          }}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  );
};

export default Chat;
