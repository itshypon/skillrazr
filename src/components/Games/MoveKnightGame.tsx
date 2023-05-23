import React from "react";
import Knight from "./Knight";
import Square from "./Square";
import {
  AccordionProps,
  AccordionSummaryProps,
  styled,
  Typography,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { canMoveKnight, isNoMovesExist } from "./helpers/rules";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MusicPlayer from "./MusicPlayer";
import monitor from "./helpers/monitor";
import ModalDialog from "../Modal";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IProps {}

interface IState {
  isBlocked?: boolean;
  knightPrevPosition?: null;
  knightPosition: any;
  totalMoves: any;
  conquered: number[];
  retryCount: number;
  gameMode: boolean;
  isAudioEnabled: boolean;
  showTestDialog: boolean;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "8px 16px 16px",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  background: "transparent",
}));

const RulesAccordian = () => {
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className="flex mt-1">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          className="!p-0"
        >
          <Typography className="text-xl">
            <span className="ml-2">Rules</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="text-xs list-decimal ml-4">
            <li>Plat trees, riding the knight without revisits!!!</li>
            <li>Drag the knight and drop it on a valid square</li>
            <li>You are allowed 3 times to undo a wrong move</li>
            <li>
              You win the game, when you cover all the squares on the board
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default class MoveKnightGame extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      knightPrevPosition: null,
      knightPosition: [0, 0],
      totalMoves: 0,
      conquered: [0],
      retryCount: 3,
      gameMode: true,
      isAudioEnabled: false,
      showTestDialog: true,
    };
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.setShowTestDialog = this.setShowTestDialog.bind(this);
    this.undoLastStep = this.undoLastStep.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.setGameMode = this.setGameMode.bind(this);
    setTimeout(() => {
      document.getElementById("navlinks")?.classList.add("hidden");
    }, 100);
  }

  getSquare(i: number) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    const [knightX, knightY] = this.state.knightPosition;
    return (
      <div
        key={i}
        style={{ width: "12.5%", height: "12.5%" }}
        //onClick={() => this.handleSquareClick(x, y)}
      >
        <Square
          black={black}
          dropHandler={this.handleSquareClick}
          x={x}
          y={y}
          knightPosition={this.state.knightPosition}
          conquered={this.state.conquered.indexOf(i) !== -1}
        >
          {x === knightX && y === knightY ? <Knight black={black} /> : null}
        </Square>
      </div>
    );
  }

  handleSquareClick(x: number, y: number) {
    if (canMoveKnight(this.state.knightPosition, x, y)) {
      let conquered = this.state.conquered;
      let position = y * 8 + x;
      if (conquered.indexOf(position) === -1) {
        conquered = conquered.concat(position);
      }

      this.setState({
        knightPrevPosition: this.state.knightPosition,
        knightPosition: [x, y],
        totalMoves: this.state.totalMoves + 1,
        conquered: conquered,
      });
      if (isNoMovesExist([x, y], this.state.conquered)) {
        this.setState({ isBlocked: true });
      }
    }
  }

  undoLastStep() {
    let conquered = [...this.state.conquered];
    conquered.pop();
    this.setState({
      knightPosition: this.state.knightPrevPosition,
      knightPrevPosition: null,
      retryCount: this.state.retryCount - 1,
      isBlocked: false,
      conquered: conquered,
    });
  }

  resetGame() {
    this.setState({
      knightPrevPosition: null,
      knightPosition: [0, 0],
      totalMoves: 0,
      conquered: [0],
      retryCount: 3,
      gameMode: true,
    });
  }

  setGameMode(mode: boolean) {
    mode
      ? document.getElementById("navlinks")?.classList.add("hidden")
      : document.getElementById("navlinks")?.classList.remove("hidden");
    this.setState({ gameMode: mode });
  }

  setShowTestDialog() {
    this.setState({ showTestDialog: !this.setShowTestDialog });
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.getSquare(i));
    }

    return (
      <div
        className={`w-[100%] flex flex-col align-center items-center mt-[70px] ${
          this.state.gameMode ? "fixed h-[100vh] bg-white" : "m-[100px]"
        }`}
      >
        {
          <div style={{ margin: "34px 4px 0 0" }} className="p-1">
            Total Moves:{" "}
            <span className="font-bold">{this.state.totalMoves}</span>
          </div>
        }

        {this.state.retryCount > 0 && this.state.isBlocked && (
          <div
            className="text-xl pb-1"
            style={{ color: "red", margin: "2px 10px 0 10px" }}
          >
            You're blocked
          </div>
        )}
        {this.state.retryCount <= 0 && this.state.isBlocked && (
          <div
            className="text-xl pb-1"
            style={{ color: "red", margin: "6px 10px 0 10px" }}
          >
            You've lost the game!!!
          </div>
        )}

        {this.state.conquered.length === 64 && (
          <div
            style={{ color: "green", margin: "6px  10px 0 0" }}
            className="text-xl pb-1"
          >
            Congratulations, You've won!!!
          </div>
        )}
        <div className="flex w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] p-0 flex-wrap border border-[#161c2d]">
          {squares}
          <RulesAccordian />
          {this.state.knightPrevPosition && this.state.retryCount > 0 && (
            <button
              className="p-2 rounded"
              style={{ margin: "4px  4px 0 0", background: "#f4d078" }}
              onClick={this.undoLastStep}
            >
              Undo Move
            </button>
          )}
          {this.state.totalMoves > 0 && (
            <button
              className="p-2 rounded"
              style={{ margin: "4px  4px 0 0", background: "#f4d078" }}
              onClick={this.resetGame}
            >
              Reset Game
            </button>
          )}
          <button
            className="p-1 rounded"
            style={{ margin: "4px  4px 0 0", background: "#f4d078" }}
            onClick={() => this.setGameMode(!this.state.gameMode)}
          >
            {this.state.gameMode ? "Exit" : "Enter"} Game mode
          </button>
          <NavLink to="/games">
            <Button>
              <ArrowBackIcon /> <span className=""></span>
            </Button>
          </NavLink>
        </div>
        <MusicPlayer
          isBlocked={this.state.isBlocked}
          isAudioEnabled={this.state.isAudioEnabled}
        />
        <ModalDialog
          className="bg-[#150d0d] w-[300px] h-[200px] flex flex-col justify-center"
          hideCloseButton
          showModal={this.state.showTestDialog}
          setShowDialog={this.setShowTestDialog}
          cancelHandler={() => this.setShowTestDialog()}
          content={
            <span className="">
              <span className="absolute top-[46px] z-[2] text-3xl">
                {" "}
                &#127796; &#127796;
              </span>
              <span className="absolute top-[48px] z-[2] right-[16px] text-2xl">
                🐎
              </span>
              <button
                className="pushable w-full mt-4 mb-4"
                onClick={() => {
                  this.setShowTestDialog();
                  monitor.emit("gameStarted", undefined);
                }}
              >
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front">Play Planty</span>
              </button>
            </span>
          }
        />
      </div>
    );
  }
}
