import * as React from "react";
import { shuffleArray } from "../uiHelper";

const Findy = () => {
  React.useEffect(() => {
    const findy = document.getElementById("findy");
    var grass = 100;
    var colors = ["green", "darkgreen", "olive"];
    var grassAnimals = [
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
    ];

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

    function addGrassAnimals() {
      shuffleArray(grassAnimals)
        .slice(0, 12)
        .forEach(function (elm) {
          var b = document.createElement("div");
          b.className = "bird";
          b.style.left = Math.random() * 80 + 10 + "%";
          b.style.bottom = 5 + Math.random() * 50 + "%";
          b.innerHTML = elm as string;
          b.onclick = function () {
            //@ts-ignore
            var cln = this.cloneNode(true);
            cln.style.position = "relative";
            cln.style.left = "";
            cln.style.bottom = "";
            cln.style.display = "inline-block";
            //@ts-ignore
            this.remove();
            //@ts-ignore
            findy.querySelector("p").appendChild(cln);
          };
          findy && findy.appendChild(b);
        });
    }

    addGrass();
    addGrassAnimals();
  }, []);

  return (
    <div id="findy" className="fixed w-full h-[100vh]">
      <p className="mt-[110px]"></p>
      <div className="text-xl">Find 12 living creatures</div>
    </div>
  );
};

export default Findy;
