import { getProfile } from "@/store/actions/profile";
import { usePageEnter } from "@/utils/hooks";
import { Button, List, DatePicker, NavBar, Popup } from "antd-mobile";
import classNames from "classnames";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import EditInput from "./EditInput";

import styles from "./index.module.scss";

export type PopupState = {
  visible: boolean;
  type: "" | "name" | "intro";
};

const Item = List.Item;

const ProfileEdit = () => {
  // const dispatch = useDispatch();
  // const profile = useSelector<RootState, Profile>(
  //   (state) => state.profile.profile
  // );
  // useEffect(() => {
  //   // 发送请求
  //   // console.log("发送请求");
  //   dispatch(getProfile());
  // }, [dispatch]);
  const history = useHistory();
  const profile = usePageEnter(getProfile).profile.profile;
  const [popupState, setPopupState] = useState<PopupState>({
    visible: false,
    type: "",
  });
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            "--border-bottom": "1px solid #F0F0F0",
          }}
          onBack={() => {
            history.go(-1);
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={profile.photo} alt="" />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item
              arrow
              extra={profile.name}
              onClick={() => {
                setPopupState({
                  visible: true,
                  type: "name",
                });
              }}
            >
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames("intro", "normal")}>
                  {profile.intro || "未填写"}
                </span>
              }
              onClick={() => {
                setPopupState({
                  visible: true,
                  type: "intro",
                });
              }}
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={profile.gender === 0 ? "男" : "女"}>
              性别
            </Item>
            <Item arrow extra={profile.birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
      <Popup
        visible={popupState.visible}
        position="right"
        bodyStyle={{ width: "100vw" }}
        destroyOnClose
      >
        <EditInput
          type={popupState.type}
          onClose={() => {
            setPopupState({
              visible: false,
              type: "",
            });
          }}
        />
      </Popup>
    </div>
  );
};

export default ProfileEdit;
