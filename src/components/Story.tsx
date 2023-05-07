import React, { useEffect, useState } from "react";
import { storyGenerator } from "../uiHelper";
import { NavLink } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
// import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import "../assets/css/Story.css";

const sampleStory =
  "Once upon a time there was a lion and tiger in a jungle. They were playing together for years. One day while the tiger was drinking water in the river a crocodile caught the tiger's leg. The tiger cried for help, The lion heard the tiger roar. He scared the crocodile and saved tigers life. The tiger and the lion were true friends. ";

export default function Story() {
  const [generatedStory, setGeneratedStory] = useState<string>(
    process.env.REACT_APP_ENV ? "" : sampleStory
  );
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = React.useState<SpeechSynthesisVoice>();
  const [playing, setPlaying] = useState(false);
  const [openCurtains, setOpenCurtains] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  const addRemoveCharacter = (character: string) => {
    if (selectedCharacters.includes(character)) {
      let array = [...selectedCharacters];
      array.splice(array.indexOf(character), 1);
      setSelectedCharacters(array);
    } else {
      if (selectedCharacters.length === 3) {
        return;
      }
      setSelectedCharacters((previousValue) => [...previousValue, character]);
    }
  };

  //variable to store characters
  const characters: Record<string, string> = {
    "🐵": "Monkey",
    "🦊": "Fox",
    "🦁": "Lion",
    "🐯": "Tiger",
    "🦄": "Unicorn",
    "🐀": "Rat",
    "🐑": "Sheep",
    "🐇": "Rabit",
    "🦍": "Gorilla",
    "🐉": "Dragon",
    "🐍": "Snake",
    "🐪": "Camel",
    "🐘": "Elephant",
    "🦒": "Giraffe",
    "🦜": "Parrot",
    "🐝": "Bee",
    "🦖": "Dinosaurs",
  };

  //function to generate character add buttons
  const renderCharacters = () => {
    let buttons = [];
    for (const character in characters) {
      buttons.push(
        <button
          className="mr-2"
          key={`${characters[character as keyof typeof characters]}-add-key`}
          onClick={() => {
            addRemoveCharacter(character);
          }}
          id={`${characters[character as keyof typeof characters]}-add-button`}
        >
          <span
            className={`${
              selectedCharacters.includes(character)
                ? "border-2 bg-green-500"
                : "border-0"
            }`}
          >
            {character}
          </span>
        </button>
      );
    }
    return buttons;
  };

  const renderSelectedCharacters = () => {
    let buttons = [];
    let index = 0;
    for (const character of selectedCharacters) {
      buttons.push(
        <button
          className="mr-2"
          key={`${characters[character as keyof typeof characters]}-add-key`}
        >
          <span className={`actor actor${index} relative top-[5px]`}>
            {character}
          </span>
        </button>
      );
      index++;
    }
    return buttons;
  };

  useEffect(() => {
    document.getElementById("navlinks")?.classList.add("hidden");
    return () =>
      document.getElementById("navlinks")?.classList.remove("hidden");
  }, []);

  useEffect(() => {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices().filter((v) => v.lang === "en-US");
      setVoices(voices);
      setVoice(voices[0]);
    });
  }, []);

  const generateStory = async () => {
    setGeneratedStory("");
    setLoading(true);
    const actors = selectedCharacters.map((i) => characters[i]).join(",");
    console.log("selected chars", actors);
    try {
      let result = await storyGenerator(
        `Generate a moral story having characters ${actors} for a 3 year old kid`
      );

      setLoading(false);
      console.log(result);
      setGeneratedStory(result.data);
    } catch (e) {
      setLoading(false);
    }
  };

  const readStory = () => {
    try {
      const message = new SpeechSynthesisUtterance(generatedStory);
      const synth = window.speechSynthesis;
      setPlaying(true);
      setTimeout(() => {
        setOpenCurtains(true);
      }, 100);
      if (voice) {
        message.voice = voice;
      }
      message.volume = 1;
      message.rate = 1;

      setTimeout(() => {
        synth.speak(message);
      }, 5000);

      message.addEventListener("end", (event) => {
        // setPlaying(false);
        console.log(`Story finished in ${event.elapsedTime / 1000} seconds.`);
        setOpenCurtains(false);
      });
    } catch (e) {
      setPlaying(false);
      console.log("error reading text", e);
    }
  };

  return (
    <div className="fixed w-full h-[100vh]" id="story">
      {/* div to add empty space (height) so below elements are not hidden by navbar */}
      <main className="mt-[90px]">
        <div className="text-4xl mb-6 border-b-2 border-gray-500 inline-block relative">
          Story Time!
          <span className="absolute top-[16px] right-[-40px] text-5xl rotate-[15deg]">
            🐒
          </span>
        </div>
        {playing ? (
          <div className="border-[6px] border-gray-500">
            <div
              className={`text-3xl my-0 curtain ${
                openCurtains ? " curtain-open" : " curtain-closed"
              }`}
            >
              <div className="curtain-wrapper">
                <div className="curtain-panel curtain-panel-left"></div>
                <div className="curtain-content">
                  {renderSelectedCharacters()}
                </div>
                <div className="curtain-panel curtain-panel-right"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xl">Pick 2 Actors</p>
            <div className="text-3xl my-6">{renderCharacters()}</div>
          </>
        )}
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {!playing && (
              <Button
                className="w-[240px]"
                variant="contained"
                onClick={generateStory}
                disabled={selectedCharacters.length === 0}
              >
                Generate
              </Button>
            )}

            <div className="flex items-center justify-center mt-4">
              {generatedStory && voice ? (
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Voice</InputLabel>

                  <Select
                    className="h-[40px]"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={voice.name}
                    label="Voice"
                    onChange={handleChange}
                  >
                    {voices.map((v) => (
                      <MenuItem value={v.name}>{v.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}

              <Button
                className="ml-4 "
                onClick={readStory}
                disabled={!generatedStory}
              >
                <PlayCircleIcon fontSize={"large"}></PlayCircleIcon>
              </Button>
            </div>
          </>
        )}
        <p className="text-base px-4 mt-4 max-h-[160px] overflow-auto">
          {generatedStory}
        </p>
        <NavLink to="/games">
          <Button variant="outlined" className="!text-xs !p-1 !mr-1">
            <ArrowBackIcon /> <span className="">Go Back</span>
          </Button>
        </NavLink>
      </main>
    </div>
  );
}
