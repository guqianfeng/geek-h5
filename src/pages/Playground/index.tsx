import Counter from "@/components/counter";
import CounterInFn from "@/components/counter-in-fn";
import React, { useState } from "react";

export default function Playground() {
  const [user, setUser] = useState({
    name: "zs",
    age: 18,
  });
  return (
    <div>
      <Counter></Counter>
      <hr />
      <hr />
      <hr />
      <button
        onClick={() => {
          setUser({
            name: "zs",
            age: 19,
          });
        }}
      >
        change user
      </button>
      <CounterInFn user={user}></CounterInFn>
    </div>
  );
}
