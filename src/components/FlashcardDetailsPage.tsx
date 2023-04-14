import { useParams } from "react-router-dom";
import { flashcards } from "../data/flashcards";

function FlashcardDetailsPage() {
  const { id: category } = useParams();
  console.log("id", category);

  const matchingFlashcards = flashcards.filter(
    (flashcard) => flashcard.category === category
  );

  // get all the flashcards belongs to the id. e.g javascript

  return (
    <div>
      {matchingFlashcards.map((flashcard) => {
        return (
          <>
            <div>{flashcard.question}</div>;<div>{flashcard.answer}</div>
          </>
        );
      })}
    </div>
  );
}

export default FlashcardDetailsPage;
