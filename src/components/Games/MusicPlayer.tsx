import notification from "../../assets/music/notification2.mp3";
import glitch from "../../assets/music/glitch.mp3";
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

  monitor.on("dropFinish", function musicHandler() {
    monitor.state.isBlocked ? playAlert() : playNotifi();
  });

  const loadAudio = () => {
    let audioPlayer1: any = document.getElementById("audio-notification");
    audioPlayer1.load();

    let audioPlayer2: any = document.getElementById("audio-alert");
    audioPlayer2.load();
  };

  monitor.on("loadAudioFiles", loadAudio);

  return (
    <div>
      <audio
        src={notification}
        controls
        className="absolute hidden"
        id="audio-notification"
      />
      <audio
        src={glitch}
        controls
        className="absolute hidden"
        id="audio-alert"
      />
    </div>
  );
};

export default MusicPlayer;
