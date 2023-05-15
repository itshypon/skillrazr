import "./css/Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Card(props: any) {
  return (
    <div className={`Card ${props.className}`}>
      <div className="radialBar">
        <CircularProgressbar value={props.value} text={`${props.value}%`} />
        <span>{props.title}</span>
      </div>
      <div className="detail">
        <span>{props.value}</span>
      </div>
    </div>
  );
}
export default Card;
