import React from "react";

const withPlayer = (Player, type) => {
  class StrongPlayer extends React.Component {
    render() {
      return (
        <div>
          <Player type={type}></Player>
          <h2>{`因为我切天赋了，现在的天赋是>>>>${type}`}</h2>
        </div>
      );
    }
  }
  return StrongPlayer;
};
export default withPlayer;
