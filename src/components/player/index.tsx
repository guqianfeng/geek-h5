import React from "react";

type PlayerProps = {
  type?: string;
};

export default function Player({ type = "普通" }: PlayerProps) {
  return <h1>我是个{type}的圣骑士</h1>;
}
