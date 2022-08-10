import styles from "./index.module.scss";

type EditListType = "gender" | "photo" | "";

type EditListProps = {
  type: EditListType;
  onClose?: () => void;
  onSubmit?: (value: string, type: EditListType) => void;
};
const genderList = [
  { title: "男", value: "0" },
  { title: "女", value: "1" },
];

const photoList = [
  { title: "拍照", value: "0" },
  { title: "本地选择", value: "1" },
];
const EditList = ({ type, onClose, onSubmit }: EditListProps) => {
  const list = type === "gender" ? genderList : photoList;
  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div
          key={item.title}
          className="list-item"
          onClick={() => {
            onSubmit?.(item.value, type);
            onClose?.();
          }}
        >
          {item.title}
        </div>
      ))}
      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  );
};

export default EditList;
