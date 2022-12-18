import notification from "../../assets/music/notification_new.mp3";
import glitch from "../../assets/music/glitch.mp3";
import tada from "../../assets/music/tada.mp3";
import monitor from "./helpers/monitor";

const MusicPlayer = (props: any) => {
  const { isBlocked } = props;
  monitor.state.isBlocked = isBlocked;

  const playAlert = () => {
    let audioPlayer: any = document.getElementById("audio-alert");
    audioPlayer.play();
  };

  const playNotifi = () => {
    let audioPlayer: any = document.getElementById("audio-notification");
    audioPlayer.play();
  };

  const playTada = () => {
    let audioPlayer: any = document.getElementById("audio-tada");
    audioPlayer.play();
  };

  monitor.on("dropFinish", function musicHandler() {
    monitor.state.isBlocked ? playAlert() : playNotifi();
  });

  monitor.on("animalFound", function musicHandler() {
    playNotifi();
  });

  monitor.on("gameWon", function musicHandler() {
    playTada();
  });

  const loadAudio = () => {
    let audioPlayer1: any = document.getElementById("audio-notification");
    audioPlayer1.load();

    let audioPlayer2: any = document.getElementById("audio-alert");
    audioPlayer2.load();

    let ap3: any = document.getElementById("audio-tada");
    ap3.load();
  };

  monitor.on("loadAudioFiles", loadAudio);

  return (
    <div>
      <audio
        src={notification}
        className="absolute hidden"
        id="audio-notification"
      />
      <audio src={glitch} className="absolute hidden" id="audio-alert" />

      <audio src={tada} className="absolute hidden" id="audio-tada" />
    </div>
  );
};

export default MusicPlayer;
