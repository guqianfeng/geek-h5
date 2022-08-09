import { Input, NavBar, TextArea } from "antd-mobile";
import { useMemo } from "react";

import styles from "./index.module.scss";

interface EditInputProps {
  type: "" | "name" | "intro";
  onClose?: () => void;
}

const EditInput = ({ type, onClose }: EditInputProps) => {
  const typeName = useMemo(() => (type === "name" ? "昵称" : "简介"), [type]);
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

        <div className="input-wrap">
          {type === "name" && <Input placeholder="请输入" />}
          {type === "intro" && (
            <TextArea
              className="textarea"
              placeholder="请输入简介"
              showCount
              maxLength={99}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditInput;
