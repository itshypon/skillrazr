import * as React from "react";
import { shuffleArray } from "../uiHelper";
import MusicPlayer from "../components/Games/MusicPlayer";
import monitor from "../components/Games/helpers/monitor";
import ModalDialog from "./Modal";

const Findy = () => {
  const [showTestDialog, setShowTestDialog] = React.useState(true);

  const [notFoundCount, setNotFoundCount] = React.useState(12);
  const random12Animals = shuffleArray(
    [
      "🦉",
      "🦚",
      "🦜",
      "🦢",
      "🦩",
      "🐍",
      "🦋",
      "🦅",
      "🦆",
      "🐞",
      "🦗",
      "🦂",
      "🐝",
      "🐇",
      "🪰",
      "🦟",
      "🕷",
      "🪳",
      "🐜",
      "🐛",
    ].slice(0, 12)
  );

  const [grassAnimals, setGrassAnimals] = React.useState(
    random12Animals.map((animal) => ({
      animal,
      pos: {
        left: Math.random() * 80 + 10 + "%",
        bottom: 10 + Math.random() * 45 + "%",
      },
    }))
  );
  const [foundAnimals, setFoundAnimals] = React.useState<any>([]);

  React.useEffect(() => {
    const findy = document.getElementById("findy");
    const grass = 100;
    const colors = ["lightgreen", "darkgreen", "olive"];

    function addGrass() {
      for (var i = 0; i < grass; i++) {
        var t = document.createElement("div");
        t.className = "grass";
        t.style.height = Math.random() * 25 + 45 + "%";
        t.style.left = i + "%";
        t.style.width = Math.random() * 1.5 + 0.5 + "vw";
        t.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        t.style.animationDelay = Math.random() * 3 + "s";
        //@ts-ignore
        t.style.zIndex = i % 2 === 0 ? -1 : 1;
        findy && findy.appendChild(t);
      }
    }

    addGrass();
  }, []);

  const renderCreatures = () => {
    return (
      <>
        {grassAnimals.map((creature, index) => {
          return (
            <div
              key={index}
              className="bird"
              style={{ left: creature.pos.left, bottom: creature.pos.bottom }}
              onClick={() => {
                monitor.emit("animalFound", undefined);
                setNotFoundCount(notFoundCount - 1);

                if (notFoundCount === 1) {
                  setTimeout(() => {
                    monitor.emit("gameWon", undefined);
                  }, 100);
                }
                const animalIndex = grassAnimals.findIndex(
                  (i) => i.animal === creature.animal
                );
                const animals = grassAnimals.splice(animalIndex, 1);
                setFoundAnimals(foundAnimals.concat(animals));
                setGrassAnimals(grassAnimals);
              }}
            >
              {creature.animal}
            </div>
          );
        })}
      </>
    );
  };
  const renderFoundAnimals = () => {
    return foundAnimals.map((animal: any) => {
      return <div className="relative">{animal.animal}</div>;
    });
  };

  return (
    <div id="findy" className="fixed w-full h-[100vh]">
      <div className="text-xxl mt-[110px]">Findy</div>
      <div className="mt-[10px] found">{renderFoundAnimals()}</div>
      <div className="text-lg">
        {notFoundCount === 0 ? "You won!" : `${notFoundCount} to go`}
      </div>
      <MusicPlayer />
      {renderCreatures()}

      <ModalDialog
        hideCloseButton
        showModal={showTestDialog}
        setShowDialog={setShowTestDialog}
        cancelHandler={() => setShowTestDialog(false)}
        content={
          <span>
            <span className="absolute top-[18px] text-2xl"> 🦉 🦜</span>
            <span className="absolute top-[22px] right-[16px] text-2xl">
              🦩 🐍
            </span>
            <button
              className="pushable  w-full mt-4 mb-4"
              onClick={() => {
                setShowTestDialog(false);
                monitor.emit("gameStarted", undefined);
              }}
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front">Play Findy</span>
            </button>
          </span>
        }
      />
    </div>
  );
};

export default Findy;
