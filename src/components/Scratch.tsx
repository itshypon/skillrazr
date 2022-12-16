// @ts-ignore
import { ScratchCard, SCRATCH_TYPE } from "scratchcard-js";
import * as React from "react";
import akan from "../assets/images/tukuna.jpeg";

const Scratch = () => {
  React.useEffect(() => {
    const scContainer: any = document.getElementById("sc-container");
    const sc = new ScratchCard("#sc-container", {
      scratchType: SCRATCH_TYPE.LINE,
      containerWidth: scContainer.offsetWidth,
      containerHeight: 500,
      imageForwardSrc:
        "https://uploads.codesandbox.io/uploads/user/a5aec563-412a-454f-a80f-dc430ffbf7c5/xgu0-scratch-card.jpg",
      imageBackgroundSrc: akan,
      // "https://openailabsprodscus.blob.core.windows.net/private/user-kLiJ0solYnBI2F2euOGnIRsd/generations/generation-RR0NuCVC7MCAZX1BjdsA8j6W/image.webp?st=2022-12-14T12%3A33%3A55Z&se=2022-12-14T14%3A31%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-14T13%3A05%3A58Z&ske=2022-12-21T13%3A05%3A58Z&sks=b&skv=2021-08-06&sig=YuLqu3FwGlqOXI2LVSTJC152nArhj9VuD0tfXqifwyE%3D",
      // htmlBackground: `<img height="300px" src=${akan}/>`,
      clearZoneRadius: 30,
      percentToFinish: 90, // When the percent exceeds 50 on touchend event the callback will be exec.
      callback: function () {
        // alert("Card Scratched");
      },
    });
    sc.init().then(() => {
      sc.canvas.addEventListener("scratch.move", () => {
        sc.getPercent().toFixed(2);
      });
    });
  }, []);

  return (
    <div className="sc__wrapper mt-[100px] mb-[200px] p-10">
      <div id="sc-container" className="sc__container"></div>
    </div>
  );
};

export default Scratch;
