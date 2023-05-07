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

export default function Story() {
  const [generatedStory, setGeneratedStory] = useState<string>("");
  const [pickedCharacters, setPickedCharacters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = React.useState<SpeechSynthesisVoice>();

  const handleChange = (event: SelectChangeEvent) => {
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  const addRemoveCharacter = (character: string) => {
    if (pickedCharacters.includes(character)) {
      let array = [...pickedCharacters];
      array.splice(array.indexOf(character), 1);
      setPickedCharacters(array);
    } else {
      if (pickedCharacters.length === 3) {
        return;
      }
      setPickedCharacters((previousValue) => [...previousValue, character]);
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
              pickedCharacters.includes(character)
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
    const actors = pickedCharacters.map((i) => characters[i]).join(",");
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

      if (voice) {
        message.voice = voice;
      }
      message.volume = 1;
      message.rate = 1;

      synth.speak(message);
    } catch (e) {
      console.log("error reading text", e);
    }
  };

  return (
    <div className="fixed w-full h-[100vh]" id="story">
      {/* div to add empty space (height) so below elements are not hidden by navbar */}
      <main className="mt-[110px]">
        <div className="text-4xl mb-6 border-b-2 border-gray-500 inline-block">
          Story Time!
        </div>
        <p className="text-2xl">Pick 2 Characters!</p>
        <div className="text-3xl my-6">{renderCharacters()}</div>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Button
              className="w-[240px]"
              variant="contained"
              onClick={generateStory}
              disabled={pickedCharacters.length === 0}
            >
              Generate
            </Button>

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
