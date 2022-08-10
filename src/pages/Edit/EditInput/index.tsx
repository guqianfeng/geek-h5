import { Profile } from "@/types/data";
import { RootState } from "@/types/store";
import { Input, NavBar, TextArea } from "antd-mobile";
import { useMemo, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { InputRef } from "antd-mobile/es/components/input";
import { TextAreaRef } from "antd-mobile/es/components/text-area";
import styles from "./index.module.scss";

interface EditInputProps {
  type: "" | "name" | "intro";
  onClose?: () => void;
  onSubmit?: (value: string, type: "" | "name" | "intro") => void;
}

const EditInput = ({ type, onClose, onSubmit }: EditInputProps) => {
  const typeName = useMemo(() => (type === "name" ? "昵称" : "简介"), [type]);
  const profile = useSelector<RootState, Profile>(
    (state) => state.profile.profile
  );
  const [value, setValue] = useState(
    () => (type === "name" ? profile.name : profile.intro) || ""
  );
  const inputRef = useRef<InputRef>(null);
  const textAreaRef = useRef<TextAreaRef>(null);
  useEffect(() => {
    inputRef.current?.focus();
    textAreaRef.current?.focus();
  }, []);
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span
            className="commit-btn"
            onClick={() => {
              onSubmit?.(value, type);
            }}
          >
            提交
          </span>
        }
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
              ref={inputRef}
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
            ref={textAreaRef}
          />
        )}
      </div>
    </div>
  );
};

export default EditInput;
