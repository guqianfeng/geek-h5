import { useEffect, useRef } from "react";
import styles from "./index.module.css";
// console.log(styles);
// http://geek.itheima.net/resources/images/19.jpg
export default function Playground() {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      console.log(entry.isIntersecting);
      if (entry.isIntersecting) {
        const imgEl = entry.target as HTMLImageElement;
        imgEl.src = imgEl.dataset["src"]!;
        observer.unobserve(imgEl);
      }
    });
    observer.observe(imgRef.current!);
  }, []);
  return (
    <>
      <div className={styles["test-img-div"]}>
        <h1>图片懒加载</h1>
      </div>
      <img
        ref={imgRef}
        data-src="http://geek.itheima.net/resources/images/19.jpg"
        alt="test"
      ></img>
    </>
  );
}
