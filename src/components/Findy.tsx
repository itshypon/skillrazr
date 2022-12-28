import * as React from "react";
import { shuffleArray } from "../uiHelper";
import MusicPlayer from "../components/Games/MusicPlayer";
import monitor from "../components/Games/helpers/monitor";
import ModalDialog from "./Modal";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import confetti from "canvas-confetti";

const renderConfetti = () => {
  confetti({
    particleCount: 400,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const Findy = () => {
  const [showTestDialog, setShowTestDialog] = React.useState(true);

  const [notFoundCount, setNotFoundCount] = React.useState(12);
  const random12Animals = shuffleArray([
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
    "🐌",
    "🪲",
    "🦗",
    "🦂",
    "🐝",
    "🦟",
    "🐇",
    "🪰",
    "🦟",
    "🕷",
    "🪳",
    "🐜",
    "🐛",
    "🐀",
    "🦌",
    "🐖",
    "🦓",
    "🐎",
    "🐆",
    "🐅",
    "🐈",
    "🐒",
    "🐄",
    "🐑",
    "🐐",
    "🐪",
    "🐘",
    "🦒",
    "🦏",
    "🦛",
    "🐿",
    "🦇",
    "🦥",
    "🦘",
    "🐊",
    "🐢",
    "🦎",
    "🦕",
    "🦖",
    "🐋",
    "🐬",
    "🦭",
    "🐟",
    "🐠",
    "🐡",
    "🦈",
    "🐙",
    "🦀",
    "🦞",
    "🦐",
    "🦑",
  ]).slice(0, 12);

  const [animals, setAnimals] = React.useState(
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
    document.getElementById("navlinks")?.classList.add("hidden");
    const findy = document.getElementById("findy");
    const colors = ["lightgreen", "darkgreen", "olive"];

    const addGrass = () => {
      for (let i = 0; i < 100; i++) {
        let grass = document.createElement("div");
        grass.className = "grass";
        grass.style.height = Math.random() * 25 + 45 + "%";
        grass.style.left = i + "%";
        grass.style.width = Math.random() * 1.5 + 0.5 + "vw";
        grass.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        grass.style.animationDelay = Math.random() * 5 + "s";
        //@ts-ignore
        grass.style.zIndex = i % 2 === 0 ? -1 : 1;
        findy && findy.appendChild(grass);
      }
    };

    addGrass();

    let interval: any;
    setTimeout(() => {
      interval = setInterval(() => {
        const animals: any = document.querySelectorAll(".animal") || [];
        if (!animals.length) {
          return;
        }
        const randomIndex = Math.floor(Math.random() * animals.length);
        animals[randomIndex].classList.toggle("highlight");

        setTimeout(() => {
          animals[randomIndex].classList.toggle("highlight");
        }, 1000);
      }, 5000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderAnmials = () => {
    return (
      <>
        {animals.map((creature, index) => {
          return (
            <div
              key={index}
              className="animal text-5xl sm:text-4xl"
              style={{ left: creature.pos.left, bottom: creature.pos.bottom }}
              onClick={() => {
                monitor.emit("animalFound", undefined);
                setNotFoundCount(notFoundCount - 1);

                if (notFoundCount === 1) {
                  setTimeout(() => {
                    monitor.emit("gameWon", undefined);
                    renderConfetti();
                  }, 100);
                }
                const animalIndex = animals.findIndex(
                  (i) => i.animal === creature.animal
                );
                const animalsFiltered = animals.splice(animalIndex, 1);
                setFoundAnimals(foundAnimals.concat(animalsFiltered));
                setAnimals(animals);
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
      <div className="mt-[70px] flex-col justify-center">
        <NavLink to="/games">
          <Button variant="outlined" className="!text-xs !p-1 !mr-1">
            <ArrowBackIcon /> <span className="">Go Back</span>
          </Button>
        </NavLink>
        <Button
          variant="outlined"
          className="center border !text-xs !p-1 m-1 rounded"
          onClick={() => window.location.reload()}
        >
          <ReplayIcon />
          <span className="">Reload</span>
        </Button>
        <div className="text-xl">Find Animals</div>
      </div>

      <div className="mt-[10px] found">{renderFoundAnimals()}</div>
      <div className="text-lg">
        {notFoundCount === 0 ? "You won!" : `${notFoundCount} to go`}
      </div>
      <MusicPlayer />
      {renderAnmials()}

      <ModalDialog
        className="bg-[#150d0d] w-[300px] h-[200px] flex flex-col justify-center"
        hideCloseButton
        showModal={showTestDialog}
        setShowDialog={setShowTestDialog}
        cancelHandler={() => setShowTestDialog(false)}
        content={
          <span className="">
            <span className="absolute top-[46px] z-[2] text-3xl"> 🦉 🦜</span>
            <span className="absolute top-[48px] z-[2] right-[16px] text-2xl">
              🐒 🦒
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
