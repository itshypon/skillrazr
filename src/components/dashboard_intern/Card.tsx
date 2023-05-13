import React from "react";
import "./css/Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Card(props: any) {
  return (
    <div
      className="Card"
      style={{
        background: props.color.backGround,
        boxShadow: props.color.boxShadow,
      }}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={props.barValue}
          text={`${props.barValue}%`}
        />
        <span>{props.title}</span>
      </div>
      <div className="detail">
        <span>{props.value}</span>
      </div>
    </div>
  );
}
export default Card;
