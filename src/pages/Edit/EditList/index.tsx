import styles from "./index.module.scss";

type EditListProps = {
  onClose?: () => void;
};

const EditList = ({ onClose }: EditListProps) => {
  return (
    <div className={styles.root}>
      <div className="list-item" onClick={onClose}>
        男
      </div>
      <div className="list-item" onClick={onClose}>
        女
      </div>

      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  );
};

export default EditList;
