import React, { useState, memo } from "react";

type CounterInFnProps = {
  user: {
    name: string;
    age: number;
  };
};

function CounterInFn({ user }: CounterInFnProps) {
  console.log(">>>>>>>>>>>>>", Date.now());
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>CounterInFn</h1>
      <h1>计数器：{count}</h1>
      <button
        onClick={() => {
          setCount(count);
        }}
      >
        add
      </button>
      <div>
        <h1>姓名：{user.name}</h1>
        <h1>年龄：{user.age}</h1>
      </div>
    </div>
  );
}

export default memo(CounterInFn, (preProps, nextProps) => {
  return (
    preProps.user.age === nextProps.user.age &&
    preProps.user.name === nextProps.user.name
  );
});
