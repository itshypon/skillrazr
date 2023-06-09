/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/await-async-query */

import { screen, render, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import Story from "./Story.tsx";
import { storyGenerator } from "../services";

const NO_OF_CHARACTERS = 18;
const randomOrder = [];
//function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Mock speechSynthesis API
const mockSpeechSynthesis = {
  addEventListener: jest.fn(),
  getVoices: jest.fn().mockReturnValue([]),
};

//Mocking storyGenerator
jest.mock("../services", () => ({
  storyGenerator: jest.fn(),
}));

beforeAll(() => {
  // Assign the mock object to the window object
  window.speechSynthesis = mockSpeechSynthesis;

  for (let i = 0; i < NO_OF_CHARACTERS; i++) {
    randomOrder.push(i);
  }

  shuffleArray(randomOrder);
});

test(`${NO_OF_CHARACTERS} characters are present to pick from`, () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  const characters = screen
    .queryAllByRole("button")
    .filter((button) => button.id.endsWith("-add-button"));

  expect(characters).toHaveLength(NO_OF_CHARACTERS);
});

test("generate button is present", () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  const generateButton = screen.getByRole("button", { name: /generate/i });
  expect(generateButton).toBeInTheDocument();
});

test("user is able to select any character and its style changes to show it is selected", async () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  const characters = screen
    .getAllByRole("button")
    .filter((button) => button.id.endsWith("-add-button"));

  for (const character of characters) {
    const characterSpan = character.querySelector("span");
    const initialClass = characterSpan.getAttribute("class");

    act(() => {
      user.click(character);
    });

    await waitFor(() => {
      expect(characterSpan).not.toHaveAttribute("class", initialClass);
    });

    act(() => {
      user.click(character);
    });
  }
});

test("user is able to deselect any character and its style changes changes back to original when deselected", async () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  const characters = screen
    .getAllByRole("button")
    .filter((button) => button.id.endsWith("-add-button"));

  for (const character of characters) {
    const characterSpan = character.querySelector("span");
    const initialClass = characterSpan.getAttribute("class");

    act(() => {
      user.click(character);
    });
    act(() => {
      user.click(character);
    });

    await waitFor(() => {
      expect(characterSpan).toHaveAttribute("class", initialClass);
    });
  }
});

test("when no character is selected generate button is disabled", () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  const generateButton = screen.getByRole("button", { name: /generate/i });

  expect(generateButton).toBeDisabled();
});

test("user is able to select maximum 3 characters at once", async () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  var selected = 0;
  const characterButtons = screen
    .getAllByRole("button")
    .filter((button) => button.id.endsWith("-add-button"));

  for (let i = 0; i < NO_OF_CHARACTERS; i++) {
    const initialClass = characterButtons[randomOrder[i]]
      .querySelector("span")
      .getAttribute("class");

    act(() => {
      user.click(characterButtons[randomOrder[i]]);
    });

    if (
      characterButtons[randomOrder[i]]
        .querySelector("span")
        .getAttribute("class") !== initialClass
    ) {
      selected++;
    }
  }

  expect(selected).toBe(3);
});

test("generate button is enabled when one or more character is selected", () => {
  render(
    <Router>
      <Story />
    </Router>
  );
  const generateButton = screen.getByRole("button", { name: /generate/i });
  const characterButtons = screen
    .getAllByRole("button")
    .filter((button) => button.id.endsWith("-add-button"));

  expect(generateButton).toBeDisabled();

  act(() => {
    user.click(characterButtons[randomOrder[0]].querySelector("span"));
  });

  expect(generateButton).toBeEnabled();

  act(() => {
    user.click(characterButtons[randomOrder[1]].querySelector("span"));
  });

  expect(generateButton).toBeEnabled();

  act(() => {
    user.click(characterButtons[randomOrder[2]].querySelector("span"));
  });

  expect(generateButton).toBeEnabled();
});

test("generate button is disabled when all character buttons are deselected", () => {
  render(
    <Router>
      <Story />
    </Router>
  );
  const generateButton = screen.getByRole("button", { name: /generate/i });
  const characterButtons = screen
    .getAllByRole("button")
    .filter((button) => button.id.endsWith("-add-button"));

  expect(generateButton).toBeDisabled();
  act(() => {
    user.click(characterButtons[randomOrder[0]].querySelector("span"));
  });

  act(() => {
    user.click(characterButtons[randomOrder[1]].querySelector("span"));
  });
  act(() => {
    user.click(characterButtons[randomOrder[2]].querySelector("span"));
  });

  expect(generateButton).toBeEnabled();

  act(() => {
    user.click(characterButtons[randomOrder[0]].querySelector("span"));
  });

  expect(generateButton).toBeEnabled();

  act(() => {
    user.click(characterButtons[randomOrder[1]].querySelector("span"));
  });

  expect(generateButton).toBeEnabled();

  act(() => {
    user.click(characterButtons[randomOrder[2]].querySelector("span"));
  });

  expect(generateButton).toBeDisabled();
});

