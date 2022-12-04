import React from "react";
import { canMoveKnight } from "./helpers/rules";
import monitor from "./helpers/monitor";

interface IProps {
  knightPosition: any;
  x: number;
  y: number;
  conquered: boolean;
  black: boolean;
  dropHandler: (a: number, b: number) => void;
}

interface IState {
  highLight: boolean;
  conquered?: boolean;
}

export default class Square extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { highLight: false };
    monitor.on("dragInProgress", () => {
      if (
        canMoveKnight(this.props.knightPosition, this.props.x, this.props.y) &&
        !this.props.conquered
      ) {
        this.setState({ highLight: true });
      }
    });
    monitor.on("dropFinish", () => {
      this.setState({ highLight: false });
    });
  }

  onDrop(evt: any) {
    console.log("dropped");
    monitor.emit("dropFinish", evt);
    console.log(evt);
    if (
      canMoveKnight(this.props.knightPosition, this.props.x, this.props.y) &&
      !this.props.conquered
    ) {
      this.setState({ conquered: true });
      this.props.dropHandler(this.props.x, this.props.y);
    }
  }
  onDragOver(e: any) {
    console.log("drag over");

    e.preventDefault();
    console.log("drag over");
  }
  onDragEnd(e: any) {
    console.log("drag end");

    e.preventDefault();
    console.log("drag end");
    this.setState({ highLight: false });
  }
  onDragEnter(e: any) {
    console.log("drag enter");

    e.preventDefault();
    console.log("drag enter");
    console.log(!this.props.conquered);
  }
  onDragLeave(e: any) {
    console.log("drag leave");

    e.preventDefault();
    console.log("drag leave");
    if (canMoveKnight(this.props.knightPosition, this.props.x, this.props.y)) {
      this.setState({ highLight: false });
    }
  }
  render() {
    const { black } = this.props;
    const fill = black ? "#161c2d" : "white";
    const stroke = black ? "white" : "#161c2d";

    return (
      <div
        className="relative"
        style={{
          backgroundColor: this.state.highLight ? "#aaf0aa" : fill,
          color: stroke,
          width: "100%",
          height: "100%",
        }}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => this.onDrop(e)}
        onDragEnd={(e) => this.onDragEnd(e)}
        onDragLeave={(e) => this.onDragLeave(e)}
      >
        {this.props.conquered && (
          <span className="absolute text-[16px] sm:text-[24px] bottom-0 right-0">
            &#127796;
          </span>
        )}
        {this.props.children}
      </div>
    );
  }
}
