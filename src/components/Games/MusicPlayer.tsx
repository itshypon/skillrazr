import React from "react";
import notification from "../../assets/music/notification2.mp3";
import glitch from "../../assets/music/glitch.mp3";
import monitor from "./helpers/monitor";

const MusicPlayer = (props: any) => {
  const { isBlocked } = props;

  monitor.on("dropFinish", () => {
    playSong(isBlocked ? glitch : notification);
  });

  React.useEffect(() => {
    let audioPlayer: any = document.querySelector("audio");
    audioPlayer.src = notification;
    audioPlayer.load();
    audioPlayer.addEventListener("play", function (event: any) {});

    audioPlayer.addEventListener("pause", function (event: any) {});
  }, []);

  const playSong = (song: string = notification) => {
    let audioPlayer: any = document.querySelector("audio");
    audioPlayer.src = song;
    audioPlayer.load();
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
