import React, { useState } from "react";

export default function Story() {
  //variable to store selected characters
  const [pickedCharacters, setPickedCharacters] = useState<string[]>([]);
  //function to add a character in pickedCharacter
  const addCharacter = (newCharacter: string) => {
    if (pickedCharacters.includes(newCharacter)) {
      //call function to display tooltip informing user that the character is already selected
    } else {
      setPickedCharacters((previousValue) => [...previousValue, newCharacter]);
    }
  };
  //function to remove occurrences of a character in pickedCharacter
  const removeCharacter = (character: string) => {
    let array = [...pickedCharacters];
    array.splice(array.indexOf(character), 1);
    setPickedCharacters(array);
  };
  //variable to store characters
  const characters = {
    "🐵": "Monkey",
    "🦊": "Fox",
    "🦁": "Lion",
    "🐯": "Tiger",
    "🦄": "Unicorn",
    "🐀": "Rat",
    "🐑": "Sheep",
    "🐇": "Rabbit",
    "🦍": "Gorilla",
    "🐉": "Dragon",
    "🐍": "Snake",
  };
  //function to generate character add buttons
  const createCharacterAddButtons = () => {
    let buttons = [];
    for (const character in characters) {
      {
        buttons.push(
          <button
            key={`${characters[character as keyof typeof characters]}-add-key`}
            onClick={() => {
              addCharacter(character);
            }}
            id={`${
              characters[character as keyof typeof characters]
            }-add-button`}
          >
            {character}
          </button>
        );
      }
    }
    return buttons;
  };
  //function to generate character remove buttons
  const createCharacterRemoveButtons = () => {
    let buttons = [];
    for (const character of pickedCharacters) {
      buttons.push(
        <button
          key={`${characters[character as keyof typeof characters]}-remove-key`}
          onClick={() => {
            removeCharacter(character);
          }}
          id={`${
            characters[character as keyof typeof characters]
          }-remove-button`}
        >
          {character}
        </button>
      );
    }
    return buttons;
  };
  return (
    <div>
      <div style={{ height: "131px" }}></div>{" "}
      {/* div to add empty space (height) so below elements are not hidden by navbar */}
      <main>
        <h2>AI story writer!!</h2>
        <p>
          In a world where everything is being charged up with AI, why not use
          AI to write story for your kids. Or Even better, let the kids create
          stories themselves using AI.
        </p>
        <p>Pick Characters for your story.</p>
        <div>{createCharacterAddButtons()}</div>
        <p>Selected characters, click on them to unselect them</p>
        <div>{createCharacterRemoveButtons()}</div>
      </main>
    </div>
  );
}
