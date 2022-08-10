import { Profile } from "@/types/data";
import { RootState } from "@/types/store";
import { Input, NavBar, TextArea } from "antd-mobile";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./index.module.scss";

interface EditInputProps {
  type: "" | "name" | "intro";
  onClose?: () => void;
}

const EditInput = ({ type, onClose }: EditInputProps) => {
  const typeName = useMemo(() => (type === "name" ? "昵称" : "简介"), [type]);
  const profile = useSelector<RootState, Profile>(
    (state) => state.profile.profile
  );
  const [value, setValue] = useState(() =>
    type === "name" ? profile.name : profile.intro
  );
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={<span className="commit-btn">提交</span>}
        onBack={onClose}
      >
        编辑{typeName}
      </NavBar>

      <div className="edit-input-content">
        <h3>{typeName}</h3>

        {type === "name" && (
          <div className="input-wrap">
            <Input
              placeholder="请输入"
              value={value}
              onChange={(val) => setValue(val)}
            />
          </div>
        )}

        {type === "intro" && (
          <TextArea
            className="textarea"
            placeholder="请输入简介"
            showCount
            maxLength={99}
            value={value}
            onChange={(val) => setValue(val)}
          />
        )}
      </div>
    </div>
  );
};

export default EditInput;
