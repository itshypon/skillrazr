import React from "react";
import notification from "../../assets/music/notification2.mp3";
import monitor from "./helpers/monitor";

const MusicPlayer = () => {
  monitor.on("dropFinish", () => {
    playSong();
  });

  React.useEffect(() => {
    let audioPlayer: any = document.querySelector("audio");
    audioPlayer.src = notification;
    audioPlayer.load();
    audioPlayer.addEventListener("play", function (event: any) {});

    audioPlayer.addEventListener("pause", function (event: any) {});
  }, []);

  const playSong = () => {
    let audioPlayer: any = document.querySelector("audio");
    audioPlayer.play();
    audioPlayer.addEventListener("ended", (event: any) => {});
  };

  return (
    <div>
      <audio controls className="hidden" />
    </div>
  );
};

export default MusicPlayer;