test("circular progress animation is not visible before clicking on generate button", () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  const progressBar = screen.queryByRole("progressbar");
  expect(progressBar).toBeNull();
});

test("circular progress animation is played when generate button is clicked and generated story button is displayed", async () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  const generatedStory =
    "Once upon a time a wise monkey lived in the mountains...";

  storyGenerator.mockResolvedValueOnce({ data: generatedStory });

  const generateButton = screen.getByRole("button", { name: /generate/i });
  const characterButtons = screen
    .getAllByRole("button")
    .filter((button) => button.id.endsWith("-add-button"));

  const expectedCharacters = `${characterButtons[randomOrder[0]].id.slice(
    0,
    -11
  )},${characterButtons[randomOrder[1]].id.slice(0, -11)}`;

  act(() => {
    user.click(characterButtons[randomOrder[0]]);
    user.click(characterButtons[randomOrder[1]]);
  });

  act(() => {
    user.click(generateButton);
  });

  expect(storyGenerator).toHaveBeenCalledWith(
    `Generate a moral story having characters ${expectedCharacters} for a 3 year old kid`
  );

  var progressBar = screen.getByRole("progressbar");
  expect(progressBar).toBeInTheDocument();

  const displayedStory = await screen.findByText(generatedStory);
  expect(displayedStory).toBeInTheDocument();

  progressBar = screen.queryByRole("progressbar");
  expect(progressBar).toBeNull();

  await waitFor(() => {
    const progressBar = screen.queryByRole("progressbar");
    expect(progressBar).toBeNull();
  });
});

test("initially play button is present", () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  const playCircleIcon = screen.getByTestId("PlayCircleIcon");
  const playButton = playCircleIcon.closest("button");

  expect(playButton).toBeInTheDocument();
});

test("play button is disabled when no story is displayed", async () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  act(() => {
    user.click(
      screen
        .getAllByRole("button")
        .filter((button) => button.id.endsWith("-add-button"))[randomOrder[0]]
    );
  });

  act(() => {
    user.click(screen.getByRole("button", { name: /generate/i }));
  });

  await waitFor(() => {
    const playCircleIcon = screen.getByTestId("PlayCircleIcon");
    const playButton = playCircleIcon.closest("button");
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();
  });
});

test("play button is enabled when a story is displayed", async () => {
  render(
    <Router>
      <Story />
    </Router>
  );

  const generatedStory =
    "Once upon a time a wise monkey lived in the mountains...";

  storyGenerator.mockResolvedValueOnce({ data: generatedStory });

  act(() => {
    user.click(
      screen
        .getAllByRole("button")
        .filter((button) => button.id.endsWith("-add-button"))[randomOrder[0]]
    );
  });

  act(() => {
    user.click(screen.getByRole("button", { name: /generate/i }));
  });

  await waitFor(() => {
    const playCircleIcon = screen.getByTestId("PlayCircleIcon");
    const playButton = playCircleIcon.closest("button");
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeEnabled();
  });
});

test("voice selection is not present initially", () => {
  render(
    <Router>
      <Story />
    </Router>
  );
  const voiceSelectInput = screen.queryByRole("combobox", { name: "Voice" });
  expect(voiceSelectInput).toBeNull();
});

test("voice selection is present once story is generated", async () => {
  render(
    <Router>
      <Story />
    </Router>
  );
  const generatedStory =
    "Once upon a time a wise monkey lived in the mountains...";
  storyGenerator.mockResolvedValueOnce({ data: generatedStory });

  act(() => {
    user.click(
      screen
        .getAllByRole("button")
        .filter((button) => button.id.endsWith("-add-button"))[randomOrder[0]]
    );
  });

  act(() => {
    user.click(screen.getByRole("button", { name: /generate/i }));
  });

  setTimeout(async () => {
    const voiceSelectInput = screen.findByRole("combobox", {
      name: "Voice",
    });
    expect(voiceSelectInput).toBeInTheDocument();
  }, 500);

  await waitFor(() => {
    const progressBar = screen.queryByRole("progressbar");
    expect(progressBar).toBeNull();
  });
});
