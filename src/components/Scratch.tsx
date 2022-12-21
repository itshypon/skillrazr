// @ts-ignore
import { ScratchCard, SCRATCH_TYPE } from "scratchcard-js";
import * as React from "react";
import tukuna from "../assets/images/tukuna.jpeg";
import sc1 from "../assets/images/scratch_photo1.jpg";
import sc2 from "../assets/images/scratch_photo2.jpg";
import sc3 from "../assets/images/scratch_photo3.jpg";
import sc4 from "../assets/images/scratch_photo4.jpg";
import sc5 from "../assets/images/scratch_photo5.jpg";
import sc6 from "../assets/images/scratch_photo6.jpg";
import sc7 from "../assets/images/scratch_photo7.jpg";
import sc8 from "../assets/images/scratch_photo8.jpg";
import sc9 from "../assets/images/scratch_photo9.jpg";
import sc10 from "../assets/images/scratch_photo10.jpg";
import sc11 from "../assets/images/scratch_photo11.jpg";
import scMe from "../assets/images/sc_bg2.png";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const images = [
  sc1,
  sc2,
  sc3,
  sc4,
  sc5,
  sc6,
  sc7,
  sc8,
  sc9,
  sc10,
  sc11,
  tukuna,
];

const Scratch = () => {
  const image = images[Math.floor(Math.random() * images.length)];

  React.useEffect(() => {
    document.getElementById("navlinks")?.classList.add("hidden");
    const scContainer: any = document.getElementById("sc-container");

    const sc = new ScratchCard("#sc-container", {
      scratchType: SCRATCH_TYPE.LINE,
      containerWidth: scContainer.offsetWidth,
      containerHeight: 500,
      imageForwardSrc: scMe,
      imageBackgroundSrc: image,
      // "https://openailabsprodscus.blob.core.windows.net/private/user-kLiJ0solYnBI2F2euOGnIRsd/generations/generation-RR0NuCVC7MCAZX1BjdsA8j6W/image.webp?st=2022-12-14T12%3A33%3A55Z&se=2022-12-14T14%3A31%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-14T13%3A05%3A58Z&ske=2022-12-21T13%3A05%3A58Z&sks=b&skv=2021-08-06&sig=YuLqu3FwGlqOXI2LVSTJC152nArhj9VuD0tfXqifwyE%3D",
      // htmlBackground: `<img height="300px" src=${akan}/>`,
      clearZoneRadius: 30,
      percentToFinish: 60, // When the percent exceeds 50 on touchend event the callback will be exec.
      callback: function () {
        // alert("Card Scratched");
      },
    });
    sc.init().then(() => {
      sc.canvas.addEventListener("scratch.move", () => {
        sc.getPercent().toFixed(2);
      });
    });
  });

  const reload = () => {
    window.location.reload();
  };

  return (
    <div
      id="scratcher"
      className="sc__wrapper mt-[100px] mb-[200px] p-10 fixed w-full h-[100vh]"
    >
      <div id="sc-container"></div>
      <div className="mt-4">
        <Button
          className="center border text-xl p-2 m-2 rounded"
          onClick={reload}
        >
          <ReplayIcon />
        </Button>
        <NavLink to="/games">
          <Button variant="outlined">
            <ArrowBackIcon /> <span className="">Back to Games</span>
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Scratch;
