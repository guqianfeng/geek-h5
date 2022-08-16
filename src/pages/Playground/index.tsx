import Counter from "@/components/counter";
import CounterInFn from "@/components/counter-in-fn";
import Player from "@/components/player";
import React, { useState } from "react";

import withPlayer from "@/hoc/withPlayer";

const PlayerA = withPlayer(Player, "治疗");
const PlayerB = withPlayer(Player, "审判");

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
      <hr />
      <hr />
      <hr />
      <Player />
      <PlayerA />
      <PlayerB />
    </div>
  );
}
