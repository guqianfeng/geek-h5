import {
  getProfile,
  updateProfile,
  updateProfilePhoto,
} from "@/store/actions/profile";
import { usePageEnter } from "@/utils/hooks";
import { Button, List, DatePicker, NavBar, Popup, Toast } from "antd-mobile";
import classNames from "classnames";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditInput from "./EditInput";
import EditList from "./EditList";

import styles from "./index.module.scss";

export type PopupState = {
  visible: boolean;
};
export type PopupStateFromRight = PopupState & {
  type: "" | "name" | "intro";
};
export type PopupStateFromBottom = PopupState & {
  type: "" | "gender" | "photo";
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
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = usePageEnter(getProfile).profile.profile;
  const [popupState, setPopupState] = useState<PopupStateFromRight>({
    visible: false,
    type: "",
  });
  const [popupStateFromBottom, setPopupStateFromBottom] =
    useState<PopupStateFromBottom>({
      type: "",
      visible: false,
    });
  const fileRef = useRef<HTMLInputElement>(null);
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
              onClick={() => {
                setPopupStateFromBottom({
                  visible: true,
                  type: "photo",
                });
              }}
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
            <Item
              arrow
              extra={profile.gender === 0 ? "男" : "女"}
              onClick={() => {
                setPopupStateFromBottom({
                  visible: true,
                  type: "gender",
                });
              }}
            >
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
          onSubmit={async (value, type) => {
            await dispatch(
              updateProfile({
                [type]: value,
              })
            );
            Toast.show({
              content: "修改成功",
              icon: "success",
            });
            setPopupState({
              type: "",
              visible: false,
            });
          }}
        />
      </Popup>
      <Popup
        visible={popupStateFromBottom.visible}
        destroyOnClose
        position="bottom"
      >
        <EditList
          onClose={() => {
            setPopupStateFromBottom({
              type: "",
              visible: false,
            });
          }}
          type={popupStateFromBottom.type}
          onSubmit={async (value, type) => {
            // console.log({ value, type });
            if (type === "gender") {
              await dispatch(
                updateProfile({
                  [type]: +value,
                })
              );
              Toast.show({
                content: "修改性别成功",
                icon: "success",
              });
            } else if (type === "photo") {
              // console.log("photo", value);
              if (value === "1") {
                fileRef.current?.click();
              }
            }
          }}
        />
      </Popup>
      <input
        hidden
        type="file"
        onChange={async (e) => {
          // console.log(e.target.files);
          const file = e.target.files?.[0];
          const formData = new FormData();
          formData.append("photo", file!);
          await dispatch(updateProfilePhoto(formData));
          Toast.show({
            content: "修改头像成功",
            icon: "success",
          });
        }}
        ref={fileRef}
      />
    </div>
  );
};

export default ProfileEdit;
