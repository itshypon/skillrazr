import React, { Component } from "react";
import monitor from "./helpers/monitor";

interface IProps {
  black?: boolean;
}

export default class Knight extends Component<IProps> {
  onDragStart(e: any) {
    e.dataTransfer.setData("id", "knight"); // without this on Firefox drag and drop fails
    monitor.emit("dragInProgress", e);
  }

  render() {
    return (
      <div
        className="absolute text-[30px] sm:text-[42px] left-0 top-0 font-bold"
        style={{ color: "golden", cursor: "move" }}
        onDragStart={(e) => this.onDragStart(e)}
        draggable
      >
        <div
          className={`w-[30px] sm:w-[42px] h-[30px] sm:h-[42px] ${
            this.props.black ? "fill-white" : "fill-black"
          }`}
        >
          🐎
        </div>
      </div>
    );
  }
}
