import * as React from "react";
import MoveKnightGame from "../components/Games/MoveKnightGame";
import Scratch from "../components/Scratch";
import Findy from "../components/Findy";
import { useParams } from "react-router";

const SelectedGame = () => {
  const { id: gameId } = useParams<string>();

  const renderSelectedGame = () => {
    switch (gameId) {
      case "planty": {
        return <MoveKnightGame />;
      }
      case "scratchy": {
        return <Scratch />;
      }
      case "findy": {
        return <Findy />;
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div className="flex flex-col align-center items-center">
      {renderSelectedGame()}
    </div>
  );
};

export default SelectedGame;
