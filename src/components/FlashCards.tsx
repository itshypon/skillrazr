import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { flashcardCategories } from "../data/flashcards";
import MoreIcon from "@mui/icons-material/More";

export default function Flashcards(props: any) {
  const [flashcards, setFlashcards] = useState<any[]>([]);

  useEffect(() => {
    setFlashcards(flashcardCategories);
  }, []);

  return (
    <div
      id="flashcards"
      className={
        "my-24 px-6 pt-20 flex flex-col items-center flex-wrap justify-center"
      }
    >
      <div className="text-6xl text-center mb-8"> Flashcards</div>

      <div>Memorise your skills with these flashcards</div>

      <div className="flex flex-wrap flex-col md:flex-row  justify-center p-2 w-full">
        {flashcards.map((flashcard: any) => {
          return (
            <NavLink
              key={flashcard.category}
              to={`/flashcards/${flashcard.category}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <div className="flex flex-col items-center justify-center mt-2 ml-0 sm:ml-12 px-4 py-4 mt-lg-0  box-shadow border border-green-500 rounded-[5px]">
                <div className="ml-2 text-2xl">{flashcard.title} </div>
                <div className="ml-2">{flashcard.description}</div>
              </div>
            </NavLink>
          );
        })}
      </div>

      <NavLink
        to={"/flashcardzes"}
        className="text-2xl mt-2 p-4  underline underline-offset-3"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {" "}
        Explore more <MoreIcon />
      </NavLink>
    </div>
  );
}
